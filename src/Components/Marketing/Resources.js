import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Check, FileText, GraduationCap, Headphones, Heart, MapPin, Search, ShieldCheck, TestTube2, Users } from "lucide-react";
import { Button, Hero, IconBadge, TrustStrip } from "./MarketingUI";
import "./resources.css";

const topics = [
  { title: "STD Basics", description: "Learn the facts", icon: BookOpen, to: "/diseases/overview", keywords: "sti infections symptoms diseases basics" },
  { title: "Testing & Screening", description: "What to expect", icon: ShieldCheck, to: "/how-it-works", keywords: "lab blood urine results test process" },
  { title: "Prevention", description: "Tips for safer living", icon: Users, tone: "blue", to: "/diseases/overview", keywords: "condoms risk safety protection" },
  { title: "Sexual Health & Wellness", description: "Whole-person care", icon: Heart, to: "/doctor-consultation", keywords: "doctor consultation wellbeing lifestyle" },
  { title: "Frequently Asked Questions", description: "Get quick answers", icon: FileText, to: "/how-it-works", keywords: "faq faqs help questions results" },
  { title: "Lab Locations", description: "Find a center near you", icon: MapPin, tone: "blue", to: "/test-centers", keywords: "laboratory labs zip nearby location center" },
  { title: "Education & Tools", description: "Guides, links and more", icon: GraduationCap, tone: "blue", to: "/diseases/symptoms", keywords: "learn symptoms education information" },
  { title: "Patient Support", description: "We're here for you", icon: Headphones, tone: "blue", to: "/contact", keywords: "contact help call email customer service" },
];

const resources = [
  { title: "Understanding STDs", description: "Get the facts about common STDs, symptoms, and testing.", to: "/diseases/overview", crop: "61 938 103 88", keywords: "sti infections basics disease symptoms" },
  { title: "What to Expect During Testing", description: "A step-by-step guide to the testing process.", to: "/how-it-works", crop: "296 938 101 88", keywords: "screening blood urine laboratory results" },
  { title: "Sexual Health for Every Lifestyle", description: "Inclusive information for all communities.", to: "/doctor-consultation", crop: "531 938 110 88", keywords: "wellness wellbeing doctor consultation" },
  { title: "Prevention Tips That Work", description: "Simple steps for a healthier tomorrow.", to: "/diseases/overview", crop: "766 938 111 88", keywords: "condoms safer risk protection" },
];

function matchesQuery(item, query) {
  const content = `${item.title} ${item.description} ${item.keywords}`.toLowerCase();
  return query.toLowerCase().split(/\s+/).every((word) => content.includes(word));
}

export default function Resources() {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const filteredTopics = topics.filter((topic) => matchesQuery(topic, query));
  const filteredResources = resources.filter((resource) => matchesQuery(resource, query));

  const clearSearch = () => {
    setSearch("");
    setQuery("");
  };

  return (
    <main className="satellite-page sh-resources-page">
      <Hero
        variant="resources"
        eyebrow="Resources"
        title="Trusted Information"
        accent="for a Healthier You."
        description="Helpful resources, expert insights, and tools to support your sexual health journey — because knowledge leads to healthier tomorrows."
        tagline="Knowledge Empowers Healthier Choices."
      >
        <form className="sh-resource-search" role="search" onSubmit={(event) => { event.preventDefault(); setQuery(search.trim()); }}>
          <div className="sh-resource-search-field">
            <Search size={24} aria-hidden="true" />
            <label className="sh-resource-sr-only" htmlFor="resource-search">Search resources</label>
            <input id="resource-search" type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search resources (e.g., STDs, testing, prevention, FAQs)" />
          </div>
          <Button type="submit">Search</Button>
        </form>
      </Hero>

      <section className="sh-container sh-section sh-resource-topics" id="resource-topics" aria-labelledby="resource-topics-heading">
        <h2 className="sh-section-heading" id="resource-topics-heading">Browse Resources by Topic</h2>
        <p className="sh-resource-subtitle">Find the information you need, when you need it.</p>
        {query && (
          <div className="sh-resource-search-status" role="status">
            <p>{filteredTopics.length + filteredResources.length} {filteredTopics.length + filteredResources.length === 1 ? "result" : "results"} for <strong>“{query}”</strong></p>
            <button type="button" onClick={clearSearch}>Clear search</button>
          </div>
        )}
        <div className="sh-resource-topic-grid">
          {filteredTopics.map(({ title, description, icon, tone, to }) => (
            <Link className="sh-resource-topic" to={to} key={title}>
              <IconBadge icon={icon} tone={tone} />
              <h3>{title}</h3>
              <p>{description}</p>
              <ArrowRight size={21} aria-hidden="true" />
            </Link>
          ))}
        </div>
        {query && filteredTopics.length === 0 && <p className="sh-resource-empty">No matching topics. Try “testing”, “symptoms”, or “support”.</p>}
      </section>

      <section className="sh-container sh-resource-featured" aria-labelledby="featured-resources-heading">
        <div className="sh-resource-heading-row">
          <div>
            <h2 className="sh-section-heading" id="featured-resources-heading">Featured Resources</h2>
            <p className="sh-resource-subtitle">Explore our most popular articles, guides, and tools.</p>
          </div>
          <a className="sh-resource-view-all" href="#resource-topics" onClick={clearSearch}>View All Resources <ArrowRight size={21} aria-hidden="true" /></a>
        </div>
        <div className="sh-resource-feature-grid">
          {filteredResources.map(({ title, description, to, crop }) => (
            <Link className="sh-resource-article" to={to} key={title}>
              <svg className="sh-resource-thumbnail" viewBox={crop} aria-hidden="true" focusable="false">
                <image href="/assets/satellite/resources.png" width="1024" height="1536" />
              </svg>
              <h3>{title}</h3>
              <p>{description}</p>
              <span className="sh-resource-read-more">Read More <ArrowRight size={20} aria-hidden="true" /></span>
            </Link>
          ))}
        </div>
        {query && filteredResources.length === 0 && <p className="sh-resource-empty">No matching featured resources. Browse the topics above or clear your search.</p>}
      </section>

      <section className="sh-container sh-resource-order" aria-labelledby="resource-order-heading">
        <div className="sh-resource-order-icon"><TestTube2 size={60} strokeWidth={1.6} aria-hidden="true" /></div>
        <div className="sh-resource-order-copy">
          <p className="sh-resource-eyebrow">Ready to take the next step?</p>
          <h2 className="sh-section-heading" id="resource-order-heading">Order Your Test Online</h2>
          <p>It's quick, private, and secure.</p>
          <Button to="/price-packages">Order a Test Now <ArrowRight size={22} aria-hidden="true" /></Button>
        </div>
        <ul className="sh-resource-order-benefits">
          {["100% Confidential", "CLIA-Certified Labs", "Results in 1–3 Days", "Convenient Locations"].map((benefit) => (
            <li key={benefit}><Check size={19} aria-hidden="true" />{benefit}</li>
          ))}
        </ul>
      </section>
      <TrustStrip />
    </main>
  );
}
