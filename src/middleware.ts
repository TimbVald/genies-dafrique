import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Correspond à toutes les routes sauf les fichiers statiques et _next
  matcher: ["/((?!_next|.*\\..*).*)"],
};
