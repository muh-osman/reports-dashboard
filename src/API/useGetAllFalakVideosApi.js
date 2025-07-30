import { useQuery } from "@tanstack/react-query";
// Toastify
import { toast } from "react-toastify";
//
import axios from "axios";

export default function useGetAllFalakVideosApi() {
  const fetchAllVideos = async () => {
    try {
      const res = await axios.get(
        "https://cashif.online/back-end/public/api/get-all-falak-videos"
      );
      return res.data;
    } catch (err) {
      console.error(err);
      const errorMessage =
        err?.response?.data?.message || err?.message || "An error occurred";
      // Toastify
      toast.error(errorMessage);
    }
  };

  return useQuery({
    queryKey: ["falakVideos"],
    queryFn: fetchAllVideos,
  });
}
