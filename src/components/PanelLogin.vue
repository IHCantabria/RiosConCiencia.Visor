<template>
  <div class="app-login">
    <vs-button color="primary" type="filled" @click="openModal"
      >LaunchLogin</vs-button
    >
    <vs-popup
      class-content="popup-login"
      title="Lorem ipsum dolor sit amet"
      :active.sync="modalState"
    >
      <vs-input v-model="email" class="inputx" placeholder="Placeholder" />
      <vs-input v-model="password" class="inputx" placeholder="Disabled" />
      <vs-button color="primary" type="filled" @click="callLogin"
        >Login</vs-button
      >
    </vs-popup>
  </div>
</template>
<script>
export default {
  data() {
    return {
      email: null,
      password: null,
      modalState: false
    };
  },
  computed: {},
  methods: {
    openModal() {
      this.modalState = true;
    },
    callLogin() {
      this.modalState = false;
      const credentials = {
        email: this.email,
        password: this.password
      };
      this.$root.$emit("callLogin", credentials);
    }
  }
};
</script>
<style scoped lang="scss">
.app-login {
  width: 100%;
}
</style>
