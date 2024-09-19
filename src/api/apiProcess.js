// TODO: Update all file to download report pdf from apiprocess

import { RIOSCONCIENCIA_APIPROCESS } from "@/config/data-providers.js";
import { downloadPDF } from "@/utils/pdf-utils";
import axios from "axios";

// BASIC HEADERS FOR PDF REQUEST
const _basicHeaders = {
  accept: "application/pdf, application/problem+json",
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
};

export const getReportPDF = async (token, year) => {
  const url = `${RIOSCONCIENCIA_APIPROCESS.public}/demo/generar_pdf?anho=${year}`;
  _basicHeaders.Authorization = `Bearer ${token}`;
  const res = await axios.get(url, { headers: _basicHeaders });
  const pdf = res.data;
  downloadPDF(pdf, `report_${year}.pdf`);
  return pdf;
};
