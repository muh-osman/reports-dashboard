import style from "./HowWorks.module.scss";
import { Link, Navigate } from "react-router-dom";
// Cookies
import { useCookies } from "react-cookie";
// MUI
import * as React from "react";
import Button from "@mui/material/Button";
// Lang
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";

export default function HowWorks() {
  React.useEffect(() => {
    // Scroll to the top of the page
    window.scrollTo(0, 0);
  }, []);
  //
  const { t } = useTranslation();
  const [languageText, setLanguageText] = React.useState(i18n.language);
  // Add language change listener
  React.useEffect(() => {
    const handleLanguageChange = (lng) => {
      setLanguageText(lng);
    };

    i18n.on("languageChanged", handleLanguageChange);

    // Cleanup function to remove the listener when component unmounts
    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, []);
  // Cookies
  const [cookies, setCookie] = useCookies(["tokenApp", "userId"]);
  const [pageThreeInState, setPageThreeInState] = React.useState(false);

  // Page status
  const pageThree = () => {
    setCookie(`pageThree-${cookies.userId}`, "true", {
      path: "/dashboard",
      expires: new Date(Date.now() + 10 * 365 * 24 * 60 * 60 * 1000),
    });

    setPageThreeInState(true);
  };

  // If pageThree cookie is set, navigate to marketer page
  if (cookies[`pageThree-${cookies.userId}`] || pageThreeInState) {
    return <Navigate to={`${process.env.PUBLIC_URL}/falak/marketer`} />;
  }

  return (
    <div
      dir={languageText === "ar" ? "rtl" : "ltr"}
      className={style.container}
    >
      <div className={style.not_auth_container}>
        <div className={style.not_auth_box}>
          <div>
            <h1>{t("HowWorks.weAreExcitedToHaveYouJoinTheFalkProgram")}</h1>

            <p>
              {t("HowWorks.usingMarketingImageThatContains")}{" "}
              <span style={{ fontWeight: "bold" }}>
                {t("HowWorks.yourOwnCode")}
              </span>
              {t("HowWorks.youCanPromoteYourCarInspectionService")}
            </p>
            <p>
              {t("HowWorks.theCodeGivesCustomers")}{" "}
              <span style={{ fontWeight: "bold" }}>
                {t("HowWorks.TwinyDiscount")}
              </span>
              {t("HowWorks.whileYouGet")}{" "}
              <span style={{ fontWeight: "bold" }}>
                {t("HowWorks.tenPrecentCommission")}
              </span>{" "}
              {t("HowWorks.forEveryReservationMadeUsingTheCode")}
            </p>

            <h3>{t("HowWorks.howToWork")}:</h3>
            <div>
              <ol
                style={
                  languageText === "ar"
                    ? { paddingRight: 16 }
                    : { paddingLeft: 16 }
                }
              >
                <li>
                  <span style={{ fontWeight: "bold" }}>
                    {t("HowWorks.useImageAndCode")}
                  </span>{" "}
                  {t("HowWorks.toPromoteThroughYourOnlinePlatforms")}
                </li>
                <li>
                  <span style={{ fontWeight: "bold" }}>
                    {t("HowWorks.shareWithYourAudience")}
                  </span>{" "}
                  {t(
                    "HowWorks.theCodeGivesThemTwentPercentDiscountWhenBookingCarInspection"
                  )}
                </li>
                <li>
                  <span style={{ fontWeight: "bold" }}>
                    {t("HowWorks.getTenPercentCommission")}
                  </span>{" "}
                  {t("HowWorks.forEveryReservationMadeUsingYourCode")}
                </li>
              </ol>
            </div>

            <p>{t("HowWorks.startPromotingNowAndStartMakingProfits")}</p>
            <p style={{ fontWeight: "bold" }}>{t("HowWorks.goodLuckToYou")}</p>
          </div>

          {!cookies.tokenApp ? (
            <Button
              fullWidth
              sx={{ marginTop: "30px" }}
              variant="contained"
              component={Link}
              size="large"
              to={`${process.env.PUBLIC_URL}/login`}
            >
              {t("HowWorks.login")}
            </Button>
          ) : (
            <Button
              fullWidth
              sx={{ marginTop: "30px" }}
              variant="contained"
              size="large"
              onClick={pageThree}
            >
              {t("HowWorks.continue")}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
