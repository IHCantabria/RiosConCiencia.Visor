<template>
  <div class="type-selectors">
    <type-selector
      class="type-selectors__selector"
      label="Selector de Año"
      width-select="220px"
      :items="yearOptions"
      :last-active-item="yearFilter"
      @change="setYearFilter"
    ></type-selector>
    <type-selector
      class="type-selectors__selector"
      label="Selector de Campaña"
      width-select="220px"
      :items="campaignOptions"
      :last-active-item="campaignFilter"
      @change="setCampaignFilter"
    ></type-selector>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import * as types from "@/store/types";
import BaseSelectorType from "@/components/ui/BaseSelectorType";
export default {
  components: {
    "type-selector": BaseSelectorType
  },
  computed: {
    ...mapState({
      campaignFilter: state => state.samples.campaignFilter,
      yearFilter: state => state.samples.yearFilter,
      campaignOptions: state => state.samples.campaignOptions,
      yearOptions: state => state.samples.yearOptions
    })
  },
  methods: {
    ...mapActions({
      setSampleCampaignFilter: types.A_SET_SAMPLE_CAMPAIGN_FILTER,
      setSampleYearFilter: types.A_SET_SAMPLE_YEAR_FILTER
    }),
    setCampaignFilter(type) {
      this.setSampleCampaignFilter(type);
    },
    setYearFilter(year) {
      this.setSampleYearFilter(year);
    }
  }
};
</script>
<style scoped lang="scss">
.type-selectors {
  width: 100%;
  display: flex;
  flex-flow: row wrap;

  &__selector {
    padding: 1vw 0.5vw 1vw 0.5vw;
    padding-top: 0.5vw;
    margin-right: 15px;
    margin-left: 15px;
  }
}
</style>
