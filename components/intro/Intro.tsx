export function Intro({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return <div className="intro" data-intro aria-hidden="true">
    <div className="intro__base" data-intro-base />
    <div className="intro__artwork" data-intro-artwork />
    <div className="intro__content" data-intro-content>
      <span className="intro__line" data-intro-line />
      <div className="intro__identity">
        <span className="intro__brand-mask"><span className="intro__brand" data-intro-brand>LA PIAZZA</span></span>
        <span className="intro__subtitle" data-intro-subtitle>RISTORANTE <span>·</span> PIZZERIA</span>
      </div>
      <span className="intro__line" data-intro-line />
    </div>
    <div className="intro__accent" data-intro-accent><i /><i /><i /></div>
  </div>;
}
