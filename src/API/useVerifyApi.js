import { useMutation } from "@tanstack/react-query";
// API base
import API from "./Api";
// Cookies
import { useCookies } from "react-cookie";
// React router
import { useNavigate } from "react-router-dom";
// Toastify
import { toast } from "react-toastify";

export const useVerifyApi = () => {
  // Cookies
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data) => {
      const res = await API.post("api/ZZZ", data);
      return res.data;
    },

    onSuccess: (responseData) => {
      setCookie("token", "ZZZ", { path: "/" });
      navigate("/reports", { replace: true });
    },

    onError: (err) => {
      console.error(err);
      removeCookie("token", { path: "/" });
      const errorMessage =
        err?.response?.data?.message || err?.message || "An error occurred";
      // Toastify
      toast.error(errorMessage);
    },
  });
};
