import {
  cartoDark,
  cartoPositron,
  cartoVoyager,
  statemenWatercolor,
  osmMapnik,
  esriImagery,
  esriOceans,
  esriGray
} from "@/config/leaflet-providers.js";
const centerDefault = { lat: 0, lon: 0, zoom: 3, minZoom: 3 };

const mapDefault = {
  center: [centerDefault.lat, centerDefault.lon],
  zoom: centerDefault.zoom,
  layers: [cartoDark.configParameters.id]
};

const baseLayers = [
  cartoDark,
  cartoPositron,
  cartoVoyager,
  statemenWatercolor,
  osmMapnik,
  esriImagery,
  esriOceans,
  esriGray
];

const switchBaseMaps = [
  {
    displayLayerName: cartoDark.name,
    idLayer: cartoDark.configParameters.id
  },
  {
    displayLayerName: cartoPositron.name,
    idLayer: cartoPositron.configParameters.id
  },
  {
    displayLayerName: cartoVoyager.name,
    idLayer: cartoVoyager.configParameters.id
  },
  {
    displayLayerName: statemenWatercolor.name,
    idLayer: statemenWatercolor.configParameters.id
  },
  {
    displayLayerName: osmMapnik.name,
    idLayer: osmMapnik.configParameters.id
  },
  {
    displayLayerName: esriImagery.name,
    idLayer: esriImagery.configParameters.id
  },
  {
    displayLayerName: esriOceans.name,
    idLayer: esriOceans.configParameters.id
  },
  {
    displayLayerName: esriGray.name,
    idLayer: esriGray.configParameters.id
  }
];
const drawOptions = {
  position: "topleft",
  edit: {
    featureGroup: null, //Property required
    edit: false,
    remove: false
  },
  draw: {
    polyline: false,
    polygon: false,
    rectangle: {
      metric: ["km", "m"],
      showArea: true
    },
    circle: false,
    circlemarker: false,
    marker: true
  }
};

export const LEAFLET_CONFIG = {
  centerDefault: centerDefault,
  mapDefaultConfig: mapDefault,
  baseLayersConfig: baseLayers,
  switchBaseMapsConfig: switchBaseMaps,
  drawOptionsConfig: drawOptions
};
