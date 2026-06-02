import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all routes except static assets, API, _next, robots.txt, sitemap.xml,
  // and anything with a file extension (favicon.ico, og.png, etc.)
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
