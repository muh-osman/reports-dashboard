import { useQuery } from "@tanstack/react-query";
// Axios
import axios from "axios";

export const fetchVideo = async (id) => {
  const res = await axios.get(
    `https://cashif.online/back-end/public/api/download-video/${id}`,
    {
      responseType: "arraybuffer", // To handle binary data
    }
  );
  // console.log(res);
  return res.data;
};

export default function useDownloadVideoApi(id) {
  return useQuery({
    queryKey: ["video", id],
    queryFn: () => fetchVideo(id),
    enabled: !!id, // Only run the query if id is truthy
  });
}
