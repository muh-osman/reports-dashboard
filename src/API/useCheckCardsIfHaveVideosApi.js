import { useMutation } from "@tanstack/react-query";
// Axios
import axios from "axios";
// Toastify
import { toast } from "react-toastify";

export const useCheckCardsIfHaveVideosApi = () => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(
        "https://cashif.online/back-end/public/api/check-if-cards-have-videos",
        {
          card_ids: data,
        }
      );
      return res.data;
    },

    onSuccess: (responseData) => {
      // console.log(responseData.description);
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
