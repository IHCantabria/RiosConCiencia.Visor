import * as types from "../types";
import { getYears } from "@/utils/data-operator-utils.js";
import { CAMPAIGN_VALUES } from "@/config/data-config";
const state = {
  samples: null,
  samplesFull: null,
  yearFilter: {},
  yearOptions: [],
  campaignFilter: {},
  campaignOptions: CAMPAIGN_VALUES,
  user: null
};

const mutations = {
  [types.M_SET_SAMPLES](state, payload) {
    state.samples = payload.samples;
  },
  [types.M_SET_USER](state, payload) {
    state.user = payload.user;
  },
  [types.M_SET_YEAR_OPTIONS](state, payload) {
    state.yearOptions = payload.yearOptions;
  },
  [types.M_SET_SAMPLE_CAMPAIGN_FILTER](state, payload) {
    state.campaignFilter = payload.campaignFilter;
  },
  [types.M_SET_SAMPLE_YEAR_FILTER](state, payload) {
    state.yearFilter = payload.yearFilter;
  }
};

const actions = {
  [types.A_FETCH_SAMPLES]: ({ commit }, operation) => {
    commit(types.M_SET_SAMPLES, { samples: operation });
    var years = getYears(operation);
    commit(types.M_SET_YEAR_OPTIONS, { yearOptions: years });
  },
  [types.A_FETCH_USER]: ({ commit }, operation) => {
    commit(types.M_SET_USER, { user: operation });
  },
  [types.A_SET_SAMPLE_CAMPAIGN_FILTER]: ({ commit }, operation) => {
    commit(types.M_SET_SAMPLE_CAMPAIGN_FILTER, { campaignFilter: operation });
  },
  [types.A_SET_SAMPLE_YEAR_FILTER]: ({ commit }, operation) => {
    commit(types.M_SET_SAMPLE_YEAR_FILTER, { yearFilter: operation });
  }
};

const getters = {
  [types.G_GET_SAMPLES_FILTERED]: state => {
    return state.samples
      ? state.samples.filter(
          sample =>
            sample.year == state.yearFilter.name &&
            sample.idCampaign == state.campaignFilter.id
        )
      : [];
  },
  [types.G_GET_SAMPLES_FILTERED_IDS]: (state, getters) => {
    return getters[types.G_GET_SAMPLES_FILTERED].map(sample => sample.id);
  },
  [types.G_GET_USER_TOKEN]: state => {
    return state.user ? state.user.token : "";
  },
  [types.G_GET_USER_LOGGED]: state => {
    return state.user ? true : false;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
