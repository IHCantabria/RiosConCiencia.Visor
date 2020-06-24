import * as types from "../types";
import { getYears } from "@/utils/data-operator-utils.js";
import { CAMPAIGN_VALUES } from "@/config/data-config";
const state = {
  samples: null,
  samplesFull: null,
  yearFilter: 2020,
  yearOptions: [],
  campaignFilter: 1,
  campaignOptions: CAMPAIGN_VALUES
};

const mutations = {
  [types.M_SET_SAMPLES](state, payload) {
    state.samples = payload.samples;
  },
  [types.M_SET_YEAR_OPTIONS](state, payload) {
    state.yearOptions = payload.yearOptions;
  },
  [types.M_SET_SAMPLES_FULL](state, payload) {
    state.samplesFull = payload.samplesFull;
  }
};

const actions = {
  [types.A_FETCH_SAMPLES]: ({ commit }, operation) => {
    commit(types.M_SET_SAMPLES, { samples: operation });
    var years = getYears(operation);
    commit(types.M_SET_YEAR_OPTIONS, { yearOptions: years });
  },
  [types.A_FETCH_SAMPLES_FULL]: ({ commit }, operation) => {
    commit(types.M_SET_SAMPLES_FULL, { samplesFull: operation });
  }
};

const getters = {
  [types.G_GET_SAMPLES_FILTERED]: state => {
    return state.samples
      ? state.samples.filter(
          sample =>
            sample.year == state.yearFilter &&
            sample.idCampaign == state.campaignFilter
        )
      : [];
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
