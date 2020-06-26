<template>
  <div class="app-info">
    <panel-about class="panel-about"></panel-about>
    <panel-filters></panel-filters>
    <panel-login v-if="!userLogged"></panel-login>
    <vs-button
      v-if="userLogged"
      color="primary"
      type="filled"
      @click="launchDownload"
      >Descargar Datos</vs-button
    >
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import * as types from "@/store/types";
import AppAbout from "@/components/layout/AppAbout.vue";
import PanelFilters from "@/components/PanelFilters.vue";
import PanelLogin from "@/components/PanelLogin.vue";
export default {
  components: {
    "panel-about": AppAbout,
    "panel-login": PanelLogin,
    "panel-filters": PanelFilters
  },
  computed: {
    ...mapGetters({
      userLogged: [types.G_GET_USER_LOGGED]
    })
  },
  methods: {
    launchDownload() {
      this.$root.$emit("callDownload");
    }
  }
};
</script>
<style scoped lang="scss">
.app-info {
  position: absolute;
  top: 80%;
  width: 100%;
  background-color: lightgray;
}
</style>
