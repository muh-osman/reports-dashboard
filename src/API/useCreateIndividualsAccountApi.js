import { useMutation } from "@tanstack/react-query";
// API base
import API from "./Api";
// Toastify
import { toast } from "react-toastify";
// React router
import { useNavigate } from "react-router-dom";

export const useCreateIndividualsAccountApi = () => {
  //
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data) => {
      const res = await API.post("api/Clients/RegisterIndividualClient", data, {
        headers: {
          "Content-Type": "application/json-patch+json", // this nessesary for sending data as json patch
        },
      });
      return res.data;
    },

    onSuccess: (responseData) => {
      // console.log(responseData.description);

      toast.success(responseData.description);
      navigate(`${process.env.PUBLIC_URL}/login`);
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
