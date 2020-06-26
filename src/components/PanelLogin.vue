<template>
  <div class="app-login">
    <div title="Login de usuario" class="login-icon" @click="openModal">
      <object
        :data="require('@/assets/user.svg')"
        type="image/svg+xml"
        style="pointer-events: none;"
      />
    </div>
    <vs-popup
      class-content="popup-login"
      title="Login a la descarga de datos"
      :active.sync="modalState"
    >
      <div class="login-container">
        <vs-input
          v-model="email"
          type="text"
          label="Usuario de la aplicación"
          icon="account_circle"
          class="item-login"
          placeholder="email"
        />
        <vs-input
          v-model="password"
          class="item-login"
          type="password"
          label="Contraseña de usuario"
          icon="lock"
          placeholder="contraseña"
        />
        <vs-button
          class="item-login item-login-buttom"
          color="primary"
          type="filled"
          @click="callLogin"
          >Login</vs-button
        >
      </div>
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
}
.login-icon {
  width: 20px;
  padding: 5px;
  margin: 0 4px 0 0;
  &:hover {
    cursor: pointer;
  }
}
.login-container {
  display: flex;
  flex-direction: column;
}
.item-login {
  padding: 10px 5px;
}
.item-login-buttom {
  margin-top: 10px;
}
</style>
