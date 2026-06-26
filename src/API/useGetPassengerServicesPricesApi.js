import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// fetch discounts map (same helper pattern as useGetPlanDetailsByYearAndModel)
const fetchPassengerDiscount = async () => {
  try {
    const res = await axios.get("https://cashif.online/back-end/public/api/service-discounts");
    const passengerRow = res.data.find((item) => item.service_id === 15);
    return passengerRow ?? null;
  } catch {
    return null; // if API fails → keep original prices
  }
};

const applyPassengerDiscount = (record, config) => {
  // no config, inactive, or zero → return original values from API
  if (!config || !config.is_active || config.discount_value === 0) {
    return record;
  }

  const original = parseFloat(record.original_price);
  let amountSaved = 0;
  let discountedPrice = original;

  if (config.discount_unit === "%") {
    amountSaved = original * (config.discount_value / 100);
    discountedPrice = original - amountSaved;
  } else {
    // fixed ريال
    amountSaved = config.discount_value;
    discountedPrice = original - amountSaved;
  }

  discountedPrice = Math.max(0, discountedPrice);

  return {
    ...record,
    discount_percent: config.discount_value,
    price: discountedPrice.toFixed(2),
    you_save: amountSaved.toFixed(2),
  };
};

export const fetchPassengerServicesPrices = async () => {
  const [pricesRes, passengerDiscount] = await Promise.all([axios.get(`https://cashif.online/back-end/public/api/get-passenger-services-prices`), fetchPassengerDiscount()]);

  const data = pricesRes.data?.data ?? [];

  return {
    ...pricesRes.data,
    data: data.map((record) => applyPassengerDiscount(record, passengerDiscount)),
  };
};

export default function useGetPassengerServicesPricesApi() {
  return useQuery({
    queryKey: ["passengerServicesPrices"],
    queryFn: fetchPassengerServicesPrices,
  });
}
