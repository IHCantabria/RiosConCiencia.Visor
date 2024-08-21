<script setup>
import { ref, onMounted, watch, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useSpinnerStore } from "@/store/spinnerStore.js";
import { useSamplesStore } from "@/store/samplesStore.js";
import {
  getSampleDetailed,
  getSampleDetailedWithUserInfo,
} from "@/api/apiRios.js";
import {
  SAMPLE_INFO_CONFIG,
  SAMPLE_INFO_GROUPS_CONFIG,
} from "@/config/sample-info-config.js";
import { isValidValue } from "@/utils/helper.js";
import NoDataImg from "@/assets/no-data.jpg";
import InfoTable from "@/components/InfoTable.vue";

// STORES & COMPOSABLES
const route = useRoute();
const router = useRouter();
const spinnerStore = useSpinnerStore();
const samplesStore = useSamplesStore();

// DATA
const sampleInfo = ref(null);
const showNoInfoError = ref(false);

// LYFE CYCLE
onMounted(() => {
  setSampleInfo();
});
onUnmounted(() => {
  spinnerStore.hide();
});

// METHODS
const setSampleInfo = async () => {
  try {
    showNoInfoError.value = false;
    sampleInfo.value = null;
    spinnerStore.addTask("loadSampleData", "Cargando datos del muestreo");
    spinnerStore.show();
    const sampleSectionId = route.params.idSample;
    let sampleDetailedInfo = null;
    if (samplesStore.getAdminLogged) {
      sampleDetailedInfo = await getSampleDetailedWithUserInfo(
        samplesStore.getUserToken,
        sampleSectionId,
      );
    } else {
      sampleDetailedInfo = await getSampleDetailed(sampleSectionId);
    }
    const parsedSampleInfo = parseSampleInfo(sampleDetailedInfo);
    if (parsedSampleInfo) {
      sampleInfo.value = parsedSampleInfo;
    }
  } catch (error) {
    showNoInfoError.value = true;
  } finally {
    spinnerStore.hide();
  }
};

const parseSampleInfo = (sampleInfo) => {
  const groupedSampleInfo = {};
  const assignedFields = new Set();

  // Assign fields to their respective groups
  Object.keys(SAMPLE_INFO_GROUPS_CONFIG).forEach((groupKey) => {
    const groupFields = {};

    SAMPLE_INFO_GROUPS_CONFIG[groupKey].fields.forEach((field) => {
      // Skip if field is not present in sampleInfo, it means the user is not allowed to see it
      if (sampleInfo[field] === undefined) return;
      if (isValidValue(sampleInfo[field])) {
        groupFields[field] = sampleInfo[field];
        assignedFields.add(field);
      } else {
        groupFields[field] = "-";
      }
    });

    if (Object.keys(groupFields).length > 0) {
      groupedSampleInfo[groupKey] = groupFields;
    }
  });

  // Assign remaining fields to detailedSampleInfo
  const detailedSampleInfo = {};
  Object.keys(SAMPLE_INFO_CONFIG).forEach((field) => {
    if (
      sampleInfo[field] !== undefined &&
      isValidValue(sampleInfo[field]) &&
      !assignedFields.has(field)
    ) {
      detailedSampleInfo[field] = sampleInfo[field];
    }
  });

  if (Object.keys(detailedSampleInfo).length > 0) {
    groupedSampleInfo["detailedSampleInfo"] = detailedSampleInfo;
  }

  return groupedSampleInfo;
};
const onReturnClick = () => {
  spinnerStore.addTask("returnToMap", "Volviendo al mapa...");
  spinnerStore.show();
  router.push("/");
};

// WATCH
watch(
  () => route.params,
  () => {
    setSampleInfo();
  },
);
</script>

<template>
  <div
    class="view-container"
    :class="{ 'view-container--error': showNoInfoError }"
  >
    <div class="show-data-container">
      <button class="close-btn" @click="onReturnClick">
        <span class="material-icons">arrow_left</span>
        Volver al mapa
      </button>
      <div v-if="sampleInfo">
        <div class="header">
          <h2>Datos del muestreo</h2>
        </div>
        <div class="groups-container">
          <div
            v-for="(group, groupKey) in sampleInfo"
            :key="groupKey"
            class="info-group"
          >
            <h3>{{ SAMPLE_INFO_GROUPS_CONFIG[groupKey].alias }}</h3>
            <InfoTable :group="group" />
          </div>
        </div>
      </div>
      <div v-if="showNoInfoError" class="error-container">
        <p>No se encontraron datos para este muestreo</p>
        <img :src="NoDataImg" alt="No data" />
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
  z-index: 98;

  &--error {
    justify-content: center;
  }
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
}

.groups-container {
  border-radius: 5px;
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 1.5rem;

  .info-group {
    width: 100%;
    padding: 1rem;
    border-radius: 5px;
    box-shadow: 0 0 5px rgb(0 0 0 / 10%);
    background-color: white;

    h3 {
      font-size: 1.3rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: app-variables.$color-secondary;
      text-align: left;
    }
  }
}

.error-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    font-size: 1.5rem;
    font-weight: 600;
    color: app-variables.$color-secondary;
    text-align: center;
    margin-bottom: 2rem;
  }

  img {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    mask-image: radial-gradient(circle, white 30%, transparent 100%);
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
  color: app-variables.$color-secondary;

  &:hover {
    background-color: app-variables.$color-secondary;
    color: white;
  }
}

// Responsive Styles
@media (min-width: app-variables.$breakpoint-tablet-to-desktop) {
  .groups-container {
    padding: 1rem;

    .info-group {
      padding: 0.5rem;

      h3 {
        font-size: 1.2rem;
        margin-bottom: 0.5rem;
      }
    }
  }
}
</style>
