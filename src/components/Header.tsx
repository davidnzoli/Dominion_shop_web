"use client";
import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/navigation";
import { RiSearchLine, RiNotification3Line, RiLogoutBoxRLine } from "react-icons/ri";
import { getStoredUser, clearStoredSession, UserSession } from "@/lib/auth";

interface HeaderProps {
  activeTab?: string;
}

const adminTabs = [
  "SIÈGE CENTRAL",
  "EXERCICE HEBDOMADAIRE",
  "Réseau Inter-Églises",
  "Audit & Conformité",
];

const percepteurTabs = [
  "GUICHET SHOP",
  "VERSEMENTS & COMMISSIONS",
  "BORDEREAUX HEBDO",
];

export default function Header({ activeTab }: HeaderProps) {
  const router = useRouter();
  const [currency, setCurrency] = useState<"USD" | "CDF">("USD");
  const [user, setUser] = useState<UserSession | null>(null);

  useEffect(() => {
    setUser(getStoredUser());
  }, []);

  const isPercepteur = user?.role === "percepteur";
  const tabs = isPercepteur ? percepteurTabs : adminTabs;
  const currentTab = activeTab || tabs[0];
  const [active, setActive] = useState(currentTab);

  const handleLogout = () => {
    clearStoredSession();
    router.push("/login");
  };

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((w) => w[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "TK";

  return (
    <header className="header">
      {/* Nav Tabs */}
      <div className="header-tabs">
        {tabs.map((tab, i) => (
          <Fragment key={tab}>
            {i > 0 && <div className="header-divider" />}
            <button
              className={`header-tab${active === tab ? " active" : ""}`}
              onClick={() => setActive(tab)}
            >
              {tab}
            </button>
          </Fragment>
        ))}
      </div>

      {/* Search */}
      <div className="header-search">
        <span className="header-search-icon">
          <RiSearchLine size={13} />
        </span>
        <input type="text" placeholder="Rechercher..." />
      </div>

      {/* Right section */}
      <div className="header-right">
        {/* Currency Toggle */}
        <div className="currency-toggle">
          <button
            className={`currency-btn${currency === "USD" ? " active" : ""}`}
            onClick={() => setCurrency("USD")}
          >
            USD $
          </button>
          <button
            className={`currency-btn${currency === "CDF" ? " active" : ""}`}
            onClick={() => setCurrency("CDF")}
          >
            CDF FC
          </button>
        </div>

        {/* Sync */}
        <button className="sync-btn">
          <span className="sync-dot" />
          Synchro OK
        </button>

        {/* Notifications */}
        <button className="notif-btn" aria-label="Notifications">
          <RiNotification3Line size={16} />
          <span className="notif-badge">{isPercepteur ? "1" : "4"}</span>
        </button>

        {/* User Card & Logout */}
        <div className="user-info" style={{ cursor: "pointer" }}>
          <div
            className="user-avatar"
            style={{
              background: isPercepteur ? "#3B82F6" : "#00C47D",
              color: "#fff",
            }}
          >
            {initials}
          </div>
          <div>
            <div className="user-name">
              {user?.name || (isPercepteur ? "Percepteur Limete" : "Trésorier Central K.")}
            </div>
            <div className="user-role">
              {isPercepteur ? "Opérateur Guichet Shop" : "Contrôleur Financier Siège"}
            </div>
          </div>
          <button
            onClick={handleLogout}
            title="Se déconnecter"
            style={{
              marginLeft: 8,
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "#94A3B8",
              padding: 4,
              display: "flex",
              alignItems: "center",
              borderRadius: 4,
            }}
          >
            <RiLogoutBoxRLine size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}
