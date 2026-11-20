"use client";

export interface UserSession {
  id?: number | string;
  name: string;
  email: string;
  role: "admin" | "percepteur" | string;
  church?: string;
  matricule?: string;
}

export const DEMO_USERS: Record<string, UserSession & { passwordDefault: string }> = {
  admin: {
    id: 1,
    name: "Trésorier Central K.",
    email: "tresorier.central@dominionshop.cd",
    role: "admin",
    church: "Siège Central Limete",
    matricule: "CR-HQ-001",
    passwordDefault: "Admin@2026",
  },
  percepteur: {
    id: 2,
    name: "Percepteur Limete",
    email: "percepteur.limete@dominionshop.cd",
    role: "percepteur",
    church: "Cité de Refuge Limete",
    matricule: "CR-PAR-020",
    passwordDefault: "Percepteur@2026",
  },
};

/**
 * Récupère le jeton JWT depuis les cookies ou localStorage
 */
export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;

  try {
    const token = localStorage.getItem("dominion_token");
    if (token) return token;
  } catch {
    // ignore
  }

  const matchToken = document.cookie.match(/dominion_token=([^;]+)/);
  if (matchToken && matchToken[1]) {
    return decodeURIComponent(matchToken[1]);
  }

  return null;
}

/**
 * Lit la session utilisateur depuis les cookies ou localStorage
 */
export function getStoredUser(): UserSession | null {
  if (typeof window === "undefined") return null;

  // Si aucun token n'est présent, l'utilisateur est considéré comme déconnecté
  const token = getStoredToken();
  if (!token) {
    return null;
  }

  try {
    const raw = localStorage.getItem("dominion_user");
    if (raw) return JSON.parse(raw);
  } catch {
    // fallback
  }

  // fallback cookie
  const matchRole = document.cookie.match(/dominion_user_role=([^;]+)/);
  const matchName = document.cookie.match(/dominion_user_name=([^;]+)/);
  const matchEmail = document.cookie.match(/dominion_user_email=([^;]+)/);

  if (matchRole && matchRole[1]) {
    return {
      role: decodeURIComponent(matchRole[1]),
      name: matchName ? decodeURIComponent(matchName[1]) : "Utilisateur",
      email: matchEmail ? decodeURIComponent(matchEmail[1]) : "",
    };
  }

  return null;
}

/**
 * Enregistre la session dans les cookies (pour le middleware) et localStorage
 */
export function setStoredSession(token: string, user: UserSession) {
  if (typeof window === "undefined") return;

  const maxAge = 86400 * 7; // 7 jours
  document.cookie = `dominion_token=${encodeURIComponent(token)}; path=/; max-age=${maxAge}; SameSite=Lax`;
  document.cookie = `dominion_user_role=${encodeURIComponent(user.role)}; path=/; max-age=${maxAge}; SameSite=Lax`;
  document.cookie = `dominion_user_name=${encodeURIComponent(user.name)}; path=/; max-age=${maxAge}; SameSite=Lax`;
  document.cookie = `dominion_user_email=${encodeURIComponent(user.email)}; path=/; max-age=${maxAge}; SameSite=Lax`;

  try {
    localStorage.setItem("dominion_token", token);
    localStorage.setItem("dominion_user", JSON.stringify(user));
  } catch {
    // ignore
  }
}

/**
 * Supprime complètement la session (cookies, localStorage, sessionStorage)
 */
export function clearStoredSession() {
  if (typeof window === "undefined") return;

  const cookieNames = [
    "dominion_token",
    "dominion_user_role",
    "dominion_user_name",
    "dominion_user_email",
  ];

  for (const name of cookieNames) {
    document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0; SameSite=Lax`;
    document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0;`;
  }

  try {
    localStorage.removeItem("dominion_token");
    localStorage.removeItem("dominion_user");
    sessionStorage.removeItem("dominion_token");
    sessionStorage.removeItem("dominion_user");
    localStorage.clear();
    sessionStorage.clear();
  } catch {
    // ignore
  }
}
