export default function Accueil() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col px-5 pb-12 pt-8">
      <p className="font-titre text-xl font-semibold text-sapin">Agios</p>

      <h1 className="mt-10 font-titre text-4xl font-semibold leading-tight text-sapin">
        Récupère les frais bancaires{" "}
        <span className="underline decoration-brule decoration-4 underline-offset-4">
          prélevés à tort
        </span>
        .
      </h1>

      <p className="mt-5 text-lg leading-relaxed">
        Commissions d&apos;intervention, frais de rejet, options que tu
        n&apos;utilises pas : ils s&apos;ajoutent par petites lignes illisibles
        sur ton relevé. La plupart sont plafonnés par la loi, et presque
        jamais contestés.
      </p>

      <a
        href="/commencer"
        className="mt-8 flex min-h-14 items-center justify-center rounded-xl bg-brule px-6 text-lg font-semibold text-white"
      >
        Commencer, c&apos;est gratuit
      </a>
      <p className="mt-3 text-center text-sm text-sapin/70">
        Deux minutes. Aucune carte demandée.
      </p>

      <section className="mt-12 rounded-2xl bg-sapin p-6 text-creme">
        <p className="text-sm uppercase tracking-wide text-creme/70">
          Ce que la loi autorise au maximum
        </p>
        <p className="mt-2 font-titre text-5xl font-semibold">80 €</p>
        <p className="mt-1 text-lg">
          de commissions d&apos;intervention par mois, soit jusqu&apos;à 960 € par an.
        </p>
        <p className="mt-3 text-sm text-creme/80">
          Combien en as-tu payé ? Tu vas le savoir.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="font-titre text-2xl font-semibold text-sapin">
          Comment ça marche
        </h2>
        <ul className="mt-5 space-y-5">
          <li>
            <p className="font-semibold">1. Tu déposes ton relevé</p>
            <p className="text-sapin/80">
              On repère toutes les lignes de frais, même les plus discrètes.
            </p>
          </li>
          <li>
            <p className="font-semibold">2. Tu vois le total sur douze mois</p>
            <p className="text-sapin/80">
              Comparé aux plafonds légaux, en euros, sans jargon.
            </p>
          </li>
          <li>
            <p className="font-semibold">3. Tu envoies ton courrier</p>
            <p className="text-sapin/80">
              Il est déjà rédigé, adressé à ton agence. Tu suis ensuite tes
              remboursements.
            </p>
          </li>
        </ul>
      </section>

      <section className="mt-12 rounded-2xl border-2 border-dashed border-sapin/30 p-5 text-center text-sapin/70">
        Les premiers témoignages de personnes remboursées apparaîtront ici.
      </section>

      <a
        href="/commencer"
        className="mt-10 flex min-h-14 items-center justify-center rounded-xl bg-brule px-6 text-lg font-semibold text-white"
      >
        Commencer, c&apos;est gratuit
      </a>
    </main>
  );
}
