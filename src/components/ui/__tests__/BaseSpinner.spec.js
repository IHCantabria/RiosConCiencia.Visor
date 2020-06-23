import { mount, createLocalVue } from "@vue/test-utils";
import BaseSpinner from "../BaseSpinner.vue";
import Vuesax from "vuesax";
import merge from "lodash.merge";

const localVue = createLocalVue();
localVue.use(Vuesax);

function createWrapper(overrides) {
  const defaultMountingOptions = {
    stubs: ["sweet-modal", "circle-loader", "vs-table"],
    localVue
  };
  return mount(BaseSpinner, merge(defaultMountingOptions, overrides));
}

describe("baseSpinner.vue", () => {
  //UNIT TESTS
  it("mlActive watcher", async () => {
    expect.assertions(1);
    const wrapper = createWrapper({});
    const mockWatcher = jest.fn();
    wrapper.vm.$options.watch.mlActive = mockWatcher;
    wrapper.setData({ mlActive: true });
    expect(wrapper.vm.mlActive).toBe(true);
  });
  it("show spinner when show is called", () => {
    expect.assertions(3);
    const wrapper = createWrapper();
    const mockWatcher = jest.fn();
    wrapper.vm.$options.watch.mlActive = mockWatcher;
    const mockShow = jest.fn(wrapper.setData({ calls: 1, mlActive: true }));
    wrapper.vm.show = mockShow;
    wrapper.vm.show();
    expect(mockShow).toHaveBeenCalled();
    expect(wrapper.vm.calls).toBe(1);
    expect(wrapper.find(".app-style").isVisible()).toBe(true);
  });
  it("hide spinner when hide is called", () => {
    expect.assertions(2);
    const wrapper = createWrapper();
    const mockWatcher = jest.fn();
    wrapper.vm.$options.watch.mlActive = mockWatcher;
    const mockHide = jest.fn(wrapper.setData({ calls: 0, mlActive: false }));
    wrapper.vm.hide = mockHide;
    wrapper.vm.hide();
    expect(mockHide).toHaveBeenCalled();
    expect(wrapper.vm.calls).toBe(0);
  });
  it("call _clearTasks when hide is called and calls is 0", () => {
    expect.assertions(2);
    const _clearTasks = jest.fn();
    const wrapper = createWrapper({ methods: { _clearTasks } });
    const mockWatcher = jest.fn();
    wrapper.vm.$options.watch.mlActive = mockWatcher;
    wrapper.setData({ calls: 0, mlActive: false });
    wrapper.vm.calls = 1;
    wrapper.vm.hide();
    expect(wrapper.vm.calls).toBe(0);
    expect(_clearTasks).toHaveBeenCalled();
  });
  it("delete tasks when _clearTasks is called", () => {
    expect.assertions(2);
    const wrapper = createWrapper();
    wrapper.vm.mlTasksConfig.tasks = ["task1", "task2"];
    expect(wrapper.vm.mlTasksConfig.tasks).toHaveLength(2);
    wrapper.vm._clearTasks();
    expect(wrapper.vm.mlTasksConfig.tasks).toHaveLength(0);
  });
  it("add task", () => {
    expect.assertions(1);
    const wrapper = createWrapper();
    wrapper.vm.addTask(
      "indexesNowcast",
      "Calculando Indices. Por favor, espere..."
    );
    expect(wrapper.vm.mlTasksConfig.tasks).toHaveLength(1);
  });
  it("update task", () => {
    expect.assertions(2);
    const wrapper = createWrapper();
    wrapper.vm.updateTask(
      "indexesNowcast",
      wrapper.vm.spinnerEnums.statusTask.completed,
      "Cambio"
    );
    const task = wrapper.vm.mlTasksConfig.tasks[0];
    expect(task.status).toBe(wrapper.vm.spinnerEnums.statusTask.completed);
    expect(task.text).toBe("Cambio");
  });
  it("configure mode", () => {
    expect.assertions(2);
    const wrapper = createWrapper();
    expect(wrapper.vm.spinnerConfig.mode).toBe(1);
    wrapper.vm.configureModeSpinner(2);
    expect(wrapper.vm.spinnerConfig.mode).toBe(2);
  });
  it("return text Display _taskManagerDisplay", () => {
    expect.assertions(1);
    const wrapper = createWrapper();
    wrapper.vm.mlTasksConfig.tasks = [
      { text: "test", status: 1 },
      { text: "test2", status: 3 }
    ];
    expect(wrapper.vm._taskManagerDisplay()).toBe("test");
  });
  //SNAPSHOT TESTS
  it("renders correctly in basic mode", () => {
    expect.assertions(1);
    const wrapper = createWrapper();
    expect(wrapper.element).toMatchSnapshot();
  });
  it("renders correctly in progress mode", () => {
    expect.assertions(1);
    const wrapper = createWrapper();
    wrapper.vm.configureModeSpinner(2);
    expect(wrapper.element).toMatchSnapshot();
  });
  it("renders correctly in subTasks mode", () => {
    expect.assertions(1);
    const wrapper = createWrapper();
    wrapper.vm.configureModeSpinner(3);
    wrapper.vm.addTask(
      "clima",
      "Cargando datos de clima atmosférico. Por favor, espere..."
    );
    expect(wrapper.element).toMatchSnapshot();
  });
});
