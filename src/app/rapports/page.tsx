"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import {
  RiDownload2Line,
  RiAddLine,
  RiCheckLine,
  RiBankLine,
  RiAlarmWarningLine,
  RiShieldCheckLine,
  RiFileList3Line,
  RiSearchLine,
  RiEyeLine,
  RiEditLine,
  RiAttachmentLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiArrowRightLine,
  RiBarChartBoxLine,
  RiTimeLine,
  RiMapPinLine,
  RiCompass3Line,
  RiBuilding4Line,
  RiAlertFill,
  RiPhoneLine,
  RiTicketLine,
  RiMoneyDollarCircleLine,
  RiSmartphoneLine,
  RiGlobalLine,
  RiBarChartLine,
  RiFlashlightLine,
} from "react-icons/ri";

/* ── Mock data ─────────────────────────────────────────────── */
const rapportStats = [
  {
    label: "TOTAL FONDS DÉCLARÉS",
    dot: "#00C47D",
    amount: "$84,000",
    amountSub: "~237,020,000 CDF",
    badge: "+1.46%",
    badgeType: "up",
    meta: [
      { left: "Églises déposées", right: "41 / 46" },
      { left: "Régularité", right: "89.1%" },
    ],
    progress: 89,
    progressColor: "#00C47D",
  },
  {
    label: "COMPTES GUICHET (KINSHASA)",
    dot: "#3B82F6",
    amount: "$40,630.00",
    amountSub: "~113,764,080 CDF",
    badge: null,
    meta: [
      { left: "38 porteurs validés", right: "" },
      { left: "Dépenses & Épargne", right: "Validées" },
    ],
    progress: 72,
    progressColor: "#3B82F6",
  },
  {
    label: "VIREMENTS & MOBILE MONEY",
    dot: "#F59E0B",
    amount: "$44,020.00",
    amountSub: "Airtel, M-Pesa & RTGS",
    badge: null,
    meta: [
      { left: "8 Provinces validées", right: "" },
      { left: "Diaspora validée", right: "+3" },
    ],
    progress: 81,
    progressColor: "#F59E0B",
  },
  {
    label: "RETARDS & JUSTIFICATIONS",
    dot: "#EF4444",
    amount: "5 Églises",
    amountSub: "3 motifs · 2 attributs",
    badge: null,
    meta: [
      { left: "Couverture réseau", right: "2" },
      { left: "En attente justif.", right: "3" },
    ],
    progress: 15,
    progressColor: "#EF4444",
  },
  {
    label: "TAUX DE RÉCONCILIATION",
    dot: "#8B5CF6",
    amount: "89.1%",
    amountSub: "+4.25% vs S-41",
    badge: "↑ +4.25%",
    badgeType: "up",
    meta: [
      { left: "Conformité déclarations", right: "Globale" },
    ],
    progress: 89,
    progressColor: "#8B5CF6",
  },
];

const rapportRows = [
  {
    church: "Cité de Refuge Limete Siège",
    churchSub: "Siège Central",
    initials: "CL",
    color: "#0B4F6C",
    city: "Kinshasa Centre · Commune Limete",
    zone: null,
    resp: "Pasteur Natale Jean",
    respRef: "Mén. CNR-020-KN",
    date: "18 Oct 2026",
    period: "Semaine 42",
    periodSub: "Dimanche",
    canal: "Espèces Guichet S42",
    canalRef: "Bord. #8921-M1",
    canalIcon: RiMoneyDollarCircleLine,
    canalColor: "#059669",
    canalBg: "#ECFDF5",
    amount: "$15,850.00",
    cdf: "44,380,000 CDF",
    obs: "Conforme · Dimes & Offrandes: Cu...",
    obsNote: "Vérification validation finale",
    status: "VALIDE SIÈGE",
    statusClass: "status-valide",
  },
  {
    church: "Cité de Refuge Bandulungwa",
    churchSub: "",
    initials: "CB",
    color: "#065F46",
    city: "Kivu · Buki, Kizi Valley",
    zone: null,
    resp: "Diacre Mutombo Eric",
    respRef: "Mén. CNR-071-BD",
    date: "18 Oct 2026",
    period: "Semaine 42",
    periodSub: "Dépôt direct",
    canal: "Espèces Guichet S42",
    canalRef: "Bord. #8926-BD",
    canalIcon: RiMoneyDollarCircleLine,
    canalColor: "#059669",
    canalBg: "#ECFDF5",
    amount: "$5,400.00",
    cdf: "15,120,000 CDF",
    obs: "Fonds versés samedi soir et dimanche · Vérification Ok",
    obsNote: "Vérification de nouveau Ok",
    status: "VALIDE SIÈGE",
    statusClass: "status-valide",
  },
  {
    church: "Rambariki",
    churchSub: "Synth. Kinshasa",
    initials: "RK",
    color: "#374151",
    city: "69 Églises Kinshasa déclarées",
    zone: null,
    resp: "Trésorier Central",
    respRef: "TX-KMW-MY210",
    date: "18 Oct 2026",
    period: "Consolidé S42",
    periodSub: "Synthèse",
    canal: "Multi-canal",
    canalRef: "1,5B CDF",
    canalIcon: RiBarChartLine,
    canalColor: "#475569",
    canalBg: "#F1F5F9",
    amount: "$38,580.00",
    cdf: "108,024,000 CDF",
    obs: "38 validées · 4 en attente de visa",
    obsNote: "Synthèse globale Kinshasa",
    status: "EN COURS",
    statusClass: "status-pending",
    dimmed: true,
  },
  {
    church: "Goma Karindo",
    churchSub: "",
    initials: "GK",
    color: "#7C3AED",
    city: "Nord-Kivu · Goma",
    zone: "PROV",
    resp: "Pasteur Sukeli Samuel",
    respRef: "Mén. CNR-88-GK",
    date: "18 Oct 2026",
    period: "Semaine 42",
    periodSub: "En délai actif",
    canal: "Airtel Money Business",
    canalRef: "TX#959500",
    canalIcon: RiSmartphoneLine,
    canalColor: "#D97706",
    canalBg: "#FFFBEB",
    amount: "$3,850.00",
    cdf: "10,780,000 CDF",
    obs: "Motif: Couverture fibre optique Ranc...",
    obsNote: "Acheminement par gestion alerte",
    status: "EN ATTENTE",
    statusClass: "status-pending",
  },
  {
    church: "Diaspora à Paris",
    churchSub: "France",
    initials: "DP",
    color: "#4C1D95",
    city: "France · Île-de-France",
    zone: "FR",
    resp: "Pasteur Nzuzi Christian",
    respRef: "Rét-001-PA",
    date: "18 Oct 2026",
    period: "Semaine 42",
    periodSub: "STRL SuRt",
    canal: "Virement International Swift",
    canalRef: "Fr-FR79r GPT-109",
    canalIcon: RiGlobalLine,
    canalColor: "#2563EB",
    canalBg: "#EFF6FF",
    amount: "$16,700.00",
    cdf: "46,760,000 CDF",
    obs: "Crédit direct compte devises Siège · Confirme bordereau acquisition réussie",
    obsNote: "Acquisition réussie",
    status: "CRÉDIT BANK OK",
    statusClass: "status-credit",
  },
  {
    church: "Matadi Ville",
    churchSub: "",
    initials: "MV",
    color: "#92400E",
    city: "Kongo Central · Ville Basse",
    zone: "PROV",
    resp: "Pasteur Mavinga André",
    respRef: "Mén. CNR-136",
    date: "18 Oct 2026",
    period: "Semaine 42",
    periodSub: "M-Pesa",
    canal: "M-Pesa Merchant",
    canalRef: "TK-MPESA-040059",
    canalIcon: RiSmartphoneLine,
    canalColor: "#D97706",
    canalBg: "#FFFBEB",
    amount: "$4,100.00",
    cdf: "11,480,000 CDF",
    obs: "Versement direct sur compte corpo · CDF 194% sans autorisation séq.",
    obsNote: "Vérification sequence requise",
    status: "VALIDE SIÈGE",
    statusClass: "status-valide",
  },
  {
    church: "Masina Pascal",
    churchSub: "",
    initials: "MP",
    color: "#B45309",
    city: "Kinshasa Est · Tshangu",
    zone: null,
    resp: "Trésorier Makesse Jean",
    respRef: "Mén. CNR-094-MS",
    date: "18 Oct 2026",
    period: "Semaine 42",
    periodSub: "Dimanche",
    canal: "Espèces Guichet S42",
    canalRef: "Bord. #8225-MS",
    canalIcon: RiMoneyDollarCircleLine,
    canalColor: "#059669",
    canalBg: "#ECFDF5",
    amount: "$3,100.00",
    cdf: "8,680,000 CDF",
    obs: "Enveloppes sociales décomptées · Faute montant",
    obsNote: "Faute mont. à rectifier",
    status: "PARTIEL",
    statusClass: "status-partial",
  },
  {
    church: "Ndji Quartier 7",
    churchSub: "",
    initials: "N7",
    color: "#065F46",
    city: "Kinshasa Est · Tshangu",
    zone: null,
    resp: "Trésorier Lukaku Michel",
    respRef: "Mén. CNR-042",
    date: "18 Oct 2026",
    period: "Semaine 42 · 75%",
    periodSub: "Partiel",
    canal: "Borderaux",
    canalRef: "#8302-NB",
    canalIcon: RiFileList3Line,
    canalColor: "#475569",
    canalBg: "#F1F5F9",
    amount: "$2,400.00",
    cdf: "6,720,000 CDF",
    obs: "Acompte dépôt dimanche · Solde: Reste à déposer 100$",
    obsNote: "Suivi: Reste 100$ à déposer",
    status: "PARTIEL",
    statusClass: "status-partial",
  },
  {
    church: "Kolwezi Marika",
    churchSub: "",
    initials: "KM",
    color: "#1E3A5F",
    city: "Lualaba · Commune Manika",
    zone: "PROV",
    resp: "Pasteur Nawengi Daniel",
    respRef: "Mén. CNR-058-KL",
    date: "17 Oct 2026",
    period: "Semaine 42",
    periodSub: "Restant ~42",
    canal: "Banque Agence",
    canalRef: "TX-RAW-55010 KL2",
    canalIcon: RiBankLine,
    canalColor: "#2563EB",
    canalBg: "#EFF6FF",
    amount: "$6,800.00",
    cdf: "19,040,000 CDF",
    obs: "Conforme · Versement souscription bancaire confirmée",
    obsNote: "Vérif. banque réussie",
    status: "CRÉDIT BANK OK",
    statusClass: "status-credit",
  },
  {
    church: "Boma Ville",
    churchSub: "",
    initials: "BV",
    color: "#1E40AF",
    city: "Kongo Central · Ville Basse",
    zone: "PROV",
    resp: "Pasteur Nzoko Thomas",
    respRef: "Mén. CNR-041-BM",
    date: "18 Oct 2026",
    period: "Semaine 42",
    periodSub: "Airtel Money",
    canal: "Airtel Money",
    canalRef: "TX-AM 2026-10 SS1",
    canalIcon: RiSmartphoneLine,
    canalColor: "#D97706",
    canalBg: "#FFFBEB",
    amount: "$2,850.00",
    cdf: "7,980,000 CDF",
    obs: "Versement direct sur compte Airtel Corpo · CDF conforme",
    obsNote: "Bordereau acquisition réussie",
    status: "VALIDE SIÈGE",
    statusClass: "status-valide",
  },
];

const periodTabs = [
  "Tous",
  "Octobre 2026 (Semaine 42)",
  "Septembre 2026",
  "Août 2026",
  "T3-2026 Consolidé",
];

const statusFilterTabs = [
  "TOUTES (46)",
  "VALIDE (36)",
  "EN ATTENTE (5)",
  "EN RETARD (3)",
  "PARTIEL (2)",
];

export default function RapportsPage() {
  const [activePeriod, setActivePeriod] = useState("Octobre 2026 (Semaine 42)");
  const [activeZone, setActiveZone] = useState("Kinshasa (Location GB)");
  const [activeStatus, setActiveStatus] = useState("TOUTES (46)");

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="main-area">
        <Header activeTab="EXERCICE HEBDOMADAIRE" />
        <main className="page-content">

          {/* Page Header */}
          <div className="page-header" style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10, marginBottom: 8 }}>
              <div>
                <h1 className="page-title">Rapports Hebdomadaires des Versements</h1>
                <p className="page-subtitle">
                  Consolidation et contrôle financier de l'ensemble des 46 Églises Cité de Refuge
                  (Kinshasa, Provinces & International)
                </p>
              </div>
              <div style={{ display: "flex", gap: 8, flexShrink: 0, alignItems: "flex-start" }}>
                <div
                  style={{
                    background: "#ECFDF5",
                    border: "1px solid #A7F3D0",
                    borderRadius: 8,
                    padding: "4px 10px",
                    fontSize: 10,
                    fontWeight: 700,
                    color: "#065F46",
                  }}
                >
                  S-42 · 13-19 Oct 2026 ▾
                </div>
                <button className="btn btn-ghost">
                  <RiDownload2Line size={13} />
                  Exporter (PDF/Excel)
                </button>
                <button className="btn btn-primary">
                  <RiAddLine size={15} />
                  Enregistrer un nouveau versement
                </button>
              </div>
            </div>

            {/* Period Tabs */}
            <div className="period-tabs">
              {periodTabs.map((t) => (
                <button
                  key={t}
                  className={`period-tab${activePeriod === t ? " active" : ""}`}
                  onClick={() => setActivePeriod(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Stats 5-col */}
          <div className="rapports-stats">
            {rapportStats.map((s) => (
              <div className="stat-card" key={s.label}>
                <div className="stat-card-label">
                  <span
                    className="stat-card-label-dot"
                    style={{ background: s.dot }}
                  />
                  {s.label}
                </div>
                <div className="stat-card-amount">
                  {s.amount}
                  <div className="stat-card-amount-sub">{s.amountSub}</div>
                </div>
                {s.badge && (
                  <div style={{ marginTop: 4 }}>
                    <span className="stat-badge-up">↑ {s.badge.replace("↑ ", "")}</span>
                  </div>
                )}
                <div className="stat-progress-bar">
                  <div
                    className="stat-progress-fill"
                    style={{
                      width: `${s.progress}%`,
                      background: s.progressColor,
                    }}
                  />
                </div>
                <div className="stat-card-meta">
                  {s.meta.map((m) => (
                    <div className="stat-card-meta-row" key={m.left}>
                      <span>{m.left}</span>
                      {m.right && <span className="font-bold">{m.right}</span>}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Zone & Status Filter Bar */}
          <div className="filter-bar">
            <div className="filter-tabs">
              {["2026..", "TOUTES OU CONTENU", "Kinshasa (Location GB)", "Provinces (Communes GB)", "International", "46 Communes..."].map(
                (t) => (
                  <button
                    key={t}
                    className={`filter-tab${activeZone === t ? " active" : ""}`}
                    onClick={() => setActiveZone(t)}
                    style={{ fontSize: 10 }}
                  >
                    {t}
                  </button>
                )
              )}
            </div>
            <div className="filter-actions" style={{ flexWrap: "wrap", gap: 6 }}>
              {/* Status filter tabs */}
              <div style={{ display: "flex", gap: 4, flexWrap: "wrap", width: "100%", paddingBottom: 8, borderBottom: "1px solid var(--border-light)", marginBottom: 6 }}>
                <span style={{ fontSize: 9, color: "var(--text-muted)", fontWeight: 700, display: "flex", alignItems: "center", marginRight: 4 }}>STATUT :</span>
                {statusFilterTabs.map((t) => (
                  <button
                    key={t}
                    className={`table-sub-tab${activeStatus === t ? " active" : ""}`}
                    onClick={() => setActiveStatus(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
              {/* Action filters with react-icons */}
              <button className="btn btn-ghost">
                <RiCheckLine size={13} color="var(--green-primary)" /> Valide
              </button>
              <button className="btn btn-ghost">
                <RiBankLine size={13} color="var(--blue-light)" /> Crédit Siège Ok (3)
              </button>
              <button className="btn btn-danger">
                <RiAlarmWarningLine size={13} /> En Retard / En Attente
              </button>
              <button className="btn btn-ghost">
                <RiShieldCheckLine size={13} /> Conformité
              </button>
              <div className="week-badge" style={{ marginLeft: "auto" }}>
                <span className="week-badge-dot" />
                Semaine Actuelle · S-42 Octobre 2026
                <span
                  style={{
                    background: "#00C47D",
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
            </div>
          </div>

          {/* Main Table */}
          <div className="data-table-wrap">
            <div className="table-header-bar">
              <div className="table-title" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <RiFileList3Line size={16} color="var(--green-primary)" />
                Journal Consolidé — S-42 · Versements par Église
              </div>
              <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
                <div className="table-search">
                  <span className="table-search-icon">
                    <RiSearchLine size={12} />
                  </span>
                  <input placeholder="Filtrer par paroisse, pasteur..." />
                </div>
              </div>
            </div>

            <table className="data-table">
              <thead>
                <tr>
                  <th>ÉGLISE & PAROISSE</th>
                  <th>RESPONSABLE DÉCLARANT</th>
                  <th>DATE & PÉRIODE</th>
                  <th>CANAL & RÉF. PIÈCE</th>
                  <th>MONTANT DÉCLARÉ</th>
                  <th>OBSERVATION / JUSTIFICATION</th>
                </tr>
              </thead>
              <tbody>
                {rapportRows.map((row, i) => {
                  const CanalIcon = row.canalIcon;
                  return (
                    <tr key={i} className={row.dimmed ? "row-dimmed" : ""}>
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
                              {row.church}
                              {row.zone && (
                                <span
                                  className={`zone-tag ${
                                    row.zone === "FR" || row.zone === "INTL"
                                      ? "zone-intl"
                                      : "zone-prov"
                                  }`}
                                >
                                  {row.zone}
                                </span>
                              )}
                            </div>
                            {row.churchSub && (
                              <div style={{ fontSize: 9, color: "var(--green-primary)", fontWeight: 600 }}>
                                {row.churchSub}
                              </div>
                            )}
                            <div className="church-location">{row.city}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="resp-cell">
                          <div style={{ fontWeight: 600, color: "var(--text-primary)", fontSize: 11 }}>
                            {row.resp}
                          </div>
                          <div className="resp-ref">{row.respRef}</div>
                        </div>
                      </td>
                      <td>
                        <div style={{ fontSize: 11, fontWeight: 500, color: "var(--text-primary)" }}>
                          {row.date}
                        </div>
                        <div style={{ fontSize: 10, color: "var(--text-secondary)" }}>
                          {row.period}
                        </div>
                        <div
                          style={{
                            fontSize: 9,
                            color:
                              row.periodSub === "En délai actif"
                                ? "var(--status-late)"
                                : "var(--text-muted)",
                            fontWeight: row.periodSub === "En délai actif" ? 700 : 400,
                          }}
                        >
                          {row.periodSub}
                        </div>
                      </td>
                      <td>
                        <div className="canal-cell-type">
                          <div
                            className="canal-icon"
                            style={{ background: row.canalBg }}
                          >
                            <CanalIcon size={14} color={row.canalColor} />
                          </div>
                          <span style={{ fontSize: 10 }}>{row.canal}</span>
                        </div>
                        <div className="canal-ref" style={{ marginTop: 2 }}>{row.canalRef}</div>
                      </td>
                      <td>
                        <div className="amount-cell">
                          <div className="amount-usd">{row.amount}</div>
                          <div className="amount-cdf">{row.cdf}</div>
                        </div>
                        <div style={{ marginTop: 4 }}>
                          <span className={`status-badge ${row.statusClass}`} style={{ fontSize: 8, display: "inline-flex", alignItems: "center", gap: 3 }}>
                            {row.statusClass === "status-valide" && <RiCheckLine size={10} />}
                            {row.statusClass === "status-credit" && <RiBankLine size={10} />}
                            {row.statusClass === "status-partial" && <RiFlashlightLine size={10} />}
                            {row.statusClass === "status-pending" && <RiTimeLine size={10} />}
                            {row.status}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="obs-cell">{row.obs}</div>
                        <div className="obs-note">{row.obsNote}</div>
                        <div className="action-btns" style={{ marginTop: 6 }}>
                          <button className="action-btn" title="Voir détail">
                            <RiEyeLine size={13} />
                          </button>
                          <button className="action-btn" title="Éditer">
                            <RiEditLine size={13} />
                          </button>
                          <button className="action-btn" title="Pièces jointes">
                            <RiAttachmentLine size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="table-footer">
              <div className="table-info">
                Affichage de 1 à 7 sur <strong>41</strong> rapports consolidés S-42
              </div>
              <div className="table-total">
                TOTAL VERSÉ: $84,660,000 USD &nbsp;|&nbsp;
                <button
                  className="btn btn-ghost"
                  style={{ fontSize: 10, padding: "3px 8px", display: "inline-flex" }}
                >
                  Synthèse <RiArrowRightLine size={11} style={{ marginLeft: 3 }} />
                </button>
              </div>
              <div className="pagination">
                <button className="page-btn">
                  <RiArrowLeftSLine size={13} style={{ marginRight: 2 }} />
                  Précédent
                </button>
                <button className="page-btn active">1</button>
                <button className="page-btn">2</button>
                <button className="page-btn">3</button>
                <button className="page-btn">4</button>
                <button className="page-btn">
                  Suivant
                  <RiArrowRightSLine size={13} style={{ marginLeft: 2 }} />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Info Boxes */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            {/* Répartition par canal */}
            <div className="dashboard-chart-card">
              <div className="card-title" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <RiBarChartBoxLine size={16} color="var(--blue-light)" />
                Répartition par Canal de Versement
              </div>
              {[
                { label: "Virements Bancaires (RTGS / SWFL B10)", pct: 23, amount: "$18,350.00", fill: 23, color: "#3B82F6" },
                { label: "Espèces Guichet Siège", pct: 49, amount: "$40,620.00", fill: 49, color: "#00C47D" },
                { label: "Mobile Money (Airtel, M-Pesa & Orange)", pct: 16, amount: "$13,170.00", fill: 16, color: "#F59E0B" },
              ].map((c) => (
                <div key={c.label} style={{ marginBottom: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, marginBottom: 3 }}>
                    <span style={{ color: "var(--text-secondary)" }}>{c.label}</span>
                    <span style={{ fontWeight: 700 }}>{c.pct}%</span>
                  </div>
                  <div className="canal-bar-wrap">
                    <div className="canal-bar-fill" style={{ width: `${c.fill}%`, background: c.color }} />
                  </div>
                  <div style={{ fontSize: 9, color: "var(--text-muted)", marginTop: 2 }}>
                    {c.amount}
                  </div>
                </div>
              ))}
              <div style={{ fontSize: 9, color: "var(--text-muted)", marginTop: 8, borderTop: "1px solid var(--border-light)", paddingTop: 6 }}>
                Taux de réconciliation globale: <strong>84.8%</strong>
              </div>
            </div>

            {/* Règles de clôture */}
            <div className="dashboard-chart-card">
              <div className="card-title" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <RiTimeLine size={16} color="var(--green-primary)" />
                Règles de Clôture Hebdomadaire
              </div>
              {[
                { zone: "Kinshasa", icon: RiMapPinLine, rule: "Dimanche avant 20h00", sub: "En cas de non-dépôt des bordereaux et d'espèces au guichet central" },
                { zone: "Provinces", icon: RiCompass3Line, rule: "Lundi avant 12h00", sub: "En cas de retard, aviser Mobile Money disponible Airtel/M-Pesa au guichet Pasteur" },
                { zone: "Clôture définitiv. Siège", icon: RiBuilding4Line, rule: "Mardi 17h00", sub: "Consolidation de la semaine par le Délégué Pasteur Central" },
              ].map((r) => {
                const ZoneIcon = r.icon;
                return (
                  <div
                    key={r.zone}
                    style={{
                      padding: "8px 0",
                      borderTop: "1px solid var(--border-light)",
                      fontSize: 10,
                    }}
                  >
                    <div style={{ fontWeight: 700, color: "var(--text-primary)", marginBottom: 2, display: "flex", alignItems: "center", gap: 4 }}>
                      <ZoneIcon size={12} color="var(--green-primary)" />
                      {r.zone} · <span style={{ color: "var(--green-primary)" }}>{r.rule}</span>
                    </div>
                    <div style={{ color: "var(--text-muted)", lineHeight: 1.4 }}>{r.sub}</div>
                  </div>
                );
              })}
              <div style={{ fontSize: 9, color: "var(--text-muted)", marginTop: 6 }}>
                Solde de régularité: <strong>89.1%</strong> · Fenêtre: S-42 Ouvert
              </div>
            </div>

            {/* Assistance & bloqués */}
            <div className="dashboard-chart-card" style={{ background: "#FFFBEB", borderColor: "#FDE68A" }}>
              <div className="card-title" style={{ color: "#92400E", display: "flex", alignItems: "center", gap: 6 }}>
                <RiAlertFill size={15} color="#D97706" />
                Assistance & Bloqués en Difficulté
              </div>
              <div style={{ fontSize: 10, color: "#78350F", marginBottom: 10, lineHeight: 1.5 }}>
                En cas d'incident (réseau bancaire, difficultés Airtel Vodacom etc.) le responsable doit immédiatement notifier le Secrétaire Financier Siège.
              </div>
              <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                <button
                  className="btn"
                  style={{
                    background: "#92400E",
                    color: "#fff",
                    border: "none",
                    fontSize: 10,
                    flex: 1,
                    justifyContent: "center",
                  }}
                >
                  <RiPhoneLine size={13} />
                  +243 81 080 6046 (URGENCE)
                </button>
              </div>
              <button
                className="btn btn-ghost"
                style={{ width: "100%", justifyContent: "center", fontSize: 10 }}
              >
                <RiTicketLine size={13} />
                Ouvrir Ticket Dérogation / Justificatif
              </button>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
