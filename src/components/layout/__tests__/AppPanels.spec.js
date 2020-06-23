import { shallowMount, createLocalVue } from "@vue/test-utils";
import AppPanels from "../AppPanels.vue";
import merge from "lodash.merge";
import Vuex from "vuex";
import * as types from "@/store/types";

const localVue = createLocalVue();
localVue.use(Vuex);

function createWrapper(overrides) {
  const defaultMountingOptions = {
    localVue
  };
  return shallowMount(AppPanels, merge(defaultMountingOptions, overrides));
}

describe("appPanels.vue", () => {
  let store;
  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        apiSensors: {
          getters: {
            [types.G_GET_SENSORS_COUNT]: () => true
          }
        },
        datahub: {
          getters: {
            [types.G_GET_PRODUCTS_COUNT]: () => true
          }
        },
        filters: {
          getters: {
            [types.G_GET_FILTERS_READY]: () => false
          }
        }
      }
    });
  });
  //UNIT TESTS
  it("init setEventResize called after mounted", () => {
    expect.assertions(1);
    const setEventResize = jest.fn();
    createWrapper({
      methods: {
        setEventResize
      },
      store
    });
    expect(setEventResize).toHaveBeenCalled();
  });
  it("computed isFiltersExpanded updated when filtersExpanded change", () => {
    expect.assertions(2);
    const wrapper = createWrapper({ store });
    expect(wrapper.vm.isFiltersExpanded).toBe(false);
    wrapper.setData({ filtersExpanded: true });
    expect(wrapper.vm.isFiltersExpanded).toBe(true);
  });
  it("computed isProductsOpen updated when productsOpen change", () => {
    expect.assertions(2);
    const wrapper = createWrapper({ store });
    expect(wrapper.vm.isProductsOpen).toBe(false);
    wrapper.setData({ productsOpen: true });
    expect(wrapper.vm.isProductsOpen).toBe(true);
  });
  it("computed isProductsExpanded updated when productsExpanded", () => {
    expect.assertions(2);
    const wrapper = createWrapper({ store });
    expect(wrapper.vm.isProductsExpanded).toBe(false);
    wrapper.setData({ productsExpanded: true });
    expect(wrapper.vm.isProductsExpanded).toBe(true);
  });
  it("computed isSensorsOpen updated when sensorsOpen", () => {
    expect.assertions(2);
    const wrapper = createWrapper({ store });
    expect(wrapper.vm.isSensorsOpen).toBe(false);
    wrapper.setData({ sensorsOpen: true });
    expect(wrapper.vm.isSensorsOpen).toBe(true);
  });
  it("computed isSensorsExpanded updated when sensorsExpanded", () => {
    expect.assertions(2);
    const wrapper = createWrapper({ store });
    expect(wrapper.vm.isSensorsExpanded).toBe(false);
    wrapper.setData({ sensorsExpanded: true });
    expect(wrapper.vm.isSensorsExpanded).toBe(true);
  });
  //SNAPSHOT TESTS
  it("renders correctly", () => {
    expect.assertions(1);
    const wrapper = createWrapper({ store });
    expect(wrapper.element).toMatchSnapshot();
  });
});
