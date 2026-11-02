"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  RiDashboard3Line,
  RiFileChartLine,
  RiExchangeDollarLine,
  RiFundsBoxLine,
  RiStore2Line,
  RiAlarmWarningLine,
  RiFileList3Line,
  RiSettings4Line,
  RiBuilding4Line,
  RiLogoutBoxRLine,
  RiUserSmileLine,
} from "react-icons/ri";
import { getStoredUser, clearStoredSession, UserSession } from "@/lib/auth";

interface NavItem {
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>;
  label: string;
  badge?: string | number;
  adminOnly?: boolean;
}

interface NavGroup {
  section: string;
  adminOnly?: boolean;
  items: NavItem[];
}

const ALL_NAV_GROUPS: NavGroup[] = [
  {
    section: "VUE GLOBALE & SIÈGE",
    adminOnly: true,
    items: [
      { href: "/dashboard", icon: RiDashboard3Line, label: "Tableau de bord Siège" },
      { href: "/rapports", icon: RiFileChartLine, label: "Rapports Hebdomadaires" },
    ],
  },
  {
    section: "OPÉRATIONS & GUICHET",
    items: [
      { href: "/commissions", icon: RiStore2Line, label: "Commissions & Guichet Shop", badge: "ACTIF" },
      { href: "/versements", icon: RiExchangeDollarLine, label: "Versements & Dépôts" },
      { href: "/depenses", icon: RiFundsBoxLine, label: "Dépenses Base ETUMBELO", adminOnly: true },
    ],
  },
  {
    section: "CONTRÔLE & CONFORMITÉ",
    adminOnly: true,
    items: [
      { href: "/eglises-retard", icon: RiAlarmWarningLine, label: "Églises en Retard", badge: 4 },
      { href: "/pieces", icon: RiFileList3Line, label: "Pièces & Borderaux" },
      { href: "/parametres", icon: RiSettings4Line, label: "Paramètres & Taux" },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<UserSession | null>(null);

  useEffect(() => {
    const session = getStoredUser();
    setUser(session);
  }, []);

  const isPercepteur = user?.role === "percepteur";

  const handleLogout = () => {
    clearStoredSession();
    router.push("/login");
  };

  // Filtrage selon le rôle
  const visibleGroups = ALL_NAV_GROUPS.map((group) => {
    if (isPercepteur && group.adminOnly) return null;
    const filteredItems = group.items.filter((item) => {
      if (isPercepteur && item.adminOnly) return false;
      return true;
    });
    return { ...group, items: filteredItems };
  }).filter(Boolean) as typeof ALL_NAV_GROUPS;

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-name">DOMINIONSHOP</div>
        <div className="sidebar-logo-sub">Transferts & Transactions</div>
      </div>

      {/* Entity */}
      <div className="sidebar-entity">
        <div className="sidebar-entity-label">
          {isPercepteur ? "ESPACE PERCEPTEUR" : "ENTITÉ DE GESTION"}
        </div>
        <div className="sidebar-entity-name">
          <RiBuilding4Line style={{ marginRight: 6, fontSize: 13, color: "var(--green-primary)" }} />
          {user?.church || "Cité de Refuge"}
          <span
            className="badge-siege"
            style={{
              background: isPercepteur ? "#1E3A8A" : "#065F46",
              color: "#fff",
            }}
          >
            {isPercepteur ? "GUICHET" : "SIÈGE"}
          </span>
        </div>
        <div className="sidebar-entity-sub">
          {isPercepteur
            ? "Session Percepteur Opérateur"
            : "Kinshasa RDC · Exercice 2026"}
        </div>
      </div>

      {/* Nav */}
      {visibleGroups.map((group) => (
        <div className="sidebar-section" key={group.section}>
          <div className="sidebar-section-label">{group.section}</div>
          {group.items.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href}>
                <div className={`sidebar-item${isActive ? " active" : ""}`}>
                  <span className="sidebar-item-icon">
                    <Icon size={16} />
                  </span>
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className="sidebar-badge"
                      style={
                        item.badge === "ACTIF"
                          ? { background: "#059669", color: "#fff" }
                          : undefined
                      }
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      ))}

      {/* Profil & Déconnexion en bas du Sidebar */}
      <div style={{ marginTop: "auto", padding: "12px 14px", borderTop: "1px solid var(--sidebar-border)" }}>
        {user && (
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 7,
                background: isPercepteur ? "#3B82F6" : "#00C47D",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                fontWeight: 700,
              }}
            >
              {user.name.slice(0, 2).toUpperCase()}
            </div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {user.name}
              </div>
              <div style={{ fontSize: 9, color: "var(--sidebar-section)" }}>
                {isPercepteur ? "Rôle: Percepteur" : "Rôle: Administrateur"}
              </div>
            </div>
          </div>
        )}

        <button
          onClick={handleLogout}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            padding: "7px 10px",
            background: "rgba(239, 68, 68, 0.12)",
            border: "1px solid rgba(239, 68, 68, 0.25)",
            borderRadius: 7,
            color: "#FCA5A5",
            fontSize: 11,
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.15s",
          }}
        >
          <RiLogoutBoxRLine size={13} />
          <span>Déconnexion</span>
        </button>
      </div>

      {/* Footer */}
      <div className="sidebar-footer" style={{ borderTop: "none", paddingTop: 0 }}>
        <div>Audit Ledger v4.5 · Sécurisé</div>
        <div style={{ marginTop: 2 }}>© 2026 DominionShop</div>
      </div>
    </aside>
  );
}
