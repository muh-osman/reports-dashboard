// import style from './Logout.module.scss';
import { useEffect } from "react";
// Cookies
import { useCookies } from "react-cookie";

export default function Logout() {
  // Logout
  const [cookies, setCookie, removeCookie] = useCookies([
    "tokenApp",
    "username",
    "userId",
    "phoneNumber",
    "auth",
  ]);
  useEffect(() => {
    removeCookie("auth", { path: "/" });
    removeCookie("userId", { path: "/dashboard" });
    removeCookie("phoneNumber", { path: "/dashboard" });
    removeCookie("username", { path: "/dashboard" });
    removeCookie("tokenApp", { path: "/dashboard" });

    window.location.href = "https://cashif.cc/";
  }, []);
  return <div></div>;
}
