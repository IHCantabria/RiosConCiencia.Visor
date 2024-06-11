// useNotifications.js
import { getCurrentInstance } from "vue";
// TODO: CHECK VS
export function useNotifications() {
  const instance = getCurrentInstance();
  const vs = instance.appContext.config.globalProperties.$vs;

  const showNotificationRepeat = (title, callback) => {
    vs.notify({
      title: `Error en la operación de ${title}`,
      text: "Haga click para reintentar",
      color: "danger",
      fixed: true,
      click: callback,
    });
  };

  const showNotificationOnce = (titleText, err) => {
    vs.notify({
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
