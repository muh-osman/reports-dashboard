import { useQuery } from "@tanstack/react-query";
// API
import API from "./Api";

export const fetchCheckIfPaymentRequestIsValid = async (userId) => {
  const res = await API.get(
    `api/TransferRequests/CheckWattingRequest?marketerId=${userId}`
  );
  return res.data;
};

export default function useCheckIfPaymentRequestIsValidApi(userId) {
  return useQuery({
    queryKey: ["CheckIfPaymentRequestIsValid", userId],
    queryFn: () => fetchCheckIfPaymentRequestIsValid(userId),
    enabled: !!userId, // Only run the query if token is truthy
  });
}
