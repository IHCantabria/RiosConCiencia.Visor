//DEFINE PROVIDERS
export const cartoDark = {
  name: "Dark - Carto",
  url:
    "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}{r}.png",
  configParameters: {
    id: "cartoDarkID",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://cartodb.com/attributions">CartoDB</a>',
    subdomains: "abcd",
    minZoom: 3,
    maxZoom: 19
  }
};
export const cartoPositron = {
  name: "Positron - Carto",
  url:
    "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}{r}.png",
  configParameters: {
    id: "cartoPositronID",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://cartodb.com/attributions">CartoDB</a>',
    subdomains: "abcd",
    minZoom: 3,
    maxZoom: 19
  }
};
export const cartoVoyager = {
  name: "Voyager - Carto",
  url:
    "https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png",
  configParameters: {
    id: "cartoVoyagerID",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://cartodb.com/attributions">CartoDB</a>',
    subdomains: "abcd",
    minZoom: 3,
    maxZoom: 19
  }
};
export const statemenWatercolor = {
  name: "Watercolor - Stamen",
  url: "https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}",
  configParameters: {
    id: "statemenWatercolorID",
    attribution:
      'Map tiles by <a href="https://stamen.com">Stamen Design</a>, <a href="https://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: "abcd",
    minZoom: 3,
    maxZoom: 16,
    ext: "png"
  }
};
export const osmMapnik = {
  name: "Mapnik - OSM",
  url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  configParameters: {
    id: "osmMapnikID",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    minZoom: 3,
    maxZoom: 19
  }
};
export const esriImagery = {
  name: "Imagery - ESRI",
  url:
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  configParameters: {
    id: "esriImageryID",
    attribution:
      "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
    minZoom: 3
  }
};
export const esriOceans = {
  name: "Ooceans - ESRI",
  url:
    "https://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}",
  configParameters: {
    id: "esriOceansID",
    attribution:
      "Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri",
    minZoom: 3,
    maxZoom: 13
  }
};
export const esriGray = {
  name: "Gray - ESRI",
  url:
    "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
  configParameters: {
    id: "esriGrayID",
    attribution: "Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ",
    minZoom: 2.75,
    maxZoom: 16
  }
};
