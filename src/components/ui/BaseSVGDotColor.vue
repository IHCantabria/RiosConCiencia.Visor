<template>
  <div class="svg-dot-container">
    <svg class="svg-dot-color" :style="cssVars">
      <rect
        x="0"
        y="0"
        :rx="borderRadius"
        :ry="borderRadius"
        :width="sizePx"
        :height="sizePx"
        style="stroke-opacity: 1; stroke-linejoin: round; stroke-linecap: round; stroke-width: 3; fill-opacity: 0.2; fill-rule: evenodd;"
      />
    </svg>
  </div>
</template>
<script>
export default {
  props: {
    size: {
      type: Number,
      required: false,
      default: () => {
        return 29;
      }
    },
    color: {
      type: String,
      required: true,
      default: () => {
        return "#FFFFFF";
      }
    },
    borderRadius: {
      type: Number,
      required: false,
      default: () => {
        return 10;
      }
    }
  },
  computed: {
    sizePx() {
      return `${this.size}px`;
    },
    cssVars() {
      return {
        "--size": `${this.sizePx}`,
        "--backgroundColor": `${this.color}`
      };
    }
  }
};
</script>
<style lang="scss" scoped>
.svg-dot-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.svg-dot-color {
  width: var(--size);
  height: var(--size);

  rect {
    stroke: var(--backgroundColor);
    fill: var(--backgroundColor);
  }
}
</style>
