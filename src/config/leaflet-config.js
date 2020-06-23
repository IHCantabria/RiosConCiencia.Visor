import {
  mapSatelite,
  waterQuality,
  forestQuality,
  ecologicalState
} from "@/config/leaflet-providers.js";
const centerDefault = { lat: 43.2, lon: -3.9, zoom: 10, minZoom: 3 };

const mapDefault = {
  center: [centerDefault.lat, centerDefault.lon],
  zoom: centerDefault.zoom,
  layers: [mapSatelite.configParameters.id]
};

const baseLayers = [mapSatelite];

const switchBaseMaps = [
  {
    displayLayerName: mapSatelite.name,
    idLayer: mapSatelite.configParameters.id
  }
];

const overlayLayers = [waterQuality, forestQuality, ecologicalState];

const switchOverlayMaps = [
  {
    displayLayerName: waterQuality.name,
    idLayer: waterQuality.configParameters.id
  },
  {
    displayLayerName: forestQuality.name,
    idLayer: forestQuality.configParameters.id
  },
  {
    displayLayerName: ecologicalState.name,
    idLayer: ecologicalState.configParameters.id
  }
];
export const LEAFLET_CONFIG = {
  centerDefault: centerDefault,
  mapDefaultConfig: mapDefault,
  baseLayersConfig: baseLayers,
  switchBaseMapsConfig: switchBaseMaps,
  overlayLayersConfig: overlayLayers,
  switchOverlayMapsConfig: switchOverlayMaps
};
