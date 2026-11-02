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
 * Lit la session utilisateur depuis les cookies ou localStorage
 */
export function getStoredUser(): UserSession | null {
  if (typeof window === "undefined") return null;

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
 * Enregistre la session dans les cookies (pour le middleware/proxy) et localStorage
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
 * Supprime la session et déconnecte
 */
export function clearStoredSession() {
  if (typeof window === "undefined") return;

  document.cookie = "dominion_token=; path=/; max-age=0";
  document.cookie = "dominion_user_role=; path=/; max-age=0";
  document.cookie = "dominion_user_name=; path=/; max-age=0";
  document.cookie = "dominion_user_email=; path=/; max-age=0";

  try {
    localStorage.removeItem("dominion_token");
    localStorage.removeItem("dominion_user");
  } catch {
    // ignore
  }
}
