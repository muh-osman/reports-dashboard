import { useQuery } from "@tanstack/react-query";
// API
import API from "./Api";
// Cookies
import { useCookies } from "react-cookie";

export const fetchBranches = async () => {
  const res = await API.get(`api/Branch`);
  return res.data;
};

export default function useGetAllBranchesApi() {
  const [cookies, setCookie, removeCookie] = useCookies([
    "tokenApp",
    "username",
    "userId",
    "phoneNumber",
  ]);

  const token = cookies.tokenApp;

  return useQuery({
    queryKey: ["Branches", token],
    queryFn: fetchBranches,
    enabled: !!token, // Only run the query if the token exists
  });
}
