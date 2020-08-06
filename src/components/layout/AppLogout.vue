<template>
  <div class="app-logout">
    <div title="Desloguear" class="toggle-icon" @click="Logout">
      <object
        :data="require('@/assets/svgs/logout.svg')"
        type="image/svg+xml"
        style="pointer-events: none;"
      />
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    Logout() {
      this.$root.$emit("logout");
    }
  }
};
</script>
<style lang="scss" scoped>
.toggle-icon {
  width: 20px;
  padding: 5px;
  margin: 0 4px 0 0;
  &:hover {
    cursor: pointer;
  }
}
</style>
