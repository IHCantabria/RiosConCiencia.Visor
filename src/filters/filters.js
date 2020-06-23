export const resolutionLon = value => {
  return `${value} Km`;
};
export const resolutionHours = value => {
  const text = value != "" ? `${value} h` : "";
  return text;
};
