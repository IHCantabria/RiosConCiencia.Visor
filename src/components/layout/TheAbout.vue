<script setup>
import { ref } from "vue";

const version = __APP_VERSION__;
const modalState = ref(false);

const openModal = () => {
  modalState.value = true;
};
</script>

<template>
  <div class="app-about">
    <div title="Información" class="toggle-icon" @click="openModal">
      <img
        src="@/assets/svgs/about.svg"
        alt="about icon"
        style="pointer-events: none"
      />
    </div>
    <vs-popup
      v-model:active="modalState"
      class-content="popup-about"
      title="Información del proyecto"
    >
      <div class="about-container">
        <div class="about-container__title-logo">
          <img
            src="@/assets/logos/RiosConCiencia.png"
            title="Ríos Con Ciencia"
            alt="rios con ciencia img"
          />
        </div>
        <label class="label-version">
          <span><strong>Geovisor del proyecto RiosConCiencia</strong></span>
          <span><strong>Versión:</strong> {{ version }} </span>
        </label>
        <div class="about-container__msg">
          <p class="about-container__msg-section">
            RíosConCiencia Visor es una herramienta digital que facilita la
            observación y el análisis de los datos recopilados en campo por
            parte de personas voluntarias a través de la aplicación móvil
            RíosConCienciApp en el marco del Proyecto Ríos.
          </p>
          <p class="about-container__msg-section">
            Proyecto Ríos es una iniciativa de voluntariado ambiental que se
            desarrolla en Cantabria desde el año 2008, capacitando a la
            ciudadanía en el conocimiento, puesta en valor y mejora de los
            ecosistemas fluviales.
          </p>
          <p class="about-container__msg-section">
            Este proyecto cuenta con la colaboración de la Fundación Española
            para la Ciencia y la Tecnología del Ministerio de Ciencia e
            Innovación.
          </p>
          <p class="about-container__msg-section">
            <a
              href="https://redcambera.org/proyectos/riosconciencia/"
              target="_blank"
              >Pulse aquí para más información del proyecto.</a
            >
          </p>
        </div>
        <div class="about-container__logos">
          <div class="logo">
            <div class="claim-container">
              <span>Con la colaboración de:</span>
            </div>
            <img
              src="@/assets/logos/LogoMinisterio-FECYT.png"
              title="Gobierno de España y Fundación Española para la Ciencia y la Tecnología"
              alt="fecyt img"
            />
          </div>
          <div class="logo">
            <div class="claim-container">
              <span>Un proyecto de:</span>
            </div>
            <img
              src="@/assets/logos/RedCambera.png"
              title="Red Cambera"
              alt="red cambera img"
            />
          </div>
          <div class="logo-without-claim">
            <img
              src="@/assets/logos/ProyectoRios.png"
              title="Proyecto Ríos"
              alt="proyecto rios img"
            />
          </div>
        </div>
      </div>
    </vs-popup>
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

.label-version {
  text-align: center;
  font-size: 0.7rem;
  display: flex;
  flex-direction: column;
  padding: 0.5rem 1rem;
}

.about-container {
  &__title-logo {
    display: flex;
    padding: 0.5rem 1rem;

    & img {
      margin-left: auto;
      margin-right: auto;
      max-height: 9vh;
    }
  }

  &__msg-section {
    font-size: 0.7rem;
    text-align: left;
    padding: 0.25rem 1rem;
  }

  &__logos {
    display: flex;
    flex-flow: wrap row;
    justify-content: center;
    height: 100%;
    width: 100%;
    padding-bottom: 1rem;

    .logo {
      padding: 0.5rem 1rem;
      max-height: 7vh;

      & img {
        max-height: 5.5vh;
        height: 100%;
      }
    }

    .logo-without-claim {
      padding: 0.5rem 1rem;
      max-height: 7vh;

      & img {
        max-height: 7vh;
        height: 100%;
      }
    }
  }
}

.claim-container {
  display: flex;
  text-align: left;
  font-style: italic;
  font-weight: bold;
  margin-left: auto;
  margin-right: auto;
  font-size: 0.7rem;
}
</style>
