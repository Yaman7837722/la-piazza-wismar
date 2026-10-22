"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

const mapUrl = "https://www.google.com/maps/search/?api=1&query=La%20Piazza%2C%20Am%20Markt%207%2C%2023966%20Wismar";

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const groups = Array.from(section.querySelectorAll<HTMLElement>("[data-contact-reveal]"));
    if (!groups.length) return;
    let sectionObserver: IntersectionObserver | undefined;
    let groupObserver: IntersectionObserver | undefined;
    let fallback: ReturnType<typeof setTimeout> | undefined;

    const revealAll = () => groups.forEach(group => {
      group.dataset.contactRevealed = "true";
      groupObserver?.unobserve(group);
    });
    const initializeGroups = () => {
      try {
        groupObserver = new IntersectionObserver(entries => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const group = entry.target as HTMLElement;
            group.dataset.contactRevealed = "true";
            groupObserver?.unobserve(group);
          }
        }, { rootMargin: "0px 0px -6% 0px" });
        groups.forEach(group => groupObserver?.observe(group));
        section.classList.add("contact--reveal-ready");
        // Once the section is reached, a missed group callback cannot hide content indefinitely.
        fallback = setTimeout(revealAll, 6000);
      } catch {
        groupObserver?.disconnect();
        section.classList.remove("contact--reveal-ready");
      }
    };
    try {
      // If this callback is missed, pre-reveal styles are never enabled.
      sectionObserver = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        sectionObserver?.unobserve(section);
        initializeGroups();
      }, { rootMargin: "200px 0px 200px 0px" });
      sectionObserver.observe(section);
    } catch {
      sectionObserver?.disconnect();
    }

    return () => {
      sectionObserver?.disconnect();
      groupObserver?.disconnect();
      if (fallback) clearTimeout(fallback);
      section.classList.remove("contact--reveal-ready");
    };
  }, []);

  return <section className="contact" id="kontakt" aria-labelledby="kontakt-title" ref={sectionRef}>
    <div className="contact__architecture" aria-hidden="true" />
    <div className="contact__olive contact__olive--top" aria-hidden="true" />
    <div className="contact__olive contact__olive--bottom" aria-hidden="true" />
    <div className="contact__inner">
      <div className="contact__main">
        <div className="contact__emotional">
          <div data-contact-reveal>
            <p className="contact__script" lang="it">A presto</p>
            <h2 className="contact__heading" id="kontakt-title"><span>BENVENUTI</span><span>A LA PIAZZA</span></h2>
          </div>
          <div className="contact__welcome" data-contact-reveal>
            <p>Herzlich Willkommen in La Piazza Ristorante Wismar.<br /><span lang="it">Benvenuti a Tutti!</span></p>
            <div className="contact__tricolore" aria-hidden="true"><i /><i /><i /></div>
          </div>
        </div>

        <div className="contact__details">
          <div className="contact__group" data-contact-reveal>
            <h3>BESUCHEN SIE UNS</h3>
            <address><a href={mapUrl} target="_blank" rel="noopener noreferrer" aria-label="La Piazza, Am Markt 7, 23966 Wismar auf der Karte öffnen">Am Markt 7<br />23966 Wismar</a></address>
          </div>
          <div className="contact__group" data-contact-reveal>
            <h3>ÖFFNUNGSZEITEN</h3>
            <dl className="contact__hours">
              <div><dt>Montag – Freitag</dt><dd>09:30 – 21:30</dd></div>
              <div><dt>Samstag &amp; Sonntag</dt><dd>10:30 – 22:30</dd></div>
            </dl>
          </div>
          <div className="contact__group" data-contact-reveal>
            <h3>KONTAKT</h3>
            <a href="tel:+4915737497525">+49 157 37497525</a>
            <a href="mailto:info@lapiazzawismar.com">info@lapiazzawismar.com</a>
          </div>
          <div className="contact__group" data-contact-reveal>
            <h3>SOCIAL</h3>
            <a href="https://www.instagram.com/lapiazza_wismar/" target="_blank" rel="noopener noreferrer">Instagram<span className="contact__external" aria-hidden="true">↗</span></a>
          </div>
        </div>
      </div>

      <footer className="contact__footer">
        <div className="contact__footer-brand"><strong>LA PIAZZA</strong><span>Ristorante · Pizzeria</span></div>
        <p>Am Markt 7 · 23966 Wismar</p>
        <nav className="contact__legal-links" aria-label="Rechtliche Informationen"><Link href="/impressum">Impressum</Link><Link href="/datenschutz">Datenschutz</Link></nav>
        <p>© {new Date().getFullYear()} La Piazza</p>
      </footer>
    </div>
  </section>;
}
