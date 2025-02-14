import React, { createContext, useState } from "react";

// Create a Context
export const LocationContext = createContext();

// Create a Provider Component
export const LocationProvider = ({ children }) => {
  const [selectedLocation, setSelectedLocation] = useState(""); // Store selected location

  return (
    <LocationContext.Provider value={{ selectedLocation, setSelectedLocation }}>
      {children}
    </LocationContext.Provider>
  );
};
