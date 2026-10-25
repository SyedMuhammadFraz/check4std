import React, { act, useState } from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import CustomerJourney from "./CustomerJourney";
import { AuthContext } from "../../utils/AuthContext";
import { CartProvider } from "../../utils/CartContext";
import { LocationProvider } from "../../utils/LocationContext";
import { webApiInstance, connectTokenInstance, userRegisterInstance } from "../../AxiosInstance";
import { journeyNames, journeySteps, CHECKOUT_ATTEMPT_KEY } from "./journeyModel";

jest.mock("../../AxiosInstance", () => ({ webApiInstance: { get: jest.fn(), post: jest.fn() }, connectTokenInstance: { post: jest.fn() }, userRegisterInstance: { post: jest.fn() } }));
jest.mock("../../utils/AuthContext", () => ({ AuthContext: require("react").createContext({}) }));
jest.mock("../User Profile/profile page", () => () => <h1>Your health account.</h1>);
jest.mock("../Questionares/StdQuestions", () => () => <h1>Let’s understand your needs.</h1>);

const token = `header.${btoa(JSON.stringify({ sub: "patient@example.com", role: "user" }))}.signature`;
let host, root;
function Session({ authenticated, children }) {
  const [authToken, setToken] = useState(authenticated ? token : null);
  return <AuthContext.Provider value={{ authToken, loading: false, login: setToken }}>{children}</AuthContext.Provider>;
}
async function mount(step = "tests", authenticated = false) {
  await act(async () => root.render(<MemoryRouter initialEntries={[`/journey/${step}`]}><LocationProvider><CartProvider><Session authenticated={authenticated}><Routes><Route path="/journey/:step" element={<CustomerJourney />} /></Routes></Session></CartProvider></LocationProvider></MemoryRouter>));
}
async function click(element) { expect(element).toBeTruthy(); await act(async () => element.click()); }
const button = (label) => [...host.querySelectorAll("button")].find((element) => element.textContent === label);
const link = (label) => [...host.querySelectorAll("a")].find((element) => element.textContent === label);
async function fill(name, value) {
  const element = host.querySelector(`[name="${name}"]`); expect(element).toBeTruthy();
  await act(async () => {
    const proto = element.tagName === "SELECT" ? HTMLSelectElement.prototype : HTMLInputElement.prototype;
    Object.getOwnPropertyDescriptor(proto, "value").set.call(element, value);
    element.dispatchEvent(new Event(element.tagName === "SELECT" ? "change" : "input", { bubbles: true }));
  });
}
async function submit() { await act(async () => host.querySelector("form").dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }))); }
beforeEach(() => {
  sessionStorage.clear(); jest.clearAllMocks(); window.scrollTo = jest.fn();
  host = document.createElement("div"); document.body.appendChild(host); root = createRoot(host);
  webApiInstance.get.mockImplementation(async (url) => {
    if (url.startsWith("/Disease/get-by-name/")) return { data: { result: { id: 1, name: decodeURIComponent(url.split("/").pop()), price: 89 } } };
    if (url === "/Lookup/get-by-type") return { data: { result: [{ id: 1, lookupValue: "Female" }] } };
    if (url === "/User/account-status") return { data: { result: { active: false } } };
    if (url === "/Role/get-by-name/user") return { data: { result: { id: "role-id" } } };
    if (url === "/User/get-by-email") return { data: { result: { name: "Sample Patient", dob: "1990-01-01" } } };
    return { data: { result: [] } };
  });
  userRegisterInstance.post.mockResolvedValue({ data: "otp-reference" });
  connectTokenInstance.post.mockResolvedValue({ data: { access_token: token } });
});
afterEach(async () => { await act(async () => root.unmount()); host.remove(); });

test("new patient goes from test selection through registration and OTP to payment", async () => {
  await mount(); expect(button("Choose a test center").disabled).toBe(true);
  await click(button("Select test")); await click(button("Choose a test center"));
  await click(button("Choose this center")); await click(button("Continue"));
  for (const [name, value] of Object.entries({ firstName: "Sample", lastName: "Patient", gender: "1", address: "123 Example Street", city: "Deltona", state: "FL", zip: "32738", dob: "1990-01-01", phoneNumber: "(123) 456-7890", email: "patient@example.com" })) await fill(name, value);
  await submit(); expect(host.querySelector("h1").textContent).toBe("Your account. Your access.");
  await fill("password", "Example123!"); await fill("confirm-password", "Different123!"); await submit();
  expect(host.textContent).toContain("Passwords must match."); expect(userRegisterInstance.post).not.toHaveBeenCalled();
  await fill("confirm-password", "Example123!"); await submit();
  expect(userRegisterInstance.post.mock.calls[0][1]).toMatchObject({ email: "patient@example.com", firstName: "Sample", gender: 1 });
  expect(host.querySelector("h1").textContent).toBe("Verify your email.");
  await fill("otp", "654321"); await submit();
  expect(host.querySelector("h1").textContent).toBe("Review your order.");
  expect(connectTokenInstance.post.mock.calls[0][1].get("Otp")).toBe("654321");
  expect(button("Continue to secure payment").disabled).toBe(true);
  expect(sessionStorage.getItem("checkoutTests")).toContain("Chlamydia & Gonorrhea");
  expect(JSON.stringify(sessionStorage)).not.toContain("Example123!");
});
test("standalone signup collects patient fields and verification opens the account", async () => {
  await mount("sign-up");
  for (const [name, value] of Object.entries({ firstName: "Sample", lastName: "Patient", gender: "1", address: "123 Example Street", city: "Deltona", state: "FL", zip: "32738", dob: "1990-01-01", phoneNumber: "(123) 456-7890", email: "patient@example.com", password: "Example123!", "confirm-password": "Example123!" })) await fill(name, value);
  await submit(); expect(host.querySelector("h1").textContent).toBe("Verify your email.");
  await fill("otp", "654321"); await submit();
  expect(host.querySelector("h1").textContent).toBe("Your health account.");
});
test("standalone login opens the account rather than an empty checkout", async () => {
  await mount("login"); await fill("email", "patient@example.com"); await fill("password", "Example123!"); await submit();
  expect(host.querySelector("h1").textContent).toBe("Your health account.");
});
test("an older paid order is not used to confirm the current payment", async () => {
  sessionStorage.setItem(CHECKOUT_ATTEMPT_KEY, JSON.stringify({ startedAt: Date.now(), testIds: [1] }));
  webApiInstance.get.mockResolvedValue({ data: { result: [{ id: 1, orderDate: "2020-01-01", orderStatus: "Processed", amount: 89, diseases: [{ id: 1 }] }] } });
  await mount("payment-success", true);
  expect(host.textContent).toContain("The order for this checkout has not appeared yet");
  expect(host.textContent).not.toContain("Your payment has been confirmed");
});
test("checkout requires another review after the price changes", async () => {
  sessionStorage.setItem("checkoutTests", JSON.stringify([{ id: 1, name: "10 Test Panel", price: 50 }]));
  sessionStorage.setItem("journeyCollectionPreference", JSON.stringify("Sample Center — Deltona"));
  await mount("payment", true); await click(host.querySelector('input[type="checkbox"]')); await click(button("Continue to secure payment"));
  expect(host.textContent).toContain("Pricing has changed"); expect(webApiInstance.post).not.toHaveBeenCalled();
  expect(button("Continue to secure payment").disabled).toBe(true);
});
test("password recovery has separate code and new-password screens", async () => {
  connectTokenInstance.post.mockResolvedValue({ data: "reset-reference" });
  await mount("forgot-password"); await fill("email", "patient@example.com"); await submit();
  await fill("otp", "654321"); await submit(); expect(host.querySelector("h1").textContent).toBe("Choose a new password.");
  await fill("password", "Example123!"); await fill("confirm-password", "Example123!"); await submit();
  expect(connectTokenInstance.post).toHaveBeenLastCalledWith("/api/UserRegistration/reset-password", { otpId: "reset-reference", otp: "654321", password: "Example123!", confirmPassword: "Example123!" });
  expect(host.querySelector("h1").textContent).toBe("Welcome back.");
});
test.each(Object.keys(journeyNames))("route %s renders its screen and every journey step", async (step) => {
  await mount(step); expect(host.querySelector("h1")).not.toBeNull();
  expect(host.querySelectorAll('[aria-label="Journey steps"] li')).toHaveLength(journeySteps.length);
  expect(host.textContent).not.toContain("undefined");
});

test("checkout sends real IDs without sending a dummy lab as a real facility", async () => {
  sessionStorage.setItem("checkoutTests", JSON.stringify([{ id: 1, name: "10 Test Panel", price: 89 }]));
  sessionStorage.setItem("journeyCollectionPreference", JSON.stringify("Sample Center — Deltona"));
  webApiInstance.post.mockRejectedValue({ response: { status: 503, data: { message: "Payment service unavailable" } } });
  await mount("payment", true); await click(host.querySelector('input[type="checkbox"]')); await click(button("Continue to secure payment"));
  expect(webApiInstance.post).toHaveBeenCalledWith("/Payment/create-checkout-session", { diseaseIdList: [1], doctorId: 15 }, { headers: { Authorization: `Bearer ${token}` } });
  expect(host.textContent).toContain("Payment service unavailable");
  expect(host.textContent).not.toContain("Thank you for choosing");
  expect(button("Continue to secure payment").disabled).toBe(false);
});

test("consultation books only the selected available clinician slot", async () => {
  webApiInstance.get.mockResolvedValue({ data: { result: [{ date: "2099-01-01", doctorId: 7, doctorName: "Dr Example", timeSlots: [
    { id: 10, startTime: "09:00", endTime: "09:30", statusName: "Available", isBooked: true },
    { id: 11, startTime: "10:00", endTime: "10:30", statusName: "Available", isBooked: false },
  ] }] } });
  webApiInstance.post.mockResolvedValue({ data: { statusCode: 200 } });
  await mount("consultation", true); await fill("visit-date", "2099-01-01");
  expect(host.querySelectorAll('#journey-visit-time option')).toHaveLength(2);
  await fill("visit-time", "7-11"); await submit();
  expect(webApiInstance.post).toHaveBeenCalledWith("/Doctor/add-appointment", { doctorId: 7, timeSlotId: 11 }, { headers: { Authorization: `Bearer ${token}` } });
  expect(host.textContent).toContain("Appointment confirmed");
  expect(host.textContent).toContain("Dr Example");
});

const placedOrder = (orderStatus) => ({ data: { result: [{ id: 9, orderDate: "2026-10-23T10:00:01Z", orderStatus, amount: 89, diseases: [{ id: 1, name: "10 Test Panel" }] }] } });
const recordAttempt = () => sessionStorage.setItem(CHECKOUT_ATTEMPT_KEY, JSON.stringify({ startedAt: Date.parse("2026-10-23T10:00:00Z"), testIds: [1] }));

test("current backend-confirmed order displays confirmation", async () => {
  recordAttempt();
  webApiInstance.get.mockResolvedValue(placedOrder("Processed"));
  await mount("payment-success", true);
  expect(host.textContent).toContain("Your payment has been confirmed by the order service");
  expect(host.textContent).toContain("#9");
});

test("a confirmed order announces itself in a dialog that can be dismissed", async () => {
  recordAttempt();
  webApiInstance.get.mockResolvedValue(placedOrder("Processed"));
  await mount("payment-success", true);
  const dialog = host.querySelector('[role="dialog"]');
  expect(dialog).not.toBeNull();
  expect(dialog.getAttribute("aria-modal")).toBe("true");
  expect(dialog.textContent).toContain("Thank you for choosing Satellite Health.");
  expect(dialog.textContent).toContain("#9");
  await click(button("Close"));
  expect(host.querySelector('[role="dialog"]')).toBeNull();
});

test("an unpaid order never announces a confirmed dialog", async () => {
  recordAttempt();
  webApiInstance.get.mockResolvedValue(placedOrder("Pending"));
  await mount("payment-success", true);
  expect(host.querySelector('[role="dialog"]')).toBeNull();
  expect(host.textContent).not.toContain("Thank you for choosing");
});
