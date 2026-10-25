import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import ProfilePage from "./profile page";
import { AuthContext } from "../../utils/AuthContext";
import { webApiInstance } from "../../AxiosInstance";

jest.mock("../../AxiosInstance", () => ({ webApiInstance: { get: jest.fn(), put: jest.fn() } }));
jest.mock("../../utils/AuthContext", () => ({ AuthContext: require("react").createContext({}) }));
jest.mock("react-toastify", () => ({ toast: { success: jest.fn(), error: jest.fn() } }));

const token = `header.${btoa(JSON.stringify({ sub: "patient@example.com", role: "user" }))}.signature`;
const order = (extra) => ({ id: 9, orderDate: "2026-10-23T10:00:01Z", amount: 89, diseases: [{ id: 1, name: "10 Test Panel" }], ...extra });
let host, root;

async function mountWith(orders) {
  webApiInstance.get.mockImplementation(async (url) => {
    if (url === "/Order/my-orders") return { data: { result: orders } };
    if (url === "/User/get-by-email") return { data: { result: { name: "Sample Patient", dob: "1990-01-01" } } };
    return { data: { result: [] } };
  });
  await act(async () => root.render(
    <MemoryRouter>
      <AuthContext.Provider value={{ authToken: token, logout: jest.fn() }}><ProfilePage /></AuthContext.Provider>
    </MemoryRouter>
  ));
}
const consultationOffered = () => [...host.querySelectorAll("a")].some((a) => a.textContent.trim() === "Book a consultation");

beforeEach(() => {
  jest.clearAllMocks();
  host = document.createElement("div"); document.body.appendChild(host); root = createRoot(host);
});
afterEach(async () => { await act(async () => root.unmount()); host.remove(); });

// The account page intentionally offers no consultation at the moment. These
// guard against it being reintroduced by accident; when results arrive and the
// card returns, replace them with the state-by-state cases.
test("no consultation is offered before any order has been placed", async () => {
  await mountWith([]);
  expect(consultationOffered()).toBe(false);
});

test("no consultation is offered once an order has been placed", async () => {
  await mountWith([order({ orderStatus: "Processed" })]);
  expect(host.textContent).toContain("#9");
  expect(consultationOffered()).toBe(false);
});
