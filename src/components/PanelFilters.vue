<template>
  <div v-if="moments" class="app-filters">
    <template v-if="moments">
      <filters-advanced
        class="filters-advanced"
        data-cy="filtersAdvancedToggle"
        @only-spatial-filters-actived="toggleSpatialFilters"
        @products-actived="toggleProducts"
        @buoys-actived="toggleBuoys"
        @stations-actived="toggleStations"
      ></filters-advanced>
      <panel-about class="panel-about"></panel-about>
      <div
        :class="[
          computedShowTypeFilters
            ? 'type-filters__expanded'
            : 'type-filters__reduced'
        ]"
      >
        <div class="time-selectors">
          <slider
            class="time-selectors__selector"
            :range-data="moments"
            theme="light"
            @change="setMomentFilter"
          ></slider>
        </div>
        <div class="variable-selectors">
          <vs-tabs v-if="momentFilter" ref="filtersTabs" position="left">
            <vs-tab label="Products">
              <variable-selector
                v-if="productTypes"
                class="variable-selectors__selector"
                :items="productTypes"
                :last-active-item="variableFilter"
                @change="setVariableFilter"
              ></variable-selector>
            </vs-tab>
            <vs-tab label="Sensors">
              <div class="type-selectors">
                <type-selector
                  v-if="buoyTypes"
                  class="type-selectors__selector"
                  label="Buoy Type Selector"
                  :width-select="filtersWidth"
                  :items="buoyTypes"
                  :last-active-item="buoyTypeFilter"
                  @change="setBuoyTypeFilter"
                ></type-selector>
                <type-selector
                  v-if="stationTypes"
                  class="type-selectors__selector"
                  label="Station Type Selector"
                  :width-select="filtersWidth"
                  :items="stationTypes"
                  :last-active-item="stationTypeFilter"
                  @change="setStationTypeFilter"
                ></type-selector>
              </div>
            </vs-tab>
          </vs-tabs>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from "vuex";
import * as types from "@/store/types";
import rangeSlider from "@/Lib/components/RangeSlider";
import radioButtonList from "@/Lib/components/RadioButtonList";
import BaseSelectorType from "@/components/ui/BaseSelectorType";
import BaseToggleFilters from "@/components/ui/BaseToggleFilters";
import AppAbout from "@/components/layout/AppAbout.vue";
export default {
  components: {
    slider: rangeSlider,
    "variable-selector": radioButtonList,
    "type-selector": BaseSelectorType,
    "filters-advanced": BaseToggleFilters,
    "panel-about": AppAbout
  },
  props: {
    filtersWidth: {
      type: String,
      required: false,
      default: () => {
        return "200px";
      }
    }
  },
  data() {
    return {
      showTypeFilters: false
    };
  },
  computed: {
    ...mapState({
      stationTypeFilter: state => state.filters.stationTypeFilter,
      buoyTypeFilter: state => state.filters.buoyTypeFilter,
      variableFilter: state => state.filters.variableFilter,
      momentFilter: state => state.filters.momentFilter,
      buoyTypes: state => state.apiSensors.buoyTypes,
      stationTypes: state => state.apiSensors.stationTypes
    }),
    ...mapGetters({
      moments: [types.G_GET_PRODUCTMOMENTS_SORTED],
      productTypes: [types.G_GET_PRODUCTVARIABLETYPES_BY_PRODUCTMOMENTS]
    }),
    computedShowTypeFilters() {
      return this.showTypeFilters ? false : true;
    }
  },
  watch: {
    momentFilter: {
      handler() {
        this.resetSelections();
        this.stationTypes
          ? this.setStationTypeFilter(this.stationTypes[0])
          : "";
        this.buoyTypes ? this.setBuoyTypeFilter(this.buoyTypes[0]) : "";
      },
      deep: true
    },
    stationTypes: {
      handler() {
        this.setStationTypeFilter(this.stationTypes[0]);
      },
      deep: true
    },
    buoyTypes: {
      handler() {
        this.setBuoyTypeFilter(this.buoyTypes[0]);
      },
      deep: true
    }
  },
  methods: {
    ...mapActions({
      setProductsMomentFilter: types.A_SET_FILTER_MOMENT,
      setProductsVariableFilter: types.A_SET_FILTER_VARIABLE,
      setSensorsBuoyTypeFilter: types.A_SET_FILTER_BUOYSTYPE,
      setSensorsStationTypeFilter: types.A_SET_FILTER_STATIONSTYPE,
      setOnlySpatialFilters: types.A_SET_FILTER_ONLY_SPATIAL_FILTERS,
      setAllowSearchProducts: types.A_SET_FILTER_ALLOW_PRODUCTS,
      setAllowSearchBuoys: types.A_SET_FILTER_ALLOW_BUOYS,
      setAllowSearchStations: types.A_SET_FILTER_ALLOW_STATIONS
    }),
    setMomentFilter(moment) {
      this.setProductsMomentFilter(moment);
    },
    setVariableFilter(variable) {
      this.setProductsVariableFilter(variable);
    },
    setBuoyTypeFilter(type) {
      this.setSensorsBuoyTypeFilter(type);
    },
    setStationTypeFilter(type) {
      this.setSensorsStationTypeFilter(type);
    },
    toggleSpatialFilters(isActive) {
      this.showTypeFilters = isActive;
      this.setOnlySpatialFilters(isActive);
    },
    toggleProducts(isActive) {
      this.setAllowSearchProducts(isActive);
    },
    toggleBuoys(isActive) {
      this.setAllowSearchBuoys(isActive);
    },
    toggleStations(isActive) {
      this.setAllowSearchStations(isActive);
    },
    resetSelections() {
      this.$refs.filtersTabs ? this.$refs.filtersTabs.activeChild(0) : ""; //select Products Tab
      this.setProductsVariableFilter(null);
      this.setBuoyTypeFilter(null);
      this.setStationTypeFilter(null);
    }
  }
};
</script>
<style scoped lang="scss">
.app-filters {
  display: flex;
  flex-direction: column;
}
.type-filters {
  &__expanded {
    max-height: 25vh;
    transition: all 500ms ease-in 0s;
  }
  &__reduced {
    max-height: 0;
    transition: all 500ms ease-in 0s;
  }
}

.time-selectors {
  width: 120%;
  transform: scale(0.8);
  margin-top: 1%;
  margin-bottom: 5%;

  &__selector {
    width: 115%;
    transform: translateX(-15%);
  }
}

.variable-selectors {
  border-top: 1.5px solid $color-light-grey;
  width: 100%;
  padding: 1%;
  margin: 1% 0%;
  display: flex;

  &__selector {
    width: 120%;
    transform-origin: left;
    transform: scale(0.8);
  }
}

.type-selectors {
  width: 100%;
  display: flex;
  flex-flow: row wrap;

  &__selector {
    margin: 1vw;
  }
}
.filters-advanced {
  top: 0;
  left: 0;
  z-index: 1;
  position: absolute;
}
.panel-about {
  top: 0;
  right: 0;
  z-index: 1;
  position: absolute;
}
</style>
