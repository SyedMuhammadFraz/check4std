import { isPaidOrder, isPricedTest, ordersForAttempt, safeReturn } from "./Components/Journey/journeyModel";

test("pending and canceled orders cannot establish payment success", () => {
  expect(isPaidOrder({ orderStatus: "Pending", success: true })).toBe(false);
  expect(isPaidOrder({ orderStatus: "Canceled" })).toBe(false);
  expect(isPaidOrder({ orderStatus: "Processed" })).toBe(true);
  expect(isPaidOrder({ orderStatus: "Completed" })).toBe(true);
});
test("confirmation matches the current checkout instead of an older paid order", () => {
  const attempt = { startedAt: Date.parse("2026-10-23T10:00:00Z"), testIds: [1, 2] };
  const orders = [
    { id: 1, orderDate: "2026-10-22T10:00:00Z", diseases: [{ id: 1 }, { id: 2 }] },
    { id: 2, orderDate: "2026-10-23T10:00:01Z", diseases: [{ id: 1 }] },
    { id: 3, orderDate: "2026-10-23T10:00:02Z", diseases: [{ id: 2 }, { id: 1 }] },
  ];
  expect(ordersForAttempt(orders, attempt).map((order) => order.id)).toEqual([3]);
  expect(ordersForAttempt(orders, null)).toEqual([]);
});
test("unavailable prices and unsafe return paths are rejected", () => {
  [null, undefined, "", -1, "invalid"].forEach((price) => expect(isPricedTest({ id: 1, name: "Test", price })).toBe(false));
  expect(isPricedTest({ id: 1, name: "Test", price: 0 })).toBe(true);
  expect(safeReturn("https://example.com")).toBe("/journey/profile");
  expect(safeReturn("//example.com")).toBe("/journey/profile");
  expect(safeReturn("/journey/payment")).toBe("/journey/payment");
});
