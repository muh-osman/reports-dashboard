import { useMutation } from "@tanstack/react-query";
// API base
import API from "./Api";
// Cookies
import { useCookies } from "react-cookie";

export const useLogoutApi = () => {
  // Cookies
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  return useMutation({
    mutationFn: async () => {
      const res = await API.post("api/logout");
      return res.data;
    },

    onSuccess: () => {
      removeCookie("token", { path: "/dashboard" });
    },

    onError: (err) => {
      console.error(err);
      removeCookie("token", { path: "/dashboard" });
    },
  });
};
