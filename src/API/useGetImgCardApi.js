import { useQuery } from "@tanstack/react-query";
// API
import API from "./Api";

export const fetchImgCard = async (id) => {
  const res = await API.get(`api/CardImages/DownloadPdf/${id}`, {
    responseType: "arraybuffer", // To handle binary data
  });
  return res.data;
};

export default function useGetImgCardApi(ids) {
  return useQuery({
    queryKey: ["imgCard", ids],
    queryFn: () => Promise.all(ids.map((id) => fetchImgCard(id))), // Fetch for all ids
    enabled: ids && ids.length > 0, // Only run the query if ids is not empty
  });
}
