import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
// API base
import API from "./Api";
// Toastify
import { toast } from "react-toastify";
// Cookies
import { useCookies } from "react-cookie";

export const useGetAppointmentApi = (queryParams) => {
  const [cookies] = useCookies(["tokenApp", "userId"]);
  const clientId = cookies.userId;

  const fetchAppointments = async () => {
    const res = await API.post("api/Card/pagination", queryParams, {
      headers: {
        "Content-Type": "application/json-patch+json",
      },
    });
    return res.data;
  };

  return useQuery({
    queryKey: ["appointments", clientId],
    queryFn: fetchAppointments,
    enabled: !!cookies.tokenApp, // Only fetch if user is logged in
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    onError: (err) => {
      console.error(err);
      const errorMessage = err?.response?.data?.message || err?.message || "An error occurred";
      toast.error(errorMessage);
    },
  });
};

// export const useGetAppointmentApi = () => {
//   // Cookies
//   const [cookies, setCookie] = useCookies(["tokenApp", "username", "userId", "phoneNumber"]);
//   const clientId = cookies.userId;

//   const qc = useQueryClient();

//   return useMutation({
//     mutationFn: async (data) => {
//       const res = await API.post("api/Card/pagination", data, {
//         headers: {
//           "Content-Type": "application/json-patch+json", // this nessesary for sending data as json patch
//         },
//       });
//       return res.data;
//     },

//     onSuccess: (responseData) => {},

//     onError: (err) => {
//       console.error(err);
//       const errorMessage = err?.response?.data?.message || err?.message || "An error occurred";
//       // Toastify
//       toast.error(errorMessage);
//     },
//   });
// };
