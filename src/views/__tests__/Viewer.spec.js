import { shallowMount } from "@vue/test-utils";
import Viewer from "../Viewer.vue";
import merge from "lodash.merge";

function createWrapper(overrides) {
  const defaultMountingOptions = {};
  return shallowMount(Viewer, merge(defaultMountingOptions, overrides));
}

describe("viewer.vue", () => {
  //SNAPSHOT TESTS
  it("renders correctly", () => {
    expect.assertions(1);
    const wrapper = createWrapper();
    expect(wrapper.element).toMatchSnapshot();
  });
});
