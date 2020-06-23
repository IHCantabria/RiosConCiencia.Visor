import * as types from "../types";

const state = {
  momentFilter: null,
  variableFilter: null,
  buoyTypeFilter: null,
  stationTypeFilter: null,
  onlySpatial: false,
  allowProducts: true,
  allowBuoys: true,
  //AllowStation is False to hide station logic
  allowStations: false
};

const mutations = {
  [types.M_SET_FILTER_MOMENT](state, payload) {
    state.momentFilter = payload.momentFilter;
  },
  [types.M_SET_FILTER_VARIABLE](state, payload) {
    state.variableFilter = payload.variableFilter;
  },
  [types.M_SET_FILTER_BUOYSTYPE](state, payload) {
    state.buoyTypeFilter = payload.buoyTypeFilter;
  },
  [types.M_SET_FILTER_STATIONSTYPE](state, payload) {
    state.stationTypeFilter = payload.stationTypeFilter;
  },
  [types.M_SET_FILTER_ONLY_SPATIAL_FILTERS](state, payload) {
    state.onlySpatial = payload.onlySpatial;
  },
  [types.M_SET_FILTER_ALLOW_PRODUCTS](state, payload) {
    state.allowProducts = payload.allowProducts;
  },
  [types.M_SET_FILTER_ALLOW_BUOYS](state, payload) {
    state.allowBuoys = payload.allowBuoys;
  },
  [types.M_SET_FILTER_ALLOW_STATIONS](state, payload) {
    state.allowStations = payload.allowStations;
  }
};

const actions = {
  [types.A_SET_FILTER_MOMENT]: ({ commit }, operation) => {
    commit(types.M_SET_FILTER_MOMENT, { momentFilter: operation });
  },
  [types.A_SET_FILTER_VARIABLE]: ({ commit }, operation) => {
    commit(types.M_SET_FILTER_VARIABLE, { variableFilter: operation });
  },
  [types.A_SET_FILTER_BUOYSTYPE]: ({ commit }, operation) => {
    commit(types.M_SET_FILTER_BUOYSTYPE, { buoyTypeFilter: operation });
  },
  [types.A_SET_FILTER_STATIONSTYPE]: ({ commit }, operation) => {
    commit(types.M_SET_FILTER_STATIONSTYPE, { stationTypeFilter: operation });
  },
  [types.A_SET_FILTER_ONLY_SPATIAL_FILTERS]: ({ commit }, operation) => {
    commit(types.M_SET_FILTER_ONLY_SPATIAL_FILTERS, { onlySpatial: operation });
  },
  [types.A_SET_FILTER_ALLOW_PRODUCTS]: ({ commit }, operation) => {
    commit(types.M_SET_FILTER_ALLOW_PRODUCTS, { allowProducts: operation });
  },
  [types.A_SET_FILTER_ALLOW_BUOYS]: ({ commit }, operation) => {
    commit(types.M_SET_FILTER_ALLOW_BUOYS, { allowBuoys: operation });
  },
  [types.A_SET_FILTER_ALLOW_STATIONS]: ({ commit }, operation) => {
    commit(types.M_SET_FILTER_ALLOW_STATIONS, { allowStations: operation });
  }
};

const getters = {
  [types.G_GET_FILTERS_READY]: (state, getters, rootState) => {
    return rootState.datahub.productMoments &&
      rootState.datahub.variableTypes &&
      rootState.apiSensors.stationTypes &&
      rootState.apiSensors.buoyTypes
      ? true
      : false;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
