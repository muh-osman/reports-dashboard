import { useQuery } from "@tanstack/react-query";
// API
import API from "./Api";

export const fetchOneCardData = async (id) => {
  const res = await API.get(`api/Card/${id}`);
  return res.data;
};

export default function useGetOneCardDataApi(id) {
  return useQuery({
    queryKey: ["OneCardData", id],
    queryFn: () => fetchOneCardData(id),
    enabled: !!id, // Only run the query if id is truthy
  });
}
