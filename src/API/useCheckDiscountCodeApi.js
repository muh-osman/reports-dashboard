import { useQuery } from "@tanstack/react-query";
// API
import API from "./Api";

export const fetchCheckIfDiscountCodeIsValid = async (discountCode) => {
  const res = await API.get(`api/Marketers/CheckCode?code=${discountCode}`);
  return res.data;
};

export default function useCheckDiscountCodeApi(discountCode, isApplyingDiscount) {
  return useQuery({
    queryKey: ["CheckIfCheckDiscountCodeIsValid", discountCode],
    queryFn: () => fetchCheckIfDiscountCodeIsValid(discountCode),
    enabled: !!discountCode && isApplyingDiscount,
    staleTime: 0, // Data is stale immediately
    refetchOnMount: true, // Always refetch when component mounts
  });
}
