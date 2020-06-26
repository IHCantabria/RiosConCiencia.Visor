<template>
  <div class="app-fetch-manager">
    <async-loader
      v-if="requestComputed"
      :url="request.url"
      :params="request.params ? request.params : {}"
      :method="request.method ? request.method : 'get'"
      :body="request.body ? request.body : {}"
      @requestFinished="requestsController"
      @stateRequest="pendingState"
      @errorHandler="errorHandler"
    >
    </async-loader>
    <data-operator
      v-if="operationComputed && dataReady"
      :data="data ? data : null"
      :process-logic="operation.processLogic ? operation.processLogic : null"
      :dispatcher="operation.dispatcher ? operation.dispatcher : null"
      :additional-info="
        operation.additionalInfo ? operation.additionalInfo : null
      "
      @dataProcessed="operationsFinishedEvent"
      @operationFinished="operationsController"
    ></data-operator>
  </div>
</template>
<script>
import * as types from "@/store/types";
import { mapState, mapGetters } from "vuex";
import { dataHelperMixin } from "@/mixins/data-helper.js";
import { notificationsMixin } from "@/mixins/notifications.js";
import DataOperator from "@/components/renderless/DataOperator";
import AsyncLoader from "@/components/renderless/AsyncLoader";
import * as apiRios from "@/api/apiRios.js";
export default {
  components: {
    "async-loader": AsyncLoader,
    "data-operator": DataOperator
  },
  mixins: [dataHelperMixin, notificationsMixin],
  data() {
    return {
      request: null,
      operation: null,
      dataReady: false,
      requestState: false,
      data: null,
      pendingTasks: [], // [{ request :{url:"", params:""}, }],
      currentSpinnerTask: null
    };
  },
  computed: {
    ...mapState({
      yearFilter: state => state.samples.yearFilter,
      campaignFilter: state => state.samples.campaignFilter
    }),
    ...mapGetters({
      samplesIds: [types.G_GET_SAMPLES_FILTERED_IDS],
      token: [types.G_GET_USER_TOKEN]
    }),
    requestComputed() {
      return this.request;
    },
    requestStateComputed() {
      return this.requestState;
    },
    operationComputed() {
      return this.operation;
    }
  },
  watch: {
    pendingTasks: {
      handler() {
        this.manageTasks();
      }
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      //set the action event listener
      this.setActionListeners();
      //initial load data
      this.fetchSamplesData();
    },
    setActionListeners() {
      this.$root.$on("callDownload", () => {
        this.fetchCsvData();
      });
      this.$root.$on("callLogin", credentials => {
        this.authenticate(credentials);
      });
    },
    requestsController(data) {
      //define data received to use in the Data_operator, dataReady to true to mark that the data is ready
      this.data = data;
      this.dataReady = true;
    },
    pendingState(state) {
      this.requestState = state;
    },
    errorHandler(error) {
      if (error) {
        const errorMessage = this.logicMessageError(error);
        this.$_showNotificationOnce(
          `${this.currentSpinnerTask.id}`,
          `${errorMessage}`
        );
      }
    },
    logicMessageError(error) {
      return error.response.data.messages;
    },
    operationsFinishedEvent() {},
    operationsController() {
      //actual request to null to reset component async, data to null to reset data, dataReady to false, the data is not ready. pendingTask shift to remove task finished and make watcher load the next
      this.dataReady = false;
      this.request = null;
      this.data = null;
      this.updateSpinnerTask(this.currentSpinnerTask);
      this.currentSpinnerTask = null;
      this.pendingTasks.shift();
    },
    manageSpinnerState(value) {
      value == true ? this.$spinner.show() : this.$spinner.hide();
    },
    manageTasks() {
      if (this.pendingTasks.length > 0) {
        const currentTask = this.pendingTasks[0];
        this.request = currentTask.request;
        this.operation = currentTask.operation;
        this.currentSpinnerTask = currentTask.spinnerTask;
        this.dataReady = this.operation.dataless ? true : false;
      } else {
        this.dataReady = true;
        this.request = null;
        this.operation = null;
      }
    },
    fetchSamplesData() {
      this.createTask(
        apiRios.getAllSamples(),
        this.formatSamples,
        types.A_FETCH_SAMPLES,
        this.createSpinnerTask(
          "Datos de Muestreo",
          "Recopilando datos de muestras. Por favor, espere..."
        )
      );
    },
    authenticate(credentials) {
      this.createTask(
        apiRios.login(credentials),
        null,
        types.A_FETCH_USER,
        this.createSpinnerTask(
          "Validando Usuario",
          "Validando credenciales de acceso. Por favor, espere..."
        )
      );
    },
    fetchCsvData() {
      const filters = {
        year: this.yearFilter.name,
        campaign: this.campaignFilter.name,
        samplesId: this.samplesIds
      };
      this.createTask(
        apiRios.getSamplesCsv(this.token, filters),
        null,
        null,
        this.createSpinnerTask(
          "Descargando Datos",
          "Descargando archivos de muestras. Por favor, espere..."
        )
      );
    },
    createTask(
      requestUrl,
      processLogic,
      dispatcher,
      spinnerTask = null,
      dataless = false,
      additionalInfo = null
    ) {
      const request = requestUrl;
      const operation = {
        processLogic: processLogic,
        dispatcher: dispatcher,
        dataless: dataless,
        additionalInfo: additionalInfo
      };
      this.pendingTasks.push({ request, operation, spinnerTask });
      this.addSpinnerTask(spinnerTask);
    },
    createSpinnerTask(id, description) {
      return { id: id, description };
    },
    addSpinnerTask(spinnerTask) {
      spinnerTask
        ? this.$spinner.addTask(spinnerTask.id, spinnerTask.description)
        : "";
      this.manageSpinnerState(true);
    },
    updateSpinnerTask(spinnerTask) {
      spinnerTask
        ? this.$spinner.updateTask(
            spinnerTask.id,
            this.$spinnerEnums.statusTask.completed
          )
        : "";
      this.manageSpinnerState(false);
    }
  }
};
</script>
