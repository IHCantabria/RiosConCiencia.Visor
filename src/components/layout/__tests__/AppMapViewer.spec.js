import { shallowMount, createLocalVue } from "@vue/test-utils";
import AppMapViewer from "../AppMapViewer.vue";
import merge from "lodash.merge";
import Vuex from "vuex";
import * as types from "@/store/types";

const localVue = createLocalVue();
localVue.use(Vuex);

function createWrapper(overrides) {
  const defaultMountingOptions = {
    localVue
  };
  return shallowMount(AppMapViewer, merge(defaultMountingOptions, overrides));
}

describe("appMapViewer.vue", () => {
  let store;
  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        coords: {
          state: {
            goToCoords: null
          },
          actions: {
            [types.A_SET_SEARCH_COORDS]: jest.fn()
          }
        }
      }
    });
  });
  //UNIT TESTS
  it("computed markers update when sensors and products change", () => {
    expect.assertions(1);
    store.hotUpdate({
      getters: {
        [types.G_GET_SENSORS_SELECTED]: () => [{}, {}],
        [types.G_GET_PRODUCTS_SELECTED]: () => [{}, {}]
      }
    });
    const wrapper = createWrapper({
      store
    });
    expect(wrapper.vm.markers).toStrictEqual([{}, {}, {}, {}]);
  });
  it("setSearchCoords is called when searchCoords is called", () => {
    expect.assertions(1);
    const setSearchCoords = jest.fn();
    store.hotUpdate({
      getters: {
        [types.G_GET_SENSORS_SELECTED]: () => [{}, {}],
        [types.G_GET_PRODUCTS_SELECTED]: () => [{}, {}]
      },
      actions: {
        [types.A_SET_SEARCH_COORDS]: setSearchCoords
      }
    });
    const wrapper = createWrapper({
      store
    });
    wrapper.vm.searchCoords("t");
    expect(setSearchCoords).toHaveBeenCalled();
  });
  it("searchExtends is called when setSearchCoords is called", () => {
    expect.assertions(1);
    const setSearchCoords = jest.fn();
    store.hotUpdate({
      getters: {
        [types.G_GET_SENSORS_SELECTED]: () => [{}, {}],
        [types.G_GET_PRODUCTS_SELECTED]: () => [{}, {}]
      },
      actions: {
        [types.A_SET_SEARCH_COORDS]: setSearchCoords
      }
    });
    const wrapper = createWrapper({
      store
    });
    wrapper.vm.searchExtends("t");
    expect(setSearchCoords).toHaveBeenCalled();
  });
  it("setSearchCoords is called when searchGlobal is called", () => {
    expect.assertions(1);
    const setSearchCoords = jest.fn();
    store.hotUpdate({
      getters: {
        [types.G_GET_SENSORS_SELECTED]: () => [{}, {}],
        [types.G_GET_PRODUCTS_SELECTED]: () => [{}, {}]
      },
      actions: {
        [types.A_SET_SEARCH_COORDS]: setSearchCoords
      }
    });
    const wrapper = createWrapper({
      store
    });
    wrapper.vm.searchGlobal("t");
    expect(setSearchCoords).toHaveBeenCalled();
  });
  //SNAPSHOT TESTS
  it("renders correctly", () => {
    expect.assertions(1);
    store.hotUpdate({
      getters: {
        [types.G_GET_SENSORS_SELECTED]: () => [{}, {}],
        [types.G_GET_PRODUCTS_SELECTED]: () => [{}, {}]
      }
    });
    const wrapper = createWrapper({ store });
    expect(wrapper.element).toMatchSnapshot();
  });
});
