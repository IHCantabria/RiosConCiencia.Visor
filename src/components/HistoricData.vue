<script setup>
import { ref, onMounted } from "vue";
import { useSamplesStore } from "@/store/samplesStore.js";
import {
  HISTORIC_CHARTS_CONFIG,
  SERIES_CONFIG,
} from "@/config/charts-config.js";
import {
  BIOLOGICAL_RAMP,
  ECOLOGICAL_RAMP,
  FOREST_RAMP,
} from "@/config/data-config.js";
import ChartComponent from "@/components/ChartComponent.vue";

// STORES & COMPOSABLES
const samplesStore = useSamplesStore();

// DATA
const riverSectionInfo = ref(null);
const bioQuality = ref(null);
const ecologicalState = ref(null);
const forestState = ref(null);

// LYFE CYCLE
onMounted(() => {
  setHistoricData();
});

// METHODS
const setHistoricData = () => {
  try {
    const riverSectionSamples = setRiverSectionSamples();
    if (!riverSectionSamples.length) {
      return;
    }

    setRiverSectionInfo(riverSectionSamples[0]);

    bioQuality.value = setChartConfig(
      riverSectionSamples,
      "Calidad biológica",
      "bioQuality",
      BIOLOGICAL_RAMP,
    );
    ecologicalState.value = setChartConfig(
      riverSectionSamples,
      "Estado ecológico",
      "ecologicalState",
      ECOLOGICAL_RAMP,
    );
    forestState.value = setChartConfig(
      riverSectionSamples,
      "Estado forestal",
      "forestState",
      FOREST_RAMP,
    );
  } catch (error) {
    samplesStore.setRiverSectionHistoricData(null);
    alert("Error al cargar los datos históricos");
  }
};
const setRiverSectionSamples = () => {
  const riverSectionSamples = samplesStore.samples.filter(
    (sample) =>
      sample.idRiverSection ===
      samplesStore.riverSectionHistoricData.riverSectionId,
  );
  const orderedSamples = riverSectionSamples.sort((a, b) => {
    if (a.year > b.year) return 1;
    if (a.year < b.year) return -1;
    if (a.campaign > b.campaign) return 1;
    if (a.campaign < b.campaign) return -1;
    return 0;
  });
  return orderedSamples;
};
const setRiverSectionInfo = (riverSection) => {
  riverSectionInfo.value = {
    alias: riverSection.alias,
    catchment: riverSection.catchment,
    municipality: riverSection.municipality,
  };
};
const setChartConfig = (samples, titleText, sampleKey, ramp) => {
  return {
    ...HISTORIC_CHARTS_CONFIG,
    title: {
      ...HISTORIC_CHARTS_CONFIG.title,
      text: titleText,
    },
    series: [
      {
        ...SERIES_CONFIG,
        text: titleText,
        values: samples.map((sample) => sample[sampleKey]),
      },
    ],
    scaleY: {
      ...HISTORIC_CHARTS_CONFIG.scaleY,
      values: ramp.map((r) => r.name).reverse(),
    },
    scaleX: {
      ...HISTORIC_CHARTS_CONFIG.scaleX,
      values: samples.map((sample) => `${sample.year}-${sample.campaign}`),
    },
  };
};

const onReturnClick = () => {
  samplesStore.setRiverSectionHistoricData(null);
};
</script>

<template>
  <div class="view-container">
    <div class="show-data-container">
      <button class="close-btn" @click="onReturnClick">
        <span class="material-icons">arrow_left</span>
        Volver al mapa
      </button>
      <div v-if="riverSectionInfo" class="header">
        <h2>Datos históricos del tramo</h2>
        <div class="info-elements">
          <div class="info-element">
            <span class="bold">Tramo:</span>
            {{ samplesStore.riverSectionHistoricData.riverSectionId }} -
            {{ riverSectionInfo.alias }}
          </div>
          <div class="info-element">
            <span class="bold">Cuenca:</span> {{ riverSectionInfo.catchment }}
          </div>
          <div class="info-element">
            <span class="bold">Municipio:</span>
            {{ riverSectionInfo.municipality }}
          </div>
        </div>
      </div>
      <div class="history-data-container">
        <div class="charts">
          <ChartComponent
            v-if="bioQuality"
            :id="`bioQuality-${samplesStore.riverSectionHistoricData.riverSectionId}`"
            :config="bioQuality"
          />
          <ChartComponent
            v-if="ecologicalState"
            :id="`ecologicalState-${samplesStore.riverSectionHistoricData.riverSectionId}`"
            :config="ecologicalState"
          />
          <ChartComponent
            v-if="forestState"
            :id="`forestState-${samplesStore.riverSectionHistoricData.riverSectionId}`"
            :config="forestState"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$background-color: rgb(249 249 249);

.view-container {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow-y: auto;
  box-sizing: border-box;
  background-color: $background-color;
  padding: 0 1rem;
}

.show-data-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  position: sticky;
  top: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 2rem 0;
  background-color: $background-color;
  width: 100%;
  box-sizing: border-box;

  h2 {
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }

  .info-elements {
    border-radius: 5px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 0.5rem;
    background-color: rgb(107 139 152 / 10%);

    .info-element {
      font-weight: 400;
      font-size: 1.1rem;

      .bold {
        font-weight: 600;
        font-size: 1.2rem;
      }
    }
  }
}

.history-data-container {
  padding: 0 0.5rem;

  .charts {
    background-color: white;
    margin-top: 1rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 4rem;
    border-radius: 10px;
    box-shadow: 0 8px 8px rgb(50 50 71 / 18%);
    padding: 2rem;
  }
}

.close-btn {
  width: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  cursor: pointer;
  text-decoration: none;
  border-radius: 7px;
  padding: 0.5rem 1rem;
  margin: 0;
  position: absolute;
  top: 1rem;
  right: 3rem;
  border: 1px solid app-variables.$color-secondary;

  &:hover {
    background-color: app-variables.$color-secondary;
    color: white;
  }
}
</style>
