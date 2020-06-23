<template>
  <div class="inner-container">
    <span v-if="isEmptyList" class="empty-list">No Options available</span>
    <ul v-else class="radio-opts label">
      <li v-for="(item, index) in items" :key="index">
        <vs-radio v-model="activeItem" :color=primaryColor :vs-value="item">{{
          item.name
        }}</vs-radio>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    },
    lastActiveItem:{
      type: Object,
      required: false
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
      handler(){
        this.selectFirstOption();
      },
      immediate:true
    },
    activeItem() {
      if (this.activeItem) {
        this.$emit("change", this.activeItem);
      }
    }
  },
  mounted(){
    this.activeItem = this.lastActiveItem ? this.lastActiveItem : {}
  },
  methods: {
    selectFirstOption() {
      this.$nextTick(() => {
      this.activeItem = this.items[0]; // default selection
      });
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

.radio-opts {
  flex-direction: row;
  display: flex;
  justify-content: space-evenly;
  flex-grow: 1;
  flex-wrap: wrap;
}

.radio-opts li {
  padding: 10px;
  margin-left: 10px;
  border-radius: 5px;
  list-style: none;
}
.empty-list {
  margin-left: 1rem;
}
</style>
