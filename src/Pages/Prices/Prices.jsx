import style from "./Prices.module.scss";
import { Link, useNavigate } from "react-router-dom";
// MUI
import * as React from "react";
import Typography from "@mui/material/Typography";

// Lang
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";
// API
import useGetPassengerServicesPricesApi from "../../API/useGetPassengerServicesPricesApi";

export default function Prices() {
  // Get Passenger planes Prices
  const {
    data: passengerPlanePrices,
    // fetchStatus: pricesFetchStatus,
    // isSuccess: isFetchPricesSuccess,
  } = useGetPassengerServicesPricesApi();

  //
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

  //
  const navigate = useNavigate();
  const handleClickOnPurchaseInspectionButton = () => {
    navigate(`${process.env.PUBLIC_URL}/plans?purchaseInspection=true`);
  };
  const handleClickOnCheckitInspectionButton = () => {
    // navigate(`${process.env.PUBLIC_URL}/plans?checkit=true`);
    window.location.href = "https://cashif.cc/check-it/";
  };
  const handleClickOnPassengerInspectionButton = () => {
    navigate(`${process.env.PUBLIC_URL}/plans?passengerCheck=true`);
  };

  return (
    <div className={style.container}>
      {/* Our Services */}
      <section className={style.services_container} dir={languageText === "ar" ? "rtl" : "ltr"}>
        <Typography
          variant="h6"
          component="div"
          style={{
            textAlign: "center",
            margin: "20px",
            marginTop: "8px",
            fontSize: "28px",
            fontWeight: "800",
            color: "#164544",
          }}
        >
          {t("Prices.selectTheServiese")}
        </Typography>
        <div className={style.services_box}>
          <div className={style.services_card}>
            <div className={style.service_img}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
                <path d="M160 64c0-11.8-6.5-22.6-16.9-28.2s-23-5-32.8 1.6l-96 64C-.5 111.2-4.4 131 5.4 145.8s29.7 18.7 44.4 8.9L96 123.8V416H32c-17.7 0-32 14.3-32 32s14.3 32 32 32h96 96c17.7 0 32-14.3 32-32s-14.3-32-32-32H160V64z" />
              </svg>
            </div>
            <h4>{t("Prices.purchaseCheck")}</h4>
            <p>
              {t("Prices.purchaseCheckDescriptionPartOne")} <u style={{ fontWeight: "bold" }}>{t("Prices.purchaseCheckDescriptionPartTwo")} </u>{" "}
              {t("Prices.purchaseCheckDescriptionPartThree")}
            </p>
            <ul>
              <li>
                <span>
                  <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="VerifiedUserIcon">
                    <path d="M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                  </svg>
                </span>
                <span>{t("Prices.purchaseCheckListA")}</span>
              </li>
              <li>
                <span>
                  <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="VerifiedUserIcon">
                    <path d="M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                  </svg>
                </span>
                <span>{t("Prices.purchaseCheckListB")}</span>
              </li>
              <li>
                <span>
                  <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="VerifiedUserIcon">
                    <path d="M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                  </svg>
                </span>
                <span>{t("Prices.purchaseCheckListC")}</span>
              </li>
              <li>
                <span>
                  <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="VerifiedUserIcon">
                    <path d="M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                  </svg>
                </span>
                <span>{t("Prices.purchaseCheckListD")}</span>
              </li>
            </ul>
            <button onClick={handleClickOnPurchaseInspectionButton}>{t("Prices.askNow")}</button>
          </div>

          <div className={style.services_card}>
            <div className={style.service_img}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path d="M142.9 96c-21.5 0-42.2 8.5-57.4 23.8L54.6 150.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L40.2 74.5C67.5 47.3 104.4 32 142.9 32C223 32 288 97 288 177.1c0 38.5-15.3 75.4-42.5 102.6L109.3 416H288c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9L200.2 234.5c15.2-15.2 23.8-35.9 23.8-57.4c0-44.8-36.3-81.1-81.1-81.1z" />
              </svg>
            </div>
            <h4>{t("Prices.checkItCheck")}</h4>
            <p>
              {t("Prices.checkItCheckDescriptionPartOne")} <u style={{ fontWeight: "bold" }}>{t("Prices.checkItCheckDescriptionPartTwo")}</u>{" "}
              {t("Prices.checkItCheckDescriptionPartThree")}
            </p>
            <ul>
              <li>
                <span>
                  <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="VerifiedUserIcon">
                    <path d="M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                  </svg>
                </span>
                <span>{t("Prices.checkItCheckListA")}</span>
              </li>
              <li>
                <span>
                  <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="VerifiedUserIcon">
                    <path d="M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                  </svg>
                </span>
                <span>{t("Prices.checkItCheckListB")}</span>
              </li>
              <li>
                <span>
                  <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="VerifiedUserIcon">
                    <path d="M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                  </svg>
                </span>
                <span>
                  {t("Prices.checkItCheckListC")} <Link to={`${process.env.PUBLIC_URL}/reports`}> {t("Prices.checkItCheckListCPlus")}</Link>
                </span>
              </li>
              <li>
                <span>
                  <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="VerifiedUserIcon">
                    <path d="M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                  </svg>
                </span>
                <span>{t("Prices.checkItCheckListD")}</span>
              </li>
            </ul>
            <button onClick={handleClickOnCheckitInspectionButton}>{t("Prices.askNow")}</button>
          </div>

          <div className={style.services_card}>
            <div className={style.service_img}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path d="M0 64C0 46.3 14.3 32 32 32l240 0c13.2 0 25 8.1 29.8 20.4s1.5 26.3-8.2 35.2L162.3 208l21.7 0c75.1 0 136 60.9 136 136s-60.9 136-136 136l-78.6 0C63 480 24.2 456 5.3 418.1l-1.9-3.8c-7.9-15.8-1.5-35 14.3-42.9s35-1.5 42.9 14.3l1.9 3.8c8.1 16.3 24.8 26.5 42.9 26.5l78.6 0c39.8 0 72-32.2 72-72s-32.2-72-72-72L80 272c-13.2 0-25-8.1-29.8-20.4s-1.5-26.3 8.2-35.2L189.7 96 32 96C14.3 96 0 81.7 0 64z" />
              </svg>
            </div>
            <h4>{t("Prices.travelerCheck")}</h4>
            <p>
              {t("Prices.travelerCheckDescriptionPartOne")}{" "}
              <u
                style={{
                  fontWeight: "bold",
                }}
              >
                {t("Prices.travelerCheckDescriptionPartTwo")}
              </u>{" "}
              {t("Prices.travelerCheckDescriptionPartThree")}
            </p>
            <ul>
              <li>
                <span>
                  <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="VerifiedUserIcon">
                    <path d="M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                  </svg>
                </span>
                <span>{t("Prices.travelerCheckListA")}</span>
              </li>
              <li>
                <span>
                  <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="VerifiedUserIcon">
                    <path d="M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                  </svg>
                </span>
                <span>{t("Prices.travelerCheckListB")}</span>
              </li>
              <li>
                <span>
                  <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="VerifiedUserIcon">
                    <path d="M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                  </svg>
                </span>
                <span>{t("Prices.travelerCheckListC")}</span>
              </li>
              <li>
                <span>
                  <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="VerifiedUserIcon">
                    <path d="M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                  </svg>
                </span>
                <span>{t("Prices.travelerCheckListD")}</span>
              </li>
            </ul>
            <button onClick={handleClickOnPassengerInspectionButton}>{t("Prices.askNow")}</button>
          </div>
        </div>
      </section>
    </div>
  );
}
