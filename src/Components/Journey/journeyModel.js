import { readStored } from "../../utils/checkoutStorage";

export const journeySteps = [
  ["tests", "Choose your test"], ["centers", "Choose a test center"],
  ["details", "Patient details"], ["account", "Create your account"],
  ["payment", "Review & payment"], ["confirmation", "Order confirmation"],
];
// Sections advertised in the sidebar. The rest stay routable and keep their
// section label for the page eyebrow -- the flow links to them directly
// (checkout -> login -> payment), the payment provider returns to
// /journey/payment-success, and the confirmation modal links to the profile --
// they are simply no longer listed as a browsable index.
export const listedSections = ["Information"];
export const journeySections = [
  ["Information", [["disease-information", "Disease Information"]]],
  ["Account & Authentication", [["sign-up", "Sign Up"], ["login", "Login"], ["otp-verification", "OTP Verification"], ["forgot-password", "Forgot Password"], ["password-reset-otp", "Password Reset OTP"], ["set-new-password", "Set New Password"]]],
  ["Patient Journey", [["find-a-lab", "Find a Lab"], ["assessment", "STD Assessment"], ["consultation", "Doctor Consultation"], ["checkout", "Order / Checkout"], ["payment-collection", "Payment Collection"], ["profile", "User Profile"]]],
  ["Status Pages", [["payment-success", "Payment Success"], ["payment-failed", "Payment Failed"], ["unauthorized", "Unauthorized Access"]]],
];
export const journeyNames = Object.fromEntries([...journeySteps, ...journeySections.flatMap(([, pages]) => pages)]);
export const journeyPath = (step) => `/journey/${step}`;
export const money = (amount) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(Number(amount));
export const LOCATION_KEY = "journeyCollectionPreference";
export const CHECKOUT_ATTEMPT_KEY = "journeyCheckoutAttempt";
export const safeReturn = (value, fallback = journeyPath("profile")) =>
  typeof value === "string" && /^\/journey\/[a-z-]+$/.test(value) ? value : fallback;
export const savedLocation = () => readStored(LOCATION_KEY, "");
export const isPricedTest = (test) => Boolean(test?.id && test.name && test.price !== null && test.price !== undefined && test.price !== "" && Number.isFinite(Number(test.price)) && Number(test.price) >= 0);
export const errorMessage = (error, fallback) => {
  const data = error.response?.data;
  if (error.response?.status === 403) return "Your account needs authorization before ordering. Please complete your assessment or contact a clinician.";
  if (typeof data === "string" && data.length < 300) return data;
  return data?.message || data?.error_description || fallback;
};

// Only the authenticated my-orders response can establish a paid order. A URL
// flag, selected cart, CSV generation flag, or an older order is not a receipt.
export function ordersForAttempt(orders, attempt) {
  if (!attempt?.startedAt || !Array.isArray(attempt.testIds)) return [];
  const wanted = attempt.testIds.map(String).sort();
  return orders.filter((order) => {
    const ids = (order.diseases || []).map((test) => String(test.id)).sort();
    return new Date(order.orderDate).getTime() >= attempt.startedAt &&
      ids.length === wanted.length && ids.every((id, index) => id === wanted[index]);
  });
}
export const isPaidOrder = (order) => /^(paid|processed|completed|OrderStatusProcessed|OrderStatusCompleted)$/i.test(order?.orderStatus?.trim() || "");
