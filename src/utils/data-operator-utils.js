//aux method to parse a string to GeoJSON
export const parseGeoJSON = string => {
  return JSON.parse(string).features[0];
};
//aux method to generate a random color
export const colorLayers = () => {
  return (
    "#" + ("00000" + ((Math.random() * (1 << 24)) | 0).toString(16)).slice(-6)
  );
};
//aux method to create mapIDGenerator
export const mapIDGenerator = (id, type) => {
  return `${id}${type}`;
};
//aux method to resolve license Product Type
export const licenseProductType = licenseString => {
  return licenseString == "Open Access" ? true : false;
};
//aux method to resolve license Buoy Type
export const licenseBuoyType = licenseString => {
  return licenseString == "Restringida" ? false : true;
};
//aux method to resolve license Station Type
export const licenseStationType = licenseString => {
  return licenseString == "Restringida" ? false : true;
};
