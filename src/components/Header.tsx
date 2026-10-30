"use client";
import { useState, Fragment } from "react";
import { RiSearchLine, RiNotification3Line, RiCheckLine } from "react-icons/ri";

interface HeaderProps {
  activeTab?: string;
}

const tabs = [
  "SIÈGE CENTRAL",
  "EXERCICE HEBDOMADAIRE",
  "Connexion",
  "Réseau Inter",
  "Église ≠ Église",
];

export default function Header({ activeTab = "SIÈGE CENTRAL" }: HeaderProps) {
  const [currency, setCurrency] = useState<"USD" | "CDF">("USD");
  const [active, setActive] = useState(activeTab);

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
          Synchro Réseau OK
        </button>

        {/* Notifications */}
        <button className="notif-btn" aria-label="Notifications">
          <RiNotification3Line size={16} />
          <span className="notif-badge">4</span>
        </button>

        {/* User */}
        <div className="user-info">
          <div className="user-avatar">TK</div>
          <div>
            <div className="user-name">Trésorier Central K.</div>
            <div className="user-role">Contrôleur Financier Siège</div>
          </div>
        </div>
      </div>
    </header>
  );
}
