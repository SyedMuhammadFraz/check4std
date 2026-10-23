import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../utils/AuthContext";
import { connectTokenInstance, userRegisterInstance, webApiInstance } from "../../AxiosInstance";
import { POST_LOGIN_REDIRECT_KEY, readStored, removeStored, writeStored } from "../../utils/checkoutStorage";
import { validateGuestDetails, guestCustomerPayload } from "../Orders/guestDetails";
import PatientFields from "../Shared/PatientFields";
import { Field, Heading, JourneyLink, ErrorNotice } from "./JourneyUI";
import { errorMessage, journeyPath, safeReturn } from "./journeyModel";

const AUTH_FLOW_KEY = "journeyEmailVerification";
const PASSWORD_RULE = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
export default function JourneyAuth({ step, details, setDetails, resetCode, setResetCode }) {
  const navigate = useNavigate();
  const { authToken, login } = useContext(AuthContext);
  const [flow, setFlow] = useState(() => readStored(AUTH_FLOW_KEY, {}));
  const [email, setEmail] = useState(details.email || flow.email || "");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [patientErrors, setPatientErrors] = useState({});
  const register = step === "account" || step === "sign-up";
  const otp = step === "otp-verification" || step === "password-reset-otp";
  const reset = step === "set-new-password";
  const forgotten = step === "forgot-password";
  const returnTo = safeReturn(readStored(POST_LOGIN_REDIRECT_KEY, null), journeyPath("profile"));
  const titles = { account: "Your account. Your access.", "sign-up": "Create your account.", login: "Welcome back.", "otp-verification": "Verify your email.", "forgot-password": "Reset your password.", "password-reset-otp": "Verify your reset code.", "set-new-password": "Choose a new password." };

  const saveFlow = (next) => { setFlow(next); writeStored(AUTH_FLOW_KEY, next); };
  const requestCode = async (address, purpose) => {
    const response = await connectTokenInstance.post(`/api/UserRegistration/request-otp/${encodeURIComponent(address)}`);
    if (!response.data) throw new Error("No verification reference was returned.");
    saveFlow({ email: address, id: response.data, purpose });
  };
  const submit = async (event) => {
    event.preventDefault();
    if (busy) return;
    setError(""); setMessage("");
    if ((register || reset) && password !== confirm) { setError("Passwords must match."); return; }
    if ((register || reset) && !PASSWORD_RULE.test(password)) { setError("Use at least 8 characters with an uppercase letter, lowercase letter, number, and one of @$!%*?&."); return; }
    setBusy(true);
    try {
      if (register) {
        const validation = validateGuestDetails(details);
        setPatientErrors(validation);
        if (Object.keys(validation).length) { setError("Complete your patient details before creating your account."); return; }
        if (email.trim().toLowerCase() !== details.email.trim().toLowerCase()) { setError("Use the email from your patient details, or go back to update those details."); return; }
        const roleResponse = await webApiInstance.get("/Role/get-by-name/user");
        const roleId = roleResponse.data?.result?.roleId || roleResponse.data?.result?.id;
        if (!roleId) throw new Error("The account service is unavailable. Please try again.");
        const response = await userRegisterInstance.post("/UserRegistration/register-user", {
          ...guestCustomerPayload(details), name: `${details.firstName.trim()} ${details.lastName.trim()}`, password, roleId,
        });
        if (!response.data) throw new Error("The account service did not return a verification reference.");
        saveFlow({ email: email.trim(), id: response.data, purpose: "register" });
        writeStored(POST_LOGIN_REDIRECT_KEY, journeyPath(step === "sign-up" ? "profile" : "payment"));
        setPassword(""); setConfirm("");
        navigate(journeyPath("otp-verification"));
      } else if (step === "login" || step === "otp-verification") {
        if (otp && (!flow.id || flow.purpose !== "register")) { setError("Create an account or request a new verification code first."); return; }
        const data = new URLSearchParams(otp ? { grant_type: "otp_grant", OtpId: flow.id, Otp: code } : { grant_type: "password", username: email.trim(), password });
        const response = await connectTokenInstance.post("/connect/token", data, { headers: { "Content-Type": "application/x-www-form-urlencoded" } });
        if (!response.data.access_token) throw new Error("Sign-in was not completed. Please try again.");
        login(response.data.access_token);
        removeStored(AUTH_FLOW_KEY, POST_LOGIN_REDIRECT_KEY);
        navigate(returnTo);
      } else if (forgotten) {
        await requestCode(email.trim(), "reset");
        navigate(journeyPath("password-reset-otp"));
      } else if (step === "password-reset-otp") {
        if (!flow.id || flow.purpose !== "reset") { setError("Request a reset code first."); return; }
        // The service verifies the code together with the new password; keep it
        // in memory between these two screens, never in browser storage.
        setResetCode(code);
        navigate(journeyPath("set-new-password"));
      } else if (reset) {
        if (!resetCode || !flow.id || flow.purpose !== "reset") { setError("Enter your reset code first."); return; }
        await connectTokenInstance.post("/api/UserRegistration/reset-password", { otpId: flow.id, otp: resetCode, password, confirmPassword: confirm });
        setResetCode(""); removeStored(AUTH_FLOW_KEY);
        navigate(journeyPath("login"), { state: { passwordReset: true } });
      }
    } catch (err) {
      setError(errorMessage(err, err.response ? "We couldn't complete this request. Check your details and try again." : "Unable to reach the account service. Please try again."));
    } finally { setBusy(false); }
  };
  const resend = async () => {
    setBusy(true); setError(""); setMessage("");
    try { await requestCode(flow.email, step === "password-reset-otp" ? "reset" : "register"); setMessage("A new code has been sent to your email."); }
    catch (err) { setError(errorMessage(err, "The code could not be sent. Please try again.")); }
    finally { setBusy(false); }
  };

  if (authToken && (register || step === "login")) return <>
    <Heading intro="You are signed in. Continue to review your selected tests and collection preference.">Your account. Your access.</Heading>
    <div className="j-panel"><span className="j-pill">Account ready</span><div className="j-actions"><JourneyLink step="details" secondary>Back</JourneyLink><JourneyLink step="payment">Continue to payment</JourneyLink></div></div>
  </>;
  return <div className="j-auth-shell">
    <Heading intro={otp ? "Enter the six-digit code sent to your email address." : register ? "Use your email address as your username to access orders and results." : forgotten ? "Enter your account email to request a reset code." : reset ? "Set a password with at least 8 characters." : "Log in to review your testing journey."}>{titles[step]}</Heading>
    <form className="j-panel" onSubmit={submit}>
      <div className="j-grid">
        {step === "sign-up" && <>
          <PatientFields values={details} errors={patientErrors} idPrefix="journey-signup" onChange={(event) => setDetails({ ...details, [event.target.name]: event.target.value })} />
          <Field label="Date of birth" name="dob" type="date" max={new Date().toISOString().slice(0, 10)} value={details.dob} error={patientErrors.dob} onChange={(event) => setDetails({ ...details, dob: event.target.value })} />
          <Field label="Phone number" name="phoneNumber" type="tel" placeholder="(123) 456-7890" value={details.phoneNumber} error={patientErrors.phoneNumber} onChange={(event) => setDetails({ ...details, phoneNumber: event.target.value })} />
        </>}
        {(register || forgotten || step === "login") && <Field full label={register ? "Username (email address)" : "Email address"} name="email" type="email" autoComplete="username" value={email} onChange={(e) => { setEmail(e.target.value); if (step === "sign-up") setDetails({ ...details, email: e.target.value }); }} />}
        {(register || reset || step === "login") && <Field full={step === "login"} label={reset ? "New password" : "Password"} name="password" type="password" minLength={8} autoComplete={step === "login" ? "current-password" : "new-password"} value={password} onChange={(e) => setPassword(e.target.value)} />}
        {(register || reset) && <Field label="Confirm password" name="confirm-password" type="password" autoComplete="new-password" minLength={8} value={confirm} onChange={(e) => setConfirm(e.target.value)} />}
        {otp && <Field full label="Verification code" name="otp" inputMode="numeric" pattern="[0-9]{6}" maxLength={6} autoComplete="one-time-code" value={code} onChange={(e) => setCode(e.target.value)} />}
      </div>
      {(register || reset) && <p className="j-hint">Use uppercase and lowercase letters, a number, and one of @$!%*?&.</p>}
      {step === "password-reset-otp" && <p className="j-hint">Your code will be verified when you save your new password.</p>}
      <ErrorNotice error={error} />
      <p role="status">{message}</p>
      <button className="j-button" disabled={busy}>{busy ? "Please wait…" : register ? "Create account & continue" : forgotten ? "Send reset code" : reset ? "Reset password" : otp ? step === "password-reset-otp" ? "Continue" : "Verify code" : "Log in"}</button>
      {otp && <p><button type="button" className="j-button j-button--text" disabled={busy || !flow.email} onClick={resend}>Resend code</button></p>}
      {register && <p><Link to={journeyPath("details")}>Back to patient details</Link> · Already have an account? <Link to={journeyPath("login")}>Log in</Link></p>}
      {step === "login" && <><p><Link to={journeyPath("forgot-password")}>Forgot password?</Link></p><p>New to Satellite Health? <Link to={journeyPath("details")}>Create an account</Link></p></>}
      {forgotten && <p><Link to={journeyPath("login")}>Back to login</Link></p>}
      {reset && <p><Link to={journeyPath("password-reset-otp")}>Back to reset code</Link></p>}
    </form>
  </div>;
}
