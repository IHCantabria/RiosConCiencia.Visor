import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import Vuesax from "vuesax3";
import VueMatomo from "vue-matomo";
import router from "./router";

const pinia = createPinia();
const app = createApp(App);

app.use(Vuesax, {
  theme: {
    colors: {
      primary: "#1c313a",
    },
  },
});

app
  .use(VueMatomo, {
    host: "https://analytics.ihcantabria.com/",
    siteId: 21,
  })
  .use(pinia)
  .use(router)
  .mount("#app");
