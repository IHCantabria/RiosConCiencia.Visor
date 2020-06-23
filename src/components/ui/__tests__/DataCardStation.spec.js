import { shallowMount, createLocalVue } from "@vue/test-utils";
import DataCardStation from "../DataCardStation.vue";
import Vuesax from "vuesax";
import merge from "lodash.merge";

const localVue = createLocalVue();
localVue.use(Vuesax);

function createWrapper(overrides) {
  const defaultMountingOptions = { localVue };
  return shallowMount(
    DataCardStation,
    merge(defaultMountingOptions, overrides)
  );
}

describe("dataCardStation.vue", () => {
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
        height: 40,
        proyectName: "proyect test 1",
        location: "location test 1",
        variables: [
          {
            code: 1,
            name: "name test 1",
            description: "description test 1",
            units: "m"
          },
          {
            code: 2,
            name: "name test 2",
            description: "description test 2",
            units: "s"
          }
        ]
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
