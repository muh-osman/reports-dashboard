import { useMutation, useQueryClient } from "@tanstack/react-query";
// API base
import API from "./Api";
// Cookies
import { useCookies } from "react-cookie";
//
import { toast } from "react-toastify";

export const useCreateMarketerApi = () => {
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
    mutationFn: async (data) => {
      const res = await API.post(`api/Marketers`, data, {
        headers: {
          "Content-Type": "application/json-patch+json", // this nessesary for sending data as json patch
        },
      });
      return res.data;
    },

    onSuccess: (responseData) => {
      qc.invalidateQueries(["Marketer", clientId]); // This will refetch
      qc.invalidateQueries(["MarketerSettings", clientId]); // This will refetch
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
