import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// API base
import API from "./Api";
// Toastify
import { toast } from "react-toastify";
// Cookies
import { useCookies } from "react-cookie";

export const useEditAppointmentApi = (id) => {
  // Cookies
  const [cookies, setCookie] = useCookies([
    "tokenApp",
    "username",
    "userId",
    "phoneNumber",
  ]);
  const clientId = cookies.userId;
  //
  const navigate = useNavigate();

  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const res = await API.put(`api/Appointment/${id}`, data, {
        headers: {
          "Content-Type": "application/json-patch+json", // this nessesary for sending data as json patch
        },
      });
      return res.data;
    },

    onSuccess: (responseData) => {
      toast.success("تم التعديل");
      qc.invalidateQueries(["Appointment", clientId]); // This will refetch the appointments

      navigate(`${process.env.PUBLIC_URL}/booking`, { replace: true });
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
