<template>
  <div class="l-map">
    <div id="mapid" class="l-map__view" />
  </div>
</template>
<script>
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
  createCustomTooltip,
  createCustomLegend,
  panZoomMarker
} from "@/utils/leaflet-utils.js";
iconFix();
export default {
  props: {
    cCenter: {
      type: Object,
      required: true
    },
    cBaseLayers: {
      type: Array,
      required: false,
      default: () => {
        return [
          {
            url:
              "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
            configParameters: {
              id: "defaultMapID",
              attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }
          }
        ];
      }
    },
    cMapDefault: {
      type: Object,
      required: false,
      default: () => {
        return {
          center: [0, 0],
          zoom: 3,
          layers: ["defaultMapID"]
        };
      }
    },
    cSwitchLayerBaseMaps: {
      type: Array,
      required: false,
      default: () => {
        return [];
      }
    },
    cOverlayLayers: {
      type: Array,
      required: false,
      default: () => {
        return [];
      }
    },
    cSwitchLayerOverlayMaps: {
      type: Array,
      required: false,
      default: () => {
        return [];
      }
    },
    cMarkers: {
      type: Array,
      required: false,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      myMap: null,
      layersMap: [],
      layerMarkers: [],
      currentLegend: null,
      originalCoordsMark: null,
      showLegend: true
    };
  },
  watch: {
    cMarkers: {
      handler() {
        this.updateLayerMarker();
      },
      deep: true
    },
    showLegend: {
      handler() {
        this.toggleLegend();
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initMap();
    });
  },
  methods: {
    async initMap() {
      this.loadMap();
    },
    loadMap() {
      this.loadTileLayers();
      const layersToSetMap = this.layersMap.filter(layer =>
        this.cMapDefault.layers.includes(layer.options.id)
      );
      this.setMap(layersToSetMap);
      this.addToggleControlControl();
      this.setOriginalPosition();
      this.setupSwitcherLayer();
      this.setupLegend();
      this.setupListeners();
    },
    loadTileLayers() {
      const layers = [];
      this.cBaseLayers.forEach(layer => {
        const newLayer = L.tileLayer(layer.url, layer.configParameters);
        layers.push(newLayer);
      });
      this.layersMap = layers;
    },
    setMap(layersToSetMap) {
      const bounds = this.setMapBounds();
      this.myMap = L.map("mapid", {
        center: this.cMapDefault.center,
        zoom: this.cMapDefault.zoom,
        minZoom: this.cMapDefault.minZoom,
        layers: layersToSetMap,
        maxBounds: bounds,
        maxBoundsViscosity: 1.0,
        worldCopyJump: true
      }).setView([this.cCenter.lat, this.cCenter.lon], this.cCenter.zoom);
    },
    setMapBounds() {
      return L.latLngBounds(L.latLng(-90, -Infinity), L.latLng(90, Infinity));
    },
    addToggleControlControl() {
      const self = this;
      L.easyButton({
        states: [
          {
            stateName: "toogleLegend",
            icon: "fa-map",
            title: "Haz click aquí para mostrar/ocultar la legenda del mapa",
            onClick: function() {
              self.myMap.fire("toogleLegend");
            }
          }
        ]
      }).addTo(this.myMap);
      L.easyButton({
        states: [
          {
            stateName: "toogleFilter",
            icon: "fa-sliders-h",
            title: "Haz click aquí para mostrar/ocultar el panel inferior",
            onClick: function() {
              self.myMap.fire("toogleFilter");
            }
          }
        ]
      }).addTo(this.myMap);
      L.easyButton({
        states: [
          {
            stateName: "toogleFilter",
            icon: "fa-home",
            title: "Haz click aquí para volver a la posición original del mapa",
            onClick: function() {
              self.myMap.fire("goToDefault");
            }
          }
        ]
      }).addTo(this.myMap);
    },
    moveAndZoomToOriginalPosition() {
      this.myMap.fitBounds(panZoomMarker(this.originalCoordsMark), {
        maxZoom: this.cMapDefault.zoom
      });
    },
    setOriginalPosition() {
      this.originalCoordsMark = L.marker({
        lon: this.cCenter.lon,
        lat: this.cCenter.lat
      });
    },
    setupSwitcherLayer() {
      if (this.cSwitchLayerBaseMaps.length > 0) {
        const baseLayers = this.createSwitchBaseLayers();
        const groupedOverlays = this.createSwitchOverlayLayers();
        //OverlayLayers
        var options = {
          // Make the "Filtros" group exclusive (use radio inputs)
          exclusiveGroups: ["Filtros"],
          // Show a checkbox next to non-exclusive group labels for toggling all
          groupCheckboxes: true
        };
        L.control
          .groupedLayers(baseLayers, groupedOverlays, options)
          .addTo(this.myMap);
      }
    },
    setupLegend() {
      this.createLegend(this.layerMarkers[2].options.legend);
    },
    createSwitchBaseLayers() {
      const baseLayers = {};
      this.cSwitchLayerBaseMaps.forEach(baseLayer => {
        const newLayer = this.layersMap.find(
          layer => layer.options.id == baseLayer.idLayer
        );
        baseLayers[baseLayer.displayLayerName] = newLayer;
      });
      return baseLayers;
    },
    createSwitchOverlayLayers() {
      const groupedOverlays = {};
      var filters = {};
      this.cOverlayLayers.forEach(layer => {
        const overlayLayer = new L.LayerGroup([], layer.configParameters);
        filters[layer.name] = overlayLayer;
        this.layerMarkers.push(overlayLayer);
      });
      groupedOverlays["Filtros"] = filters;
      this.layerMarkers[2].addTo(this.myMap);
      return groupedOverlays;
    },
    updateLayerMarker() {
      this.clearLayerMarkers();
      if (this.cMarkers.length > 0) this.addNewLayerMarkers();
    },
    addNewLayerMarkers() {
      this.layerMarkers.forEach(layerGroup => {
        this.createLayerMarkers(layerGroup);
      });
    },
    createLayerMarkers(layerGroup) {
      this.cMarkers.forEach(cMarker => {
        this.createLayerMarker(cMarker, layerGroup);
      });
    },
    createLayerMarker(cMarker, layerGroup) {
      const icon = getCustomIcon(layerGroup.options.id);
      const key = getCustomColorKey(layerGroup.options.id);
      const color = cMarker[key];
      const mark = L.marker(
        { lon: cMarker.longitude, lat: cMarker.latitude },
        { icon: createCustomIcon(icon, color) }
      );
      const popupContext = createCustomPopup(cMarker);
      const tooltioContext = createCustomTooltip(cMarker);
      mark.layerID = cMarker.id;
      mark.type = cMarker.type;
      mark.bindPopup(popupContext);
      mark.bindTooltip(tooltioContext);
      layerGroup.addLayer(mark);
    },
    clearLayerMarkers() {
      this.layerMarkers.forEach(layerGroup => {
        var layers = layerGroup.getLayers();
        layers.forEach(layer => {
          layerGroup.removeLayer(layer);
        });
      });
    },
    setupListeners() {
      this.ListenerToggleLegend();
      this.ListenerOpenPopUp();
      this.ListenerToggleFilters();
      this.ListenerGoToDefault();
      this.ListenerLegendChange();
    },
    ListenerToggleLegend() {
      const self = this;
      this.myMap.on("toogleLegend", function() {
        self.showLegend = !self.showLegend;
      });
    },
    ListenerOpenPopUp() {
      const self = this;
      this.myMap.on("popupopen", function() {
        //Hide legend is resolution is movil
        window.innerWidth < 750 ? (self.showLegend = false) : "";
      });
    },
    ListenerToggleFilters() {
      const self = this;
      this.myMap.on("toogleFilter", function() {
        self.$emit("toggle-panel");
      });
    },
    ListenerGoToDefault() {
      const self = this;
      this.myMap.on("goToDefault", function() {
        self.moveAndZoomToOriginalPosition();
      });
    },
    ListenerLegendChange() {
      const self = this;
      this.myMap.on("overlayadd", function(eventLayer) {
        self.myMap.removeControl(self.currentLegend);
        self.createLegend(eventLayer.layer.options.legend);
      });
    },
    createLegend(legendText) {
      const self = this;
      var legend = L.control({ position: "topright" });
      legend.onAdd = () => {
        let div = createCustomLegend(legendText);
        self.showLegend
          ? (div.style.display = "flex")
          : (div.style.display = "none");
        return div;
      };
      this.currentLegend = legend;
      legend.addTo(this.myMap);
    },
    toggleLegend() {
      const div = document.getElementsByClassName("custom-legend")[0];
      this.showLegend
        ? (div.style.display = "flex")
        : (div.style.display = "none");
    }
  }
};
</script>
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
