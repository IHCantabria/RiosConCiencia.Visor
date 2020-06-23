import { shallowMount, createLocalVue } from "@vue/test-utils";
import PanelProducts from "../PanelProducts.vue";
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
  return shallowMount(PanelProducts, merge(defaultMountingOptions, overrides));
}

describe("panelProducts.vue", () => {
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
        datahub: {
          getters: {
            [types.G_GET_PRODUCT_BY_MAPID]: () => {},
            [types.G_GET_PRODUCTS_SORTED]: () => [
              {
                id: 120,
                mapID: "120P",
                selected: true,
                type: "extent",
                alias: "IH SWAN Bahía Huelva",
                source: "IHCantabria",
                extent: {
                  type: "Feature",
                  geometry: {
                    type: "Polygon",
                    coordinates: [
                      [
                        [-6.93499755859375, 37.060001373291016],
                        [-6.93499755859375, 37.17000198364258],
                        [-6.81500244140625, 37.17000198364258],
                        [-6.81500244140625, 37.060001373291016],
                        [-6.93499755859375, 37.060001373291016]
                      ]
                    ]
                  },
                  properties: {}
                },
                idProductType: 2,
                license: "Open Access",
                color: "#6e62cc",
                temporalResolution: 1,
                spatialResolution: 0.01
              },
              {
                id: 116,
                mapID: "116P",
                selected: false,
                type: "extent",
                alias: "Huelva Delft 3D",
                source: "IHCantabria",
                extent: {
                  type: "Feature",
                  geometry: {
                    type: "Polygon",
                    coordinates: [
                      [
                        [-7.0999375622524825, 37.03100650852921],
                        [-7.0999375622524825, 37.32860417248531],
                        [-6.629744721319907, 37.32860417248531],
                        [-6.629744721319907, 37.03100650852921],
                        [-7.0999375622524825, 37.03100650852921]
                      ]
                    ]
                  },
                  properties: {}
                },
                idProductType: 2,
                license: "Open Access",
                color: "#108c9f",
                temporalResolution: 1,
                spatialResolution: 0.06
              }
            ]
          }
        }
      }
    });
  });
  //UNIT TESTS
  it("data 'all' is set to false when initSensors is called", () => {
    expect.assertions(1);
    const selectDefault = jest.fn();
    const wrapper = createWrapper({
      methods: {
        selectDefault
      },
      store
    });
    wrapper.vm.initProducts();
    expect(wrapper.vm.all).toBe(false);
  });
  it("call setOrderDefault when initSensors is called", () => {
    expect.assertions(1);
    const setOrderDefault = jest.fn();
    const selectDefault = jest.fn();
    const wrapper = createWrapper({
      methods: {
        setOrderDefault,
        selectDefault
      },
      store
    });
    wrapper.vm.initProducts();
    expect(setOrderDefault).toHaveBeenCalled();
  });
  it("call clearExpandedBox when initSensors is called", () => {
    expect.assertions(1);
    const clearExpandedBox = jest.fn();
    const selectDefault = jest.fn();
    const wrapper = createWrapper({
      methods: {
        clearExpandedBox,
        selectDefault
      },
      store
    });
    wrapper.vm.initProducts();
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
    wrapper.vm.initProducts();
    await wrapper.vm.$nextTick();
    expect(selectDefault).toHaveBeenCalled();
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
