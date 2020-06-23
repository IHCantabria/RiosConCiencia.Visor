import * as config from "@/config/data-config";
import {
  getBiologicalColor,
  getForestColor,
  getStateColor
} from "@/utils/data-operator-utils.js";
export const dataHelperMixin = {
  methods: {
    formatSamples(data) {
      return data.map(data => {
        return {
          bioQuality: data.bioQualityName,
          ecologicalState: data.ecologicalStateName,
          forestState: data.riverBankQrisiName,
          alias: data.riverSectionAlias,
          municipality: data.riverSectionMunicipality,
          river: data.riverName,
          riverType: data.riverType,
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
          iconBiological: config.SAMPLES.iconBiological,
          iconForest: config.SAMPLES.iconForest,
          iconState: config.SAMPLES.iconState
        };
      });
    }
  }
};
