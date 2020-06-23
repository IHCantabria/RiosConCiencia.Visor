import * as types from "../types";

const state = {
  samples: null,
  samplesFull: null
};

const mutations = {
  [types.M_SET_SAMPLES](state, payload) {
    state.samples = payload.samples;
  },
  [types.M_SET_SAMPLES_FULL](state, payload) {
    state.samplesFull = payload.samplesFull;
  }
};

const actions = {
  [types.A_FETCH_SAMPLES]: ({ commit }, operation) => {
    commit(types.M_SET_SAMPLES, { samples: operation });
  },
  [types.A_FETCH_SAMPLES_FULL]: ({ commit }, operation) => {
    commit(types.M_SET_SAMPLES_FULL, { samplesFull: operation });
  }
};

const getters = {};

export default {
  state,
  mutations,
  actions,
  getters
};
