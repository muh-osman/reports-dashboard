import { useQuery } from "@tanstack/react-query";
// API
import API from "./Api";
// Cookies
import { useCookies } from "react-cookie";

export const fetchServices = async () => {
  const res = await API.get(`api/Service/GetAllByServiceArea/1`);
  return res.data;
};

export default function useGetServices() {
  const [cookies, setCookie] = useCookies([
    "tokenApp",
    "username",
    "userId",
    "phoneNumber",
  ]);

  const token = cookies.tokenApp;

  return useQuery({
    queryKey: ["Services", token],
    queryFn: fetchServices,
    enabled: !!token, // Only run the query if the token exists
  });
}
