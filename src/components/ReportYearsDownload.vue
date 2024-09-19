<script setup>
import { onBeforeMount, ref } from "vue";
import { useSamplesStore } from "@/store/samplesStore";
import BaseSelectorType from "@/components/ui/BaseSelectorType.vue";

const samplesStore = useSamplesStore();

const reportYearsOptions = ref(null);

onBeforeMount(() => {
  setReportYearOptions();
});

const setReportYearOptions = () => {
  const downloadOptions = JSON.parse(JSON.stringify(samplesStore.yearOptions));
  reportYearsOptions.value = [
    ...new Set(downloadOptions.filter((campaign) => campaign.name >= 2020)),
  ];
};

const setReportDownloadYear = (year) => {
  samplesStore.reportDownloadYear = year;
};
</script>

<template>
  <div class="type-selectors">
    <BaseSelectorType
      class="type-selectors__selector"
      width-select="220px"
      :items="reportYearsOptions"
      @change="setReportDownloadYear"
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
