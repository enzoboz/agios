"use client";

import { FormEvent, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Mode = "creer" | "connexion";

function messageErreur(texte: string) {
  const t = texte.toLowerCase();
  if (t.includes("already registered"))
    return "Un compte existe déjà avec cet e-mail. Connecte-toi plutôt.";
  if (t.includes("invalid login"))
    return "E-mail ou mot de passe incorrect.";
  if (t.includes("password"))
    return "Le mot de passe doit contenir au moins 8 caractères.";
  if (t.includes("rate limit"))
    return "Trop d'essais. Réessaie dans quelques minutes.";
  return "Une erreur est survenue. Réessaie dans un instant.";
}

export default function Compte() {
  const [mode, setMode] = useState<Mode>("creer");
  const [email, setEmail] = useState("");
  const [mdp, setMdp] = useState("");
  const [erreur, setErreur] = useState("");
  const [attente, setAttente] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) window.location.href = "/espace";
    });
  }, []);

  async function envoyer(e: FormEvent) {
    e.preventDefault();
    setErreur("");
    if (mdp.length < 8) {
      setErreur("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }
    setAttente(true);

    if (mode === "creer") {
      const { data, error } = await supabase.auth.signUp({
        email,
        password: mdp,
      });
      if (error) {
        setErreur(messageErreur(error.message));
        setAttente(false);
        return;
      }
      if (!data.session || !data.user) {
        setErreur(
          "Ton compte est créé, mais une confirmation est demandée. Réessaie de te connecter dans un instant."
        );
        setAttente(false);
        return;
      }
      try {
        const reponses = localStorage.getItem("agios_reponses");
        const calcul = localStorage.getItem("agios_calcul");
        if (reponses) {
          await supabase.from("reponses_questionnaire").insert({
            user_id: data.user.id,
            reponses: {
              reponses: JSON.parse(reponses),
              calcul: calcul ? JSON.parse(calcul) : null,
            },
          });
        }
      } catch {}
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password: mdp,
      });
      if (error) {
        setErreur(messageErreur(error.message));
        setAttente(false);
        return;
      }
    }
    window.location.href = "/espace";
  }

  const creation = mode === "creer";

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col px-5 pb-10 pt-6">
      <a href="/" className="flex min-h-11 items-center text-sapin">
        ← Accueil
      </a>

      <h1 className="mt-6 font-titre text-3xl font-semibold leading-tight text-sapin">
        {creation
          ? "Garde ton estimation et dépose ton relevé."
          : "Content de te revoir."}
      </h1>
      <p className="mt-3 text-sapin/80">
        {creation
          ? "Un e-mail et un mot de passe suffisent. Aucune carte bancaire."
          : "Entre ton e-mail et ton mot de passe."}
      </p>

      <form onSubmit={envoyer} className="mt-8 flex flex-col gap-4">
        <label className="flex flex-col gap-2 font-medium">
          E-mail
          <input
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="min-h-14 rounded-xl border-2 border-sapin/20 bg-white px-4 text-lg"
          />
        </label>
        <label className="flex flex-col gap-2 font-medium">
          Mot de passe (8 caractères minimum)
          <input
            type="password"
            autoComplete={creation ? "new-password" : "current-password"}
            required
            value={mdp}
            onChange={(e) => setMdp(e.target.value)}
            className="min-h-14 rounded-xl border-2 border-sapin/20 bg-white px-4 text-lg"
          />
        </label>

        {erreur ? (
          <p className="rounded-xl bg-brule/10 p-3 text-brule">{erreur}</p>
        ) : null}

        <button
          type="submit"
          disabled={attente}
          className="mt-2 flex min-h-14 items-center justify-center rounded-xl bg-brule px-6 text-lg font-semibold text-white disabled:opacity-60"
        >
          {attente
            ? "Un instant…"
            : creation
              ? "Créer mon compte"
              : "Me connecter"}
        </button>
      </form>

      <button
        onClick={() => {
          setErreur("");
          setMode(creation ? "connexion" : "creer");
        }}
        className="mt-6 min-h-11 text-sapin underline"
      >
        {creation
          ? "J'ai déjà un compte : me connecter"
          : "Pas encore de compte : en créer un"}
      </button>

      <p className="mt-6 text-sm text-sapin/70">
        Ton relevé bancaire n&apos;est jamais conservé : seules les lignes de
        frais repérées sont gardées.
      </p>
    </main>
  );
}
