<script setup>
import { ref, computed, watch, onMounted } from "vue";

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  label: {
    type: String,
    required: false,
    default: () => {
      return "";
    },
  },
  widthSelect: {
    type: String,
    required: false,
    default: () => {
      return "400px";
    },
  },
  lastActiveItems: {
    type: Array,
    required: false,
    default: () => {
      return [];
    },
  },
});

const emit = defineEmits(["change"]);

const activeItems = ref([]);

const isEmptyList = computed(() => {
  return props.items.length === 0;
});

onMounted(() => {
  init();
});

const init = () => {
  activeItems.value = props.lastActiveItems.length ? props.lastActiveItems : [];
};

// WATCHERS
watch(
  () => props.items,
  () => {
    init();
  },
  { immediate: true },
);
watch(
  () => activeItems.value,
  (newValue) => {
    const allFilterIndex = newValue.findIndex((item) => item.id == 0);
    if (allFilterIndex == -1) {
      //Option All is not present, normal logic
      emit("change", newValue);
    } else if (newValue.length == 1) {
      //the is only one element selected, normal logic
      emit("change", newValue);
    } else if (newValue.length == allFilterIndex + 1) {
      //the option All is the new option selected, remove other options
      activeItems.value = [newValue[allFilterIndex]];
    } else {
      //the option All is the old option selected, remove it
      activeItems.value.splice(allFilterIndex, 1);
    }
  },
  { deep: true },
);
</script>

<template>
  <div class="inner-container">
    <span v-if="isEmptyList" class="empty-list"
      >No hay Opciones Disponibles</span
    >
    <vs-select
      v-else
      v-model="activeItems"
      :label="label"
      placeholder="Seleccione campañas"
      multiple
      :width="widthSelect"
    >
      <vs-select-item
        v-for="(item, index) in items"
        :key="index"
        class="select-style"
        :model-value="item"
        :text="item.name"
      />
    </vs-select>
  </div>
</template>

<style scoped lang="scss">
.inner-container {
  display: flex;
  flex-grow: 1;
  justify-content: flex-start;
  align-items: center;
}

.select-style {
  padding-right: 25px;
  margin: 10px;
}
</style>
