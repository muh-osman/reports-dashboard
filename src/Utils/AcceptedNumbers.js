import { Outlet, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useQuery } from "@tanstack/react-query";
import { CircularProgress, Box, useTheme, useMediaQuery } from "@mui/material";
// Component
import Soon from "../Pages/Soon/Soon";

async function fetchAcceptedNumbers() {
  const response = await fetch(
    "https://cashif.online/back-end/public/api/get-all-accepted-phone-numbers"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch accepted numbers");
  }

  const result = await response.json();

  // Extract just the phone numbers from the data array
  return result.data.map((item) => item.accepted_phone_number);
}

export default function AcceptedNumbers() {
  const [cookies] = useCookies(["tokenApp", "phoneNumber"]);

  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md")); // 'md' breakpoint or larger

  const {
    data: acceptedNumbersArray,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["acceptedNumbers"],
    queryFn: fetchAcceptedNumbers,
    enabled: !!cookies.tokenApp, // Only run the query if token is truthy
  });

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight={isLargeScreen ? "50vh" : "100vh"}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  return acceptedNumbersArray?.includes(cookies.phoneNumber) &&
    cookies.tokenApp ? (
    <Outlet />
  ) : (
    <Soon />
  );
}
