import { useMutation } from "@tanstack/react-query";
//
import { useNavigate } from "react-router-dom";
// API base
import API from "./Api";
// Toastify
import { toast } from "react-toastify";
//  phone number context
import { usePhoneNumber } from "../Contexts/PhoneNumberContext";

export const useAskCodeApi = () => {
  //
  const navigate = useNavigate();
  const { setPhoneNumber } = usePhoneNumber();

  return useMutation({
    mutationFn: async (data) => {
      // console.log(data.get("phoneNumber"));
      const res = await API.post("api/XXX", data);
      return res.data;
    },

    onSuccess: (responseData, variables) => {
      const phoneNumber = variables.get("phoneNumber");
      setPhoneNumber(phoneNumber); // Store phoneNumber in context
      navigate("/verify");
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
