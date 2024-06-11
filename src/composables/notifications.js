import { inject } from "vue";

export function useNotifications() {
  const $vs = inject("$vs");

  const showNotificationRepeat = (title, callback) => {
    $vs.notify({
      title: `Error en la operación de ${title}`,
      text: "Haga click para reintentar",
      color: "danger",
      fixed: true,
      click: callback,
    });
  };

  const showNotificationOnce = (titleText, err) => {
    $vs.notify({
      title: `Error en la operación de ${titleText}`,
      text: `${err}`,
      color: "danger",
    });
  };

  return {
    showNotificationRepeat,
    showNotificationOnce,
  };
}
