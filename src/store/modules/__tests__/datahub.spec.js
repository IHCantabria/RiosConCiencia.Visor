import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import datahub from "@/store/modules/datahub";
import filters from "@/store/modules/filters";
import { cloneDeep } from "lodash";
import * as types from "@/store/types";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("store/modules/datahub.js", () => {
  let store;
  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        datahub: cloneDeep(datahub),
        filters: cloneDeep(filters)
      }
    });
  });
  //UNIT TESTS
  it("add Products array to state when A_FETCH_DATAHUB_PRODUCTS is dispatched", () => {
    expect.assertions(2);
    expect(store.state.datahub.products).toHaveLength(0);
    store.dispatch(types.A_FETCH_DATAHUB_PRODUCTS, ["product1", "product2"]);
    expect(store.state.datahub.products).toHaveLength(2);
  });
  it("add Products array to Products state when M_SET_PRODUCTS is commited", () => {
    expect.assertions(2);
    expect(store.state.datahub.products).toHaveLength(0);
    store.commit(types.M_SET_PRODUCTS, { products: ["product1", "product2"] });
    expect(store.state.datahub.products).toHaveLength(2);
  });
  it("add Sources array to state when A_FETCH_DATAHUB_SOURCES is dispatched", () => {
    expect.assertions(2);
    expect(store.state.datahub.sources).toHaveLength(0);
    store.dispatch(types.A_FETCH_DATAHUB_SOURCES, ["source1", "source2"]);
    expect(store.state.datahub.sources).toHaveLength(2);
  });
  it("add Sources array to Sources state when M_SET_SOURCES is commited", () => {
    expect.assertions(2);
    expect(store.state.datahub.sources).toHaveLength(0);
    store.commit(types.M_SET_SOURCES, { sources: ["source1", "source2"] });
    expect(store.state.datahub.sources).toHaveLength(2);
  });
  it("add ProductMoments array to state when A_FETCH_DATAHUB_PRODUCTMOMENTS is dispatched", () => {
    expect.assertions(2);
    expect(store.state.datahub.productMoments).toBeNull();
    store.dispatch(types.A_FETCH_DATAHUB_PRODUCTMOMENTS, [
      "productMoment1",
      "productMoment2"
    ]);
    expect(store.state.datahub.productMoments).toHaveLength(2);
  });
  it("add ProductMoments array to productMoments state when M_SET_PRODUCTMOMENTS is commited", () => {
    expect.assertions(2);
    expect(store.state.datahub.productMoments).toBeNull();
    store.commit(types.M_SET_PRODUCTMOMENTS, {
      productMoments: ["productMoment1", "productMoment2"]
    });
    expect(store.state.datahub.productMoments).toHaveLength(2);
  });
  it("add ProductMoments array to state or join array to existing array when A_FETCH_DATAHUB_PRODUCTVARIABLETYPES is dispatched", () => {
    expect.assertions(3);
    expect(store.state.datahub.variableTypes).toBeNull();
    store.dispatch(types.A_FETCH_DATAHUB_PRODUCTVARIABLETYPES, [
      "productMoment1",
      "productMoment2"
    ]);
    expect(store.state.datahub.variableTypes).toHaveLength(2);
    store.dispatch(types.A_FETCH_DATAHUB_PRODUCTVARIABLETYPES, [
      "productMoment3",
      "productMoment4"
    ]);
    expect(store.state.datahub.variableTypes).toHaveLength(4);
  });
  it("add ProductMoments array to ProductMoments state when M_SET_PRODUCTVARIABLETYPES is commited", () => {
    expect.assertions(2);
    expect(store.state.datahub.variableTypes).toBeNull();
    store.commit(types.M_SET_PRODUCTVARIABLETYPES, {
      variableTypes: ["productMoment1", "productMoment2"]
    });
    expect(store.state.datahub.variableTypes).toHaveLength(2);
  });
  it("update 'selected' property of product object in state products array when A_UPDATE_PRODUCTS_SELECTED is dispatched", () => {
    expect.assertions(3);
    expect(store.state.datahub.products).toHaveLength(0);
    store.dispatch(types.A_FETCH_DATAHUB_PRODUCTS, [
      { id: 1, name: "product1", selected: true },
      { id: 3, name: "product13", selected: true },
      { id: 2, name: "product15", selected: false }
    ]);
    expect(store.state.datahub.products).toHaveLength(3);
    store.dispatch(types.A_UPDATE_PRODUCTS_SELECTED, {
      index: 1,
      value: false
    });
    expect(store.state.datahub.products).toStrictEqual([
      { id: 1, name: "product1", selected: true },
      { id: 3, name: "product13", selected: false },
      { id: 2, name: "product15", selected: false }
    ]);
  });
  it("update 'selected' property of product object in state products array when M_SET_FILTER_VARIABLE is commited", () => {
    expect.assertions(3);
    expect(store.state.datahub.products).toHaveLength(0);
    store.dispatch(types.A_FETCH_DATAHUB_PRODUCTS, [
      { id: 1, name: "product1", selected: true },
      { id: 3, name: "product13", selected: true },
      { id: 2, name: "product15", selected: false }
    ]);
    expect(store.state.datahub.products).toHaveLength(3);
    store.commit(types.M_UPDATE_PRODUCTS_SELECTED, {
      index: 1,
      value: false
    });
    expect(store.state.datahub.products).toStrictEqual([
      { id: 1, name: "product1", selected: true },
      { id: 3, name: "product13", selected: false },
      { id: 2, name: "product15", selected: false }
    ]);
  });
  it("clear products state when A_SET_CLEAR_PRODUCTS is dispatched", () => {
    expect.assertions(3);
    expect(store.state.datahub.products).toHaveLength(0);
    store.commit(types.M_SET_PRODUCTS, { products: ["product1", "product2"] });
    expect(store.state.datahub.products).toHaveLength(2);
    store.dispatch(types.A_SET_CLEAR_PRODUCTS);
    expect(store.state.datahub.products).toHaveLength(0);
  });
  it("updates G_GET_PRODUCTS_SORTED getter when M_SET_PRODUCTS is commited", () => {
    expect.assertions(4);
    expect(store.state.datahub.products).toHaveLength(0);
    expect(store.getters[types.G_GET_PRODUCTS_SORTED]).toStrictEqual([]);
    store.commit(types.M_SET_PRODUCTS, {
      products: [
        { spatialResolution: 100, text: "product1" },
        { spatialResolution: 10, text: "product2" }
      ]
    });
    expect(store.state.datahub.products).toHaveLength(2);
    expect(store.getters[types.G_GET_PRODUCTS_SORTED]).toStrictEqual([
      { spatialResolution: 10, text: "product2" },
      { spatialResolution: 100, text: "product1" }
    ]);
  });
  it("updates G_GET_PRODUCTS_SELECTED getter when 'selected' a property change is commited", () => {
    expect.assertions(4);
    expect(store.state.datahub.products).toHaveLength(0);
    expect(store.getters[types.G_GET_PRODUCTS_SELECTED]).toStrictEqual([]);
    store.commit(types.M_SET_PRODUCTS, {
      products: [
        { spatialResolution: 100, text: "product1", selected: true },
        { spatialResolution: 10, text: "product2", selected: false }
      ]
    });
    expect(store.state.datahub.products).toHaveLength(2);
    expect(store.getters[types.G_GET_PRODUCTS_SELECTED]).toStrictEqual([
      { spatialResolution: 100, text: "product1", selected: true }
    ]);
  });
  it("updates G_GET_PRODUCTS_COUNT getter when M_SET_PRODUCTS is commited", () => {
    expect.assertions(4);
    expect(store.state.datahub.products).toHaveLength(0);
    expect(store.getters[types.G_GET_PRODUCTS_COUNT]).toBe(0);
    store.commit(types.M_SET_PRODUCTS, {
      products: [
        { spatialResolution: 100, text: "product1", selected: true },
        { spatialResolution: 10, text: "product2", selected: false }
      ]
    });
    expect(store.state.datahub.products).toHaveLength(2);
    expect(store.getters[types.G_GET_PRODUCTS_COUNT]).toBe(2);
  });
  it("updates G_GET_PRODUCT_BY_MAPID getter when M_SET_PRODUCTS is commited", () => {
    expect.assertions(4);
    expect(store.state.datahub.products).toHaveLength(0);
    expect(store.getters[types.G_GET_PRODUCT_BY_MAPID]).toStrictEqual(
      expect.any(Function)
    );
    store.commit(types.M_SET_PRODUCTS, {
      products: [
        {
          mapID: "s1",
          spatialResolution: 100,
          text: "product1",
          selected: true
        },
        {
          mapID: "o16",
          spatialResolution: 10,
          text: "product2",
          selected: false
        },
        {
          mapID: "t2",
          spatialResolution: 100,
          text: "product1",
          selected: true
        },
        {
          mapID: "y1",
          spatialResolution: 100,
          text: "product1",
          selected: true
        }
      ]
    });
    expect(store.state.datahub.products).toHaveLength(4);
    expect(store.getters[types.G_GET_PRODUCT_BY_MAPID]("t2")).toBe(2);
  });
  it("updates G_GET_SOURCE_NAMESHORT getter when M_SET_SOURCES is commited", () => {
    expect.assertions(4);
    expect(store.state.datahub.sources).toHaveLength(0);
    expect(store.getters[types.G_GET_SOURCE_NAMESHORT]).toStrictEqual(
      expect.any(Function)
    );
    store.commit(types.M_SET_SOURCES, {
      sources: [
        { id: 3, text: "sources1", nameShort: "s1" },
        { id: 5, text: "sources2", nameShort: "s2" }
      ]
    });
    expect(store.state.datahub.sources).toHaveLength(2);
    expect(store.getters[types.G_GET_SOURCE_NAMESHORT](5)).toBe("s2");
  });
  it("updates G_GET_SOURCE_TYPE getter when M_SET_SOURCES is commited", () => {
    expect.assertions(4);
    expect(store.state.datahub.sources).toHaveLength(0);
    expect(store.getters[types.G_GET_SOURCE_TYPE]).toStrictEqual(
      expect.any(Function)
    );
    store.commit(types.M_SET_SOURCES, {
      sources: [
        { id: 3, text: "sources1", nameShort: "s1", sourceType: "National" },
        { id: 5, text: "sources2", nameShort: "s2", sourceType: "Local" }
      ]
    });
    expect(store.state.datahub.sources).toHaveLength(2);
    expect(store.getters[types.G_GET_SOURCE_TYPE](5)).toBe("Local");
  });
  it("updates G_GET_PRODUCTMOMENTS_SORTED getter when M_SET_PRODUCTMOMENTS is commited", () => {
    expect.assertions(4);
    expect(store.state.datahub.productMoments).toBeNull();
    expect(store.getters[types.G_GET_PRODUCTMOMENTS_SORTED]).toBeNull();
    store.commit(types.M_SET_PRODUCTMOMENTS, {
      productMoments: [
        { id: 4, text: "productMoment1" },
        { id: 6, text: "productMoment2" },
        { id: 2, text: "productMoment3" },
        { id: 8, text: "productMoment4" }
      ]
    });
    expect(store.state.datahub.productMoments).toHaveLength(4);
    expect(store.getters[types.G_GET_PRODUCTMOMENTS_SORTED]).toStrictEqual([
      { id: 2, text: "productMoment3" },
      { id: 4, text: "productMoment1" },
      { id: 6, text: "productMoment2" },
      { id: 8, text: "productMoment4" }
    ]);
  });
  it("updates G_GET_PRODUCTVARIABLETYPES_BY_PRODUCTMOMENTS getter when M_SET_FILTER_MOMENT or M_SET_PRODUCTVARIABLETYPES are commited", () => {
    expect.assertions(7);
    expect(store.state.datahub.variableTypes).toBeNull();
    expect(store.state.filters.momentFilter).toBeNull();
    expect(
      store.getters[types.G_GET_PRODUCTVARIABLETYPES_BY_PRODUCTMOMENTS]
    ).toBeNull();
    store.commit(types.M_SET_FILTER_MOMENT, {
      momentFilter: 1
    });
    expect(store.state.filters.momentFilter).toBe(1);
    expect(
      store.getters[types.G_GET_PRODUCTVARIABLETYPES_BY_PRODUCTMOMENTS]
    ).toBeNull();
    store.commit(types.M_SET_PRODUCTVARIABLETYPES, {
      variableTypes: [
        { id: 1, text: "oceanic", momentId: 1 },
        { id: 2, text: "river", momentId: 2 },
        { id: 3, text: "sea", momentId: 1 }
      ]
    });
    expect(store.state.datahub.variableTypes).toHaveLength(3);

    expect(
      store.getters[types.G_GET_PRODUCTVARIABLETYPES_BY_PRODUCTMOMENTS]
    ).toStrictEqual([
      { id: 1, text: "oceanic", momentId: 1 },
      { id: 3, text: "sea", momentId: 1 }
    ]);
  });
});
