import { MARKER_ICONS, MARKER_COLORS } from "@/config/data-config";
//aux method to fix Icon default Leafleat Bug
export const iconFix = () => {
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png")
  });
};

//aux method to get icon to CustomMarker
export const getCustomIcon = layerId => {
  const icon = MARKER_ICONS.find(icon => icon.id == layerId).icon;
  return icon;
};

//aux method to get color to CustomMarker
export const getCustomColorKey = layerId => {
  const key = MARKER_COLORS.find(icon => icon.id == layerId).key;
  return key;
};

//aux method to create a custom icon Marker
export const createCustomIcon = (icon, color) => {
  return L.ExtraMarkers.icon({
    markerColor: `${color}`,
    innerHTML: `<i class='icon-sensors icon-sensors__${icon}'></i>`
  });
};
