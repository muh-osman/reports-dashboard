import { useQuery } from "@tanstack/react-query";
// API
import API from "./Api";
// Cookies
import { useCookies } from "react-cookie";

export const AllCarModels = async () => {
  const res = await API.get(`api/CarMark`);
  return res.data;
};

export default function useGetAllCarModelsApi() {
  const [cookies, setCookie] = useCookies([
    "tokenApp",
    "username",
    "userId",
    "phoneNumber",
  ]);

  const token = cookies.tokenApp;

  return useQuery({
    queryKey: ["AllCarModels", token],
    queryFn: AllCarModels,
    enabled: !!token, // Only run the query if the token exists
  });
}
