<template>
  <div class="l-map">
    <div id="mapid" class="l-map__view" />
  </div>
</template>
<script>
import L from "leaflet";
import "leaflet-draw/dist/leaflet.draw.js";
import "leaflet-easybutton/src/easy-button.js";
import "leaflet-extra-markers/dist/js/leaflet.extra-markers.min.js";
import {
  iconFix,
  createCustomIcon,
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
    cDrawOptions: {
      type: Object,
      required: false,
      default: () => {
        return null;
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
    },
    goToCoords: {
      type: Object,
      required: false,
      default: () => {
        return null;
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
    },
    goToCoords: {
      handler(newValue) {
        newValue ? this.goTo(newValue) : "";
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
      this.addGlobalSearchControl();
      this.cDrawOptions ? this.addDrawControls() : "";
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
    addGlobalSearchControl() {
      const self = this;
      L.easyButton({
        states: [
          {
            stateName: "search",
            icon: "fa-globe search",
            title: "Click to search without limits by coords",
            onClick: function() {
              self.myMap.fire("search");
            }
          }
        ]
      }).addTo(this.myMap);
    },
    addDrawControls() {
      this.customTextsDraw();
      this.editableLayers = new L.FeatureGroup();
      this.cDrawOptions.edit.featureGroup = this.editableLayers;
      this.myMap.addControl(new L.Control.Draw(this.cDrawOptions));
      this.addEditableLayerToMap();
    },
    addEditableLayerToMap() {
      this.myMap.addLayer(this.editableLayers);
    },
    customTextsDraw() {
      L.drawLocal.draw.toolbar.buttons.rectangle =
        "Draw a rectangle on the map to search inside thats coords ";
      L.drawLocal.draw.toolbar.buttons.marker =
        "Set a position marker on the map to search in thats coords";
      L.drawLocal.draw.handlers.marker.tooltip.start =
        "Click to search data in this coords";
      L.drawLocal.draw.handlers.simpleshape.tooltip.end =
        "Release mouse to search data inside the rectangle";
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
        this.checkMarkerExist(cMarker.mapID)
          ? ""
          : this.createLayerMarker(cMarker);
      });
    },
    moveAndZoomToMarkerPosition(mark) {
      mark.type == "extent"
        ? this.myMap.fitBounds(mark.getBounds())
        : this.myMap.fitBounds(panZoomMarker(mark), { maxZoom: 11 });
    },
    moveToMarkerPosition(mark) {
      mark.type == "extent"
        ? this.myMap.panTo(mark.getBounds().getCenter())
        : this.myMap.panTo(mark.getLatLng());
    },
    checkMarkerExist(id) {
      let exist = false;
      this.layerMarkers.eachLayer(layer => {
        if (layer.layerID === id) exist = true;
      });
      return exist;
    },
    createLayerMarker(cMarker) {
      let mark = {};
      switch (cMarker.type) {
        case "extent":
          mark = L.geoJSON(cMarker.extent, {
            style: { opacity: 1, color: cMarker.color }
          });
          mark.layerID = cMarker.mapID;
          mark.type = cMarker.type;
          break;
        case "marker":
          mark = L.marker(
            { lon: cMarker.longitude, lat: cMarker.latitude },
            { icon: createCustomIcon(cMarker.typeSensor, cMarker.color) }
          );
          mark.layerID = cMarker.mapID;
          mark.type = cMarker.type;
          break;
      }
      mark.addTo(this.layerMarkers);
      this.moveToMarkerPosition(mark);
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
      this.ListenerSearch();
      this.listenerDraw();
    },
    ListenerSearch() {
      const self = this;
      this.myMap.on("search", function() {
        self.removeOldEditableLayers();
        self.$emit("search-global");
      });
    },
    listenerDraw() {
      const self = this;
      this.myMap.on("draw:created", function(e) {
        const type = e.layerType;
        const markerLayer = e.layer;
        self.addDrawLayer(markerLayer, type);
        self.launchEventCoords(markerLayer, type);
      });
    },
    addDrawLayer(markerLayer, type) {
      this.removeOldEditableLayers();
      const styledLayer = this.customStyleLayer(markerLayer, type);
      this.editableLayers.addLayer(styledLayer);
    },
    removeOldEditableLayers() {
      this.editableLayers.eachLayer(layer => {
        this.editableLayers.removeLayer(layer);
      });
    },
    customStyleLayer(markerLayer, type) {
      if (type === "marker") {
        return markerLayer;
      }
      if (type === "rectangle") {
        return markerLayer.setStyle({
          weight: 5,
          fillOpacity: 0,
          dashArray: 10
        });
      }
    },
    launchEventCoords(markerLayer, type) {
      if (type === "marker") {
        const geoJson = markerLayer.toGeoJSON();
        const lon = geoJson.geometry.coordinates[0].toFixed(6);
        const lat = geoJson.geometry.coordinates[1].toFixed(6);
        this.$emit("marker-drawn", { lon: lon, lat: lat });
      }
      if (type === "rectangle") {
        const geoJson = markerLayer.toGeoJSON();
        const cords = geoJson.geometry.coordinates[0];
        const lonMin = cords[0][0].toFixed(6);
        const lonMax = cords[2][0].toFixed(6);
        const latMin = cords[3][1].toFixed(6);
        const latMax = cords[1][1].toFixed(6);
        this.$emit("rectangle-drawn", {
          lonMin: lonMin,
          lonMax: lonMax,
          latMin: latMin,
          latMax: latMax
        });
      }
    },
    goTo(marker) {
      let tempMark;
      if (marker.type === "extent") {
        tempMark = L.geoJSON(marker.coords);
        tempMark.type = marker.type;
      }
      if (marker.type === "marker") {
        tempMark = L.marker({ lon: marker.coords.lon, lat: marker.coords.lat });
        tempMark.type = marker.type;
      }
      this.moveAndZoomToMarkerPosition(tempMark);
    }
  }
};
</script>
<style src="leaflet/dist/leaflet.css"></style>
<style src="leaflet-draw/dist/leaflet.draw.css"></style>
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
