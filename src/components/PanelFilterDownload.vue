<template>
  <div class="type-selectors">
    <type-selector-multiple
      class="type-selectors__selector"
      width-select="220px"
      :items="downloadOptions"
      :last-active-items="downloadFilters"
      @change="setDownloadFilters"
    ></type-selector-multiple>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import * as types from "@/store/types";
import BaseSelectorTypeMultiple from "@/components/ui/BaseSelectorTypeMultiple";
export default {
  components: {
    "type-selector-multiple": BaseSelectorTypeMultiple
  },
  computed: {
    ...mapState({
      downloadFilters: state => state.samples.downloadFilters,
      downloadOptions: state => state.samples.downloadOptions
    })
  },
  methods: {
    ...mapActions({
      setSampleDownloadFilters: types.A_SET_SAMPLE_DOWNLOAD_FILTERS
    }),
    setDownloadFilters(filters) {
      this.setSampleDownloadFilters(filters);
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
