import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { webApiInstance } from "../../AxiosInstance";
import { AuthContext } from "../../utils/AuthContext";
import { decodeJWT } from "../../utils/JWTDecoder";
import { writeStored, POST_LOGIN_REDIRECT_KEY } from "../../utils/checkoutStorage";
import PatientFields from "../Shared/PatientFields";
import { validateGuestDetails } from "../Orders/guestDetails";
import { TEST_NAMES } from "../Marketing/TestCards";
import { Field, Heading, JourneyLink, Summary, ErrorNotice } from "./JourneyUI";
import { CHECKOUT_ATTEMPT_KEY, errorMessage, isPricedTest, journeyPath, money } from "./journeyModel";

export const sampleCenters = ["Sample Center — Deltona", "Sample Center — Orange City", "Sample Center — Sanford"];
const featured = ["Chlamydia & Gonorrhea", "10 Test Panel", "HIV 1 & 2 Antibody (4th Gen)", "Syphilis"];
const descriptions = {
  "Chlamydia & Gonorrhea": "A focused panel for two common sexually transmitted infections.",
  "10 Test Panel": "A comprehensive panel for the ten most common STDs.",
  "HIV 1 & 2 Antibody (4th Gen)": "An individual testing option for customers seeking HIV screening.",
  Syphilis: "An individual testing option for syphilis screening.",
};

export function TestSelection({ tests, setTests }) {
  const { authToken } = useContext(AuthContext);
  const [catalog, setCatalog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [failures, setFailures] = useState(0);
  const [attempt, setAttempt] = useState(0);
  const [all, setAll] = useState(tests.some((test) => !featured.includes(test.name)));
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    Promise.allSettled(TEST_NAMES.map(async (name) => {
      const response = await webApiInstance.get(`/Disease/get-by-name/${encodeURIComponent(name)}`, { signal: controller.signal, timeout: 15000, ...(authToken ? { headers: { Authorization: `Bearer ${authToken}` } } : {}) });
      if (!isPricedTest(response.data.result)) throw new Error("Test unavailable");
      return response.data.result;
    })).then((responses) => {
      if (controller.signal.aborted) return;
      setCatalog(responses.filter((response) => response.status === "fulfilled").map((response) => response.value));
      setFailures(responses.filter((response) => response.status === "rejected").length);
      setLoading(false);
    });
    return () => controller.abort();
  }, [authToken, attempt]);
  const names = all ? [...featured, ...TEST_NAMES.filter((name) => !featured.includes(name))] : featured;
  const validSelection = tests.length > 0 && tests.every((test) => catalog.some((live) => live.name === test.name));
  const navigate = useNavigate();
  const continueJourney = () => {
    // Reconcile IDs and prices with the latest catalogue, including old carts
    // that only contained a name and price.
    setTests(tests.map((test) => catalog.find((live) => live.name === test.name)));
    navigate(journeyPath("centers"));
  };
  return <>
    <Heading intro="Browse individual tests and panels. Your total is shown before you move on.">Choose the test<br />that’s right for you.</Heading>
    {loading ? <p role="status">Loading available tests and current prices…</p> : <>
      {failures > 0 && <div className="j-panel" role="status"><p>Some test prices could not be loaded. Only available tests can be selected.</p><button className="j-button j-button--secondary" onClick={() => setAttempt(attempt + 1)}>Retry loading tests</button></div>}
      <div className="j-cards">{names.map((name) => {
        const test = catalog.find((entry) => entry.name === name);
        const chosen = tests.some((entry) => entry.name === name);
        return <article className={`j-card${chosen ? " is-selected" : ""}`} key={name}>
          <span className="j-tag">{name.startsWith("10 Test") ? "TEST PANEL" : "INDIVIDUAL / FOCUSED TEST"}</span>
          <h3>{name}</h3><p>{descriptions[name] || `Testing for ${name}.`}</p>
          <div className="j-price">{test ? money(test.price) : "Unavailable"}<small>{test ? "Current test price" : "Pricing could not be loaded"}</small></div>
          <button className="j-button" disabled={!test} aria-pressed={chosen} onClick={() => setTests(chosen ? tests.filter((entry) => entry.name !== name) : [...tests, test])}>{chosen ? "Selected · remove" : "Select test"}</button>
        </article>;
      })}</div>
      <p><button className="j-button j-button--text" onClick={() => setAll(!all)}>{all ? "Show featured tests" : "Browse all tests"}</button></p>
      {tests.length > 0 && <Summary tests={tests} />}
      <div className="j-actions"><Link className="j-button j-button--secondary" to="/price-packages">Back</Link><button className="j-button" disabled={!validSelection} onClick={continueJourney}>Choose a test center</button></div>
    </>}
  </>;
}

export function CenterSelection({ tests, center, setCenter, standalone }) {
  const [zip, setZip] = useState("");
  const [searched, setSearched] = useState(false);
  const navigate = useNavigate();
  return <>
    <Heading intro="Choose a convenient location for your sample collection.">{standalone ? "Find a lab near you." : "Find your test center."}</Heading>
    <Summary tests={tests} center={center} />
    <form className="j-panel" onSubmit={(event) => { event.preventDefault(); setSearched(true); }}>
      <div className="j-grid"><Field label="ZIP code" name="lab-zip" inputMode="numeric" pattern="[0-9]{5}" placeholder="32738" value={zip} onChange={(event) => setZip(event.target.value)} /><button className="j-button cj-search-button">{standalone ? "Search labs" : "Find centers"}</button></div>
      <p className="j-hint" role="status">{searched ? "Sample locations displayed. Live distance search requires the laboratory directory." : "Locations below are examples, not verified lab facilities."}</p>
    </form>
    <div className="j-cards cj-spaced">{sampleCenters.map((name, index) => <article className={`j-card${center === name ? " is-selected" : ""}`} key={name}>
      <span className="j-tag">SAMPLE LOCATION {index + 1}</span><h3>{name}</h3><p>Address, distance, hours, and appointment requirements will appear here when the lab directory is connected.</p>
      <button className="j-button" aria-pressed={center === name} onClick={() => setCenter(name)}>{center === name ? "Selected" : "Choose this center"}</button>
    </article>)}</div>
    <div className="j-actions"><JourneyLink step="tests" secondary>Back</JourneyLink><button className="j-button" disabled={!center} onClick={() => navigate(journeyPath(standalone ? "assessment" : "details"))}>Continue</button></div>
  </>;
}

export function PatientStep({ tests, center, details, setDetails }) {
  const { authToken } = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [profile, setProfile] = useState(null);
  const [retry, setRetry] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    if (!authToken) return;
    const controller = new AbortController();
    setBusy(true); setError("");
    const email = decodeJWT(authToken)?.sub;
    webApiInstance.get("/User/get-by-email", { params: { email }, signal: controller.signal, headers: { Authorization: `Bearer ${authToken}` } })
      .then((response) => { if (!response.data.result) throw new Error(); setProfile({ ...response.data.result, email }); })
      .catch(() => { if (!controller.signal.aborted) setError("We couldn't load your patient details. Please try again."); })
      .finally(() => { if (!controller.signal.aborted) setBusy(false); });
    return () => controller.abort();
  }, [authToken, retry]);
  const change = (event) => { setDetails({ ...details, [event.target.name]: event.target.value }); setErrors({ ...errors, [event.target.name]: undefined }); };
  const submit = async (event) => {
    event.preventDefault(); setError("");
    const validation = validateGuestDetails(details); setErrors(validation);
    if (Object.keys(validation).length) return;
    setBusy(true);
    try {
      const response = await webApiInstance.get("/User/account-status", { params: { email: details.email.trim() } });
      writeStored(POST_LOGIN_REDIRECT_KEY, journeyPath("payment"));
      navigate(journeyPath(response.data.result?.active ? "login" : "account"));
    } catch (err) { setError(errorMessage(err, "We couldn't check your email right now. Please try again.")); }
    finally { setBusy(false); }
  };
  return <>
    <Heading intro="Your patient details will be used to prepare your test order.">Tell us about yourself.</Heading><Summary tests={tests} center={center} />
    {authToken ? <div className="j-panel">
      {busy && <p role="status">Loading your patient details…</p>}<ErrorNotice error={error} />
      {error && <button className="j-button" onClick={() => setRetry(retry + 1)}>Retry</button>}
      {profile && <><h3>{profile.name}</h3>{[["Email address", profile.email], ["Phone number", profile.phoneNumber], ["Date of birth", profile.dob?.slice(0, 10)], ["Physical address", [profile.address, profile.city, profile.state, profile.zip].filter(Boolean).join(", ")]].map(([label, value]) => <div className="j-row" key={label}><span>{label}</span><strong>{value || "Not on file"}</strong></div>)}<p className="j-hint">Your saved account details are used for this order.</p><JourneyLink step="profile" secondary>Manage patient details</JourneyLink></>}
      <div className="j-actions"><JourneyLink step="centers" secondary>Back</JourneyLink>{profile && <JourneyLink step="account">Continue to account</JourneyLink>}</div>
    </div> : <form className="j-panel" onSubmit={submit}>
      <div className="j-grid">
        <PatientFields values={details} onChange={change} errors={errors} idPrefix="journey-patient" />
        <Field label="Patient date of birth" name="dob" type="date" max={new Date().toISOString().slice(0, 10)} value={details.dob} onChange={change} error={errors.dob} />
        <Field label="Phone number" name="phoneNumber" type="tel" placeholder="(123) 456-7890" autoComplete="tel" value={details.phoneNumber} onChange={change} error={errors.phoneNumber} />
        <Field label="Email address" name="email" type="email" autoComplete="email" value={details.email} onChange={change} error={errors.email} />
      </div><ErrorNotice error={error} />
      <div className="j-actions"><JourneyLink step="centers" secondary>Back</JourneyLink><button className="j-button" disabled={busy}>{busy ? "Checking…" : "Continue to account"}</button></div>
    </form>}
  </>;
}

export function PaymentStep({ tests, setTests, center, collection }) {
  const { authToken } = useContext(AuthContext);
  const [reviewed, setReviewed] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const total = tests.reduce((sum, test) => sum + Number(test.price), 0);
  const pay = async () => {
    if (busy || !reviewed || !tests.length || !center) return;
    if (!authToken) { writeStored(POST_LOGIN_REDIRECT_KEY, journeyPath("payment")); navigate(journeyPath("login")); return; }
    setBusy(true); setError("");
    try {
      const current = await Promise.all(tests.map(async (test) => {
        const response = await webApiInstance.get(`/Disease/get-by-name/${encodeURIComponent(test.name)}`, { headers: { Authorization: `Bearer ${authToken}` } });
        if (!isPricedTest(response.data.result)) throw new Error("A selected test is no longer available. Please choose your tests again.");
        return response.data.result;
      }));
      if (current.some((test, index) => Number(test.price) !== Number(tests[index].price))) {
        setTests(current); setReviewed(false); setError("Pricing has changed. Review the updated total before continuing."); return;
      }
      setTests(current);
      const startedAt = Date.now();
      // Use the existing checkout contract. Sample centers are deliberately not
      // sent as a real facility ID; the backend has no lab-selection field.
      const response = await webApiInstance.post("/Payment/create-checkout-session", { diseaseIdList: current.map((test) => test.id), doctorId: 15 }, { headers: { Authorization: `Bearer ${authToken}` } });
      const url = new URL(response.data.sessionUrl);
      if (url.protocol !== "https:" || url.hostname !== "checkout.stripe.com") throw new Error("The payment service did not return a valid secure checkout link.");
      writeStored(CHECKOUT_ATTEMPT_KEY, { startedAt, testIds: current.map((test) => test.id) });
      window.location.assign(url.href);
    } catch (err) { setError(errorMessage(err, err.message?.startsWith("A selected") || err.message?.startsWith("The payment") ? err.message : "We couldn't start checkout. Please try again.")); }
    finally { setBusy(false); }
  };
  return <>
    <Heading intro="Check your selected test and center before completing your order.">{collection ? "Payment details." : "Review your order."}</Heading>
    <Summary tests={tests} center={center} />
    <div className="j-payment-layout"><div className="j-panel">
      <h2 className="j-panel-title">{collection ? "Pay by card" : "Your tests"}</h2>
      {tests.map((test) => <div className="j-row" key={test.name}><span>{test.name}</span><strong>{money(test.price)}</strong></div>)}
      {!tests.length && <p>No tests selected. <Link to={journeyPath("tests")}>Browse tests</Link></p>}
      <h3>Payment details</h3><p className="j-hint">Enter your card and billing details on Stripe’s secure checkout. Your final total is shown before you pay.</p>
      <h3>Collection preference</h3><p>{center || "No center selected"}</p><p className="j-hint">This is a sample location. It does not reserve a real lab visit. Follow the collection instructions supplied with your order.</p>
      <div className="j-actions"><JourneyLink step="tests" secondary>Change test</JourneyLink><JourneyLink step="centers" secondary>Change center</JourneyLink></div>
    </div><div className="j-payment-summary"><div className="j-panel">
      <span className="j-tag">YOUR ORDER</span><h2 className="j-panel-title">Order summary</h2>
      <div className="j-payment-total"><span>Total</span><strong>{money(total)}</strong></div>
      <label className="j-check"><input type="checkbox" checked={reviewed} onChange={(event) => setReviewed(event.target.checked)} /><span>I have reviewed the selected tests and total. I understand the center is a sample location.</span></label>
      <ErrorNotice error={error} />
      <button className="j-button j-pay-button" disabled={!reviewed || !tests.length || !center || busy} onClick={pay}>{busy ? "Opening secure checkout…" : "Continue to secure payment"}</button>
      {!center && <p className="j-error">Choose a test center to continue.</p>}
      <p className="j-hint">Your order is confirmed only after the payment service reports a successful payment.</p>
    </div></div></div>
    <div className="j-actions"><JourneyLink step="account" secondary>Back</JourneyLink><JourneyLink step="profile" secondary>My account</JourneyLink></div>
  </>;
}
