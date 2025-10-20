import { useQuery } from "@tanstack/react-query";
// API
import API from "./Api";
// Cookies
import { useCookies } from "react-cookie";

export const fetchAllMarketersMonthlyBalance = async () => {
  const res = await API.get(`api/Marketers/GetAllMarketersMonthlyBalance`);
  return res.data;
};

export default function useGetAllMarketersMonthlyBalanceApi() {
  const [cookies, setCookie] = useCookies(["tokenApp"]);
  const token = cookies.tokenApp;

  return useQuery({
    queryKey: ["allMarketersMonthlyBalance", token],
    queryFn: fetchAllMarketersMonthlyBalance,
    enabled: !!token, // Only run the query if the token exists
  });
}
