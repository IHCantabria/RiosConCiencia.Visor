import { shallowMount } from "@vue/test-utils";
import BaseSVGDotColor from "../BaseSVGDotColor.vue";
import merge from "lodash.merge";

function createWrapper(overrides) {
  const defaultMountingOptions = {
    propsData: { color: "#456789" }
  };
  return shallowMount(
    BaseSVGDotColor,
    merge(defaultMountingOptions, overrides)
  );
}

describe("baseSVGDotColor.vue", () => {
  //SNAPSHOT TESTS
  it("renders correctly the svg with the default values", () => {
    expect.assertions(1);
    const wrapper = createWrapper({ propsData: {} });
    expect(wrapper.element).toMatchSnapshot();
  });
  it("renders correctly", () => {
    expect.assertions(1);
    const wrapper = createWrapper({
      propsData: {
        size: 15,
        borderRadius: 20
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
