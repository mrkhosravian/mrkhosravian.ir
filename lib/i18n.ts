import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      "Hi, This is": "Welcome to React and react-i18next"
    }
  },
  fa: {
    translation: {
      "Hi, This is": "سلام"
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next

export default i18n;
