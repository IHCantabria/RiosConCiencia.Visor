<template>
  <div id="app" class="app-style grid">
    <viewer class="main"></viewer>
    <app-reset-state></app-reset-state>
  </div>
</template>
<script>
import Viewer from "@/views/Viewer.vue";
import AppResetState from "@/components/renderless/AppResetState";
export default {
  components: {
    Viewer,
    AppResetState
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.$spinner.configureModeSpinner(
        this.$spinnerEnums.ModesSpinner.progress
      );
    }
  }
};
</script>
