import { useQuery } from "@tanstack/react-query";
// API
import axios from "axios";

export const fetchPrices = async (modelId, year, comfortService) => {
  // Map yearId based on the year
  const mappedYearId = year >= 2017 ? 2 : 1;

  // Check sessionStorage for discount flag
  // const urlFlag = sessionStorage.getItem("dis") === "fifty";
  const urlFlag = comfortService === "yes"; // خدمة مرتاح مفعلة

  // Base URL
  const baseUrl = urlFlag
    ? "https://cashif.online/back-end/public/api/get-discounted-prices-by-model-and-year-for-mertah-service"
    : "https://cashif.online/back-end/public/api/get-discounted-prices-by-model-and-year";

  const res = await axios.get(`${baseUrl}?car_model_id=${modelId}&year_id=${mappedYearId}`);
  return res.data;
};

export default function useGetPricesApi(modelId, year, comfortService, trigger) {
  // console.log(modelId);
  // console.log(year);
  // console.log(trigger);

  return useQuery({
    queryKey: ["prices", modelId, year, comfortService], // Unique query key
    queryFn: () => fetchPrices(modelId, year, comfortService),
    enabled: !!modelId && !!year && !!comfortService && !!trigger, // Only enable the query if  modelId and yearId and trigger are truthy
  });
}
