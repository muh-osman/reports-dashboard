import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const downloadFalkVideo = async ({ id }) => {
  const response = await axios.get(
    `https://cashif.online/back-end/public/api/download-falak-video/${id}`,
    {
      responseType: "blob",
    }
  );
  return response.data;
};

export const useDownloadFalkVideoApi = (code, percent, t) => {
  return useMutation({
    mutationFn: downloadFalkVideo,
    onSuccess: (data, variables) => {
      const blob = new Blob([data], { type: "video/mp4" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `falak-video-${variables.id}.mp4`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    },
    onError: (error) => {
      console.error("Download failed:", error);
    },
  });
};
