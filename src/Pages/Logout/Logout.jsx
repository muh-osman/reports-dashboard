// import style from './Logout.module.scss';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();

  useEffect(() => {
    removeCookie("auth", { path: "/" });
    removeCookie("userId", { path: "/dashboard" });
    removeCookie("phoneNumber", { path: "/dashboard" });
    removeCookie("username", { path: "/dashboard" });
    removeCookie("tokenApp", { path: "/dashboard" });

    // window.location.href = "https://cashif.cc/";

    navigate(`${process.env.PUBLIC_URL}/login`);
  }, []);
  return <div></div>;
}
