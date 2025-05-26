import { useQuery } from "@tanstack/react-query";
// API
import axios from "axios";

export const fetchPrices = async (modelId, year) => {
  // Map yearId based on the year
  const mappedYearId = year >= 2017 ? 2 : 1;

  // Check sessionStorage for discount flag
  const discountFlag = sessionStorage.getItem("dis") === "fifty";

  // Base URL
  const baseUrl = discountFlag
    ? "https://cashif.online/back-end/public/api/get-fifty-precent-discounted-prices-by-model-and-year"
    : "https://cashif.online/back-end/public/api/get-discounted-prices-by-model-and-year";

  const res = await axios.get(
    `${baseUrl}?car_model_id=${modelId}&year_id=${mappedYearId}`
  );
  return res.data;
};

export default function useGetPricesApi(modelId, year, trigger) {
  return useQuery({
    queryKey: ["prices", modelId, year], // Unique query key
    queryFn: () => fetchPrices(modelId, year),
    enabled: !!modelId && !!year && !!trigger, // Only enable the query if  modelId and yearId and trigger are truthy
  });
}
