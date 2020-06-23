<template>
  <div class="app-info">
    <div class="panel-controls">
      <div
        class="show-button show-button__left"
        title="Sensors"
        data-cy="sensorsToggle"
        @click="sensorsOpen = !sensorsOpen"
      >
        <object
          :data="require('@/assets/sensors.svg')"
          type="image/svg+xml"
          style="height:100%; pointer-events: none;"
        />
      </div>
      <div
        class="show-button show-button__right"
        title="Products"
        data-cy="productsToggle"
        @click="productsOpen = !productsOpen"
      >
        <object
          :data="require('@/assets/products.svg')"
          type="image/svg+xml"
          style="height:100%; pointer-events: none;"
        />
      </div>
    </div>
    <div class="transition-sensors">
      <transition name="slide" class="sensors">
        <div
          v-show="isSensorsOpen"
          data-cy="sensorsPanel"
          :class="[
            'side-panel',
            'side-panel__sensors',
            isSensorsExpanded ? 'side-panel__expanded' : 'side-panel__reduced'
          ]"
        >
          <div class="header-panel">
            <div
              :class="[
                'header-buttons',
                'header-buttons__left',
                isSensorsExpanded ? 'header-buttons__expanded' : ''
              ]"
            >
              <i
                data-cy="sensorsTogglePanel"
                class="fas fa-times header-button"
                @click="sensorsOpen = !sensorsOpen"
              />
              <i
                :class="[
                  'header-button',
                  isSensorsExpanded ? 'fas fa-angle-down' : 'fas fa-angle-up'
                ]"
                data-cy="sensorsTogglePanelExpanded"
                @click="sensorsExpanded = !sensorsExpanded"
              />
            </div>
          </div>
          <panel-sensors
            :table-max-height="computedTableMaxHeightSensors"
            :table-elements="computedTableMaxItemsSensors"
          ></panel-sensors>
        </div>
      </transition>
    </div>
    <div class="transition-products">
      <transition name="slide" class="products">
        <div
          v-show="isProductsOpen"
          data-cy="productsPanel"
          :class="[
            'side-panel',
            'side-panel__products',
            isProductsExpanded ? 'side-panel__expanded' : 'side-panel__reduced'
          ]"
        >
          <div class="header-panel">
            <div
              :class="[
                'header-buttons',
                'header-buttons__right',
                isProductsExpanded ? 'header-buttons__expanded' : ''
              ]"
            >
              <i
                data-cy="productsTogglePanel"
                class="fas fa-times header-button"
                @click="productsOpen = !productsOpen"
              />
              <i
                :class="[
                  'header-button',
                  isProductsExpanded ? 'fas fa-angle-down' : 'fas fa-angle-up'
                ]"
                data-cy="productsTogglePanelExpanded"
                @click="productsExpanded = !productsExpanded"
              />
            </div>
          </div>
          <panel-products
            :table-max-height="computedTableMaxHeightProducts"
            :table-elements="computedTableMaxItemsProducts"
          ></panel-products>
        </div>
      </transition>
    </div>
    <div class="transition-filters">
      <transition name="slide" class="filters">
        <div
          :class="[
            'top-panel',
            isFiltersExpanded ? 'top-panel__expanded' : 'top-panel__reduced'
          ]"
        >
          <div
            data-cy="filtersPanel"
            :class="[
              'top-panel-body',
              isFiltersExpanded
                ? 'top-panel-body__expanded'
                : 'top-panel-body__reduced'
            ]"
          >
            <panel-filters :filters-width="computedSelectWidth"></panel-filters>
          </div>
          <div
            class="top-panel__footer"
            data-cy="filtersToggle"
            @click="filtersExpanded = !filtersExpanded"
          >
            <div class="top-panel__footer__icon">
              <object
                :data="require('@/assets/filters.svg')"
                type="image/svg+xml"
                style="pointer-events: none;"
              />
            </div>
            <label class="top-panel__footer__label">Filters Manager</label>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import { resizeHelperMixin } from "@/mixins/resize-helper.js";
import PanelProducts from "@/components/PanelProducts.vue";
import PanelSensors from "@/components/PanelSensors.vue";
import PanelFilters from "@/components/PanelFilters.vue";
import { mapGetters } from "vuex";
import * as types from "@/store/types";
export default {
  components: {
    "panel-products": PanelProducts,
    "panel-sensors": PanelSensors,
    "panel-filters": PanelFilters
  },
  mixins: [resizeHelperMixin],
  data() {
    return {
      filtersExpanded: false,
      productsOpen: false,
      productsExpanded: false,
      sensorsOpen: false,
      sensorsExpanded: false
    };
  },
  computed: {
    ...mapGetters({
      areProductsData: [types.G_GET_PRODUCTS_COUNT],
      areSensorsData: [types.G_GET_SENSORS_COUNT],
      areFiltersReady: [types.G_GET_FILTERS_READY]
    }),
    isFiltersExpanded() {
      return this.filtersExpanded;
    },
    isProductsOpen() {
      return this.productsOpen;
    },
    isProductsExpanded() {
      return this.productsExpanded;
    },
    isSensorsOpen() {
      return this.sensorsOpen;
    },
    isSensorsExpanded() {
      return this.sensorsExpanded;
    }
  },
  watch: {
    areFiltersReady(newValue) {
      this.filtersExpanded = newValue;
    },
    areProductsData(newValue) {
      this.productsOpen = newValue > 0 ? true : false;
    },
    areSensorsData(newValue) {
      this.sensorsOpen = newValue > 0 ? true : false;
    }
  },
  mounted() {
    this.setEventResize();
  }
};
</script>
<style scoped lang="scss">
.slide-enter-active,
.slide-leave-active {
  transition: transform 500ms ease;
}

.slide-enter,
.slide-leave-to {
  transition: all 500ms ease-in 0s;
}

.transition-sensors {
  .slide-enter,
  .slide-leave-to {
    transform: translateX(-100%);
  }
}

.transition-products {
  .slide-enter,
  .slide-leave-to {
    transform: translateX(+100%);
  }
}

.transition-filters {
  .slide-enter,
  .slide-leave-to {
    transform: translateY(-100%);
  }
}

.show-button {
  height: 6vh;
  position: fixed;
  z-index: 1; /* Needs to sit above the map menu icon */
  top: 60vh;
  border-radius: 50%;
  border: solid $color-primary;
  &:hover {
    cursor: pointer;
  }

  &__right {
    right: 0;
  }

  &__left {
    left: 0;
  }
}

.header-panel {
  padding: 1.5vw;

  .header-button {
    margin: 0 5px;
    &:hover {
      cursor: pointer;
    }
  }

  .header-buttons {
    margin: 0 5px;
    display: flex;
    &__expanded {
      margin-top: calc(1.5vh + 20px);
      margin-bottom: calc(-1.5vh - 20px);
    }
    &__right {
      flex-direction: row;
    }

    &__left {
      flex-direction: row-reverse;
    }
  }
}

.top-panel {
  border: 1.5px solid $color-light-grey;
  left: 20vw;
  width: 60vw;
  position: fixed;
  z-index: 2; /* Needs to sit above the menu icon */
  opacity: 1;
  background-image: $color-panels;
  border-radius: 0 0 45px 45px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  &__expanded {
    top: 0;
    transition: all 500ms ease-in 0s;
  }

  &__reduced {
    top: -15.5vh;
    transition: all 500ms ease-in 0s;
  }
  .top-panel-body {
    width: 100%;
    overflow: hidden;
    transition: all 500ms ease-in 0s;
    &__expanded {
      min-height: 0;
      max-height: 25vh;
      transition: all 500ms ease-in 0s;
    }

    &__reduced {
      min-height: 15vh;
      max-height: 15vh;
      transition: all 500ms ease-in 0s;
    }
  }

  &__footer {
    height: 25px;
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    padding: 0.5rem;
    border-top: 1.5px solid $color-light-grey;

    &:hover {
      background: $color-light-grey;
      cursor: pointer;
    }
    &__icon {
      width: 32px;
      margin: 0 5px;
    }
    &__label {
      font-weight: bold;
      margin: 6px 5px;
      &:hover {
        cursor: pointer;
      }
    }
  }
}

.side-panel {
  border: 1.5px solid $color-light-grey;
  height: 40vh;
  top: 60vh;
  width: 40vw;
  position: fixed;
  z-index: 2; /* Needs to sit above the menu icon */
  opacity: 1;
  background-image: $color-panels;

  &__expanded {
    top: 0;
    height: 100vh;
    transition: all 500ms ease-in 0s;
  }

  &__reduced {
    transition: all 500ms ease-in 0s;
  }

  &__products {
    right: 0;
    border-radius: 45px 0 0 0;
    padding: 0 0.5vh 0 0.5vh;
  }

  &__sensors {
    left: 0;
    border-radius: 0 45px 0 0;
    padding: 0 0.5vh 0 0.5vh;
  }
}
</style>
