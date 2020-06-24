//DEFINE PROVIDERS
export const mapSatelite = {
  name: "Mapa Satelite",
  url:
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  configParameters: {
    id: "MapSateliteID",
    attribution:
      "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
    minZoom: 3,
    maxZoom: 16
  }
};
export const waterQuality = {
  name: "Calidad del agua",
  configParameters: {
    id: "waterQualityID"
  }
};
export const forestQuality = {
  name: "Estado del bosque",
  configParameters: {
    id: "forestQualityID"
  }
};
export const ecologicalState = {
  name: "Estado ecológico",
  configParameters: {
    id: "ecologicalStateID"
  }
};
