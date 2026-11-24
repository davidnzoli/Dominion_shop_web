// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// // Routes accessibles au rôle percepteur
// const PERCEPTEUR_ALLOWED = ["/commissions", "/versements", "/login"];

// export default function proxy(request: NextRequest) {
//   const { pathname } = request.nextUrl;

//   // 1. Ignorer les fichiers statiques, assets et routes API
//   if (
//     pathname.startsWith("/_next") ||
//     pathname.startsWith("/api") ||
//     pathname.includes(".")
//   ) {
//     return NextResponse.next();
//   }

//   const token = request.cookies.get("dominion_token")?.value;
//   const role = request.cookies.get("dominion_user_role")?.value?.toLowerCase(); // "admin" | "percepteur"

//   const isAuth = Boolean(token);
//   const isLoginPage = pathname === "/login";

//   // 2. Gestion de la racine "/"
//   if (pathname === "/") {
//     if (!isAuth) {
//       return NextResponse.redirect(new URL("/login", request.url));
//     }
//     const destination = role === "percepteur" ? "/commissions" : "/dashboard";
//     return NextResponse.redirect(new URL(destination, request.url));
//   }

//   // 3. Utilisateur NON connecté tentant d'accéder à une page protégée
//   if (!isAuth && !isLoginPage) {
//     const loginUrl = new URL("/login", request.url);
//     if (pathname !== "/") {
//       loginUrl.searchParams.set("from", pathname);
//     }
//     const response = NextResponse.redirect(loginUrl);
//     // Empêcher la mise en cache de la redirection
//     response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
//     response.headers.set("Pragma", "no-cache");
//     response.headers.set("Expires", "0");
//     return response;
//   }

//   // 4. Utilisateur DÉJÀ connecté qui tente d'aller sur /login
//   if (isAuth && isLoginPage) {
//     const destination = role === "percepteur" ? "/commissions" : "/dashboard";
//     return NextResponse.redirect(new URL(destination, request.url));
//   }

//   // 5. Contrôle d'accès par rôle pour le "percepteur"
//   if (isAuth && role === "percepteur") {
//     const isAllowed = PERCEPTEUR_ALLOWED.some(
//       (route) => pathname === route || pathname.startsWith(route + "/")
//     );
//     if (!isAllowed) {
//       // Rediriger vers l'espace autorisé du percepteur
//       return NextResponse.redirect(new URL("/commissions", request.url));
//     }
//   }

//   // 6. Pour toutes les pages protégées, désactiver le cache (bfcache)
//   const response = NextResponse.next();
//   if (!isLoginPage) {
//     response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
//     response.headers.set("Pragma", "no-cache");
//     response.headers.set("Expires", "0");
//   }

//   return response;
// }

// export const middleware = proxy;

// export const config = {
//   matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
// };
