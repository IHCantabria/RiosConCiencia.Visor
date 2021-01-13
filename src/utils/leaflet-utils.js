import * as config from "@/config/data-config";
//aux method to fix Icon default Leafleat Bug
export const iconFix = () => {
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png")
  });
};

//aux method pan & zoom to a marker position
export const panZoomMarker = marker => {
  const latLngs = [marker.getLatLng()];
  return L.latLngBounds(latLngs);
};

//aux method to get icon to CustomMarker
export const getCustomIcon = layerId => {
  const icon = config.MARKER_ICONS.find(icon => icon.id == layerId).icon;
  return icon;
};

//aux method to get color to CustomMarker
export const getCustomColorKey = layerId => {
  const key = config.MARKER_COLORS.find(icon => icon.id == layerId).key;
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
        <th scope="row">Nombre del tramo</th>
        <td>${sample.alias}</td>
      </tr>
        <th scope="row">Cuenca</th>
        <td>${sample.catchment}</td>
      </tr>
      <tr>
        <th scope="row">Municipio</th>
        <td>${sample.municipality}</td>
      </tr>
      <tr>
        <th scope="row">Año y campaña de muestreo</th>
        <td>${sample.year} - ${sample.campaign}</td>
      </tr>
      <tr>
        <th scope="row">Calidad biológica del agua</th>
        <td>${sample.bioQuality}</td>
      </tr>
      <tr>
        <th scope="row">Calidad del bosque de ribera</th>
        <td>${sample.forestState}</td>
      </tr>
      <tr>
        <th scope="row">Estado ecológico</th>
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

//aux method to create legend
export const createCustomLegendDiv = (title, ramp) => {
  const labels = [`<strong class="title-legend">${title}</strong>`];
  let innerHTML;
  ramp.forEach(ramp => {
    innerHTML += labels.push(
      `<span class="item-legend"><i class="circle-dot" style="background-color: ${ramp.colorCode}"></i> ${ramp.name}</span>`
    );
  });
  innerHTML = labels.join("");
  return innerHTML;
};
export const createCustomLegend = innerHTML => {
  const div = L.DomUtil.create(
    "div",
    "leaflet-control-layers leaflet-control custom-legend"
  );
  div.innerHTML = innerHTML;
  return div;
};
