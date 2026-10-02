import React from "react";
import { Link } from "react-router-dom";
import { Badge, Bug, CirclePlus, Droplet, Heart, UsersRound, VenusAndMars } from "lucide-react";
import "./test-cards.css";

export const TEST_NAMES = [
  "10 Test Panel",
  "10 Test Panel with HIV RNA Early Detection",
  "Chlamydia",
  "Gonorrhea",
  "Hepatitis A",
  "Hepatitis B",
  "Hepatitis C",
  "Chlamydia & Gonorrhea",
  "HIV 1 & 2 Antibody (4th Gen)",
  "Herpes I",
  "Herpes II",
  "Syphilis",
];

function LiverIcon(props) {
  return <svg {...props} viewBox="0 0 48 48" fill="currentColor" aria-hidden="true"><path d="M6 12C12 7 20 9 26 11c6-3 10-3 17-2 0 9-5 14-14 17-5 2-8 8-16 11-4 2-8 0-9-4-2-7-1-15 2-21Z" /><path d="M28 11c-4 6-4 12-4 19" stroke="white" strokeWidth="1.6" fill="none" /></svg>;
}

export const TEST_CATEGORIES = [
  { id: "comprehensive", title: "Comprehensive STD Panel", description: "Complete peace of mind with our most comprehensive testing.", icon: Droplet, color: "red", tests: ["10 Test Panel"], to: "/ten-test-panel" },
  { id: "chlamydia", title: "Chlamydia & Gonorrhea", description: "Two of the most common STDs. Easy, accurate testing.", icon: Bug, color: "purple", tests: ["Chlamydia & Gonorrhea"], to: "/chlamydia-gonorrhea-test" },
  { id: "hiv", title: "HIV", description: "Early detection for a healthier tomorrow.", icon: Bug, color: "teal", tests: ["HIV 1 & 2 Antibody (4th Gen)"], to: "/hiv-test" },
  { id: "herpes", title: "Herpes (HSV-1 & HSV-2)", description: "Know your status. Get the facts.", icon: Badge, color: "blue", tests: ["Herpes I", "Herpes II"], to: "/herpes-i-ii-test" },
  { id: "syphilis", title: "Syphilis", description: "Simple testing. Important information.", icon: Heart, color: "pink", tests: ["Syphilis"], to: "/syphilis-test" },
  { id: "hepatitis", title: "Hepatitis B & C", description: "Protect your health with early detection.", icon: LiverIcon, color: "green", tests: ["Hepatitis B", "Hepatitis C"], to: "/price-packages?view=all&category=hepatitis" },
  { id: "individual", title: "Individual Tests", description: "Choose the tests that are right for you.", icon: VenusAndMars, color: "sky", tests: TEST_NAMES.filter((name) => !name.startsWith("10 Test")), to: "/price-packages?view=all&category=individual" },
  { id: "panels", title: "Test Panels", description: "Targeted panels for your needs.", icon: UsersRound, color: "blue", tests: ["10 Test Panel", "10 Test Panel with HIV RNA Early Detection"], to: "/price-packages?view=all&category=panels" },
  { id: "additional", title: "Additional Services", description: "Retesting, treatment support, and more.", icon: CirclePlus, color: "sky", tests: [], to: "/contact" },
];

export const formatTestPrice = (price) => new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: Number(price) % 1 === 0 ? 0 : 2,
  maximumFractionDigits: 2,
}).format(Number(price));

export default function TestCards({ catalog, loading = false, compact = false, includeAdditional = true }) {
  const categories = includeAdditional ? TEST_CATEGORIES : TEST_CATEGORIES.filter((category) => category.id !== "additional");

  return (
    <div className={`sh-test-cards${compact ? " sh-test-cards-compact" : ""}`}>
      {categories.map((category) => {
        const Icon = category.icon;
        const prices = category.tests.map((name) => catalog?.[name]?.price).filter((price) => price !== null && price !== undefined && price !== "" && Number.isFinite(Number(price)) && Number(price) >= 0).map(Number);
        const price = prices.length ? Math.min(...prices) : null;
        return (
          <article className="sh-test-card" key={category.id}>
            <Icon className={`sh-test-icon sh-test-icon-${category.color}`} aria-hidden="true" strokeWidth={1.8} />
            <h3>{category.title}</h3>
            <p>{category.description}</p>
            {catalog && category.tests.length > 0 && <strong className={`sh-test-price${price === null ? " sh-test-price-pending" : ""}`}>{loading ? "Loading price…" : price !== null ? `From ${formatTestPrice(price)}` : "Price unavailable"}</strong>}
            {category.tests.length === 0 && <strong className="sh-test-price sh-test-price-pending">Here to help</strong>}
            <Link className="sh-test-details" to={category.to} aria-label={`View details for ${category.title}`}>View Details</Link>
          </article>
        );
      })}
    </div>
  );
}
