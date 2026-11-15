import { NextResponse, type NextRequest } from "next/server";

/**
 * Portuguese is served at the root ("/robotica") and English under "/en". Every route
 * lives in app/[lang], so root URLs are rewritten onto "/pt/..." and an explicit
 * "/pt/..." is redirected back to the root, to keep one address per page.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/en" || pathname.startsWith("/en/")) return;
  // Preview images are generated under /pt/... (where the route lives) and linked there.
  if (/\/(opengraph|twitter)-image/.test(pathname)) return;

  const url = request.nextUrl.clone();
  if (pathname === "/pt" || pathname.startsWith("/pt/")) {
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url);
  }
  url.pathname = `/pt${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip Next internals, the app icons and anything with a file extension (public/ assets).
  matcher: ["/((?!_next|icon|apple-icon|sitemap.xml|robots.txt|.*\\..*).*)"],
};
