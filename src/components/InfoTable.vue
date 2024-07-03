<script setup>
import BaseCollapsibleContainer from "@/components/base/ui/BaseCollapsibleContainer.vue";
import { parseDate } from "@/utils/helper.js";
import { SAMPLE_INFO_CONFIG } from "@/config/sample-info-config.js";

defineProps({
  group: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <table class="info-table" aria-label="table">
    <thead>
      <tr>
        <th>Campo</th>
        <th>Valor</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(value, field) in group"
        :key="field"
        :class="{
          'full-width': SAMPLE_INFO_CONFIG[field]?.internalConfig,
        }"
      >
        <td class="bold">
          {{ SAMPLE_INFO_CONFIG[field]?.alias || field }}
        </td>
        <td>
          <span v-if="!SAMPLE_INFO_CONFIG[field]?.internalConfig" class="value">
            {{
              field === "date"
                ? parseDate(value)
                : typeof value === "boolean"
                  ? value
                    ? "Sí"
                    : "No"
                  : value
            }}
          </span>
          <BaseCollapsibleContainer
            v-else
            :title="'Ver lista'"
            class="sub-group-elements"
          >
            <div v-for="item in value" :key="item" class="sub-group-element">
              <div
                v-for="internalConfigItem in Object.keys(
                  SAMPLE_INFO_CONFIG[field].internalConfig,
                )"
                :key="internalConfigItem"
                class="sub-info-element"
              >
                <span class="bold">
                  {{
                    SAMPLE_INFO_CONFIG[field].internalConfig[internalConfigItem]
                      .alias
                  }}:
                </span>
                <span class="value">{{ item[internalConfigItem] }}</span>
              </div>
            </div>
          </BaseCollapsibleContainer>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.info-table {
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    border: 1px solid #ccc;
    padding: 0.4rem;
    text-align: left;
  }

  th {
    background-color: #f2f2f2;
  }

  th:first-of-type,
  td:first-of-type {
    max-width: 300px;
    width: 300px;
  }

  th:first-of-type {
    white-space: nowrap;
  }

  .bold {
    font-weight: 600;
  }

  .value {
    font-weight: 400;
  }

  .sub-group-elements {
    width: 100%;
    border-radius: 5px;
    margin-left: 0;
    box-sizing: border-box;

    .sub-group-element {
      width: 100%;
      display: flex;
      flex-flow: column wrap;
      justify-content: center;
      padding: 0.2rem;
      border-bottom: 1px solid #6b8b98;

      &:first-child {
        margin-top: 1rem;
      }

      &:last-child {
        border-bottom: none;
        padding-bottom: 0;
      }

      .sub-info-element {
        font-weight: 400;
        font-size: 0.9rem;
        text-align: left;
        width: fit-content;
        display: flex;
        align-items: end;
        justify-content: center;
        gap: 0.3rem;

        .bold {
          font-weight: 600;
          font-size: 0.95rem;
        }
      }
    }
  }
}

@media (width <= 768px) {
  .info-table {
    th:first-of-type,
    td:first-of-type {
      max-width: none;
      width: auto;
    }

    /* stylelint-disable-next-line no-descending-specificity */
    th,
    td {
      font-size: 0.9rem;
      padding: 0.3rem;
    }
  }
}
</style>
