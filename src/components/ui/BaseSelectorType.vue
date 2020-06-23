<template>
  <div class="inner-container">
    <span v-if="isEmptyList" class="empty-list">No Options available</span>
    <vs-select
      v-else
      v-model="activeItem"
      :label="label"
      :width="widthSelect"
      autocomplete
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
    lastActiveItem: {
      type: Object,
      required: false,
      default: () => {
        return null;
      }
    }
  },
  data() {
    return {
      activeItem: {}
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
        this.selectFirstOption();
      },
      immediate: true
    },
    activeItem: {
      handler() {
        if (this.activeItem) {
          this.$emit("change", this.activeItem);
        }
      },
      deep: true
    }
  },
  mounted() {
    this.activeItem = this.lastActiveItem ? this.lastActiveItem : null;
    if (!this.activeItem) this.selectFirstOption();
  },
  methods: {
    selectFirstOption() {
      this.$nextTick(() => {
        this.activeItem = this.items[0]; // default selection
      }); // default selection
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
