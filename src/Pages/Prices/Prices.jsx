import style from "./Prices.module.scss";
import { useNavigate, useLocation } from "react-router-dom";
// MUI
import * as React from "react";
import Typography from "@mui/material/Typography";
// Lang
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";
// API
import useGetPassengerServicesPricesApi from "../../API/useGetPassengerServicesPricesApi";
// MERGE: Plans is now rendered inline as a child of this page instead of
// living on its own route.
import Plans from "../Plans/Plans";

// MERGE: the three possible services, kept as plain string keys so they can
// be driven from state, the URL, and the "active" button styling all at once.
const SERVICES = {
  PURCHASE: "purchaseInspection",
  CHECKIT: "checkit",
  PASSENGER: "passengerCheck",
};

const CheckIcon = () => (
  <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="VerifiedUserIcon">
    <path d="M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
  </svg>
);

// Kept outside Prices so it does not remount on every parent render
// (that remount was killing the expand/collapse height transition).
function ServiceDetails({ expanded, onToggle, languageText, children }) {
  const { t } = useTranslation();
  const innerRef = React.useRef(null);
  const [height, setHeight] = React.useState(0);

  const measureHeight = React.useCallback(() => {
    const el = innerRef.current;
    if (!el) return 0;
    // padding is included in scrollHeight; 1px buffer against subpixel clipping
    return el.scrollHeight + 1;
  }, []);

  React.useEffect(() => {
    if (expanded) {
      // Paint height:0 first, then animate open to the measured height
      const fullHeight = measureHeight();
      const id = requestAnimationFrame(() => setHeight(fullHeight));
      return () => cancelAnimationFrame(id);
    }

    // Stay on a pixel height (never "auto") so collapse can transition to 0
    setHeight(0);
  }, [expanded, languageText, measureHeight]);

  return (
    <>
      <div className={`${style.details_wrapper} ${expanded ? style.details_expanded : style.details_collapsed}`} style={{ height: `${height}px` }} aria-hidden={!expanded}>
        <div className={style.details_inner} ref={innerRef}>
          <ul>{children}</ul>
        </div>
      </div>
      <button
        style={{ color: "#2196f3" }}
        type="button"
        className={style.more_details_btn}
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
      >
        {expanded ? t("Prices.showLess") : t("Prices.moreDetails")}
      </button>
    </>
  );
}

export default function Prices() {
  // Get Passenger planes Prices
  const { data: passengerPlanePrices } = useGetPassengerServicesPricesApi();

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
  const location = useLocation();

  // MERGE: figure out the initial selected service from the URL (so a link
  // like ?checkit=true still preselects that service on load), falling back
  // to "فحص الشراء" (purchase inspection) as the default.
  const getServiceFromSearch = (search) => {
    const params = new URLSearchParams(search);
    if (params.get("checkit") === "true") return SERVICES.CHECKIT;
    if (params.get("passengerCheck") === "true") return SERVICES.PASSENGER;
    // purchaseInspection=true, or nothing at all -> default
    return SERVICES.PURCHASE;
  };

  const [selectedService, setSelectedService] = React.useState(() => getServiceFromSearch(location.search));
  // نوع السيارة المختار في تدفق "فحص المسافر" (سيدان - دفع رباعي - فارهة)
  const [passengerCarType, setPassengerCarType] = React.useState(null);

  // NEW: tracks whether each service card's description list is expanded.
  const [expandedCards, setExpandedCards] = React.useState({
    [SERVICES.PURCHASE]: false,
    [SERVICES.CHECKIT]: false,
    [SERVICES.PASSENGER]: false,
  });
  const toggleCardDetails = (service) => {
    setExpandedCards((prev) => ({ ...prev, [service]: !prev[service] }));
  };

  // MERGE: keep the URL in sync with the selected service, using the same
  // boolean-flag style the pages already used (?purchaseInspection=true,
  // ?checkit=true, ?passengerCheck=true), without adding a new history entry.
  React.useEffect(() => {
    const params = new URLSearchParams();
    params.set(selectedService, "true");
    navigate({ search: params.toString() }, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedService]);

  // MERGE: ref to the embedded Plans section so we can scroll to it.
  const plansRef = React.useRef(null);
  const scrollToPlans = () => {
    // Wait a tick so the newly-selected section has rendered before scrolling.
    requestAnimationFrame(() => {
      plansRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const handleSelectService = (service) => {
    setSelectedService(service);
    // Reset any previously chosen car type when switching away from/into
    // the passenger flow, so a stale selection doesn't linger.
    setPassengerCarType(null);

    // Scroll to the Plans section for every service, including "فحص المسافر"
    // (the car-type picker itself lives inside Plans, so scrolling now takes
    // the user straight to it).
    scrollToPlans();
  };

  // Imperative handle exposed by Plans, used to scroll straight to the
  // passenger price card once it's actually expanded (see below).
  const plansApiRef = React.useRef(null);

  // Called by Plans once the user picks a car type in the passenger flow.
  // The resulting price card is revealed by a CSS grid-template-rows
  // transition (0fr -> 1fr), so scrolling to it right away (before that
  // transition has run) targets a still-collapsed element and effectively
  // does nothing — which is why it took a second click to "catch up".
  // Waiting for the transition to finish before scrolling fixes that.
  const handleCarTypeSelect = (carType) => {
    setPassengerCarType(carType);
    setTimeout(() => {
      if (plansApiRef.current?.scrollToPassengerPlan) {
        plansApiRef.current.scrollToPassengerPlan();
      } else {
        scrollToPlans();
      }
    }, 150);
  };

  const handleClickOnPurchaseInspectionButton = () => handleSelectService(SERVICES.PURCHASE);
  const handleClickOnCheckitInspectionButton = () => handleSelectService(SERVICES.CHECKIT);
  const handleClickOnPassengerInspectionButton = () => handleSelectService(SERVICES.PASSENGER);

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
          {/* فحص الشراء */}
          <div className={`${style.services_card} ${selectedService === SERVICES.PURCHASE ? style.services_card_active : ""}`}>
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

            <ServiceDetails expanded={expandedCards[SERVICES.PURCHASE]} onToggle={() => toggleCardDetails(SERVICES.PURCHASE)} languageText={languageText}>
              <li>
                <span>
                  <CheckIcon />
                </span>
                <span>{t("Prices.purchaseCheckListA")}</span>
              </li>
              <li>
                <span>
                  <CheckIcon />
                </span>
                <span>{t("Prices.purchaseCheckListB")}</span>
              </li>
              <li>
                <span>
                  <CheckIcon />
                </span>
                <span>{t("Prices.purchaseCheckListC")}</span>
              </li>
              <li>
                <span>
                  <CheckIcon />
                </span>
                <span>{t("Prices.purchaseCheckListD")}</span>
              </li>
            </ServiceDetails>

            <button className={selectedService === SERVICES.PURCHASE ? style.ask_now_active : ""} onClick={handleClickOnPurchaseInspectionButton}>
              {t("Prices.askNow")}
            </button>
          </div>

          {/* مخدوم */}
          <div className={`${style.services_card} ${selectedService === SERVICES.CHECKIT ? style.services_card_active : ""}`}>
            <div className={style.service_img}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path d="M142.9 96c-21.5 0-42.2 8.5-57.4 23.8L54.6 150.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L40.2 74.5C67.5 47.3 104.4 32 142.9 32C223 32 288 97 288 177.1c0 38.5-15.3 75.4-42.5 102.6L109.3 416H288c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9L200.2 234.5c15.2-15.2 23.8-35.9 23.8-57.4c0-44.8-36.3-81.1-81.1-81.1z" />
              </svg>
            </div>
            <h4>{t("Prices.checkItCheck")}</h4>
            <p>
              {/* {t("Prices.checkItCheckDescriptionPartOne")} <u style={{ fontWeight: "bold" }}>{t("Prices.checkItCheckDescriptionPartTwo")}</u>{" "} */}
              {t("Prices.checkItCheckDescriptionPartThree")}
            </p>

            <ServiceDetails expanded={expandedCards[SERVICES.CHECKIT]} onToggle={() => toggleCardDetails(SERVICES.CHECKIT)} languageText={languageText}>
              <li>
                <span>
                  <CheckIcon />
                </span>
                <span>{t("Prices.checkItCheckListA")}</span>
              </li>
              <li>
                <span>
                  <CheckIcon />
                </span>
                <span>{t("Prices.checkItCheckListB")}</span>
              </li>
              <li>
                <span>
                  <CheckIcon />
                </span>
                <span>
                  {t("Prices.checkItCheckListC")}{" "}
                  <a style={{ color: "#2196f3" }} href={`${process.env.PUBLIC_URL}/reports`} onClick={(e) => e.stopPropagation()}>
                    {t("Prices.checkItCheckListCPlus")}
                  </a>
                </span>
              </li>
              <li>
                <span>
                  <CheckIcon />
                </span>
                <span>{t("Prices.checkItCheckListD")}</span>
              </li>
            </ServiceDetails>

            <button className={selectedService === SERVICES.CHECKIT ? style.ask_now_active : ""} onClick={handleClickOnCheckitInspectionButton}>
              {t("Prices.askNow")}
            </button>
          </div>

          {/* فحص المسافر */}
          <div className={`${style.services_card} ${selectedService === SERVICES.PASSENGER ? style.services_card_active : ""}`}>
            <div className={style.service_img}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path d="M0 64C0 46.3 14.3 32 32 32l240 0c13.2 0 25 8.1 29.8 20.4s1.5 26.3-8.2 35.2L162.3 208l21.7 0c75.1 0 136 60.9 136 136s-60.9 136-136 136l-78.6 0C63 480 24.2 456 5.3 418.1l-1.9-3.8c-7.9-15.8-1.5-35 14.3-42.9s35-1.5 42.9 14.3l1.9 3.8c8.1 16.3 24.8 26.5 42.9 26.5l78.6 0c39.8 0 72-32.2 72-72s-32.2-72-72-72L80 272c-13.2 0-25-8.1-29.8-20.4s-1.5-26.3 8.2-35.2L189.7 96 32 96C14.3 96 0 81.7 0 64z" />
              </svg>
            </div>
            <h4>{t("Prices.travelerCheck")}</h4>
            <p>
              {t("Prices.travelerCheckDescriptionPartOne")} <u style={{ fontWeight: "bold" }}>{t("Prices.travelerCheckDescriptionPartTwo")}</u>{" "}
              {t("Prices.travelerCheckDescriptionPartThree")}
            </p>

            <ServiceDetails expanded={expandedCards[SERVICES.PASSENGER]} onToggle={() => toggleCardDetails(SERVICES.PASSENGER)} languageText={languageText}>
              <li>
                <span>
                  <CheckIcon />
                </span>
                <span>{t("Prices.travelerCheckListA")}</span>
              </li>
              <li>
                <span>
                  <CheckIcon />
                </span>
                <span>{t("Prices.travelerCheckListB")}</span>
              </li>
              <li>
                <span>
                  <CheckIcon />
                </span>
                <span>{t("Prices.travelerCheckListC")}</span>
              </li>
              <li>
                <span>
                  <CheckIcon />
                </span>
                <span>{t("Prices.travelerCheckListD")}</span>
              </li>
            </ServiceDetails>

            <button className={selectedService === SERVICES.PASSENGER ? style.ask_now_active : ""} onClick={handleClickOnPassengerInspectionButton}>
              {t("Prices.askNow")}
            </button>
          </div>
        </div>
      </section>

      {/* MERGE: Plans embedded inline, scroll target lives on this wrapper */}
      <div ref={plansRef}>
        <Plans ref={plansApiRef} selectedService={selectedService} passengerCarType={passengerCarType} onCarTypeSelect={handleCarTypeSelect} />
      </div>
    </div>
  );
}
