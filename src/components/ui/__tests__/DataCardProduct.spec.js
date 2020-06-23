import { shallowMount, createLocalVue } from "@vue/test-utils";
import DataCardProduct from "../DataCardProduct.vue";
import Vuesax from "vuesax";
import merge from "lodash.merge";

const localVue = createLocalVue();
localVue.use(Vuesax);

function createWrapper(overrides) {
  const defaultMountingOptions = { localVue };
  return shallowMount(
    DataCardProduct,
    merge(defaultMountingOptions, overrides)
  );
}

describe("dataCardProduct.vue", () => {
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
        catalogUrl: "url test",
        typeProduct: "type test",
        sourceName: "source test",
        sourceType: "source type test",
        sourceUrl: "url source test",
        variables: [
          {
            id: 1,
            longName: "long name test 1",
            shortName: "short name test 1",
            alias: "alias test 1",
            units: "m"
          },
          {
            id: 2,
            longName: "long name test 2",
            shortName: "short name test 2",
            alias: "alias test 2",
            units: "s"
          }
        ]
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
