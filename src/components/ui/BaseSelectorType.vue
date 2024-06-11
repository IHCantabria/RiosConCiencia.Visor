<script setup>
import { ref, onMounted, watch, computed, nextTick } from "vue";

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
  lastActiveItem: {
    type: Object,
    required: false,
    default: () => {
      return null;
    },
  },
});

// DATA
const activeItem = ref({});

// EMITS
const emit = defineEmits(["change"]);

// COMPUTED
const isEmptyList = computed(() => {
  return props.items.length === 0;
});

// LYFE CYCLE HOOKS
onMounted(() => {
  activeItem.value = props.lastActiveItem ? props.lastActiveItem : null;
  if (!activeItem.value) selectFirstOption();
});

// METHODS
const selectFirstOption = async () => {
  await nextTick();
  if (!activeItem.value) {
    activeItem.value = props.items[0];
  }
};

// WATCHERS
watch(
  () => props.items,
  () => {
    selectFirstOption();
  },
  { immediate: true },
);
watch(
  () => activeItem.value,
  () => {
    if (activeItem.value) {
      emit("change", activeItem.value);
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
      v-model="activeItem"
      :label="props.label"
      :width="props.widthSelect"
    >
      <vs-select-item
        v-for="(item, index) in props.items"
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
  margin: 10px;
}
</style>
