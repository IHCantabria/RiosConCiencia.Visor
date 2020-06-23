export default {
  props: {
    data: {
      type: Array,
      default: () => {
        return null;
      },
      required: false
    },
    processLogic: {
      type: Function,
      default: () => {
        return null;
      },
      required: false
    },
    dispatcher: {
      type: String,
      default: () => {
        return null;
      },
      required: false
    },
    additionalInfo: {
      type: Object,
      default: () => {
        return null;
      },
      required: false
    }
  },
  watch: {
    data: {
      handler() {
        this.init();
      },
      deep: true
    },
    processLogic: {
      handler() {
        this.init();
      },
      deep: true
    },
    dispatcher() {
      this.init();
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.data ? this.prepareData() : this.callDispatcher();
    },
    prepareData() {
      const dataPrepared = this.Operate();
      this.dispatcher
        ? this.$store.dispatch(this.dispatcher, dataPrepared)
        : this.$emit("dataProcessed", dataPrepared);
      this.$emit("operationFinished");
    },
    Operate() {
      if (this.additionalInfo && this.processLogic) {
        return this.processLogic(this.data, this.additionalInfo);
      } else if (this.processLogic) {
        return this.processLogic(this.data);
      }
      return this.data;
    },
    callDispatcher() {
      this.$store.dispatch(this.dispatcher);
      this.$emit("operationFinished");
    }
  },
  render: () => null
};
