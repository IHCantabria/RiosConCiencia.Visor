<script setup>
import { ref } from "vue";
// DATA
const email = ref(null);
const password = ref(null);
const modalState = ref(false);

// EMITS
const emit = defineEmits(["callLogin"]);

// METHODS
const openModal = () => {
  modalState.value = true;
};
const callLogin = () => {
  modalState.value = false;
  const credentials = {
    email: email.value,
    password: password.value,
  };
  emit("callLogin", credentials);
};
</script>

<template>
  <div class="app-login">
    <div title="Login de usuario" class="login-icon" @click="openModal">
      <img
        src="@/assets/svgs/user.svg"
        alt="user icon"
        style="pointer-events: none"
      />
    </div>
    <vs-popup
      v-model:active="modalState"
      class-content="popup-login"
      title="Login a la descarga de datos"
    >
      <div class="login-container">
        <div class="login-container__inputs">
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
        </div>
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

  &__inputs {
    display: flex;
    flex-flow: row wrap;
  }
}

.item-login {
  padding: 10px 5px;
}

.item-login-buttom {
  margin-top: 10px;
}
</style>
