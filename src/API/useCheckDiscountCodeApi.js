import { useQuery } from "@tanstack/react-query";
// Axios
import axios from "axios";

export const fetchCheckIfDiscountCodeIsValid = async (discountCode) => {
  const res = await axios.get(`https://cashif-001-site1.dtempurl.com/api/Marketers/CheckCode?code=${discountCode}`);
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
