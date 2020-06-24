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

//aux method to create a popupInfo
export const createCustomPopup = sample => {
  return `<table>
    <tbody>
      <tr>
        <th scope="row">Río</th>
        <td>${sample.river}</td>
      </tr>
      <tr>
        <th scope="row">Tipo de corriente</th>
        <td>${sample.riverType}</td>
      </tr>
      <tr>
        <th scope="row">Cuenca</th>
        <td>${sample.catchment}</td>
      </tr>
      <tr>
        <th scope="row">Alias del tramo</th>
        <td>${sample.alias}</td>
      </tr>
      <tr>
        <th scope="row">Municipio del tramo</th>
        <td>${sample.municipality}</td>
      </tr>
      <tr>
        <th scope="row">Año de muestra</th>
        <td>${sample.year}</td>
      </tr>
      <tr>
        <th scope="row">Campaña de muestra</th>
        <td>${sample.campaign}</td>
      </tr>
      <tr>
        <th scope="row">Calidad del Agua</th>
        <td>${sample.bioQuality}</td>
      </tr>
      <tr>
        <th scope="row">Calidad del Bosque de Rivera</th>
        <td>${sample.forestState}</td>
      </tr>
      <tr>
        <th scope="row">Estado Ecológico</th>
        <td>${sample.ecologicalState}</td>
      </tr>
    </tbody>
  </table>`;
};

//aux method to create a tooltip
export const createCustomTooltip = sample => {
  return `<p>
      <strong>Calidad del Agua:</strong> ${sample.bioQuality}</br>
      <strong>Calidad del Bosque de Rivera:</strong> ${sample.forestState}</br>
      <strong>Estado Ecológico:</strong> ${sample.ecologicalState}
    </p>`;
};
