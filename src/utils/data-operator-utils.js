import * as config from "@/config/data-config";
//aux method to get the color of the biological state
export const getBiologicalColor = id => {
  let color = config.BIOLOGICAL_RAMP.find(element => element.id == id).color;
  if (!color)
    color = config.BIOLOGICAL_RAMP.find(element => element.id == 0).color;
  return color;
};
//aux method to get the color of the forest state
export const getForestColor = id => {
  let color = config.FOREST_RAMP.find(element => element.id == id).color;
  if (!color) color = config.FOREST_RAMP.find(element => element.id == 0).color;
  return color;
};
//aux method to get the color of the forest state
export const getStateColor = id => {
  let color = config.ECOLOGICAL_RAMP.find(element => element.id == id).color;
  if (!color)
    color = config.ECOLOGICAL_RAMP.find(element => element.id == 0).color;
  return color;
};
