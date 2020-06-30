import * as config from "@/config/data-config";
//aux method to get the color of the biological state
export const getBiologicalColor = id => {
  const colorIndex = config.BIOLOGICAL_RAMP.findIndex(
    element => element.id == id
  );
  let color;
  if (colorIndex == -1) {
    color = config.BIOLOGICAL_RAMP[0].color;
  } else {
    color = config.BIOLOGICAL_RAMP[colorIndex].color;
  }
  return color;
};
//aux method to get the color of the forest state
export const getForestColor = id => {
  const colorIndex = config.FOREST_RAMP.findIndex(element => element.id == id);
  let color;
  if (colorIndex == -1) {
    color = config.FOREST_RAMP[0].color;
  } else {
    color = config.FOREST_RAMP[colorIndex].color;
  }
  return color;
};
//aux method to get the color of the forest state
export const getStateColor = id => {
  const colorIndex = config.ECOLOGICAL_RAMP.findIndex(
    element => element.id == id
  );
  let color;
  if (colorIndex == -1) {
    color = config.ECOLOGICAL_RAMP[0].color;
  } else {
    color = config.ECOLOGICAL_RAMP[colorIndex].color;
  }
  return color;
};

export const getCampaignId = name => {
  const campaignIndex = config.CAMPAIGN_VALUES.findIndex(
    element => element.name == name
  );
  let idCampaign;
  if (campaignIndex == -1) {
    idCampaign = 0;
  } else {
    idCampaign = config.CAMPAIGN_VALUES[campaignIndex].id;
  }
  return idCampaign;
};

//aux method to get the distint year of the samples
export const getYears = samples => {
  const years = samples
    .map(item => item.year)
    .filter((value, index, self) => self.indexOf(value) === index);
  const yearSorted = years.sort(function(a, b) {
    return a - b;
  });
  const yearObjects = [];
  for (let i = 0; i < yearSorted.length; i++) {
    yearObjects.push({ id: i + 1, name: yearSorted[i] });
  }
  return yearObjects;
};
