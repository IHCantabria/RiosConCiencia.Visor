import { shallowMount, createLocalVue } from "@vue/test-utils";
import PanelFilters from "../PanelFilters.vue";
import merge from "lodash.merge";
import Vuex from "vuex";
import Vuesax from "vuesax";
import * as types from "@/store/types";

const localVue = createLocalVue();
localVue.use(Vuesax);
localVue.use(Vuex);

function createWrapper(overrides) {
  const defaultMountingOptions = {
    propsData: {},
    localVue
  };
  return shallowMount(PanelFilters, merge(defaultMountingOptions, overrides));
}

describe("panelFilters.vue", () => {
  let store;
  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        apiSensors: {
          state: {
            buoyTypes: null,
            stationTypes: null
          },
          getters: {
            [types.G_GET_SENSORS_SORTED]: () => []
          }
        },
        datahub: {
          getters: {
            [types.G_GET_PRODUCTVARIABLETYPES_BY_PRODUCTMOMENTS]: () => []
          }
        },
        filters: {
          state: {
            variableFilter: null,
            momentFilter: null,
            stationTypeFilter: null,
            buoyTypeFilter: null
          },
          actions: {
            [types.A_SET_FILTER_MOMENT]: jest.fn(),
            [types.A_SET_FILTER_VARIABLE]: jest.fn(),
            [types.A_SET_FILTER_BUOYSTYPE]: jest.fn(),
            [types.A_SET_FILTER_STATIONSTYPE]: jest.fn()
          }
        }
      }
    });
  });
  //UNIT TESTS
  it("setProductsMomentFilter is called when setMomentFilter is called", () => {
    expect.assertions(1);
    const setProductsMomentFilter = jest.fn();
    store.hotUpdate({
      getters: {
        [types.G_GET_PRODUCTMOMENTS_SORTED]: () => null
      },
      actions: {
        [types.A_SET_FILTER_MOMENT]: setProductsMomentFilter
      }
    });
    const wrapper = createWrapper({
      store
    });
    wrapper.vm.setMomentFilter("t");
    expect(setProductsMomentFilter).toHaveBeenCalled();
  });
  it("setProductsVariableFilter is called when setVariableFilter is called", () => {
    expect.assertions(1);
    const setProductsVariableFilter = jest.fn();
    store.hotUpdate({
      getters: {
        [types.G_GET_PRODUCTMOMENTS_SORTED]: () => null
      },
      actions: {
        [types.A_SET_FILTER_VARIABLE]: setProductsVariableFilter
      }
    });
    const wrapper = createWrapper({
      store
    });
    wrapper.vm.setVariableFilter();
    expect(setProductsVariableFilter).toHaveBeenCalled();
  });
  it("setSensorsBuoyTypeFilter is called when setBuoyTypeFilter is called", () => {
    expect.assertions(1);
    const setSensorsBuoyTypeFilter = jest.fn();
    store.hotUpdate({
      getters: {
        [types.G_GET_PRODUCTMOMENTS_SORTED]: () => null
      },
      actions: {
        [types.A_SET_FILTER_BUOYSTYPE]: setSensorsBuoyTypeFilter
      }
    });
    const wrapper = createWrapper({
      store
    });
    wrapper.vm.setBuoyTypeFilter();
    expect(setSensorsBuoyTypeFilter).toHaveBeenCalled();
  });
  it("setSensorsStationTypeFilter is called when setStationTypeFilter is called", () => {
    expect.assertions(1);
    const setSensorsStationTypeFilter = jest.fn();
    store.hotUpdate({
      getters: {
        [types.G_GET_PRODUCTMOMENTS_SORTED]: () => null
      },
      actions: {
        [types.A_SET_FILTER_STATIONSTYPE]: setSensorsStationTypeFilter
      }
    });
    const wrapper = createWrapper({
      store
    });
    wrapper.vm.setStationTypeFilter();
    expect(setSensorsStationTypeFilter).toHaveBeenCalled();
  });
  it("setAllowFilters is called when toggleFilters is called", () => {
    expect.assertions(1);
    const setOnlySpatialFilters = jest.fn();
    store.hotUpdate({
      getters: {
        [types.G_GET_PRODUCTMOMENTS_SORTED]: () => null
      },
      actions: {
        [types.A_SET_FILTER_ONLY_SPATIAL_FILTERS]: setOnlySpatialFilters
      }
    });
    const wrapper = createWrapper({
      store
    });
    wrapper.vm.toggleSpatialFilters();
    expect(setOnlySpatialFilters).toHaveBeenCalled();
  });
  it("setAllowSearchProducts is called when toggleProducts is called", () => {
    expect.assertions(1);
    const setAllowSearchProducts = jest.fn();
    store.hotUpdate({
      getters: {
        [types.G_GET_PRODUCTMOMENTS_SORTED]: () => null
      },
      actions: {
        [types.A_SET_FILTER_ALLOW_PRODUCTS]: setAllowSearchProducts
      }
    });
    const wrapper = createWrapper({
      store
    });
    wrapper.vm.toggleProducts();
    expect(setAllowSearchProducts).toHaveBeenCalled();
  });
  it("setAllowSearchBuoys is called when toggleBuoys is called", () => {
    expect.assertions(1);
    const setAllowSearchBuoys = jest.fn();
    store.hotUpdate({
      getters: {
        [types.G_GET_PRODUCTMOMENTS_SORTED]: () => null
      },
      actions: {
        [types.A_SET_FILTER_ALLOW_BUOYS]: setAllowSearchBuoys
      }
    });
    const wrapper = createWrapper({
      store
    });
    wrapper.vm.toggleBuoys();
    expect(setAllowSearchBuoys).toHaveBeenCalled();
  });
  it("setAllowSearchStations is called when toggleStations is called", () => {
    expect.assertions(1);
    const setAllowSearchStations = jest.fn();
    store.hotUpdate({
      getters: {
        [types.G_GET_PRODUCTMOMENTS_SORTED]: () => null
      },
      actions: {
        [types.A_SET_FILTER_ALLOW_STATIONS]: setAllowSearchStations
      }
    });
    const wrapper = createWrapper({
      store
    });
    wrapper.vm.toggleStations();
    expect(setAllowSearchStations).toHaveBeenCalled();
  });
  //SNAPSHOT TESTS
  it("renders correctly by default", () => {
    expect.assertions(1);
    store.hotUpdate({
      getters: {
        [types.G_GET_PRODUCTMOMENTS_SORTED]: () => null
      }
    });
    const wrapper = createWrapper({
      store
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("renders correctly with moments", () => {
    expect.assertions(1);
    store.hotUpdate({
      getters: {
        [types.G_GET_PRODUCTMOMENTS_SORTED]: () => [
          {
            id: 1,
            label: "Past",
            icon: "history",
            name: "Past",
            color: "#dce8f4"
          },
          {
            id: 2,
            label: "Present",
            icon: "play_arrow",
            name: "Present",
            color: "#98c5d1"
          },
          {
            id: 3,
            label: "Short-term Forecast",
            icon: "redo",
            name: "Short term future",
            color: "#00a09e"
          },
          {
            id: 4,
            label: "Climate Change",
            icon: "last_page",
            name: "Long term future",
            color: "#19535F"
          }
        ]
      }
    });
    const wrapper = createWrapper({
      store
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  it("renders correctly with momentFilter", () => {
    expect.assertions(1);
    store.hotUpdate({
      getters: {
        [types.G_GET_PRODUCTMOMENTS_SORTED]: () => null
      },
      state: {
        momentFilter: {}
      }
    });
    const wrapper = createWrapper({
      store
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
