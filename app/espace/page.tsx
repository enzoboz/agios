"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

function euros(n: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function Espace() {
  const [email, setEmail] = useState("");
  const [total, setTotal] = useState<number | null>(null);
  const [pret, setPret] = useState(false);

  useEffect(() => {
    async function charger() {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        window.location.href = "/compte";
        return;
      }
      setEmail(data.session.user.email ?? "");
      const { data: lignes } = await supabase
        .from("reponses_questionnaire")
        .select("reponses")
        .order("created_at", { ascending: false })
        .limit(1);
      const calcul = lignes?.[0]?.reponses?.calcul;
      if (calcul && typeof calcul.total === "number") setTotal(calcul.total);
      setPret(true);
    }
    charger();
  }, []);

  async function deconnexion() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  if (!pret) return <main className="min-h-screen" />;

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col px-5 pb-12 pt-6">
      <div className="flex items-center justify-between">
        <p className="font-titre text-xl font-semibold text-sapin">Agios</p>
        <button
          onClick={deconnexion}
          className="min-h-11 pl-4 text-sm text-sapin underline"
        >
          Me déconnecter
        </button>
      </div>

      <h1 className="mt-10 font-titre text-3xl font-semibold leading-tight text-sapin">
        Bienvenue, ton espace est prêt.
      </h1>
      <p className="mt-2 text-sm text-sapin/70">Connecté : {email}</p>

      {total !== null && total > 0 ? (
        <section className="mt-8 rounded-2xl bg-sapin p-6 text-creme">
          <p className="text-sm uppercase tracking-wide text-creme/70">
            Ton estimation sur 12 mois
          </p>
          <p className="mt-2 font-titre text-5xl font-semibold">
            {euros(total)}
          </p>
          <p className="mt-2 text-creme/80">
            de frais potentiellement contestables. Ton relevé donnera le chiffre
            exact.
          </p>
        </section>
      ) : null}

      <section className="mt-8 rounded-2xl border-2 border-dashed border-sapin/30 p-6">
        <p className="font-titre text-xl font-semibold text-sapin">
          Prochaine étape : ton relevé
        </p>
        <p className="mt-2 text-sapin/80">
          Le dépôt du relevé et le repérage des frais arrivent très bientôt
          dans ton espace.
        </p>
      </section>
    </main>
  );
}

