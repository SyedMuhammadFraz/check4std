import React from "react";
import { Link } from "react-router-dom";
import {
  Bug,
  Clock3,
  Dna,
  Droplet,
  Handshake,
  Heart,
  ShieldCheck,
  UsersRound,
  VenusAndMars,
} from "lucide-react";
import {
  Button,
  Hero,
  IconBadge,
  ServiceLinks,
  Steps,
  TrustStrip,
} from "./MarketingUI";
import "./about.css";

const values = [
  {
    title: "Confidentiality",
    description: "Your privacy is our priority. We keep your information safe and secure.",
    icon: ShieldCheck,
    tone: "green",
  },
  {
    title: "Convenience",
    description: "Order online, visit a nearby lab, and get results — on your schedule.",
    icon: Clock3,
    tone: "blue",
  },
  {
    title: "Affordability",
    description: "Quality care shouldn’t be a luxury. We offer transparent pricing and no hidden fees.",
    icon: Heart,
    tone: "green",
  },
  {
    title: "Inclusivity",
    description: "We serve all people, all identities, and all communities.",
    icon: UsersRound,
    tone: "blue",
  },
  {
    title: "Better Tomorrow",
    description: "Early detection leads to better health, stronger relationships, and healthier communities.",
    icon: Handshake,
    tone: "green",
  },
];

function LiverIcon({ size = 42, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" {...props}>
      <path
        d="M7 14c5-4 10-4 18-3l14-2c4 0 6 3 3 7-4 7-8 11-15 14l-5 2c-4 2-5 7-10 7-6 0-9-3-9-8 0-7 0-12 4-17Z"
        fill="currentColor"
      />
      <path d="M26 12v13l-7 7" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

const services = [
  {
    title: "Comprehensive STD Panel",
    description: "Complete peace of mind with our most comprehensive testing.",
    icon: Droplet,
    color: "pink",
    to: "/ten-test-panel",
  },
  {
    title: "Chlamydia & Gonorrhea",
    description: "Two of the most common STDs. Easy, accurate testing.",
    icon: Bug,
    color: "purple",
    to: "/chlamydia-gonorrhea-test",
  },
  {
    title: "HIV",
    description: "Early detection for a healthier tomorrow.",
    icon: Dna,
    color: "teal",
    to: "/hiv-test",
  },
  {
    title: "Herpes (HSV-1 & HSV-2)",
    description: "Know your status. Get the facts.",
    icon: Bug,
    color: "blue",
    to: "/herpes-i-ii-test",
  },
  {
    title: "Syphilis",
    description: "Simple testing. Important information.",
    icon: Heart,
    color: "coral",
    to: "/syphilis-test",
  },
  {
    title: "Hepatitis B & C",
    description: "Protect your health with early detection.",
    icon: LiverIcon,
    color: "green",
    to: "/price-packages?view=all&category=hepatitis",
  },
  {
    title: "Individual Tests",
    description: "Choose the tests that are right for you.",
    icon: VenusAndMars,
    color: "blue",
    to: "/price-packages?view=all&category=individual",
  },
];

export default function AboutUs() {
  return (
    <main className="satellite-page sh-about-page">
      <Hero
        variant="about"
        eyebrow="About Us"
        title="Better Health."
        accent="Made Simple."
        description="At Satellite Health, we believe everyone deserves convenient, confidential, and affordable access to quality STD testing and sexual health services — no matter where you are on your journey."
        tagline="Your Health. A Brighter Tomorrow."
      >
        <Button to="/price-packages" variant="orange">Order a Test Now</Button>
        <TrustStrip compact />
      </Hero>

      <section className="sh-about-mission sh-section" aria-labelledby="sh-about-mission-title">
        <div className="sh-container">
          <div className="sh-about-section-intro">
            <h2 id="sh-about-mission-title" className="sh-section-heading">Our Mission</h2>
            <p>
              To empower healthier communities by making STD testing and sexual health
              services accessible, affordable, and confidential for everyone.
            </p>
          </div>
          <div className="sh-about-values">
            {values.map(({ title, description, icon, tone }) => (
              <article className="sh-about-value" key={title}>
                <IconBadge icon={icon} tone={tone} />
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sh-about-services sh-container" aria-labelledby="sh-about-services-title">
        <div className="sh-about-section-intro">
          <h2 id="sh-about-services-title" className="sh-section-heading">Our Tests &amp; Services</h2>
          <p>Comprehensive. Convenient. Confidential.</p>
        </div>
        <div className="sh-about-test-grid">
          {services.map(({ title, description, icon: Icon, color, to }) => (
            <article className="sh-about-test-card" key={title}>
              <Icon className={`sh-about-test-icon sh-about-test-icon--${color}`} size={46} aria-hidden="true" />
              <h3>{title}</h3>
              <p>{description}</p>
              <Link className="sh-about-test-link" to={to} aria-label={`View details: ${title}`}>
                View Details
              </Link>
            </article>
          ))}
        </div>
        <div className="sh-about-services-action">
          <Button to="/price-packages" variant="outline">View All Tests &amp; Services</Button>
        </div>
      </section>

      <div className="sh-about-steps">
        <Steps compact withBenefits />
      </div>
      <ServiceLinks />
    </main>
  );
}
