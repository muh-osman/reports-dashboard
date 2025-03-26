import { useQuery } from "@tanstack/react-query";
// API
import API from "./Api";
// Cookies
import { useCookies } from "react-cookie";

export const fetchAppointment = async (clientId) => {
  const res = await API.get(`api/Appointment/Filter/${clientId}`);
  return res.data;
};

export default function useGetAppointmentApi() {
  const [cookies, setCookie, removeCookie] = useCookies([
    "tokenApp",
    "username",
    "userId",
    "phoneNumber",
  ]);

  const token = cookies.tokenApp;
  const clientId = cookies.userId;

  return useQuery({
    queryKey: ["Appointment", clientId],
    queryFn: () => fetchAppointment(clientId),
    enabled: !!token, // Only run the query if the token exists
  });
}
