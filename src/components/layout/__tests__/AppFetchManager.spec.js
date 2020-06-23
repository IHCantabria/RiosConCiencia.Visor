import { shallowMount, createLocalVue } from "@vue/test-utils";
import AppFetchManager from "../AppFetchManager.vue";
import merge from "lodash.merge";
import Vuex from "vuex";

jest.mock("../../../api/mercurio");
jest.mock("../../../api/apiSensors");
const localVue = createLocalVue();
localVue.use(Vuex);

function createWrapper(overrides) {
  const defaultMountingOptions = {
    localVue,
    mocks: {
      $spinner: {
        addTask: jest.fn(),
        updateTask: jest.fn(),
        show: jest.fn(),
        hide: jest.fn()
      },
      $spinnerEnums: {
        ModesSpinner: []
      }
    }
  };
  return shallowMount(
    AppFetchManager,
    merge(defaultMountingOptions, overrides)
  );
}

describe("appFetchManager.vue", () => {
  let store;
  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        filters: {
          state: {
            allowProducts: true,
            onlySpatial: false,
            allowBuoys: true,
            allowStations: true,
            buoyTypeFilter: { id: 1 },
            stationTypeFilter: { code: 1 }
          }
        },
        coords: {
          state: {
            searchCoords: {}
          }
        },
        datahub: {
          state: {
            productMoments: [
              { object: true },
              { object: true },
              { object: true }
            ]
          }
        }
      }
    });
  });
  //UNIT TESTS
  it("manageSpinnerState is called when updateSpinnerTask is called", () => {
    expect.assertions(1);
    const manageSpinnerState = jest.fn();
    const wrapper = createWrapper({
      methods: { manageSpinnerState, init: jest.fn() },
      store
    });
    wrapper.vm.updateSpinnerTask();
    expect(manageSpinnerState).toHaveBeenCalled();
  });
  it("manageSpinnerState is called when addSpinnerTask is called", () => {
    expect.assertions(1);
    const manageSpinnerState = jest.fn();
    const wrapper = createWrapper({
      methods: { manageSpinnerState, init: jest.fn() },
      store
    });
    wrapper.vm.addSpinnerTask();
    expect(manageSpinnerState).toHaveBeenCalled();
  });
  it("return object when createSpinnerTask is called", () => {
    expect.assertions(1);
    const wrapper = createWrapper({ store });
    expect(wrapper.vm.createSpinnerTask(1, "texto")).toStrictEqual({
      id: 1,
      description: "texto"
    });
  });
  it("add object to pendingTasks array when createTask is called", () => {
    expect.assertions(2);
    const wrapper = createWrapper({ methods: { init: jest.fn() }, store });
    expect(wrapper.vm.pendingTasks).toHaveLength(0);
    wrapper.vm.createTask("url", {}, {});
    expect(wrapper.vm.pendingTasks).toHaveLength(1);
  });
  it("call addSpinnerTask when createTask is called", () => {
    expect.assertions(1);
    const addSpinnerTask = jest.fn();
    const wrapper = createWrapper({
      methods: { addSpinnerTask, init: jest.fn() },
      store
    });
    wrapper.vm.createTask("url", {}, {});
    expect(addSpinnerTask).toHaveBeenCalled();
  });
  it("call createTask when addTaskDispatchSensors is called", () => {
    expect.assertions(1);
    const createTask = jest.fn();
    const wrapper = createWrapper({
      methods: { createTask, init: jest.fn() },
      store
    });
    wrapper.vm.addTaskDispatchSensors();
    expect(createTask).toHaveBeenCalled();
  });
  it("call createTask when addTaskGetGlobalStations is called", () => {
    expect.assertions(1);
    const createTask = jest.fn();
    const wrapper = createWrapper({
      methods: { createTask, init: jest.fn() },
      store
    });
    wrapper.vm.addTaskGetGlobalStations();
    expect(createTask).toHaveBeenCalled();
  });
  it("call createTask when addTaskGetStationsByTypes is called", () => {
    expect.assertions(1);
    const createTask = jest.fn();
    const wrapper = createWrapper({
      methods: { createTask, init: jest.fn() },
      store
    });
    wrapper.vm.addTaskGetStationsByTypes();
    expect(createTask).toHaveBeenCalled();
  });
  it("call createTask when addTaskGetGlobalBuoys is called", () => {
    expect.assertions(1);
    const createTask = jest.fn();
    const wrapper = createWrapper({
      methods: { createTask, init: jest.fn() },
      store
    });
    wrapper.vm.addTaskGetGlobalBuoys();
    expect(createTask).toHaveBeenCalled();
  });
  it("call createTask when addTaskGetBuoysByCoords is called", () => {
    expect.assertions(1);
    const createTask = jest.fn();
    const wrapper = createWrapper({
      methods: { createTask, init: jest.fn() },
      store
    });
    wrapper.vm.addTaskGetBuoysByCoords();
    expect(createTask).toHaveBeenCalled();
  });
  it("call createTask when addTaskGetBuoysByTypes is called", () => {
    expect.assertions(1);
    const createTask = jest.fn();
    const wrapper = createWrapper({
      methods: { createTask, init: jest.fn() },
      store
    });
    wrapper.vm.addTaskGetBuoysByTypes();
    expect(createTask).toHaveBeenCalled();
  });
  it("call createTask when addTaskGetBuoysByCoordsAndTypes is called", () => {
    expect.assertions(1);
    const createTask = jest.fn();
    const wrapper = createWrapper({
      methods: { createTask, init: jest.fn() },
      store
    });
    wrapper.vm.addTaskGetBuoysByCoordsAndTypes();
    expect(createTask).toHaveBeenCalled();
  });
  it("call createTask when addTaskGetProductsByCoords is called", () => {
    expect.assertions(1);
    const createTask = jest.fn();
    const wrapper = createWrapper({
      methods: { createTask, init: jest.fn() },
      store
    });
    wrapper.vm.addTaskGetProductsByCoords();
    expect(createTask).toHaveBeenCalled();
  });
  it("call createTask when addTaskGetGlobalProducts is called", () => {
    expect.assertions(1);
    const createTask = jest.fn();
    const wrapper = createWrapper({
      methods: { createTask, init: jest.fn() },
      store
    });
    wrapper.vm.addTaskGetGlobalProducts();
    expect(createTask).toHaveBeenCalled();
  });
  it("call createTask when addTaskGetProductsByTypes is called", () => {
    expect.assertions(1);
    const createTask = jest.fn();
    const wrapper = createWrapper({
      methods: { createTask, init: jest.fn() },
      store
    });
    wrapper.vm.addTaskGetProductsByTypes();
    expect(createTask).toHaveBeenCalled();
  });
  it("call createTask when addTaskGetProductsByCoordsAndTypes is called", () => {
    expect.assertions(1);
    const createTask = jest.fn();
    const wrapper = createWrapper({
      methods: { createTask, init: jest.fn() },
      store
    });
    wrapper.vm.addTaskGetProductsByCoordsAndTypes();
    expect(createTask).toHaveBeenCalled();
  });
  it("call createTask when addTaskClearProducts is called", () => {
    expect.assertions(1);
    const createTask = jest.fn();
    const wrapper = createWrapper({
      methods: { createTask, init: jest.fn() },
      store
    });
    wrapper.vm.addTaskClearProducts();
    expect(createTask).toHaveBeenCalled();
  });

  it("call addTaskClearProducts when fetchProducts is called", () => {
    expect.assertions(1);
    const addTaskClearProducts = jest.fn();
    const wrapper = createWrapper({
      methods: { addTaskClearProducts, init: jest.fn() },
      store
    });
    wrapper.vm.fetchProducts();
    expect(addTaskClearProducts).toHaveBeenCalled();
  });
  it("call fetchProductsCase when fetchProducts is called and allowProducts is true", () => {
    expect.assertions(1);
    const fetchProductsCase = jest.fn();
    const wrapper = createWrapper({
      methods: { fetchProductsCase, init: jest.fn() },
      store
    });
    wrapper.vm.fetchProducts();
    expect(fetchProductsCase).toHaveBeenCalled();
  });
  it("call fetchStationsCase when fetchSensors is called and allowStations is true", () => {
    expect.assertions(1);
    const fetchStationsCase = jest.fn();
    const wrapper = createWrapper({
      methods: { fetchStationsCase, init: jest.fn() },
      store
    });
    wrapper.vm.fetchSensors();
    expect(fetchStationsCase).toHaveBeenCalled();
  });
  it("call fetchBuoysCase when fetchSensors is called and allowBuoys is true", () => {
    expect.assertions(1);
    const fetchBuoysCase = jest.fn();
    const wrapper = createWrapper({
      methods: { fetchBuoysCase, init: jest.fn() },
      store
    });
    wrapper.vm.fetchSensors();
    expect(fetchBuoysCase).toHaveBeenCalled();
  });
  it("call addTaskDispatchSensors when fetchSensors is called", () => {
    expect.assertions(1);
    const addTaskDispatchSensors = jest.fn();
    const wrapper = createWrapper({
      methods: { addTaskDispatchSensors, init: jest.fn() },
      store
    });
    wrapper.vm.fetchSensors();
    expect(addTaskDispatchSensors).toHaveBeenCalled();
  });
  it("call addTaskGetGlobalProducts when fetchProductsCase is called, global is defined in coords and onlySpatial is true", async () => {
    expect.assertions(1);
    const addTaskGetGlobalProducts = jest.fn();
    store = new Vuex.Store({
      modules: {
        filters: {
          state: {
            allowProducts: true,
            onlySpatial: true
          }
        },
        coords: {
          state: {
            searchCoords: { global: true }
          }
        },
        datahub: {
          state: {
            productMoments: [
              { object: true },
              { object: true },
              { object: true }
            ]
          }
        }
      }
    });
    const wrapper = createWrapper({
      methods: {
        addTaskGetGlobalProducts,
        init: jest.fn()
      },
      store
    });
    wrapper.vm.fetchProductsCase();
    expect(addTaskGetGlobalProducts).toHaveBeenCalled();
  });
  it("call addTaskGetProductsByCoords when fetchProductsCase is called, global isnt defined in coords and onlySpatial is true", async () => {
    expect.assertions(1);
    const addTaskGetProductsByCoords = jest.fn();
    store = new Vuex.Store({
      modules: {
        filters: {
          state: {
            allowProducts: true,
            onlySpatial: true
          }
        },
        coords: {
          state: {
            searchCoords: {}
          }
        },
        datahub: {
          state: {
            productMoments: [
              { object: true },
              { object: true },
              { object: true }
            ]
          }
        }
      }
    });
    const wrapper = createWrapper({
      methods: {
        addTaskGetProductsByCoords,
        init: jest.fn()
      },
      store
    });
    wrapper.vm.fetchProductsCase();
    expect(addTaskGetProductsByCoords).toHaveBeenCalled();
  });
  it("call addTaskGetProductsByTypes when fetchProductsCase is called, global is defined in coords and onlySpatial is false", async () => {
    expect.assertions(1);
    const addTaskGetProductsByTypes = jest.fn();
    store = new Vuex.Store({
      modules: {
        filters: {
          state: {
            allowProducts: true,
            onlySpatial: false
          }
        },
        coords: {
          state: {
            searchCoords: { global: true }
          }
        },
        datahub: {
          state: {
            productMoments: [
              { object: true },
              { object: true },
              { object: true }
            ]
          }
        }
      }
    });
    const wrapper = createWrapper({
      methods: {
        addTaskGetProductsByTypes,
        init: jest.fn()
      },
      store
    });
    wrapper.vm.fetchProductsCase();
    expect(addTaskGetProductsByTypes).toHaveBeenCalled();
  });
  it("call addTaskGetProductsByCoordsAndTypes when fetchProductsCase is called, global isnt defined in coords and onlySpatial is false", async () => {
    expect.assertions(1);
    const addTaskGetProductsByCoordsAndTypes = jest.fn();
    const wrapper = createWrapper({
      methods: {
        addTaskGetProductsByCoordsAndTypes,
        init: jest.fn()
      },
      store
    });
    wrapper.vm.fetchProductsCase();
    debugger;
    expect(addTaskGetProductsByCoordsAndTypes).toHaveBeenCalled();
  });
  it("call addTaskGetGlobalBuoys when fetchBuoysCase is called, global is defined in coords and onlySpatial is true", async () => {
    expect.assertions(1);
    const addTaskGetGlobalBuoys = jest.fn();
    store = new Vuex.Store({
      modules: {
        filters: {
          state: {
            allowProducts: true,
            onlySpatial: true,
            allowBuoys: true,
            allowStations: true,
            buoyTypeFilter: { id: 1 },
            stationTypeFilter: { code: 1 }
          }
        },
        coords: {
          state: {
            searchCoords: { global: true }
          }
        },
        datahub: {
          state: {
            productMoments: [
              { object: true },
              { object: true },
              { object: true }
            ]
          }
        }
      }
    });
    const wrapper = createWrapper({
      methods: {
        addTaskGetGlobalBuoys,
        init: jest.fn()
      },
      store
    });
    wrapper.vm.fetchBuoysCase();
    expect(addTaskGetGlobalBuoys).toHaveBeenCalled();
  });
  it("call addTaskGetBuoysByCoords when fetchBuoysCase is called, global isnt defined in coords and onlySpatial is true", async () => {
    expect.assertions(1);
    const addTaskGetBuoysByCoords = jest.fn();
    store = new Vuex.Store({
      modules: {
        filters: {
          state: {
            allowProducts: true,
            onlySpatial: true,
            allowBuoys: true,
            allowStations: true,
            buoyTypeFilter: { id: 1 },
            stationTypeFilter: { code: 1 }
          }
        },
        coords: {
          state: {
            searchCoords: true
          }
        },
        datahub: {
          state: {
            productMoments: [
              { object: true },
              { object: true },
              { object: true }
            ]
          }
        }
      }
    });
    const wrapper = createWrapper({
      methods: {
        addTaskGetBuoysByCoords,
        init: jest.fn()
      },
      store
    });
    wrapper.vm.fetchBuoysCase();
    expect(addTaskGetBuoysByCoords).toHaveBeenCalled();
  });
  it("call addTaskGetBuoysByTypes when fetchBuoysCase is called, global is defined in coords and onlySpatial is false", async () => {
    expect.assertions(1);
    const addTaskGetBuoysByTypes = jest.fn();
    store = new Vuex.Store({
      modules: {
        filters: {
          state: {
            allowProducts: true,
            onlySpatial: false,
            allowBuoys: true,
            allowStations: true,
            buoyTypeFilter: { id: 1 },
            stationTypeFilter: { code: 1 }
          }
        },
        coords: {
          state: {
            searchCoords: { global: true }
          }
        },
        datahub: {
          state: {
            productMoments: [
              { object: true },
              { object: true },
              { object: true }
            ]
          }
        }
      }
    });
    const wrapper = createWrapper({
      methods: {
        addTaskGetBuoysByTypes,
        init: jest.fn()
      },
      store
    });
    wrapper.vm.fetchBuoysCase();
    expect(addTaskGetBuoysByTypes).toHaveBeenCalled();
  });
  it("call addTaskGetBuoysByCoordsAndTypes when fetchBuoysCase is called, global isnt defined in coords and onlySpatial is false", async () => {
    expect.assertions(1);
    const addTaskGetBuoysByCoordsAndTypes = jest.fn();
    store = new Vuex.Store({
      modules: {
        filters: {
          state: {
            allowProducts: true,
            onlySpatial: false,
            allowBuoys: true,
            allowStations: true,
            buoyTypeFilter: { id: 1 },
            stationTypeFilter: { code: 1 }
          }
        },
        coords: {
          state: {
            searchCoords: true
          }
        },
        datahub: {
          state: {
            productMoments: [
              { object: true },
              { object: true },
              { object: true }
            ]
          }
        }
      }
    });
    const wrapper = createWrapper({
      methods: {
        addTaskGetBuoysByCoordsAndTypes,
        init: jest.fn()
      },
      store
    });
    wrapper.vm.fetchBuoysCase();
    expect(addTaskGetBuoysByCoordsAndTypes).toHaveBeenCalled();
  });
  it("call addTaskGetGlobalStations when fetchStationsCase is called and onlySpatial is true", async () => {
    expect.assertions(1);
    const addTaskGetGlobalStations = jest.fn();
    store = new Vuex.Store({
      modules: {
        filters: {
          state: {
            allowProducts: true,
            onlySpatial: true,
            allowBuoys: true,
            allowStations: true,
            buoyTypeFilter: { id: 1 },
            stationTypeFilter: { code: 1 }
          }
        },
        coords: {
          state: {
            searchCoords: { global: true }
          }
        },
        datahub: {
          state: {
            productMoments: [
              { object: true },
              { object: true },
              { object: true }
            ]
          }
        }
      }
    });
    const wrapper = createWrapper({
      methods: {
        addTaskGetGlobalStations,
        init: jest.fn()
      },
      store
    });
    wrapper.vm.fetchStationsCase();
    expect(addTaskGetGlobalStations).toHaveBeenCalled();
  });
  it("call addTaskGetStationsByTypes when fetchStationsCase is called and onlySpatial is false", async () => {
    expect.assertions(1);
    const addTaskGetStationsByTypes = jest.fn();
    store = new Vuex.Store({
      modules: {
        filters: {
          state: {
            allowProducts: true,
            onlySpatial: false,
            allowBuoys: true,
            allowStations: true,
            buoyTypeFilter: { id: 1 },
            stationTypeFilter: { code: 1 }
          }
        },
        coords: {
          state: {
            searchCoords: { global: true }
          }
        },
        datahub: {
          state: {
            productMoments: [
              { object: true },
              { object: true },
              { object: true }
            ]
          }
        }
      }
    });
    const wrapper = createWrapper({
      methods: {
        addTaskGetStationsByTypes,
        init: jest.fn()
      },
      store
    });
    wrapper.vm.fetchStationsCase();
    expect(addTaskGetStationsByTypes).toHaveBeenCalled();
  });
  it("call addTaskClearSensors when fetchSensors is called", () => {
    expect.assertions(1);
    const addTaskClearSensors = jest.fn();
    const wrapper = createWrapper({
      methods: { addTaskClearSensors, init: jest.fn() },
      store
    });
    wrapper.vm.fetchSensors();
    expect(addTaskClearSensors).toHaveBeenCalled();
  });
  it("call createTask one time for each object productMoment in the array productMoments when fetchProductVariableTypes is called", async () => {
    expect.assertions(1);
    const createTask = jest.fn();
    const wrapper = createWrapper({
      methods: { createTask, init: jest.fn() },
      store
    });
    wrapper.vm.fetchProductVariableTypes();
    expect(createTask).toHaveBeenCalledTimes(3);
  });
  it("call createTask when fetchProductMomentsData is called", async () => {
    expect.assertions(1);
    const createTask = jest.fn();
    const wrapper = createWrapper({
      methods: { createTask, init: jest.fn() },
      store
    });
    wrapper.vm.fetchProductMomentsData();
    expect(createTask).toHaveBeenCalled();
  });
  it("call createTask when fetchStationTypesData is called", async () => {
    expect.assertions(1);
    const createTask = jest.fn();
    const wrapper = createWrapper({
      methods: { createTask, init: jest.fn() },
      store
    });
    wrapper.vm.fetchStationTypesData();
    expect(createTask).toHaveBeenCalled();
  });
  it("call createTask when fetchBuoyTypesData is called", async () => {
    expect.assertions(1);
    const createTask = jest.fn();
    const wrapper = createWrapper({
      methods: { createTask, init: jest.fn() },
      store
    });
    wrapper.vm.fetchBuoyTypesData();
    expect(createTask).toHaveBeenCalled();
  });
  it("call createTask when fetchSourceData is called", async () => {
    expect.assertions(1);
    const createTask = jest.fn();
    const wrapper = createWrapper({
      methods: { createTask, init: jest.fn() },
      store
    });
    wrapper.vm.fetchSourceData();
    expect(createTask).toHaveBeenCalled();
  });
  it("method manageTasks logic with pendingTask isn't empty without dataless", async () => {
    expect.assertions(4);
    const wrapper = createWrapper({ methods: { init: jest.fn() }, store });
    wrapper.setData({
      pendingTasks: [
        {
          request: "request",
          operation: "operation",
          spinnerTask: "spinnerTask"
        },
        {
          request: "request2",
          operation: "operation2",
          spinnerTask: "spinnerTask2"
        }
      ]
    });
    wrapper.vm.manageTasks();
    expect(wrapper.vm.request).toBe("request");
    expect(wrapper.vm.operation).toBe("operation");
    expect(wrapper.vm.currentSpinnerTask).toBe("spinnerTask");
    expect(wrapper.vm.dataReady).toBe(false);
  });
  it("method manageTasks logic with pendingTask isn't empty with dataless", async () => {
    expect.assertions(4);
    const wrapper = createWrapper({
      methods: {
        init: jest.fn()
      },
      store
    });
    wrapper.setData({
      pendingTasks: [
        {
          request: "request",
          operation: { text: "operation", dataless: true },
          spinnerTask: "spinnerTask"
        },
        {
          request: "request2",
          operation: "operation2",
          spinnerTask: "spinnerTask2"
        }
      ]
    });
    wrapper.vm.manageTasks();
    expect(wrapper.vm.request).toBe("request");
    expect(wrapper.vm.operation).toStrictEqual({
      text: "operation",
      dataless: true
    });
    expect(wrapper.vm.currentSpinnerTask).toBe("spinnerTask");
    expect(wrapper.vm.dataReady).toBe(true);
  });
  it("method manageTasks logic with pendingTask is empty", async () => {
    expect.assertions(3);
    const wrapper = createWrapper({
      methods: {
        init: jest.fn()
      },
      store
    });
    wrapper.setData({
      pendingTasks: []
    });
    wrapper.vm.manageTasks();
    expect(wrapper.vm.request).toBeNull();
    expect(wrapper.vm.operation).toBeNull();
    expect(wrapper.vm.dataReady).toBe(true);
  });
  it("method manageSpinnerState logic", async () => {
    expect.assertions(4);
    const wrapper = createWrapper({
      methods: {
        init: jest.fn()
      },
      store
    });
    wrapper.setData({
      pendingTasks: []
    });
    wrapper.vm.manageSpinnerState(true);
    expect(wrapper.vm.$spinner.show).toHaveBeenCalled();
    expect(wrapper.vm.$spinner.hide).not.toHaveBeenCalled();
    wrapper.vm.manageSpinnerState(false);
    expect(wrapper.vm.$spinner.show).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.$spinner.hide).toHaveBeenCalled();
  });
  it("method operationsController logic", async () => {
    expect.assertions(7);
    const updateSpinnerTask = jest.fn();
    const manageTasks = jest.fn();
    const wrapper = createWrapper({
      methods: { updateSpinnerTask, manageTasks, init: jest.fn() },
      store
    });
    wrapper.setData({
      pendingTasks: [
        {
          request: "request",
          operation: { text: "operation", dataless: true },
          spinnerTask: "spinnerTask"
        },
        {
          request: "request2",
          operation: "operation2",
          spinnerTask: "spinnerTask2"
        }
      ]
    });
    expect(wrapper.vm.pendingTasks).toHaveLength(2);
    wrapper.vm.operationsController();
    expect(wrapper.vm.dataReady).toBe(false);
    expect(wrapper.vm.request).toBeNull();
    expect(wrapper.vm.data).toBeNull();
    expect(wrapper.vm.currentSpinnerTask).toBeNull();
    expect(updateSpinnerTask).toHaveBeenCalled();
    expect(wrapper.vm.pendingTasks).toHaveLength(1);
  });
  it("method errorHandler logic", async () => {
    expect.assertions(1);
    const mockNotification = jest.fn();
    const wrapper = createWrapper({
      methods: {
        init: jest.fn(),
        $_showNotificationOnce: mockNotification
      },
      store
    });
    wrapper.setData({
      currentSpinnerTask: {
        id: 1,
        description: "texto"
      }
    });
    wrapper.vm.errorHandler({ err: "error" });
    expect(mockNotification).toHaveBeenCalled();
  });
  it("method pendingState logic", async () => {
    expect.assertions(2);
    const wrapper = createWrapper({
      methods: {
        init: jest.fn()
      },
      store
    });
    expect(wrapper.vm.requestState).toBe(false);
    wrapper.vm.pendingState(true);
    expect(wrapper.vm.requestState).toBe(true);
  });

  it("method requestsController logic", async () => {
    expect.assertions(4);
    const wrapper = createWrapper({
      methods: {
        init: jest.fn()
      },
      store
    });
    expect(wrapper.vm.dataReady).toBe(false);
    expect(wrapper.vm.data).toBeNull();
    wrapper.vm.requestsController(["data", "data1"]);
    expect(wrapper.vm.data).toStrictEqual(["data", "data1"]);
    expect(wrapper.vm.dataReady).toBe(true);
  });
  it("method init logic", async () => {
    expect.assertions(4);
    const fetchSourceData = jest.fn();
    const fetchBuoyTypesData = jest.fn();
    const fetchStationTypesData = jest.fn();
    const fetchProductMomentsData = jest.fn();
    createWrapper({
      methods: {
        fetchSourceData,
        fetchBuoyTypesData,
        fetchStationTypesData,
        fetchProductMomentsData
      },
      store
    });
    expect(fetchSourceData).toHaveBeenCalled();
    expect(fetchBuoyTypesData).toHaveBeenCalled();
    expect(fetchStationTypesData).toHaveBeenCalled();
    expect(fetchProductMomentsData).toHaveBeenCalled();
  });

  it("call pendingTasks on trigger watcher searchCoords", () => {
    expect.assertions(1);
    const manageTasks = jest.fn();
    const wrapper = createWrapper({
      methods: {
        manageTasks
      },
      store
    });
    wrapper.setData({ pendingTasks: [1, 2] });
    expect(manageTasks).toHaveBeenCalledWith();
  });
  it("computed requestComputed updated when request", () => {
    expect.assertions(2);
    const wrapper = createWrapper({
      methods: {
        init: jest.fn()
      },
      store
    });
    expect(wrapper.vm.requestComputed).toBeNull();
    wrapper.setData({ request: true });
    expect(wrapper.vm.requestComputed).toBe(true);
  });
  it("computed requestStateComputed updated when requestState", () => {
    expect.assertions(2);
    const wrapper = createWrapper({
      methods: {
        init: jest.fn()
      },
      store
    });
    expect(wrapper.vm.requestStateComputed).toBe(false);
    wrapper.setData({ requestState: true });
    expect(wrapper.vm.requestStateComputed).toBe(true);
  });
  it("computed operationComputed updated when operation", () => {
    expect.assertions(2);
    const wrapper = createWrapper({
      methods: {
        init: jest.fn()
      },
      store
    });
    expect(wrapper.vm.operationComputed).toBeNull();
    wrapper.setData({ operation: true });
    expect(wrapper.vm.operationComputed).toBe(true);
  });

  //SNAPSHOT TESTS
  it("renders correctly default", () => {
    expect.assertions(1);
    const wrapper = createWrapper({
      methods: {
        init: jest.fn()
      },
      store
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  it("renders correctly async-loader", () => {
    expect.assertions(2);
    const wrapper = createWrapper({
      store,
      methods: {
        init: jest.fn()
      }
    });
    wrapper.setData({ request: {} });
    expect(wrapper.vm.requestComputed).toStrictEqual({});
    expect(wrapper.element).toMatchSnapshot();
  });
  it("renders correctly data-operator", () => {
    expect.assertions(2);
    const wrapper = createWrapper({
      store,
      methods: {
        init: jest.fn()
      }
    });
    wrapper.setData({ operation: {}, dataReady: true });
    expect(wrapper.vm.operationComputed).toStrictEqual({});
    expect(wrapper.element).toMatchSnapshot();
  });
  it("renders correctly async-loader and data-operator", () => {
    expect.assertions(3);
    const wrapper = createWrapper({
      store,
      methods: {
        init: jest.fn()
      }
    });
    wrapper.setData({ request: {}, operation: {}, dataReady: true });
    expect(wrapper.vm.requestComputed).toStrictEqual({});
    expect(wrapper.vm.operationComputed).toStrictEqual({});
    expect(wrapper.element).toMatchSnapshot();
  });
});
