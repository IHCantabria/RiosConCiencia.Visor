// useDataHelper.js
import * as config from "@/config/data-config";
import {
  getBiologicalColor,
  getForestColor,
  getStateColor,
  getCampaignId,
} from "@/utils/data-operator-utils.js";

export function useDataHelper() {
  const formatSamples = (data) => {
    return data.map((data) => {
      return {
        bioQuality: data.bioQualityName,
        ecologicalState: data.ecologicalStateName,
        forestState: data.riverBankQrisiName,
        alias: data.riverSectionAlias,
        municipality: data.riverSectionMunicipality,
        catchment: data.riverCatchment,
        id: data.id,
        idBioQuality: data.idBioQuality,
        bioQualityColor: getBiologicalColor(data.idBioQuality),
        idForestState: data.idRiverBankQrisi,
        forestStateColor: getForestColor(data.idRiverBankQrisi),
        idEcologicalState: data.idEcologicalState,
        ecologicalStateColor: getStateColor(data.idEcologicalState),
        campaign: data.campaign,
        year: data.year,
        type: config.SAMPLES.type,
        idCampaign: getCampaignId(data.campaign),
        longitude: data.riverSectionCoordsLon,
        latitude: data.riverSectionCoordsLat,
        idFilter: parseInt(`${data.year}${getCampaignId(data.campaign)}`),
        idRiverSection: data.idRiverSection,
      };
    });
  };

  const formatPictsSamples = (data) => {
    return data.map((data) => {
      return {
        id: data.id,
        campaign: data.campaign,
        year: data.year,
        idCampaign: getCampaignId(data.campaign),
        idFilter: parseInt(`${data.year}${getCampaignId(data.campaign)}`),
      };
    });
  };

  const checkRole = (data) => {
    const RoleIdsVisor = [1, 6, 7, 8, 9];
    const roleValid = RoleIdsVisor.includes(parseInt(data.roleId));
    return roleValid ? data : null;
  };

  return {
    formatSamples,
    formatPictsSamples,
    checkRole,
  };
}
