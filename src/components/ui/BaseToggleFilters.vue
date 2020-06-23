<template>
  <div class="toggle-filters">
    <vs-dropdown
      title="Advanced Filters"
      class="toggler"
      vs-trigger-click
      vs-custom-content
    >
      <div class="toggle-icon">
        <object
          :data="require('@/assets/advanced.svg')"
          type="image/svg+xml"
          style="pointer-events: none;"
        />
      </div>
      <vs-dropdown-menu>
        <div class="switch-container">
          <label class="switch">Only Spatial Filters</label>
          <vs-switch
            v-model="onlySpatialFiltersToggle"
            vs-icon="done"
            vs-icon-off="block"
            class="switch"
          >
          </vs-switch>
        </div>
        <div class="switch-container">
          <label class="switch">Search Products</label>
          <vs-switch
            v-model="searchProductsToggle"
            vs-icon="done"
            vs-icon-off="block"
            class="switch"
          >
          </vs-switch>
        </div>
        <div class="switch-container">
          <label class="switch">Search Buoys</label>
          <vs-switch
            v-model="searchBuoysToggle"
            vs-icon="done"
            vs-icon-off="block"
            class="switch"
          >
          </vs-switch>
        </div>
        <!--Commented to hide station logic
        <div class="switch-container">
          <label class="switch">Search Stations</label>
          <vs-switch
            v-model="searchStationsToggle"
            vs-icon="done"
            vs-icon-off="block"
            class="switch"
          >
          </vs-switch>
        </div> -->
      </vs-dropdown-menu>
    </vs-dropdown>
  </div>
</template>
<script>
export default {
  data() {
    return {
      onlySpatialFiltersToggle: false,
      searchProductsToggle: true,
      searchBuoysToggle: true,
      //SearchStationsToggle is False to hide station logic
      searchStationsToggle: false
    };
  },
  computed: {
    areOnlySpatialFiltersActive() {
      return this.onlySpatialFiltersToggle;
    },
    isSearchProductsActive() {
      return this.searchProductsToggle;
    },
    isSearchBuoysActive() {
      return this.searchBuoysToggle;
    },
    isSearchStationsActive() {
      return this.searchStationsToggle;
    }
  },
  watch: {
    areOnlySpatialFiltersActive(newValue) {
      this.$emit("only-spatial-filters-actived", newValue);
    },
    isSearchProductsActive(newValue) {
      this.$emit("products-actived", newValue);
    },
    isSearchBuoysActive(newValue) {
      this.$emit("buoys-actived", newValue);
    },
    isSearchStationsActive(newValue) {
      this.$emit("stations-actived", newValue);
    }
  }
};
</script>
<style lang="scss" scoped>
.toggler {
  &:hover {
    cursor: pointer;
  }
}
.toggle-icon {
  width: 26px;
  padding: 5px;
  margin: 0 0 0 4px;
  &:hover {
    cursor: pointer;
  }
}
.switch {
  margin: 2px;
}
.switch-container {
  justify-content: space-between;
  display: flex;
  flex-flow: nowrap row;
}
</style>
