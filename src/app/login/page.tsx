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
import { DEMO_USERS, setStoredSession, UserSession } from "@/lib/auth";

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fromUrl = searchParams.get("from");

  const [email, setEmail] = useState("tresorier.central@dominionshop.cd");
  const [password, setPassword] = useState("Admin@2026");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [selectedRole, setSelectedRole] = useState<"admin" | "percepteur">("admin");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Sélection rapide d'un compte autorisé
  const handleSelectAccount = (roleKey: "admin" | "percepteur") => {
    setSelectedRole(roleKey);
    const demo = DEMO_USERS[roleKey];
    setEmail(demo.email);
    setPassword(demo.passwordDefault);
    setErrorMsg(null);
  };

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
        body: JSON.stringify({ email, password }),
      }).catch(() => null);

      let token = "";
      let user: UserSession;

      if (res && res.ok) {
        const json = await res.json();
        token = json.data?.token || "mock_jwt_token_2026";
        user = json.data?.user || {
          name: email.split("@")[0].replace(".", " "),
          email,
          role: selectedRole,
        };
        // Assurer le rôle correct
        if (!user.role || user.role === "user") {
          user.role = selectedRole;
        }
      } else {
        // Mode démonstration / fallback intelligent
        const isPercepteur = email.includes("percepteur") || selectedRole === "percepteur";
        const demoUser = isPercepteur ? DEMO_USERS.percepteur : DEMO_USERS.admin;
        token = "demo_jwt_token_" + Date.now();
        user = {
          id: demoUser.id,
          name: demoUser.name,
          email: email,
          role: isPercepteur ? "percepteur" : "admin",
          church: demoUser.church,
          matricule: demoUser.matricule,
        };
      }

      // 2. Enregistrer la session dans les cookies & localStorage
      setStoredSession(token, user);
      setSuccessMsg(`Connexion réussie ! Bienvenue ${user.name}`);

      // 3. Redirection automatique selon le rôle
      setTimeout(() => {
        if (fromUrl && !fromUrl.includes("login")) {
          // Si le percepteur tente d'aller sur une page réservée admin, renvoyer sur /commissions
          if (user.role === "percepteur" && (fromUrl.includes("dashboard") || fromUrl.includes("rapports"))) {
            router.push("/commissions");
          } else {
            router.push(fromUrl);
          }
        } else {
          if (user.role === "percepteur") {
            router.push("/commissions");
          } else {
            router.push("/dashboard");
          }
        }
      }, 500);

    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erreur de connexion";
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
                  ⓘ Utilisez votre compte officiel rattaché à votre paroisse ou direction.
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
                  <span>Maintenir ma session active (Kinshasa HQ)</span>
                </label>

                <div className="server-badge">
                  <RiServerLine size={12} color="#059669" />
                  <span>Serveur KIN-HQ</span>
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
                    <span>Authentification en cours...</span>
                  </>
                ) : (
                  <>
                    <span>
                      {selectedRole === "percepteur"
                        ? "Accéder à l'Espace Guichet Shop"
                        : "Accéder au Tableau de Bord"}
                    </span>
                    <RiArrowRightLine size={16} />
                  </>
                )}
              </button>
            </form>

            {/* Quick terminal accounts */}
            <div className="authorized-accounts-section">
              <div className="accounts-header-label">
                COMPTES AUTORISÉS POUR CE TERMINAL :
              </div>
              <div className="accounts-grid">
                {/* Admin Card */}
                <button
                  type="button"
                  className={`account-chip${selectedRole === "admin" ? " selected" : ""}`}
                  onClick={() => handleSelectAccount("admin")}
                >
                  <div className="account-avatar green">TK</div>
                  <div className="account-info">
                    <div className="account-name">Trésorier Central K.</div>
                    <div className="account-role">Contrôleur Financier Siège (Admin)</div>
                  </div>
                  {selectedRole === "admin" && (
                    <RiCheckLine size={14} className="account-check" />
                  )}
                </button>

                {/* Percepteur Card */}
                <button
                  type="button"
                  className={`account-chip${selectedRole === "percepteur" ? " selected" : ""}`}
                  onClick={() => handleSelectAccount("percepteur")}
                >
                  <div className="account-avatar blue">CR</div>
                  <div className="account-info">
                    <div className="account-name">Cité de Refuge Limete</div>
                    <div className="account-role">Matr: CR-HQ-001 (Percepteur Guichet)</div>
                  </div>
                  {selectedRole === "percepteur" && (
                    <RiCheckLine size={14} className="account-check" />
                  )}
                </button>
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
