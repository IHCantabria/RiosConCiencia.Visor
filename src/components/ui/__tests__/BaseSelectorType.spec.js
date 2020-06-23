import { shallowMount, createLocalVue } from "@vue/test-utils";
import BaseSelectorType from "../BaseSelectorType.vue";
import Vuesax from "vuesax";
import merge from "lodash.merge";

const localVue = createLocalVue();
localVue.use(Vuesax);

function createWrapper(overrides) {
  const defaultMountingOptions = {
    propsData: {
      items: [
        {
          id: 1,
          name: "Mareógrafo"
        },
        {
          id: 2,
          name: "Boya de costa"
        },
        {
          id: 3,
          name: "Boya Station"
        },
        {
          id: 4,
          name: "Restringida"
        },
        {
          id: 5,
          name: "Virtual Hindcast"
        }
      ]
    },
    localVue
  };
  return shallowMount(
    BaseSelectorType,
    merge(defaultMountingOptions, overrides)
  );
}

describe("baseSelectorType.vue", () => {
  //UNIT TESTS
  it("computed isEmptyList updated when items length change", () => {
    expect.assertions(2);
    const wrapper = createWrapper();
    expect(wrapper.vm.isEmptyList).toBe(false);
    wrapper.setProps({ items: [] });
    expect(wrapper.vm.isEmptyList).toBe(true);
  });
  it("change is emitted when watcher was actived", () => {
    expect.assertions(1);
    const wrapper = createWrapper();
    wrapper.setData({ activeItem: {} });
    expect(wrapper.emitted().change).toStrictEqual([[{}]]);
  });
  it("activeItem is defined when mounted is called", () => {
    expect.assertions(1);
    const wrapper = createWrapper({
      propsData: {
        lastActiveItem: {}
      }
    });
    expect(wrapper.vm.activeItem).toStrictEqual({});
  });
  it("selectFirstOption is called after mounted if activeItem is null", () => {
    expect.assertions(1);
    const selectFirstOption = jest.fn();
    const wrapper = createWrapper({
      propsData: {
        lastActiveItem: null
      },
      methods: {
        selectFirstOption
      }
    });
    expect(wrapper.vm.activeItem).toBeNull();
  });
  it("selectFirstOption method set activeItem with the first element of items", () => {
    expect.assertions(1);
    const wrapper = createWrapper({
      propsData: {
        lastActiveItem: {
          id: 1,
          name: "Mareógrafo"
        }
      }
    });
    expect(wrapper.vm.activeItem).toStrictEqual(wrapper.vm.items[0]);
  });
  //SNAPSHOT TESTS
  it("renders correctly with the default values", () => {
    expect.assertions(1);
    const wrapper = createWrapper();
    expect(wrapper.element).toMatchSnapshot();
  });
  it("renders correctly with custom widthSelect", () => {
    expect.assertions(1);
    const wrapper = createWrapper({
      propsData: {
        widthSelect: "800px"
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  it("renders correctly with label", () => {
    expect.assertions(1);
    const wrapper = createWrapper({
      propsData: {
        label: "Boyas"
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  it("renders correctly with lastActiveItem selected", () => {
    expect.assertions(1);
    const wrapper = createWrapper({
      propsData: {
        lastActiveItem: {
          id: 5,
          name: "Virtual Hindcast"
        }
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
