import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// API base
import API from "./Api";
// Cookies
import { useCookies } from "react-cookie";
//
import { toast } from "react-toastify";
// Axios
import axios from "axios";

export const useMakeTransferPaymentApi = () => {
  // Cookies
  const [cookies, setCookie] = useCookies(["tokenApp", "username", "userId", "phoneNumber"]);
  const clientId = cookies.userId;
  //
  const navigate = useNavigate();

  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      console.log(data);

      const res = await API.post(`api/TransferRequests`, data, {
        headers: {
          "Content-Type": "application/json-patch+json", // this nessesary for sending data as json patch
        },
      });
      return res.data;
    },

    onSuccess: async (responseData, variables) => {
      toast.success("تم ارسال الطلب");

      // console.log(variables.accountNumber);
      // console.log(variables.marketerId);
      // console.log(variables.point);
      // console.log(variables.tranferPaymentTypeId);

      await axios.post("https://cashif.online/back-end/public/api/send-withdraw-notification", {
        accountNumber: variables.accountNumber,
        marketerId: variables.marketerId,
        point: variables.point,
        tranferPaymentTypeId: variables.tranferPaymentTypeId,

        marketerName: variables.marketerName,
        marketerCode: variables.marketerCode,
      });

      qc.invalidateQueries(["PaymentHistory", clientId]); // This will refetch
      navigate(`${process.env.PUBLIC_URL}/falak/marketer`, { replace: true });
    },

    onError: (err) => {
      console.error(err);
      const errorMessage = err?.response?.data?.message || err?.message || "An error occurred";
      // Toastify
      toast.error(errorMessage);
    },
  });
};
