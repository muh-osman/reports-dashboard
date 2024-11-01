import { Outlet, Navigate } from "react-router-dom";
// Cookies
import { useCookies } from "react-cookie";
// LogedOutContext
import { useLogedOut } from "../Contexts/LogedOutContext";

export default function Auth() {
  const [cookies, setCookie] = useCookies(["token"]);
  const { logedOut, setLogedOut } = useLogedOut();

  // console.log(cookies.token);

  // setCookie("token", "123", { path: "/dashboard" });

  return cookies.token ? (
    <Outlet />
  ) : logedOut ? (
    (window.location.href = "https://cashif.cc/")
  ) : (
    <Navigate to={`${process.env.PUBLIC_URL}/`} />
  );
}
