"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { menuCategories, menuItems, menuNote, type MenuCategoryId, type MenuItem, type MenuSubcategoryId } from "@/data/menuData";

function revealWithinNavigation(button: HTMLButtonElement) {
  const navigation = button.parentElement;
  if (!navigation) return;
  const left = button.offsetLeft - navigation.offsetLeft;
  navigation.scrollTo({ left: left - (navigation.clientWidth - button.offsetWidth) / 2, behavior: "smooth" });
}

function MenuEntry({ entry }: { entry: MenuItem }) {
  return <li className={`speisekarte__item${entry.featured ? " speisekarte__item--featured" : ""}`}>
    {entry.number && <span className="speisekarte__number">{entry.number}</span>}
    <div className="speisekarte__item-body">
      <div className="speisekarte__item-top">
        <h4 className="speisekarte__item-name">{entry.name}{entry.markers?.length ? <sup className="speisekarte__markers">{entry.markers.join("")}</sup> : null}</h4>
        <span className="speisekarte__leader" aria-hidden="true" />
        {entry.price && <span className="speisekarte__price">{entry.size && <span className="speisekarte__size">{entry.size}</span>}{entry.price}</span>}
      </div>
      {entry.description && <p className="speisekarte__description">{entry.description}</p>}
      {entry.priceOptions && <div className="speisekarte__options">{entry.priceOptions.map(option => <span key={`${option.size}-${option.price}`}><span>{option.size}</span><strong>{option.price}</strong></span>)}</div>}
    </div>
  </li>;
}

export function MenuSection() {
  const [activeCategory, setActiveCategory] = useState<MenuCategoryId>("pizza");
  const [activeSubcategory, setActiveSubcategory] = useState<MenuSubcategoryId>("classic");
  const contentRef = useRef<HTMLDivElement>(null);
  const previousSelection = useRef<string | null>(null);
  const contentAnimation = useRef<Animation | null>(null);
  const category = menuCategories.find(candidate => candidate.id === activeCategory)!;
  const publishableSubcategories = category.subcategories?.filter(subcategory => menuItems.some(entry => entry.category === category.id && entry.subcategory === subcategory.id));
  const currentSubcategory = publishableSubcategories?.find(subcategory => subcategory.id === activeSubcategory) ?? publishableSubcategories?.[0];
  const visibleItems = menuItems.filter(entry => entry.category === activeCategory && (!currentSubcategory || entry.subcategory === currentSubcategory.id));
  const categoryNote = currentSubcategory && category.subcategoryNotes?.[currentSubcategory.id];

  useLayoutEffect(() => {
    const selection = `${activeCategory}:${currentSubcategory?.id ?? ""}`;
    if (previousSelection.current === null) {
      previousSelection.current = selection;
      return;
    }
    if (previousSelection.current === selection) return;
    previousSelection.current = selection;
    contentAnimation.current?.cancel();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!contentRef.current || typeof contentRef.current.animate !== "function") return;
    contentAnimation.current = contentRef.current.animate(
      [{ opacity: .82, transform: "translateY(6px)" }, { opacity: 1, transform: "translateY(0)" }],
      { duration: 200, easing: "cubic-bezier(.22, .7, .25, 1)" },
    );
  }, [activeCategory, currentSubcategory?.id]);

  useEffect(() => {
    const rows = contentRef.current?.querySelectorAll<HTMLElement>(".speisekarte__list .speisekarte__item");
    if (!rows?.length || !("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const row = entry.target as HTMLElement;
        observer.unobserve(row);
        if (typeof row.animate !== "function") continue;
        row.animate(
          [{ opacity: 0, transform: "translateY(9px)" }, { opacity: 1, transform: "translateY(0)" }],
          { duration: 380, easing: "cubic-bezier(.22, .7, .25, 1)" },
        );
      }
    }, { rootMargin: "140px 0px 140px 0px" });
    rows.forEach(row => observer.observe(row));
    return () => observer.disconnect();
  }, [activeCategory, currentSubcategory?.id]);

  function selectCategory(id: MenuCategoryId) {
    const nextCategory = menuCategories.find(candidate => candidate.id === id)!;
    setActiveCategory(id);
    setActiveSubcategory(nextCategory.subcategories?.find(subcategory => menuItems.some(entry => entry.category === id && entry.subcategory === subcategory.id))?.id ?? "classic");
  }

  return <section className="speisekarte" id="speisekarte" aria-labelledby="speisekarte-title">
    <div className="speisekarte__intro">
      <p className="speisekarte__script" lang="it">Sapori d&apos;Italia</p>
      <h2 id="speisekarte-title">UNSERE SPEISEKARTE</h2>
      <div className="speisekarte__tricolore" aria-hidden="true"><i /><i /><i /></div>
      <p>Traditionelle italienische Küche, mit Leidenschaft serviert.</p>
    </div>

    <div className="speisekarte__catalogue" id="speisekarte-auswahl">
      <nav className="speisekarte__nav" aria-label="Speisekarte Kategorien">
        {menuCategories.map(candidate => <button key={candidate.id} type="button" className={candidate.id === activeCategory ? "is-active" : ""} aria-current={candidate.id === activeCategory ? "true" : undefined} onClick={event => { selectCategory(candidate.id); revealWithinNavigation(event.currentTarget); }}>{candidate.label}</button>)}
      </nav>
      <div className="speisekarte__content" ref={contentRef}>
        <header className="speisekarte__category-header"><p className="speisekarte__category-script" lang="it">La nostra cucina</p><h3>{category.label}</h3></header>
        {publishableSubcategories && publishableSubcategories.length > 1 && <nav className="speisekarte__subnav" aria-label={`${category.label} Unterkategorien`}>{publishableSubcategories.map(subcategory => <button type="button" key={subcategory.id} className={subcategory.id === currentSubcategory?.id ? "is-active" : ""} aria-current={subcategory.id === currentSubcategory?.id ? "true" : undefined} onClick={event => { setActiveSubcategory(subcategory.id); revealWithinNavigation(event.currentTarget); }}>{subcategory.label}</button>)}</nav>}
        {categoryNote && <p className="speisekarte__category-note">{categoryNote}</p>}
        <ul className="speisekarte__list">{visibleItems.map(entry => <MenuEntry key={entry.id} entry={entry} />)}</ul>
      </div>
    </div>
    <p className="speisekarte__legal">{menuNote}</p>
  </section>;
}
