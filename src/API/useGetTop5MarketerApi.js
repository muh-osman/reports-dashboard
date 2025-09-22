import { useQuery } from "@tanstack/react-query";
// API
import API from "./Api";

export const fetchTop5Marketer = async () => {
  const res = await API.get(`api/Marketers/GetTopMarketers`);

  return res.data;
};

export default function useGetTop5MarketerApi() {
  return useQuery({
    queryKey: ["top5Marketer"],
    queryFn: fetchTop5Marketer,
  });
}
