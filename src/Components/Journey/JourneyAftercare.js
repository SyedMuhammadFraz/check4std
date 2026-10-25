import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../utils/AuthContext";
import { webApiInstance } from "../../AxiosInstance";
import { CHECKOUT_ATTEMPT_KEY, errorMessage, isPaidOrder, journeyPath, money, ordersForAttempt } from "./journeyModel";
import { POST_LOGIN_REDIRECT_KEY, readStored, writeStored } from "../../utils/checkoutStorage";
import { ErrorNotice, Field, Heading, JourneyLink, Modal } from "./JourneyUI";

export function OrderConfirmation({ step }) {
  const { authToken } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);
  const [selectedId, setSelectedId] = useState("");
  const [dismissed, setDismissed] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!authToken) return;
    const controller = new AbortController();
    setBusy(true); setError("");
    webApiInstance.get("/Order/my-orders", { signal: controller.signal, headers: { Authorization: `Bearer ${authToken}` } })
      .then((response) => {
        if (!Array.isArray(response.data.result)) throw new Error();
        setOrders([...response.data.result].sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate)));
      }).catch(() => { if (!controller.signal.aborted) setError("We couldn't verify your order status. Please refresh to try again."); })
      .finally(() => { if (!controller.signal.aborted) setBusy(false); });
    return () => controller.abort();
  }, [authToken, retry]);
  const attempt = readStored(CHECKOUT_ATTEMPT_KEY, null);
  const matching = ordersForAttempt(orders, attempt);
  const order = selectedId ? orders.find((entry) => String(entry.id) === selectedId) : matching[0];
  const paid = isPaidOrder(order);
  // The modal announces this checkout specifically, so it keys off the order
  // matched to the checkout attempt -- not whichever order is selected below.
  const placed = matching[0];
  const confirmed = isPaidOrder(placed) && !dismissed;
  return <>
    {paid && <div className="j-success" aria-hidden="true">✓</div>}
    <Heading intro={paid ? "Your payment has been confirmed by the order service." : "Review your order status. Confirmation appears after the payment service updates your order."}>{paid ? <>Thank you for choosing<br />Satellite Health.</> : step === "payment-success" ? "Checking your payment." : "Your order confirmation."}</Heading>
    {!authToken ? <div className="j-panel"><h3>Log in to verify your order</h3><p>Use the account associated with your payment to view the order status.</p><button className="j-button" onClick={() => { writeStored(POST_LOGIN_REDIRECT_KEY, journeyPath("confirmation")); navigate(journeyPath("login")); }}>Log in to view order</button></div> : <>
      {busy && <p role="status">Loading your orders…</p>}<ErrorNotice error={error} />
      {!busy && !error && <div className="j-panel">
        {!matching.length && !selectedId && <p className="j-hint">{attempt ? "The order for this checkout has not appeared yet. Refresh in a moment, or select an order to inspect its status." : "Select an order below to view its confirmed status."}</p>}
        {orders.length > 0 ? <><label htmlFor="journey-order">Your order</label><select id="journey-order" value={order?.id || ""} onChange={(event) => setSelectedId(event.target.value)}><option value="">Select an order</option>{orders.map((entry) => <option value={entry.id} key={entry.id}>#{entry.id} · {entry.orderStatus} · {money(entry.amount)}</option>)}</select></> : <p>No orders are available yet.</p>}
        {order && <><div className="j-row"><span>Order reference</span><strong>#{order.id}</strong></div><div className="j-row"><span>Tests</span><strong>{(order.diseases || []).map((test) => test.name).join(", ")}</strong></div><div className="j-row"><span>Order status</span><strong>{order.orderStatus}</strong></div><div className="j-row"><span>Total</span><strong>{money(order.amount)}</strong></div></>}
      </div>}
      <p><button className="j-button j-button--secondary" disabled={busy} onClick={() => setRetry(retry + 1)}>Refresh order status</button></p>
    </>}
    {paid && <div className="j-panel"><h3>Your next steps</h3><div className="j-row"><span>1. Order confirmation & receipt</span><strong>Check your email</strong></div><div className="j-row"><span>2. Your test requisition</span><strong>Follow lab instructions</strong></div><div className="j-row"><span>3. Results when received</span><strong>Review your report</strong></div></div>}
    <div className="j-actions"><JourneyLink step="payment" secondary>Back to order review</JourneyLink><JourneyLink step="profile">Go to my account</JourneyLink></div>
    {confirmed && <Modal titleId="journey-order-confirmed" onClose={() => setDismissed(true)}>
      <div className="j-success" aria-hidden="true">✓</div>
      <span className="j-tag">ORDER CONFIRMED</span>
      <h2 className="j-panel-title" id="journey-order-confirmed">Thank you for choosing Satellite Health.</h2>
      <p className="j-hint">Your payment has been confirmed by the order service.</p>
      <div className="j-row"><span>Order reference</span><strong>#{placed.id}</strong></div>
      <div className="j-row"><span>Tests</span><strong>{(placed.diseases || []).map((test) => test.name).join(", ")}</strong></div>
      <div className="j-row"><span>Total</span><strong>{money(placed.amount)}</strong></div>
      <p className="j-hint">Your confirmation and receipt are on their way by email. Collection instructions come from the lab service with your order.</p>
      <div className="j-actions"><JourneyLink step="profile">Go to my account</JourneyLink><button className="j-button j-button--secondary" onClick={() => setDismissed(true)}>Close</button></div>
    </Modal>}
  </>;
}

export function ConsultationStep() {
  const { authToken } = useContext(AuthContext);
  const [availability, setAvailability] = useState([]);
  const [date, setDate] = useState("");
  const [slotKey, setSlotKey] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const [error, setError] = useState("");
  const [booked, setBooked] = useState(null);
  const [retry, setRetry] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true); setError("");
    webApiInstance.get("/Doctor/get-all-availbility", { signal: controller.signal })
      .then((response) => {
        if (!Array.isArray(response.data.result)) throw new Error();
        setAvailability(response.data.result);
      }).catch(() => { if (!controller.signal.aborted) setError("We couldn't load clinician availability. Please try again."); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [retry]);
  const slots = availability.filter((entry) => entry.date?.slice(0, 10) === date).flatMap((entry) => (entry.timeSlots || []).filter((slot) => slot.statusName === "Available" && !slot.isBooked).map((slot) => ({ ...slot, doctorId: entry.doctorId, doctorName: entry.doctorName, key: `${entry.doctorId}-${slot.id}` })));
  const localToday = new Date();
  const today = `${localToday.getFullYear()}-${String(localToday.getMonth() + 1).padStart(2, "0")}-${String(localToday.getDate()).padStart(2, "0")}`;
  const submit = async (event) => {
    event.preventDefault(); if (booking) return;
    if (!authToken) { writeStored(POST_LOGIN_REDIRECT_KEY, journeyPath("consultation")); navigate(journeyPath("login")); return; }
    const slot = slots.find((entry) => entry.key === slotKey);
    if (!slot || date < today) { setError("Choose an available future appointment."); return; }
    setBooking(true); setError("");
    try {
      const response = await webApiInstance.post("/Doctor/add-appointment", { doctorId: slot.doctorId, timeSlotId: slot.id }, { headers: { Authorization: `Bearer ${authToken}` } });
      if (response.data.statusCode !== 200) throw new Error();
      setBooked({ date, ...slot }); setSlotKey("");
    } catch (err) { setError(errorMessage(err, "The appointment could not be booked. Refresh availability and try again.")); }
    finally { setBooking(false); }
  };
  return <>
    <Heading intro="Book a consultation to discuss your results, testing, or treatment options.">Talk with a clinician.</Heading>
    <div className="j-summary"><span>Doctor consultation<br /><small>Live appointment availability</small></span></div>
    {booked ? <div className="j-panel" role="status"><span className="j-pill">Appointment confirmed</span><h3>{booked.doctorName || "Your clinician"}</h3><p>{booked.date} · {booked.startTime} – {booked.endTime}</p><JourneyLink step="profile">Go to my account</JourneyLink></div> : <form className="j-panel" onSubmit={submit}>
      <h3>Choose your preferred time</h3>
      <div className="j-grid"><div className="j-full"><label htmlFor="journey-visit-reason">Reason for visit</label><select id="journey-visit-reason" value={reason} onChange={(event) => setReason(event.target.value)} required><option value="">Select</option><option>Discuss testing</option><option>Review a positive result</option><option>Discuss symptoms</option></select></div>
        <Field label="Preferred date" name="visit-date" type="date" min={today} value={date} onChange={(event) => { setDate(event.target.value); setSlotKey(""); }} />
        <div><label htmlFor="journey-visit-time">Preferred time</label><select id="journey-visit-time" name="visit-time" required value={slotKey} onChange={(event) => setSlotKey(event.target.value)}><option value="">Select a time</option>{slots.map((slot) => <option key={slot.key} value={slot.key}>{slot.startTime} – {slot.endTime} · {slot.doctorName || "Clinician"}</option>)}</select></div>
      </div>
      {loading && <p role="status">Loading availability…</p>}{!loading && date && !slots.length && <p role="status">No appointments available for this date. Choose another date.</p>}
      <p className="j-hint">The reason above is for your reference; discuss it with your clinician during the visit.</p>
      <ErrorNotice error={error} /><p><button type="button" className="j-button j-button--text" disabled={loading || booking} onClick={() => { setSlotKey(""); setRetry(retry + 1); }}>Refresh availability</button></p>
      <div className="j-actions"><JourneyLink step="assessment" secondary>Back</JourneyLink><button className="j-button" disabled={loading || booking || !slotKey}>{booking ? "Booking…" : "Book appointment"}</button></div>
    </form>}
  </>;
}
