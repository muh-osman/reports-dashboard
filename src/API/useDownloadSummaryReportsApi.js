import { useQuery } from "@tanstack/react-query";
// Axios
import axios from "axios";

export const fetchDownloadSummaryReport = async (id) => {
  const res = await axios.get(
    `https://cashif.online/back-end/public/api/download-summary-report/${id}`,
    {
      responseType: "arraybuffer", // To handle binary data
    }
  );
  // console.log(res);
  return res.data;
};

export default function useDownloadSummaryReportsApi(id) {
  return useQuery({
    queryKey: ["summaryReport", id],
    queryFn: () => fetchDownloadSummaryReport(id),
    enabled: !!id, // Only run the query if id is truthy
  });
}
