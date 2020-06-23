export const notificationsMixin = {
  methods: {
    $_showNotificationRepeat(title, callback) {
      this.$vs.notify({
        title: `Error loading ${title}`,
        text: "Click to retry the load",
        color: "danger",
        fixed: true,
        click: callback
      });
    },
    $_showNotificationOnce(titleText, err) {
      this.$vs.notify({
        title: `Error loading ${titleText}`,
        text: `${err}`,
        color: "danger"
      });
    }
  }
};
