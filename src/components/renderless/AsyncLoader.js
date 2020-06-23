import axios from "axios";
export default {
  props: {
    url: {
      type: String,
      default: () => {
        return "";
      },
      required: true
    },
    params: { type: Object, required: false, default: () => ({}) }
  },
  data() {
    return {
      pending: false,
      error: false,
      data: null
    };
  },
  watch: {
    url() {
      this.init();
    },
    params: {
      handler() {
        this.pending ? "" : this.init();
      },
      deep: true
    },
    pending: {
      handler(newValue) {
        this.$emit("stateRequest", newValue);
      }
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.setDefaultValues();
      this.requestData();
    },
    async requestData() {
      this.pending = true;
      try {
        const { data } = await axios.get(this.url, { params: this.params });
        this.data = data;
        this.error = false;
      } catch (e) {
        this.data = null;
        this.error = e;
      } finally {
        this.pending = false;
        this.$nextTick(() => {
          this.$emit("errorHandler", this.error);
          this.$emit("requestFinished", this.data);
        });
      }
    },
    setDefaultValues() {
      this.error = false;
      this.data = null;
    }
  },
  render: () => null
};
