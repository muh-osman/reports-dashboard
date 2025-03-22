import { useQuery } from "@tanstack/react-query";
// API
import axios from "axios";

export const fetchPrices = async (modelId, year) => {
  // Map yearId based on the year
  const mappedYearId = year >= 2015 ? 2 : 1;
  const res = await axios.get(
    `https://cashif.online/back-end/public/api/get-discounted-prices-by-model-and-year?car_model_id=${modelId}&year_id=${mappedYearId}`
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
