import { useQuery } from "@tanstack/react-query";
// API
import API from "./Api";

export const fetchImgCard = async (id) => {
  const res = await API.get(`api/CardImages/DownloadPdf/${id}`, {
    responseType: "arraybuffer", // To handle binary data
  });
  return res.data;
};

export default function useGetImgCardApi(id) {
  return useQuery({
    queryKey: ["imgCard", id],
    queryFn: () => fetchImgCard(id),
    enabled: !!id, // Only run the query if id is truthy
  });
}
