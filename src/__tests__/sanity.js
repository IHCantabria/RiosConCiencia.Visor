import { shallowMount } from "@vue/test-utils";
import merge from "lodash.merge";

const Component = {
  render() {},
  title: "dummy title"
};
function createWrapper(overrides) {
  const defaultMountingOptions = {
    propsData: {}
  };
  return shallowMount(Component, merge(defaultMountingOptions, overrides));
}

describe("sanity test", () => {
  //UNIT TESTS
  it("unit", () => {
    expect.assertions(2);
    const wrapper = createWrapper();
    expect(2).toBe(2);
    expect(wrapper).toBeDefined();
  });
  //SNAPSHOT TESTS
  it("renders correctly", () => {
    expect.assertions(1);
    const wrapper = createWrapper();
    expect(wrapper.element).toMatchSnapshot();
  });
});
