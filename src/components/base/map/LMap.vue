<script setup>
import { ref, onMounted, watch } from "vue";
import L from "leaflet";
import "leaflet-groupedlayercontrol/dist/leaflet.groupedlayercontrol.min.js";
import "leaflet-easybutton/src/easy-button.js";
import "leaflet-extra-markers/dist/js/leaflet.extra-markers.min.js";
import {
  iconFix,
  createCustomIcon,
  getCustomIcon,
  getCustomColorKey,
  createCustomPopup,
  createCustomLegend,
  panZoomMarker,
} from "@/utils/leaflet-utils.js";
iconFix();

// PROPS
const props = defineProps({
  cCenter: {
    type: Object,
    required: true,
  },
  cBaseLayers: {
    type: Array,
    required: false,
    default: () => {
      return [
        {
          url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
          configParameters: {
            id: "defaultMapID",
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          },
        },
      ];
    },
  },
  cMapDefault: {
    type: Object,
    required: false,
    default: () => {
      return {
        center: [0, 0],
        zoom: 3,
        layers: ["defaultMapID"],
      };
    },
  },
  cSwitchLayerBaseMaps: {
    type: Array,
    required: false,
    default: () => {
      return [];
    },
  },
  cOverlayLayers: {
    type: Array,
    required: false,
    default: () => {
      return [];
    },
  },
  cSwitchLayerOverlayMaps: {
    type: Array,
    required: false,
    default: () => {
      return [];
    },
  },
  cMarkers: {
    type: Array,
    required: false,
    default: () => {
      return [];
    },
  },
});

// DATA
const myMap = ref(null);
const layersMap = ref([]);
const layerMarkers = ref([]);
const currentLegend = ref(null);
const originalCoordsMark = ref(null);
const showLegend = ref(true);

// WATCHERS
watch(
  () => props.cMarkers,
  () => {
    updateLayerMarker();
  },
  { deep: true },
);
watch(
  () => showLegend.value,
  () => {
    toggleLegend();
  },
);

// EMITS
const emit = defineEmits(["toggle-panel"]);

// LYFE CYCLE HOOKS
onMounted(() => {
  initMap();
});

// METHODS

const initMap = async () => {
  modifyLeafletPopup();
  loadMap();
};
const modifyLeafletPopup = () => {
  L.Popup.prototype._animateZoom = function (e) {
    if (!this._map) {
      return;
    }
    const pos = this._map._latLngToNewLayerPoint(
        this._latlng,
        e.zoom,
        e.center,
      ),
      anchor = this._getAnchor();
    L.DomUtil.setPosition(this._container, pos.add(anchor));
  };
  L.Marker.prototype._animateZoom = function (opt) {
    if (!this._map) {
      return;
    }
    const pos = this._map
      ._latLngToNewLayerPoint(this._latlng, opt.zoom, opt.center)
      .round();
    this._setPos(pos);
  };
};
const loadMap = () => {
  loadTileLayers();
  const layersToSetMap = layersMap.value.filter((layer) =>
    props.cMapDefault.layers.includes(layer.options.id),
  );
  setMap(layersToSetMap);
  setOriginalPosition();
  setupSwitcherLayer();
  setupZoomControl();
  addToggleControlControl();
  setupLegend();
  setupListeners();
};
const loadTileLayers = () => {
  const layers = [];
  props.cBaseLayers.forEach((layer) => {
    const newLayer = L.tileLayer(layer.url, layer.configParameters);
    layers.push(newLayer);
  });
  layersMap.value = layers;
};
const setMap = (layersToSetMap) => {
  const bounds = setMapBounds();
  myMap.value = L.map("mapid", {
    center: props.cMapDefault.center,
    zoom: props.cMapDefault.zoom,
    minZoom: props.cMapDefault.minZoom,
    zoomControl: false,
    layers: layersToSetMap,
    maxBounds: bounds,
    maxBoundsViscosity: 1.0,
    worldCopyJump: true,
  }).setView([props.cCenter.lat, props.cCenter.lon], props.cCenter.zoom);
};
const setMapBounds = () => {
  return L.latLngBounds(L.latLng(-90, -Infinity), L.latLng(90, Infinity));
};
const addToggleControlControl = () => {
  L.easyButton({
    states: [
      {
        stateName: "toogleLegend",
        icon: "fa-map",
        title: "Haz click aquí para mostrar/ocultar la leyenda del mapa",
        onClick: function () {
          myMap.value.fire("toogleLegend");
        },
      },
    ],
  }).addTo(myMap.value);
  L.easyButton({
    states: [
      {
        stateName: "toogleFilter",
        icon: "fa-sliders-h",
        title: "Haz click aquí para mostrar/ocultar el panel inferior",
        onClick: function () {
          myMap.value.fire("toogleFilter");
        },
      },
    ],
  }).addTo(myMap.value);
  L.easyButton({
    states: [
      {
        stateName: "toogleFilter",
        icon: "fa-home",
        title: "Haz click aquí para volver a la posición original del mapa",
        onClick: function () {
          myMap.value.fire("goToDefault");
        },
      },
    ],
  }).addTo(myMap.value);
};
const moveAndZoomToOriginalPosition = () => {
  myMap.value.fitBounds(panZoomMarker(originalCoordsMark.value), {
    maxZoom: props.cMapDefault.zoom,
  });
};
const setOriginalPosition = () => {
  originalCoordsMark.value = L.marker({
    lon: props.cCenter.lon,
    lat: props.cCenter.lat,
  });
};
const setupSwitcherLayer = () => {
  if (props.cSwitchLayerBaseMaps.length > 0) {
    const baseLayers = createSwitchBaseLayers();
    const groupedOverlays = createSwitchOverlayLayers();
    //OverlayLayers
    const options = {
      // Make the "Filtros" group exclusive (use radio inputs)
      exclusiveGroups: ["Filtros"],
      // Show a checkbox next to non-exclusive group labels for toggling all
      groupCheckboxes: true,
      position: "topleft",
    };
    L.control
      .groupedLayers(baseLayers, groupedOverlays, options)
      .addTo(myMap.value);
  }
};
const setupZoomControl = () => {
  L.control.zoom({ position: "topleft" }).addTo(myMap.value);
};
const setupLegend = () => {
  createLegend(layerMarkers.value[2].options.legend);
};
const createSwitchBaseLayers = () => {
  const baseLayers = {};
  props.cSwitchLayerBaseMaps.forEach((baseLayer) => {
    const newLayer = layersMap.value.find(
      (layer) => layer.options.id == baseLayer.idLayer,
    );
    baseLayers[baseLayer.displayLayerName] = newLayer;
  });
  return baseLayers;
};
const createSwitchOverlayLayers = () => {
  const groupedOverlays = {};
  const filters = {};
  props.cOverlayLayers.forEach((layer) => {
    const overlayLayer = new L.LayerGroup([], layer.configParameters);
    filters[layer.name] = overlayLayer;
    layerMarkers.value.push(overlayLayer);
  });
  groupedOverlays["Filtros"] = filters;
  layerMarkers.value[2].addTo(myMap.value);
  return groupedOverlays;
};
const updateLayerMarker = () => {
  clearLayerMarkers();
  if (props.cMarkers.length > 0) addNewLayerMarkers();
};
const addNewLayerMarkers = () => {
  layerMarkers.value.forEach((layerGroup) => {
    createLayerMarkers(layerGroup);
  });
};
const createLayerMarkers = (layerGroup) => {
  props.cMarkers.forEach((cMarker) => {
    createLayerMarker(cMarker, layerGroup);
  });
};
const createLayerMarker = (cMarker, layerGroup) => {
  const icon = getCustomIcon(layerGroup.options.id);
  const key = getCustomColorKey(layerGroup.options.id);
  const color = cMarker[key];
  const mark = L.marker(
    { lon: cMarker.longitude, lat: cMarker.latitude },
    { icon: createCustomIcon(icon, color) },
  );
  const popupContext = createCustomPopup(cMarker);
  mark.layerID = cMarker.id;
  mark.type = cMarker.type;
  mark.bindPopup(popupContext);
  layerGroup.addLayer(mark);
};
const clearLayerMarkers = () => {
  layerMarkers.value.forEach((layerGroup) => {
    const layers = layerGroup.getLayers();
    layers.forEach((layer) => {
      layerGroup.removeLayer(layer);
    });
  });
};
const setupListeners = () => {
  ListenerToggleLegend();
  ListenerOpenPopUp();
  ListenerToggleFilters();
  ListenerGoToDefault();
  ListenerLegendChange();
};
const ListenerToggleLegend = () => {
  myMap.value.on("toogleLegend", function () {
    showLegend.value = !showLegend.value;
  });
};
const ListenerOpenPopUp = () => {
  myMap.value.on("popupopen", function () {
    //Hide legend is resolution is movil
    window.innerWidth < 750 ? (showLegend.value = false) : "";
  });
};
const ListenerToggleFilters = () => {
  myMap.value.on("toogleFilter", function () {
    emit("toggle-panel");
  });
};
const ListenerGoToDefault = () => {
  myMap.value.on("goToDefault", function () {
    moveAndZoomToOriginalPosition();
  });
};
const ListenerLegendChange = () => {
  myMap.value.on("overlayadd", function (eventLayer) {
    myMap.value.removeControl(currentLegend.value);
    createLegend(eventLayer.layer.options.legend);
  });
};
const createLegend = (legendText) => {
  const legend = L.control({ position: "topright" });
  legend.onAdd = () => {
    const div = createCustomLegend(legendText);
    showLegend.value
      ? (div.style.display = "flex")
      : (div.style.display = "none");
    return div;
  };
  currentLegend.value = legend;
  legend.addTo(myMap.value);
};
const toggleLegend = () => {
  const div = document.getElementsByClassName("custom-legend")[0];
  showLegend.value
    ? (div.style.display = "flex")
    : (div.style.display = "none");
};
</script>

<template>
  <div class="l-map">
    <div id="mapid" class="l-map__view" />
  </div>
</template>

<style src="leaflet/dist/leaflet.css"></style>
<style
  src="leaflet-extra-markers/dist/css/leaflet.extra-markers.min.css"
></style>
<style
  src="leaflet-groupedlayercontrol/dist/leaflet.groupedlayercontrol.min.css"
></style>
<style scoped lang="scss">
.l-map {
  height: 100%;

  &__view {
    height: 100%;
    z-index: 0;
  }
}
</style>
