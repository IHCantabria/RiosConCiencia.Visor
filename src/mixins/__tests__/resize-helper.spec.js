import { shallowMount } from "@vue/test-utils";
import { resizeHelperMixin } from "../resize-helper";
import merge from "lodash.merge";

const Component = {
  render() {},
  title: "dummy title",
  mixins: [resizeHelperMixin],
  data() {
    return {
      productsExpanded: false,
      sensorsExpanded: false,
      windowHeight: 0,
      windowWidth: 0
    };
  }
};

function createWrapper(overrides) {
  const defaultMountingOptions = {
    propsData: {}
  };
  return shallowMount(Component, merge(defaultMountingOptions, overrides));
}
describe("resize-helper Mixin", () => {
  //UNIT TESTS
  it("method setEventResize", () => {
    expect.assertions(2);
    const wrapper = createWrapper();
    wrapper.vm.setEventResize();
    expect(wrapper.vm.windowHeight).toBe(768);
    expect(wrapper.vm.windowWidth).toBe(1024);
  });
  it("computedTableMaxItemsSensors testing return", () => {
    expect.assertions(2);
    const wrapper = createWrapper();
    expect(wrapper.vm.computedTableMaxItemsSensors).toBe(15);
    wrapper.setData({ sensorsExpanded: true });
    expect(wrapper.vm.computedTableMaxItemsSensors).toBe(45);
  });
  it("computedTableMaxItemsProducts testing return", () => {
    expect.assertions(2);
    const wrapper = createWrapper();
    expect(wrapper.vm.computedTableMaxItemsProducts).toBe(15);
    wrapper.setData({ productsExpanded: true });
    expect(wrapper.vm.computedTableMaxItemsProducts).toBe(45);
  });
  it("computedSelectWidth testing return", () => {
    expect.assertions(1);
    const wrapper = createWrapper();
    expect(wrapper.vm.computedSelectWidth).toBe("0px");
  });
  it("computedTableMaxHeightSensors testing return", () => {
    expect.assertions(2);
    const wrapper = createWrapper();
    expect(wrapper.vm.computedTableMaxHeightSensors).toBe("-120px");
    wrapper.setData({ sensorsExpanded: false });
    expect(wrapper.vm.computedTableMaxHeightSensors).toBe("-120px");
  });
  it("computedTableMaxHeightProducts testing return", () => {
    expect.assertions(2);
    const wrapper = createWrapper();
    expect(wrapper.vm.computedTableMaxHeightProducts).toBe("-120px");
    wrapper.setData({ productsExpanded: false });
    expect(wrapper.vm.computedTableMaxHeightProducts).toBe("-120px");
  });
});
