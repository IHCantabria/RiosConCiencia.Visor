export const SAMPLE_INFO_CONFIG = {
  id: { alias: "ID muestra" },
  waterLevelName: { alias: "Nivel del agua" },
  waterColorName: { alias: "Color del agua" },
  waterSmellName: { alias: "Olor del agua" },
  riverBedWidthName: { alias: "Ancho del cauce" },
  riverBedDepthName: { alias: "Profundidad del cauce" },
  riverSideWidthLeftName: { alias: "Ancho de la margen izquierda" },
  riverSideWidthRightName: { alias: "Ancho de la margen derecha" },
  //   TODO: Check this
  stonesInPoolsName: { alias: "Piedras en las pozas" },
  sedimentMobilityName: { alias: "Movilidad de sedimentos" },
  rapidsFrequencyName: { alias: "Frecuencia de rápidos" },
  velocityAndDepthName: { alias: "Velocidad y profundidad" },
  riverShadowsName: { alias: "Sombras en el río" },
  habitatIndexCategoriesName: { alias: "Categorías del índice de hábitat" },
  riverBankNaturalnessName: { alias: "Naturalidad de la ribera" },
  riverBankConectionsName: { alias: "Conexiones de la ribera" },
  riverBankVegetationsName: { alias: "Vegetación de la ribera" },
  weatherTodayName: { alias: "Clima hoy" },
  weather48HName: { alias: "Clima en 48 horas" },
  userCod: { alias: "Código" },
  userName: { alias: "Nombre" },
  userSurnames: { alias: "Apellidos" },
  transparencyName: { alias: "Transparencia" },
  bioQualityName: { alias: "Calidad biológica" },
  ecologicalStateName: { alias: "Estado ecológico" },
  riverBankQrisiName: { alias: "Qrisi de la ribera" },
  habitatTransversalObstacleName: {
    alias: "Obstáculo transversal del hábitat",
  },
  riverBankInvasiveName: { alias: "Invasión de la ribera" },
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
  waterFlow: { alias: "Flujo de agua" },
  waterLevelCriticalProblem: { alias: "Problema crítico del nivel de agua" },
  samplePointCoordsLon: {
    alias: "Longitud",
  },
  samplePointCoordsLat: {
    alias: "Latitud",
  },
  samplePointWidth: { alias: "Ancho" },
  samplePointDepth: { alias: "Profundidad" },
  samplePointWaterVelocity: {
    alias: "Velocidad del agua",
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
  date: { alias: "Fecha" },
  campaign: { alias: "Campaña" },
  year: { alias: "Año" },
  observations: { alias: "Observaciones" },
  rapidFrequencyList: {
    alias: "Lista de frecuencias de rápidos",
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
      name: { alias: "Nombre" },
      specie: { alias: "Especie" },
      subGroupName: { alias: "Subgrupo" },
    },
  },
  aquaticVegetationList: {
    alias: "Lista de vegetación acuática",
    internalConfig: {
      name: { alias: "Nombre" },
      coverage: { alias: "Cobertura" },
    },
  },
  randomElementList: {
    alias: "Lista de elementos aleatorios",
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
    alias: "Información general del muestreo",
    fields: [
      "id",
      "year",
      "campaign",
      "date",
      "partners",
      "weatherTodayName",
      "weather48HName",
      "observations",
    ],
  },
  riverSection: {
    alias: "Información del tramo",
    fields: [
      "idRiverSection",
      "riverSectionAlias",
      "riverSectionMunicipality",
      "riverName",
      "riverType",
      "riverCatchment",
      "riverSectionCoordsLon",
      "riverSectionCoordsLat",
    ],
  },
  user: {
    alias: "Usuario",
    fields: ["userName", "userSurnames", "userCod"],
  },
  biodiversity: {
    alias: "Biodiversidad",
    fields: ["bioQualityName", "ecologicalStateName"],
  },
  river: {
    alias: "Cauce",
    fields: [
      "waterLevelName",
      "waterColorName",
      "waterSmellName",
      "riverBedWidthName",
      "riverBedDepthName",
      "riverSideWidthLeftName",
      "riverSideWidthRightName",
    ],
  },
  conditions: {
    alias: "Afecciones",
    fields: [
      "waterFlow",
      "waterLevelCriticalProblem",
      "stonesInPoolsName",
      "sedimentMobilityName",
      "rapidsFrequencyName",
      "velocityAndDepthName",
      "riverShadowsName",
      "habitatIndexCategoriesName",
      "riverBankNaturalnessName",
    ],
  },
  puntosMuestreo: {
    alias: "Información del punto de muestreo",
    fields: [
      "samplePointCoordsLon",
      "samplePointCoordsLat",
      "samplePointWidth",
      "samplePointDepth",
      "samplePointWaterVelocity",
      "samplePointWaterTemp",
    ],
  },
  detailedSampleInfo: {
    alias: "Otros",
    // This will be filled dinamically in the SampleView component
    fields: [],
  },
};
