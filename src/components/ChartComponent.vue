<script setup>
import { onMounted, onUnmounted, nextTick, watch } from "vue";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  config: {
    type: Object,
    required: false,
    default: () => ({}),
  },
  styles: {
    type: Object,
    required: false,
    default: () => ({
      height: "auto",
      minHeight: "250px",
      width: "100%",
      maxWidth: "100%",
    }),
  },
});

onMounted(async () => {
  await nextTick();
  init();
});
onUnmounted(() => {
  zingchart.exec(props.id, "destroy");
});

const init = () => {
  renderChart();
};

const renderChart = () => {
  zingchart.render({
    id: props.id,
    data: { ...props.config },
    height: props.styles.height,
    width: props.styles.width,
  });
};

watch(
  () => props.config,
  async (newVal, oldVal) => {
    if (newVal === oldVal) return;
    if (newVal) {
      await nextTick();
      init();
    }
  },
);
</script>

<template>
  <div :id="id" class="chart-container"></div>
</template>

<style lang="scss" scoped>
.chart-container {
  height: auto;
  min-height: 350px;
  width: 100%;
  max-width: 100%;
}

.zc-ref {
  display: none;
}
</style>
