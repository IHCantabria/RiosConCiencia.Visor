<template>
  <div class="app-about">
    <vs-dropdown
      title="About"
      class="toggler"
      vs-trigger-click
      vs-custom-content
    >
      <div class="toggle-icon">
        <object
          :data="require('@/assets/about.svg')"
          type="image/svg+xml"
          style="pointer-events: none;"
        />
      </div>
      <vs-dropdown-menu>
        <div class="about-container">
          <label class="label-version">Version {{ version }}</label>
        </div>
      </vs-dropdown-menu>
    </vs-dropdown>
  </div>
</template>
<script>
export default {
  data() {
    return {
      version: process.env.VERSION
    };
  }
};
</script>
<style lang="scss" scoped>
.toggler {
  &:hover {
    cursor: pointer;
  }
}
.toggle-icon {
  width: 26px;
  padding: 5px;
  margin: 0 4px 0 0;
  &:hover {
    cursor: pointer;
  }
}
.label-version {
  margin: 2px;
}
.about-container {
  justify-content: space-between;
  display: flex;
  flex-flow: nowrap row;
}
</style>
