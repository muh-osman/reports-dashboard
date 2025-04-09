import { useQuery } from "@tanstack/react-query";
// API
import API from "./Api";

export const fetchPaymentHistory = async (userId) => {
  const res = await API.get(
    `api/TransferRequests/GetByMarketerId?clientId=${userId}`
  );
  return res.data;
};

export default function useGetPaymentHistoryApi(userId) {
  return useQuery({
    queryKey: ["PaymentHistory", userId],
    queryFn: () => fetchPaymentHistory(userId),
    enabled: !!userId, // Only run the query if token is truthy
  });
}
