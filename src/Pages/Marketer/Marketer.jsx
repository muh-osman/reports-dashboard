import { Navigate } from "react-router-dom";
import style from "./Marketer.module.scss";
// Cookies
import { useCookies } from "react-cookie";
// MUI
import * as React from "react";

export default function Marketer() {
  React.useEffect(() => {
    // Scroll to the top of the page
    window.scrollTo(0, 0);
  }, []);
  // Cookies
  const [cookies, setCookie] = useCookies([
    "tokenApp",
    "pageOne",
    "pageTwo",
    "pageThree",
  ]);

  // If pageOne cookie is Not set, navigate to falak page
  if (!cookies.pageOne) {
    return <Navigate to={`${process.env.PUBLIC_URL}/falak`} />;
  }
  // If pageTwo cookie is Not set, navigate to conditions page
  if (!cookies.pageTwo) {
    return <Navigate to={`${process.env.PUBLIC_URL}/falak/conditions`} />;
  }
  // If pageThree cookie is Not set, navigate to how-works page
  if (!cookies.pageThree) {
    return <Navigate to={`${process.env.PUBLIC_URL}/falak/how-works`} />;
  }

  return (
    <div className={style.container}>
      <h1>Marketer</h1>
      <h1>Marketer</h1>
      <h1>Marketer</h1>
      <h1>Marketer</h1>
      <h1>Marketer</h1>
      <h1>Marketer</h1>
      <h1>Marketer</h1>
      <h1>Marketer</h1>
      <h1>Marketer</h1>
      <h1>Marketer</h1>
      <h1>Marketer</h1>
      <h1>Marketer</h1>
      <h1>Marketer</h1>
      <h1>Marketer</h1>
      <h1>xxx</h1>
    </div>
  );
}
