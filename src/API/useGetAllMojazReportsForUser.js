import { useQuery } from "@tanstack/react-query";
// API
import API from "./Api";
// Cookies
import { useCookies } from "react-cookie";
// Toastify
import { toast } from "react-toastify";
// Axios
import axios from "axios";

export const fetchMojazReports = async (userId) => {
  const res = await axios.get(`https://cashif.cc/payment-system/back-end/public/api/mojaz/orders/${userId}`);
  // const res = await axios.get(`http://localhost:8000/api/mojaz/orders/${userId}`);
  return res.data;
};

export default function useGetAllMojazReportsForUser() {
  const [cookies, setCookie] = useCookies(["tokenApp", "username", "userId", "phoneNumber"]);

  const token = cookies.tokenApp;
  const userId = cookies.userId;

  return useQuery({
    queryKey: ["allMojazReportsForUser", userId],
    queryFn: () => fetchMojazReports(userId),
    enabled: !!token, // Only run the query if the token exists
  });
}
