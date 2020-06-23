import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import filters from "@/store/modules/filters";
import datahub from "@/store/modules/datahub";
import apiSensors from "@/store/modules/apiSensors";
import { cloneDeep } from "lodash";
import * as types from "@/store/types";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("store/modules/filters.js", () => {
  let store;
  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        datahub: cloneDeep(datahub),
        filters: cloneDeep(filters),
        apiSensors: cloneDeep(apiSensors)
      }
    });
  });
  //UNIT TESTS
  it("add MomentFilter to state when A_SET_FILTER_MOMENT is dispatched", () => {
    expect.assertions(2);
    expect(store.state.filters.momentFilter).toBeNull();
    store.dispatch(types.A_SET_FILTER_MOMENT, { id: 1, name: "past" });
    expect(store.state.filters.momentFilter).toStrictEqual({
      id: 1,
      name: "past"
    });
  });
  it("add MomentFilter to MomentFilter state when M_SET_FILTER_MOMENT is commited", () => {
    expect.assertions(2);
    expect(store.state.filters.momentFilter).toBeNull();
    store.commit(types.M_SET_FILTER_MOMENT, {
      momentFilter: {
        id: 1,
        name: "past"
      }
    });
    expect(store.state.filters.momentFilter).toStrictEqual({
      id: 1,
      name: "past"
    });
  });
  it("add VariableFilter to state when A_SET_FILTER_MOMENT is dispatched", () => {
    expect.assertions(2);
    expect(store.state.filters.variableFilter).toBeNull();
    store.dispatch(types.A_SET_FILTER_VARIABLE, {
      id: 1,
      name: "oceanic"
    });
    expect(store.state.filters.variableFilter).toStrictEqual({
      id: 1,
      name: "oceanic"
    });
  });
  it("add VariableFilter to VariableFilter state when M_SET_FILTER_VARIABLE is commited", () => {
    expect.assertions(2);
    expect(store.state.filters.variableFilter).toBeNull();
    store.commit(types.M_SET_FILTER_VARIABLE, {
      variableFilter: {
        id: 1,
        name: "oceanic"
      }
    });
    expect(store.state.filters.variableFilter).toStrictEqual({
      id: 1,
      name: "oceanic"
    });
  });
  it("add buoyTypeFilter to state when A_SET_FILTER_BUOYSTYPE is dispatched", () => {
    expect.assertions(2);
    expect(store.state.filters.buoyTypeFilter).toBeNull();
    store.dispatch(types.A_SET_FILTER_BUOYSTYPE, { id: 1, name: "filtro1" });
    expect(store.state.filters.buoyTypeFilter).toStrictEqual({
      id: 1,
      name: "filtro1"
    });
  });
  it("add buoyTypeFilter to buoyTypeFilter state when M_SET_FILTER_BUOYSTYPE is commited", () => {
    expect.assertions(2);
    expect(store.state.filters.buoyTypeFilter).toBeNull();
    store.commit(types.M_SET_FILTER_BUOYSTYPE, {
      buoyTypeFilter: { id: 1, name: "filtro1" }
    });
    expect(store.state.filters.buoyTypeFilter).toStrictEqual({
      id: 1,
      name: "filtro1"
    });
  });
  it("add stationTypeFilter to state when A_SET_FILTER_STATIONSTYPE is dispatched", () => {
    expect.assertions(2);
    expect(store.state.filters.stationTypeFilter).toBeNull();
    store.dispatch(types.A_SET_FILTER_STATIONSTYPE, { id: 1, name: "filtro1" });
    expect(store.state.filters.stationTypeFilter).toStrictEqual({
      id: 1,
      name: "filtro1"
    });
  });
  it("add stationTypeFilter to stationTypeFilter state when M_SET_FILTER_STATIONSTYPE is commited", () => {
    expect.assertions(2);
    expect(store.state.filters.stationTypeFilter).toBeNull();
    store.commit(types.M_SET_FILTER_STATIONSTYPE, {
      stationTypeFilter: { id: 1, name: "filtro1" }
    });
    expect(store.state.filters.stationTypeFilter).toStrictEqual({
      id: 1,
      name: "filtro1"
    });
  });
  it("change allowFilters in state when A_SET_FILTER_ONLY_SPATIAL_FILTERS is dispatched", () => {
    expect.assertions(2);
    expect(store.state.filters.onlySpatial).toBe(false);
    store.dispatch(types.A_SET_FILTER_ONLY_SPATIAL_FILTERS, true);
    expect(store.state.filters.onlySpatial).toBe(true);
  });
  it("change allowFilters to allowFilters state when M_SET_FILTER_ALLOW_FILTERS is commited", () => {
    expect.assertions(2);
    expect(store.state.filters.onlySpatial).toBe(false);
    store.commit(types.M_SET_FILTER_ONLY_SPATIAL_FILTERS, {
      onlySpatial: true
    });
    expect(store.state.filters.onlySpatial).toBe(true);
  });
  it("change allowProducts in state when A_SET_FILTER_ALLOW_PRODUCTS is dispatched", () => {
    expect.assertions(2);
    expect(store.state.filters.allowProducts).toBe(true);
    store.dispatch(types.A_SET_FILTER_ALLOW_PRODUCTS, false);
    expect(store.state.filters.allowProducts).toBe(false);
  });
  it("change allowProducts to allowProducts state when M_SET_FILTER_ALLOW_PRODUCTS is commited", () => {
    expect.assertions(2);
    expect(store.state.filters.allowProducts).toBe(true);
    store.commit(types.M_SET_FILTER_ALLOW_PRODUCTS, {
      allowProducts: false
    });
    expect(store.state.filters.allowProducts).toBe(false);
  });
  it("change allowBuoys in state when A_SET_FILTER_ALLOW_BUOYS is dispatched", () => {
    expect.assertions(2);
    expect(store.state.filters.allowBuoys).toBe(true);
    store.dispatch(types.A_SET_FILTER_ALLOW_BUOYS, false);
    expect(store.state.filters.allowBuoys).toBe(false);
  });
  it("change allowBuoys to allowBuoys state when M_SET_FILTER_ALLOW_BUOYS is commited", () => {
    expect.assertions(2);
    expect(store.state.filters.allowBuoys).toBe(true);
    store.commit(types.M_SET_FILTER_ALLOW_BUOYS, {
      allowBuoys: false
    });
    expect(store.state.filters.allowBuoys).toBe(false);
  });
  it("change allowStations in state when A_SET_FILTER_ALLOW_STATIONS is dispatched", () => {
    expect.assertions(2);
    expect(store.state.filters.allowStations).toBe(true);
    store.dispatch(types.A_SET_FILTER_ALLOW_STATIONS, false);
    expect(store.state.filters.allowStations).toBe(false);
  });
  it("change allowStations to allowStations state when M_SET_FILTER_ALLOW_STATIONS is commited", () => {
    expect.assertions(2);
    expect(store.state.filters.allowStations).toBe(true);
    store.commit(types.M_SET_FILTER_ALLOW_STATIONS, {
      allowStations: false
    });
    expect(store.state.filters.allowStations).toBe(false);
  });

  it("updates G_GET_FILTERS_READY getter when all filter data is ready", () => {
    expect.assertions(9);
    expect(store.state.datahub.productMoments).toBeNull();
    expect(store.state.datahub.variableTypes).toBeNull();
    expect(store.state.apiSensors.buoyTypes).toBeNull();
    expect(store.state.apiSensors.stationTypes).toBeNull();
    expect(store.getters[types.G_GET_FILTERS_READY]).toBe(false);
    store.commit(types.M_SET_PRODUCTMOMENTS, {
      productMoments: true
    });
    expect(store.getters[types.G_GET_FILTERS_READY]).toBe(false);
    store.commit(types.M_SET_PRODUCTVARIABLETYPES, {
      variableTypes: true
    });
    expect(store.getters[types.G_GET_FILTERS_READY]).toBe(false);
    store.commit(types.M_SET_BUOYTYPES, {
      buoyTypes: true
    });
    expect(store.getters[types.G_GET_FILTERS_READY]).toBe(false);
    store.commit(types.M_SET_STATIONTYPES, {
      stationTypes: true
    });
    expect(store.getters[types.G_GET_FILTERS_READY]).toBe(true);
  });
});
