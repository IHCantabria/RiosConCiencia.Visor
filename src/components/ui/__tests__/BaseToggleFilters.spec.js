import { shallowMount, createLocalVue } from "@vue/test-utils";
import BaseToggleFilters from "../BaseToggleFilters.vue";
import Vuesax from "vuesax";
import merge from "lodash.merge";

const localVue = createLocalVue();
localVue.use(Vuesax);

function createWrapper(overrides) {
  const defaultMountingOptions = {
    localVue
  };
  return shallowMount(
    BaseToggleFilters,
    merge(defaultMountingOptions, overrides)
  );
}

describe("baseToggleFilters.vue", () => {
  //UNIT TESTS
  it("computed areBaseFiltersActive updated when baseFiltersToggle change", () => {
    expect.assertions(2);
    const wrapper = createWrapper();
    expect(wrapper.vm.areOnlySpatialFiltersActive).toBe(false);
    wrapper.setData({ onlySpatialFiltersToggle: true });
    expect(wrapper.vm.areOnlySpatialFiltersActive).toBe(true);
  });
  it("filters-actived is emitted when watcher areBaseFiltersActive was actived", () => {
    expect.assertions(1);
    const wrapper = createWrapper();
    wrapper.setData({ onlySpatialFiltersToggle: true });
    expect(wrapper.emitted()["only-spatial-filters-actived"]).toStrictEqual([
      [true]
    ]);
  });
  it("computed isSearchProductsActive updated when searchProductsToggle change", () => {
    expect.assertions(2);
    const wrapper = createWrapper();
    expect(wrapper.vm.isSearchProductsActive).toBe(true);
    wrapper.setData({ searchProductsToggle: false });
    expect(wrapper.vm.isSearchProductsActive).toBe(false);
  });
  it("products-actived is emitted when watcher isSearchProductsActive was actived", () => {
    expect.assertions(1);
    const wrapper = createWrapper();
    wrapper.setData({ searchProductsToggle: false });
    expect(wrapper.emitted()["products-actived"]).toStrictEqual([[false]]);
  });
  it("computed isSearchBuoysActive updated when searchBuoysToggle change", () => {
    expect.assertions(2);
    const wrapper = createWrapper();
    expect(wrapper.vm.isSearchBuoysActive).toBe(true);
    wrapper.setData({ searchBuoysToggle: false });
    expect(wrapper.vm.isSearchBuoysActive).toBe(false);
  });
  it("buoys-actived is emitted when watcher isSearchBuoysActive was actived", () => {
    expect.assertions(1);
    const wrapper = createWrapper();
    wrapper.setData({ searchBuoysToggle: false });
    expect(wrapper.emitted()["buoys-actived"]).toStrictEqual([[false]]);
  });
  it("computed isSearchStationsActive updated when searchStationsToggle change", () => {
    expect.assertions(2);
    const wrapper = createWrapper();
    expect(wrapper.vm.isSearchStationsActive).toBe(true);
    wrapper.setData({ searchStationsToggle: false });
    expect(wrapper.vm.isSearchStationsActive).toBe(false);
  });
  it("fstations-actived is emitted when watcher isSearchStationsActive was actived", () => {
    expect.assertions(1);
    const wrapper = createWrapper();
    wrapper.setData({ searchStationsToggle: false });
    expect(wrapper.emitted()["stations-actived"]).toStrictEqual([[false]]);
  });

  //SNAPSHOT TESTS
  it("renders correctly", () => {
    expect.assertions(1);
    const wrapper = createWrapper({});
    expect(wrapper.element).toMatchSnapshot();
  });
});
