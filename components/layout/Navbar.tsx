"use client";

import { useEffect, useState } from "react";
import { CalendarDays, Menu, X } from "lucide-react";

const navItems = [
  "Home", "Restaurant", "Speisekarte", "Bestellen", "Reservieren", "Kontakt",
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return <header className={`navbar ${scrolled || open ? "navbar--solid" : ""}`} data-navbar>
    <div className="navbar__inner">
      <a href="#home" className="brand" aria-label="La Piazza, zur Startseite" onClick={() => setOpen(false)}>
        <span className="brand__name">LA PIAZZA</span>
        <span className="brand__sub">RISTORANTE <span>·</span> PIZZERIA</span>
      </a>
      <nav className="navbar__links" aria-label="Hauptnavigation">
        {navItems.map((item) => item === "Home" ? <a key={item} href="#home" className="is-current" aria-current="page">{item}</a> : <span key={item} title="Bereich folgt in einer späteren Phase">{item}</span>)}
      </nav>
      <button className="navbar__cta" type="button" aria-disabled="true" title="Reservierung folgt in einer späteren Phase"><CalendarDays size={16} strokeWidth={1.7} /><span>Tisch reservieren</span></button>
      <button className="menu-button" type="button" aria-label={open ? "Menü schließen" : "Menü öffnen"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X size={26} /> : <Menu size={26} />}</button>
    </div>
    <nav id="mobile-navigation" className={`mobile-nav ${open ? "mobile-nav--open" : ""}`} aria-label="Mobile Navigation" inert={!open}>
      {navItems.map((item, index) => item === "Home" ? <a key={item} href="#home" onClick={() => setOpen(false)}><span>0{index + 1}</span>{item}</a> : <div className="mobile-nav__future" key={item} title="Bereich folgt in einer späteren Phase"><span>0{index + 1}</span>{item}</div>)}
      <button className="mobile-nav__cta" type="button" aria-disabled="true" title="Reservierung folgt in einer späteren Phase"><CalendarDays size={18} />Tisch reservieren</button>
    </nav>
  </header>;
}
