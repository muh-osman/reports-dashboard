import { useQuery } from "@tanstack/react-query";
// API
import API from "./Api";

export const fetchDownloadCard = async (id) => {
  const res = await API.get(`api/StageReports/${id}`, {
    responseType: "arraybuffer", // To handle binary data
  });
  // console.log(res);
  return res.data;
};

export default function useDownloadCardApi(id) {
  return useQuery({
    queryKey: ["DownloadedCard", id],
    queryFn: () => fetchDownloadCard(id),
    enabled: !!id, // Only run the query if id is truthy
  });
}
