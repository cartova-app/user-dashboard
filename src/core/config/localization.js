import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .use(HttpApi) // passes i18n down to react-i18next
  .init({
    detection: {
      order: ["cookie", "htmlTag", "querystring", "localStorage", "path"],
      caches: ["cookie"],
    },
    backend: { loadPath: "/locales/{{lng}}/translations.json" },
    fallbackLng: "ar",
    supportedLngs: ["ar", "en"],
    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });
export default i18n;
