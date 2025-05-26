// useGetModelsApi.js
import { useQuery } from "@tanstack/react-query";
// Toastify
import { toast } from "react-toastify";
// Axios
import axios from "axios";

export const fetchAllSummaryReportsNumbers = async () => {
  try {
    const response = await axios.get(
      `https://cashif.online/back-end/public/api/get-all-summary-reports-numbers`
    );
    return response.data;
  } catch (err) {
    console.error("Error fetching marketing posts:", err);

    const errorMessage =
      err.response?.data?.message ||
      err.message ||
      "Failed to fetch marketing posts";

    // Only show toast on client-side
    if (typeof window !== "undefined") {
      toast.error(errorMessage);
    }

    // Rethrow the error so React Query can handle it properly
    throw new Error(errorMessage);
  }
};

export default function useGetAllSummaryReportsNumbersApi() {
  return useQuery({
    queryKey: ["AllSummaryReportsNumbers"],
    queryFn: fetchAllSummaryReportsNumbers,
  });
}
