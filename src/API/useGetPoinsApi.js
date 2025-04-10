import { useQuery } from "@tanstack/react-query";
// API
import API from "./Api";
// Cookies
import { useCookies } from "react-cookie";

export const fetchPoints = async (phoneNumber) => {
  const res = await API.get(
    `api/ClientPoint/GetClientPoints?clienttPhoneNumber=${phoneNumber}`
  );
  return res.data;
};

export default function useGetPoinsApi() {

  const [cookies, setCookie] = useCookies([
    "tokenApp",
    "username",
    "userId",
    "phoneNumber",
  ]);

  const phoneNumber = cookies.phoneNumber;
  const token = cookies.tokenApp;

  return useQuery({
    queryKey: ["points", phoneNumber],
    queryFn: () => fetchPoints(phoneNumber),
    enabled: !!token, // Only run the query if the token exists
  });
}
