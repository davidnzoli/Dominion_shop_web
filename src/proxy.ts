import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes autorisées pour le percepteur
const PERCEPTEUR_ALLOWED = ["/commissions", "/versements", "/login"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ignorer les requêtes statiques Next.js et API
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get("dominion_token")?.value;
  const role = request.cookies.get("dominion_user_role")?.value; // "admin" | "percepteur"

  const isAuth = Boolean(token);
  const isLoginPage = pathname === "/login";

  // 1. Redirection de la racine "/"
  if (pathname === "/") {
    if (!isAuth) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (role === "percepteur") {
      return NextResponse.redirect(new URL("/commissions", request.url));
    }
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // 2. Si l'utilisateur n'est pas connecté et tente d'accéder à une page protégée
  if (!isAuth && !isLoginPage) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 3. Si l'utilisateur est déjà connecté et arrive sur /login
  if (isAuth && isLoginPage) {
    if (role === "percepteur") {
      return NextResponse.redirect(new URL("/commissions", request.url));
    }
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // 4. Contrôle d'accès par rôle pour le "percepteur"
  if (isAuth && role === "percepteur") {
    const isAllowed = PERCEPTEUR_ALLOWED.some(
      (route) => pathname === route || pathname.startsWith(route + "/")
    );
    if (!isAllowed) {
      // Redirection automatique vers son espace autorisé
      const redirectUrl = new URL("/commissions", request.url);
      redirectUrl.searchParams.set("unauthorized", "1");
      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.next();
}

export const proxy = middleware;

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
