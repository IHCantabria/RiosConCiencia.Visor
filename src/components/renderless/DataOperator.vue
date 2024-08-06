<script setup>
import { watch, onMounted } from "vue";
import { useSamplesStore } from "@/store/samplesStore";

const samplesStore = useSamplesStore();

// Define props
const props = defineProps({
  data: {
    type: [Array, Object],
    default: null,
    required: false,
  },
  processLogic: {
    type: Function,
    default: null,
    required: false,
  },
  dispatcher: {
    type: String,
    default: null,
    required: false,
  },
  additionalInfo: {
    type: Object,
    default: null,
    required: false,
  },
});

// Define emits
const emit = defineEmits([
  "dataProcessed",
  "errorOperationHandler",
  "operationFinished",
]);

// Watchers
watch(
  () => props.data,
  () => {
    init();
  },
  { deep: true },
);
watch(
  () => props.processLogic,
  () => {
    init();
  },
  { deep: true },
);
watch(
  () => props.dispatcher,
  () => {
    init();
  },
);

// onMounted lifecycle hook
onMounted(() => {
  init();
});

// Methods
const init = () => {
  if (props.data) {
    prepareData();
  } else {
    callDispatcher();
  }
};

const prepareData = () => {
  const dataPrepared = Operate();
  if (dataPrepared != null) {
    if (props.dispatcher) {
      samplesStore[props.dispatcher](dataPrepared);
    } else {
      emit("dataProcessed", dataPrepared);
    }
  } else {
    emit("errorOperationHandler", true);
  }
  emit("operationFinished");
};

const Operate = () => {
  if (props.additionalInfo && props.processLogic) {
    return props.processLogic(props.data, props.additionalInfo);
  } else if (props.processLogic) {
    return props.processLogic(props.data);
  }
  return props.data;
};

const callDispatcher = () => {
  if (props.dispatcher) {
    samplesStore[props.dispatcher]();
  }
  emit("operationFinished");
};
</script>

<template><div></div></template>
