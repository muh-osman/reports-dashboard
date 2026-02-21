import { useQuery } from "@tanstack/react-query";
// API
import axios from "axios";

export const fetchPrices = async (modelId, year, comfortService, checkit) => {
  // Map yearId based on the year
  const mappedYearId = year >= 2017 ? 2 : 1;
  const mertahServiceFlag = comfortService === "yes"; // خدمة مرتاح مفعلة

  let baseUrl;

  console.log(sessionStorage.getItem("utm_source"));

  // url discount 50%
  if (sessionStorage.getItem("utm_source") === "tiktok_bridah") {
    if (checkit) {
      if (mertahServiceFlag) {
        baseUrl = "https://cashif.online/back-end/public/api/get-makdom-discounted-prices-by-model-and-year-for-mertah-service";
      } else {
        baseUrl = "https://cashif.online/back-end/public/api/get-fifty-precent-discounted-prices-by-model-and-year";
      }
    } else {
      if (mertahServiceFlag) {
        baseUrl = "https://cashif.online/back-end/public/api/get-discounted-prices-by-model-and-year-for-mertah-service";
      } else {
        baseUrl = "https://cashif.online/back-end/public/api/get-fifty-precent-discounted-prices-by-model-and-year";
      }
    }

    // Lottery user get 20% discount
  } else if (sessionStorage.getItem("phone")) {
    if (checkit) {
      if (mertahServiceFlag) {
        baseUrl = "https://cashif.online/back-end/public/api/get-makdom-discounted-prices-by-model-and-year-for-mertah-service";
      } else {
        baseUrl = "https://cashif.online/back-end/public/api/get-lottery-discounted-prices-by-model-and-year";
      }
    } else {
      if (mertahServiceFlag) {
        baseUrl = "https://cashif.online/back-end/public/api/get-discounted-prices-by-model-and-year-for-mertah-service";
      } else {
        baseUrl = "https://cashif.online/back-end/public/api/get-lottery-discounted-prices-by-model-and-year";
      }
    }

    // فحص مخدوم
  } else if (checkit) {
    if (mertahServiceFlag) {
      // مرتاح +200
      baseUrl = "https://cashif.online/back-end/public/api/get-makdom-discounted-prices-by-model-and-year-for-mertah-service";
    } else {
      baseUrl = "https://cashif.online/back-end/public/api/get-makdom-discounted-prices-by-model-and-year";
    }

    // فحص الشراء
  } else {
    if (mertahServiceFlag) {
      // مرتاح +200
      baseUrl = "https://cashif.online/back-end/public/api/get-discounted-prices-by-model-and-year-for-mertah-service";
    } else {
      baseUrl = "https://cashif.online/back-end/public/api/get-discounted-prices-by-model-and-year";
    }
  }

  const res = await axios.get(`${baseUrl}?car_model_id=${modelId}&year_id=${mappedYearId}`);
  return res.data;
};

export default function useGetPricesApi(modelId, year, comfortService, trigger, checkit) {
  // console.log(modelId);
  // console.log(year);
  // console.log(trigger);

  let lotteryDiscountPhone = sessionStorage.getItem("phone") || "n/a";

  return useQuery({
    queryKey: ["prices", modelId, year, comfortService, 0, lotteryDiscountPhone], // Unique query key
    queryFn: () => fetchPrices(modelId, year, comfortService, checkit),
    enabled: !!modelId && !!year && !!comfortService && !!trigger, // Only enable the query if  modelId and yearId and trigger are truthy
  });
}
