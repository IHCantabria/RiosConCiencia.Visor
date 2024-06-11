<script setup>
import { ref, computed, watch } from "vue";
import { SweetModal } from "sweet-modal-vue-3";
import { useSpinnerStore } from "@/store/spinnerStore";
import SpinnerComponent from "@/components/base/ui/SpinnerComponent.vue";

const spinnerStore = useSpinnerStore();

// DATA
const mlBlocking = ref(true);
const mlHideCloseButton = ref(true);
const mlPulseOnBlock = ref(true);
const mlIcon = ref(null);
const mlWidth = ref(null);
const mlEnableMobileFullscreen = ref(false);
const mlOverlayTheme = ref("light");
const mlModalTheme = ref("light");
const loaderRef = ref(null);

// COMPUTED
const mlTitle = computed(() => {
  return spinnerStore.spinnerConfig && spinnerStore.spinnerConfig.title
    ? spinnerStore.spinnerConfig.title
    : "Recopilando";
});
const mlMode = computed(() => {
  return spinnerStore.spinnerConfig && spinnerStore.spinnerConfig.mode
    ? spinnerStore.spinnerConfig.mode
    : 1;
});
const mlText = computed(() => {
  return spinnerStore.spinnerConfig && spinnerStore.spinnerConfig.text
    ? spinnerStore.spinnerConfig.text
    : "Preparando carga de datos. Por favor, espere...";
});
const mlDisplayText = computed(() => {
  return mlMode.value == 1 ? mlText.value : _taskManagerDisplay();
});
const mlSpinnerColor = computed(() => {
  return spinnerStore.spinnerConfig && spinnerStore.spinnerConfig.color
    ? spinnerStore.spinnerConfig.color
    : "#05346d";
});
const data = computed(() => {
  return spinnerStore.mlTasksConfig;
});

// WATCHERS
watch(
  () => spinnerStore.mlActive,
  (newValue) => {
    if (newValue) {
      loaderRef.value.open();
    } else {
      loaderRef.value.close();
    }
  },
);

// METHODS
const _taskManagerDisplay = () => {
  const taskResult = spinnerStore.mlTasksConfig.tasks.find((task) => {
    return task.status === spinnerStore.spinnerEnums.statusTask.pending;
  });
  if (taskResult == null) {
    return mlText.value;
  } else {
    return taskResult.text;
  }
};
</script>

<template>
  <SweetModal
    ref="loaderRef"
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
        <SpinnerComponent
          v-if="spinnerStore.mlActive"
          :size="50"
          :border-width="5"
          :border-color="mlSpinnerColor"
          :has-absolute-position="true"
        />
      </div>
      <div class="loading-text">{{ mlDisplayText }}</div>
      <div v-if="mlMode == 3" class="loading-table">
        <table
          :data="spinnerStore.mlTasksConfig"
          no-data-text
          max-items="2"
          aria-label="spinner-table"
        >
          <tr v-for="(tr, indextr) in data.tasks" :key="indextr">
            <th class="loading-table__task" :data="data.tasks[indextr].text">
              {{ data.tasks[indextr].text }}
            </th>
            <td v-if="data.loadingBar" class="loading-table__progress">
              <progress
                v-if="!data.tasks[indextr].completed"
                indeterminate
                color="primary"
              ></progress>
              <progress
                v-else-if="data.tasks[indextr].success"
                :percent="100"
                color="success"
              ></progress>
              <progress v-else :percent="100" color="danger"></progress>
            </td>
            <td v-else class="loading-table__status">
              <vs-icon
                v-if="!data.tasks[indextr].completed"
                icon="polymer"
              ></vs-icon>
              <vs-icon
                v-else-if="data.tasks[indextr].success"
                icon="pet"
              ></vs-icon>
              <vs-icon v-else icon="android"></vs-icon>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </SweetModal>
</template>

<style scoped lang="scss">
.loading-panel {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding-bottom: 3%;
  align-items: center;
  border-radius: 20px;
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
  margin: 1% 5%;
  font-size: 16px;
}

.loading-table {
  grid-column: 1/5;
  grid-row: 2;
  margin: 5% 5% 0%;
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

.con-table {
  background: rgb(255 255 255 / 80%);
}

/* stylelint-disable-next-line selector-class-pattern */
.table--tbody-table tr {
  background: rgb(255 255 255 / 80%);
}

.sweet-modal-overlay {
  background: rgb(20 20 20 / 70%);
}

/* Non-mobile styles, 750px breakpoint */

@media only screen and (min-width: app-variables.$breakpoint-movil-to-tablet) {
  .loading-panel {
    grid-template-columns: repeat(5, 1fr);
    padding-bottom: 1%;
  }

  .loading-text {
    grid-column: 2/6;
    margin: 1% 3%;
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
