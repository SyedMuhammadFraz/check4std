import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { journeyPath, money } from "./journeyModel";

export function JourneyLink({ step, children, secondary = false, ...props }) {
  return <Link className={`j-button${secondary ? " j-button--secondary" : ""}`} to={journeyPath(step)} {...props}>{children}</Link>;
}
export function Heading({ children, intro }) {
  return <><h1 className="j-title" tabIndex={-1}>{children}</h1>{intro && <p className="j-intro">{intro}</p>}</>;
}
export function Field({ label, name, type = "text", value, onChange, error, full = false, ...props }) {
  return <div className={full ? "j-full" : undefined}>
    <label htmlFor={`journey-${name}`}>{label}</label>
    <input id={`journey-${name}`} name={name} type={type} value={value ?? ""} onChange={onChange} required aria-invalid={Boolean(error)} aria-describedby={error ? `error-${name}` : undefined} {...props} />
    {error && <p className="j-error" id={`error-${name}`}>{error}</p>}
  </div>;
}
export function Summary({ tests, center }) {
  return <div className="j-summary"><span>{tests.length ? tests.map((test) => test.name).join(", ") : "No test selected"}<br /><small>{center || "Choose a collection location"}</small></span><strong>{money(tests.reduce((total, test) => total + Number(test.price), 0))}</strong></div>;
}
export function ErrorNotice({ error }) {
  return error ? <p className="j-error" role="alert">{error}</p> : null;
}

// A dialog in the journey theme. Closes on Escape or a click outside, and
// returns focus to whatever opened it.
export function Modal({ titleId, onClose, children }) {
  const dialog = useRef(null);
  useEffect(() => {
    const opener = document.activeElement;
    dialog.current?.focus({ preventScroll: true });
    const onKey = (event) => { if (event.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("keydown", onKey); opener?.focus?.(); };
  }, [onClose]);
  return <div className="cj-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="cj-modal j-panel" role="dialog" aria-modal="true" aria-labelledby={titleId} ref={dialog} tabIndex={-1}>{children}</div>
  </div>;
}
