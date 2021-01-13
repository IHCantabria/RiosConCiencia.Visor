<template>
  <sweet-modal
    ref="loader"
    :title="mlTitle"
    :blocking="mlBlocking"
    :hide-close-button="mlHideCloseButton"
    :pulse-on-block="mlPulseOnBlock"
    :icon="mlIcon"
    :width="mlWidth"
    :enable-mobile-fullscreen="mlEnableMobileFullscreen"
    :overlay-theme="mlOverlayTheme"
    :modal-theme="mlModalTheme"
    class="app-style"
  >
    <div class="loading-panel">
      <div class="loading-icon">
        <circle-loader :loading="mlActive" :color="mlSpinnerColor" />
      </div>
      <div class="loading-text">{{ mlDisplayText }}</div>
      <div v-if="mlMode == 3" class="loading-table">
        <vs-table :data="mlTasksConfig" no-data-text max-items="2">
          <template slot-scope="{ data }">
            <vs-tr v-for="(tr, indextr) in data.tasks" :key="indextr">
              <vs-td
                class="loading-table__task"
                :data="data.tasks[indextr].text"
                >{{ data.tasks[indextr].text }}</vs-td
              >
              <vs-td v-if="data.loadingBar" class="loading-table__progress">
                <vs-progress
                  v-if="!data.tasks[indextr].completed"
                  indeterminate
                  color="primary"
                ></vs-progress>
                <vs-progress
                  v-else-if="data.tasks[indextr].success"
                  :percent="100"
                  color="success"
                ></vs-progress>
                <vs-progress v-else :percent="100" color="danger"></vs-progress>
              </vs-td>
              <vs-td v-else class="loading-table__status">
                <vs-icon
                  v-if="!data.tasks[indextr].completed"
                  icon="polymer"
                ></vs-icon>
                <vs-icon
                  v-else-if="data.tasks[indextr].success"
                  icon="pet"
                ></vs-icon>
                <vs-icon v-else icon="android"></vs-icon>
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </div>
    </div>
  </sweet-modal>
</template>
<script>
import { spinnerConfig, spinnerEnums } from "@/config/spinner-config";
import { SweetModal } from "sweet-modal-vue";
import { CircleLoader } from "@saeris/vue-spinners";
export default {
  components: {
    "sweet-modal": SweetModal,
    "circle-loader": CircleLoader
  },
  data() {
    return {
      mlBlocking: true,
      mlHideCloseButton: true,
      mlPulseOnBlock: true,
      mlIcon: null,
      mlWidth: null,
      mlEnableMobileFullscreen: false,
      mlOverlayTheme: "light",
      mlModalTheme: "light",
      spinnerConfig,
      spinnerEnums,
      mlActive: false,
      calls: 0
    };
  },
  computed: {
    mlTitle() {
      return this.spinnerConfig && this.spinnerConfig.title
        ? this.spinnerConfig.title
        : "Recopilando";
    },
    mlMode() {
      return this.spinnerConfig && this.spinnerConfig.mode
        ? this.spinnerConfig.mode
        : 1;
    },
    mlText() {
      return this.spinnerConfig && this.spinnerConfig.text
        ? this.spinnerConfig.text
        : "Preparando carga de datos. Por favor, espere...";
    },
    mlTasksConfig() {
      return this.spinnerConfig && this.spinnerConfig.tasksConfig
        ? this.spinnerConfig.tasksConfig
        : null;
    },
    mlDisplayText() {
      return this.mlMode == 1 ? this.mlText : this._taskManagerDisplay();
    },
    mlSpinnerColor() {
      return this.spinnerConfig && this.spinnerConfig.color
        ? this.spinnerConfig.color
        : "#05346d";
    }
  },
  watch: {
    mlActive() {
      if (this.mlActive) {
        this.$refs.loader.open ? this.$refs.loader.open() : "";
      } else {
        this.$refs.loader.close ? this.$refs.loader.close() : "";
      }
    }
  },
  methods: {
    /* Public Methods */
    configureModeSpinner(mode) {
      this.spinnerConfig.mode = mode;
    },
    show() {
      this.calls++;
      this.mlActive = true;
    },
    hide() {
      this.calls--;
      this.calls == 0 ? (this.mlActive = false) : "";
      if (this.calls == 0) this._clearTasks();
    },
    addTask(name, text) {
      this.spinnerConfig.tasksConfig.tasks.push({
        id: this.spinnerConfig.tasksConfig.tasks.length + 1,
        name: name,
        text: text,
        status: this.spinnerEnums.statusTask.pending
      });
    },
    updateTask(name, status = null, text = null) {
      const indexTask = this.spinnerConfig.tasksConfig.tasks.findIndex(
        task => task.name === name
      );
      if (status) {
        this.spinnerConfig.tasksConfig.tasks[indexTask].status = status;
      }
      if (text) {
        this.spinnerConfig.tasksConfig.tasks[indexTask].text = text;
      }
    },
    _clearTasks() {
      this.mlTasksConfig.tasks = [];
    },
    /* Private Methods */
    _taskManagerDisplay() {
      const taskResult = this.mlTasksConfig.tasks.find(task => {
        return task.status === this.spinnerEnums.statusTask.pending;
      });
      if (taskResult == null) {
        return this.mlText;
      } else {
        return taskResult.text;
      }
    }
  }
};
</script>
<style scoped lang="scss">
.loading-panel {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding-bottom: 3%;
  align-items: center;
}

.loading-icon {
  grid-column: 1;
  grid-row: 1;
  margin-left: auto;
  margin-right: auto;
  padding: 2%;
}

.loading-text {
  grid-column: 2/5;
  grid-row: 1;
  text-align: left;
  margin: 1% 5% 1% 5%;
  font-size: 16px;
}

.loading-table {
  grid-column: 1/5;
  grid-row: 2;
  margin: 5% 5% 0% 5%;
  width: 90%;
  text-align: left;

  &__task {
    width: 80%;
  }

  &__progress {
    width: 20%;
  }

  &__icons {
    width: 20%;
  }
}

.vs-con-table {
  background: rgba(255, 255, 255, 0.8);
}

.vs-table--tbody-table tr {
  background: rgba(255, 255, 255, 0.8);
}

.sweet-modal-overlay {
  background: rgba(20, 20, 20, 0.7);
}

/* Non-mobile styles, 750px breakpoint */

@media only screen and (min-width: $breakpoint-movilToTablet) {
  .loading-panel {
    grid-template-columns: repeat(5, 1fr);
    padding-bottom: 1%;
  }

  .loading-text {
    grid-column: 2/6;
    margin: 1% 3% 1% 3%;
  }

  .loading-table {
    grid-column: 1/6;

    &__task {
      width: 80%;
    }

    &__progress {
      width: 20%;
    }

    &__icons {
      width: 20%;
    }
  }
}
</style>
