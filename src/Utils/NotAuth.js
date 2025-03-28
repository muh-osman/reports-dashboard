import { Outlet, Navigate } from "react-router-dom";
// Cookies
import { useCookies } from "react-cookie";

export default function NotAuth() {
  const [cookies, setCookie] = useCookies(["tokenApp"]);

  // console.log(cookies.tokenApp);

  return !cookies.tokenApp ? (
    <Outlet />
  ) : (
    <Navigate to={`${process.env.PUBLIC_URL}/reports`} />
  );
}
