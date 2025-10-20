import React, { createContext, useState, useContext } from "react";

const BookingContext = createContext();

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
};

export const BookingProvider = ({ children }) => {
  const [pendingBooking, setPendingBooking] = useState(null);

  const savePendingBooking = (bookingData) => {
    setPendingBooking(bookingData);
  };

  const clearPendingBooking = () => {
    setPendingBooking(null);
  };

  return (
    <BookingContext.Provider
      value={{
        pendingBooking,
        savePendingBooking,
        clearPendingBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
