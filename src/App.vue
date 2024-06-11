<script setup>
import MainView from "@/views/MainView.vue";
import BaseSpinner from "@/components/ui/BaseSpinner.vue";
import { onMounted } from "vue";
import { useSpinnerStore } from "@/store/spinnerStore";

const spinnerStore = useSpinnerStore();

onMounted(() => {
  init();
});

const init = () => {
  spinnerStore.configureModeSpinner();
};
</script>

<template>
  <div id="app" class="app-style">
    <MainView />
    <BaseSpinner />
  </div>
</template>

<style lang="scss">
@use "@/styles";

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
