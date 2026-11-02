"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import {
  RiStore2Line,
  RiAddLine,
  RiDownload2Line,
  RiSearchLine,
  RiCheckLine,
  RiTimeLine,
  RiMoneyDollarCircleLine,
  RiExchangeDollarLine,
  RiPrinterLine,
  RiFileTextLine,
  RiShieldCheckLine,
} from "react-icons/ri";
import { getStoredUser, UserSession } from "@/lib/auth";

const shopStats = [
  {
    label: "COMMISSIONS SHOP S-42",
    amount: "$4,890.00",
    sub: "+4.36% marge brute",
    dot: "#8B5CF6",
    progress: 74,
    color: "#8B5CF6",
    meta: "342 opérations traitées",
  },
  {
    label: "ENCAISSEMENTS GUICHET",
    amount: "$49,630.00",
    sub: "Espèces physiques collectées",
    dot: "#00C47D",
    progress: 88,
    color: "#00C47D",
    meta: "38 bordereaux paroisses",
  },
  {
    label: "TAUX DE CHANGE APPLIQUÉ",
    amount: "2,800 CDF",
    sub: "Fixé par Trésorerie Centrale",
    dot: "#3B82F6",
    progress: 100,
    color: "#3B82F6",
    meta: "Mise à jour: ce matin 08h00",
  },
  {
    label: "ÉTAT DE LA CAISSE",
    amount: "ÉQUILIBRÉE",
    sub: "Guichet Limete Ouvert",
    dot: "#10B981",
    progress: 100,
    color: "#10B981",
    meta: "Solde vérifié: $12,920.00",
  },
];

const operationsData = [
  {
    ref: "OP-2026-904",
    client: "Paroisse Cité de Refuge Limete",
    motif: "Versement Hebdo Culte Dimanche",
    canal: "Espèces Guichet",
    brut: "$15,850.00",
    commission: "$158.50 (1%)",
    net: "$15,691.50",
    heure: "10:24",
    status: "ENCAISSÉ",
    statusClass: "status-valide",
  },
  {
    ref: "OP-2026-905",
    client: "Diacre Mutombo Eric (Bandulungwa)",
    motif: "Dîmes & Offrandes paroissiales",
    canal: "Espèces Guichet",
    brut: "$5,400.00",
    commission: "$54.00 (1%)",
    net: "$5,346.00",
    heure: "11:15",
    status: "ENCAISSÉ",
    statusClass: "status-valide",
  },
  {
    ref: "OP-2026-906",
    client: "Fidèle Kabasele Jean",
    motif: "Change Devises USD -> CDF",
    canal: "Change Cash",
    brut: "$500.00",
    commission: "$12.50",
    net: "1,365,000 CDF",
    heure: "12:02",
    status: "ENCAISSÉ",
    statusClass: "status-valide",
  },
  {
    ref: "OP-2026-907",
    client: "Trésorier Makesse (Masina Pascal)",
    motif: "Acompte Versement Culte S42",
    canal: "Avance Espèces",
    brut: "$3,100.00",
    commission: "$31.00 (1%)",
    net: "$3,069.00",
    heure: "14:30",
    status: "EN ATTENTE VISA",
    statusClass: "status-partial",
  },
  {
    ref: "OP-2026-908",
    client: "Transfert Inter-Paroisses Goma",
    motif: "Mise à disposition fonds missionnaire",
    canal: "Shop Mobile Money",
    brut: "$1,200.00",
    commission: "$24.00 (2%)",
    net: "$1,176.00",
    heure: "15:10",
    status: "ENCAISSÉ",
    statusClass: "status-valide",
  },
];

export default function CommissionsPage() {
  const [user, setUser] = useState<UserSession | null>(null);

  useEffect(() => {
    setUser(getStoredUser());
  }, []);

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="main-area">
        <Header activeTab="GUICHET SHOP" />
        <main className="page-content">

          {/* Page Header */}
          <div className="page-header flex items-center justify-between">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <h1 className="page-title">Guichet & Commissions Shop</h1>
                <span
                  style={{
                    background: "#ECFDF5",
                    border: "1px solid #A7F3D0",
                    color: "#065F46",
                    fontSize: 10,
                    fontWeight: 700,
                    padding: "3px 8px",
                    borderRadius: 6,
                  }}
                >
                  {user?.role === "percepteur" ? "ESPACE PERCEPTEUR ACTIF" : "VUE GUICHET"}
                </span>
              </div>
              <p className="page-subtitle">
                Gestion des opérations d'encaissement, perception des dépôts paroissiaux et commissions de change.
              </p>
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn btn-ghost">
                <RiDownload2Line size={13} />
                Bordereau Journalier (PDF)
              </button>
              <button className="btn btn-primary">
                <RiAddLine size={15} />
                Nouvel Encaissement Guichet
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="stats-grid">
            {shopStats.map((s) => (
              <div className="stat-card" key={s.label}>
                <div className="stat-card-label">
                  <span className="stat-card-label-dot" style={{ background: s.dot }} />
                  {s.label}
                </div>
                <div className="stat-card-amount">
                  {s.amount}
                  <div className="stat-card-amount-sub">{s.sub}</div>
                </div>
                <div className="stat-progress-bar">
                  <div
                    className="stat-progress-fill"
                    style={{ width: `${s.progress}%`, background: s.color }}
                  />
                </div>
                <div className="stat-card-meta">
                  <div className="stat-card-meta-row">
                    <span>{s.meta}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Table of operations */}
          <div className="data-table-wrap">
            <div className="table-header-bar">
              <div className="table-title" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <RiStore2Line size={16} color="var(--green-primary)" />
                Journal des Opérations du Guichet — Aujourd'hui
              </div>
              <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
                <div className="table-search">
                  <span className="table-search-icon">
                    <RiSearchLine size={12} />
                  </span>
                  <input placeholder="Rechercher par référence, paroisse..." />
                </div>
              </div>
            </div>

            <table className="data-table">
              <thead>
                <tr>
                  <th>RÉFÉRENCE & HEURE</th>
                  <th>BÉNÉFICIAIRE / PAROISSE</th>
                  <th>MOTIF OPÉRATION</th>
                  <th>CANAL</th>
                  <th>MONTANT BRUT</th>
                  <th>COMMISSION SHOP</th>
                  <th>STATUT</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {operationsData.map((row) => (
                  <tr key={row.ref}>
                    <td>
                      <div style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: 11 }}>
                        {row.ref}
                      </div>
                      <div style={{ fontSize: 9, color: "var(--text-muted)" }}>{row.heure}</div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600, color: "var(--text-primary)", fontSize: 11 }}>
                        {row.client}
                      </div>
                    </td>
                    <td>
                      <div style={{ fontSize: 11, color: "var(--text-secondary)" }}>{row.motif}</div>
                    </td>
                    <td>
                      <div style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 10, background: "#F1F5F9", padding: "2px 6px", borderRadius: 4 }}>
                        <RiMoneyDollarCircleLine size={12} color="#059669" />
                        {row.canal}
                      </div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: 11 }}>
                        {row.brut}
                      </div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 700, color: "#8B5CF6", fontSize: 11 }}>
                        {row.commission}
                      </div>
                      <div style={{ fontSize: 9, color: "var(--text-muted)" }}>Net: {row.net}</div>
                    </td>
                    <td>
                      <span className={`status-badge ${row.statusClass}`} style={{ display: "inline-flex", alignItems: "center", gap: 3 }}>
                        {row.statusClass === "status-valide" ? <RiCheckLine size={11} /> : <RiTimeLine size={11} />}
                        {row.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-btns">
                        <button className="action-btn" title="Imprimer reçu">
                          <RiPrinterLine size={13} />
                        </button>
                        <button className="action-btn" title="Détails">
                          <RiFileTextLine size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </main>
      </div>
    </div>
  );
}
