// i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Importing translation files
import AR from "./translate/ar.json";
import EN from "./translate/en.json";

// Function to detect user's language preference
const detectUserLanguage = () => {
  try {
    // Check for saved language in localStorage
    const savedLanguage = localStorage.getItem("lang");
    // Default to Arabic if not set, otherwise use saved language
    return savedLanguage || "ar";
  } catch (error) {
    console.error("Error accessing localStorage:", error);
    return "ar"; // Fallback to Arabic if error occurs
  }
};

const resources = {
  ar: {
    translation: AR,
  },
  en: {
    translation: EN,
  },
};

// Function to set the direction and lang attribute of the page
// const setPageDirection = (lng) => {
//   const direction = lng === "ar" ? "rtl" : "ltr";
//   document.documentElement.setAttribute("dir", direction);
//   document.documentElement.lang = lng;
// };

// Initialize i18n
i18n.use(initReactI18next).init({
  resources,
  lng: detectUserLanguage(),
  interpolation: {
    escapeValue: false, // React already protects against XSS
  },
});

// Set initial direction
// setPageDirection(i18n.language);

// Handle language changes
i18n.on("languageChanged", (lng) => {
  try {
    localStorage.setItem("lang", lng);
    // setPageDirection(lng);
  } catch (error) {
    console.error("Error saving language preference:", error);
  }
});

export default i18n;
