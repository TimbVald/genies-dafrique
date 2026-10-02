import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Correspond à toutes les routes sauf les routes API (/api), _next, _vercel et les fichiers statiques
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
