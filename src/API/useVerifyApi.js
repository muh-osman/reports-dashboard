import { useMutation } from "@tanstack/react-query";
// API base
import API from "./Api";
// Cookies
import { useCookies } from "react-cookie";
// React router
import { useNavigate } from "react-router-dom";
// Toastify
import { toast } from "react-toastify";
// Decode token
import { jwtDecode } from "jwt-decode";

export const useVerifyApi = () => {
  const navigate = useNavigate();

  // Cookies
  const [cookies, setCookie, removeCookie] = useCookies([
    "tokenApp",
    "username",
    "userId",
    "phoneNumber",
    "auth",
    "clientData",
  ]);

  return useMutation({
    mutationFn: async (data) => {
      const res = await API.post("api/Account/login", data, {
        headers: {
          "Content-Type": "application/json-patch+json", // this nessesary for sending data as json patch
        },
      });
      return res.data;
    },

    onSuccess: (responseData) => {
      if (responseData.status === false) {
        toast.warn(responseData.description);
      } else {
        const token = responseData.token;
        try {
          // Decode the token
          const decodedToken = jwtDecode(token);
          // Extract Name and clientId... from token
          const username = decodedToken.Name;
          const userId = decodedToken.clientId;
          const phoneNumber = decodedToken.PhoneNumber;
          const exp = decodedToken.exp; // Extract expiration date from token
          const expirationDate = new Date(exp * 1000); // Convert seconds to milliseconds

          // Set values in cookies
          setCookie("username", username, {
            path: "/dashboard",
            expires: expirationDate,
          });
          setCookie("userId", userId, {
            path: "/dashboard",
            expires: expirationDate,
          });
          setCookie("phoneNumber", phoneNumber, {
            path: "/dashboard",
            expires: expirationDate,
          });
          setCookie("tokenApp", token, {
            path: "/dashboard",
            expires: expirationDate,
          });
          setCookie("auth", "true", {
            path: "/",
            expires: expirationDate,
          });

          // Navigate to reports
          navigate(`${process.env.PUBLIC_URL}/reports`, { replace: true });
        } catch (error) {
          console.error("Failed to decode token:", error);
        }
      }
    },

    onError: (err) => {
      console.error(err);
      removeCookie("userId", { path: "/dashboard" });
      removeCookie("username", { path: "/dashboard" });
      removeCookie("phoneNumber", { path: "/dashboard" });
      removeCookie("tokenApp", { path: "/dashboard" });
      removeCookie("auth", { path: "/" });
      const errorMessage =
        err?.response?.data?.message || err?.message || "An error occurred";
      // Toastify
      toast.error(errorMessage);
    },
  });
};

// {
//   "status": true,
//   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjIzODgxNDA3LTdlZmQtNDgwMy1hNTVjLWNhZTU2YjNjM2I3NyIsIk5hbWUiOiLYp9io2Ygg2YXYsdmI2KfZhiIsImNsaWVudElkIjoiMTUxIiwiUGhvbmVOdW1iZXIiOiIwNTA2NDQ1OTIxIiwianRpIjoiYzVkYTA0N2MtMTE0OS00YTQ5LThjMTUtMzI0YTgwOGQ0ZjNhIiwiZXhwIjoxNzMwNDk1MjE3LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjUwMTciLCJhdWQiOiJjYXNoaWZhcGkifQ.NW7XtKdLLrC3Flf1EkvFofIaERBMWCC1bTy9LBpxSAs",
//   "expiration": "2024-11-01T21:06:57Z"
// }
