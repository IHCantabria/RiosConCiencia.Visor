<template>
  <div class="app-about">
    <div title="Información" class="toggle-icon" @click="openModal">
      <object
        :data="require('@/assets/svgs/about.svg')"
        type="image/svg+xml"
        style="pointer-events: none;"
      />
    </div>
    <vs-popup
      class-content="popup-about"
      title="Información del proyecto"
      :active.sync="modalState"
    >
      <div class="about-container">
        <div class="about-container__title-logo">
          <img
            src="@/assets/logos/RiosConCiencia.png"
            title="Ríos Con Ciencia"
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
              >Pulse para más información</a
            >
          </p>
        </div>
        <div class="claim-container">
          <span>Con la colaboración de:</span>
        </div>
        <div class="about-container__logos">
          <img
            src="@/assets/logos/LogoMinisterio-FECYT.png"
            title="Gobierno de España y Fundación Española para la Ciencia y la Tecnología"
          />
          <img src="@/assets/logos/RedCambera.png" title="Red Cambera" />
          <img src="@/assets/logos/ProyectoRios.png" title="Proyecto Ríos" />
        </div>
      </div>
    </vs-popup>
  </div>
</template>
<script>
export default {
  data() {
    return {
      version: process.env.VERSION,
      modalState: false
    };
  },
  methods: {
    openModal() {
      this.modalState = true;
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
.label-version {
  text-align: center;
  font-size: 0.7rem;
  display: flex;
  flex-direction: column;
  margin: 2px;
  padding: 1rem;
}
.claim-container {
  padding: 0.4rem 1rem;
  font-size: 0.7rem;
}
.about-container {
  &__title-logo {
    display: flex;
    padding: 1.5rem;
    & img {
      margin-left: auto;
      margin-right: auto;
      max-height: 10vh;
    }
  }
  &__msg-section {
    font-size: 0.8rem;
    text-align: left;
    padding: 0.5rem 1rem;
  }
  &__logos {
    display: flex;
    flex-flow: wrap row;
    justify-content: center;
    height: 100%;
    & img {
      max-height: 7vh;
      max-width: 600px;
      padding: 0.5rem 0;
      margin-left: auto;
      margin-right: auto;
    }
  }
}
</style>
