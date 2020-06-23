import { RIOS_API } from "@/config/data-providers.js";

const _basicHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS"
};

export const getAllSamples = () => {
  const url = `${RIOS_API.public}/RiosConCiencia/GetSamplesExtended`;
  return { url, params: _basicHeaders };
};
