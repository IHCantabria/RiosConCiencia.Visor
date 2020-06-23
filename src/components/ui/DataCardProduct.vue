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
        <vs-list-item class="additional-Info__Icon">
          <a :href="catalogUrl" title="Go to Data Catalog" target="_blank">
            <i class="fas fa-folder"></i>
          </a>
        </vs-list-item>
        <vs-list-item title="Type of Product"
          ><span>{{ typeProduct }}</span></vs-list-item
        >
        <vs-list-item title="Source Origin"
          ><a :href="sourceUrl" title="Go to source Url" target="_blank">
            <span>{{ sourceName }}</span>
          </a></vs-list-item
        >
        <vs-list-item title="Source Ambit"
          ><span>{{ sourceType }}</span></vs-list-item
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
          :key="variable.id"
          :title="variable.longName"
        >
          <span><strong>Short Name</strong>: {{ variable.shortName }}</span>
          <span><strong>Alias</strong>: {{ variable.alias }}</span>
          <span
            ><strong>Units</strong>: {{ variable.units }}</span
          ></vs-list-item
        >
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
    catalogUrl: {
      type: String,
      required: false,
      default: () => {
        return "";
      }
    },
    typeProduct: {
      type: String,
      required: false,
      default: () => {
        return "";
      }
    },
    sourceName: {
      type: String,
      required: false,
      default: () => {
        return "";
      }
    },
    sourceType: {
      type: String,
      required: false,
      default: () => {
        return "";
      }
    },
    sourceUrl: {
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
