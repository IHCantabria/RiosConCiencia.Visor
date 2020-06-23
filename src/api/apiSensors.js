import { SENSORS_API } from "@/config/data-providers.js";
export const getAllBuoys = () => {
  const url = `${SENSORS_API.private}/DataMap`;
  return { url, params: {} };
};
export const getBuoysByCoords = coords => {
  const url = `${SENSORS_API.private}/DataMap?xMin=${coords.xMin}&yMin=${coords.yMin}&xMax=${coords.xMax}&yMax=${coords.yMax}`;
  return { url, params: {} };
};
export const getBuoysByTypes = buoyTypeId => {
  const url = `${SENSORS_API.private}/DataMap?buoyTypeId=${buoyTypeId}`;
  return { url, params: {} };
};
export const getBuoysByCoordsAndTypes = (coords, buoyTypeId) => {
  const url = `${SENSORS_API.private}/DataMap?xMin=${coords.xMin}&yMin=${coords.yMin}&xMax=${coords.xMax}&yMax=${coords.yMax}&buoyTypeId=${buoyTypeId}`;
  return { url, params: {} };
};
export const getAllBuoyTypes = () => {
  const url = `${SENSORS_API.public}/Buoys/BuoyTypes`;
  return { url, params: {} };
};
export const getAllStationsTypes = () => {
  const url = `${SENSORS_API.public}/Stations/StationTypes`;
  return { url, params: {} };
};
export const getAllStations = () => {
  const url = `${SENSORS_API.public}/Stations`;
  return { url, params: {} };
};
export const getStationsByTypes = stationTypeId => {
  const url = `${SENSORS_API.public}/Stations/${stationTypeId}/Stations`;
  return { url, params: {} };
};
