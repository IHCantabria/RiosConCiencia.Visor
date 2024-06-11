<script setup>
import { useSamplesStore } from "@/store/samplesStore";
import BaseSelectorTypeMultiple from "@/components/ui/BaseSelectorTypeMultiple.vue";

const samplesStore = useSamplesStore();

const setDownloadFilters = (filters) => {
  samplesStore.setSampleDownloadFilters(filters);
};
</script>

<template>
  <div class="type-selectors">
    <BaseSelectorTypeMultiple
      class="type-selectors__selector"
      width-select="220px"
      :items="samplesStore.downloadOptions"
      :last-active-items="samplesStore.downloadFilters"
      @change="setDownloadFilters"
    />
  </div>
</template>
<style scoped lang="scss">
.type-selectors {
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  height: 100%;

  &__selector {
    padding: 1vw 0.5vw;
    padding-top: 0.5vw;
    margin-right: 15px;
    margin-left: 15px;
    width: 300px;
  }
}
</style>
