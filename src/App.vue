<template>
  <div id="app" class="app-style grid">
    <viewer class="main"></viewer>
  </div>
</template>
<script>
import Viewer from "@/views/Viewer.vue";

export default {
  components: {
    viewer: Viewer
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
