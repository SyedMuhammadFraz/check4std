import React from "react";
import { useLoader } from "../utils/LoaderContext";
import "./Loader.css";

function Loader() {
  const { loading } = useLoader(); // Get loading state

  if (!loading) return null; // Hide loader if not loading

  return (
    <section className="Loader">
      <div className="dot-spinner">
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
      </div>
    </section>
  );
}

export default Loader;
