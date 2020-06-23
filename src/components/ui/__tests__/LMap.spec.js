import { shallowMount } from "@vue/test-utils";
import LMap from "../LMap.vue";
import merge from "lodash.merge";

function createWrapper(overrides) {
  const defaultMountingOptions = {
    propsData: {
      cCenter: {
        lat: 0,
        lon: 0,
        zoom: 2,
        minZoom: 2
      },
      cBaseLayers: [
        {
          name: "carto-positron",
          url:
            "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}{r}.png",
          configParameters: {
            id: "cartoPositronID",
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://cartodb.com/attributions">CartoDB</a>',
            subdomains: "abcd",
            minZoom: 2,
            maxZoom: 19
          }
        },
        {
          name: "carto-dark",
          url:
            "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}{r}.png",
          configParameters: {
            id: "cartoDarkID",
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://cartodb.com/attributions">CartoDB</a>',
            subdomains: "abcd",
            minZoom: 2,
            maxZoom: 19
          }
        },
        {
          name: "carto-voyager",
          url:
            "https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png",
          configParameters: {
            id: "cartoVoyagerID",
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://cartodb.com/attributions">CartoDB</a>',
            subdomains: "abcd",
            minZoom: 2,
            maxZoom: 19
          }
        },
        {
          name: "statemen-watercolor",
          url:
            "https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}",
          configParameters: {
            id: "statemenWatercolorID",
            attribution:
              'Map tiles by <a href="https://stamen.com">Stamen Design</a>, <a href="https://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            subdomains: "abcd",
            minZoom: 2,
            maxZoom: 16,
            ext: "png"
          }
        },
        {
          name: "osm-mapnik",
          url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          configParameters: {
            id: "osmMapnikID",
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            minZoom: 2,
            maxZoom: 19
          }
        },
        {
          name: "esri-imagery",
          url:
            "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
          configParameters: {
            id: "esriImageryID",
            attribution:
              "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
            minZoom: 2
          }
        },
        {
          name: "esri-oceans",
          url:
            "https://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}",
          configParameters: {
            id: "esriOceansID",
            attribution:
              "Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri",
            minZoom: 2,
            maxZoom: 13
          }
        },
        {
          name: "esri-gray",
          url:
            "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
          configParameters: {
            id: "esriGrayID",
            attribution: "Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ",
            minZoom: 2,
            maxZoom: 16
          }
        }
      ],
      cMapDefault: {
        center: [0, 0],
        zoom: 2,
        layers: ["cartoPositronID"]
      },
      cSwitchLayerBaseMaps: [
        {
          displayLayerName: "carto-positron",
          idLayer: "cartoPositronID"
        },
        {
          displayLayerName: "carto-dark",
          idLayer: "cartoDarkID"
        },
        {
          displayLayerName: "carto-voyager",
          idLayer: "cartoVoyagerID"
        },
        {
          displayLayerName: "statemen-watercolor",
          idLayer: "statemenWatercolorID"
        },
        {
          displayLayerName: "osm-mapnik",
          idLayer: "osmMapnikID"
        },
        {
          displayLayerName: "esri-imagery",
          idLayer: "esriImageryID"
        },
        {
          displayLayerName: "esri-oceans",
          idLayer: "esriOceansID"
        },
        {
          displayLayerName: "esri-gray",
          idLayer: "esriGrayID"
        }
      ],
      cDrawOptions: {
        draw: {
          polyline: false,
          polygon: false,
          rectangle: {},
          circle: false,
          circlemarker: false,
          marker: {}
        },
        edit: {
          edit: false,
          options: {},
          remove: false
        },
        position: "topleft"
      },
      cMarkers: []
    }
  };
  return shallowMount(LMap, merge(defaultMountingOptions, overrides));
}

describe("lMap.vue", () => {
  var mapWrapper;
  function mapDivCreate() {
    mapWrapper = createWrapper({ attachToDocument: true });
  }
  function mapDivDelete() {
    mapWrapper.destroy();
  }
  beforeEach(() => {
    mapDivCreate();
  });
  afterEach(() => {
    mapDivDelete();
  });
  //UNIT TESTS
  it("renders a map", () => {
    expect.assertions(1);
    const divMap = mapWrapper.find(`#mapid`);
    expect(divMap.exists()).toBe(true);
  });
  it("define baseLayers onload with loadTileLayers", () => {
    expect.assertions(1);
    const layersMap = mapWrapper.vm.layersMap;
    expect(layersMap).not.toBe([]);
  });
  it("define map onload with setMap", () => {
    expect.assertions(1);
    const myMap = mapWrapper.vm.myMap;
    expect(myMap).toBeDefined();
  });
  it("add search Control onload with addGlobalSearchControl", () => {
    expect.assertions(1);
    const searchControl = mapWrapper.find(".easy-button-container");
    expect(searchControl.exists()).toBe(true);
  });
  it("add Draw Control onload with addDrawControls", () => {
    expect.assertions(1);
    const drawControl = mapWrapper.find(`.leaflet-draw`);
    expect(drawControl.exists()).toBe(true);
  });
  it("add SwitcherLayer Control onload with setupSwitcherLayer", () => {
    expect.assertions(1);
    const switcherControl = mapWrapper.find(`.leaflet-control-layers`);
    expect(switcherControl.exists()).toBe(true);
  });
  it("emit event after draw a rectangle on map", () => {
    expect.assertions(1);
    const map = mapWrapper.vm.myMap;
    const bounds = [
      [54.559322, -5.767822],
      [56.1210604, -3.02124]
    ];
    const layerTest = L.rectangle(bounds, {
      color: "#ff7800",
      weight: 1
    });
    jest.spyOn(mapWrapper.vm, "addDrawLayer").mockImplementation();
    map.fire("draw:created", { layerType: "rectangle", layer: layerTest });
    expect(mapWrapper.emitted("rectangle-drawn")).toStrictEqual([
      [
        {
          lonMin: "-5.767822",
          lonMax: "-3.021240",
          latMin: "54.559322",
          latMax: "56.121060"
        }
      ]
    ]);
  });
  it("call launchEventCoords and addDrawLayer after draw a rectangle on map", () => {
    expect.assertions(2);
    const map = mapWrapper.vm.myMap;
    const bounds = [
      [54.559322, -5.767822],
      [56.1210604, -3.02124]
    ];
    const layerTest = L.rectangle(bounds, {
      color: "#ff7800",
      weight: 1
    });
    const mockAddDrawLayer = jest.fn();
    mapWrapper.vm.addDrawLayer = mockAddDrawLayer;
    const spyLaunchEventCoords = jest.spyOn(mapWrapper.vm, "launchEventCoords");
    map.fire("draw:created", { layerType: "rectangle", layer: layerTest });
    expect(mockAddDrawLayer).toHaveBeenCalled();
    expect(spyLaunchEventCoords).toHaveBeenCalled();
  });
  it("emit event after place a marker on map", () => {
    expect.assertions(1);
    const map = mapWrapper.vm.myMap;
    const bounds = [54.559322, -5.767822];
    const layerTest = L.marker(bounds, {
      color: "#ff7800",
      weight: 1
    });
    map.fire("draw:created", { layerType: "marker", layer: layerTest });
    expect(mapWrapper.emitted("marker-drawn")).toStrictEqual([
      [
        {
          lat: "54.559322",
          lon: "-5.767822"
        }
      ]
    ]);
  });
  it("call launchEventCoords after place a marker on map", () => {
    expect.assertions(1);
    const map = mapWrapper.vm.myMap;
    const bounds = [54.559322, -5.767822];
    const layerTest = L.marker(bounds, {
      color: "#ff7800",
      weight: 1
    });
    const spyLaunchEventCoords = jest.spyOn(mapWrapper.vm, "launchEventCoords");
    map.fire("draw:created", { layerType: "marker", layer: layerTest });
    expect(spyLaunchEventCoords).toHaveBeenCalled();
  });
  it("emit event after click search button", () => {
    expect.assertions(1);
    const map = mapWrapper.vm.myMap;
    map.fire("search");
    expect(mapWrapper.emitted("search-global")).toStrictEqual([[]]);
  });
  it("init method called after mounted", async () => {
    expect.assertions(1);
    const mockInit = jest.fn();
    const wrapper = createWrapper({
      methods: {
        initMap: mockInit
      }
    });
    await wrapper.vm.$nextTick();
    expect(mockInit).toHaveBeenCalled();
  });
  //SNAPSHOT TESTS
  it("renders correctly", () => {
    expect.assertions(1);
    expect(mapWrapper.element).toMatchSnapshot();
  });
});
