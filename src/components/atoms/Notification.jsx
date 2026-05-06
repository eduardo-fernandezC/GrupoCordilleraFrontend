import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const notifySuccess = (msg) => toast.success(msg);
export const notifyError = (msg) => toast.error(msg);
export const notifyInfo = (msg) => toast.info(msg);

export const NotificationContainer = () => (
  <ToastContainer
    position="bottom-right"
    autoClose={3000}
    hideProgressBar={false}
    closeOnClick
    pauseOnHover
    draggable
    theme="colored"
  />
);
