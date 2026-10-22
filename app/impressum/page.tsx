import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { getIndexableOrigin } from "@/lib/site";

const origin = getIndexableOrigin();

export const metadata: Metadata = {
  title: "Impressum | La Piazza Ristorante Wismar",
  description: "Impressum von La Piazza Ristorante Wismar, Am Markt 7, 23966 Wismar.",
  ...(origin ? { alternates: { canonical: `${origin}/impressum` } } : {}),
};

export default function ImpressumPage() {
  return <LegalPage title="Impressum" eyebrow="Rechtliche Angaben" updated="Stand: 23. Oktober 2026" otherHref="/datenschutz" otherLabel="Datenschutzerklärung">
    <section aria-labelledby="anbieter">
      <h2 id="anbieter">Angaben gemäß § 5 DDG</h2>
      <address>
        <strong>La Piazza Ristorante Wismar</strong><br />
        Einzelunternehmen<br />
        Inhaber: Antonio Ciccotto<br />
        Am Markt 7<br />
        23966 Wismar<br />
        Deutschland
      </address>
    </section>

    <section aria-labelledby="kontakt-impressum">
      <h2 id="kontakt-impressum">Kontakt</h2>
      <p>Telefon: <a href="tel:+4915737497525">+49 157 37497525</a><br />
        E-Mail: <a href="mailto:info@lapiazzawismar.com">info@lapiazzawismar.com</a></p>
    </section>
  </LegalPage>;
}
