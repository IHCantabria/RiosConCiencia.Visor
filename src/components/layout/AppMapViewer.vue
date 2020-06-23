<template>
  <div class="app-map-viewer">
    <l-map
      :c-center="mapConfigComputed.centerConfig"
      :c-base-layers="mapConfigComputed.baseLayersConfig"
      :c-map-default="mapConfigComputed.mapDefaultConfig"
      :c-draw-options="mapConfigComputed.cDrawOptionsConfig"
      :c-switch-layer-base-maps="mapConfigComputed.switchBaseMapsConfig"
      :c-markers="markers"
      @marker-drawn="searchCoords"
      @rectangle-drawn="searchExtends"
      @search-global="searchGlobal"
    ></l-map>
  </div>
</template>
<script>
import LMap from "@/components/ui/LMap.vue";
// import { mapActions, mapGetters, mapState } from "vuex";
// import * as types from "@/store/types";
import { LEAFLET_CONFIG } from "@/config/leaflet-config.js";
export default {
  components: {
    "l-map": LMap
  },
  data() {
    return {
      leafletConfig: LEAFLET_CONFIG
    };
  },
  computed: {
    // ...mapState({
    //   goToCoords: state => state.coords.goToCoords
    // }),
    // ...mapGetters({
    //   sensorsSelected: [types.G_GET_SENSORS_SELECTED],
    //   productsSelected: [types.G_GET_PRODUCTS_SELECTED]
    // }),
    markers() {
      // return [...this.productsSelected, ...this.sensorsSelected];
      return [];
    },
    mapConfigComputed() {
      return {
        centerConfig: this.leafletConfig.centerDefault,
        baseLayersConfig: this.leafletConfig.baseLayersConfig,
        mapDefaultConfig: this.leafletConfig.mapDefaultConfig,
        cDrawOptionsConfig: this.leafletConfig.drawOptionsConfig,
        switchBaseMapsConfig: this.leafletConfig.switchBaseMapsConfig
      };
    }
  },
  methods: {
    // ...mapActions({
    //   setSearchCoords: types.A_SET_SEARCH_COORDS
    // }),
    searchCoords(coords) {
      this.setSearchCoords({
        xMin: coords.lon,
        xMax: coords.lon,
        yMin: coords.lat,
        yMax: coords.lat
      });
    },
    searchExtends(coords) {
      this.setSearchCoords({
        xMin: coords.lonMax,
        xMax: coords.lonMin,
        yMin: coords.latMin,
        yMax: coords.latMax
      });
    },
    searchGlobal() {
      this.setSearchCoords({
        global: true
      });
    }
  }
};
</script>
