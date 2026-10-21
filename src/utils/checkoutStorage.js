// Checkout state kept in sessionStorage for the length of the visit, because going to
// Stripe (or to the login page) wipes in-memory state.
export const CHECKOUT_TESTS_KEY = "checkoutTests";
export const GUEST_DETAILS_KEY = "guestCheckoutDetails";
// Where to send a user after logging in (e.g. back to the order page they started).
export const POST_LOGIN_REDIRECT_KEY = "postLoginRedirect";

export const readStored = (key, fallback) => {
  try {
    const value = sessionStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

export const writeStored = (key, value) => {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage blocked (e.g. private mode): checkout still works, it just isn't restored.
  }
};

export const removeStored = (...keys) => {
  try {
    keys.forEach((key) => sessionStorage.removeItem(key));
  } catch {
    // Storage blocked: nothing to remove.
  }
};
