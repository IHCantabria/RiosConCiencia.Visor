import { shallowMount, createLocalVue } from "@vue/test-utils";
import { notificationsMixin } from "../notifications";
import Vuesax from "vuesax";
import merge from "lodash.merge";

const localVue = createLocalVue();
localVue.use(Vuesax);

const Component = {
  render() {},
  title: "dummy title",
  mixins: [notificationsMixin]
};

function createWrapper(overrides) {
  const defaultMountingOptions = {
    propsData: {},
    localVue
  };
  return shallowMount(Component, merge(defaultMountingOptions, overrides));
}
describe("notifications Mixin", () => {
  it("call method $_showNotificationRepeat", () => {
    expect.assertions(2);
    const wrapper = createWrapper();
    const spy = jest.spyOn(wrapper.vm, "$_showNotificationRepeat");
    const spyNotif = jest.spyOn(wrapper.vm.$vs, "notify");
    wrapper.vm.$_showNotificationRepeat();
    expect(spy).toHaveBeenCalled();
    expect(spyNotif).toHaveBeenCalled();
  });
  it("call method  $_showNotificationOnce", () => {
    expect.assertions(2);
    const wrapper = createWrapper();
    const spy = jest.spyOn(wrapper.vm, "$_showNotificationOnce");
    const spyNotif = jest.spyOn(wrapper.vm.$vs, "notify");
    wrapper.vm.$_showNotificationOnce();
    expect(spy).toHaveBeenCalled();
    expect(spyNotif).toHaveBeenCalled();
  });
});
