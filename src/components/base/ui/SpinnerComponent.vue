<script>
export default {
  name: "SpinnerComponent",
  props: {
    size: {
      type: Number,
      required: false,
      default() {
        return 28;
      },
    },
    borderWidth: {
      type: Number,
      required: false,
      default() {
        return 5;
      },
    },
    borderColor: {
      type: String,
      required: false,
      default() {
        return "#1c87c9";
      },
    },
  },
  computed: {
    spinnerStyle() {
      return {
        "--size": `${this.size}px`,
        "--border-width": `${this.borderWidth}px`,
        "--border-color": `${this.borderColor}`,
      };
    },
  },
};
</script>

<template>
  <div class="spin" :style="spinnerStyle"></div>
</template>

<style scoped>
@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.spin {
  display: inline-block;
  position: relative;
  width: var(--size);
  height: var(--size);
}

.spin::before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: solid var(--border-width) #cfd0d1;
  border-bottom-color: var(--border-color);
  border-radius: 50%;
  animation: spinner 1.5s linear infinite;
}
</style>
