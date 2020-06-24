//aux method to fix Icon default Leafleat Bug
export const iconFix = () => {
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png")
  });
};
//aux method to create a custom icon Marker
export const createCustomIcon = (typeSensor, color) => {
  return L.ExtraMarkers.icon({
    markerColor: `${color}`,
    innerHTML: `<i class='icon-sensors icon-sensors__${typeSensor}'></i>`
  });
};
