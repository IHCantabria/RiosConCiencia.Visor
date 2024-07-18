<script setup>
import { computed } from "vue";
import LMap from "@/components/base/map/LMap.vue";
import { LEAFLET_CONFIG } from "@/config/leaflet-config.js";
import { useSamplesStore } from "@/store/samplesStore.js";

const samplesStore = useSamplesStore();

const emit = defineEmits([
  "toggle-filter-panel",
  "open-history",
  "open-details",
]);

const mapConfigComputed = computed(() => {
  return {
    centerConfig: LEAFLET_CONFIG.centerDefault,
    baseLayersConfig: LEAFLET_CONFIG.baseLayersConfig,
    mapDefaultConfig: LEAFLET_CONFIG.mapDefaultConfig,
    switchBaseMapsConfig: LEAFLET_CONFIG.switchBaseMapsConfig,
    overlayLayersConfig: LEAFLET_CONFIG.overlayLayersConfig,
    switchOverlayMapsConfig: LEAFLET_CONFIG.switchOverlayMapsConfig,
  };
});
const riversGeoJson = computed(() => samplesStore.riversGeoJson);

const togglePanel = () => {
  emit("toggle-filter-panel");
};
const openHistory = (idRiverSection) => {
  emit("open-history", idRiverSection);
};
const openDetails = (sampleId) => {
  emit("open-details", sampleId);
};
</script>

<template>
  <div class="map-container">
    <LMap
      :c-center="mapConfigComputed.centerConfig"
      :c-map-default="mapConfigComputed.mapDefaultConfig"
      :c-base-layers="mapConfigComputed.baseLayersConfig"
      :c-switch-layer-base-maps="mapConfigComputed.switchBaseMapsConfig"
      :c-overlay-layers="mapConfigComputed.overlayLayersConfig"
      :c-switch-layer-overlay-maps="mapConfigComputed.switchOverlayMapsConfig"
      :c-markers="samplesStore.getSamplesFiltered"
      :c-rivers-geo-json="riversGeoJson"
      @toggle-panel="togglePanel"
      @open-history="openHistory"
      @open-details="openDetails"
    />
  </div>
</template>

<style lang="scss" scoped>
.map-container {
  height: 100%;
  width: 100%;
}
</style>
