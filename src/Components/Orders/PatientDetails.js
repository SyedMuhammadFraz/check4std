import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../Journey/journey.css";
import "../../Modals/confirmation-modal.css";
import { AuthContext } from "../../utils/AuthContext";
import { webApiInstance } from "../../AxiosInstance";
import {
  GUEST_DETAILS_KEY,
  POST_LOGIN_REDIRECT_KEY,
  readStored,
  writeStored,
} from "../../utils/checkoutStorage";
import PatientFields from "../Shared/PatientFields";
import { EMPTY_GUEST_DETAILS, validateGuestDetails } from "./guestDetails";

// Guest checkout, step 1: the patient's details. Step 2 is the order page (/order),
// where the guest confirms the order and goes to Stripe.
const PatientDetails = () => {
  const { authToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [details, setDetails] = useState(() => ({
    ...EMPTY_GUEST_DETAILS,
    ...readStored(GUEST_DETAILS_KEY, {}),
  }));
  const [errors, setErrors] = useState({});
  const [checking, setChecking] = useState(false);
  const [showExistingAccount, setShowExistingAccount] = useState(false);

  // Logged-in users already have their details on file.
  useEffect(() => {
    if (authToken) navigate("/order", { replace: true });
  }, [authToken, navigate]);

  useEffect(() => {
    writeStored(GUEST_DETAILS_KEY, details);
  }, [details]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDetails((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: undefined }));
  };

  const handleContinue = async (event) => {
    event.preventDefault();
    const validationErrors = validateGuestDetails(details);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      toast.error("Please check the patient details.");
      return;
    }

    setChecking(true);
    try {
      const response = await webApiInstance.get("/User/account-status", {
        params: { email: details.email.trim() },
      });
      // An activated account must log in; the order is then placed from that account.
      if (response.data.result?.active) {
        setShowExistingAccount(true);
        return;
      }
      navigate("/order");
    } catch (error) {
      console.error("Error checking account status:", error);
      toast.error("We couldn't check your email right now. Please try again.");
    } finally {
      setChecking(false);
    }
  };

  const goToLogin = () => {
    writeStored(POST_LOGIN_REDIRECT_KEY, "/order");
    navigate("/login");
  };

  return (
    <section className="sh-journey">
      {showExistingAccount && (
        <div className="confirmation-modal-overlay">
          <div className="confirmation-modal-content" role="dialog" aria-modal="true">
            <h2 className="confirmation-modal-heading">You already have an account</h2>
            <p>
              {details.email.trim()} already has a Satellite Health account. Please log in to
              continue your order. Your selected tests are saved.
            </p>
            <div className="confirmation-modal-buttons">
              <button className="button2" onClick={goToLogin}>
                Log in to continue
              </button>
              <button className="button1" onClick={() => setShowExistingAccount(false)}>
                Use a different email
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="j-shell">
        <div className="j-eyebrow">STEP 1 OF 2 · PATIENT DETAILS</div>
        <h1 className="j-title">Who is being tested?</h1>
        <p className="j-intro">
          Enter the details of the person who will give the sample. The lab needs them on the test
          order. When you confirm the order we create their account and email them a link to
          activate it.
        </p>

        <form className="j-panel" onSubmit={handleContinue}>
          <div className="j-grid">
            <PatientFields values={details} onChange={handleChange} errors={errors} idPrefix="guest" />
            <div>
              <label htmlFor="guest-email">Email</label>
              <input
                id="guest-email"
                name="email"
                type="email"
                autoComplete="email"
                value={details.email}
                onChange={handleChange}
              />
              {errors.email && <p className="j-error">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="guest-phone">Phone</label>
              <input
                id="guest-phone"
                name="phoneNumber"
                type="tel"
                autoComplete="tel"
                placeholder="(123) 456-7890"
                value={details.phoneNumber}
                onChange={handleChange}
              />
              {errors.phoneNumber && <p className="j-error">{errors.phoneNumber}</p>}
            </div>
            <div>
              <label htmlFor="guest-dob">Date of birth</label>
              <input
                id="guest-dob"
                name="dob"
                type="date"
                max={new Date().toISOString().slice(0, 10)}
                value={details.dob}
                onChange={handleChange}
              />
              {errors.dob && <p className="j-error">{errors.dob}</p>}
            </div>
          </div>
          <div className="j-actions">
            <button type="submit" className="j-button" disabled={checking}>
              {checking ? "Checking…" : "Continue to order"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default PatientDetails;
