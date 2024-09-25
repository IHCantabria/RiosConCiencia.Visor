const ENV = import.meta.env;

export const RIOSCONCIENCIA_API = {
  public: `${ENV.VITE_API_TOOL}/v1/public/RiosConCiencia`,
};

export const RIOSCONCIENCIA_APIPROCESS = {
  public: `${ENV.VITE_APIPROCESS_TOOL}/pdf.riosconciencia`,
};
