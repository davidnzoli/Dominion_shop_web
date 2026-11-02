"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import {
  RiExchangeDollarLine,
  RiAddLine,
  RiDownload2Line,
  RiSearchLine,
  RiCheckLine,
  RiTimeLine,
  RiMoneyDollarCircleLine,
  RiBankLine,
  RiSmartphoneLine,
  RiEyeLine,
  RiFileTextLine,
} from "react-icons/ri";

const versementsData = [
  {
    paroisse: "Cité de Refuge Limete",
    resp: "Pasteur David Murundi",
    type: "Dîmes & Offrandes Dimanche",
    canal: "Espèces Guichet",
    canalIcon: RiMoneyDollarCircleLine,
    canalColor: "#059669",
    amount: "$18,450.00",
    date: "Aujourd'hui 09:30",
    status: "ENCAISSÉ & VALIDÉ",
    statusClass: "status-valide",
  },
  {
    paroisse: "Cité de Refuge Bandulungwa",
    resp: "Diaconesse Sarah Kabey",
    type: "Versement Hebdomadaire",
    canal: "Espèces Guichet",
    canalIcon: RiMoneyDollarCircleLine,
    canalColor: "#059669",
    amount: "$9,200.00",
    date: "Aujourd'hui 10:15",
    status: "ENCAISSÉ & VALIDÉ",
    statusClass: "status-valide",
  },
  {
    paroisse: "Cité de Refuge Lubumbashi",
    resp: "Ancien Joseph Lukumbo",
    type: "Souscription & Versement",
    canal: "Virement Bancaire",
    canalIcon: RiBankLine,
    canalColor: "#2563EB",
    amount: "$12,400.00",
    date: "Hier 16:40",
    status: "CRÉDIT BANQUE OK",
    statusClass: "status-credit",
  },
  {
    paroisse: "Cité de Refuge Matadi Ville",
    resp: "Pasteur Elie Awana",
    type: "Offrandes Hebdomadaires",
    canal: "Airtel Money",
    canalIcon: RiSmartphoneLine,
    canalColor: "#D97706",
    amount: "$4,850.00",
    date: "Hier 14:20",
    status: "ENCAISSÉ & VALIDÉ",
    statusClass: "status-valide",
  },
  {
    paroisse: "Cité de Refuge Masina Pascal",
    resp: "Trésorier Makesse Jean",
    type: "Acompte Culte S42",
    canal: "Avance Espèces",
    canalIcon: RiMoneyDollarCircleLine,
    canalColor: "#059669",
    amount: "$3,120.00",
    date: "Dimanche 18:00",
    status: "DÉPÔT PARTIEL",
    statusClass: "status-partial",
  },
];

export default function VersementsPage() {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="main-area">
        <Header activeTab="VERSEMENTS & COMMISSIONS" />
        <main className="page-content">

          {/* Page Header */}
          <div className="page-header flex items-center justify-between">
            <div>
              <h1 className="page-title">Versements & Dépôts des Paroisses</h1>
              <p className="page-subtitle">
                Enregistrement, contrôle et perception des versements hebdomadaires de culte de toutes les paroisses.
              </p>
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn btn-ghost">
                <RiDownload2Line size={13} />
                Exporter Journal (Excel/PDF)
              </button>
              <button className="btn btn-primary">
                <RiAddLine size={15} />
                Enregistrer un Versement
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="data-table-wrap">
            <div className="table-header-bar">
              <div className="table-title" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <RiExchangeDollarLine size={16} color="var(--green-primary)" />
                Journal des Versements Encaissés
              </div>
              <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
                <div className="table-search">
                  <span className="table-search-icon">
                    <RiSearchLine size={12} />
                  </span>
                  <input placeholder="Rechercher par paroisse, pasteur..." />
                </div>
              </div>
            </div>

            <table className="data-table">
              <thead>
                <tr>
                  <th>PAROISSE & LOCALITÉ</th>
                  <th>RESPONSABLE DÉCLARANT</th>
                  <th>TYPE DE FONDS</th>
                  <th>CANAL & PIÈCE</th>
                  <th>MONTANT</th>
                  <th>DATE & HEURE</th>
                  <th>STATUT</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {versementsData.map((row, idx) => {
                  const CanalIcon = row.canalIcon;
                  return (
                    <tr key={idx}>
                      <td>
                        <div style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: 11 }}>
                          {row.paroisse}
                        </div>
                      </td>
                      <td>
                        <div style={{ fontWeight: 600, color: "var(--text-primary)", fontSize: 11 }}>
                          {row.resp}
                        </div>
                      </td>
                      <td>
                        <div style={{ fontSize: 11, color: "var(--text-secondary)" }}>
                          {row.type}
                        </div>
                      </td>
                      <td>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 10 }}>
                          <CanalIcon size={13} color={row.canalColor} />
                          <span>{row.canal}</span>
                        </div>
                      </td>
                      <td>
                        <div style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: 11 }}>
                          {row.amount}
                        </div>
                      </td>
                      <td>
                        <div style={{ fontSize: 10, color: "var(--text-muted)" }}>
                          {row.date}
                        </div>
                      </td>
                      <td>
                        <span className={`status-badge ${row.statusClass}`} style={{ display: "inline-flex", alignItems: "center", gap: 3 }}>
                          <RiCheckLine size={11} />
                          {row.status}
                        </span>
                      </td>
                      <td>
                        <div className="action-btns">
                          <button className="action-btn" title="Voir bordereau">
                            <RiEyeLine size={13} />
                          </button>
                          <button className="action-btn" title="Reçu">
                            <RiFileTextLine size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

        </main>
      </div>
    </div>
  );
}
