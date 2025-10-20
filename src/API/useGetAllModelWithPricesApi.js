import { useQuery } from "@tanstack/react-query";
// API
import API from "./Api";

export const fetchAllModelWithPrices = async () => {
  const res = await API.get(`api/ServicePrices`);
  return res.data;
};

export default function useGetAllModelWithPricesApi() {
  return useQuery({
    queryKey: ["ModelWithPrices"],
    queryFn: fetchAllModelWithPrices,
  });
}
