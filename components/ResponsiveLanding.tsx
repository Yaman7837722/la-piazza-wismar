"use client";

import { useLayoutEffect, useState } from "react";
import { FirstViewport } from "@/components/FirstViewport";
import { HeroStoryTransition } from "@/components/HeroStoryTransition";

export function ResponsiveLanding() {
  // Render the normal-flow mobile view on the server so the Hero H1 and Story
  // are present in crawlable HTML; switch to the desktop scene after hydration.
  const [mobile, setMobile] = useState(true);

  useLayoutEffect(() => {
    const query = window.matchMedia("(max-width: 980px)");
    const update = () => setMobile(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return mobile ? <FirstViewport mobile /> : <HeroStoryTransition />;
}
