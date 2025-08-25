import { useQuery } from "@tanstack/react-query";
// API
import API from "./Api";
// Cookies
import { useCookies } from "react-cookie";

export const fetchPaymentTypes = async () => {
  const res = await API.get(`api/TranferPaymentTypes`);
  return res.data;
};

export default function useGetPaymentTypesApi() {
  const [cookies, setCookie] = useCookies([
    "tokenApp",
    "username",
    "userId",
    "phoneNumber",
  ]);

  const token = cookies.tokenApp;

  return useQuery({
    queryKey: ["PaymentTypes", token],
    queryFn: fetchPaymentTypes,
    enabled: !!token, // Only run the query if token is truthy
  });
}
