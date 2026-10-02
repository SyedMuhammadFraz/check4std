import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, CircleAlert, RefreshCw, ShieldCheck, ShoppingCart } from "lucide-react";
import { webApiInstance } from "../../AxiosInstance";
import { AuthContext } from "../../utils/AuthContext";
import useGotoOrderPage from "./order-handle";
import { Button, Hero, ServiceLinks, Steps, TrustStrip } from "../Marketing/MarketingUI";
import TestCards, { formatTestPrice, TEST_NAMES } from "../Marketing/TestCards";
import "./Catalogue.css";

const TEST_DETAILS = {
  "10 Test Panel": { group: "panels", detail: "/ten-test-panel", description: "Our comprehensive panel for the most common STDs." },
  "10 Test Panel with HIV RNA Early Detection": { group: "panels", detail: "/ten-test-panel", description: "Our comprehensive panel, with HIV RNA early detection included." },
  Chlamydia: { group: "individual", detail: "/chlamydia-test", description: "Individual chlamydia testing." },
  Gonorrhea: { group: "individual", detail: "/gonorrhea-test", description: "Individual gonorrhea testing." },
  "Hepatitis A": { group: "hepatitis", detail: "/hep-a-test", description: "Individual hepatitis A testing." },
  "Hepatitis B": { group: "hepatitis", detail: "/hep-b-test", description: "Individual hepatitis B testing." },
  "Hepatitis C": { group: "hepatitis", detail: "/hep-c-test", description: "Individual hepatitis C testing." },
  "Chlamydia & Gonorrhea": { group: "individual", detail: "/chlamydia-gonorrhea-test", description: "Two common STDs. One convenient test." },
  "HIV 1 & 2 Antibody (4th Gen)": { group: "hiv", detail: "/hiv-test", description: "Fourth-generation HIV 1 & 2 testing." },
  "Herpes I": { group: "herpes", detail: "/oral-herpes-test", description: "Individual herpes simplex virus type 1 testing." },
  "Herpes II": { group: "herpes", detail: "/genital-herpes-test", description: "Individual herpes simplex virus type 2 testing." },
  Syphilis: { group: "individual", detail: "/syphilis-test", description: "Individual syphilis testing." },
};

const FILTERS = [
  { id: "all", label: "All tests" },
  { id: "panels", label: "Test panels" },
  { id: "individual", label: "Individual tests" },
  { id: "hiv", label: "HIV" },
  { id: "herpes", label: "Herpes" },
  { id: "hepatitis", label: "Hepatitis" },
];

const isAvailable = (test) => Boolean(
  test && typeof test.name === "string" && test.name.trim() &&
  test.price !== null && test.price !== "" && Number.isFinite(Number(test.price)) && Number(test.price) >= 0
);

const MainPage = () => {
  const { authToken } = useContext(AuthContext);
  const gotoOrderPage = useGotoOrderPage();
  const [searchParams, setSearchParams] = useSearchParams();
  const [catalog, setCatalog] = useState({});
  const [loading, setLoading] = useState(true);
  const [failedCount, setFailedCount] = useState(0);
  const [retry, setRetry] = useState(0);
  const [selectedNames, setSelectedNames] = useState([]);
  const catalogueHeading = useRef(null);
  const showAll = searchParams.get("view") === "all";
  const requestedCategory = searchParams.get("category");
  const category = FILTERS.some((filter) => filter.id === requestedCategory) ? requestedCategory : "all";

  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    setLoading(true);
    setFailedCount(0);

    const loadCatalogue = async () => {
      const responses = await Promise.allSettled(TEST_NAMES.map(async (name) => {
        const response = await webApiInstance.get(`/Disease/get-by-name/${encodeURIComponent(name)}`, {
          ...(authToken ? { headers: { Authorization: `Bearer ${authToken}` } } : {}),
          signal: controller.signal,
          timeout: 15000,
        });
        if (response.data.statusCode !== 200 || !isAvailable(response.data.result)) {
          throw new Error("Test pricing is unavailable.");
        }
        return [name, response.data.result];
      }));

      if (!active) return;
      const available = {};
      let failures = 0;
      responses.forEach((response) => {
        if (response.status === "fulfilled") {
          available[response.value[0]] = response.value[1];
        } else {
          failures += 1;
        }
      });
      setCatalog(available);
      setFailedCount(failures);
      setLoading(false);
    };

    loadCatalogue();
    return () => {
      active = false;
      controller.abort();
    };
  }, [authToken, retry]);

  useEffect(() => {
    if (showAll) {
      catalogueHeading.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [showAll, category]);

  const visibleNames = TEST_NAMES.filter((name) => {
    if (category === "all") return true;
    if (category === "individual") return TEST_DETAILS[name].group !== "panels";
    return TEST_DETAILS[name].group === category;
  });
  const selectedTests = selectedNames.filter((name) => isAvailable(catalog[name])).map((name) => ({
    name: catalog[name].name,
    price: catalog[name].price,
  }));
  const total = selectedTests.reduce((sum, test) => sum + Number(test.price), 0);

  const toggleTest = (name) => setSelectedNames((current) => (
    current.includes(name) ? current.filter((item) => item !== name) : [...current, name]
  ));

  const chooseFilter = (filter) => setSearchParams({ view: "all", ...(filter === "all" ? {} : { category: filter }) }, { replace: true });

  return (
    <main className="satellite-page sh-catalogue-page">
      <Hero
        variant="tests"
        eyebrow="Tests & Services"
        title={<>Take <span className="sh-test-hero-title-tail">Charge of</span></>}
        accent="Your Health Today."
        description="Affordable, confidential STD testing and sexual health services — all online."
        tagline="Your Health. A Brighter Tomorrow."
      >
        <Button to="/price-packages?view=all" onClick={() => showAll && catalogueHeading.current?.scrollIntoView({ behavior: "smooth", block: "start" })}>Ready to Get Started</Button>
        <TrustStrip compact />
      </Hero>

      <section className="sh-test-overview sh-section" aria-labelledby="test-services-heading">
        <div className="sh-container">
          <div className="sh-section-heading sh-catalogue-heading">
            <h2 id="test-services-heading">Our Tests &amp; Services</h2>
            <p>Choose from our most popular tests or explore all available options.</p>
          </div>
          <TestCards catalog={catalog} loading={loading} compact />
          <div className="sh-catalogue-view-all">
            <Button to="/price-packages?view=all" variant="outline" onClick={() => showAll && catalogueHeading.current?.scrollIntoView({ behavior: "smooth", block: "start" })}>View All Tests &amp; Services</Button>
          </div>
          {failedCount > 0 && (
            <div className="sh-pricing-notice" role="status">
              <CircleAlert size={21} aria-hidden="true" />
              <p>{failedCount === TEST_NAMES.length ? "Current prices are temporarily unavailable." : "Some test prices are temporarily unavailable."} You can still explore our tests and services.</p>
              <button type="button" onClick={() => setRetry((value) => value + 1)} disabled={loading}>
                <RefreshCw size={15} aria-hidden="true" /> Retry prices
              </button>
            </div>
          )}
        </div>
      </section>

      {showAll && (
        <section className="sh-section sh-full-catalogue" aria-labelledby="all-tests-heading">
          <div className="sh-container">
            <div className="sh-section-heading sh-catalogue-heading" ref={catalogueHeading}>
              <span className="sh-catalogue-eyebrow">Find the right option for you</span>
              <h2 id="all-tests-heading">All Tests &amp; Services</h2>
              <p>Choose a panel or select the individual tests you need.</p>
            </div>
            <div className="sh-catalogue-filters" role="group" aria-label="Filter tests">
              {FILTERS.map((filter) => (
                <button key={filter.id} type="button" aria-pressed={category === filter.id} onClick={() => chooseFilter(filter.id)}>
                  {filter.label}
                </button>
              ))}
            </div>
            <div className="sh-catalogue-list" aria-busy={loading}>
              {visibleNames.map((name) => {
                const test = catalog[name];
                const available = isAvailable(test) && !loading;
                const selected = selectedNames.includes(name) && available;
                const details = TEST_DETAILS[name];
                return (
                  <article key={name} className={`sh-order-test${selected ? " is-selected" : ""}`}>
                    <label className="sh-order-test-choice">
                      <input type="checkbox" checked={selected} disabled={!available} onChange={() => toggleTest(name)} />
                      <span>
                        <span className="sh-order-test-kind">{details.group === "panels" ? "Comprehensive panel" : "Individual testing"}</span>
                        <span className="sh-order-test-name">{name}</span>
                      </span>
                    </label>
                    <p>{details.description}</p>
                    <div className="sh-order-test-bottom">
                      <strong>{loading ? "Loading price…" : available ? formatTestPrice(test.price) : "Price unavailable"}</strong>
                      <Link to={details.detail}>Test details <ArrowRight size={15} aria-hidden="true" /></Link>
                    </div>
                  </article>
                );
              })}
            </div>
            <div className="sh-selection-summary">
              <div className="sh-selection-description" aria-live="polite">
                <ShoppingCart size={25} aria-hidden="true" />
                <div><strong>{selectedTests.length ? `${selectedTests.length} ${selectedTests.length === 1 ? "test" : "tests"} selected` : "Choose your tests"}</strong><span>{selectedTests.length ? "Your selection is ready to order." : "Select one or more tests to get started."}</span></div>
              </div>
              <div className="sh-selection-actions">
                {selectedTests.length > 0 && <button type="button" className="sh-clear-selection" onClick={() => setSelectedNames([])}>Clear selection</button>}
                <strong className="sh-selection-total" aria-label={`Total ${formatTestPrice(total)}`}>{formatTestPrice(total)}</strong>
                <button type="button" className="sh-order-selected" disabled={loading || selectedTests.length === 0} onClick={() => gotoOrderPage(selectedTests)}>
                  Order Selected Tests <ArrowRight size={18} aria-hidden="true" />
                </button>
              </div>
            </div>
            <p className="sh-catalogue-security"><ShieldCheck size={17} aria-hidden="true" /> Private, secure ordering. Your health, your choice.</p>
            <div className="sh-catalogue-additional">
              <div><h3>Looking for additional support?</h3><p>Explore treatment support, retesting, and care for your next step.</p></div>
              <Button to="/contact" variant="outline">Contact Our Team</Button>
            </div>
          </div>
        </section>
      )}

      <Steps compact withBenefits />
      <ServiceLinks />
    </main>
  );
};

export default MainPage;
