import { shallowMount } from "@vue/test-utils";
import App from "../App.vue";
import merge from "lodash.merge";

function createWrapper(overrides) {
  const defaultMountingOptions = {
    mocks: {
      $spinner: {
        configureModeSpinner: jest.fn(),
        spinnerConfig: {
          mode: 1
        }
      },
      $spinnerEnums: {
        ModesSpinner: 1
      }
    }
  };
  return shallowMount(App, merge(defaultMountingOptions, overrides));
}

describe("app.vue", () => {
  //UNIT TESTS
  it("spinner mode set after init", () => {
    expect.assertions(2);
    const wrapper = createWrapper();
    const spy = jest.spyOn(wrapper.vm, "init");
    const spySpinner = jest.spyOn(wrapper.vm.$spinner, "configureModeSpinner");
    wrapper.vm.init();
    expect(spy).toHaveBeenCalled();
    expect(spySpinner).toHaveBeenCalled();
  });
  it("init method called after mounted", () => {
    expect.assertions(1);
    const mockInit = jest.fn();
    createWrapper({
      methods: {
        init: mockInit
      }
    });
    expect(mockInit).toHaveBeenCalled();
  });
  //SNAPSHOT TESTS
  it("renders correctly", () => {
    expect.assertions(1);
    const wrapper = createWrapper();
    expect(wrapper.element).toMatchSnapshot();
  });
});
