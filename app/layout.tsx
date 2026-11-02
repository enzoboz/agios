import type { Metadata, Viewport } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dmsans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Agios — Récupère les frais bancaires prélevés à tort",
  description:
    "Commissions d'intervention, frais de rejet, options inutiles : repère-les sur ton relevé et récupère ton argent avec un courrier prêt à envoyer.",
  openGraph: {
    title: "Agios — Récupère les frais bancaires prélevés à tort",
    description:
      "Dépose ton relevé, vois ce que ta banque t'a pris en trop, réclame-le en deux minutes.",
    locale: "fr_FR",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
