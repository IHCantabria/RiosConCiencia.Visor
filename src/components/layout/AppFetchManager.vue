<template>
  <div class="app-fetch-manager">
    <async-loader
      v-if="requestComputed"
      :url="request.url"
      :params="request.params ? request.params : {}"
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
      @dataProcessed="operationsController"
      @operationFinished="operationsController"
    ></data-operator>
  </div>
</template>
<script>
import { mapState } from "vuex";
import * as types from "@/store/types";
import { dataHelperMixin } from "@/mixins/data-helper.js";
import { notificationsMixin } from "@/mixins/notifications.js";
import DataOperator from "@/components/renderless/DataOperator";
import AsyncLoader from "@/components/renderless/AsyncLoader";
import * as mercurio from "@/api/mercurio.js";
import * as apiSensors from "@/api/apiSensors.js";
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
      searchCoords: state => state.coords.searchCoords,
      productMoments: state => state.datahub.productMoments,
      onlySpatial: state => state.filters.onlySpatial,
      allowProducts: state => state.filters.allowProducts,
      allowBuoys: state => state.filters.allowBuoys,
      allowStations: state => state.filters.allowStations,
      variableFilter: state => state.filters.variableFilter,
      buoyTypeFilter: state => state.filters.buoyTypeFilter.id,
      stationTypeFilter: state => state.filters.stationTypeFilter.code
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
    searchCoords: {
      handler() {
        this.fetchProducts();
        this.fetchSensors();
      },
      deep: true
    },
    pendingTasks: {
      handler() {
        this.manageTasks();
      }
    },
    productMoments: {
      handler() {
        //load data variables when ProductMoments are Defined
        this.fetchProductVariableTypes();
      },
      deep: true
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      //initial load data
      this.fetchSourceData();
      this.fetchProductMomentsData();
      this.fetchBuoyTypesData();
      //Commented to hide station logic
      // this.fetchStationTypesData();
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
      error
        ? this.$_showNotificationOnce(
            `${this.currentSpinnerTask.id}`,
            `${error}`
          )
        : "";
    },
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
    fetchSourceData() {
      this.createTask(
        mercurio.getAllSources(),
        this.formatSources,
        types.A_FETCH_DATAHUB_SOURCES,
        this.createSpinnerTask(
          "sourceData",
          "Loading data sources. Please, wait..."
        )
      );
    },
    fetchBuoyTypesData() {
      this.createTask(
        apiSensors.getAllBuoyTypes(),
        null,
        types.A_FETCH_APISENSORS_BUOYTYPES,
        this.createSpinnerTask(
          "buoyTypesData",
          "Loading buoy types. Please, wait..."
        )
      );
    },
    fetchStationTypesData() {
      this.createTask(
        apiSensors.getAllStationsTypes(),
        null,
        types.A_FETCH_APISENSORS_STATIONTYPES,
        this.createSpinnerTask(
          "StationTypesData",
          "Loading station types. Please, wait..."
        )
      );
    },
    fetchProductMomentsData() {
      this.createTask(
        mercurio.getAllProductMoments(),
        this.formatProductMoments,
        types.A_FETCH_DATAHUB_PRODUCTMOMENTS,
        this.createSpinnerTask(
          "productMomentsData",
          "Loading temporal types. Please, wait..."
        )
      );
    },
    fetchProductVariableTypes() {
      this.productMoments.forEach(moment => {
        this.createTask(
          mercurio.getVariableTypesByProductMomentId(moment.id),
          this.formatProductVariableTypes,
          types.A_FETCH_DATAHUB_PRODUCTVARIABLETYPES,
          this.createSpinnerTask(
            `variableTypesData${moment.name}`,
            `Loading ${moment.name} variable types. Please, wait...`
          ),
          false,
          { momentId: moment.id }
        );
      });
    },
    fetchSensors() {
      this.addTaskClearSensors();
      this.allowBuoys ? this.fetchBuoysCase() : "";
      this.allowStations ? this.fetchStationsCase() : "";
      this.addTaskDispatchSensors();
    },
    fetchBuoysCase() {
      if (this.onlySpatial && this.searchCoords.global) {
        this.addTaskGetGlobalBuoys();
      } else if (this.onlySpatial && !this.searchCoords.global) {
        this.addTaskGetBuoysByCoords();
      } else if (!this.onlySpatial && this.searchCoords.global) {
        this.addTaskGetBuoysByTypes();
      } else {
        this.addTaskGetBuoysByCoordsAndTypes();
      }
    },
    fetchStationsCase() {
      if (this.onlySpatial && this.searchCoords.global) {
        this.addTaskGetGlobalStations();
      } else if (this.onlySpatial && !this.searchCoords.global) {
        this.addTaskGetGlobalStations();
      } else if (!this.onlySpatial && this.searchCoords.global) {
        this.addTaskGetStationsByTypes();
      } else {
        this.addTaskGetStationsByTypes();
      }
    },
    addTaskClearSensors() {
      this.createTask(
        null,
        null,
        types.A_SET_CLEAR_SENSORS,
        this.createSpinnerTask(
          "clearingSensors",
          "Clearing Sensors. Please, wait..."
        ),
        true,
        null
      );
    },
    fetchProducts() {
      this.addTaskClearProducts();
      this.allowProducts ? this.fetchProductsCase() : "";
    },
    fetchProductsCase() {
      if (this.onlySpatial && this.searchCoords.global) {
        this.addTaskGetGlobalProducts();
      } else if (this.onlySpatial && !this.searchCoords.global) {
        this.addTaskGetProductsByCoords();
      } else if (!this.onlySpatial && this.searchCoords.global) {
        this.addTaskGetProductsByTypes();
      } else {
        this.addTaskGetProductsByCoordsAndTypes();
      }
    },
    addTaskClearProducts() {
      this.createTask(
        null,
        null,
        types.A_SET_CLEAR_PRODUCTS,
        this.createSpinnerTask(
          "clearingProducts",
          "Clearing Products. Please, wait..."
        ),
        true,
        null
      );
    },
    addTaskGetGlobalProducts() {
      this.createTask(
        mercurio.getAllProducts(),
        this.formatProducts,
        types.A_FETCH_DATAHUB_PRODUCTS,
        this.createSpinnerTask(
          "globalProducts",
          "Searching products. Please, wait..."
        )
      );
    },
    addTaskGetProductsByCoords() {
      this.createTask(
        mercurio.getProductsByCoords(this.searchCoords),
        this.formatProducts,
        types.A_FETCH_DATAHUB_PRODUCTS,
        this.createSpinnerTask(
          "coordsProducts",
          "Searching products in the selected coordinates. Please, wait..."
        )
      );
    },
    addTaskGetProductsByTypes() {
      this.createTask(
        mercurio.getProductsByTypes(this.variableFilter),
        this.formatProducts,
        types.A_FETCH_DATAHUB_PRODUCTS,
        this.createSpinnerTask(
          "typesProducts",
          "Searching products with specific type. Please, wait..."
        )
      );
    },
    addTaskGetProductsByCoordsAndTypes() {
      this.createTask(
        mercurio.getProductsByCoordsAndTypes(
          this.searchCoords,
          this.variableFilter
        ),
        this.formatProducts,
        types.A_FETCH_DATAHUB_PRODUCTS,
        this.createSpinnerTask(
          "coordsAndTypesProducts",
          "Searching products with specific type in the selected coordinates. Please, wait..."
        )
      );
    },
    addTaskGetGlobalStations() {
      this.createTask(
        apiSensors.getAllStations(),
        this.formatStations,
        types.A_FETCH_APISENSORS_STATIONS,
        this.createSpinnerTask(
          "globalStations",
          "Searching stations. Please, wait..."
        )
      );
    },
    addTaskGetStationsByTypes() {
      this.createTask(
        apiSensors.getStationsByTypes(this.stationTypeFilter),
        this.formatStations,
        types.A_FETCH_APISENSORS_STATIONS,
        this.createSpinnerTask(
          "typesStations",
          "Searching stations with specific type. Please, wait..."
        )
      );
    },
    addTaskGetGlobalBuoys() {
      this.createTask(
        apiSensors.getAllBuoys(),
        this.formatBuoys,
        types.A_FETCH_APISENSORS_BUOYS,
        this.createSpinnerTask(
          "globalBuoys",
          "Searching buoys. Please, wait..."
        )
      );
    },
    addTaskGetBuoysByCoords() {
      this.createTask(
        apiSensors.getBuoysByCoords(this.searchCoords),
        this.formatBuoys,
        types.A_FETCH_APISENSORS_BUOYS,
        this.createSpinnerTask(
          "coordsBuoys",
          "Searching buoys in the selected coordinates. Please, wait..."
        )
      );
    },
    addTaskGetBuoysByTypes() {
      this.createTask(
        apiSensors.getBuoysByTypes(this.buoyTypeFilter),
        this.formatBuoys,
        types.A_FETCH_APISENSORS_BUOYS,
        this.createSpinnerTask(
          "typesBuoys",
          "Searching buoys with specific type. Please, wait..."
        )
      );
    },
    addTaskGetBuoysByCoordsAndTypes() {
      this.createTask(
        apiSensors.getBuoysByCoordsAndTypes(
          this.searchCoords,
          this.buoyTypeFilter
        ),
        this.formatBuoys,
        types.A_FETCH_APISENSORS_BUOYS,
        this.createSpinnerTask(
          "coordsAndTypesBuoys",
          "Searching buoys with specific type in the selected coordinates. Please, wait..."
        )
      );
    },
    addTaskDispatchSensors() {
      this.createTask(
        null,
        null,
        types.A_SET_SENSORS,
        this.createSpinnerTask(
          "dispatchSensors",
          "Preparing Sensors to use. Please, wait..."
        ),
        true,
        null
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
