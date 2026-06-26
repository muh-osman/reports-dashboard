import { useEffect, useState } from "react";
import API from "./Api";
//
import axios from "axios";

// fetch discounts from DB
const fetchDiscounts = async () => {
  // convert array to a map keyed by service_id for easy lookup
  // e.g. { 8: { discount_value: 20, discount_unit: '%', is_active: true }, ... }
  try {
    const res = await axios.get("https://cashif.online/back-end/public/api/service-discounts");
    return res.data.reduce((acc, item) => {
      acc[item.service_id] = item;
      return acc;
    }, {});
  } catch {
    return {}; // if API fails → no discounts applied
  }
};

function applyDiscount(priceRecord, discountsMap) {
  const config = discountsMap[priceRecord.serviceId];

  // no config found OR inactive OR zero value → no discount
  if (!config || !config.is_active || config.discount_value === 0) {
    return {
      ...priceRecord,
      original_price: priceRecord.price,
      you_save: 0,
      discount_percent: 0,
      discount_unit: config?.discount_unit ?? "%",
    };
  }

  const original = priceRecord.price;
  let amountSaved = 0;
  let discountedPrice = original;

  if (config.discount_unit === "%") {
    amountSaved = original * (config.discount_value / 100);
    discountedPrice = original - amountSaved;
  } else {
    // fixed ريال amount
    amountSaved = config.discount_value;
    discountedPrice = original - amountSaved;
  }

  discountedPrice = Math.max(0, discountedPrice);

  return {
    ...priceRecord,
    price: discountedPrice,
    original_price: original,
    you_save: amountSaved,
    discount_percent: config.discount_value,
    discount_unit: config.discount_unit,
  };
}

export const fetchPrices = async (modelId, year) => {
  const [pricesRes, discountsMap] = await Promise.all([API.get(`api/ServicePrices/ByYearAndMark?year=${year}&markId=${modelId}`), fetchDiscounts()]);

  return pricesRes.data.map((record) => applyDiscount(record, discountsMap));
};

export default function useGetPlanDetailsByYearAndModel(modelId, year, trigger) {
  const [data, setData] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [fetchStatus, setFetchStatus] = useState("idle");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!modelId || !year || !trigger) return;

    let isMounted = true;

    const getPrices = async () => {
      try {
        setFetchStatus("fetching");
        setIsSuccess(false);
        setError(null);

        const result = await fetchPrices(modelId, year);

        if (isMounted) {
          setData(result);
          setIsSuccess(true);
          setFetchStatus("idle");
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
          setData([]);
          setIsSuccess(false);
          setFetchStatus("idle");
        }
      }
    };

    getPrices();

    return () => {
      isMounted = false;
    };
  }, [modelId, year, trigger]);

  return { data, isSuccess, fetchStatus, error };
}
