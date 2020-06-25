<template>
  <div class="app-info">
    <panel-about class="panel-about"></panel-about>
    <panel-filters></panel-filters>
    <panel-login></panel-login>
  </div>
</template>
<script>
import AppAbout from "@/components/layout/AppAbout.vue";
import PanelFilters from "@/components/PanelFilters.vue";
import PanelLogin from "@/components/PanelLogin.vue";
export default {
  components: {
    "panel-about": AppAbout,
    "panel-login": PanelLogin,
    "panel-filters": PanelFilters
  }
};
</script>
<style scoped lang="scss">
.app-info {
  position: absolute;
  top: 80%;
  width: 100%;
  background-color: lightgray;
}
</style>
