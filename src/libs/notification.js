import { store } from "react-notifications-component";

export const NOTIFICATION_TYPE = {
  success: "success",
  error: "error",
  warning: "warning",
  info: "info",
};

const displayNotifications = (message, type = "warning") => {
  /**
   ** success: green,
   ** error: red,
   ** info: blue
   ** warning: yellow
   */

  const notificationType = (value) => {
    switch (value) {
      case NOTIFICATION_TYPE.success:
        return "success";
      case NOTIFICATION_TYPE.error:
        return "danger";
      case NOTIFICATION_TYPE.info:
        return "info";
      case NOTIFICATION_TYPE.warning:
        return "warning";
      default:
        return NOTIFICATION_TYPE.success;
    }
  };
  store.addNotification({
    message,
    type: notificationType(type),
    insert: "top",
    container: "top-right",
    animationIn: ["animated", "fadeIn"],
    animationOut: ["animated", "fadeOut"],
    dismiss: {
      duration: 3000,
      onScreen: true,
    },
  });
};

export default displayNotifications;
