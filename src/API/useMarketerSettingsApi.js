import { useQuery } from "@tanstack/react-query";
// API
import API from "./Api";
// Cookies
import { useCookies } from "react-cookie";

export const fetchMarketerSettings = async () => {
  const res = await API.get(`api/MarketerSettings`);
  return res.data;
};

export default function useMarketerSettingsApi() {
  const [cookies, setCookie] = useCookies([
    "tokenApp",
    "username",
    "userId",
    "phoneNumber",
  ]);

  const token = cookies.tokenApp;
  const userId = cookies.userId;

  return useQuery({
    queryKey: ["MarketerSettings", userId],
    queryFn: fetchMarketerSettings,
    enabled: !!token, // Only run the query if token is truthy
  });
}
