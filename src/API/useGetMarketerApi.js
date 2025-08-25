import { useQuery } from "@tanstack/react-query";
// API
import API from "./Api";
// Cookies
import { useCookies } from "react-cookie";

export const fetchMarketers = async (clientId) => {
  const res = await API.get(`api/Marketers/GetByClientId/${clientId}`);
  return res.data;
};

export default function useGetMarketerApi() {
  const [cookies, setCookie] = useCookies([
    "tokenApp",
    "username",
    "userId",
    "phoneNumber",
  ]);

  const clientId = cookies.userId;
  const token = cookies.tokenApp;

  return useQuery({
    queryKey: ["Marketer", clientId],
    queryFn: () => fetchMarketers(clientId),
    enabled: !!token, // Only run the query if the token exists
  });
}
