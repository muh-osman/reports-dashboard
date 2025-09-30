import { useQuery } from "@tanstack/react-query";
// API
import axios from "axios";

export const fetchPassengerServicesPrices = async () => {
  const res = await axios.get(`https://cashif.online/back-end/public/api/get-passenger-services-prices`);
  return res.data;
};

export default function useGetPassengerServicesPricesApi() {
  return useQuery({
    queryKey: ["passengerServicesPrices"],
    queryFn: fetchPassengerServicesPrices,
  });
}
