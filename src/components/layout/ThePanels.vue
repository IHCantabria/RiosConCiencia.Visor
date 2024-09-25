<script setup>
import { ref, computed } from "vue";
import TheAbout from "@/components/layout/TheAbout.vue";
import TheLogout from "@/components/layout/TheLogout.vue";
import PanelLogin from "@/components/PanelLogin.vue";
import PanelFilters from "@/components/PanelFilters.vue";
import PanelFilterDownload from "@/components/PanelFilterDownload.vue";
import ReportYearsDownload from "@/components/ReportYearsDownload.vue";
import { useSamplesStore } from "@/store/samplesStore";

// COMPOSABLES & STORES
const samplesStore = useSamplesStore();

// DATA
const panelShow = ref(true);

// EMITS
const emit = defineEmits([
  "callDownload",
  "callReportDownload",
  "callLogin",
  "logout",
]);

// COMPUTED
const isPanelVisible = computed(
  () => samplesStore.getSamplesLoaded && panelShow.value,
);

// METHODS
const launchDownload = () => {
  emit("callDownload");
};
const launchReportPDFDownload = () => {
  emit("callReportDownload");
};
const togglePanel = () => {
  panelShow.value = !panelShow.value;
};

// EXPOSE
defineExpose({ togglePanel });
</script>

<template>
  <div v-if="samplesStore.getSamplesLoaded">
    <div v-show="isPanelVisible" class="app-info">
      <div class="panel-header">
        <TheAbout class="panel-about" />
        <PanelLogin
          v-if="!samplesStore.getUserLogged"
          @call-login="emit('callLogin', $event)"
        />
        <TheLogout v-if="samplesStore.getUserLogged" />
      </div>
      <vs-tabs>
        <vs-tab icon="map" label="Visualización">
          <PanelFilters />
        </vs-tab>
        <vs-tab icon="cloud_download" label="Descarga datos">
          <div v-if="samplesStore.getUserLogged" class="panel-download">
            <PanelFilterDownload />
            <div class="panel-download__action">
              <span class="download-text">
                Descargar datos de las campañas seleccionadas
              </span>
              <div class="download-icon" @click="launchDownload">
                <img
                  src="@/assets/svgs/download.svg"
                  alt="download icon"
                  style="pointer-events: none"
                />
              </div>
            </div>
          </div>
          <div v-else>
            <span class="download-text">
              Tienes que estar logueado para tener acceso a la descarga de datos
            </span>
          </div>
        </vs-tab>
        <vs-tab icon="sim_card_download" label="Descarga informe PDF">
          <div v-if="samplesStore.getUserLogged" class="panel-download">
            <ReportYearsDownload />
            <div class="panel-download__action">
              <span class="download-text">
                Descargar informe PDF del año seleccionado
              </span>
              <div class="download-icon" @click="launchReportPDFDownload">
                <img
                  src="@/assets/svgs/download.svg"
                  alt="download icon"
                  style="pointer-events: none"
                />
              </div>
            </div>
          </div>
          <div v-else>
            <span class="download-text">
              Tienes que estar logueado para tener acceso a la descarga del
              informe PDF
            </span>
          </div>
        </vs-tab>
      </vs-tabs>
    </div>
  </div>
</template>

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
  bottom: 5%;
  margin-bottom: auto;
  max-width: 600px;
  background-color: #f4f4f4;
  box-shadow: 0 1px 5px rgb(0 0 0 / 40%);
  border-radius: 15px;
  touch-action: none; // prevent scroll drag
}

.panel-header {
  background: rgb(0 0 0 / 5%);
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
  padding: 12px 8px 0;
  margin-right: auto;

  &:hover {
    cursor: pointer;
  }
}
</style>
