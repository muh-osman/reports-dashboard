import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useQuery } from "@tanstack/react-query";
import { CircularProgress, Box, useTheme, useMediaQuery } from "@mui/material";
// Component
import Soon from "../Pages/Soon/Soon";
//
import { useAddMarketerPhoneNumberToCashifOnlineDbApi } from "../API/useAddMarketerPhoneNumberToCashifOnlineDbApi";

async function fetchAcceptedNumbers(phoneNumber) {
  const response = await fetch(
    `https://cashif.online/back-end/public/api/check-if-phone-numbers-exist-in-db/${phoneNumber}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch accepted numbers");
  }
  const result = await response.json();
  return result;
}

export default function AcceptedNumbers() {
  const { mutate } = useAddMarketerPhoneNumberToCashifOnlineDbApi();
  const [cookies] = useCookies(["tokenApp", "phoneNumber"]);

  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md")); // 'md' breakpoint or larger

  const { data, isLoading, error } = useQuery({
    queryKey: ["acceptedNumbers"],
    queryFn: () => fetchAcceptedNumbers(cookies.phoneNumber),
    enabled: !!cookies.tokenApp, // Only run the query if token is truthy
  });

  // Add phone number to cashif.online DB
  /////////////////////////////////////////
  // useEffect(() => {
  //   if (data?.exists === false) {
  //     mutate({ accepted_phone_number: cookies.phoneNumber });
  //   }
  // }, [data, cookies.phoneNumber]);
  ////////////////////////////////////////

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={isLargeScreen ? "50vh" : "100vh"}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  return data?.exists ? <Outlet /> : <Soon />;
  // return data?.exists ? <Outlet /> : <Outlet />;
}
