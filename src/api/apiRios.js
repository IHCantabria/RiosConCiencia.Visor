import { RIOS_API } from "@/config/data-providers.js";
export const getAllSamples = () => {
  const url = `${RIOS_API.private}/DataMap`;
  return { url, params: {} };
};
