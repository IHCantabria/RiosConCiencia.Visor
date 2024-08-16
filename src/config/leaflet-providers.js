//DEFINE PROVIDERS
import { createCustomLegendDiv } from "@/utils/leaflet-utils.js";
import * as config from "@/config/data-config";

export const mapSatelite = {
  name: "Mapa Satelite",
  url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  configParameters: {
    id: "MapSateliteID",
    attribution:
      "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
    minZoom: 3,
  },
};
export const MapGeographic = {
  name: "Mapa Geográfico",
  url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  configParameters: {
    id: "geographicID",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 16,
    minZoom: 3,
  },
};
export const waterQuality = {
  name: "Calidad del agua",
  configParameters: {
    id: "waterQualityID",
    legend: createCustomLegendDiv("Calidad del agua", config.BIOLOGICAL_RAMP),
  },
};
export const forestQuality = {
  name: "Estado del bosque",
  configParameters: {
    id: "forestQualityID",
    legend: createCustomLegendDiv("Estado del bosque", config.FOREST_RAMP),
  },
};
export const ecologicalState = {
  name: "Estado de salud",
  configParameters: {
    id: "ecologicalStateID",
    legend: createCustomLegendDiv("Estado de salud", config.ECOLOGICAL_RAMP),
  },
};
