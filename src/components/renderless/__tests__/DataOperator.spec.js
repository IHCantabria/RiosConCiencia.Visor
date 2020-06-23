import { shallowMount, createLocalVue } from "@vue/test-utils";
import DataOperator from "../DataOperator.js";
import merge from "lodash.merge";
import Vuex from "vuex";

const localVue = createLocalVue();

localVue.use(Vuex);

function createWrapper(overrides) {
  const actions = {
    "datahub/A_FETCH_DATAHUB_SOURCES": jest.fn()
  };
  const store = new Vuex.Store({
    actions
  });
  const defaultMountingOptions = {
    propsData: {
      data: [],
      processLogic: () => {},
      dispatcher: "datahub/A_FETCH_DATAHUB_SOURCES"
    },
    localVue,
    store
  };
  return shallowMount(DataOperator, merge(defaultMountingOptions, overrides));
}

describe("dataOperator.vue", () => {
  //UNIT TESTS
  const actions = {
    "datahub/A_FETCH_DATAHUB_SOURCES": jest.fn()
  };
  const store = new Vuex.Store({
    actions
  });
  it("call init on load", () => {
    expect.assertions(1);
    const init = jest.fn();
    createWrapper({
      methods: {
        init
      }
    });
    expect(init).toHaveBeenCalledWith();
  });
  it("call callDispatcher on load if data is null", () => {
    expect.assertions(1);
    const callDispatcher = jest.fn();
    const wrapper = createWrapper({
      propsData: {
        data: null
      },
      methods: {
        callDispatcher
      }
    });
    wrapper.vm.init();
    expect(callDispatcher).toHaveBeenCalledWith();
  });
  it("call prepareData on load if data is not null", () => {
    expect.assertions(1);
    const prepareData = jest.fn();
    createWrapper({
      propsData: {
        data: ["data exist"]
      },
      methods: {
        prepareData
      }
    });
    expect(prepareData).toHaveBeenCalledWith();
  });
  it("call init on trigger watcher data", () => {
    expect.assertions(2);
    const init = jest.fn();
    const wrapper = createWrapper({
      methods: {
        init
      }
    });
    wrapper.setProps({ data: ["cambio"] });
    expect(wrapper.props().data).toStrictEqual(["cambio"]);
    expect(init).toHaveBeenCalledWith();
  });
  it("call init on trigger watcher processLogic", () => {
    expect.assertions(2);
    const init = jest.fn();
    const wrapper = createWrapper({
      methods: {
        init
      }
    });
    const processLogicDummy = () => {
      return "new Function";
    };
    wrapper.setProps({
      processLogic: processLogicDummy()
    });
    expect(wrapper.props().processLogic).toBe("new Function");
    expect(init).toHaveBeenCalledWith();
  });
  it("call init on trigger watcher dispatcher", () => {
    expect.assertions(2);
    const init = jest.fn();
    const wrapper = createWrapper({
      methods: {
        init
      }
    });
    wrapper.setProps({ dispatcher: "dispatcher/false" });
    expect(wrapper.props().dispatcher).toBe("dispatcher/false");
    expect(init).toHaveBeenCalledWith();
  });
  it("emit event operationFinished after finish prepareData", () => {
    expect.assertions(1);
    const init = jest.fn();
    const wrapper = createWrapper({
      methods: {
        init
      }
    });
    wrapper.vm.prepareData();
    expect(wrapper.emitted().operationFinished).toStrictEqual([[]]);
  });
  it("prepareData call dispatcher Store", () => {
    expect.assertions(1);
    const init = jest.fn();
    const wrapper = createWrapper({
      methods: {
        init
      },
      store
    });
    wrapper.vm.prepareData();
    expect(actions["datahub/A_FETCH_DATAHUB_SOURCES"]).toHaveBeenCalled();
  });
  it("callDispatcher call dispatcher Store", () => {
    expect.assertions(1);
    const init = jest.fn();
    const wrapper = createWrapper({
      methods: {
        init
      }
    });
    wrapper.vm.callDispatcher();
    expect(actions["datahub/A_FETCH_DATAHUB_SOURCES"]).toHaveBeenCalled();
  });
  it("emit event operationFinished after finish callDispatcher", () => {
    expect.assertions(1);
    const init = jest.fn();
    const wrapper = createWrapper({
      methods: {
        init
      }
    });
    wrapper.vm.callDispatcher();
    expect(wrapper.emitted().operationFinished).toStrictEqual([[]]);
  });
  it("execute processLogic inside prepareData if processLogic is defined", () => {
    expect.assertions(1);
    const init = jest.fn();
    const processLogicDummy = dataSet => {
      return dataSet.map(data => {
        return `${data} & new Data`;
      });
    };
    const wrapper = createWrapper({
      propsData: {
        data: ["event data", "event data"],
        processLogic: processLogicDummy,
        dispatcher: null
      },
      methods: {
        init
      }
    });
    wrapper.vm.prepareData();
    expect(wrapper.emitted().dataProcessed).toStrictEqual([
      [[`event data & new Data`, `event data & new Data`]]
    ]);
  });
  it("dont transform data inside prepareData if processLogic is null", () => {
    expect.assertions(1);
    const init = jest.fn();
    const wrapper = createWrapper({
      propsData: {
        data: ["event data", "event data"],
        processLogic: null,
        dispatcher: null
      },
      methods: {
        init
      }
    });
    wrapper.vm.prepareData();
    expect(wrapper.emitted().dataProcessed).toStrictEqual([
      [["event data", "event data"]]
    ]);
  });
  it("emit event dataProcessed with the data when finish prepareData if the dispatcher is null", () => {
    expect.assertions(1);
    const init = jest.fn();
    const wrapper = createWrapper({
      propsData: {
        data: [" event data"],
        processLogic: null,
        dispatcher: null
      },
      methods: {
        init
      }
    });
    wrapper.vm.prepareData();
    expect(wrapper.emitted().dataProcessed).toStrictEqual([[[" event data"]]]);
  });
  it("prepareData call Operate", () => {
    expect.assertions(1);
    const Operate = jest.fn();
    createWrapper({
      propsData: {
        data: ["data exist"]
      },
      methods: {
        Operate
      }
    });
    expect(Operate).toHaveBeenCalledWith();
  });
});
