import { useQuery } from "@tanstack/react-query";
// API
import API from "./Api";
// Cookies
import { useCookies } from "react-cookie";

export const fetchFullDataOfClient = async (userId) => {
  const res = await API.get(`api/Clients/GetById/${userId}`);
  return res.data;
};

export default function useGetFullDataOfClientApi() {
  const [cookies, setCookie] = useCookies([
    "tokenApp",
    "username",
    "userId",
    "phoneNumber",
  ]);

  const userId = cookies.userId;
  const token = cookies.tokenApp;

  return useQuery({
    queryKey: ["fullDataOfClient", userId],
    queryFn: () => fetchFullDataOfClient(userId),
    enabled: !!token, // Only run the query if the token exists
  });
}
