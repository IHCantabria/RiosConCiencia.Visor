import { shallowMount, createLocalVue } from "@vue/test-utils";
import PanelSensors from "../PanelSensors.vue";
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
  return shallowMount(PanelSensors, merge(defaultMountingOptions, overrides));
}

describe("panelSensors", () => {
  let store;
  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        coords: {
          state: {
            searchCoords: {}
          },
          actions: {
            [types.A_SET_GO_TO_COORDS]: jest.fn()
          }
        },
        apiSensors: {
          getters: {
            [types.G_GET_SENSORS_SORTED]: () => [
              {
                id: 51,
                mapID: "51B",
                selected: true,
                name: "VigoTG",
                type: "marker",
                typeSensor: "Buoy",
                subTypeSensors: "Mareógrafo",
                distance: 0,
                latitude: 42.24300003,
                longitude: -8.72599983,
                color: "blue"
              },
              {
                id: 52,
                mapID: "52B",
                selected: true,
                name: "VillagarciaTG",
                type: "marker",
                typeSensor: "Buoy",
                subTypeSensors: "Mareógrafo",
                distance: 0,
                latitude: 42.60100174,
                longitude: -8.77000046,
                color: "blue"
              },
              {
                id: 54,
                mapID: "54B",
                selected: true,
                name: "MarinTG",
                type: "marker",
                typeSensor: "Buoy",
                subTypeSensors: "Mareógrafo",
                distance: 0,
                latitude: 42.406101226,
                longitude: -8.6911001205,
                color: "blue"
              }
            ]
          }
        }
      }
    });
  });
  //UNIT TESTS
  it("call setOrderDefault when initSensors is called", () => {
    expect.assertions(1);
    const setOrderDefault = jest.fn();
    const wrapper = createWrapper({
      methods: {
        setOrderDefault
      },
      store
    });
    wrapper.vm.initSensors();
    expect(setOrderDefault).toHaveBeenCalled();
  });
  it("call clearExpandedBox when initSensors is called", () => {
    expect.assertions(1);
    const clearExpandedBox = jest.fn();
    const wrapper = createWrapper({
      methods: {
        clearExpandedBox
      },
      store
    });
    wrapper.vm.initSensors();
    expect(clearExpandedBox).toHaveBeenCalled();
  });
  it("call selectDefault when initSensors is called and searchCoords.global is false", async () => {
    expect.assertions(1);
    const selectDefault = jest.fn();
    const wrapper = createWrapper({
      methods: {
        selectDefault
      },
      store
    });
    wrapper.vm.initSensors();
    await wrapper.vm.$nextTick();
    expect(selectDefault).toHaveBeenCalled();
  });
  it("call toggleAll when selectDefault is called and changed data 'all'", () => {
    expect.assertions(2);
    const toggleAll = jest.fn();
    const wrapper = createWrapper({
      methods: {
        toggleAll
      },
      store
    });
    wrapper.vm.selectDefault();
    expect(toggleAll).toHaveBeenCalled();
    expect(wrapper.vm.all).toBe(true);
  });
  //SNAPSHOT TESTS
  it("renders correctly", () => {
    expect.assertions(1);
    const wrapper = createWrapper({
      store
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
