import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import Vuesax from "vuesax3";

const pinia = createPinia();
const app = createApp(App);

app.use(Vuesax, {
  theme: {
    colors: {
      primary: "#1c313a",
    },
  },
});

app.use(pinia).mount("#app");
