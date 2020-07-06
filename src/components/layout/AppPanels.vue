<template>
  <div v-if="samplesLoaded">
    <div v-show="isPanelVisible" class="app-info">
      <div class="panel-header">
        <panel-about class="panel-about"></panel-about>
        <panel-login v-if="!userLogged"></panel-login>
      </div>
      <vs-tabs>
        <vs-tab icon="map" label="Visualización">
          <div class="panel-filters">
            <panel-filters></panel-filters>
          </div>
        </vs-tab>
        <vs-tab icon="cloud_download" label="Descarga">
          <div v-if="userLogged" class="panel-download">
            <panel-filter-download></panel-filter-download>
            <div class="panel-download__action">
              <span class="download-text"
                >Descargar datos de las campañas seleccionadas</span
              >
              <div class="download-icon" @click="launchDownload">
                <object
                  :data="require('@/assets/download.svg')"
                  type="image/svg+xml"
                  style="pointer-events: none;"
                />
              </div>
            </div>
          </div>
          <div v-else>
            <span class="download-text"
              >Has de loguearte para tener acceso a la descarga de datos</span
            >
          </div>
        </vs-tab>
      </vs-tabs>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import * as types from "@/store/types";
import AppAbout from "@/components/layout/AppAbout.vue";
import PanelFilters from "@/components/PanelFilters.vue";
import PanelFilterDownload from "@/components/PanelFilterDownload.vue";
import PanelLogin from "@/components/PanelLogin.vue";
export default {
  components: {
    "panel-about": AppAbout,
    "panel-login": PanelLogin,
    "panel-filters": PanelFilters,
    "panel-filter-download": PanelFilterDownload
  },
  data() {
    return {
      panelShow: true
    };
  },
  computed: {
    ...mapGetters({
      userLogged: [types.G_GET_USER_LOGGED],
      samplesLoaded: [types.G_GET_SAMPLES_LOADED]
    }),
    isPanelVisible() {
      return this.samplesLoaded && this.panelShow ? true : false;
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      //set the action event listener
      this.setActionListeners();
    },
    setActionListeners() {
      this.$root.$on("toggleFilterPanel", () => {
        this.panelShow = !this.panelShow;
      });
    },
    launchDownload() {
      this.$root.$emit("callDownload");
    }
  }
};
</script>
<style scoped lang="scss">
.app-info {
  z-index: 800;
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
  width: 100%;
  bottom: 2.5%;
  margin-bottom: auto;
  max-width: 600px;
  background-color: #f4f4f4;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.4);
  border-radius: 15px;
}

.panel-header {
  background: rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: row-reverse;
}
.panel-download {
  display: flex;
  flex-direction: column;
  align-items: center;
  &__action {
    align-items: center;
    display: flex;
    flex-flow: row nowrap;
  }
}
.download-text {
  margin-left: auto;
  margin-right: auto;
  font-size: 0.9rem;
}
.download-icon {
  width: 30px;
  padding: 12px 8px 0 8px;
  margin-right: auto;
  &:hover {
    cursor: pointer;
  }
}
</style>
