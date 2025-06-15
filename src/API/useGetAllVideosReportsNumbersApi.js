// useGetModelsApi.js
import { useQuery } from "@tanstack/react-query";
// Toastify
import { toast } from "react-toastify";
// Axios
import axios from "axios";

export const fetchAllVideosReportsNumbersApi = async () => {
  try {
    const response = await axios.get(
      `https://cashif.online/back-end/public/api/get-all-videos-numbers`
    );
    return response.data;
  } catch (err) {
    console.error("Error fetching Videos Reports Numbers:", err);

    const errorMessage =
      err.response?.data?.message ||
      err.message ||
      "Failed to fetch Videos Reports Numbers";

    // Only show toast on client-side
    if (typeof window !== "undefined") {
      toast.error(errorMessage);
    }

    // Rethrow the error so React Query can handle it properly
    throw new Error(errorMessage);
  }
};

export default function useGetAllVideosReportsNumbersApi() {
  return useQuery({
    queryKey: ["AllVideosReportsNumbers"],
    queryFn: fetchAllVideosReportsNumbersApi,
  });
}
