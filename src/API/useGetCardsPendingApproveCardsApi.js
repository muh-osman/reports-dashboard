import { useMutation } from "@tanstack/react-query";
// API base
import API from "./Api";
// Cookies
import { useCookies } from "react-cookie";
//
import { toast } from "react-toastify";

export const useGetCardsPendingApproveCardsApi = () => {
  // Cookies
  const [cookies, setCookie] = useCookies([
    "tokenApp",
    "username",
    "userId",
    "phoneNumber",
  ]);
  const clientId = cookies.userId;

  return useMutation({
    mutationFn: async (data) => {
      const res = await API.post(`api/Card/GetCardsPendingApprove?id=${clientId}`);
      return res.data;
    },

    onSuccess: (responseData) => {},

    onError: (err) => {
      console.error(err);
      const errorMessage =
        err?.response?.data?.message || err?.message || "An error occurred";
      // Toastify
      toast.error(errorMessage);
    },
  });
};
