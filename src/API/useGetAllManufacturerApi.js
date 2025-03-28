import { useQuery } from "@tanstack/react-query";
// API
import API from "./Api";
// Cookies
import { useCookies } from "react-cookie";

export const fetchManufacturers = async () => {
  const res = await API.get(`api/CarManufacturer`);
  return res.data;
};

export default function useGetAllManufacturerApi() {
  const [cookies, setCookie] = useCookies([
    "tokenApp",
    "username",
    "userId",
    "phoneNumber",
  ]);

  const token = cookies.tokenApp;

  return useQuery({
    queryKey: ["Manufacturers", token],
    queryFn: fetchManufacturers,
    enabled: !!token, // Only run the query if the token exists
  });
}
