import { useQuery } from "@tanstack/react-query";
// API
import API from "./Api";
// Cookies
import { useCookies } from "react-cookie";

export const fetchLastPayment = async (userId) => {
  const res = await API.get(
    `api/TransferRequests/GetLastPaymentByIdAsync/${userId}`
  );
  return res.data;
};

export default function useGetLastPaymentApi() {
  const [cookies, setCookie] = useCookies([
    "tokenApp",
    "username",
    "userId",
    "phoneNumber",
  ]);

  const userId = cookies.userId;
  const token = cookies.tokenApp;

  return useQuery({
    queryKey: ["LastPayment", userId],
    queryFn: () => fetchLastPayment(userId),
    enabled: !!token, // Only run the query if the token exists
  });
}
