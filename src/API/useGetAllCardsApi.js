import { useMutation } from "@tanstack/react-query";
// API base
import API from "./Api";
// Cookies
import { useCookies } from "react-cookie";
// Toastify
import { toast } from "react-toastify";

export const useGetAllCardsApi = () => {
  // Cookies
  const [cookies, setCookie, removeCookie] = useCookies([
    "tokenApp",
    "username",
    "userId",
    "phoneNumber",
  ]);

  return useMutation({
    mutationFn: async () => {
      const res = await API.post(
        `api/Card/GetCardbyClientId?id=${cookies.userId}`
      );
      return res.data;
    },

    onSuccess: (responseData) => {
    //   console.log(responseData);
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
