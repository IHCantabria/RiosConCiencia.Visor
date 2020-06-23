import Vue from "vue";
import * as types from "../types";

const state = {
  sources: [],
  products: [],
  productMoments: null,
  variableTypes: null
};

const mutations = {
  [types.M_SET_PRODUCTS](state, payload) {
    state.products = payload.products;
  },
  [types.M_SET_SOURCES](state, payload) {
    state.sources = payload.sources;
  },
  [types.M_SET_PRODUCTMOMENTS](state, payload) {
    state.productMoments = payload.productMoments;
  },
  [types.M_SET_PRODUCTVARIABLETYPES](state, payload) {
    state.variableTypes = payload.variableTypes;
  },
  [types.M_UPDATE_PRODUCTS_SELECTED](state, payload) {
    Vue.set(state.products[payload.index], "selected", payload.value);
  }
};

const actions = {
  [types.A_FETCH_DATAHUB_PRODUCTS]: ({ commit }, operation) => {
    commit(types.M_SET_PRODUCTS, { products: operation });
  },
  [types.A_FETCH_DATAHUB_SOURCES]: ({ commit }, operation) => {
    commit(types.M_SET_SOURCES, {
      sources: operation
    });
  },
  [types.A_FETCH_DATAHUB_PRODUCTMOMENTS]: ({ commit }, operation) => {
    commit(types.M_SET_PRODUCTMOMENTS, {
      productMoments: operation
    });
  },
  [types.A_FETCH_DATAHUB_PRODUCTVARIABLETYPES]: (
    { state, commit },
    operation
  ) => {
    let variableTypes = state.variableTypes ? state.variableTypes : [];
    variableTypes.push(...operation);
    commit(types.M_SET_PRODUCTVARIABLETYPES, {
      variableTypes: variableTypes
    });
  },
  [types.A_SET_CLEAR_PRODUCTS]: ({ commit }) => {
    commit(types.M_SET_PRODUCTS, { products: [] });
  },
  [types.A_UPDATE_PRODUCTS_SELECTED]: ({ commit }, operation) => {
    commit(types.M_UPDATE_PRODUCTS_SELECTED, {
      index: operation.index,
      value: operation.value
    });
  }
};

const getters = {
  [types.G_GET_PRODUCTS_SORTED]: state => {
    return state.products.sort(
      (a, b) => a.spatialResolution - b.spatialResolution
    );
  },
  [types.G_GET_PRODUCTS_SELECTED]: state => {
    return state.products.filter(product => product.selected == true);
  },
  [types.G_GET_PRODUCTS_COUNT]: state => {
    return state.products.length;
  },
  [types.G_GET_PRODUCT_BY_MAPID]: state => mapID => {
    return state.products.findIndex(product => product.mapID === mapID);
  },
  [types.G_GET_SOURCE_NAMESHORT]: state => id => {
    return state.sources.find(source => source.id === id).nameShort;
  },
  [types.G_GET_SOURCE_TYPE]: state => id => {
    return state.sources.find(source => source.id === id).sourceType;
  },
  [types.G_GET_PRODUCTMOMENTS_SORTED]: state => {
    return state.productMoments
      ? state.productMoments.sort((a, b) => a.id - b.id)
      : null;
  },
  [types.G_GET_PRODUCTVARIABLETYPES_BY_PRODUCTMOMENTS]: (
    state,
    getters,
    rootState
  ) => {
    return state.variableTypes && rootState.filters.momentFilter
      ? state.variableTypes.filter(
          variableType =>
            variableType.momentId == rootState.filters.momentFilter
        )
      : null;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
