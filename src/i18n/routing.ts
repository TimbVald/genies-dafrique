import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["fr", "en", "ew"],
  defaultLocale: "fr",
  localePrefix: "as-needed", // /fr est omis, /en et /ew sont préfixés
});
