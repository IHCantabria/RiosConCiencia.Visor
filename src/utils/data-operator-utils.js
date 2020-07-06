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

//aux method to create the objects filters donwload
export const getDownloadFilters = (years, campaigns) => {
  let filters = [];
  filters.push({ id: 0, name: "Todas las campañas" });
  years.forEach(year => {
    campaigns.forEach(campaign => {
      const idFilter = parseInt(`${year.name}${campaign.id}`);
      filters.push({ id: idFilter, name: `${year.name} - ${campaign.name}` });
    });
  });
  return filters;
};

//aux method to get the distint year of the samples
export const getYears = samples => {
  const years = samples
    .map(item => item.year)
    .filter((value, index, self) => self.indexOf(value) === index);
  const yearSorted = years.sort(function(a, b) {
    return b - a;
  });
  let yearObjects = [];
  for (let i = 0; i < yearSorted.length; i++) {
    yearObjects.push({ id: i + 1, name: yearSorted[i] });
  }
  return yearObjects;
};

//aux method to get the default filter campaign
export const getCampaignFilter = (samples, yearObject, campaignArray) => {
  const samplesFiltered = samples.filter(
    sample =>
      sample.year == yearObject.name && sample.campaign == campaignArray[1].name
  );
  return samplesFiltered.length > 0 ? campaignArray[1] : campaignArray[0];
};
