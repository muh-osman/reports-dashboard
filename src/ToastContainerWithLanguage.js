import { ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";

const ToastContainerWithLanguage = () => {
  const { i18n } = useTranslation();

  return <ToastContainer rtl={i18n.language === "ar"} />;
};

export default ToastContainerWithLanguage;
