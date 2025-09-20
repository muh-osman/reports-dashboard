import { useMutation, useQueryClient } from "@tanstack/react-query";
// Axios
import axios from "axios";

export const useAddMarketerPhoneNumberToCashifOnlineDbApi = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const res = await axios.post("https://cashif.online/back-end/public/api/post-accepted-phone-number", data);
      return res.data;
    },

    onError: (err) => {
      console.error(err);
    },
  });
};
