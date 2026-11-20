import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes publiques accessibles sans authentification
const PUBLIC_PATHS = ["/login"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Récupérer le token et le rôle depuis les cookies
  const token = request.cookies.get("dominion_token")?.value;
  const role = request.cookies.get("dominion_user_role")?.value;

  const isPublic = PUBLIC_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`));

  // 0. Redirection propre de la racine /
  if (pathname === "/") {
    if (token) {
      const destination = role === "percepteur" ? "/commissions" : "/dashboard";
      return NextResponse.redirect(new URL(destination, request.url));
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 1. Utilisateur NON connecté tentant d'accéder à une route privée
  if (!token && !isPublic) {
    const loginUrl = new URL("/login", request.url);
    if (pathname !== "/") {
      loginUrl.searchParams.set("from", pathname);
    }

    const response = NextResponse.redirect(loginUrl);
    // Empêcher la mise en cache de la redirection
    response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
    return response;
  }

  // 2. Utilisateur connecté qui se rend sur la page de connexion
  if (token && pathname === "/login") {
    const destination = role === "percepteur" ? "/commissions" : "/dashboard";
    return NextResponse.redirect(new URL(destination, request.url));
  }

  // 3. Contrôle des permissions : restreindre le rôle percepteur aux routes autorisées
  if (
    token &&
    role === "percepteur" &&
    (pathname.startsWith("/dashboard") ||
      pathname.startsWith("/rapports") ||
      pathname.startsWith("/depenses") ||
      pathname.startsWith("/eglises-retard"))
  ) {
    return NextResponse.redirect(new URL("/commissions", request.url));
  }

  // 4. Pour toutes les pages privées, désactiver le cache du navigateur (bfcache)
  // Cela empêche l'affichage de la page si l'utilisateur clique sur la flèche retour après déconnexion
  const response = NextResponse.next();
  if (!isPublic) {
    response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Intercepte toutes les requêtes sauf les fichiers statiques et assets
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

