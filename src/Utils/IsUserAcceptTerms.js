import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useQuery } from "@tanstack/react-query";
import { CircularProgress, Box, useTheme, useMediaQuery } from "@mui/material";
// Component
import AcceptTerms from "../Pages/AcceptTerms/AcceptTerms";
//

async function fetchIfUserAcceptTerms(phoneNumber) {
  // Same api of "AcceptedNumbers.js"
  const response = await fetch(`https://cashif.online/back-end/public/api/check-if-phone-numbers-exist-in-db/${phoneNumber}`);
  if (!response.ok) {
    throw new Error("Failed to fetch accepted user terms status");
  }
  const result = await response.json();
  return result;
}

export default function IsUserAcceptTerms() {
  const [cookies] = useCookies(["tokenApp", "phoneNumber"]);

  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md")); // 'md' breakpoint or larger

  const { data, isLoading, error } = useQuery({
    // Same key of "AcceptedNumbers.js"
    queryKey: ["acceptedNumbers"],
    queryFn: () => fetchIfUserAcceptTerms(cookies.phoneNumber),
    enabled: !!cookies.tokenApp, // Only run the query if token is truthy
  });

  //   console.log(data);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={isLargeScreen ? "50vh" : "100vh"}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  return data?.is_accept_terms ? <Outlet /> : <AcceptTerms />;
  // return data?.exists ? <Outlet /> : <Outlet />;
}
