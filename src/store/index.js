import Vue from "vue";
import Vuex from "vuex";

import samples from "./modules/samples";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    samples
  }
});
