<script setup>
import { ref, onMounted, watch, computed, nextTick } from "vue";
import DataOperator from "@/components/renderless/DataOperator.vue";
import AsyncLoader from "@/components/renderless/AsyncLoader.vue";
import * as apiRios from "@/api/apiRios.js";
import * as apiProcess from "@/api/apiProcess.js";
import { useSamplesStore } from "@/store/samplesStore";
import { useSpinnerStore } from "@/store/spinnerStore";
import { useDataHelper } from "@/composables/data-helper";
import { useNotifications } from "@/composables/notifications";

// COMPOSABLES
const samplesStore = useSamplesStore();
const spinnerStore = useSpinnerStore();
const { formatSamples, formatPictsSamples, checkRole } = useDataHelper();
const { showNotificationOnce } = useNotifications();

// DATA
const request = ref(null);
const operation = ref(null);
const dataReady = ref(false);
const requestState = ref(false);
const data = ref(null);
const pendingTasks = ref([]); // [{ request :{url:"", params:""}, }],
const currentSpinnerTask = ref(null);

// COMPUTED
const samplesIds = computed(() => samplesStore.getSamplesFilteredDownloadIds);
const samplesPictsIds = computed(
  () => samplesStore.getSamplesPictsFilteredDownloadIds,
);
const token = computed(() => samplesStore.getUserToken);
const isFilterAll = computed(() => samplesStore.getIsFilterAll);

// WATCHERS
watch(
  () => pendingTasks.value,
  () => {
    manageTasks();
  },
  { deep: true },
);

// LYFE CYCLE HOOKS
onMounted(() => {
  init();
});

// METHODS
const init = () => {
  fetchSamplesData();
  fetchPictsSamplesData();
  fetchRiversGeoJson();
};
const requestsController = (dataParam) => {
  data.value = dataParam;
  dataReady.value = true;
};
const pendingState = (state) => {
  requestState.value = state;
};
const errorHandler = (error) => {
  if (error) {
    const errorMessage = logicMessageError(error);
    showNotificationOnce(`${currentSpinnerTask.value.id}`, `${errorMessage}`);
  }
};
const errorOperationHandler = (error) => {
  if (error) {
    const errorMessage =
      "Tu usuario no tiene permisos para acceder a la descarga de datos.";
    showNotificationOnce(`${currentSpinnerTask.value.id}`, `${errorMessage}`);
  }
};
const logicMessageError = (error) => {
  return error.response.data.messages;
};
const operationsFinishedEvent = () => {};
const operationsController = () => {
  //actual request to null to reset component async, data to null to reset data, dataReady to false, the data is not ready. pendingTask shift to remove task finished and make watcher load the next
  dataReady.value = false;
  request.value = null;
  data.value = null;
  updateSpinnerTask(currentSpinnerTask.value);
  currentSpinnerTask.value = null;
  pendingTasks.value.shift();
};
const manageSpinnerState = (value) => {
  value ? spinnerStore.show() : spinnerStore.hide();
};
const manageTasks = () => {
  if (pendingTasks.value.length > 0) {
    const currentTask = pendingTasks.value[0];
    request.value = currentTask.request;
    operation.value = currentTask.operation;
    currentSpinnerTask.value = currentTask.spinnerTask;
    dataReady.value = operation.value.dataless;
  } else {
    dataReady.value = true;
    request.value = null;
    operation.value = null;
  }
};
const fetchSamplesData = () => {
  if (samplesStore.samples) return;
  createTask(
    apiRios.getAllSamples(),
    formatSamples,
    "fetchSamples",
    createSpinnerTask(
      "Datos de Muestreo",
      "Recopilando datos de muestras. Por favor, espere...",
    ),
  );
};
const fetchSamplesAdminData = () => {
  if (samplesStore.samples) return;
  createTask(
    apiRios.getAllSamplesWithUserInfo(token.value),
    formatSamples,
    "fetchSamples",
    createSpinnerTask(
      "Datos de Muestreo",
      "Recopilando datos de muestras. Por favor, espere...",
    ),
  );
};
const fetchPictsSamplesData = () => {
  if (samplesStore.samplesPicts) return;
  createTask(
    apiRios.getAllPictsSamples(),
    formatPictsSamples,
    "fetchPictsSamples",
    createSpinnerTask(
      "Datos de Muestreo Pictos",
      "Recopilando datos de muestras de pictos. Por favor, espere...",
    ),
  );
};
const fetchRiversGeoJson = async () => {
  if (samplesStore.riversGeoJson) return;
  try {
    const riversGeoJson = await apiRios.getRiversGeoJson();
    samplesStore.setRiversGeoJson(riversGeoJson);
  } catch (error) {
    showNotificationOnce(
      "Datos de Ríos",
      "Error al cargar los datos de los ríos.",
    );
  }
};
const authenticate = (credentials) => {
  createTask(
    apiRios.login(credentials),
    checkRole,
    "fetchUser",
    createSpinnerTask(
      "Validando Usuario",
      "Validando credenciales de acceso. Por favor, espere...",
    ),
  );
};
const fetchCsvData = () => {
  isFilterAll.value ? fetchCsvAllData() : fetchCsvFilterData();
};
const fetchReportPDF = (year) => {
  createTask(
    apiProcess.getReportPDF(token.value, year),
    null,
    null,
    createSpinnerTask(
      "Descargando Reporte",
      "Descargando reporte. Por favor, espere...",
    ),
  );
};
const fetchCsvAllData = () => {
  createTask(
    apiRios.getAllSamplesCsv(token.value),
    null,
    null,
    createSpinnerTask(
      "Descargando Datos",
      "Descargando archivos de muestras. Por favor, espere...",
    ),
  );
};
const fetchCsvFilterData = () => {
  const filters = {
    samplesId: samplesIds.value,
    samplesPictsId: samplesPictsIds.value,
  };
  createTask(
    apiRios.getSamplesCsv(token.value, filters),
    null,
    null,
    createSpinnerTask(
      "Descargando Datos Filtrados",
      "Descargando archivos de muestras filtrados. Por favor, espere...",
    ),
  );
};
const createTask = (
  requestUrl,
  processLogic,
  dispatcher,
  spinnerTask = null,
  dataless = false,
  additionalInfo = null,
) => {
  const request = requestUrl;
  const operation = {
    processLogic: processLogic,
    dispatcher,
    dataless: dataless,
    additionalInfo: additionalInfo,
  };
  pendingTasks.value.push({ request, operation, spinnerTask });
  addSpinnerTask(spinnerTask);
};
const createSpinnerTask = (id, description) => {
  return { id: id, description };
};
const addSpinnerTask = (spinnerTask) => {
  if (spinnerTask) {
    spinnerStore.addTask(spinnerTask.id, spinnerTask.description);
  }
  manageSpinnerState(true);
};
const updateSpinnerTask = (spinnerTask) => {
  if (spinnerTask) {
    spinnerStore.updateTask(
      spinnerTask.id,
      spinnerStore.spinnerEnums.statusTask.completed,
    );
  }
  manageSpinnerState(false);
};

// WATCHERS
watch(
  () => samplesStore.user,
  async () => {
    samplesStore.samples = null;
    await nextTick();
    samplesStore.getAdminLogged ? fetchSamplesAdminData() : fetchSamplesData();
  },
);

// EXPOSE
defineExpose({
  fetchCsvData,
  fetchReportPDF,
  authenticate,
});
</script>

<template>
  <div class="app-fetch-manager">
    <AsyncLoader
      v-if="request"
      :url="request.url"
      :params="request.params ? request.params : {}"
      :method="request.method ? request.method : 'get'"
      :body="request.body ? request.body : {}"
      @request-finished="requestsController"
      @state-request="pendingState"
      @error-handler="errorHandler"
    />
    <DataOperator
      v-if="operation && dataReady"
      :data="data ? data : null"
      :process-logic="operation.processLogic ? operation.processLogic : null"
      :dispatcher="operation.dispatcher ? operation.dispatcher : null"
      :additional-info="
        operation.additionalInfo ? operation.additionalInfo : null
      "
      @data-processed="operationsFinishedEvent"
      @error-operation-handler="errorOperationHandler"
      @operation-finished="operationsController"
    />
  </div>
</template>
