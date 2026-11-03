"use client";

import { useState } from "react";

type Question = {
  id: string;
  titre: string;
  aide?: string;
  choix: string[];
};

const QUESTIONS: Question[] = [
  {
    id: "decouvert",
    titre: "Ces 12 derniers mois, combien de fois ton compte est-il passé à découvert ?",
    choix: ["Jamais", "1 à 3 fois", "4 à 8 fois", "Plus de 8 fois"],
  },
  {
    id: "rejets",
    titre: "Combien de prélèvements ou de chèques ont été rejetés ?",
    aide: "Un rejet, c'est quand ta banque refuse de payer, faute d'argent sur le compte.",
    choix: ["Aucun", "1 ou 2", "3 à 5", "Plus de 5"],
  },
  {
    id: "frais_mois",
    titre: "Combien penses-tu payer de frais bancaires par mois ?",
    aide: "Cotisation de carte, commissions, options… tout compris.",
    choix: ["Moins de 5 €", "5 à 15 €", "15 à 30 €", "Plus de 30 €", "Aucune idée"],
  },
  {
    id: "options",
    titre: "Paies-tu des options que tu n'utilises pas vraiment ?",
    aide: "Alertes SMS, assurance de la carte, offre « premium »…",
    choix: ["Oui, sûrement", "Non", "Je ne sais pas"],
  },
  {
    id: "conteste",
    titre: "As-tu déjà contesté des frais auprès de ta banque ?",
    choix: ["Jamais", "Oui, et j'ai été remboursé", "Oui, mais refusé"],
  },
  {
    id: "profil",
    titre: "Ce compte te sert pour…",
    choix: [
      "Mes dépenses personnelles",
      "Mon activité (indépendant, asso, petite entreprise)",
    ],
  },
  {
    id: "banque",
    titre: "Quelle est ta banque ?",
    choix: [
      "Crédit Agricole",
      "BNP Paribas",
      "Société Générale",
      "LCL",
      "Caisse d'Épargne",
      "Banque Populaire",
      "La Banque Postale",
      "Crédit Mutuel",
      "Autre",
    ],
  },
];

export default function Questionnaire() {
  const [index, setIndex] = useState(0);
  const [reponses, setReponses] = useState<Record<string, string>>({});
  const q = QUESTIONS[index];
  const progression = Math.round(((index + 1) / QUESTIONS.length) * 100);

  function choisir(choix: string) {
    const suite = { ...reponses, [q.id]: choix };
    setReponses(suite);
    if (index === QUESTIONS.length - 1) {
      try {
        localStorage.setItem("agios_reponses", JSON.stringify(suite));
      } catch {}
      window.location.href = "/calcul";
    } else {
      setIndex(index + 1);
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col px-5 pb-10 pt-6">
      <div className="flex items-center justify-between">
        {index > 0 ? (
          <button
            onClick={() => setIndex(index - 1)}
            className="min-h-11 pr-4 text-sapin"
          >
            ← Retour
          </button>
        ) : (
          <a href="/" className="flex min-h-11 items-center pr-4 text-sapin">
            ← Accueil
          </a>
        )}
        <p className="text-sm text-sapin/70">
          {index + 1} sur {QUESTIONS.length}
        </p>
      </div>

      <div className="mt-2 h-2 w-full rounded-full bg-sapin/15">
        <div
          className="h-2 rounded-full bg-brule transition-all"
          style={{ width: `${progression}%` }}
        />
      </div>

      <h1 className="mt-10 font-titre text-3xl font-semibold leading-tight text-sapin">
        {q.titre}
      </h1>
      {q.aide ? <p className="mt-3 text-sapin/80">{q.aide}</p> : null}

      <div className="mt-8 flex flex-col gap-3">
        {q.choix.map((c) => (
          <button
            key={c}
            onClick={() => choisir(c)}
            className="min-h-14 rounded-xl border-2 border-sapin/20 bg-white px-4 py-3 text-left text-lg font-medium text-encre active:border-brule active:bg-brule/10"
          >
            {c}
          </button>
        ))}
      </div>
    </main>
  );
}
