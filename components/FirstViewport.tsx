"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Intro } from "@/components/intro/Intro";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/hero/Hero";

export function FirstViewport({ onReady }: { onReady?: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const [introVisible, setIntroVisible] = useState(true);

  useLayoutEffect(() => {
    const node = root.current;
    if (!node) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      const fade = gsap.to(node.querySelector("[data-intro]"), {
        opacity: 0,
        duration: 0.16,
        delay: 0.12,
        onComplete: () => { setIntroVisible(false); onReady?.(); },
      });
      return () => { fade.kill(); };
    }

    const ctx = gsap.context(() => {
      const background = node.querySelector<HTMLElement>("[data-hero-background]");
      const backgroundDepth = node.querySelector<HTMLElement>("[data-hero-background-depth]");
      const particleLayer = node.querySelector<HTMLElement>("[data-particle-depth]");
      const hero = node.querySelector<HTMLElement>(".hero");
      const cinematicDrift = background && gsap.to(background, {
        scale: 1.045, x: 8, y: -7, duration: 22, ease: "sine.inOut", yoyo: true, repeat: -1, paused: true,
      });
      const brand = node.querySelector<HTMLElement>("[data-intro-brand]");
      const subtitle = node.querySelector<HTMLElement>("[data-intro-subtitle]");
      if (!brand || !subtitle) return;
      const brandTracking = window.getComputedStyle(brand).letterSpacing;
      const subtitleTracking = window.getComputedStyle(subtitle).letterSpacing;
      const mobile = window.matchMedia("(max-width: 640px)").matches;
      const artworkBlur = mobile ? 8 : 14;
      const heroBlur = mobile ? 5 : 8;
      const timeline = gsap.timeline({ onComplete: () => onReady?.() });
      timeline
        .set("[data-intro-artwork]", { willChange: "opacity, transform, filter" }, 0)
        .fromTo("[data-intro-artwork]", { opacity: 0, filter: "blur(6px)", scale: 1.015 }, { opacity: 1, filter: "blur(0px)", scale: 1, duration: 1.2, ease: "power2.out" }, 0)
        .set("[data-intro-artwork]", { clearProps: "willChange" }, 1.2)
        .fromTo("[data-intro-line]", { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: "power2.out" }, 0.8)
        .fromTo("[data-intro-brand]", { opacity: 0.15, y: 30, filter: "blur(4px)", clipPath: "inset(100% 0 0 0)", letterSpacing: "0.08em" }, { opacity: 1, y: 0, filter: "blur(0px)", clipPath: "inset(0% 0 0 0)", letterSpacing: brandTracking, duration: 1, ease: "power3.out" }, 1.15)
        .fromTo("[data-intro-subtitle]", { opacity: 0, y: 8, filter: "blur(3px)", letterSpacing: `${parseFloat(subtitleTracking) + 1.5}px` }, { opacity: 1, y: 0, filter: "blur(0px)", letterSpacing: subtitleTracking, duration: 0.7, ease: "power2.out" }, 1.9)
        .set("[data-intro-artwork]", { willChange: "opacity, transform, filter" }, 4.1)
        .set("[data-intro-base]", { willChange: "opacity" }, 4.1)
        .set("[data-hero-background]", { willChange: "opacity, transform, filter" }, 4.1)
        .to("[data-intro-artwork]", { opacity: 0, filter: `blur(${artworkBlur}px)`, scale: 1.025, duration: 1.2, ease: "power2.inOut" }, 4.1)
        .to("[data-intro-base]", { opacity: 0, duration: 1.2, ease: "power2.inOut" }, 4.1)
        .fromTo("[data-hero-background]", { opacity: 0.35, filter: `blur(${heroBlur}px)`, scale: 1.025 }, { opacity: 1, filter: "blur(0px)", scale: 1, duration: 1.2, ease: "power2.inOut" }, 4.1)
        .to("[data-intro-subtitle], [data-intro-line], [data-intro-accent]", { opacity: 0, duration: 0.45, ease: "power2.in" }, 4.2)
        .to("[data-intro-brand]", { opacity: 0, filter: "blur(7px)", y: -8, duration: 0.65, ease: "power2.in" }, 4.45)
        .set("[data-hero-background]", { clearProps: "willChange" }, 5.3)
        .call(() => cinematicDrift?.play(), [], 5.31)
        .set("[data-intro]", { autoAlpha: 0, onComplete: () => setIntroVisible(false) }, 5.3)
        .fromTo("[data-navbar]", { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 0.65, ease: "power2.out" }, 5.36)
        .fromTo("[data-hero-script]", { opacity: 0, filter: "blur(4px)", clipPath: "inset(0 100% 0 0)" }, { opacity: 1, filter: "blur(0px)", clipPath: "inset(0 0% 0 0)", duration: 1.1, ease: "power2.inOut", onComplete() { gsap.set(this.targets(), { clearProps: "clipPath" }); } }, 5.52)
        .fromTo("[data-hero-title]", { opacity: 0.3, clipPath: "inset(100% 0 0 0)", filter: "blur(4px)", y: 35 }, { opacity: 1, clipPath: "inset(0% 0 0 0)", filter: "blur(0px)", y: 0, duration: 0.9, ease: "power3.out" }, 5.7)
        .fromTo("[data-hero-subtitle]", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 6.18)
        .fromTo("[data-hero-accent-segment]", { opacity: 0, scaleX: 0 }, { opacity: 1, scaleX: 1, duration: 0.26, stagger: 0.08, ease: "power2.out" }, 6.55)
        .fromTo("[data-hero-cta]", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.58, stagger: 0.13, ease: "power2.out" }, 6.78);

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
        return () => {
          hero.removeEventListener("pointermove", onPointerMove);
          hero.removeEventListener("pointerleave", onPointerLeave);
        };
      }
    }, node);
    return () => ctx.revert();
  }, [onReady]);

  return <div ref={root} className="first-viewport"><div inert={introVisible}><Navbar /><Hero /></div><Intro visible={introVisible} /></div>;
}
