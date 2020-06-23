<template>
  <div class="overviewcard">
    <div class="overviewcard__description">
      <vs-list class="additional-Info">
        <vs-list-item class="additional-Info__Icon">
          <i
            :class="[openLicense ? 'fas fa-unlock' : 'fas fa-lock']"
            :title="licenseType"
          ></i>
        </vs-list-item>
        <vs-list-item title="Latitude">
          <span>{{ latitude }}</span></vs-list-item
        >
        <vs-list-item title="Longitude"
          ><span>{{ longitude }}</span></vs-list-item
        >
        <vs-list-item title="Height">
          <span>{{ height }}</span></vs-list-item
        >
        <vs-list-item title="Proyect Name"
          ><span>{{ proyectName }}</span></vs-list-item
        >
        <vs-list-item title="Location"
          ><span>{{ location }}</span></vs-list-item
        >
      </vs-list>
      <vs-list class="variables-Info">
        <vs-list-header
          icon="info"
          title="Variables Info"
          color="primary"
        ></vs-list-header>
        <vs-list-item
          v-for="variable in variables"
          :key="variable.code"
          :title="variable.name"
        >
          <span
            ><strong>observations</strong>: {{ variable.observations }}</span
          >
          <span><strong>Units</strong>: {{ variable.units }}</span>
        </vs-list-item>
      </vs-list>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    openLicense: {
      type: Boolean,
      required: false,
      default: () => {
        return false;
      }
    },
    licenseType: {
      type: String,
      required: false,
      default: () => {
        return "";
      }
    },
    longitude: {
      type: Number,
      required: false,
      default: () => {
        return 0;
      }
    },
    latitude: {
      type: Number,
      required: false,
      default: () => {
        return 0;
      }
    },
    height: {
      type: Number,
      required: false,
      default: () => {
        return 0;
      }
    },
    proyectName: {
      type: String,
      required: false,
      default: () => {
        return "";
      }
    },
    location: {
      type: String,
      required: false,
      default: () => {
        return "";
      }
    },
    variables: {
      type: Array,
      required: false,
      default: () => {
        return [];
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.overviewcard {
  border-top: solid $color-primary;
  border-bottom: solid $color-primary;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: $color-very-light-grey;

  &__description {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
