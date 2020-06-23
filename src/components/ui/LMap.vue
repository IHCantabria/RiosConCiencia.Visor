<template>
  <div class="l-map">
    <div id="mapid" class="l-map__view" />
  </div>
</template>
<script>
import L from "leaflet";
import "leaflet-extra-markers/dist/js/leaflet.extra-markers.min.js";
import { iconFix, createCustomIcon } from "@/utils/leaflet-utils.js";
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
      editableLayers: null
    };
  },
  watch: {
    cMarkers: {
      handler() {
        this.updateLayerMarker();
      },
      deep: true
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
      this.setupSwitcherLayer();
      this.setMarker();
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
    setupSwitcherLayer() {
      if (this.cSwitchLayerBaseMaps.length > 0) {
        const baseLayers = {};
        this.cSwitchLayerBaseMaps.forEach(baseLayer => {
          const newLayer = this.layersMap.find(
            layer => layer.options.id == baseLayer.idLayer
          );
          baseLayers[baseLayer.displayLayerName] = newLayer;
        });
        L.control.layers(baseLayers).addTo(this.myMap);
      }
    },
    setMarker() {
      this.layerMarkers = L.featureGroup().addTo(this.myMap);
      if (this.cMarkers.length > 0) {
        this.cMarkers.forEach(cMarker => {
          this.createLayerMarker(cMarker);
        });
      }
    },
    updateLayerMarker() {
      if (this.cMarkers.length > 0) this.addNewLayerMarkers();
      if (this.layerMarkers.length != 0) this.removeOldLayerMarkers();
    },
    addNewLayerMarkers() {
      this.cMarkers.forEach(cMarker => {
        this.createLayerMarker(cMarker);
      });
    },
    createLayerMarker(cMarker) {
      const mark = L.marker(
        { lon: cMarker.longitude, lat: cMarker.latitude },
        { icon: createCustomIcon(cMarker.typeSensor, cMarker.color) }
      );
      mark.layerID = cMarker.mapID;
      mark.type = cMarker.type;
      mark.addTo(this.layerMarkers);
    },
    removeOldLayerMarkers() {
      const self = this;
      this.layerMarkers.eachLayer(layer => {
        this.checkLayerMarkerDontExist(layer.layerID)
          ? self.layerMarkers.removeLayer(layer)
          : "";
      });
    },
    checkLayerMarkerDontExist(id) {
      return this.cMarkers.find(cMarker => cMarker.mapID === id) ? false : true;
    },
    setupListeners() {
      this.ListenerLegendChange();
    },
    ListenerLegendChange() {
      //TODO: LOGIC
    }
  }
};
</script>
<style src="leaflet/dist/leaflet.css"></style>
<style
  src="leaflet-extra-markers/dist/css/leaflet.extra-markers.min.css"
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
