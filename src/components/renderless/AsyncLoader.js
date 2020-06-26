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
    params: { type: Object, required: false, default: () => ({}) },
    method: {
      type: String,
      required: true,
      default: () => {
        return "get";
      }
    },
    body: { type: Object, required: false, default: () => ({}) }
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
        if (this.method == "postFile") {
          await axios
            .post(this.url, this.body, {
              responseType: "arraybuffer",
              headers: this.params
            })
            .then(response => {
              const blob = new Blob([response.data], {
                type: "application/zip"
              });
              const downloadUrl = window.URL.createObjectURL(blob);
              const link = document.createElement("a");
              link.href = downloadUrl;
              link.setAttribute("download", "Muestras.zip"); //any other extension
              document.body.appendChild(link);
              link.click();
              link.remove();
              window.URL.revokeObjectURL(downloadUrl);
              return true;
            });
          this.data = [];
        } else if (this.method == "get") {
          const { data } = await axios.get(this.url, { headers: this.params });
          this.data = data;
        } else {
          const { data } = await axios.post(this.url, this.body, {
            headers: this.params
          });
          this.data = data;
        }
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
