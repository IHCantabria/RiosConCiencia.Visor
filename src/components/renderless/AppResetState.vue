<script>
import { mapActions } from "vuex";
import * as types from "@/store/types";
export default {
  mounted() {
    this.$nextTick(() => {
      this.init();
    });
  },
  methods: {
    ...mapActions({
      setActiveUser: types.A_FETCH_USER
    }),
    init() {
      this.$root.$on("logout", () => {
        this.logout();
      });
    },
    logout() {
      console.log("logout");
      this.setActiveUser(null);
    }
  },
  render: () => null
};
</script>
