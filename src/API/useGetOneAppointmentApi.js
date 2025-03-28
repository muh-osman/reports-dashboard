import { useQuery } from "@tanstack/react-query";
// API
import API from "./Api";
// Cookies
import { useCookies } from "react-cookie";

export const fetchOneAppointment = async (id) => {
  const res = await API.get(`api/Appointment/${id}`);
  return res.data;
};

export default function useGetOneAppointmentApi(id) {
  const [cookies, setCookie] = useCookies([
    "tokenApp",
    "username",
    "userId",
    "phoneNumber",
  ]);

  const token = cookies.tokenApp;

  return useQuery({
    queryKey: ["OneAppointment", id],
    queryFn: () => fetchOneAppointment(id),
    enabled: !!token, // Only run the query if the token exists
  });
}
