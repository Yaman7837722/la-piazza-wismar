import type { ReactNode } from "react";
import Link from "next/link";

type LegalPageProps = {
  title: string;
  eyebrow: string;
  updated: string;
  otherHref: string;
  otherLabel: string;
  children: ReactNode;
};

export function LegalPage({ title, eyebrow, updated, otherHref, otherLabel, children }: LegalPageProps) {
  return <main className="legal-page">
    <div className="legal-page__topbar">
      <Link className="legal-page__back" href="/">← Zur Startseite</Link>
      <span>LA PIAZZA <i aria-hidden="true">·</i> WISMAR</span>
    </div>
    <article className="legal-page__article">
      <header className="legal-page__header">
        <p className="legal-page__eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="legal-page__updated">{updated}</p>
      </header>
      <div className="legal-page__content">{children}</div>
      <nav className="legal-page__navigation" aria-label="Weitere rechtliche Informationen">
        <Link href={otherHref}>{otherLabel} <span aria-hidden="true">→</span></Link>
        <Link href="/">Zur Startseite <span aria-hidden="true">→</span></Link>
      </nav>
    </article>
    <footer className="legal-page__footer"><span>La Piazza Ristorante Wismar</span><Link href="/">Am Markt 7 · 23966 Wismar</Link></footer>
  </main>;
}
