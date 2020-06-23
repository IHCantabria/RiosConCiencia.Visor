import { convertVHtoPX, convertVWtoPX } from "@/utils/general-utils.js";
export const resizeHelperMixin = {
  data() {
    return {
      windowHeight: 0,
      windowWidth: 0
    };
  },
  computed: {
    computedTableMaxHeightProducts() {
      return this.productsExpanded
        ? `${convertVHtoPX(this.windowHeight, 98) - 120}px`
        : `${convertVHtoPX(this.windowHeight, 38) - 120}px`;
    },
    computedTableMaxHeightSensors() {
      return this.sensorsExpanded
        ? `${convertVHtoPX(this.windowHeight, 98) - 120}px`
        : `${convertVHtoPX(this.windowHeight, 38) - 120}px`;
    },
    computedSelectWidth() {
      return `${convertVWtoPX(this.windowWidth, 20)}px`;
    },
    computedTableMaxItemsProducts() {
      return this.productsExpanded ? 45 : 15;
    },
    computedTableMaxItemsSensors() {
      return this.sensorsExpanded ? 45 : 15;
    }
  },
  methods: {
    setEventResize() {
      this.windowHeight = window.innerHeight;
      this.windowWidth = window.innerWidth;
      this.$nextTick(() => {
        window.addEventListener("resize", () => {
          this.windowHeight = window.innerHeight;
          this.windowWidth = window.innerWidth;
        });
      });
    }
  }
};
