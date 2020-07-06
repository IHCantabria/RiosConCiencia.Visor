<template>
  <div class="inner-container">
    <span v-if="isEmptyList" class="empty-list"
      >No hay Opciones Disponibles</span
    >
    <vs-select
      v-else
      v-model="activeItems"
      :label="label"
      placeholder="Seleccione campañas"
      multiple
      :width="widthSelect"
    >
      <vs-select-item
        v-for="(item, index) in items"
        :key="index"
        class="selectStyle"
        :value="item"
        :text="item.name"
      />
    </vs-select>
  </div>
</template>
<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    },
    label: {
      type: String,
      required: false,
      default: () => {
        return "";
      }
    },
    widthSelect: {
      type: String,
      required: false,
      default: () => {
        return "400px";
      }
    },
    lastActiveItems: {
      type: Array,
      required: false,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      activeItems: []
    };
  },
  computed: {
    isEmptyList() {
      return this.items.length === 0;
    }
  },
  watch: {
    items: {
      handler() {
        this.init();
      },
      immediate: true
    },
    activeItems: {
      handler(newValue) {
        const allFilterIndex = this.activeItems.findIndex(item => item.id == 0);
        if (allFilterIndex == -1) {
          //Option All is not present, normal logic
          this.$emit("change", this.activeItems);
        } else if (newValue.length == 1) {
          //the is only one element selected, normal logic
          this.$emit("change", this.activeItems);
        } else if (newValue.length == allFilterIndex + 1) {
          //the option All is the new option selected, remove other options
          this.activeItems = [this.activeItems[allFilterIndex]];
        } else {
          //the option All is the old option selected, remove it
          this.activeItems.splice(allFilterIndex, 1);
        }
      },
      deep: true
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.activeItems = this.lastActiveItems.length
        ? this.lastActiveItems
        : [];
    }
  }
};
</script>
<style lang="scss" scoped>
.inner-container {
  display: flex;
  flex-grow: 1;
  justify-content: flex-start;
  align-items: center;
}

.selectStyle {
  margin: 10px;
}
</style>
