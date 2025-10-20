import style from "./Prices.module.scss";
import { Link, useLocation } from "react-router-dom";
// MUI
import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import SearchIcon from "@mui/icons-material/Search";
import { CircularProgress } from "@mui/material";
// Lang
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";
// Toastify
import { toast } from "react-toastify";
// API
import useSearchApi from "../../API/useSearchApi";
import useGetPricesApi from "../../API/useGetPricesApi";
import useGetPassengerServicesPricesApi from "../../API/useGetPassengerServicesPricesApi";
// Image
import A from "../../Assets/Images/1.jpg";
import B from "../../Assets/Images/2.jpg";
import C from "../../Assets/Images/3.jpg";

const TrueIcon = `<svg fill="#25d366" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" /></svg>`;
const FalseIcon = `<svg class="wrong-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"></path></svg>`;
const ryalIcon = `<svg fill="#174545" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1124.14 1256.39"><path d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z" /><path d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z" /></svg>`;
const redRyalIcon = `<svg width="13" fill="#d32f2f" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1124.14 1256.39"><path d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z" /><path d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z" /></svg>`;
const greenRyalIcon = `<svg width="13" fill="#25d366" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1124.14 1256.39"><path d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z" /><path d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z" /></svg>`;

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
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  // الفحص العادي
  const [isSelectPurchaseService, setIsSelectPurchaseService] = React.useState(false);
  // مخدوم
  const [checkit, setCheckit] = React.useState(queryParams.get("checkit") === "true");
  // فحص المسافر
  const [passengerCheck, setPassengerCheck] = React.useState(queryParams.get("passengerCheck") === "true");
  // نوع السيارة (سيدان - دفع رباعي - فارهة)
  const [passenger, setPassenger] = React.useState(null);

  // URL Discount
  const [dis, setDis] = React.useState(queryParams.get("dis") === "fifty" || sessionStorage.getItem("dis") === "fifty");

  //
  const handleClickOnPurchaseInspectionButton = () => {
    setIsSelectPurchaseService(true);
    setCheckit(false);
    setPassengerCheck(false);
    setPassenger(null);

    // Remove the parameters if they exist
    if (queryParams.has("checkit")) {
      queryParams.delete("checkit");
    }

    if (queryParams.has("passengerCheck")) {
      queryParams.delete("passengerCheck");
    }

    // Get the updated query string
    const newQueryString = queryParams.toString();

    // Update the URL without reloading the page
    const newUrl = newQueryString ? `${window.location.pathname}?${newQueryString}` : window.location.pathname;

    window.history.replaceState({}, "", newUrl);

    // Scroll to the element with ref={searchBtn}
    setTimeout(() => {
      if (searchBtn.current) {
        searchBtn.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 100);
  };
  const handleClickOnCheckitInspectionButton = () => {
    setIsSelectPurchaseService(false);
    setCheckit(true);
    setPassengerCheck(false);
    setPassenger(null);

    // Remove the parameters if they exist
    if (queryParams.has("passengerCheck")) {
      queryParams.delete("passengerCheck");
    }

    // Add new parameters
    queryParams.set("checkit", "true");

    // Get the updated query string
    const newQueryString = queryParams.toString();

    // Update the URL without reloading the page
    const newUrl = newQueryString ? `${window.location.pathname}?${newQueryString}` : window.location.pathname;

    window.history.replaceState({}, "", newUrl);

    // Scroll to the element with ref={searchBtn}
    setTimeout(() => {
      if (searchBtn.current) {
        searchBtn.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 100);
  };
  const handleClickOnPassengerInspectionButton = () => {
    setIsSelectPurchaseService(false);
    setCheckit(false);
    setPassengerCheck(true);
    setPassenger(null);

    // Remove the parameters if they exist
    if (queryParams.has("checkit")) {
      queryParams.delete("checkit");
    }

    // Add new parameters
    queryParams.set("passengerCheck", "true");

    // Get the updated query string
    const newQueryString = queryParams.toString();

    // Update the URL without reloading the page
    const newUrl = newQueryString ? `${window.location.pathname}?${newQueryString}` : window.location.pathname;

    window.history.replaceState({}, "", newUrl);

    // Scroll to the element with ref={searchBtn}
    setTimeout(() => {
      if (searchBtn.current) {
        searchBtn.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 100);
  };

  // Change ::after style based on lang
  // React.useEffect(() => {
  //   const crownBox = document.querySelector(".crown-box");
  //   if (languageText === "ar") {
  //     crownBox?.classList.remove("modified");
  //   } else {
  //     crownBox?.classList.add("modified");
  //   }
  // }, [languageText]);

  //
  // Create a component for checklist items with tooltips
  const ChecklistItem = ({ checked, text, tooltip }) => {
    return (
      <li
        style={{
          ...(languageText === "ar" ? { textAlign: "right" } : { textAlign: "left" }),
        }}
      >
        <span
          style={{
            ...(languageText === "ar" ? { marginLeft: "6px" } : { marginRight: "6px" }),
          }}
          dangerouslySetInnerHTML={{ __html: checked ? TrueIcon : FalseIcon }}
        ></span>{" "}
        {text}
        <Tooltip title={<p style={{ direction: "rtl" }}>{tooltip}</p>} arrow enterTouchDelay={0}>
          <IconButton>
            <InfoIcon sx={{ fontSize: "16px" }} />
          </IconButton>
        </Tooltip>
      </li>
    );
  };

  // Create a component for checklist items with tooltips
  const PassengerChecklistItem = ({ checked, text, tooltip }) => {
    return (
      <li
        style={{
          ...(languageText === "ar" ? { textAlign: "right" } : { textAlign: "left" }),
        }}
      >
        <span
          style={{
            ...(languageText === "ar" ? { marginLeft: "6px" } : { marginRight: "6px" }),
          }}
          dangerouslySetInnerHTML={{ __html: checked ? TrueIcon : FalseIcon }}
        ></span>{" "}
        {text}
        <Tooltip title={<p style={{ direction: "rtl" }}>{tooltip}</p>} arrow enterTouchDelay={0}>
          <IconButton>
            <InfoIcon sx={{ fontSize: "16px" }} />
          </IconButton>
        </Tooltip>
      </li>
    );
  };

  // Create an array of all checklist items with their tooltips
  const checklistItems = [
    {
      text: t("Prices.checklist.items.0.text"),
      tooltip: t("Prices.checklist.items.0.tooltip"),
    },
    {
      text: t("Prices.checklist.items.1.text"),
      tooltip: t("Prices.checklist.items.1.tooltip"),
    },
    {
      text: t("Prices.checklist.items.2.text"),
      tooltip: t("Prices.checklist.items.2.tooltip"),
    },
    {
      text: t("Prices.checklist.items.3.text"),
      tooltip: t("Prices.checklist.items.3.tooltip"),
    },
    {
      text: t("Prices.checklist.items.4.text"),
      tooltip: t("Prices.checklist.items.4.tooltip"),
    },
    {
      text: t("Prices.checklist.items.5.text"),
      tooltip: t("Prices.checklist.items.5.tooltip"),
    },
    {
      text: t("Prices.checklist.items.6.text"),
      tooltip: t("Prices.checklist.items.6.tooltip"),
    },
    {
      text: t("Prices.checklist.items.7.text"),
      tooltip: t("Prices.checklist.items.7.tooltip"),
    },
    {
      text: t("Prices.checklist.items.8.text"),
      tooltip: t("Prices.checklist.items.8.tooltip"),
    },
    {
      text: t("Prices.checklist.items.9.text"),
      tooltip: t("Prices.checklist.items.9.tooltip"),
    },
    {
      text: t("Prices.checklist.items.10.text"),
      tooltip: t("Prices.checklist.items.10.tooltip"),
    },
    {
      text: t("Prices.checklist.items.11.text"),
      tooltip: t("Prices.checklist.items.11.tooltip"),
    },
    {
      text: t("Prices.checklist.items.12.text"),
      tooltip: t("Prices.checklist.items.12.tooltip"),
    },
    {
      text: t("Prices.checklist.items.13.text"),
      tooltip: t("Prices.checklist.items.13.tooltip"),
    },
    {
      text: t("Prices.checklist.items.14.text"),
      tooltip: t("Prices.checklist.items.14.tooltip"),
    },
  ];
  // Create an array of all Passenger checklist (فحص المسافر) items with their tooltips
  const PassengerchecklistItems = [
    {
      text: t("Prices.passengerChecklist.items.0.text"),
      tooltip: t("Prices.passengerChecklist.items.0.tooltip"),
    },
    {
      text: t("Prices.passengerChecklist.items.1.text"),
      tooltip: t("Prices.passengerChecklist.items.1.tooltip"),
    },
    {
      text: t("Prices.passengerChecklist.items.2.text"),
      tooltip: t("Prices.passengerChecklist.items.2.tooltip"),
    },
    {
      text: t("Prices.passengerChecklist.items.3.text"),
      tooltip: t("Prices.passengerChecklist.items.3.tooltip"),
    },
    {
      text: t("Prices.passengerChecklist.items.4.text"),
      tooltip: t("Prices.passengerChecklist.items.4.tooltip"),
    },
    {
      text: t("Prices.passengerChecklist.items.5.text"),
      tooltip: t("Prices.passengerChecklist.items.5.tooltip"),
    },
    {
      text: t("Prices.passengerChecklist.items.6.text"),
      tooltip: t("Prices.passengerChecklist.items.6.tooltip"),
    },
    {
      text: t("Prices.passengerChecklist.items.7.text"),
      tooltip: t("Prices.passengerChecklist.items.7.tooltip"),
    },
    {
      text: t("Prices.passengerChecklist.items.8.text"),
      tooltip: t("Prices.passengerChecklist.items.8.tooltip"),
    },
    {
      text: t("Prices.passengerChecklist.items.9.text"),
      tooltip: t("Prices.passengerChecklist.items.9.tooltip"),
    },
    {
      text: t("Prices.passengerChecklist.items.10.text"),
      tooltip: t("Prices.passengerChecklist.items.10.tooltip"),
    },
    {
      text: t("Prices.passengerChecklist.items.11.text"),
      tooltip: t("Prices.passengerChecklist.items.11.tooltip"),
    },
    {
      text: t("Prices.passengerChecklist.items.12.text"),
      tooltip: t("Prices.passengerChecklist.items.12.tooltip"),
    },
    {
      text: t("Prices.passengerChecklist.items.13.text"),
      tooltip: t("Prices.passengerChecklist.items.13.tooltip"),
    },
    {
      text: t("Prices.passengerChecklist.items.14.text"),
      tooltip: t("Prices.passengerChecklist.items.14.tooltip"),
    },
    {
      text: t("Prices.passengerChecklist.items.15.text"),
      tooltip: t("Prices.passengerChecklist.items.15.tooltip"),
    },
  ];

  // Plans Overlay
  const overlay = React.useRef(null);

  // Year Slider
  const marks = [
    {
      value: 2009,
      label: t("Prices.older"),
    },
    {
      value: 2010,
      label: "",
    },
    {
      value: 2011,
      label: "",
    },
    {
      value: 2012,
      label: "",
    },
    {
      value: 2013,
      label: "",
    },
    {
      value: 2014,
      label: "",
    },
    {
      value: 2015,
      label: "",
    },
    {
      value: 2016,
      label: "",
    },
    {
      value: 2017,
      label: "",
    },
    {
      value: 2018,
      label: "",
    },
    {
      value: 2019,
      label: "",
    },
    {
      value: 2020,
      label: "",
    },
    {
      value: 2021,
      label: "",
    },
    {
      value: 2022,
      label: "",
    },
    {
      value: 2023,
      label: "",
    },
    {
      value: 2024,
      label: "",
    },
    {
      value: 2025,
      label: "",
    },
    {
      value: 2026,
      label: "2026",
    },
  ];

  //
  const [trigger, setTrigger] = React.useState(false);
  //
  const { data: models, isSuccess } = useSearchApi();
  //
  const [selectedModelId, setSelectedModelId] = React.useState(null);
  const handleModelChange = (event, newValue) => {
    overlay.current.style.gridTemplateRows = "0fr";
    setTrigger(false);
    if (newValue) {
      setSelectedModelId(newValue.id); // Set the selected model ID
      // console.log("Selected Model ID:", newValue.id); // Log the selected model ID
    } else {
      setSelectedModelId(null); // Reset if no model is selected
    }
  };

  // Year
  const [selectedYear, setSelectedYear] = React.useState(2018); // State to hold the selected year
  const handleYearChange = (event, newValue) => {
    overlay.current.style.gridTemplateRows = "0fr";
    setTrigger(false);
    setSelectedYear(newValue); // Update the selected year
  };

  // Get Prices
  const { data: prices, fetchStatus: pricesFetchStatus, isSuccess: isFetchPricesSuccess } = useGetPricesApi(selectedModelId, selectedYear, trigger);

  React.useEffect(() => {
    if (dis) {
      sessionStorage.setItem("dis", "fifty");
    }

    // Create a new style element
    const style = document.createElement("style");

    const discountPercentA = prices?.[0]?.prices?.[0]?.discount_percent ?? "0"; // شامل %
    const discountPercentB = prices?.[0]?.prices?.[1]?.discount_percent ?? "0"; // اساسي %
    const discountPercentC = prices?.[0]?.prices?.[2]?.discount_percent ?? "0"; // محركات %

    const contentA = languageText === "ar" ? `خصم ${discountPercentA}%` : `${discountPercentA}% Off`;
    const contentB = languageText === "ar" ? `خصم ${discountPercentB}%` : `${discountPercentB}% Off`;
    const contentC = languageText === "ar" ? `خصم ${discountPercentC}%` : `${discountPercentC}% Off`;

    style.innerHTML = `
      .full-Plane-catcher::after,
      .engines-catcher::after,
      .bascic-catcher::after
      {
        left: ${languageText === "ar" ? "-50px" : "unset"};
        right: ${languageText === "ar" ? "unset" : "-50px"};
        transform: ${languageText === "ar" ? "rotate(315deg)" : "rotate(45deg)"};
      }

      .full-Plane-catcher::after
      {
        ${discountPercentA == 0 ? "content: none;" : `content: "${contentA}";`}
      }
      .engines-catcher::after
      {
        ${discountPercentB == 0 ? "content: none;" : `content: "${contentB}";`}
      }
      .bascic-catcher::after
      {
        ${discountPercentC == 0 ? "content: none;" : `content: "${contentC}";`}
      }`;
    document.head.appendChild(style);
  }, [dis, languageText, prices, isSelectPurchaseService, checkit, passengerCheck]);

  // Check if prices is defined and has at least one element
  let fullPrice = 0;
  let basicPrice = 0;
  let engainPrice = 0;

  let oldPriceFullPrice = 0;
  let saveFullPrice = 0;

  let oldPriceBasicPrice = 0;
  let saveBasicPrice = 0;

  let oldPriceEngainPrice = 0;
  let saveEngainPrice = 0;

  if (prices && prices.length > 0) {
    // شامل
    fullPrice = Math.floor(prices[0]?.prices[0]?.price);
    oldPriceFullPrice = Math.floor(prices[0]?.prices[0]?.original_price);
    saveFullPrice = Math.floor(prices[0]?.prices[0]?.you_save);
    // اساسي
    basicPrice = Math.floor(prices[0]?.prices[1]?.price);
    oldPriceBasicPrice = Math.floor(prices[0]?.prices[1]?.original_price);
    saveBasicPrice = Math.floor(prices[0]?.prices[1]?.you_save);
    // محركات
    engainPrice = Math.floor(prices[0]?.prices[2]?.price);
    oldPriceEngainPrice = Math.floor(prices[0]?.prices[2]?.original_price);
    saveEngainPrice = Math.floor(prices[0]?.prices[2]?.you_save);
  }

  //
  const handleSubmit = () => {
    if (selectedModelId && selectedYear) {
      setTrigger(true);
    } else {
      toast.warn(t("Prices.pleaseSelectModelAndYear"));
    }
  };

  const searchBtn = React.useRef(null);
  React.useEffect(() => {
    if (isFetchPricesSuccess || (prices && prices.length > 0 && prices[0]?.car_model_id === selectedModelId && (selectedYear >= 2017 ? 2 : 1) === prices[0]?.year_id)) {
      // overlay.current.style.padding = "16px";
      overlay.current.style.gridTemplateRows = "1fr";

      // Wait for the layout to be updated before scrolling
      setTimeout(() => {
        searchBtn.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      }, 100);
    }
  }, [isFetchPricesSuccess, prices, selectedModelId, selectedYear]);

  // Show Passenger Card
  const passengerOverlay = React.useRef(null);
  React.useEffect(() => {
    if (passenger && passengerCheck) {
      // overlay.current.style.padding = "16px";
      passengerOverlay.current.style.gridTemplateRows = "1fr";
    }
  }, [passenger]);

  // Car types options array
  const handleCarTypesChange = (option) => {
    setPassenger(option);
  };
  const carTypes = [
    { value: "luxury", label: t("Prices.luxury"), image: C },
    { value: "suv", label: t("Prices.suv"), image: B },
    { value: "sedan", label: t("Prices.sedan"), image: A },
  ];

  React.useEffect(() => {
    // Create a new style element
    const style = document.createElement("style");

    const discountPercentForPassngerPlans = passengerPlanePrices?.data?.[passenger === "luxury" ? 0 : passenger === "suv" ? 1 : 2]?.discount_percent ?? "0";

    const content = languageText === "ar" ? `خصم ${discountPercentForPassngerPlans}%` : `${discountPercentForPassngerPlans}% Off`;

    style.innerHTML = `
      .passenger-plans-catcher::after
      {
        left: ${languageText === "ar" ? "-50px" : "unset"};
        right: ${languageText === "ar" ? "unset" : "-50px"};
        transform: ${languageText === "ar" ? "rotate(315deg)" : "rotate(45deg)"};
        ${discountPercentForPassngerPlans == 0 ? "content: none;" : `content: "${content}";`}
      }`;
    document.head.appendChild(style);
  }, [languageText, passenger]);

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
            <button
              style={{
                backgroundColor: isSelectPurchaseService ? "#174545" : "#e8e8e9",
                color: isSelectPurchaseService ? "#fff" : "#174545",
              }}
              onClick={handleClickOnPurchaseInspectionButton}
            >
              {t("Prices.askNow")}
            </button>
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
            <button
              style={{
                backgroundColor: checkit ? "#174545" : "#e8e8e9",
                color: checkit ? "#fff" : "#174545",
              }}
              onClick={handleClickOnCheckitInspectionButton}
            >
              {t("Prices.askNow")}
            </button>
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
            <button
              style={{
                backgroundColor: passengerCheck ? "#174545" : "#e8e8e9",
                color: passengerCheck ? "#fff" : "#174545",
              }}
              onClick={handleClickOnPassengerInspectionButton}
            >
              {t("Prices.askNow")}
            </button>
          </div>
        </div>
      </section>

      {(isSelectPurchaseService || checkit || passengerCheck) && (
        <>
          {/* Shared Title */}
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
            {t("Prices.enterTheVehicleType")}
          </Typography>

          {/* Select input (car model & year & Search button) */}
          {!passengerCheck && (
            <div className={style.box}>
              <Autocomplete
                dir={languageText === "ar" ? "rtl" : "ltr"}
                sx={{ backgroundColor: "#fff" }}
                disablePortal
                onChange={handleModelChange} // Add the onChange handler
                options={isSuccess ? models.carModels : []}
                getOptionLabel={(option) => option.model_name}
                renderInput={(params) => <TextField {...params} label={t("Prices.search")} />}
                // Use a unique key for each option
                renderOption={(props, option) => (
                  <li dir={languageText === "ar" ? "rtl" : "ltr"} {...props} key={option.id}>
                    {option.model_name}
                  </li>
                )}
                noOptionsText={
                  isSuccess ? (
                    <div dir={languageText === "ar" ? "rtl" : "ltr"} style={{ padding: "8px 16px", textAlign: "center" }}>
                      <a
                        href="https://wa.me/966920019948?text=استعلام عن موديل غير موجود"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#0b6bcb", textDecoration: "none" }}
                      >
                        {t("Prices.CarModelNotAvailableContactUs")}
                      </a>
                    </div>
                  ) : (
                    <div dir={languageText === "ar" ? "rtl" : "ltr"} style={{ padding: "8px 16px", textAlign: "center" }}>
                      {t("Prices.loading")}
                    </div>
                  )
                }
              />

              <Box sx={{ width: "85%", margin: "auto", marginTop: "28px" }}>
                <Typography
                  variant="h6"
                  component="div"
                  style={{
                    textAlign: "center",
                    margin: "auto",
                    color: "#757575",
                  }}
                >
                  {t("Prices.selectYearOfManufacture")}
                </Typography>
                <Slider
                  aria-label={t("Prices.selectYearOfManufacture")}
                  value={selectedYear} // Set the value of the slider to the selected year
                  onChange={handleYearChange} // Add the onChange handler
                  valueLabelDisplay="auto"
                  step={1}
                  marks={marks}
                  min={2009}
                  max={2026}
                  valueLabelFormat={(value) => (value === 2009 ? t("Prices.older") : value)}
                />
              </Box>

              <Box ref={searchBtn} sx={{ marginTop: "32px", textAlign: "center" }}>
                <IconButton
                  size="large"
                  onClick={handleSubmit}
                  disabled={pricesFetchStatus === "fetching"} // Disable button while loading
                  className={style.search_btn}
                >
                  {pricesFetchStatus === "fetching" ? (
                    <CircularProgress size={46} /> // Show loading spinner
                  ) : (
                    <SearchIcon sx={{ fontSize: "46px", color: "#174545" }} />
                  )}
                </IconButton>
              </Box>
            </div>
          )}

          {/* Plans */}
          {!passengerCheck && (
            <Box dir={languageText === "ar" ? "rtl" : "ltr"}>
              <div className="overlay" ref={overlay} style={{ marginBottom: passengerCheck ? 0 : "32px" }}>
                <div>
                  <div className="title-box">
                    <h2>{t("Prices.chooseTheRightPackage")}</h2>
                  </div>
                  <div className="plane-box">
                    {/* المحركات */}
                    <div className="col plane eng-pane dis rounded-3 shadow-sm engines-catcher">
                      <div className="card mb-4 card-price eng">
                        <div className="card-header py-3">
                          <h4 className="my-0 fw-normal">{t("Prices.engines")}</h4>
                        </div>
                        <div className="card-body">
                          <h1 dir="rtl" id="engain-price" className="card-title pricing-card-title">
                            {engainPrice}
                            <span dangerouslySetInnerHTML={{ __html: ryalIcon }} />
                          </h1>

                          {prices?.[0]?.prices?.[2]?.discount_percent != 0 && (
                            <>
                              <h3
                                dir="rtl"
                                id="old-price-a"
                                style={{
                                  marginTop: "-12px",
                                  fontSize: 16,
                                  color: "#d32f2f",
                                }}
                              ></h3>
                              <h3
                                dir="rtl"
                                style={{
                                  marginTop: "-20px",
                                  marginBottom: "12px",
                                  fontSize: 16,
                                  color: "#d32f2f",
                                  textAlign: "center",
                                }}
                              >
                                <span style={{ textDecoration: "line-through" }}>{oldPriceEngainPrice}</span>{" "}
                                <span>
                                  <span
                                    dangerouslySetInnerHTML={{
                                      __html: redRyalIcon,
                                    }}
                                  />
                                </span>
                                <span
                                  dir="rtl"
                                  style={{
                                    textDecoration: "none",
                                    color: "#25d366",
                                    backgroundColor: "#dff1d9",
                                    marginRight: 6,
                                    padding: "0 5px",
                                    borderRadius: 2,
                                    fontSize: 16,
                                  }}
                                >
                                  {t("Prices.save")} {saveEngainPrice}{" "}
                                  <span
                                    dangerouslySetInnerHTML={{
                                      __html: greenRyalIcon,
                                    }}
                                  />
                                </span>
                              </h3>
                            </>
                          )}

                          <h5>{t("Prices.includesExamination")}:</h5>
                          <ul className="list-unstyled mt-3 mb-4">
                            {checklistItems.map((item, index) => (
                              <ChecklistItem
                                key={index}
                                checked={index < 7} // First 7 items checked for engines plan
                                text={item.text}
                                tooltip={item.tooltip}
                              />
                            ))}
                          </ul>
                          <a
                            aria-label="Ask now Button"
                            id="plane-one"
                            className="ask-now"
                            rel="noopener noreferrer"
                            href={`https://cashif.cc${checkit ? "/check-it/receipt" : "/pay"}${languageText === "ar" ? "" : "/en"}/?plan=${
                              languageText === "ar" ? "محركات" : "Engine"
                            }&year_id=${selectedYear >= 2017 ? 2 : 1}&car_model_id=${selectedModelId}&price_id=2&full_year=${selectedYear}${dis ? "&dis=fifty" : ""}&off=${
                              prices?.[0]?.prices?.[2]?.discount_percent || "0"
                            }`}
                          >
                            {t("Prices.orderNow")}
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* الأساسي */}
                    <div className="col plane main-plane dis rounded-3 shadow-sm bascic-catcher">
                      <div className="card mb-4 card-price">
                        <div className="card-header py-3">
                          <h4 className="my-0 fw-normal">{t("Prices.basic")}</h4>
                        </div>
                        <div className="card-body">
                          <h1 dir="rtl" id="main-price" className="card-title pricing-card-title">
                            {basicPrice}
                            <span dangerouslySetInnerHTML={{ __html: ryalIcon }} />
                          </h1>

                          {prices?.[0]?.prices?.[1]?.discount_percent != 0 && (
                            <>
                              <h3
                                dir="rtl"
                                id="old-price-b"
                                style={{
                                  marginTop: "-12px",
                                  fontSize: 16,
                                  color: "#d32f2f",
                                }}
                              ></h3>
                              <h3
                                dir="rtl"
                                style={{
                                  marginTop: "-20px",
                                  marginBottom: "12px",
                                  fontSize: 16,
                                  color: "#d32f2f",
                                  textAlign: "center",
                                }}
                              >
                                <span style={{ textDecoration: "line-through" }}>{oldPriceBasicPrice}</span>{" "}
                                <span>
                                  <span
                                    dangerouslySetInnerHTML={{
                                      __html: redRyalIcon,
                                    }}
                                  />
                                </span>
                                <span
                                  dir="rtl"
                                  style={{
                                    textDecoration: "none",
                                    color: "#25d366",
                                    backgroundColor: "#dff1d9",
                                    marginRight: 6,
                                    padding: "0 5px",
                                    borderRadius: 2,
                                    fontSize: 16,
                                  }}
                                >
                                  {t("Prices.save")} {saveBasicPrice}{" "}
                                  <span
                                    dangerouslySetInnerHTML={{
                                      __html: greenRyalIcon,
                                    }}
                                  />
                                </span>
                              </h3>
                            </>
                          )}
                          <h5>{t("Prices.includesExamination")}:</h5>
                          <ul className="list-unstyled mt-3 mb-4">
                            {checklistItems.map((item, index) => (
                              <ChecklistItem
                                key={index}
                                checked={index < 9} // First 9 items checked for basic plan
                                text={item.text}
                                tooltip={item.tooltip}
                              />
                            ))}
                          </ul>
                          <a
                            aria-label="Ask now Button"
                            id="plane-two"
                            className="ask-now"
                            rel="noopener noreferrer"
                            href={`https://cashif.cc${checkit ? "/check-it/receipt" : "/pay"}${languageText === "ar" ? "" : "/en"}/?plan=${
                              languageText === "ar" ? "أساسي" : "Basic"
                            }&year_id=${selectedYear >= 2017 ? 2 : 1}&car_model_id=${selectedModelId}&price_id=1&full_year=${selectedYear}${dis ? "&dis=fifty" : ""}&off=${
                              prices?.[0]?.prices?.[1]?.discount_percent || "0"
                            }`}
                          >
                            {t("Prices.orderNow")}
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* الشامل */}
                    <div className="col plane crown-box full-pane dis rounded-3 shadow-sm full-Plane-catcher" style={{ border: "2px solid #174545" }}>
                      <div className="card mb-0 card-price">
                        <div className="card-header py-3 crown">
                          <h4 className="my-0 fw-normal">{t("Prices.fullInspection")}</h4>
                        </div>
                        <div className="card-body">
                          <h1 dir="rtl" id="full-price" className="card-title pricing-card-title">
                            {fullPrice}
                            <span dangerouslySetInnerHTML={{ __html: ryalIcon }} />
                          </h1>

                          {prices?.[0]?.prices?.[0]?.discount_percent != 0 && (
                            <h3
                              dir="rtl"
                              style={{
                                marginTop: "-20px",
                                marginBottom: "12px",
                                fontSize: 16,
                                color: "#d32f2f",
                                textAlign: "center",
                              }}
                            >
                              <span style={{ textDecoration: "line-through" }}>{oldPriceFullPrice}</span>{" "}
                              <span>
                                <span
                                  dangerouslySetInnerHTML={{
                                    __html: redRyalIcon,
                                  }}
                                />
                              </span>
                              <span
                                dir="rtl"
                                style={{
                                  textDecoration: "none",
                                  color: "#25d366",
                                  backgroundColor: "#dff1d9",
                                  marginRight: 6,
                                  padding: "0 5px",
                                  borderRadius: 2,
                                  fontSize: 16,
                                }}
                              >
                                {t("Prices.save")} {saveFullPrice}{" "}
                                <span
                                  dangerouslySetInnerHTML={{
                                    __html: greenRyalIcon,
                                  }}
                                />
                              </span>
                            </h3>
                          )}

                          <h5>{t("Prices.includesExamination")}:</h5>
                          <ul className="list-unstyled mt-3 mb-4">
                            {checklistItems.map((item) => (
                              <ChecklistItem
                                key={item.text}
                                checked={true} // All items checked for full plan
                                text={item.text}
                                tooltip={item.tooltip}
                              />
                            ))}
                          </ul>
                          <a
                            aria-label="Ask now Button"
                            id="plane-three"
                            className="ask-now"
                            rel="noopener noreferrer"
                            href={`https://cashif.cc${checkit ? "/check-it/receipt" : "/pay"}${languageText === "ar" ? "" : "/en"}/?plan=${
                              languageText === "ar" ? "شامل" : "Full-Inspection"
                            }&year_id=${selectedYear >= 2017 ? 2 : 1}&car_model_id=${selectedModelId}&price_id=0&full_year=${selectedYear}${dis ? "&dis=fifty" : ""}&off=${
                              prices?.[0]?.prices?.[0]?.discount_percent || "0"
                            }`}
                          >
                            {t("Prices.orderNow")}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Box>
          )}

          {/* فحص المسافر الاختيارات */}
          {passengerCheck && (
            <Box className={style.label_box} sx={{ marginTop: "32px" }}>
              {carTypes.map((option) => (
                <label key={option.value} dir="rtl">
                  <div className={style.image_box} onClick={() => handleCarTypesChange(option.value)}>
                    <img src={option.image} alt={`Option ${option.value}`} />
                  </div>
                  <div className={style.label_text_box}>
                    <input type="radio" name="options" value={option.value} checked={passenger === option.value} onChange={() => handleCarTypesChange(option.value)} required />
                    {option.label}
                  </div>
                </label>
              ))}
            </Box>
          )}

          {/* فحص المسافر الخطط */}
          {passengerCheck && (
            <Box dir={languageText === "ar" ? "rtl" : "ltr"}>
              <div className="overlay" ref={passengerOverlay}>
                <div>
                  <div className="title-box">
                    <h2>{t("Prices.chooseThePackage")}</h2>
                  </div>
                  <div className="plane-box">
                    {/* سيدان - دفع رباعي - فارهة */}
                    <div className="col plane eng-pane dis rounded-3 shadow-sm passenger-plans-catcher">
                      <div className="card mb-4 card-price eng">
                        <div className="card-header py-3">
                          <h4 className="my-0 fw-normal">
                            {passenger && passenger === "sedan" && t("Prices.sedan")}
                            {passenger && passenger === "suv" && t("Prices.suv")}
                            {passenger && passenger === "luxury" && t("Prices.luxury")}
                          </h4>
                        </div>

                        <div className="card-body">
                          <h1 dir="rtl" id="engain-price" className="card-title pricing-card-title">
                            {passenger && passenger === "sedan" && Math.floor(passengerPlanePrices?.data[2]?.price)}
                            {passenger && passenger === "suv" && Math.floor(passengerPlanePrices?.data[1]?.price)}
                            {passenger && passenger === "luxury" && Math.floor(passengerPlanePrices?.data[0]?.price)}
                            <span dangerouslySetInnerHTML={{ __html: ryalIcon }} />
                          </h1>

                          {passengerPlanePrices?.data?.[passenger === "luxury" ? 0 : passenger === "suv" ? 1 : 2]?.discount_percent != 0 && (
                            <h3
                              dir="rtl"
                              style={{
                                marginTop: "-20px",
                                marginBottom: "12px",
                                fontSize: 16,
                                color: "#d32f2f",
                                textAlign: "center",
                              }}
                            >
                              <span style={{ textDecoration: "line-through" }}>
                                {Math.floor(passengerPlanePrices?.data?.[passenger === "luxury" ? 0 : passenger === "suv" ? 1 : 2]?.original_price)}
                              </span>{" "}
                              <span>
                                <span
                                  dangerouslySetInnerHTML={{
                                    __html: redRyalIcon,
                                  }}
                                />
                              </span>
                              <span
                                dir="rtl"
                                style={{
                                  textDecoration: "none",
                                  color: "#25d366",
                                  backgroundColor: "#dff1d9",
                                  marginRight: 6,
                                  padding: "0 5px",
                                  borderRadius: 2,
                                  fontSize: 16,
                                }}
                              >
                                {t("Prices.save")} {Math.floor(passengerPlanePrices?.data?.[passenger === "luxury" ? 0 : passenger === "suv" ? 1 : 2]?.you_save)}{" "}
                                <span
                                  dangerouslySetInnerHTML={{
                                    __html: greenRyalIcon,
                                  }}
                                />
                              </span>
                            </h3>
                          )}

                          <h5>{t("Prices.includesExamination")}:</h5>
                          <ul className="list-unstyled mt-3 mb-4">
                            {PassengerchecklistItems.map((item, index) => (
                              <PassengerChecklistItem
                                key={index}
                                checked={true} // All checked
                                text={item.text}
                                tooltip={item.tooltip}
                              />
                            ))}
                          </ul>

                          {passengerPlanePrices && (
                            <a
                              aria-label="Ask now Button"
                              id="plane-one"
                              className="ask-now"
                              rel="noopener noreferrer"
                              href={`https://cashif.cc/pay${languageText === "ar" ? "" : "/en"}/?plan=passenger&year_id=1&car_model_id=9&price_id=2&full_year=0${
                                dis ? "&dis=fifty" : ""
                              }${passenger ? `&passenger=${passenger}` : ""}&off=${
                                passengerPlanePrices?.data[passenger === "luxury" ? 0 : passenger === "suv" ? 1 : 2]?.discount_percent || "0"
                              }`}
                            >
                              {t("Prices.orderNow")}
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Box>
          )}
        </>
      )}
    </div>
  );
}
