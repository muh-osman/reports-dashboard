import { useQuery } from "@tanstack/react-query";
// API
import API from "./Api";

export const fetchCheckIfPaymentRequestIsValid = async (marketerId) => {
  const res = await API.get(
    `api/TransferRequests/CheckWattingRequest?marketerId=${marketerId}`
  );
  return res.data;
};

export default function useCheckIfPaymentRequestIsValidApi(marketerId) {
  return useQuery({
    queryKey: ["CheckIfPaymentRequestIsValid", marketerId],
    queryFn: () => fetchCheckIfPaymentRequestIsValid(marketerId),
    enabled: !!marketerId, // Only run the query if token is truthy
    staleTime: 0, // Data is stale immediately
    refetchOnMount: true, // Always refetch when component mounts
  });
}
