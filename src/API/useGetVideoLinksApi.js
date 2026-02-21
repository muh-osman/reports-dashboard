import { useQuery } from "@tanstack/react-query";
// Cookies
import { useCookies } from "react-cookie";
// Axios
import axios from "axios";

export const fetchVideoLinks = async (cardId) => {
  const res = await axios.get(`https://cashif.online/back-end/public/api/new-show-videos-links/${cardId}`);
  return res.data;
};

export default function useGetVideoLinksApi(cardId) {
  const [cookies, setCookie] = useCookies(["tokenApp"]);

  const token = cookies.tokenApp;

  return useQuery({
    queryKey: ["videoLinks", cardId],
    queryFn: () => fetchVideoLinks(cardId),
    enabled: !!token, // Only run the query if the token exists
  });
}
