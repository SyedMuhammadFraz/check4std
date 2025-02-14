import React, { useContext } from "react";
import { LocationContext } from "../utils/LocationContext";
import "./Ribbon.css";

function Ribbon() {
  const { selectedLocation } = useContext(LocationContext); // Access selected location

  return (
    <div className={`ribbon ${selectedLocation ? "ribbon-active" : ""}`}>
      <div className="ribbon-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="lightning-icon"
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="white"
        >
          <path d="M13 3v7h5l-6 11v-7H7l6-11z" />
        </svg>
      </div>
      <span className="ribbon-text">
        {selectedLocation
          ? `Lab location selected: ${selectedLocation}`
          : "Get lightning-fast results in only 1-2 days"}
      </span>
    </div>
  );
}

export default Ribbon;
