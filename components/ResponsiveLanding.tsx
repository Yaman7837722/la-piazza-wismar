"use client";

import { useLayoutEffect, useState } from "react";
import { FirstViewport } from "@/components/FirstViewport";
import { HeroStoryTransition } from "@/components/HeroStoryTransition";

export function ResponsiveLanding() {
  const [mobile, setMobile] = useState<boolean | null>(null);

  useLayoutEffect(() => {
    const query = window.matchMedia("(max-width: 980px)");
    const update = () => setMobile(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  if (mobile === null) return null;
  return mobile ? <FirstViewport mobile /> : <HeroStoryTransition />;
}
