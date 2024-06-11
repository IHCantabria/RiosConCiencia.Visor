<script setup>
import { useSamplesStore } from "@/store/samplesStore";

const samplesStore = useSamplesStore();

const Logout = () => {
  samplesStore.setUser(null);
};
</script>

<template>
  <div class="app-logout">
    <div title="Desloguear" class="toggle-icon" @click="Logout">
      <img
        src="@/assets/svgs/logout.svg"
        alt="logout icon"
        style="pointer-events: none"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.toggle-icon {
  width: 20px;
  padding: 5px;
  margin: 0 4px 0 0;

  &:hover {
    cursor: pointer;
  }
}
</style>
