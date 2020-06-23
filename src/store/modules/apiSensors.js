import * as types from "../types";

const state = {
  sensors: [],
  buoys: [],
  stations: [],
  buoyTypes: null,
  stationTypes: null
};

const mutations = {
  [types.M_SET_SENSORS](state, payload) {
    state.sensors = payload.sensors;
  },
  [types.M_SET_BUOYS](state, payload) {
    state.buoys = payload.buoys;
  },
  [types.M_SET_STATIONS](state, payload) {
    state.stations = payload.stations;
  },
  [types.M_SET_BUOYTYPES](state, payload) {
    state.buoyTypes = payload.buoyTypes;
  },
  [types.M_SET_STATIONTYPES](state, payload) {
    state.stationTypes = payload.stationTypes;
  }
};

const actions = {
  [types.A_FETCH_APISENSORS_BUOYS]: ({ commit }, operation) => {
    commit(types.M_SET_BUOYS, {
      buoys: operation
    });
  },
  [types.A_FETCH_APISENSORS_STATIONS]: ({ commit }, operation) => {
    commit(types.M_SET_STATIONS, {
      stations: operation
    });
  },
  [types.A_FETCH_APISENSORS_BUOYTYPES]: ({ commit }, operation) => {
    commit(types.M_SET_BUOYTYPES, {
      buoyTypes: operation
    });
  },
  [types.A_FETCH_APISENSORS_STATIONTYPES]: ({ commit }, operation) => {
    commit(types.M_SET_STATIONTYPES, {
      stationTypes: operation
    });
  },
  [types.A_SET_SENSORS]: ({ commit, state }) => {
    const sensors = [...state.stations, ...state.buoys];
    commit(types.M_SET_SENSORS, {
      sensors: sensors
    });
    commit(types.M_SET_BUOYS, {
      buoys: []
    });
    commit(types.M_SET_STATIONS, {
      stations: []
    });
  },
  [types.A_SET_CLEAR_SENSORS]: ({ commit }) => {
    commit(types.M_SET_SENSORS, { sensors: [] });
  }
};

const getters = {
  [types.G_GET_SENSORS_SORTED]: state => {
    return state.sensors.sort((a, b) => a.distance - b.distance);
  },
  [types.G_GET_SENSORS_SELECTED]: state => {
    return state.sensors.filter(sensor => sensor.selected == true);
  },
  [types.G_GET_SENSORS_COUNT]: state => {
    return state.sensors.length;
  },
  [types.G_GET_BUOYTYPE_NAME]: state => id => {
    return state.buoyTypes.find(buoyType => buoyType.id === id).name;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
