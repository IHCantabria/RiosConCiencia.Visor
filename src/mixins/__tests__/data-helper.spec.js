import { shallowMount } from "@vue/test-utils";
import { dataHelperMixin } from "../data-helper";
import merge from "lodash.merge";

const Component = {
  render() {},
  title: "dummy title",
  mixins: [dataHelperMixin]
};

function createWrapper(overrides) {
  const defaultMountingOptions = {
    propsData: {}
  };
  return shallowMount(Component, merge(defaultMountingOptions, overrides));
}
describe("data-helper Mixin", () => {
  //UNIT TESTS
  it("method formatSources", () => {
    expect.assertions(1);
    const wrapper = createWrapper();
    const data = [
      {
        id: 7,
        nameShort: "NCEP",
        nameLong: "National Centers for Environmental Prediction",
        license: null,
        urlEntity: "https://www.ncep.noaa.gov/",
        urlSource: null,
        sourceContact: null,
        sourceType: "National Agency",
        product: []
      }
    ];
    const dataResult = [
      {
        id: 7,
        nameLong: "National Centers for Environmental Prediction",
        nameShort: "NCEP",
        urlEntity: "https://www.ncep.noaa.gov/",
        sourceType: "National Agency"
      }
    ];
    expect(wrapper.vm.formatSources(data)).toStrictEqual(dataResult);
  });
  it("method formatStations", () => {
    expect.assertions(1);
    const wrapper = createWrapper();
    const data = [
      {
        code: 1,
        name: "PICOS1",
        longitude: -5.043031,
        latitude: 43.133394,
        height: 626,
        project: {
          code: 1,
          name: "SISEF"
        },
        stationType: {
          code: 1,
          name: "Keller"
        },
        placeName: "Sella (Vierdes)",
        active: true
      },
      {
        code: 2,
        name: "PICOS2",
        longitude: -4.835553,
        latitude: 43.252625,
        height: 253,
        project: {
          code: 1,
          name: "SISEF"
        },
        stationType: {
          code: 1,
          name: "Keller"
        },
        placeName: "Bulnes",
        active: false
      }
    ];
    const dataResult = [
      {
        id: 1,
        mapID: "1S",
        selected: false,
        name: "PICOS1",
        type: "marker",
        typeSensor: "Station",
        subTypeSensors: "Keller",
        distance: 0,
        height: 626,
        longitude: -5.043031,
        latitude: 43.133394,
        placeName: "Sella (Vierdes)",
        project: "SISEF",
        color: "red",
        license: "Open Access",
        licenseOpen: true,
        variables: []
      }
    ];
    expect(wrapper.vm.formatStations(data)).toStrictEqual(dataResult);
  });
  it("method formatProductMoments", () => {
    expect.assertions(1);
    const wrapper = createWrapper();
    const data = [
      {
        id: 1,
        moment: "Past",
        productType: []
      },
      {
        id: 5,
        moment: "far away future",
        productType: []
      }
    ];
    const dataResult = [
      {
        id: 1,
        label: "Past",
        icon: "history",
        name: "Past",
        color: "#72C8ED"
      }
    ];
    expect(wrapper.vm.formatProductMoments(data)).toStrictEqual(dataResult);
  });
  it("method formatProductVariableTypes", () => {
    expect.assertions(1);
    const wrapper = createWrapper();
    const data = [
      {
        id: 11,
        name: "Ocean salinity",
        variable: []
      }
    ];
    const aux = {
      momentId: 5
    };
    const dataResult = [
      {
        id: 11,
        name: "Ocean salinity",
        momentId: 5
      }
    ];
    expect(wrapper.vm.formatProductVariableTypes(data, aux)).toStrictEqual(
      dataResult
    );
  });
});
