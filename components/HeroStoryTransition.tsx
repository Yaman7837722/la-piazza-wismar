"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FirstViewport } from "@/components/FirstViewport";
import { StorySection } from "@/components/story/StorySection";

gsap.registerPlugin(ScrollTrigger);

export function HeroStoryTransition() {
  const root = useRef<HTMLDivElement>(null);
  const [introReady, setIntroReady] = useState(false);
  const onIntroReady = useCallback(() => setIntroReady(true), []);

  useLayoutEffect(() => {
    const previousRestoration = window.history.scrollRestoration;
    const html = document.documentElement;
    const previousBehavior = html.style.scrollBehavior;
    const previousOverflow = html.style.overflow;
    window.history.scrollRestoration = "manual";
    html.style.scrollBehavior = "auto";
    html.style.overflow = "hidden";
    if (window.location.hash) {
      window.history.replaceState(window.history.state, "", window.location.pathname + window.location.search);
    }
    const resetToTop = () => window.scrollTo(0, 0);
    resetToTop();
    window.addEventListener("pageshow", resetToTop);
    return () => {
      window.removeEventListener("pageshow", resetToTop);
      window.history.scrollRestoration = previousRestoration;
      html.style.scrollBehavior = previousBehavior;
      html.style.overflow = previousOverflow;
    };
  }, []);

  useLayoutEffect(() => {
    if (!introReady) return;
    const wrapper = root.current;
    if (!wrapper) return;
    const html = document.documentElement;
    html.style.overflow = "";
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const media = gsap.matchMedia();
    const createTransition = (desktop: boolean) => {
      const context = gsap.context(() => {
        const hero = wrapper.querySelector<HTMLElement>(".hero");
        const story = wrapper.querySelector<HTMLElement>(".story");
        const content = wrapper.querySelector<HTMLElement>(".hero__content");
        const particles = wrapper.querySelector<HTMLElement>(".hero__particles");
        const artwork = wrapper.querySelector<HTMLElement>("[data-story-artwork]");
        if (!hero || !story || !content || !particles || !artwork) return;
        const artworkOpacity = Number(window.getComputedStyle(artwork).opacity);
        const blur = desktop ? 5 : 2;
        story.inert = true;

        const master = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: wrapper,
            start: "top top",
            end: () => `+=${Math.round(window.innerHeight * (desktop ? 1.45 : 1.15))}`,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            scrub: desktop ? 1 : 0.45,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              hero.inert = self.progress > 0.96;
              story.inert = self.progress < 0.28;
            },
          },
        });

        master
          .fromTo(hero, { scale: 1, opacity: 1, filter: "blur(0px)" }, { scale: desktop ? 1.035 : 1.02, opacity: 0.65, filter: `blur(${blur}px)`, duration: 30 }, 0)
          .to(hero, { opacity: 0, duration: 38 }, 30)
          .fromTo(content, { y: 0, opacity: 1 }, { y: desktop ? -25 : -18, opacity: 0, duration: 43 }, 0)
          .fromTo(particles, { opacity: 1 }, { opacity: 0, duration: 55 }, 0)
          .fromTo(story, { opacity: 0, scale: desktop ? 1.015 : 1, y: desktop ? 0 : 20 }, { opacity: 1, scale: 1, y: 0, duration: 55 }, 20)
          .fromTo(artwork, { opacity: 0, filter: "blur(4px)" }, { opacity: artworkOpacity, filter: "blur(0px)", duration: 20 }, 45)
          .fromTo("[data-story-script]", { opacity: 0, filter: "blur(3px)", clipPath: "inset(0 100% 0 0)" }, { opacity: 1, filter: "blur(0px)", clipPath: "inset(0 0% 0 0)", duration: 20 }, 50)
          .fromTo("[data-story-heading-line]", { yPercent: 105, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 20, stagger: 6 }, 56)
          .fromTo("[data-story-accent]", { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 14 }, 67)
          .fromTo("[data-story-copy]", { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 14 }, 72)
          .fromTo("[data-story-button]", { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 12 }, 78)
          .fromTo("[data-story-main-print]", { x: 45, y: 30, rotation: -5, scale: 0.96, opacity: 0 }, { x: 0, y: 0, rotation: -2, scale: 1, opacity: 1, duration: 16 }, 79)
          .fromTo("[data-story-front-print]", { x: 55, y: 40, rotation: 7, scale: 0.94, opacity: 0 }, { x: 0, y: 0, rotation: 3.5, scale: 1, opacity: 1, duration: 14 }, 85)
          .to(story, { opacity: 1, duration: 1 }, 99);

        // The scene reverses through the same timeline; no independent Story trigger runs.
        return () => {
          hero.inert = false;
          story.inert = false;
        };
      }, wrapper);
      return () => context.revert();
    };

    media.add("(min-width: 761px) and (prefers-reduced-motion: no-preference)", () => createTransition(true));
    media.add("(max-width: 760px) and (prefers-reduced-motion: no-preference)", () => createTransition(false));
    return () => {
      media.revert();
      html.style.overflow = "";
    };
  }, [introReady]);

  return <div className="hero-story-transition" ref={root}>
    <FirstViewport onReady={onIntroReady} />
    <StorySection />
  </div>;
}
