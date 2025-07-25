export const SAMPLE_INFO_CONFIG = {
  id: { alias: "ID muestra" },
  waterLevelName: { alias: "Nivel del agua" },
  waterColorName: { alias: "Color del agua" },
  waterSmellName: { alias: "Olor del agua" },
  riverBedWidthName: { alias: "Anchura media cauce (m)" },
  riverBedDepthName: { alias: "Profundidad media cauce (cm)" },
  riverSideWidthLeftName: { alias: "Anchura media ribera izq (m)" },
  riverSideWidthRightName: { alias: "Anchura media ribera drcha (m)" },
  stonesInPoolsName: { alias: "Inclusión piedras" },
  sedimentMobilityName: { alias: "Movilidad de sedimentos" },
  rapidsFrequencyName: { alias: "Frecuencia de rápidos" },
  velocityAndDepthName: { alias: "Régimen velocidad /profundidad" },
  riverShadowsName: { alias: "Sombra cauce" },
  habitatIndexCategoriesName: { alias: "Índice del Hábitat Fluvial" },
  riverBankNaturalnessName: { alias: "Grado naturalidad" },
  riverBankConectionsName: { alias: "Conexiones adyacentes" },
  riverBankVegetationsName: { alias: "Continuidad de la vegetación" },
  riverEEI: { alias: "Cobertura especies exóticas invasoras" },
  weatherTodayName: { alias: "Clima hoy" },
  weather48HName: { alias: "Clima en 48 horas" },
  userCod: { alias: "Código" },
  userName: { alias: "Nombre" },
  userSurnames: { alias: "Apellidos" },
  transparencyName: { alias: "Transparencia" },
  bioQualityName: { alias: "Calidad biológica" },
  ecologicalStateName: { alias: "Estado de salud" },
  riverBankQrisiName: { alias: "Calidad bosque de ribera" },
  habitatTransversalObstacleName: {
    alias: "Presencia de obstáculos transversales",
  },
  riverBankInvasiveName: {
    alias: "Grado cobertura especies exóticas invasoras",
  },
  riverSectionAlias: { alias: "Alias" },
  riverSectionMunicipality: { alias: "Municipio" },
  riverName: { alias: "Nombre del río" },
  riverType: { alias: "Tipo de río" },
  riverCatchment: { alias: "Cuenca del río" },
  riverSectionCoordsLon: {
    alias: "Longitud",
  },
  riverSectionCoordsLat: {
    alias: "Latitud",
  },
  waterFlow: { alias: "¿El agua del río fluye?" },
  waterLevelCriticalProblem: { alias: "Problema crítico del nivel de agua" },
  samplePointCoordsLon: {
    alias: "Longitud",
  },
  samplePointCoordsLat: {
    alias: "Latitud",
  },
  samplePointWidth: { alias: "Anchura cauce muestreo (m)" },
  samplePointDepth: { alias: "Profundidad cauce muestreo (cm)" },
  samplePointWaterVelocity: {
    alias: "Velocidad agua (m/s)",
  },
  samplePointWaterTemp: {
    alias: "Temperatura del agua",
  },
  sampleQrisiTotalPoints: { alias: "Puntos totales de Qrisi" },
  sampleHabitatTotalPoints: {
    alias: "Puntos totales de hábitat",
  },
  idRiverSection: { alias: "ID tramo" },
  partners: { alias: "Socios" },
  sampleDate: { alias: "Fecha" },
  campaign: { alias: "Campaña" },
  year: { alias: "Año" },
  observations: { alias: "Observaciones" },
  rapidFrequencyList: {
    alias: "Tipo de estructura longitudinal",
    internalConfig: {
      name: { alias: "Nombre" },
      presence: { alias: "Presencia" },
    },
  },
  spillList: {
    alias: "Lista de vertidos",
    internalConfig: {
      colorName: { alias: "Color" },
      diameterName: { alias: "Diámetro" },
      flowName: { alias: "Flujo" },
      latitude: { alias: "Latitud" },
      longitude: { alias: "Longitud" },
      smellName: { alias: "Olor" },
    },
  },
  wasteList: {
    alias: "Lista de residuos",
    internalConfig: {
      name: { alias: "Nombre" },
      typeName: { alias: "Tipo" },
    },
  },
  landUseList: {
    alias: "Lista de usos del suelo",
    internalConfig: {
      name: { alias: "Nombre" },
      riverSide: { alias: "Lado del río" },
    },
  },
  marginConditionList: {
    alias: "Lista de condiciones del margen",
    internalConfig: {
      name: { alias: "Nombre" },
      riverSide: { alias: "Lado del río" },
    },
  },
  waterElementList: {
    alias: "Lista de elementos en el agua",
    internalConfig: {
      name: { alias: "Nombre" },
    },
  },
  eukaryoteList: {
    alias: "Lista de eucariotas",
    internalConfig: {
      groupName: { alias: "Grupo" },
      subGroupName: { alias: "Subgrupo" },
      name: { alias: "Nombre" },
      specie: { alias: "Especie" },
    },
  },
  aquaticVegetationList: {
    alias: "Cobertura vegetación acuática",
    internalConfig: {
      name: { alias: "Nombre" },
      coverage: { alias: "Cobertura" },
    },
  },
  randomElementList: {
    alias: "Elementos de heterogeneidad",
    internalConfig: {
      name: { alias: "Nombre" },
      presence: { alias: "Presencia" },
    },
  },
  substrateCompositionList: {
    alias: "Composición del sustrato",
    internalConfig: {
      name: { alias: "Nombre" },
      presence: { alias: "Presencia" },
    },
  },
};

export const SAMPLE_INFO_GROUPS_CONFIG = {
  generalSampleInfo: {
    alias: "Datos del muestreo",
    fields: [
      "year",
      "campaign",
      "sampleDate",
      "weatherTodayName",
      "weather48HName",
    ],
  },
  riverSection: {
    alias: "Información del tramo",
    fields: [
      "riverSectionAlias",
      "riverSectionMunicipality",
      "riverCatchment",
      "riverSectionCoordsLon",
      "riverSectionCoordsLat",
    ],
  },
  user: {
    alias: "Usuario",
    fields: ["userName", "userSurnames", "userCod", "partners"],
  },
  water: {
    alias: "Agua",
    fields: [
      "waterLevelName",
      "waterColorName",
      "waterSmellName",
      "samplePointWaterTemp",
      "waterFlow",
      "transparencyName",
      "bioQualityName",
    ],
  },
  riviera: {
    alias: "Ribera",
    fields: [
      "marginConditionList",
      "landUseList",
      "riverBankNaturalnessName",
      "riverBankConectionsName",
      "riverBankVegetationsName",
      "riverBankInvasiveName",
      "riverEEI",
      "riverBankQrisiName",
    ],
  },
  river: {
    alias: "Cauce",
    fields: [
      "riverBedWidthName",
      "riverBedDepthName",
      "riverSideWidthLeftName",
      "riverSideWidthRightName",
      "stonesInPoolsName",
      "rapidsFrequencyName",
      "velocityAndDepthName",
      "aquaticVegetationList",
      "habitatIndexCategoriesName",
      "samplePointWidth",
      "samplePointDepth",
      "samplePointWaterVelocity",
      "sedimentMobilityName",
      "rapidFrequencyList",
      "substrateCompositionList",
      "riverShadowsName",
      "randomElementList",
      "habitatTransversalObstacleName",
    ],
  },
  biodiversity: {
    alias: "Biodiversidad",
    fields: ["eukaryoteList"],
  },
  conditions: {
    alias: "Afecciones",
    fields: [
      "waterLevelCriticalProblem",
      "spillList",
      "wasteList",
      "waterElementList",
    ],
  },
  ecologicalState: {
    alias: "Estado de salud del río",
    fields: ["ecologicalStateName"],
  },
};
