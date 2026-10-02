import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Check, ChevronRight, Clock3, FileText, Home, Laptop, MapPin, MessageCircle, RefreshCw, ShieldCheck, Stethoscope, Users } from "lucide-react";

// Isolate photography from the client's flattened artwork. UI is rendered as HTML.
const heroArtwork = {
  home: { box: "650 106 810 510", width: 1672, height: 941 },
  tests: { box: "716 79 627 371", width: 1672, height: 941 },
  how: { box: "710 99 766 439", width: 1672, height: 941 },
  about: { box: "555 84 901 351", width: 1672, height: 941 },
  resources: { box: "491 79 363 376", width: 1024, height: 1536 },
  contact: { box: "785 92 578 288", width: 1672, height: 941 },
};

export function BrandLogo() {
  return <svg className="sh-brand-logo" viewBox="48 7 244 70" role="img" aria-label="Satellite Health"><image href="/assets/satellite/tests.png" width="1672" height="941" /></svg>;
}

export function Button({ to, children, variant = "green", className = "", arrow = true, ...props }) {
  const contents = <>{children}{arrow && <ArrowRight size={21} aria-hidden="true" />}</>;
  const classes = `sh-button sh-button--${variant} ${className}`;
  return to ? <Link to={to} className={classes} {...props}>{contents}</Link> : <button className={classes} type="button" {...props}>{contents}</button>;
}

export function IconBadge({ icon: Icon, tone = "green" }) {
  return <span className={`sh-icon-badge sh-icon-badge--${tone}`}><Icon aria-hidden="true" strokeWidth={1.8} /></span>;
}

export function Hero({ variant = "home", eyebrow, title, accent, description, tagline, children }) {
  const artwork = heroArtwork[variant] || heroArtwork.home;
  return <section className={`sh-hero sh-hero--${variant}`}>
    <div className="sh-hero-photo" aria-hidden="true"><svg viewBox={artwork.box} preserveAspectRatio="xMidYMid slice"><image href={`/assets/satellite/${variant}.png`} width={artwork.width} height={artwork.height} /></svg></div>
    <div className="sh-container sh-hero-inner"><div className="sh-hero-copy">
      {eyebrow && <p className="sh-eyebrow">{eyebrow}</p>}
      <h1>{title}{accent && <span>{accent}</span>}</h1>
      {description && <p className="sh-hero-description">{description}</p>}{children}
    </div>{tagline && <p className="sh-hero-tagline">{tagline}</p>}</div>
  </section>;
}

const trustItems = [
  { icon: ShieldCheck, title: "100% Confidential", text: "Your privacy matters." },
  { icon: Clock3, title: "Fast & Easy", text: "Results in 1–3 days." },
  { icon: MapPin, title: "Nationwide Labs", text: "Convenient locations near you." },
  { icon: Users, title: "Trusted Care", text: "Accurate. Reliable. Secure." },
];

export function TrustStrip({ compact = false }) {
  return <div className={`sh-trust-strip ${compact ? "sh-trust-strip--compact" : ""}`}>
    {(compact ? trustItems.slice(0, 3) : trustItems).map(({ icon: Icon, title, text }) => <div className="sh-trust-item" key={title}><Icon aria-hidden="true" strokeWidth={1.7} /><div><strong>{title}</strong><span>{text}</span></div></div>)}
  </div>;
}

const steps = [
  { icon: Laptop, title: "1. Order Online", text: "Choose your test or panel.", to: "/price-packages" },
  { icon: MapPin, title: "2. Visit a Lab", text: "Go to a nearby, verified lab location.", to: "/test-centers" },
  { icon: FileText, title: "3. Get Results", text: "Receive your secure results online, usually in 1–3 days.", to: "/user-profile" },
];

export function Steps({ compact = false, withBenefits = false }) {
  return <section className={`sh-section sh-steps-section ${compact ? "sh-steps-section--compact" : ""}`}><div className="sh-container">
    <div className="sh-section-heading"><h2>How It Works</h2><p>Get tested in 3 simple steps.</p></div>
    <div className={`sh-steps-layout ${withBenefits ? "sh-steps-layout--benefits" : ""}`}><div className="sh-steps">
      {steps.map(({ icon, title, text, to }, index) => <React.Fragment key={title}>{index > 0 && <ChevronRight className="sh-step-arrow" aria-hidden="true" />}<Link className="sh-step" to={to}><IconBadge icon={icon} tone={index === 1 ? "blue" : "green"} /><h3>{title}</h3><p>{text}</p></Link></React.Fragment>)}
    </div>{withBenefits && <ul className="sh-benefits">{["Private & Secure", "Affordable Pricing", "CLIA-Certified Labs", "Support You Can Trust"].map(text => <li key={text}><Check aria-hidden="true" />{text}</li>)}</ul>}</div>
  </div></section>;
}

const services = [
  { icon: Home, title: "At-Home Testing Kits", text: "Explore your testing options.", action: "Learn More", to: "/contact?subject=Testing%20options" },
  { icon: MapPin, title: "Lab Locations", text: "Find a convenient, trusted lab near you.", action: "Find a Location", to: "/test-centers" },
  { icon: Stethoscope, title: "Treatment Support", text: "Get connected to care if needed.", action: "Learn More", to: "/doctor-consultation" },
  { icon: BookOpen, title: "Educational Resources", text: "Trusted information for healthier choices.", action: "Explore Resources", to: "/resources" },
  { icon: RefreshCw, title: "Ongoing Care", text: "Retesting and routine screening.", action: "Learn More", to: "/price-packages" },
  { icon: MessageCircle, title: "Have Questions?", text: "Our support team is here for you.", action: "Contact Us", to: "/contact" },
];

export function ServiceLinks() {
  return <section className="sh-section sh-services-section"><div className="sh-container"><div className="sh-section-heading"><h2>More Than Testing</h2><p>Support for every step of your journey.</p></div><div className="sh-service-links">{services.map(({ icon: Icon, title, text, action, to }) => <Link key={title} to={to} className="sh-service-link"><Icon aria-hidden="true" /><h3>{title}</h3><p>{text}</p><span>{action}<ArrowRight size={15} aria-hidden="true" /></span></Link>)}</div></div></section>;
}
