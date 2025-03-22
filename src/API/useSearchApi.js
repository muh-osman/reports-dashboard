import { useQuery } from "@tanstack/react-query";
// API
import axios from "axios";

export const fetchModels = async () => {
  const res = await axios.get(
    `https://cashif.online/back-end/public/api/all-car-models`
  );
  return res.data;
};

export default function useSearchApi() {
  return useQuery({
    queryKey: ["models"],
    queryFn: fetchModels,
  });
}
