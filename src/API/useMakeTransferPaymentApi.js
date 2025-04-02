import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// API base
import API from "./Api";
// Cookies
import { useCookies } from "react-cookie";
//
import { toast } from "react-toastify";

export const useMakeTransferPaymentApi = () => {
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
      const res = await API.post(`api/TransferRequests`, data, {
        headers: {
          "Content-Type": "application/json-patch+json", // this nessesary for sending data as json patch
        },
      });
      return res.data;
    },

    onSuccess: (responseData) => {
      toast.success("تم ارسال الطلب");

      //   qc.invalidateQueries(["PaymentHistory", clientId]); // This will refetch the appointments
      //   navigate(`${process.env.PUBLIC_URL}/falak/marketer`, { replace: true });
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
