import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import { AuthContext } from "../../utils/AuthContext";
import { useCart } from "../../utils/CartContext";
import { LocationContext } from "../../utils/LocationContext";
import { CHECKOUT_TESTS_KEY, GUEST_DETAILS_KEY, POST_LOGIN_REDIRECT_KEY, readStored, writeStored } from "../../utils/checkoutStorage";
import { EMPTY_GUEST_DETAILS } from "../Orders/guestDetails";
import ProfilePage from "../User Profile/profile page";
import StdQuestions from "../Questionares/StdQuestions";
import { journeyNames, journeyPath, journeySections, journeySteps, LOCATION_KEY, savedLocation } from "./journeyModel";
import { Heading, JourneyLink } from "./JourneyUI";
import JourneyAuth from "./JourneyAuth";
import { CenterSelection, PatientStep, PaymentStep, SampleDocuments, TestSelection } from "./JourneySteps";
import { ConsultationStep, OrderConfirmation } from "./JourneyAftercare";
import JourneyDiseases from "./JourneyDiseases";
import "./journey.css";
import "./customer-journey.css";

const authSteps = ["account", "sign-up", "login", "otp-verification", "forgot-password", "password-reset-otp", "set-new-password"];
export default function CustomerJourney() {
  const { step: pathStep } = useParams();
  const location = useLocation();
  const step = pathStep || location.hash.slice(1) || "tests";
  const { authToken, loading: authLoading } = useContext(AuthContext);
  const { selectedTests, setSelectedTests } = useCart();
  const { selectedLocation, setSelectedLocation } = useContext(LocationContext);
  const [tests, updateTests] = useState(() => selectedTests.length ? selectedTests : readStored(CHECKOUT_TESTS_KEY, []));
  const [center, updateCenter] = useState(() => selectedLocation || savedLocation());
  const [details, setDetails] = useState(() => ({ ...EMPTY_GUEST_DETAILS, ...readStored(GUEST_DETAILS_KEY, {}) }));
  const [resetCode, setResetCode] = useState("");
  const main = useRef(null);
  const previousToken = useRef(authToken);
  const setTests = (next) => { updateTests(next); setSelectedTests(next); writeStored(CHECKOUT_TESTS_KEY, next); };
  const setCenter = (next) => { updateCenter(next); setSelectedLocation(next); writeStored(LOCATION_KEY, next); };
  useEffect(() => { writeStored(GUEST_DETAILS_KEY, details); }, [details]);
  useEffect(() => {
    if (previousToken.current && !authToken) {
      updateTests([]); updateCenter(""); setDetails({ ...EMPTY_GUEST_DETAILS }); setResetCode("");
    }
    previousToken.current = authToken;
  }, [authToken]);
  useEffect(() => {
    document.title = `${journeyNames[step] || "Your testing journey"} | Satellite Health`;
    window.scrollTo(0, 0);
    main.current?.focus({ preventScroll: true });
  }, [step]);
  if (!journeyNames[step]) return <Navigate to={journeyPath("tests")} replace />;
  const activeStep = journeySteps.findIndex(([slug]) => slug === step);
  const aliases = { checkout: "payment", "payment-collection": "payment", "payment-success": "confirmation", "payment-failed": "payment", "find-a-lab": "centers", consultation: "follow-up", "otp-verification": "account" };
  const current = aliases[step] || step;
  let content;
  if (step === "tests") content = <TestSelection tests={tests} setTests={setTests} />;
  if (step === "centers" || step === "find-a-lab") content = <CenterSelection tests={tests} center={center} setCenter={setCenter} standalone={step === "find-a-lab"} />;
  if (step === "details") content = <PatientStep tests={tests} center={center} details={details} setDetails={setDetails} />;
  if (authSteps.includes(step)) content = <JourneyAuth key={step} step={step} details={details} setDetails={setDetails} resetCode={resetCode} setResetCode={setResetCode} />;
  if (["payment", "checkout", "payment-collection"].includes(step)) content = <PaymentStep key={step} tests={tests} setTests={setTests} center={center} collection={step === "payment-collection"} />;
  if (["confirmation", "payment-success"].includes(step)) content = <OrderConfirmation step={step} />;
  if (["requisition", "results"].includes(step)) content = <SampleDocuments key={step} step={step} tests={tests} center={center} />;
  if (["consultation", "follow-up"].includes(step)) content = <ConsultationStep key={step} followUp={step === "follow-up"} />;
  if (step === "disease-information") content = <JourneyDiseases />;
  if (step === "assessment") content = authToken ? <div className="cj-embedded"><StdQuestions journey /></div> : <><Heading intro="Sign in to complete the assessment and securely save your responses.">Let’s understand your needs.</Heading><JourneyLink step="login" onClick={() => writeStored(POST_LOGIN_REDIRECT_KEY, journeyPath("assessment"))}>Log in to continue</JourneyLink></>;
  if (step === "profile") content = authToken ? <div className="cj-embedded"><ProfilePage journey /></div> : <>
    <Heading intro="Log in with the account associated with your orders and results.">Your health account.</Heading><JourneyLink step="login" onClick={() => writeStored(POST_LOGIN_REDIRECT_KEY, journeyPath("profile"))}>Log in</JourneyLink>
  </>;
  if (step === "payment-failed") content = <div className="j-status-card"><div className="j-status-symbol j-status-symbol--failed">!</div><span className="j-tag">PAYMENT FAILED</span><Heading intro="Review your payment details and try again. Your order is not confirmed until payment succeeds.">Payment couldn’t<br />be completed.</Heading><div className="j-panel"><h3>What you can do</h3><p>Check your card details, use a different payment method, or contact your card provider.</p><p className="j-hint">Check your order status before retrying if you are unsure whether payment completed.</p></div><div className="j-actions"><JourneyLink step="payment">Return to checkout</JourneyLink><JourneyLink step="confirmation" secondary>Check order status</JourneyLink></div></div>;
  if (step === "unauthorized") content = <div className="j-status-card"><div className="j-status-symbol">403</div><Heading intro="Log in with the account associated with this order or result. If you’re already logged in, check that you’re using the correct account.">This page requires access.</Heading><div className="j-actions"><JourneyLink step="login">Go to login</JourneyLink><JourneyLink step="tests" secondary>Return to tests</JourneyLink></div></div>;
  return <div className="sh-journey cj-site">
    <a className="cj-skip" href="#customer-journey-content">Skip to content</a>
    <header className="cj-header"><Link className="cj-brand" to="/"><span className="cj-mark">s</span><span>satellite<span className="cj-light"> health</span></span></Link><nav aria-label="Customer navigation"><Link to={journeyPath("tests")}>Browse tests</Link><Link to={journeyPath("disease-information")}>Disease information</Link><Link to={journeyPath("profile")}>My account</Link><Link to={journeyPath("confirmation")}>My order</Link></nav><span className="cj-badge">Your testing journey</span></header>
    <div className="j-notice cj-notice">Live account and payment services · Test centers, requisitions, and results currently use clearly labeled sample information.</div>
    <div className="j-layout"><aside className="j-aside"><div className="j-eyebrow">YOUR NEXT STEP</div><h2>Care on your terms.</h2><p>A clear path from choosing your test to understanding your results.</p>
      <nav aria-label="Journey steps"><ol className="j-nav">{journeySteps.map(([slug, name], index) => <li key={slug}><Link className={`j-nav-link${current === slug ? " is-active" : ""}`} aria-current={current === slug ? "step" : undefined} to={journeyPath(slug)}><span className="j-num">{index + 1}</span>{name}</Link></li>)}</ol></nav>
      <nav aria-label="Account and patient pages"><ol className="j-nav cj-secondary-nav">{journeySections.map(([label, pages]) => <React.Fragment key={label}><li className="j-nav-group">{label}</li>{pages.map(([slug, name]) => <li key={slug}><Link className={`j-nav-link${step === slug ? " is-active" : ""}`} aria-current={step === slug ? "page" : undefined} to={journeyPath(slug)}>{name}</Link></li>)}</React.Fragment>)}</ol></nav>
      <div className="j-aside-foot">Accessible Testing.<br />Healthier Tomorrows.</div>
    </aside><main className="j-main" id="customer-journey-content" ref={main} tabIndex={-1}>
      <div className="j-eyebrow">{activeStep >= 0 ? `STEP ${activeStep + 1} OF 9` : "SATELLITE HEALTH · " + (journeySections.find(([, pages]) => pages.some(([slug]) => slug === step))?.[0] || "YOUR JOURNEY").toUpperCase()}</div>
      {authLoading ? <p role="status">Loading your session…</p> : content}
    </main></div><footer className="cj-footer"><Link to="/">Satellite Health</Link><span>Accessible Testing. Healthier Tomorrows.</span></footer>
  </div>;
}
