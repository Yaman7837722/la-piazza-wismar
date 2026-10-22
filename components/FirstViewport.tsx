"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { hasCompletedIntro, markIntroCompleted } from "@/lib/introSession";
import { Intro } from "@/components/intro/Intro";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/hero/Hero";
import { StorySection } from "@/components/story/StorySection";

export function FirstViewport({ onReady, mobile = false }: { onReady?: () => void; mobile?: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const [introVisible, setIntroVisible] = useState(true);
  const heroVisible = useRef(false);
  const introCompleted = useRef(false);
  const cinematicDrift = useRef<gsap.core.Tween | null>(null);

  useLayoutEffect(() => {
    const node = root.current;
    if (!node) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let removePointerListeners: (() => void) | undefined;

    const ctx = gsap.context(() => {
      const background = node.querySelector<HTMLElement>("[data-hero-background]");
      const hero = node.querySelector<HTMLElement>(".hero");
      const drift = !reduceMotion && background && window.matchMedia("(min-width: 981px)").matches
        ? gsap.to(background, { scale: 1.045, x: 8, y: -7, duration: 22, ease: "sine.inOut", yoyo: true, repeat: -1, paused: true })
        : null;
      cinematicDrift.current = drift;

      const finishIntro = () => {
        introCompleted.current = true;
        markIntroCompleted();
        setIntroVisible(false);
        if (heroVisible.current) drift?.play();
        onReady?.();
      };

      if (hasCompletedIntro()) {
        introCompleted.current = true;
        setIntroVisible(false);
        onReady?.();
      } else if (reduceMotion) {
        const overlay = node.querySelector<HTMLElement>("[data-intro]");
        if (!overlay) {
          finishIntro();
          return;
        }
        gsap.to(overlay, { opacity: 0, duration: 0.16, delay: 0.12, onComplete: finishIntro });
      } else {
        const brand = node.querySelector<HTMLElement>("[data-intro-brand]");
        const subtitle = node.querySelector<HTMLElement>("[data-intro-subtitle]");
        if (!brand || !subtitle) {
          finishIntro();
          return;
        }

        const brandTracking = window.getComputedStyle(brand).letterSpacing;
        const subtitleTracking = window.getComputedStyle(subtitle).letterSpacing;
        const smallScreen = window.matchMedia("(max-width: 640px)").matches;
        const artworkBlur = smallScreen ? 8 : 14;
        const heroBlur = smallScreen ? 5 : 8;
        const timeline = gsap.timeline({ onComplete: finishIntro });
        timeline
          .set("[data-intro-artwork]", { willChange: "opacity, transform, filter" }, 0)
          .fromTo("[data-intro-artwork]", { opacity: 0, filter: "blur(6px)", scale: 1.015 }, { opacity: 1, filter: "blur(0px)", scale: 1, duration: 0.6, ease: "power2.out" }, 0)
          .set("[data-intro-artwork]", { clearProps: "willChange" }, 0.6)
          .fromTo("[data-intro-line]", { scaleX: 0 }, { scaleX: 1, duration: 0.45, ease: "power2.out" }, 0.4)
          .fromTo("[data-intro-brand]", { opacity: 0.15, y: 24, filter: "blur(4px)", clipPath: "inset(100% 0 0 0)", letterSpacing: "0.08em" }, { opacity: 1, y: 0, filter: "blur(0px)", clipPath: "inset(0% 0 0 0)", letterSpacing: brandTracking, duration: 0.62, ease: "power3.out" }, 0.7)
          .fromTo("[data-intro-subtitle]", { opacity: 0, y: 7, filter: "blur(3px)", letterSpacing: `${parseFloat(subtitleTracking) + 1.5}px` }, { opacity: 1, y: 0, filter: "blur(0px)", letterSpacing: subtitleTracking, duration: 0.42, ease: "power2.out" }, 1.05)
          .set("[data-intro-artwork]", { willChange: "opacity, transform, filter" }, 1.45)
          .set("[data-intro-base]", { willChange: "opacity" }, 1.45)
          .set("[data-hero-background]", { willChange: "opacity, transform, filter" }, 1.45)
          .to("[data-intro-artwork]", { opacity: 0, filter: `blur(${artworkBlur}px)`, scale: 1.025, duration: 0.8, ease: "power2.inOut" }, 1.45)
          .to("[data-intro-base]", { opacity: 0, duration: 0.8, ease: "power2.inOut" }, 1.45)
          .fromTo("[data-hero-background]", { opacity: 0.35, filter: `blur(${heroBlur}px)`, scale: 1.025 }, { opacity: 1, filter: "blur(0px)", scale: 1, duration: 0.8, ease: "power2.inOut" }, 1.45)
          .to("[data-intro-subtitle], [data-intro-line], [data-intro-accent]", { opacity: 0, duration: 0.32, ease: "power2.in" }, 1.5)
          .to("[data-intro-brand]", { opacity: 0, filter: "blur(7px)", y: -7, duration: 0.48, ease: "power2.in" }, 1.82)
          .set("[data-hero-background]", { clearProps: "willChange" }, 2.25)
          .call(() => { if (heroVisible.current) drift?.play(); }, [], 2.26)
          .set("[data-intro]", { autoAlpha: 0 }, 2.25)
          .call(() => setIntroVisible(false), [], 2.26)
          .fromTo("[data-navbar]", { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 0.42, ease: "power2.out" }, 1.82)
          .fromTo("[data-hero-script]", { opacity: 0, filter: "blur(4px)", clipPath: "inset(0 100% 0 0)" }, { opacity: 1, filter: "blur(0px)", clipPath: "inset(0 0% 0 0)", duration: 0.48, ease: "power2.inOut", onComplete() { gsap.set(this.targets(), { clearProps: "clipPath" }); } }, 1.85)
          .fromTo("[data-hero-title]", { opacity: 0.3, clipPath: "inset(100% 0 0 0)", filter: "blur(4px)", y: 27 }, { opacity: 1, clipPath: "inset(0% 0 0 0)", filter: "blur(0px)", y: 0, duration: 0.44, ease: "power3.out" }, 1.97)
          .fromTo("[data-hero-subtitle]", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.32, ease: "power2.out" }, 2.25)
          .fromTo("[data-hero-accent-segment]", { opacity: 0, scaleX: 0 }, { opacity: 1, scaleX: 1, duration: 0.12, stagger: 0.04, ease: "power2.out" }, 2.45);

        const backgroundDepth = node.querySelector<HTMLElement>("[data-hero-background-depth]");
        const particleLayer = node.querySelector<HTMLElement>("[data-particle-depth]");
        if (hero && backgroundDepth && particleLayer && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
          const moveBackgroundX = gsap.quickTo(backgroundDepth, "x", { duration: 1.3, ease: "power2.out" });
          const moveBackgroundY = gsap.quickTo(backgroundDepth, "y", { duration: 1.3, ease: "power2.out" });
          const moveParticlesX = gsap.quickTo(particleLayer, "x", { duration: 1.1, ease: "power2.out" });
          const moveParticlesY = gsap.quickTo(particleLayer, "y", { duration: 1.1, ease: "power2.out" });
          const onPointerMove = (event: PointerEvent) => {
            const bounds = hero.getBoundingClientRect();
            const x = (event.clientX - bounds.left) / bounds.width * 2 - 1;
            const y = (event.clientY - bounds.top) / bounds.height * 2 - 1;
            moveBackgroundX(x * 6);
            moveBackgroundY(y * 5);
            moveParticlesX(x * 12);
            moveParticlesY(y * 9);
          };
          const onPointerLeave = () => {
            moveBackgroundX(0); moveBackgroundY(0);
            moveParticlesX(0); moveParticlesY(0);
          };
          hero.addEventListener("pointermove", onPointerMove);
          hero.addEventListener("pointerleave", onPointerLeave);
          removePointerListeners = () => {
            hero.removeEventListener("pointermove", onPointerMove);
            hero.removeEventListener("pointerleave", onPointerLeave);
          };
        }
      }
    }, node);

    return () => {
      removePointerListeners?.();
      ctx.revert();
      cinematicDrift.current = null;
    };
  }, [onReady]);

  useLayoutEffect(() => {
    const hero = root.current?.querySelector<HTMLElement>(".hero");
    if (!hero || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    heroVisible.current = false;
    hero.classList.add("hero--offscreen");
    if (!("IntersectionObserver" in window)) {
      heroVisible.current = true;
      hero.classList.remove("hero--offscreen");
      if (introCompleted.current) cinematicDrift.current?.play();
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      const visible = entry.isIntersecting && entry.intersectionRatio > 0;
      heroVisible.current = visible;
      hero.classList.toggle("hero--offscreen", !visible);
      if (visible && introCompleted.current) cinematicDrift.current?.play();
      else cinematicDrift.current?.pause();
    }, { threshold: 0 });
    observer.observe(hero);
    return () => {
      observer.disconnect();
      hero.classList.remove("hero--offscreen");
      heroVisible.current = false;
    };
  }, []);

  if (mobile) return <div ref={root} className="mobile-landing"><Intro visible={introVisible} /><Navbar /><Hero /><StorySection mobileReveal /></div>;
  return <div ref={root} className="first-viewport"><div inert={introVisible}><Navbar /><Hero /></div><Intro visible={introVisible} /></div>;
}
