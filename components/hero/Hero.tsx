import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { HeroParticles } from "@/components/hero/HeroParticles";

export function Hero({ foodImageSrc, mobile = false }: { foodImageSrc?: string; mobile?: boolean } = {}) {
  const Wrapper = mobile ? "div" : "main";
  return <Wrapper id="home"><section className="hero" aria-labelledby="hero-title">
    <div className="hero__background-depth" data-hero-background-depth aria-hidden="true"><div className="hero__background" data-hero-background /></div>
    <div className="hero__shade" aria-hidden="true" />
    <div className="hero__ambient" aria-hidden="true" />
    <div className="hero__grain" aria-hidden="true" />
    <HeroParticles />
    {foodImageSrc && <div className="hero__food" aria-hidden="true"><Image src={foodImageSrc} alt="" fill sizes="(max-width: 640px) 55vw, (max-width: 980px) 38vw, 36vw" /></div>}
    <div className="hero__content">
      <p className="hero__script" data-hero-script>Benvenuti a</p>
      <div className="hero__title-mask"><h1 id="hero-title" className="hero__title" data-hero-title>LA PIAZZA</h1></div>
      <p className="hero__description" data-hero-subtitle>Italienische Küche im Herzen von Wismar.</p>
      <div className="hero__tricolore" aria-hidden="true"><i data-hero-accent-segment /><i data-hero-accent-segment /><i data-hero-accent-segment /></div>
    </div>
    <div className="hero__scroll" aria-hidden="true"><span>SCROLL</span><span className="hero__scroll-line" /><ArrowDown size={15} strokeWidth={1.5} /></div>
  </section></Wrapper>;
}
