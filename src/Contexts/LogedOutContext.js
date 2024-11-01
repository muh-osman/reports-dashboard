import React, { createContext, useContext, useState } from "react";

// Create a context
const LogedOutContext = createContext();

// Create a provider component
export const LogedOutProvider = ({ children }) => {
  const [logedOut, setLogedOut] = useState(false);

  return (
    <LogedOutContext.Provider value={{ logedOut, setLogedOut }}>
      {children}
    </LogedOutContext.Provider>
  );
};

// Custom hook to use the LogedOutContext
export const useLogedOut = () => {
  return useContext(LogedOutContext);
};
