import { useQuery } from "@tanstack/react-query";
// Axios
import axios from "axios";

export const fetchVideo = async (reportNumber, videoNumber) => {
  const res = await axios.get(
    `https://cashif.online/back-end/public/api/download-video/by/${reportNumber}/and/${videoNumber}`,
    {
      responseType: "arraybuffer", // To handle binary data
    }
  );

  // console.log(res.headers?.get("content-type"));
  // console.log(res);
  return res;
};

export default function useDownloadVideoApi(reportNumber, videoNumber) {
  return useQuery({
    queryKey: ["video", reportNumber, videoNumber],
    queryFn: () => fetchVideo(reportNumber, videoNumber),
    enabled: !!reportNumber, // Only run the query if id is truthy
  });
}
