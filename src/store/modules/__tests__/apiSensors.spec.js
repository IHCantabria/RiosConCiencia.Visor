import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import apiSensors from "@/store/modules/apiSensors";
import { cloneDeep } from "lodash";
import * as types from "@/store/types";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("store/modules/apiSensors.js", () => {
  let store;
  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        apiSensors: cloneDeep(apiSensors)
      }
    });
  });
  //UNIT TESTS
  it("add Buoys array to state when A_FETCH_APISENSORS_BUOYS is dispatched", () => {
    expect.assertions(2);
    expect(store.state.apiSensors.buoys).toHaveLength(0);
    store.dispatch(types.A_FETCH_APISENSORS_BUOYS, ["buoy1", "buoy2"]);
    expect(store.state.apiSensors.buoys).toHaveLength(2);
  });
  it("add Buoys array to Buoys state when M_SET_BUOYS is commited", () => {
    expect.assertions(2);
    expect(store.state.apiSensors.buoys).toHaveLength(0);
    store.commit(types.M_SET_BUOYS, { buoys: ["buoy1", "buoy2"] });
    expect(store.state.apiSensors.buoys).toHaveLength(2);
  });
  it("add Stations array to state when A_FETCH_APISENSORS_STATIONS is dispatched", () => {
    expect.assertions(2);
    expect(store.state.apiSensors.stations).toHaveLength(0);
    store.dispatch(types.A_FETCH_APISENSORS_STATIONS, ["station1", "station2"]);
    expect(store.state.apiSensors.stations).toHaveLength(2);
  });
  it("add Stations array to Stations state when M_SET_STATIONS is commited", () => {
    expect.assertions(2);
    expect(store.state.apiSensors.stations).toHaveLength(0);
    store.commit(types.M_SET_STATIONS, { stations: ["station1", "station2"] });
    expect(store.state.apiSensors.stations).toHaveLength(2);
  });
  it("add Sensors array to state when A_SET_SENSORS is dispatched", () => {
    expect.assertions(6);
    expect(store.state.apiSensors.sensors).toHaveLength(0);
    store.commit(types.M_SET_STATIONS, { stations: ["station1", "station2"] });
    expect(store.state.apiSensors.stations).toHaveLength(2);
    store.commit(types.M_SET_BUOYS, { buoys: ["buoy1", "buoy2"] });
    expect(store.state.apiSensors.buoys).toHaveLength(2);
    store.dispatch(types.A_SET_SENSORS);
    expect(store.state.apiSensors.sensors).toHaveLength(4);
    expect(store.state.apiSensors.stations).toHaveLength(0);
    expect(store.state.apiSensors.buoys).toHaveLength(0);
  });
  it("add Sensors array to Sensors state when M_SET_SENSORS is commited", () => {
    expect.assertions(2);
    expect(store.state.apiSensors.sensors).toHaveLength(0);
    store.commit(types.M_SET_SENSORS, { sensors: ["sensor1", "sensor2"] });
    expect(store.state.apiSensors.sensors).toHaveLength(2);
  });
  it("add Buoys array to state when A_FETCH_APISENSORS_BUOYTYPES is dispatched", () => {
    expect.assertions(2);
    expect(store.state.apiSensors.buoyTypes).toBeNull();
    store.dispatch(types.A_FETCH_APISENSORS_BUOYTYPES, [
      "buoyType1",
      "buoyType1"
    ]);
    expect(store.state.apiSensors.buoyTypes).toHaveLength(2);
  });
  it("add BuoyTypes array to BuoyTypes state when M_SET_BUOYTYPES is commited", () => {
    expect.assertions(2);
    expect(store.state.apiSensors.buoyTypes).toBeNull();
    store.commit(types.M_SET_BUOYTYPES, {
      buoyTypes: ["buoyType1", "buoyType1"]
    });
    expect(store.state.apiSensors.buoyTypes).toHaveLength(2);
  });
  it("add StationTypes array to state when A_FETCH_APISENSORS_STATIONTYPES is dispatched", () => {
    expect.assertions(2);
    expect(store.state.apiSensors.stationTypes).toBeNull();
    store.dispatch(types.A_FETCH_APISENSORS_STATIONTYPES, [
      "stationType1",
      "stationType1"
    ]);
    expect(store.state.apiSensors.stationTypes).toHaveLength(2);
  });
  it("add StationTypes array to StationTypes state when M_SET_STATIONTYPES is commited", () => {
    expect.assertions(2);
    expect(store.state.apiSensors.stationTypes).toBeNull();
    store.commit(types.M_SET_STATIONTYPES, {
      stationTypes: ["stationType1", "stationType1"]
    });
    expect(store.state.apiSensors.stationTypes).toHaveLength(2);
  });
  it("clear sensors state when A_SET_CLEAR_SENSORS is dispatched", () => {
    expect.assertions(3);
    expect(store.state.apiSensors.sensors).toHaveLength(0);
    store.commit(types.M_SET_SENSORS, { sensors: ["sensor1", "sensor2"] });
    expect(store.state.apiSensors.sensors).toHaveLength(2);
    store.dispatch(types.A_SET_CLEAR_SENSORS);
    expect(store.state.apiSensors.sensors).toHaveLength(0);
  });
  it("updates G_GET_SENSORS_SORTED getter when M_SET_SENSORS is commited", () => {
    expect.assertions(4);
    expect(store.state.apiSensors.sensors).toHaveLength(0);
    expect(store.getters[types.G_GET_SENSORS_SORTED]).toStrictEqual([]);
    store.commit(types.M_SET_SENSORS, {
      sensors: [
        { distance: 100, text: "sensor1" },
        { distance: 10, text: "sensor2" }
      ]
    });
    expect(store.state.apiSensors.sensors).toHaveLength(2);
    expect(store.getters[types.G_GET_SENSORS_SORTED]).toStrictEqual([
      { distance: 10, text: "sensor2" },
      { distance: 100, text: "sensor1" }
    ]);
  });
  it("updates G_GET_SENSORS_SELECTED getter when 'selected' a property change is commited", () => {
    expect.assertions(4);
    expect(store.state.apiSensors.sensors).toHaveLength(0);
    expect(store.getters[types.G_GET_SENSORS_SELECTED]).toStrictEqual([]);
    store.commit(types.M_SET_SENSORS, {
      sensors: [
        { distance: 100, text: "sensor1", selected: true },
        { distance: 10, text: "sensor2", selected: false }
      ]
    });
    expect(store.state.apiSensors.sensors).toHaveLength(2);
    expect(store.getters[types.G_GET_SENSORS_SELECTED]).toStrictEqual([
      { distance: 100, text: "sensor1", selected: true }
    ]);
  });
  it("updates G_GET_SENSORS_COUNT getter when M_SET_SENSORS is commited", () => {
    expect.assertions(4);
    expect(store.state.apiSensors.sensors).toHaveLength(0);
    expect(store.getters[types.G_GET_SENSORS_COUNT]).toBe(0);
    store.commit(types.M_SET_SENSORS, {
      sensors: [
        { distance: 100, text: "sensor1", selected: true },
        { distance: 10, text: "sensor2", selected: false }
      ]
    });
    expect(store.state.apiSensors.sensors).toHaveLength(2);
    expect(store.getters[types.G_GET_SENSORS_COUNT]).toBe(2);
  });
  it("updates G_GET_BUOYTYPE_NAME getter when M_SET_BUOYTYPES is commited", () => {
    expect.assertions(4);
    expect(store.state.apiSensors.buoyTypes).toBeNull();
    expect(store.getters[types.G_GET_BUOYTYPE_NAME]).toStrictEqual(
      expect.any(Function)
    );
    store.commit(types.M_SET_BUOYTYPES, {
      buoyTypes: [
        { id: 1, name: "buoyType1" },
        { id: 3, name: "buoyType3" },
        { id: 5, name: "buoyType5" }
      ]
    });
    expect(store.state.apiSensors.buoyTypes).toHaveLength(3);
    expect(store.getters[types.G_GET_BUOYTYPE_NAME](3)).toBe("buoyType3");
  });
});
