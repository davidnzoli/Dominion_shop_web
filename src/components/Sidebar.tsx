"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
} from "react-icons/ri";

const navItems = [
  {
    section: "VUE GLOBALE & SIÈGE",
    items: [
      { href: "/dashboard", icon: RiDashboard3Line, label: "Tableau de bord Siège" },
      { href: "/rapports", icon: RiFileChartLine, label: "Rapports Hebdomadaires" },
    ],
  },
  {
    section: "OPÉRATIONS & FLUX",
    items: [
      { href: "/versements", icon: RiExchangeDollarLine, label: "Versements & Dépôts" },
      { href: "/depenses", icon: RiFundsBoxLine, label: "Dépenses Base ETUMBELO" },
      { href: "/commissions", icon: RiStore2Line, label: "Commissions & Guichet Shop" },
    ],
  },
  {
    section: "CONTRÔLE & CONFORMITÉ",
    items: [
      { href: "/eglises-retard", icon: RiAlarmWarningLine, label: "Églises en Retard", badge: 4 },
      { href: "/pieces", icon: RiFileList3Line, label: "Pièces & Borderaux" },
      { href: "/parametres", icon: RiSettings4Line, label: "Paramètres & Taux" },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-name">DOMINIONSHOP</div>
        <div className="sidebar-logo-sub">Transferts & Transactions</div>
      </div>

      {/* Entity */}
      <div className="sidebar-entity">
        <div className="sidebar-entity-label">ENTITÉ DE GESTION</div>
        <div className="sidebar-entity-name">
          <RiBuilding4Line style={{ marginRight: 6, fontSize: 13, color: "var(--green-primary)" }} />
          Cité de Refuge
          <span className="badge-siege">SIÈGE</span>
        </div>
        <div className="sidebar-entity-sub">Kinshasa RDC · Exercice 2025</div>
      </div>

      {/* Nav */}
      {navItems.map((group) => (
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
                    <span className="sidebar-badge">{item.badge}</span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      ))}

      {/* Footer */}
      <div className="sidebar-footer">
        <div>Audit Ledger v4.5</div>
        <div style={{ marginTop: 2 }}>© 2025 DominionShop</div>
      </div>
    </aside>
  );
}
