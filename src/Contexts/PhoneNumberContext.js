import React, { createContext, useContext, useState } from "react";

// Create a context
const PhoneNumberContext = createContext();

// Create a provider component
export const PhoneNumberProvider = ({ children }) => {
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <PhoneNumberContext.Provider value={{ phoneNumber, setPhoneNumber }}>
      {children}
    </PhoneNumberContext.Provider>
  );
};

// Custom hook to use the PhoneNumberContext
export const usePhoneNumber = () => {
  return useContext(PhoneNumberContext);
};
