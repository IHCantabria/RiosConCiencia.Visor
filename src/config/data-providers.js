const ENV = import.meta.env;

export const RIOS_API = {
  public: ENV.VITE_PUBLIC_RIOS,
  private: ENV.VITE_PRIVATE_RIOS,
};
