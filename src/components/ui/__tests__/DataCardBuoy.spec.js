import { shallowMount, createLocalVue } from "@vue/test-utils";
import DataCardBuoy from "../DataCardBuoy.vue";
import Vuesax from "vuesax";
import merge from "lodash.merge";

const localVue = createLocalVue();
localVue.use(Vuesax);

function createWrapper(overrides) {
  const defaultMountingOptions = { localVue };
  return shallowMount(DataCardBuoy, merge(defaultMountingOptions, overrides));
}

describe("dataCardBuoy.vue", () => {
  //SNAPSHOT TESTS
  it("renders correctly default values", () => {
    expect.assertions(1);
    const wrapper = createWrapper();
    expect(wrapper.element).toMatchSnapshot();
  });
  it("renders correctly with full info", () => {
    expect.assertions(1);
    const wrapper = createWrapper({
      propsData: {
        openLicense: true,
        licenseType: "open",
        longitude: 10,
        latitude: 30,
        variables: [
          {
            id: 1,
            name: "name test 1",
            type: "type test 1",
            units: "m",
            minimum: 14,
            maximum: 56
          },
          {
            id: 2,
            name: "name test 2",
            type: "type test 2",
            units: "s",
            minimum: 45,
            maximum: 156
          }
        ]
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
