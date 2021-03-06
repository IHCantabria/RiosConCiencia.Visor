export const notificationsMixin = {
  methods: {
    $_showNotificationRepeat(title, callback) {
      this.$vs.notify({
        title: `Error en la operación de ${title}`,
        text: "Haga click para reintentar",
        color: "danger",
        fixed: true,
        click: callback
      });
    },
    $_showNotificationOnce(titleText, err) {
      this.$vs.notify({
        title: `Error en la operación de ${titleText}`,
        text: `${err}`,
        color: "danger"
      });
    }
  }
};
