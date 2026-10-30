import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DominionShop — Gestion Multi-Services",
  description: "Système de gestion financière DominionShop en connivence avec l'église Cité de Refuge. Suivi des fonds, dépenses et commissions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
