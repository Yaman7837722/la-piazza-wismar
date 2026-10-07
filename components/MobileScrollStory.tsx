"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { StorySection } from "@/components/story/StorySection";

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const range = (progress: number, start: number, end: number) => clamp((progress - start) / (end - start));

export function MobileScrollStory({ children }: { children: ReactNode }) {
  const wrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = wrapper.current;
    if (!node) return;
    const viewport = node.querySelector<HTMLElement>(".mobile-scrollstory__viewport");
    const hero = node.querySelector<HTMLElement>(".mobile-scrollstory__hero");
    const entrance = node.querySelector<HTMLElement>(".mobile-scrollstory__entrance");
    const heading = node.querySelector<HTMLElement>(".mobile-scrollstory__intro");
    const navbar = node.querySelector<HTMLElement>(".navbar");
    if (!viewport || !hero || !entrance || !heading || !navbar) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const travel = Math.max(1, rect.height - viewport.offsetHeight);
      const progress = clamp(-rect.top / travel);
      const fade = range(progress, .15, .67);
      const enter = range(progress, .12, .64);
      const reveal = range(progress, .35, .85);
      hero.style.opacity = String(1 - fade);
      hero.style.transform = `translate3d(0, ${-6 * fade}svh, 0) scale(${1 - .03 * fade})`;
      entrance.style.opacity = String(enter);
      entrance.style.transform = `translate3d(0, ${10 * (1 - enter)}svh, 0)`;
      heading.style.opacity = String(reveal);
      heading.style.transform = `translate3d(0, ${18 * (1 - reveal)}px, 0)`;
      navbar.style.opacity = String(1 - range(progress, .12, .46));
      navbar.style.pointerEvents = progress > .46 ? "none" : "";
      viewport.style.opacity = String(1 - range(progress, .94, 1));
      hero.inert = progress > .7;
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
      navbar.style.opacity = "";
      navbar.style.pointerEvents = "";
    };
  }, []);

  return <>
    <div className="mobile-scrollstory" ref={wrapper}>
      <div className="mobile-scrollstory__viewport">
        <div className="mobile-scrollstory__hero">{children}</div>
        <div className="mobile-scrollstory__entrance" aria-hidden="true">
          <div className="mobile-scrollstory__artwork" />
          <div className="mobile-scrollstory__intro">
            <p className="story__script">La nostra storia</p>
            <h2 className="story__heading"><span className="story__heading-mask">TRADITION</span><span className="story__heading-mask">TRIFFT GENUSS</span></h2>
            <div className="story__tricolore"><i /><i /><i /></div>
          </div>
        </div>
      </div>
    </div>
    <div className="mobile-scrollstory__continuation"><StorySection /></div>
  </>;
}
