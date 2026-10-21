import React, { useContext } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import "../Journey/journey.css";
import "./page-index.css";

import Diseases from "../Diseases/Diseases";
import SignUp from "../Signup/signup";
import SignIn from "../Signin/signin";
import OTPPage from "../Signup/otp";
import ForgotPassword from "../Signin/ForgotPassword";
import ForgotPasswordOtp from "../Signin/ForgotPasswordOtp";
import SetDoctorPassword from "../Signin/SetDoctorPassword";
import MapPage, { testCenters } from "../Find A Lab/Find_a_Lab";
import StdQuestions from "../Questionares/StdQuestions";
import DoctorConsultation from "../How it Works/Doctor Consultation/DoctorConsultation";
import OrderPage from "../Orders/order";
import ProfilePage from "../User Profile/profile page";
import PaymentSuccess from "../../utils/PaymentSuccess";
import PaymentFailure from "../../utils/PaymentFailure";
import Unauthorized from "../../Modals/Unauthorized";
import { LocationContext } from "../../utils/LocationContext";
import { useCart } from "../../utils/CartContext";

/*
 * A flat index of every account, journey and status screen, shown beside the
 * page it selects. The slugs here are the index's own; each page keeps its real
 * route as well, so /login and /pages/login both work.
 */
export const pages = [
  { slug: "disease-information", label: "Disease Information", Component: Diseases },
  { slug: "sign-up", label: "Sign Up", Component: SignUp },
  { slug: "login", label: "Login", Component: SignIn },
  { slug: "otp-verification", label: "OTP Verification", Component: OTPPage },
  { slug: "forgot-password", label: "Forgot Password", Component: ForgotPassword },
  { slug: "password-reset-otp", label: "Password Reset OTP", Component: ForgotPasswordOtp },
  { slug: "set-new-password", label: "Set New Password", Component: SetDoctorPassword },
  { slug: "find-a-lab", label: "Find a Lab", Component: MapPage },
  { slug: "assessment", label: "STD Assessment", Component: StdQuestions },
  { slug: "consultation", label: "Doctor Consultation", Component: DoctorConsultation },
  { slug: "checkout", label: "Order / Checkout", Component: OrderPage },
  { slug: "profile", label: "User Profile", Component: ProfilePage },
  // PaymentSuccess renders its failure branch unless the redirect param is present.
  { slug: "payment-success", label: "Payment Success", Component: PaymentSuccess, search: "?success=true" },
  { slug: "payment-failed", label: "Payment Failed", Component: PaymentFailure },
  { slug: "unauthorized", label: "Unauthorized Access", Component: Unauthorized },
];

export default function PageIndex() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { selectedLocation } = useContext(LocationContext);
  const { selectedTests } = useCart();
  const cartTotal = selectedTests.reduce((sum, test) => sum + Number(test.price || 0), 0);
  // The context only keeps the lab's name; the rest of its detail lives in the
  // Find a Lab list, so look it back up for the card.
  const lab = testCenters.find((center) => center.name === selectedLocation);

  if (!slug) return <Navigate to={`/pages/${pages[0].slug}`} replace />;

  const active = pages.find((page) => page.slug === slug);
  if (!active) return <Navigate to={`/pages/${pages[0].slug}`} replace />;

  const Active = active.Component;

  return (
    <section className="sh-journey sh-page-index">
      <div className="j-layout">
        <aside className="j-aside">
          <div className="sh-cart-card">
            <span className="j-tag">YOUR CART</span>
            {selectedTests.length ? (
              <>
                <ul>
                  {selectedTests.map((test) => (
                    <li key={test.name}>
                      <span>{test.name}</span>
                      <strong>${Number(test.price || 0).toFixed(2)}</strong>
                    </li>
                  ))}
                </ul>
                <div className="sh-cart-total">
                  <span>Total</span>
                  <strong>${cartTotal.toFixed(2)}</strong>
                </div>
                <button
                  type="button"
                  className="j-button"
                  onClick={() => navigate("/pages/checkout")}
                >
                  Go to checkout
                </button>
              </>
            ) : (
              <>
                <h3>No tests selected</h3>
                <p className="j-hint">Browse the catalogue to add a test or panel.</p>
                <button
                  type="button"
                  className="j-button j-button--secondary"
                  onClick={() => navigate("/price-packages?view=all")}
                >
                  Browse tests
                </button>
              </>
            )}
          </div>

          <div className="sh-lab-card">
            <span className="j-tag">YOUR TEST CENTER</span>
            {selectedLocation ? (
              <>
                <h3>{selectedLocation}</h3>
                {lab && <p className="j-hint">{lab.distance} away</p>}
                <button
                  type="button"
                  className="j-button j-button--secondary"
                  onClick={() => navigate("/pages/find-a-lab")}
                >
                  Change lab
                </button>
              </>
            ) : (
              <>
                <h3>No lab selected</h3>
                <p className="j-hint">Choose a collection location to continue.</p>
                <button
                  type="button"
                  className="j-button"
                  onClick={() => navigate("/pages/find-a-lab")}
                >
                  Find a Lab
                </button>
              </>
            )}
          </div>

          <div className="j-eyebrow">SATELLITE HEALTH</div>
          <h2>All pages.</h2>
          <p>Every account, journey and status screen, in one place.</p>
          <ol className="j-nav">
            {pages.map((page, index) => (
              <li key={page.slug}>
                <button
                  type="button"
                  className={`j-nav-link ${page.slug === slug ? "is-active" : ""}`}
                  aria-current={page.slug === slug ? "page" : undefined}
                  onClick={() => navigate({ pathname: `/pages/${page.slug}`, search: page.search || "" })}
                >
                  <span className="j-num">{index + 1}</span>
                  {page.label}
                </button>
              </li>
            ))}
          </ol>
          <div className="j-aside-foot">
            Accessible Testing.
            <br />
            Healthier Tomorrows.
          </div>
        </aside>

        <main className="sh-page-index-content">
          <Active />
        </main>
      </div>
    </section>
  );
}
