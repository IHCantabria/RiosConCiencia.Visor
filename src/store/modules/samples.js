import * as types from "../types";
import {
  getYears,
  getCampaignFilter,
  getDownloadFilters
} from "@/utils/data-operator-utils.js";
import { CAMPAIGN_VALUES } from "@/config/data-config";
const state = {
  samples: null,
  samplesFull: null,
  yearOptions: [],
  yearFilter: {},
  campaignOptions: [],
  campaignFilter: {},
  downloadOptions: [],
  downloadFilters: [],
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
  [types.M_SET_CAMPAIGN_OPTIONS](state, payload) {
    state.campaignOptions = payload.campaignOptions;
  },
  [types.M_SET_SAMPLE_DOWNLOAD_OPTIONS](state, payload) {
    state.downloadOptions = payload.downloadOptions;
  },
  [types.M_SET_SAMPLE_CAMPAIGN_FILTER](state, payload) {
    state.campaignFilter = payload.campaignFilter;
  },
  [types.M_SET_SAMPLE_YEAR_FILTER](state, payload) {
    state.yearFilter = payload.yearFilter;
  },
  [types.M_SET_SAMPLE_DOWNLOAD_FILTERS](state, payload) {
    state.downloadFilters = payload.downloadFilters;
  }
};

const actions = {
  [types.A_FETCH_SAMPLES]: ({ commit }, operation) => {
    commit(types.M_SET_SAMPLES, { samples: operation });
    var years = getYears(operation);
    var filterCampaign = getCampaignFilter(
      operation,
      years[0],
      CAMPAIGN_VALUES
    );
    commit(types.M_SET_YEAR_OPTIONS, { yearOptions: years });
    commit(types.M_SET_SAMPLE_YEAR_FILTER, { yearFilter: years[0] });
    commit(types.M_SET_CAMPAIGN_OPTIONS, { campaignOptions: CAMPAIGN_VALUES });
    commit(types.M_SET_SAMPLE_CAMPAIGN_FILTER, {
      campaignFilter: filterCampaign
    });
    const downloadOptions = getDownloadFilters(years, CAMPAIGN_VALUES);
    commit(types.M_SET_SAMPLE_DOWNLOAD_OPTIONS, {
      downloadOptions: downloadOptions
    });
    commit(types.M_SET_SAMPLE_DOWNLOAD_FILTERS, {
      downloadFilters: [downloadOptions[0]]
    });
  },
  [types.A_FETCH_USER]: ({ commit }, operation) => {
    commit(types.M_SET_USER, { user: operation });
  },
  [types.A_SET_SAMPLE_CAMPAIGN_FILTER]: ({ commit }, operation) => {
    commit(types.M_SET_SAMPLE_CAMPAIGN_FILTER, { campaignFilter: operation });
  },
  [types.A_SET_SAMPLE_YEAR_FILTER]: ({ commit }, operation) => {
    commit(types.M_SET_SAMPLE_YEAR_FILTER, { yearFilter: operation });
  },
  [types.A_SET_SAMPLE_DOWNLOAD_FILTERS]: ({ commit }, operation) => {
    commit(types.M_SET_SAMPLE_DOWNLOAD_FILTERS, { downloadFilters: operation });
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
  [types.G_GET_SAMPLES_FILTERED_DOWNLOAD_IDS]: (state, getters) => {
    if (!state.samples) {
      return [];
    } else if (
      !state.downloadFilters.length ||
      (state.downloadFilters.length == 1 && state.downloadFilters[0].id == 0)
    ) {
      return state.samples.map(sample => sample.id);
    } else {
      return state.samples
        .filter(sample =>
          getters[types.G_GET_FILTERS_IDS].includes(sample.idFilter)
        )
        .map(sample => sample.id);
    }
  },
  [types.G_GET_FILTERS_IDS]: state => {
    return state.downloadFilters.length
      ? state.downloadFilters.map(filter => filter.id)
      : [];
  },
  [types.G_GET_USER_TOKEN]: state => {
    return state.user ? state.user.token : "";
  },
  [types.G_GET_USER_LOGGED]: state => {
    return state.user ? true : false;
  },
  [types.G_GET_SAMPLES_LOADED]: state => {
    return state.samples ? true : false;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
