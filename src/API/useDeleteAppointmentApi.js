import { useMutation, useQueryClient } from "@tanstack/react-query";
// API base
import API from "./Api";
// Cookies
import { useCookies } from "react-cookie";
// Toastify
import { toast } from "react-toastify";


export const useDeleteAppointmentApi = () => {
  // Cookies
  const [cookies, setCookie] = useCookies([
    "tokenApp",
    "username",
    "userId",
    "phoneNumber",
  ]);
  const clientId = cookies.userId;

  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (appointmentId) => {
      const res = await API.delete(`api/Appointment/${appointmentId}`);
      return res.data;
    },

    onSuccess: () => {
      toast.success("تم الحذف");
      qc.invalidateQueries(["Appointment", clientId]); // This will refetch the appointments

      //   qc.prefetchQuery({
      //     queryKey: ["Appointment", clientId],
      //     queryFn: () => fetchAppointment(clientId),
      //   });

    },

    onError: (err) => {
      console.error(err);
      const errorMessage =
        err?.response?.data?.message || err?.message || "An error occurred";
      // Toastify
      toast.error(errorMessage);
    },
  });
};
