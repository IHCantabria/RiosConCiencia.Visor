<template>
  <div class="app-filters">
    <div class="variable-selectors">
      <div class="type-selectors">
        <type-selector
          class="type-selectors__selector"
          label="Selector de Año"
          width-select="300px"
          :items="yearOptions"
          @change="setYearFilter"
        ></type-selector>
        <type-selector
          class="type-selectors__selector"
          label="Selector de Campaña"
          width-select="300px"
          :items="campaignOptions"
          @change="setCampaignFilter"
        ></type-selector>
      </div>
    </div>
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
    margin: 1vw;
  }
}
</style>
