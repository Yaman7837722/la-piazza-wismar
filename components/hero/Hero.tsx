import { ArrowDown, ArrowUpRight, CalendarDays, UtensilsCrossed } from "lucide-react";
import { HeroParticles } from "@/components/hero/HeroParticles";

export function Hero() {
  return <main id="home"><section className="hero" aria-labelledby="hero-title">
    <div className="hero__background-depth" data-hero-background-depth aria-hidden="true"><div className="hero__background" data-hero-background /></div>
    <div className="hero__shade" aria-hidden="true" />
    <div className="hero__ambient" aria-hidden="true" />
    <div className="hero__grain" aria-hidden="true" />
    <HeroParticles />
    <div className="hero__content">
      <p className="hero__script" data-hero-script>Benvenuti a</p>
      <div className="hero__title-mask"><h1 id="hero-title" className="hero__title" data-hero-title>LA PIAZZA</h1></div>
      <p className="hero__description" data-hero-subtitle>Italienische Küche im Herzen von Wismar.</p>
      <div className="hero__tricolore" aria-hidden="true"><i data-hero-accent-segment /><i data-hero-accent-segment /><i data-hero-accent-segment /></div>
      <div className="hero__actions">
        <button className="button button--primary" type="button" aria-disabled="true" title="Reservierung folgt in einer späteren Phase" data-hero-cta><CalendarDays size={18} strokeWidth={1.7} /><span>Tisch reservieren</span><ArrowUpRight className="button__arrow" size={18} strokeWidth={1.7} /></button>
        <button className="button button--secondary" type="button" aria-disabled="true" title="Onlinebestellung folgt in einer späteren Phase" data-hero-cta><UtensilsCrossed size={18} strokeWidth={1.7} /><span>Online bestellen</span><ArrowUpRight className="button__arrow" size={18} strokeWidth={1.7} /></button>
      </div>
    </div>
    <div className="hero__scroll" aria-hidden="true"><span>SCROLL</span><span className="hero__scroll-line" /><ArrowDown size={15} strokeWidth={1.5} /></div>
  </section></main>;
}
