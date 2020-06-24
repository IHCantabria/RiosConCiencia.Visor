import { convertVWtoPX } from "@/utils/general-utils.js";
export const resizeHelperMixin = {
  data() {
    return {
      windowHeight: 0,
      windowWidth: 0
    };
  },
  computed: {
    computedSelectWidth() {
      return `${convertVWtoPX(this.windowWidth, 20)}px`;
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
