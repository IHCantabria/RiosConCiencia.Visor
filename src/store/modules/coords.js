import * as types from "../types";

const state = {
  searchCoords: null,
  goToCoords: null
};
const mutations = {
  [types.M_SET_SEARCH_COORDS](state, payload) {
    state.searchCoords = payload.searchCoords;
  },
  [types.M_SET_GO_TO_COORDS](state, payload) {
    state.goToCoords = payload.goToCoords;
  }
};
const actions = {
  [types.A_SET_SEARCH_COORDS]: ({ commit }, operation) => {
    commit(types.M_SET_SEARCH_COORDS, { searchCoords: operation });
  },
  [types.A_SET_GO_TO_COORDS]: ({ commit }, operation) => {
    commit(types.M_SET_GO_TO_COORDS, { goToCoords: operation });
  }
};

export default {
  state,
  mutations,
  actions
};
