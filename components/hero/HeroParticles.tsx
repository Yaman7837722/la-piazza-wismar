import type { CSSProperties } from "react";

type Particle = {
  x: number;
  y: number;
  size: number;
  opacity: number;
  driftX: number;
  driftY: number;
  duration: number;
  delay: number;
  pulseDuration: number;
  pulseDelay: number;
  twinkleDuration: number;
  twinkleDelay: number;
  kind: "micro" | "neon" | "bokeh" | "bright";
  twinkle: boolean;
};

function makeParticles(): Particle[] {
  let seed = 24791;
  const next = () => ((seed = (1664525 * seed + 1013904223) >>> 0) / 4294967296);
  return Array.from({ length: 128 }, (_, index) => {
    // The first particles survive each responsive cutoff and retain the same visual mix.
    const slot = index % 20;
    const kind = slot === 0 ? "bright" : slot <= 2 ? "bokeh" : slot <= 9 ? "neon" : "micro";
    const right = next() < 0.73;
    const x = right ? 61 + next() * 36 : 44 + next() * 19;
    const y = 8 + next() * 82;
    const size = kind === "bright" ? 3 + next() * 2 : kind === "bokeh" ? 5 + next() * 5 : kind === "neon" ? 2.5 + next() * 2 : 1 + next() * 1.5;
    const opacity = kind === "bokeh" ? 0.35 + next() * 0.2 : kind === "micro" ? 0.55 + next() * 0.28 : 0.7 + next() * 0.22;
    const duration = 18 + next() * 16;
    return {
      x, y, size, opacity,
      driftX: -30 + next() * 60,
      driftY: -(20 + next() * 60),
      duration,
      delay: -(next() * duration),
      pulseDuration: 2.9 + next() * 3.4,
      pulseDelay: -(next() * 6),
      twinkleDuration: 1.8 + next() * 2.2,
      twinkleDelay: -(next() * 4),
      kind,
      twinkle: index % 4 === 0,
    };
  });
}

const particles = makeParticles();

function makeMobileParticles() {
  let seed = 81743;
  const next = () => ((seed = (1664525 * seed + 1013904223) >>> 0) / 4294967296);
  return Array.from({ length: 44 }, (_, index) => {
    const glint = index % 11 === 0;
    const normal = !glint && index % 3 === 0;
    return {
      x: 9 + next() * 84,
      y: 12 + next() * 74,
      size: glint ? 3 + next() : normal ? 2 + next() : 1 + next(),
      opacity: glint ? .7 + next() * .15 : normal ? .5 + next() * .3 : .42 + next() * .28,
      driftX: -12 + next() * 24,
      driftY: -12 - next() * 22,
      duration: 20 + next() * 14,
      twinkleDuration: 2.2 + next() * 2.8,
      twinkleDelay: -next() * 5,
    };
  });
}

const mobileParticles = makeMobileParticles();

export function HeroParticles() {
  return <div className="hero__particles" data-hero-particles aria-hidden="true"><div className="hero__particle-depth" data-particle-depth>
    {particles.map((particle, index) => <span
      key={index}
      className={`hero__particle hero__particle--${particle.kind}${particle.twinkle ? " hero__particle--twinkle" : ""}${index % 11 === 0 ? " hero__particle--mobile-glint" : ""}`}
      style={{
        "--particle-x": `${particle.x}%`,
        "--particle-y": `${particle.y}%`,
        "--particle-size": `${particle.size}px`,
        "--particle-opacity": particle.opacity,
        "--particle-drift-x": `${particle.driftX}px`,
        "--particle-drift-y": `${particle.driftY}px`,
        "--particle-duration": `${particle.duration}s`,
        "--particle-delay": `${particle.delay}s`,
        "--particle-pulse-duration": `${particle.pulseDuration}s`,
        "--particle-pulse-delay": `${particle.pulseDelay}s`,
        "--particle-twinkle-duration": `${particle.twinkleDuration}s`,
        "--particle-twinkle-delay": `${particle.twinkleDelay}s`,
        "--mobile-particle-x": `${mobileParticles[index % 44].x}%`,
        "--mobile-particle-y": `${mobileParticles[index % 44].y}%`,
        "--mobile-particle-size": `${mobileParticles[index % 44].size}px`,
        "--mobile-particle-opacity": mobileParticles[index % 44].opacity,
        "--mobile-particle-drift-x": `${mobileParticles[index % 44].driftX}px`,
        "--mobile-particle-drift-y": `${mobileParticles[index % 44].driftY}px`,
        "--mobile-particle-duration": `${mobileParticles[index % 44].duration}s`,
        "--mobile-particle-twinkle-duration": `${mobileParticles[index % 44].twinkleDuration}s`,
        "--mobile-particle-twinkle-delay": `${mobileParticles[index % 44].twinkleDelay}s`,
      } as CSSProperties}
    ><i /></span>)}
  </div></div>;
}
