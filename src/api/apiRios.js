import { RIOS_API } from "@/config/data-providers.js";

const _basicHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS"
};

export const getAllSamples = () => {
  const url = `${RIOS_API.public}/RiosConCiencia/GetSamplesExtended`;
  return { url, params: _basicHeaders, method: "get", body: {} };
};

export const getSamplesCsv = (token, filters) => {
  const url = `${RIOS_API.public}/RiosConCiencia/ExportSamples/csv`;
  _basicHeaders.Authorization = `Bearer ${token}`;
  const bodyObject = {
    year: filters.year,
    campaign: filters.campaign,
    samplesId: filters.samplesId
  };
  return { url, params: _basicHeaders, method: "postFile", body: bodyObject };
};
