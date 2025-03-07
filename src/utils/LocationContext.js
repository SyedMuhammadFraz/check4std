import React, { createContext, useState } from "react";

// Create a Context
export const LocationContext = createContext();

// Create a Provider Component
export const LocationProvider = ({ children }) => {
  const [selectedLocation, setSelectedLocation] = useState(""); // Store selected location
  
  // Reset location on logout
  const resetLocation = () => {
    console.log("resetLocation called");
    setSelectedLocation(null);
  };

  return (
    <LocationContext.Provider value={{ selectedLocation, setSelectedLocation, resetLocation }}>
      {children}
    </LocationContext.Provider>
  );
};
