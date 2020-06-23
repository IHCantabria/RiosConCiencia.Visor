import mockAxios from "axios";
import { shallowMount } from "@vue/test-utils";
import AsyncLoader from "../AsyncLoader.js";
import merge from "lodash.merge";
import flushPromises from "flush-promises";

function createWrapper(overrides) {
  const defaultMountingOptions = {
    propsData: {
      url: "fakeURl",
      params: {}
    }
  };
  return shallowMount(AsyncLoader, merge(defaultMountingOptions, overrides));
}

describe("asyncLoader.vue", () => {
  function implementMockAxios() {
    mockAxios.get.mockImplementation(() =>
      Promise.resolve({
        data: { results: ["answer"] }
      })
    );
  }
  beforeAll(() => {
    implementMockAxios();
  });
  //UNIT TESTS
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
  it("call logic after init", () => {
    expect.assertions(2);
    const setDefaultValues = jest.fn();
    const requestData = jest.fn();
    const wrapper = createWrapper({
      methods: {
        requestData,
        setDefaultValues
      }
    });
    wrapper.vm.init();
    expect(setDefaultValues).toHaveBeenCalledWith();
    expect(requestData).toHaveBeenCalledWith();
  });
  it("set default values", () => {
    expect.assertions(2);
    const wrapper = createWrapper();
    wrapper.vm.setDefaultValues();
    expect(wrapper.vm.error).toBe(false);
    expect(wrapper.vm.data).toBeNull();
  });
  it("request data on trigger watcher url", () => {
    expect.assertions(2);
    const requestData = jest.fn();
    const wrapper = createWrapper({
      methods: {
        requestData
      }
    });
    wrapper.setProps({ url: "change" });
    expect(wrapper.props().url).toBe("change");
    expect(requestData).toHaveBeenCalledWith();
  });
  it("request data on trigger watcher params", () => {
    expect.assertions(2);
    const requestData = jest.fn();
    const wrapper = createWrapper({
      methods: {
        requestData
      }
    });
    wrapper.setProps({ params: { test: "test" } });
    expect(wrapper.props().params).toStrictEqual({ test: "test" });
    expect(requestData).toHaveBeenCalledWith();
  });
  it("pending is true before finish request", async () => {
    expect.assertions(1);
    const wrapper = createWrapper({});
    wrapper.vm.requestData();
    expect(wrapper.vm.pending).toBe(true);
  });
  it("pending is false after finish request", async () => {
    expect.assertions(2);
    const wrapper = createWrapper({});
    wrapper.vm.requestData();
    expect(wrapper.vm.pending).toBe(true);
    await flushPromises();
    expect(wrapper.vm.pending).toBe(false);
  });
  it("error is false after finish request", async () => {
    expect.assertions(1);
    const wrapper = createWrapper({});
    wrapper.vm.requestData();
    await flushPromises();
    expect(wrapper.vm.error).toBe(false);
  });
  it("error is defined if request fall", async () => {
    expect.assertions(2);
    const wrapper = createWrapper({});
    wrapper.vm.requestData();
    expect(wrapper.vm.error).toBe(false);
    await flushPromises();
    wrapper.vm.error = { error: "test error" };
    expect(wrapper.vm.error).toStrictEqual({ error: "test error" });
  });
  it("data is defined after request", async () => {
    expect.assertions(1);
    const wrapper = createWrapper({});
    wrapper.vm.requestData();
    await flushPromises();
    expect(wrapper.vm.data).toStrictEqual({ results: ["answer"] });
  });
  it("emit event requestFinished after finish requestData", async () => {
    expect.assertions(1);
    const init = jest.fn();
    const wrapper = createWrapper({
      methods: {
        init
      }
    });
    wrapper.vm.requestData();
    await flushPromises();
    expect(wrapper.emitted().requestFinished).toStrictEqual(
      [
        [
          {
            results: ["answer"]
          }
        ]
      ],
      [
        [
          {
            results: ["answer"]
          }
        ]
      ]
    );
  });
  it("emit event stateRequest after finish requestData", async () => {
    expect.assertions(2);
    const wrapper = createWrapper({});
    wrapper.vm.requestData();
    expect(wrapper.emitted().stateRequest).toStrictEqual([[true]]);
    await flushPromises();
    expect(wrapper.emitted().stateRequest).toStrictEqual([[true], [false]]);
  });
  it("emit event stateRequest before finish requestData", async () => {
    expect.assertions(1);
    const wrapper = createWrapper({});
    wrapper.vm.requestData();
    expect(wrapper.emitted().stateRequest).toStrictEqual([[true]]);
  });
  it("emit event stateRequest when pending change", () => {
    expect.assertions(1);
    const wrapper = createWrapper({});
    wrapper.vm.pending = true;
    expect(wrapper.emitted().stateRequest).toStrictEqual([[true]]);
  });
});
