<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import ThePanels from "@/components/layout/ThePanels.vue";
import TheMap from "@/components/layout/TheMap.vue";
import TheFetchManager from "@/components/layout/TheFetchManager.vue";
import HistoricData from "../components/HistoricData.vue";
import { useSamplesStore } from "@/store/samplesStore.js";

const router = useRouter();
const samplesStore = useSamplesStore();

const TheFetchManagerRef = ref(null);
const ThePanelsRef = ref(null);

const onToggleFilterPanel = () => {
  ThePanelsRef.value.togglePanel();
};
const onCallDownload = () => {
  TheFetchManagerRef.value.fetchCsvData();
};
const onCallLogin = (credentials) => {
  TheFetchManagerRef.value.authenticate(credentials);
};
const onOpenHistory = (idRiverSection) => {
  samplesStore.setRiverSectionHistoricData(idRiverSection);
};
const onOpenDetails = (sampleId) => {
  router.push({ name: "Sample", params: { idSample: sampleId } });
};
</script>
<template>
  <div
    v-show="!samplesStore.riverSectionHistoricData.active"
    class="view-viewer"
  >
    <TheMap
      class="map"
      @toggle-filter-panel="onToggleFilterPanel"
      @open-history="onOpenHistory"
      @open-details="onOpenDetails"
    />
    <TheFetchManager ref="TheFetchManagerRef" />
    <ThePanels
      ref="ThePanelsRef"
      @call-download="onCallDownload"
      @call-login="onCallLogin"
    />
  </div>
  <HistoricData v-if="samplesStore.riverSectionHistoricData.active" />
</template>
<style scoped lang="scss">
.view-viewer {
  height: 100vh;
  width: 100%;
  overflow: hidden;
}
</style>
