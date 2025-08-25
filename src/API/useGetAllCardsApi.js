import { useQuery } from "@tanstack/react-query";
import API from "./Api";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";

export const useGetAllCardsApi = () => {
  const [cookies] = useCookies([
    "tokenApp",
    "username",
    "userId",
    "phoneNumber",
  ]);

  return useQuery({
    queryKey: ["cards", cookies.userId], // Unique key for the query
    queryFn: async () => {
      const res = await API.post(
        `api/Card/GetCardbyClientId?id=${cookies.userId}`
      );
      return res.data;
    },

    enabled: !!cookies.tokenApp, // Only run the query if tokenApp exists
    onSuccess: (responseData) => {
      // Handle success
    },
    onError: (err) => {
      console.error(err);
      const errorMessage =
        err?.response?.data?.message || err?.message || "An error occurred";
      toast.error(errorMessage);
    },
  });
};
