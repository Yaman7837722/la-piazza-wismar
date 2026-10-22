"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function StorySection({ mobileReveal = false }: { mobileReveal?: boolean }) {
  const storyRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const story = storyRef.current;
    if (!mobileReveal || !story || !("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const groups = Array.from(story.querySelectorAll<HTMLElement>("[data-story-reveal]"));
    if (!groups.length) return;
    let observer: IntersectionObserver | undefined;
    let fallback: ReturnType<typeof setTimeout> | undefined;
    try {
      observer = new IntersectionObserver(entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const group = entry.target as HTMLElement;
          group.dataset.storyRevealed = "true";
          observer?.unobserve(group);
        }
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0 });
      groups.forEach(group => observer?.observe(group));
      story.classList.add("story--reveal-ready");
      // A missed Safari observer callback must never leave content hidden.
      fallback = setTimeout(() => groups.forEach(group => { group.dataset.storyRevealed = "true"; observer?.unobserve(group); }), 12000);
    } catch {
      observer?.disconnect();
      story.classList.remove("story--reveal-ready");
    }
    return () => {
      observer?.disconnect();
      if (fallback) clearTimeout(fallback);
      story.classList.remove("story--reveal-ready");
    };
  }, [mobileReveal]);

  return <section className="story" id="story" aria-labelledby="story-title" ref={storyRef}>
    <div className="story__paper" aria-hidden="true" />
    <div className="story__artwork" data-story-artwork aria-hidden="true" />
    <div className="story__container">
      <div className="story__content">
        <p className="story__script" data-story-script data-story-reveal lang="it">La nostra storia</p>
        <h2 className="story__heading" id="story-title" data-story-reveal>
          <span className="story__heading-mask"><span data-story-heading-line>TRADITION</span></span>
          <span className="story__heading-mask"><span data-story-heading-line>TRIFFT GENUSS</span></span>
        </h2>
        <div className="story__tricolore" data-story-accent data-story-reveal aria-hidden="true"><i /><i /><i /></div>
        <div data-story-reveal><p className="story__copy" data-story-copy>La Piazza steht für italienische Leidenschaft,<br className="story__desktop-break" /> authentische Küche und eine besondere Atmosphäre<br className="story__desktop-break" /> – direkt am historischen Marktplatz von Wismar.</p>
        <button className="story__button" data-story-button type="button" aria-disabled="true" title="Mehr über uns folgt in einer späteren Phase"><span>Mehr über uns</span><ArrowRight size={17} strokeWidth={1.5} aria-hidden="true" /></button></div>
      </div>
      <div className="story__photos" aria-label="La Piazza am Wismarer Marktplatz">
        <div className="story__main-depth" data-story-main-depth data-story-reveal>
          <figure className="story__print story__print--main" data-story-main-print>
            <div className="story__image story__image--main"><Image src="/images/story/wismar-market.webp" alt="Die Wasserkunst auf dem historischen Wismarer Marktplatz im Abendlicht" fill sizes="(max-width: 640px) 76vw, (max-width: 980px) 45vw, 520px" priority={false} /></div>
            <figcaption>Am Markt 7, Wismar</figcaption>
          </figure>
        </div>
        <div className="story__front-depth" data-story-front-depth data-story-reveal>
          <figure className="story__print story__print--front" data-story-front-print>
            <div className="story__image story__image--front"><Image src="/images/story/restaurant-atmosphere.webp" alt="Italienisches Abendessen bei Kerzenschein mit Blick auf den Wismarer Marktplatz" fill sizes="(max-width: 640px) 44vw, (max-width: 980px) 29vw, 320px" /></div>
          </figure>
        </div>
      </div>
    </div>
  </section>;
}
