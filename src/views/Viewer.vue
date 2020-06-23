<template>
  <div class="view-viewer grid">
    <app-map-viewer class="map"></app-map-viewer>
    <app-panels></app-panels>
    <app-fetch-manager></app-fetch-manager>
  </div>
</template>
<script>
import AppPanels from "@/components/layout/AppPanels.vue";
import AppMapViewer from "@/components/layout/AppMapViewer.vue";
import AppFetchManager from "@/components/layout/AppFetchManager.vue";
export default {
  components: {
    "app-map-viewer": AppMapViewer,
    "app-panels": AppPanels,
    "app-fetch-manager": AppFetchManager
  }
};
</script>
<style src="@fortawesome/fontawesome-free/css/all.min.css"></style>
<style scoped lang="scss">
.view-viewer {
  height: 100%;
}
</style>
