import { shallowMount, createLocalVue } from "@vue/test-utils";
import AppAbout from "../AppAbout.vue";
import merge from "lodash.merge";
import Vuesax from "vuesax";

const localVue = createLocalVue();
localVue.use(Vuesax);

function createWrapper(overrides) {
  const defaultMountingOptions = {
    propsData: { version: process.env.VERSION },
    localVue
  };
  return shallowMount(AppAbout, merge(defaultMountingOptions, overrides));
}

describe("appAbout.vue", () => {
  //SNAPSHOT TESTS
  it("renders correctly", () => {
    expect.assertions(1);
    const wrapper = createWrapper();
    expect(wrapper.element).toMatchSnapshot();
  });
});
