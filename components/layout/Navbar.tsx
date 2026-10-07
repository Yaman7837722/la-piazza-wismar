"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  "Home", "Restaurant", "Speisekarte", "Kontakt",
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let wasScrolled = window.scrollY > 24;
    setScrolled(wasScrolled);
    const onScroll = () => {
      const isScrolled = window.scrollY > 24;
      if (isScrolled === wasScrolled) return;
      wasScrolled = isScrolled;
      setScrolled(isScrolled);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <header className={`navbar ${scrolled || open ? "navbar--solid" : ""}`} data-navbar>
    <div className="navbar__inner">
      <a href="#home" className="brand" aria-label="La Piazza, zur Startseite" onClick={() => setOpen(false)}>
        <span className="brand__name">LA PIAZZA</span>
        <span className="brand__sub">RISTORANTE <span>·</span> PIZZERIA</span>
      </a>
      <nav className="navbar__links" aria-label="Hauptnavigation">
        {navItems.map((item) => item === "Home" ? <a key={item} href="#home" className="is-current" aria-current="page">{item}</a> : <span key={item} title="Bereich folgt in einer späteren Phase">{item}</span>)}
      </nav>
      <button className="menu-button" type="button" aria-label={open ? "Menü schließen" : "Menü öffnen"} aria-expanded={open} aria-controls={open ? "mobile-navigation" : undefined} onClick={() => setOpen(!open)}>{open ? <X size={26} /> : <Menu size={26} />}</button>
    </div>
    {open && <nav id="mobile-navigation" className="mobile-nav mobile-nav--open" aria-label="Mobile Navigation">
      {navItems.map((item, index) => item === "Home" ? <a key={item} href="#home" onClick={() => setOpen(false)}><span>0{index + 1}</span>{item}</a> : <div className="mobile-nav__future" key={item} title="Bereich folgt in einer späteren Phase"><span>0{index + 1}</span>{item}</div>)}
    </nav>}
  </header>;
}
