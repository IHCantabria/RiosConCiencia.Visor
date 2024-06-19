<script setup>
import { onMounted, watch } from "vue";
import BaseSelectorType from "@/components/ui/BaseSelectorType.vue";
import { useSamplesStore } from "@/store/samplesStore";
import { useRoute, useRouter } from "vue-router";

// COMPOSABLES & STORES
const route = useRoute();
const router = useRouter();
const samplesStore = useSamplesStore();

// LYFECYCLE
onMounted(() => {
  implementRouteParams();
});

// METHODS
const implementRouteParams = () => {
  let validYear = null;
  let validCampaign = null;

  if (route.params.year) {
    const numberParamYear = Number(route.params.year);
    if (!isNaN(numberParamYear)) {
      const year = samplesStore.yearOptions.find((option) => {
        return option.name === numberParamYear;
      });
      if (year) validYear = year;
    }
  }

  if (route.params.campaign) {
    const campaign = samplesStore.campaignOptions.find(
      (option) => option.name === route.params.campaign,
    );
    if (campaign) validCampaign = campaign;
  }

  if (validYear && validCampaign) {
    samplesStore.setSampleYearFilter(validYear);
    samplesStore.setSampleCampaignFilter(validCampaign);
  } else {
    router.push("/");
  }
};

const setYearFilter = (year) => {
  samplesStore.setSampleYearFilter(year);
};
const setCampaignFilter = (type) => {
  samplesStore.setSampleCampaignFilter(type);
};

// WATCH
watch(
  () => route.params,
  () => {
    implementRouteParams();
  },
);
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
