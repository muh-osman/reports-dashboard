import { useQuery } from "@tanstack/react-query";
// API
import API from "./Api";
// Cookies
import { useCookies } from "react-cookie";

export const fetchTerms = async () => {
  const res = await API.get(`api/Terms`);
  return res.data;
};

export default function useGetTermsApi() {
  const [cookies, setCookie] = useCookies([
    "tokenApp",
    "username",
    "userId",
    "phoneNumber",
  ]);

  const token = cookies.tokenApp;

  return useQuery({
    queryKey: ["Terms"],
    queryFn: fetchTerms,
    enabled: !!token, // Only run the query if the token exists
  });
}
