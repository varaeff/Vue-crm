import store from "@/store";
import ru from "@/locales/ru.json";
import en from "@/locales/en.json";

const locales = {
  "ru-RU": ru,
  "en-US": en,
};

export default function localize(key) {
  const locale = store.getters.info?.locale || "";
  if (locale) {
    return locales[locale][key] || `[localize error]: key ${key} not found`;
  } else return `[localize error]: key ${key} not found`;
}
