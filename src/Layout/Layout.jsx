// React router
import { Outlet } from "react-router-dom";
import TikTokPixel from "../Components/TikTokPixel";

export default function Layout() {
  return (
    <>
      <TikTokPixel />
      <Outlet />
    </>
  );
}
