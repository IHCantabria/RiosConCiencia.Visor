<template>
  <div class="view-viewer grid">
    <app-map-viewer class="map"></app-map-viewer>
    <app-panels></app-panels>
    <app-fetch-manager></app-fetch-manager>
    <app-reset-state></app-reset-state>
  </div>
</template>
<script>
import AppPanels from "@/components/layout/AppPanels.vue";
import AppMapViewer from "@/components/layout/AppMapViewer.vue";
import AppFetchManager from "@/components/layout/AppFetchManager.vue";
import AppResetState from "@/components/renderless/AppResetState";
export default {
  components: {
    AppMapViewer,
    AppPanels,
    AppFetchManager,
    AppResetState
  }
};
</script>
<style src="@fortawesome/fontawesome-free/css/all.min.css"></style>
<style scoped lang="scss">
.view-viewer {
  height: 100%;
}
</style>
