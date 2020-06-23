//Import Core Vue
import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import Spinner from "@/components/ui/BaseSpinner";
import { colorsSCSSMixin } from "@/mixins/colors-css";
import { spinnerEnums } from "@/config/spinner-config";
import { primaryColor } from "@/styles/exports-variables.scss";

/* Global mixins */

/*Spinner global like a Vue property */
const spinner = new Vue(Spinner).$mount();
Vue.prototype.$spinner = spinner;
Vue.prototype.$spinnerEnums = spinnerEnums;
document.body.appendChild(spinner.$el);

//Import Filters
import "./filters";
//Import Global Mixins
Vue.mixin(colorsSCSSMixin);
//Import Plugins
import Vuesax from "vuesax";

Vue.config.productionTip = false;

/* Overrides styles */
import "./styles/overrides.scss";

Vue.use(Vuesax, {
  theme: {
    colors: {
      primary: primaryColor //Primary Color
    }
  }
});

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
