"use client";

import { useEffect, useState } from "react";

const DECOUVERTS: Record<string, number> = {
  "Jamais": 0,
  "1 à 3 fois": 2,
  "4 à 8 fois": 6,
  "Plus de 8 fois": 10,
};
const REJETS: Record<string, number> = {
  "Aucun": 0,
  "1 ou 2": 2,
  "3 à 5": 4,
  "Plus de 5": 7,
};
const OPTIONS: Record<string, number> = {
  "Oui, sûrement": 36,
  "Je ne sais pas": 18,
  "Non": 0,
};

const COMMISSION = 8;
const REJET = 20;

type Calcul = {
  decouverts: number;
  rejets: number;
  options: number;
  total: number;
  mensuel: number;
  pro: boolean;
};

function euros(n: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function EcranCalcul() {
  const [calcul, setCalcul] = useState<Calcul | null>(null);
  const [pret, setPret] = useState(false);

  useEffect(() => {
    try {
      const brut = localStorage.getItem("agios_reponses");
      if (brut) {
        const r: Record<string, string> = JSON.parse(brut);
        const decouverts = (DECOUVERTS[r.decouvert] ?? 0) * COMMISSION;
        const rejets = (REJETS[r.rejets] ?? 0) * REJET;
        const options = OPTIONS[r.options] ?? 0;
        const total = decouverts + rejets + options;
        const resultat: Calcul = {
          decouverts,
          rejets,
          options,
          total,
          mensuel: Math.round(total / 12),
          pro: r.profil !== "Mes dépenses personnelles",
        };
        setCalcul(resultat);
        localStorage.setItem("agios_calcul", JSON.stringify(resultat));
      }
    } catch {}
    setPret(true);
  }, []);

  if (!pret) return <main className="min-h-screen" />;

  if (!calcul) {
    return (
      <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-5">
        <h1 className="font-titre text-3xl font-semibold text-sapin">
          On n&apos;a pas encore tes réponses.
        </h1>
        <a
          href="/commencer"
          className="mt-8 flex min-h-14 items-center justify-center rounded-xl bg-brule px-6 text-lg font-semibold text-white"
        >
          Répondre au questionnaire
        </a>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col px-5 pb-12 pt-8">
      <p className="text-sm uppercase tracking-wide text-sapin/70">
        Ton estimation
      </p>

      {calcul.total > 0 ? (
        <>
          <h1 className="mt-3 font-titre text-4xl font-semibold leading-tight text-sapin">
            Ta banque t&apos;a peut-être pris{" "}
            <span className="underline decoration-brule decoration-4 underline-offset-4">
              jusqu&apos;à {euros(calcul.total)}
            </span>{" "}
            en 12 mois.
          </h1>
          <p className="mt-4 text-lg">
            Soit environ <strong>{euros(calcul.mensuel)} par mois</strong> de
            frais que tu pourrais contester.
          </p>
        </>
      ) : (
        <h1 className="mt-3 font-titre text-4xl font-semibold leading-tight text-sapin">
          Tu déclares très peu de frais. Ton relevé dira la vérité.
        </h1>
      )}

      <section className="mt-8 rounded-2xl bg-sapin p-6 text-creme">
        <p className="text-sm uppercase tracking-wide text-creme/70">
          D&apos;où vient ce chiffre
        </p>
        <ul className="mt-3 space-y-2 text-lg">
          <li className="flex justify-between">
            <span>Commissions d&apos;intervention</span>
            <span className="font-semibold">{euros(calcul.decouverts)}</span>
          </li>
          <li className="flex justify-between">
            <span>Rejets</span>
            <span className="font-semibold">{euros(calcul.rejets)}</span>
          </li>
          <li className="flex justify-between">
            <span>Options inutiles</span>
            <span className="font-semibold">{euros(calcul.options)}</span>
          </li>
        </ul>
      </section>

      {calcul.pro ? (
        <p className="mt-6 rounded-xl border-2 border-brule/40 p-4 text-sm">
          Pour un compte professionnel, les plafonds légaux ne s&apos;appliquent
          pas de la même façon. Ton relevé permettra de voir ce qui est
          réellement contestable.
        </p>
      ) : null}

      <p className="mt-6 text-sm text-sapin/70">
        Estimation faite à partir de tes réponses : jusqu&apos;à 8 € par
        commission d&apos;intervention (plafond légal) et environ 20 € par
        rejet. Ton relevé donnera le chiffre exact.
      </p>

      <h2 className="mt-10 font-titre text-2xl font-semibold text-sapin">
        Et maintenant ?
      </h2>
      <p className="mt-2 text-lg">
        Dépose ton relevé : on repère les lignes exactes et on prépare ton
        courrier de réclamation.
      </p>

      <a
        href="/compte"
        className="mt-6 flex min-h-14 items-center justify-center rounded-xl bg-brule px-6 text-center text-lg font-semibold text-white"
      >
        Créer mon compte gratuit
      </a>
    </main>
  );
}
