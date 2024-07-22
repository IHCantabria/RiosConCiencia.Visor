import { RIOSCONCIENCIA_API } from "@/config/data-providers.js";
import axios from "axios";

const _basicHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
};

export const getRiversGeoJson = async () => {
  const url = `${RIOSCONCIENCIA_API.public}/GetRiversGeoJson`;
  const res = await axios.get(url, { headers: _basicHeaders });
  return res.data;
};

export const getAllSamples = () => {
  const url = `${RIOSCONCIENCIA_API.public}/GetSamplesDetailed`;
  return { url, params: _basicHeaders, method: "get", body: {} };
};

export const getAllSamplesWithUserInfo = (token) => {
  _basicHeaders.Authorization = `Bearer ${token}`;
  const url = `${RIOSCONCIENCIA_API.public}/GetSamplesDetailedWithUserInfo`;
  return { url, params: _basicHeaders, method: "get", body: {} };
};

export const getAllPictsSamples = () => {
  const url = `${RIOSCONCIENCIA_API.public}/GetPictSamplesDetailed`;
  return { url, params: _basicHeaders, method: "get", body: {} };
};

export const getSampleDetailed = async (sampleId) => {
  const url = `${RIOSCONCIENCIA_API.public}/GetSampleDetailed/${sampleId}`;
  const res = await axios.get(url, { headers: _basicHeaders });
  return res.data;
};
export const getSampleDetailedWithUserInfo = async (token, sampleId) => {
  _basicHeaders.Authorization = `Bearer ${token}`;
  const url = `${RIOSCONCIENCIA_API.public}/GetSampleDetailedWithUserInfo/${sampleId}`;
  const res = await axios.get(url, { headers: _basicHeaders });
  return res.data;
};

export const getSamplesCsv = (token, filters) => {
  const url = `${RIOSCONCIENCIA_API.public}/ExportSamples/cambera`;
  _basicHeaders.Authorization = `Bearer ${token}`;
  const bodyObject = {
    samplesId: filters.samplesId,
    samplesPictsId: filters.samplesPictsId,
  };
  return { url, params: _basicHeaders, method: "postFile", body: bodyObject };
};

export const getAllSamplesCsv = (token) => {
  const url = `${RIOSCONCIENCIA_API.public}/ExportSamplesAll/cambera`;
  _basicHeaders.Authorization = `Bearer ${token}`;
  return { url, params: _basicHeaders, method: "getFile", body: {} };
};

export const login = (credentials) => {
  const url = `${RIOSCONCIENCIA_API.public}/Authenticate`;
  const auth = {
    email: credentials.email,
    password: credentials.password,
  };
  return { url, params: _basicHeaders, method: "post", body: auth };
};
