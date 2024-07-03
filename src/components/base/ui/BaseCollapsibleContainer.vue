<script setup>
import { ref, computed, watch } from "vue";

const props = defineProps({
  hiddenByDefault: {
    type: Boolean,
    required: false,
    default: true,
  },
  collapsible: {
    type: Boolean,
    required: false,
    default: true,
  },
  customClass: {
    type: String,
    required: false,
    default() {
      return "";
    },
  },
});

const emit = defineEmits(["toggleBody"]);

const bodyIsHidden = ref(props.hiddenByDefault);

// COMPUTED
const title = computed(() => {
  return bodyIsHidden.value ? "Mostrar" : "Ocultar";
});

// METHODS
const enter = (element) => {
  const width = getComputedStyle(element).width;

  element.style.width = width;
  element.style.position = "absolute";
  element.style.visibility = "hidden";
  element.style.height = "auto";

  const height = getComputedStyle(element).height;

  element.style.width = null;
  element.style.position = null;
  element.style.visibility = null;
  element.style.height = 0;

  // Force repaint to make sure the
  // animation is triggered correctly.
  getComputedStyle(element).height;

  // Trigger the animation.
  // We use `requestAnimationFrame` because we need
  // to make sure the browser has finished
  // painting after setting the `height`
  // to `0` in the line above.
  requestAnimationFrame(() => {
    element.style.height = height;
  });
};
const afterEnter = (element) => {
  element.style.height = "auto";
};
const leave = (element) => {
  const height = getComputedStyle(element).height;

  element.style.height = height;

  // Force repaint to make sure the
  // animation is triggered correctly.
  getComputedStyle(element).height;

  requestAnimationFrame(() => {
    element.style.height = 0;
  });
};
const toggleBody = () => {
  bodyIsHidden.value = !bodyIsHidden.value;
  emit("toggleBody", !bodyIsHidden.value);
};

// WATCHERS
watch(
  () => props.hiddenByDefault,
  (newValue) => {
    bodyIsHidden.value = newValue;
  },
);

// EXPOSE
defineExpose({
  toggleBody,
  bodyIsHidden,
});
</script>
<template>
  <div class="box" :class="customClass">
    <p
      v-if="collapsible"
      class="clickable collapsible-title"
      :class="{ 'collapsible-title--opened': !bodyIsHidden }"
      @click="toggleBody"
    >
      <span>{{ title }}</span>
      <span>
        <span v-if="bodyIsHidden" class="material-icons">expand_more</span>
        <span v-else class="material-icons">expand_less</span>
      </span>
      <slot name="header"> </slot>
    </p>

    <transition
      name="expand"
      @enter="enter"
      @after-enter="afterEnter"
      @leave="leave"
    >
      <div
        v-show="!bodyIsHidden"
        class="block has-text-left body-question mt-4"
      >
        <slot>
          <!-- Body  -->
        </slot>
      </div>
    </transition>
  </div>
</template>
<style lang="scss" scoped>
.clickable {
  cursor: pointer;
}

.collapsible-title {
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  padding: 0.5rem;
  color: app-variables.$color-text-solid;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;

  &--opened {
    border-radius: 6px 6px 0 0;
  }
}

.expand-enter-active,
.expand-leave-active {
  transition: height 0.15s ease-in-out;
  overflow: hidden;
}

.expand-enter,
.expand-leave-to {
  height: 0;
}

.body-question {
  font-size: 1rem;
  overflow: hidden;

  // Browser will use hardware acceleration for better performance
  will-change: height;
  transform: translateZ(0);
  backface-visibility: hidden;
  background-color: #fff;
  border-radius: 0 0 6px 6px;
  padding: 0 0.8rem;
}

.box {
  border-radius: 6px;
  color: app-variables.$color-text-solid;
  box-sizing: border-box;
  margin: 0;
  width: 100%;

  // border: 1px solid app-variables.$color-secondary;

  &:hover {
    transition: all 0.2s ease-in-out;
    background-color: rgb(243 243 243);
  }
}
</style>
