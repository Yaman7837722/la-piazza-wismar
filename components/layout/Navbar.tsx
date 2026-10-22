"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Restaurant", href: "#story" },
  { label: "Speisekarte", href: "#speisekarte" },
  { label: "Kontakt", href: "#kontakt" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 980px)");
    let wasScrolled = window.scrollY > 24;
    const onScroll = () => {
      const isScrolled = window.scrollY > 24;
      if (isScrolled === wasScrolled) return;
      wasScrolled = isScrolled;
      setScrolled(isScrolled);
    };
    const syncMode = () => {
      window.removeEventListener("scroll", onScroll);
      if (mobile.matches) {
        setScrolled(false);
      } else {
        wasScrolled = window.scrollY > 24;
        setScrolled(wasScrolled);
        window.addEventListener("scroll", onScroll, { passive: true });
      }
    };
    syncMode();
    mobile.addEventListener("change", syncMode);
    return () => {
      mobile.removeEventListener("change", syncMode);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return <header className={`navbar ${scrolled || open ? "navbar--solid" : ""}`} data-navbar>
    <div className="navbar__inner">
      <a href="#home" className="brand" aria-label="La Piazza, zur Startseite" onClick={() => setOpen(false)}>
        <span className="brand__name">LA PIAZZA</span>
        <span className="brand__sub">RISTORANTE <span>·</span> PIZZERIA</span>
      </a>
      <nav className="navbar__links" aria-label="Hauptnavigation">
        {navItems.map(item => <a key={item.label} href={item.href} className={item.label === "Home" ? "is-current" : undefined} aria-current={item.label === "Home" ? "page" : undefined}>{item.label}</a>)}
      </nav>
      <button className="menu-button" type="button" aria-label={open ? "Menü schließen" : "Menü öffnen"} aria-expanded={open} aria-controls={open ? "mobile-navigation" : undefined} onClick={() => setOpen(!open)}>{open ? <X size={26} /> : <Menu size={26} />}</button>
    </div>
    {open && <nav id="mobile-navigation" className="mobile-nav mobile-nav--open" aria-label="Mobile Navigation">
      {navItems.map((item, index) => <a key={item.label} href={item.href} onClick={() => setOpen(false)}><span>0{index + 1}</span>{item.label}</a>)}
    </nav>}
  </header>;
}
