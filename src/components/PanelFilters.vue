<script setup>
import BaseSelectorType from "@/components/ui/BaseSelectorType.vue";
import { useSamplesStore } from "@/store/samplesStore";

// COMPOSABLES & STORES
const samplesStore = useSamplesStore();

// METHODS
const setCampaignFilter = (type) => {
  samplesStore.setSampleCampaignFilter(type);
};
const setYearFilter = (year) => {
  samplesStore.setSampleYearFilter(year);
};
</script>

<template>
  <div class="type-selectors">
    <BaseSelectorType
      class="type-selectors__selector"
      label="Selector de Año"
      width-select="220px"
      :items="samplesStore.yearOptions"
      :last-active-item="samplesStore.yearFilter"
      @change="setYearFilter"
    />
    <BaseSelectorType
      class="type-selectors__selector"
      label="Selector de Campaña"
      width-select="220px"
      :items="samplesStore.campaignOptions"
      :last-active-item="samplesStore.campaignFilter"
      @change="setCampaignFilter"
    />
  </div>
</template>

<style scoped lang="scss">
.type-selectors {
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;

  &__selector {
    padding: 1vw 0.5vw;
    padding-top: 0.5vw;
    margin-right: 15px;
    margin-left: 15px;
    width: 220px;
  }
}
</style>
