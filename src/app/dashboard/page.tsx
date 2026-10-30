"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import {
  RiDownload2Line,
  RiAddLine,
  RiArrowLeftRightLine,
  RiArrowRightUpLine,
  RiFileChartLine,
  RiAlertFill,
  RiAlertLine,
  RiChat1Line,
  RiArrowRightLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiSearchLine,
  RiEyeLine,
  RiEditLine,
  RiFileTextLine,
  RiTimeLine,
  RiSmartphoneLine,
  RiFlightTakeoffLine,
  RiMoneyDollarCircleLine,
  RiBankLine,
  RiGlobalLine,
  RiCheckLine,
  RiFlashlightLine,
} from "react-icons/ri";

/* ── Mock data ─────────────────────────────────────────────── */
const statsData = [
  {
    label: "TOTAL FONDS",
    dot: "#00C47D",
    amount: "$84,650.00",
    amountSub: "KNOX Semaine 42",
    badge: "+12.4%",
    badgeType: "up",
    meta: [
      { left: "Églises déposées", right: "41 / 46" },
      { left: "Régularité", right: "89.1%" },
    ],
    progress: 89,
  },
  {
    label: "SORTIES & DÉPENSES",
    dot: "#EF4444",
    amount: "$31,420.00",
    amountSub: "37.1% du brut",
    badge: "37.1%",
    badgeType: "neutral",
    meta: [
      { left: "Redistributions", right: "—" },
      { left: "Transp. & Missions", right: "—" },
    ],
    progress: 37,
    progressColor: "#EF4444",
  },
  {
    label: "SOLDE NET",
    dot: "#3B82F6",
    amount: "$53,230.00",
    amountSub: "Virement en équilibre",
    badge: null,
    meta: [
      { left: "Réserve", right: "$34,388" },
      { left: "Caisse", right: "$12,920" },
      { left: "Shop", right: "$6,803" },
    ],
    progress: 63,
    progressColor: "#3B82F6",
  },
  {
    label: "GUICHET SHOP",
    dot: "#8B5CF6",
    amount: "$4,890.00",
    amountSub: "USD · 342 #Flux",
    badge: "+4.36%",
    badgeType: "up",
    meta: [
      { left: "Marge brute commiss.", right: "—" },
      { left: "Taux répliqué", right: "×2" },
    ],
    progress: 62,
    progressColor: "#8B5CF6",
  },
];

const alertChurches = [
  {
    name: "Cité de Refuge Goma",
    status: "Occupée — Restent: 5 jours",
    icon: RiTimeLine,
    color: "#D97706",
  },
  {
    name: "Cité de Refuge Kolwezi",
    status: "Bordereau physique en cours de validation",
    icon: RiFileTextLine,
    color: "#2563EB",
  },
  {
    name: "Cité de Refuge Kiyovu",
    status: "Confirmation SMS: 40 Procs en litige",
    icon: RiSmartphoneLine,
    color: "#7C3AED",
  },
  {
    name: "Cité de Refuge Mbanza-Ngungu",
    status: "Aucun contact depuis S-40 — Relance requise",
    icon: RiAlertLine,
    color: "#DC2626",
  },
  {
    name: "Cité de Refuge Kikwit",
    status: "Motif: déplacement pastoral confirmé",
    icon: RiFlightTakeoffLine,
    color: "#059669",
  },
];

const chartData = [
  { label: "S 38", eglise: 76, etumbelo: 28, shop: 18 },
  { label: "S 39", eglise: 68, etumbelo: 32, shop: 22 },
  { label: "S 40", eglise: 72, etumbelo: 30, shop: 20 },
  { label: "S 41", eglise: 80, etumbelo: 35, shop: 25 },
  { label: "S 42", eglise: 100, etumbelo: 37, shop: 31, active: true },
];

const canaux = [
  {
    name: "Espèces / Guichet Siège",
    icon: RiMoneyDollarCircleLine,
    iconColor: "#059669",
    amount: "$49,630.00",
    pct: "58.5%",
    meta: "38 dépôts de Kinshasa · Borderaux #40",
    fill: 58.5,
    fillClass: "fill-green",
  },
  {
    name: "Mobile Money (Airtel, M-Pesa & Orange)",
    icon: RiSmartphoneLine,
    iconColor: "#D97706",
    amount: "$27,990.00",
    pct: "33.1%",
    meta: "Provinces & intérieur · Taux répliqué: 2",
    fill: 33.1,
    fillClass: "fill-orange",
  },
  {
    name: "Virement Bancaire & Swift",
    icon: RiBankLine,
    iconColor: "#2563EB",
    amount: "$16,930.00",
    pct: "20.0%",
    meta: "Diaspora & international · Frais intermédiation: 1.7%",
    fill: 20.0,
    fillClass: "fill-blue",
  },
];

const journalData = [
  {
    church: "Cité de Refuge\nLimete (Siège Central)",
    initials: "CL",
    color: "#0B4F6C",
    city: "Kinshasa Centre · Commune Limete",
    zone: null,
    resp: "Pasteur David Murundi",
    respTitle: "Pasteur",
    ref: "Rét-001-90",
    canal: "Espèces Glend.",
    canalRef: "#8721",
    canalIcon: RiMoneyDollarCircleLine,
    canalClass: "fill-green",
    amount: "$18,450.00",
    cdf: "51,660,000 CDF",
    obs: "Conforme · Dimes & Offrandes conformes. Cu...",
    obsNote: "Validation siège confirmée",
    status: "VALIDE SIÈGE",
    statusClass: "status-valide",
  },
  {
    church: "Cité de Refuge\nBandulungwa",
    initials: "CB",
    color: "#065F46",
    city: "Kivu · Buki, Kizi Valley",
    zone: null,
    resp: "Diaconesse Sarah Kabey",
    respTitle: "Diaconesse",
    ref: "Rét-038-RC",
    canal: "Espèces Glend.",
    canalRef: "#8824",
    canalIcon: RiMoneyDollarCircleLine,
    canalClass: "fill-green",
    amount: "$9,200.00",
    cdf: "25,760,000 CDF",
    obs: "Fonds versés samedi soir et dimanche · Vérification Ok",
    obsNote: "Conformité validée",
    status: "VALIDE SIÈGE",
    statusClass: "status-valide",
  },
  {
    church: "Cité de Refuge\nLubumbashi Centre",
    initials: "LL",
    color: "#1E40AF",
    city: "Nord Katanga · Commune Kamanga",
    zone: "PROV",
    resp: "Ancien Joseph Lukumbo",
    respTitle: "Ancien",
    ref: "Rét-033-LH",
    canal: "Bankwa SWIFT",
    canalRef: "#T853",
    canalIcon: RiBankLine,
    canalClass: "fill-blue",
    amount: "$12,400.00",
    cdf: "34,720,000 CDF",
    obs: "Bordereau bancaire validé par la trésorerie",
    obsNote: "Crédit direct confirmé",
    status: "CRÉDIT BANK OK",
    statusClass: "status-credit",
  },
  {
    church: "Cité de Refuge\nMatadi Ville",
    initials: "MV",
    color: "#92400E",
    city: "Kongo Central · Ville Basse",
    zone: "PROV",
    resp: "Pasteur Elie Awana",
    respTitle: "Pasteur",
    ref: "Rét-038-RC",
    canal: "Airtel Money",
    canalRef: "ATX#8023",
    canalIcon: RiSmartphoneLine,
    canalClass: "fill-orange",
    amount: "$4,850.00",
    cdf: "13,580,000 CDF",
    obs: "Transfert via sur compte corpo. · CDF conforme",
    obsNote: "Validé automatiquement",
    status: "VALIDE SIÈGE",
    statusClass: "status-valide",
  },
  {
    church: "Cité de Refuge\nDiaspora Paris",
    initials: "DP",
    color: "#4C1D95",
    city: "France · Île-de-France",
    zone: "FR",
    resp: "Pasteur Marc Ikerne",
    respTitle: "Pasteur",
    ref: "Rét-001-PA",
    canal: "Virement International",
    canalRef: "Swift FR79r GPT-109",
    canalIcon: RiGlobalLine,
    canalClass: "fill-blue",
    amount: "$7,500.00",
    cdf: "21,000,000 CDF",
    obs: "Soutien divers · Crédit direct compte devises Siège",
    obsNote: "Bordereau acquisition réussie",
    status: "CRÉDIT BANK OK",
    statusClass: "status-credit",
  },
  {
    church: "Cité de Refuge\nMasina Pascal",
    initials: "MP",
    color: "#B45309",
    city: "Kinshasa Est · Tshangu",
    zone: null,
    resp: "Trésorier Makesse Jean",
    respTitle: "Trésorier",
    ref: "Rét-055-KS",
    canal: "Avance Espèces",
    canalRef: "#8225-MS",
    canalIcon: RiMoneyDollarCircleLine,
    canalClass: "fill-orange",
    amount: "$3,120.00",
    cdf: "8,736,000 CDF",
    obs: "Acompte · Reste 500$ à déposer lundi",
    obsNote: "Faute mont. partielle",
    status: "PARTIEL VAL GSP",
    statusClass: "status-partial",
  },
  {
    church: "Cité de Refuge\nNdji Quartier 7",
    initials: "N7",
    color: "#065F46",
    city: "Kinshasa Est · District Tshangu",
    zone: null,
    resp: "Pasteur Simon Maele",
    respTitle: "Pasteur",
    ref: "Rét-043-438",
    canal: "Espèces Glend.",
    canalRef: "#8923",
    canalIcon: RiMoneyDollarCircleLine,
    canalClass: "fill-green",
    amount: "$4,100.00",
    cdf: "11,480,000 CDF",
    obs: "Bordereau conforme · Validé et visé par le contrôleur",
    obsNote: "Validé Au Siège",
    status: "VALIDE SIÈGE",
    statusClass: "status-valide",
  },
];

const churchTabs = [
  { label: "Toutes les Églises", count: 46 },
  { label: "Kinshasa Local", count: 44 },
  { label: "Provinces & Villes", count: 12 },
  { label: "International", count: 1 },
];

export default function DashboardPage() {
  const [activeChurchTab, setActiveChurchTab] = useState(0);
  const [activeSubTab, setActiveSubTab] = useState("TOUTES");

  const maxBar = Math.max(...chartData.map((d) => d.eglise));

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="main-area">
        <Header activeTab="SIÈGE CENTRAL" />
        <main className="page-content">

          {/* Page Header */}
          <div className="page-header flex items-center justify-between">
            <div>
              <h1 className="page-title">Tableau de Bord · Siège Central</h1>
              <p className="page-subtitle">
                Vue consolidée des flux financiers — 46 Églises Cité de Refuge
                (Kinshasa, Provinces & International)
              </p>
            </div>
            <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
              <button className="btn btn-ghost">
                <RiDownload2Line size={13} />
                Exporter PDF/Excel
              </button>
              <button className="btn btn-primary">
                <RiAddLine size={15} />
                Enregistrer un nouveau versement
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="stats-grid">
            {statsData.map((s) => (
              <div className="stat-card" key={s.label}>
                <div className="stat-card-label">
                  <span
                    className="stat-card-label-dot"
                    style={{ background: s.dot }}
                  />
                  {s.label}
                  {s.badge && (
                    <span
                      className={s.badgeType === "up" ? "stat-badge-up" : ""}
                      style={
                        s.badgeType === "neutral"
                          ? {
                              background: "#F1F5F9",
                              color: "#64748B",
                              fontSize: 9,
                              fontWeight: 700,
                              padding: "2px 6px",
                              borderRadius: 10,
                            }
                          : {}
                      }
                    >
                      {s.badgeType === "up" ? "↑ " : ""}{s.badge}
                    </span>
                  )}
                </div>
                <div className="stat-card-amount">
                  {s.amount}
                  <div className="stat-card-amount-sub">{s.amountSub}</div>
                </div>
                <div className="stat-progress-bar">
                  <div
                    className="stat-progress-fill"
                    style={{
                      width: `${s.progress}%`,
                      background: s.progressColor || "var(--green-primary)",
                    }}
                  />
                </div>
                <div className="stat-card-meta">
                  {s.meta.map((m) => (
                    <div className="stat-card-meta-row" key={m.left}>
                      <span>{m.left}</span>
                      <span className="font-bold">{m.right}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Church Filter Bar */}
          <div className="filter-bar">
            <div className="filter-tabs">
              {churchTabs.map((t, i) => (
                <button
                  key={t.label}
                  className={`filter-tab${activeChurchTab === i ? " active" : ""}`}
                  onClick={() => setActiveChurchTab(i)}
                >
                  {t.label}
                  <span className="count">{t.count}</span>
                </button>
              ))}
            </div>
            <div className="filter-actions">
              <select className="filter-select">
                <option>Kinshasa (Siège & Communes)</option>
                <option>Kinshasa Est (Tshangu)</option>
                <option>Kinshasa Ouest</option>
              </select>
              <div className="week-badge">
                <span className="week-badge-dot" />
                Semaine 42 · Octobre 2026
                <span
                  style={{
                    background: "#F59E0B",
                    color: "#fff",
                    fontSize: 8,
                    fontWeight: 700,
                    padding: "1px 5px",
                    borderRadius: 4,
                    marginLeft: 4,
                  }}
                >
                  EN COURS
                </span>
              </div>
              <div className="filter-actions-right" style={{ display: "flex", gap: 6 }}>
                <button className="btn btn-ghost">
                  <RiAddLine size={13} /> Dépôt Espèces Kim
                </button>
                <button className="btn btn-ghost">
                  <RiArrowLeftRightLine size={13} /> Virement / Mobile
                </button>
                <button className="btn btn-ghost">
                  <RiArrowRightUpLine size={13} /> Dépense ETUMBELO
                </button>
                <button className="btn btn-primary">
                  <RiFileChartLine size={13} /> Rapport Consolidé
                </button>
              </div>
            </div>
          </div>

          {/* Alert Box */}
          <div className="alert-box">
            <div className="alert-box-header">
              <div className="alert-box-title" style={{ display: "flex", alignItems: "center" }}>
                <RiAlertFill size={15} style={{ color: "var(--status-late)", marginRight: 6 }} />
                Contrôle de Régularité — 5 Églises en attente de versement
                <span className="alert-badge">S42 PERSISTANT</span>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button className="btn btn-ghost" style={{ fontSize: 10 }}>
                  <RiChat1Line size={12} />
                  Relancer Plusieurs (SMS)
                </button>
                <button
                  className="btn"
                  style={{
                    background: "#7F1D1D",
                    color: "#fff",
                    border: "none",
                    fontSize: 10,
                  }}
                >
                  Examiner les 5 dossiers
                  <RiArrowRightLine size={12} style={{ marginLeft: 4 }} />
                </button>
              </div>
            </div>
            {alertChurches.map((ch) => {
              const Icon = ch.icon;
              return (
                <div className="alert-item" key={ch.name}>
                  <span className="alert-item-icon" style={{ display: "flex", alignItems: "center", color: ch.color }}>
                    <Icon size={14} />
                  </span>
                  <div>
                    <span style={{ fontWeight: 600 }}>{ch.name}</span>
                    <span style={{ color: "#B91C1C" }}> — {ch.status}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Chart + Canal Grid */}
          <div className="dashboard-grid">
            {/* Bar Chart */}
            <div className="dashboard-chart-card">
              <div className="card-title">
                Évolution Comparée des Flux Consolidés
                <span className="card-title-sub">Entrées Églises vs Sorties ETUMBELO vs Shop</span>
              </div>
              <div className="bar-chart">
                {chartData.map((d) => {
                  const eH = (d.eglise / maxBar) * 95;
                  const etH = (d.etumbelo / maxBar) * 95;
                  const shH = (d.shop / maxBar) * 95;
                  return (
                    <div
                      className={`bar-group${d.active ? " bar-active" : ""}`}
                      key={d.label}
                    >
                      <div className="bars-row">
                        <div
                          className="bar bar-green"
                          style={{ height: `${eH}%` }}
                          title={`Entrées Églises S${d.label}`}
                        />
                        <div
                          className="bar bar-gray"
                          style={{ height: `${etH}%` }}
                          title={`Dépenses ETUMBELO`}
                        />
                        <div
                          className="bar bar-teal"
                          style={{ height: `${shH}%` }}
                          title={`Shop Direct`}
                        />
                      </div>
                      <div className="bar-label">{d.label}</div>
                      {d.active && (
                        <div
                          style={{
                            fontSize: 8,
                            color: "#F59E0B",
                            fontWeight: 700,
                          }}
                        >
                          Act.
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="chart-legend">
                <div className="legend-item">
                  <div className="legend-dot" style={{ background: "#00C47D" }} />
                  Entrées Églises
                </div>
                <div className="legend-item">
                  <div className="legend-dot" style={{ background: "#CBD5E1" }} />
                  Dépenses ETUMBELO
                </div>
                <div className="legend-item">
                  <div className="legend-dot" style={{ background: "#06B6D4" }} />
                  Shop Direct
                </div>
              </div>
              <div className="chart-note" style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <RiAlertLine size={13} style={{ flexShrink: 0 }} />
                <span>
                  Ratio de rétention net-nég: 62.9% après prélèvement des besoins agrégoliés.
                </span>
              </div>
            </div>

            {/* Canal Cards */}
            <div className="canal-card">
              <div className="canal-header">
                <div className="card-title" style={{ marginBottom: 0 }}>
                  Canaux d'Encaissement S-42
                </div>
                <div className="canal-total">$84,650 Total</div>
              </div>
              {canaux.map((c) => {
                const Icon = c.icon;
                return (
                  <div className="canal-item" key={c.name}>
                    <div className="canal-item-header">
                      <div className="canal-item-name" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <Icon size={16} color={c.iconColor} /> {c.name}
                      </div>
                      <div>
                        <div className="canal-item-amount">{c.amount}</div>
                        <div
                          className="canal-item-pct"
                          style={{ textAlign: "right" }}
                        >
                          {c.pct}
                        </div>
                      </div>
                    </div>
                    <div className="canal-item-meta">{c.meta}</div>
                    <div className="canal-bar-wrap">
                      <div
                        className={`canal-bar-fill ${c.fillClass}`}
                        style={{ width: `${c.fill}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Journal Table */}
          <div className="data-table-wrap">
            <div className="table-header-bar">
              <div className="table-title" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <RiFileTextLine size={16} color="var(--green-primary)" />
                Journal des Versements Hebdomadaires
              </div>
              <div className="table-sub-tabs" style={{ border: "none", padding: 0, margin: "0 auto 0 16px", background: "transparent" }}>
                {["TOTAL: 41", "KINSHASA (34)", "PROVINCES M/M (6)", "DIASPORA (1)"].map((t) => (
                  <button
                    key={t}
                    className={`table-sub-tab${activeSubTab === t ? " active" : ""}`}
                    onClick={() => setActiveSubTab(t)}
                    style={{ fontSize: 9 }}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <div className="table-search">
                <span className="table-search-icon">
                  <RiSearchLine size={12} />
                </span>
                <input placeholder="Filtrer par pasteur..." />
              </div>
            </div>

            <table className="data-table">
              <thead>
                <tr>
                  <th>ÉGLISE & LOCALITÉ</th>
                  <th>RESPONSABLE DECLARANT</th>
                  <th>CANAL & PIÈCE</th>
                  <th>MONTANT DÉCLARÉ</th>
                  <th>OBSERVATION HEBDOMADAIRE</th>
                  <th>STATUT AUDIT</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {journalData.map((row, i) => {
                  const CanalIcon = row.canalIcon;
                  return (
                    <tr key={i}>
                      <td>
                        <div className="church-cell">
                          <div
                            className="church-avatar"
                            style={{ background: row.color }}
                          >
                            {row.initials}
                          </div>
                          <div>
                            <div className="church-name">
                              {row.church.split("\n")[0]}
                              {row.zone && (
                                <span className={`zone-tag ${row.zone === "FR" ? "zone-intl" : "zone-prov"}`}>
                                  {row.zone}
                                </span>
                              )}
                            </div>
                            <div className="church-name" style={{ fontWeight: 400, fontSize: 10, color: "var(--text-secondary)" }}>
                              {row.church.split("\n")[1]}
                            </div>
                            <div className="church-location">{row.city}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="resp-cell">
                          <div className="resp-title">{row.respTitle}</div>
                          <div style={{ fontWeight: 600, color: "var(--text-primary)" }}>{row.resp.replace(/^(Pasteur|Diaconesse|Ancien|Trésorier)\s/, "")}</div>
                          <div className="resp-ref">{row.ref}</div>
                        </div>
                      </td>
                      <td>
                        <div className="canal-cell-type">
                          <div
                            className="canal-icon"
                            style={{
                              background:
                                row.canalClass === "fill-green"
                                  ? "#ECFDF5"
                                  : row.canalClass === "fill-blue"
                                  ? "#EFF6FF"
                                  : "#FFFBEB",
                            }}
                          >
                            <CanalIcon
                              size={14}
                              color={
                                row.canalClass === "fill-green"
                                  ? "#059669"
                                  : row.canalClass === "fill-blue"
                                  ? "#2563EB"
                                  : "#D97706"
                              }
                            />
                          </div>
                          {row.canal}
                        </div>
                        <div className="canal-ref">{row.canalRef}</div>
                      </td>
                      <td>
                        <div className="amount-cell">
                          <div className="amount-usd">{row.amount}</div>
                          <div className="amount-cdf">{row.cdf}</div>
                        </div>
                      </td>
                      <td>
                        <div className="obs-cell">{row.obs}</div>
                        <div className="obs-note">{row.obsNote}</div>
                      </td>
                      <td>
                        <span className={`status-badge ${row.statusClass}`} style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                          {row.statusClass === "status-valide" && <RiCheckLine size={12} />}
                          {row.statusClass === "status-credit" && <RiBankLine size={12} />}
                          {row.statusClass === "status-partial" && <RiFlashlightLine size={12} />}
                          {row.status}
                        </span>
                      </td>
                      <td>
                        <div className="action-btns">
                          <button className="action-btn" title="Voir"><RiEyeLine size={13} /></button>
                          <button className="action-btn" title="Éditer"><RiEditLine size={13} /></button>
                          <button className="action-btn" title="Document"><RiFileTextLine size={13} /></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="table-footer">
              <div className="table-info">
                Affichage 1-7 sur <strong>41</strong> rapports consolidés S-42
              </div>
              <div className="table-total">
                TOTAL VERSÉ: $84,660.00 USD
              </div>
              <div className="pagination">
                <button className="page-btn active">1</button>
                <button className="page-btn">2</button>
                <button className="page-btn">3</button>
                <button className="page-btn">4</button>
                <button className="page-btn">
                  <RiArrowRightSLine size={14} />
                </button>
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
