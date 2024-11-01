import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// MUI theme
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ScopedCssBaseline from "@mui/material/ScopedCssBaseline";
// Phone number context
import { PhoneNumberProvider } from "./Contexts/PhoneNumberContext";
// Loged out context
import { LogedOutProvider } from "./Contexts/LogedOutContext";
// Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// React cookie
import { CookiesProvider } from "react-cookie";
// React query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
const qc = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 10, // 10 minutes
      refetchOnWindowFocus: false, // Prevent refetching on window focus
      refetchOnReconnect: false, // Prevent refetching on reconnect
    },
  },
});

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#174545",
    },
    // ... other colors
  },
  // ... other theme options
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <ThemeProvider theme={defaultTheme}>
    <CookiesProvider>
      <QueryClientProvider client={qc}>
        <ToastContainer />
        <ScopedCssBaseline>
          <LogedOutProvider>
            <PhoneNumberProvider>
              <App />
            </PhoneNumberProvider>
          </LogedOutProvider>
        </ScopedCssBaseline>
      </QueryClientProvider>
    </CookiesProvider>
  </ThemeProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
