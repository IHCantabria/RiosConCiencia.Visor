<template>
  <div class="app-map-viewer">
    <l-map
      :c-center="mapConfigComputed.centerConfig"
      :c-map-default="mapConfigComputed.mapDefaultConfig"
      :c-base-layers="mapConfigComputed.baseLayersConfig"
      :c-switch-layer-base-maps="mapConfigComputed.switchBaseMapsConfig"
      :c-overlay-layers="mapConfigComputed.overlayLayersConfig"
      :c-switch-layer-overlay-maps="mapConfigComputed.switchOverlayMapsConfig"
      :c-markers="markers"
      @toggle-panel="togglePanel"
    ></l-map>
  </div>
</template>
<script>
import LMap from "@/components/ui/LMap.vue";
import { mapGetters } from "vuex";
import * as types from "@/store/types";
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
    ...mapGetters({
      samples: [types.G_GET_SAMPLES_FILTERED]
    }),
    markers() {
      return [...this.samples];
    },
    mapConfigComputed() {
      return {
        centerConfig: this.leafletConfig.centerDefault,
        baseLayersConfig: this.leafletConfig.baseLayersConfig,
        mapDefaultConfig: this.leafletConfig.mapDefaultConfig,
        switchBaseMapsConfig: this.leafletConfig.switchBaseMapsConfig,
        overlayLayersConfig: this.leafletConfig.overlayLayersConfig,
        switchOverlayMapsConfig: this.leafletConfig.switchOverlayMapsConfig
      };
    }
  },
  methods: {
    togglePanel() {
      this.$root.$emit("toggleFilterPanel");
    }
  }
};
</script>
