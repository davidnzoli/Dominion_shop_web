"use client";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  RiShieldCheckFill,
  RiLock2Line,
  RiMailLine,
  RiKey2Line,
  RiEyeLine,
  RiEyeOffLine,
  RiCustomerService2Line,
  RiServerLine,
  RiBuilding4Line,
  RiArrowRightLine,
  RiCheckLine,
  RiAlertLine,
  RiLoader4Line,
} from "react-icons/ri";
import { setStoredSession, UserSession } from "@/lib/auth";

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fromUrl = searchParams.get("from");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setLoading(true);

    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL ||
      "https://dominion-shop-app.onrender.com/api";

    try {
      // 1. Appel API au backend Express (/api/auth/login)
      const res = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const json = await res.json().catch(() => null);

      if (!res.ok) {
        const errorText =
          json?.message ||
          (res.status === 401
            ? "Email ou mot de passe incorrect."
            : "Échec de l'authentification.");
        throw new Error(errorText);
      }

      if (!json?.data?.token || !json?.data?.user) {
        throw new Error("Réponse inattendue du serveur d'authentification.");
      }

      // 2. Données réelles retournées depuis la base de données
      const { token, user: dbUser } = json.data;
      const userRole = (dbUser.role || "user").toLowerCase();

      const userSession: UserSession = {
        id: dbUser.id,
        name: dbUser.name || email.split("@")[0],
        email: dbUser.email,
        role: userRole,
      };

      // 3. Enregistrer la session dans les cookies & localStorage
      setStoredSession(token, userSession);
      setSuccessMsg(`Connexion réussie ! Bienvenue ${userSession.name}`);

      // 4. Redirection automatique selon le rôle vérifié en base de données
      setTimeout(() => {
        let destination = userRole === "percepteur" ? "/commissions" : "/dashboard";

        if (fromUrl && !fromUrl.includes("login") && fromUrl !== "/") {
          // Si le percepteur tente d'aller sur une page réservée admin, renvoyer sur /commissions
          if (
            userRole === "percepteur" &&
            (fromUrl.includes("dashboard") ||
              fromUrl.includes("rapports") ||
              fromUrl.includes("depenses") ||
              fromUrl.includes("eglises-retard"))
          ) {
            destination = "/commissions";
          } else {
            destination = fromUrl;
          }
        }

        // On utilise window.location.replace au lieu de router.push pour garantir
        // que les cookies nouvellement définis sont envoyés directement au Middleware Next.js
        window.location.replace(destination);
      }, 400);
    } catch (err: unknown) {
      const msg =
        err instanceof TypeError && err.message.includes("fetch")
          ? "Impossible de joindre le serveur. Vérifiez que l'API est démarrée."
          : err instanceof Error
          ? err.message
          : "Erreur de connexion";
      setErrorMsg(msg);
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      {/* ─── Top Bar ────────────────────────────────────────── */}
      <header className="login-topbar">
        <div className="login-topbar-left">
          <div className="login-topbar-shield">
            <RiShieldCheckFill size={15} color="#fff" />
          </div>
          <span className="login-topbar-title">PORTAIL SÉCURISÉ SIÈGE</span>
          <span className="login-topbar-dot">•</span>
          <span className="login-topbar-badge">Audit Ledger v4.2</span>
        </div>

        <div className="login-topbar-right">
          <div className="login-status-live">
            <span className="pulse-dot" />
            <span>Connexion Réseau Inter-Églises Active</span>
          </div>
          <span className="login-topbar-pipe">|</span>
          <div className="login-tls">
            <RiLock2Line size={13} color="#059669" />
            <span>Chiffrement TLS 256-bit</span>
          </div>
        </div>
      </header>

      {/* ─── Main Card (Split 2 Columns) ────────────────────── */}
      <main className="login-center">
        <div className="login-card">
          {/* ── Gauche : Brand & Identity ── */}
          <div className="login-brand-pane">
            <div className="brand-pane-top">
              <span className="brand-tag">
                <span className="brand-tag-dot" />
                Système Intégré Siège & Églises
              </span>
            </div>

            <div className="brand-pane-center">
              <div className="brand-logo-icon">
                <span className="logo-letter">D</span>
              </div>
              <h1 className="brand-title">DOMINIONSHOP</h1>
              <p className="brand-subtitle">
                TRÉSORERIE & TRANSFERTS MULTI-SERVICES
              </p>
            </div>

            <div className="brand-pane-bottom">
              <div className="brand-church-header">
                <RiBuilding4Line size={15} color="#00C47D" />
                <span className="brand-church-name">
                  Communauté Cité de Refuge
                </span>
                <span className="brand-dot">•</span>
                <span className="brand-church-sub">Siège Kinshasa RDC</span>
              </div>
              <p className="brand-mission">
                Plateforme centrale de suivi des versements hebdomadaires des 46
                paroisses, des dépenses de la base <strong>ETUMBELO</strong> et
                des opérations de guichet.
              </p>
            </div>
          </div>

          {/* ── Droite : Formulaire de connexion ── */}
          <div className="login-form-pane">
            {/* Header droit avec Assistance */}
            <div className="form-pane-top">
              <div />
              <button
                type="button"
                className="assistance-btn"
                onClick={() => alert("Assistance Siège: +243 81 080 6046 (Dispo 24/7)")}
              >
                <RiCustomerService2Line size={14} color="#00C47D" />
                <span>Assistance Siège</span>
              </button>
            </div>

            {/* Titre & Subtitle */}
            <div className="form-heading-group">
              <h2 className="form-title">Connexion à votre compte</h2>
              <p className="form-desc">
                Veuillez renseigner vos identifiants pour accéder au tableau de
                bord de gestion et aux registres de versements.
              </p>
            </div>

            {/* Alerts */}
            {errorMsg && (
              <div className="login-alert error">
                <RiAlertLine size={14} />
                <span>{errorMsg}</span>
              </div>
            )}
            {successMsg && (
              <div className="login-alert success">
                <RiCheckLine size={14} />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} className="login-form">
              {/* Email / Matricule */}
              <div className="input-group">
                <label className="input-label">
                  ADRESSE EMAIL PROFESSIONNELLE OU MATRICULE
                </label>
                <div className="input-field-wrap">
                  <RiMailLine size={16} className="input-icon" />
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tresorier.central@dominionshop.cd"
                    className="login-input"
                  />
                </div>
                <div className="input-helper">
                  ⓘ Renseignez l&apos;adresse email de votre compte utilisateur enregistré.
                </div>
              </div>

              {/* Password */}
              <div className="input-group">
                <div className="label-with-link">
                  <label className="input-label">MOT DE PASSE SÉCURISÉ</label>
                  <button
                    type="button"
                    className="forgot-link"
                    onClick={() =>
                      alert("Veuillez contacter le contrôleur général pour réinitialiser votre code d'accès.")
                    }
                  >
                    Mot de passe oublié ?
                  </button>
                </div>
                <div className="input-field-wrap">
                  <RiKey2Line size={16} className="input-icon" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••••••"
                    className="login-input"
                  />
                  <button
                    type="button"
                    className="eye-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    title={showPassword ? "Masquer" : "Afficher"}
                  >
                    {showPassword ? (
                      <RiEyeOffLine size={16} />
                    ) : (
                      <RiEyeLine size={16} />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember me & Server badge */}
              <div className="form-meta-row">
                <label className="remember-checkbox-label">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="remember-checkbox"
                  />
                  <span>Maintenir ma session active</span>
                </label>

                <div className="server-badge">
                  <RiServerLine size={12} color="#059669" />
                  <span>Base Centrale PostgreSQL</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="login-submit-btn"
              >
                {loading ? (
                  <>
                    <RiLoader4Line size={16} className="spin-icon" />
                    <span>Vérification des accès...</span>
                  </>
                ) : (
                  <>
                    <span>Se connecter au Système</span>
                    <RiArrowRightLine size={16} />
                  </>
                )}
              </button>
            </form>

            {/* Note de sécurité & informations d'accès */}
            <div
              style={{
                marginTop: "20px",
                padding: "12px 14px",
                background: "#F8FAFC",
                borderRadius: "10px",
                border: "1px solid #E2E8F0",
                fontSize: "11px",
                color: "#64748B",
                lineHeight: "1.5",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontWeight: 600,
                  color: "#1E293B",
                  marginBottom: "4px",
                }}
              >
                <RiShieldCheckFill size={15} color="#00C47D" />
                <span>Authentification centralisée</span>
              </div>
              <div>
                Votre rôle (Administrateur, Percepteur, Trésorier...) et vos autorisations
                sont vérifiés en temps réel dans la base de données.
              </div>
            </div>

            {/* Copyright */}
            <div className="login-copyright">
              © 2026 Dominion Shop & Cité de Refuge. Tous droits réservés.
            </div>
          </div>
        </div>
      </main>

      {/* ─── Bottom Footer Certification ───────────────────── */}
      <footer className="login-bottom-footer">
        Plateforme certifiée pour la gestion des versements de culte, dîmes,
        offrandes et opérations de change.
      </footer>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div
          className="login-wrapper"
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          <div style={{ fontSize: 12, color: "#64748B" }}>
            Chargement du portail sécurisé...
          </div>
        </div>
      }
    >
      <LoginFormContent />
    </Suspense>
  );
}
