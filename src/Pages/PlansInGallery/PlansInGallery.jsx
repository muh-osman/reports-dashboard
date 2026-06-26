import style from "./PlansInGallery.module.scss";
import { useLocation } from "react-router-dom";
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
import { CircularProgress, FormControlLabel, Radio } from "@mui/material";
import Chip from "@mui/material/Chip";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
// MUI Icons
import CheckIcon from "@mui/icons-material/Check";
import BackspaceIcon from "@mui/icons-material/Backspace";
//
import dayjs from "dayjs";
// Lang
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";
// Toastify
import { toast } from "react-toastify";
// API
import useGetAllCarModelsApi from "../../API/useGetAllCarModelsApi";
import useGetAllManufacturerApi from "../../API/useGetAllManufacturerApi";
import useGetPlanDetailsByYearAndModel from "../../API/useGetPlanDetailsByYearAndModel";
import useGetPassengerServicesPricesApi from "../../API/useGetPassengerServicesPricesApi";
// Image
import A from "../../Assets/Images/1.jpg";
import B from "../../Assets/Images/2.jpg";
import C from "../../Assets/Images/3.jpg";
//
import logo from "../../Assets/Images/logo.webp";

const TrueIcon = `<svg fill="#25d366" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" /></svg>`;
const FalseIcon = `<svg class="wrong-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"></path></svg>`;
const ryalIcon = `<svg fill="#174545" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1124.14 1256.39"><path d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z" /><path d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z" /></svg>`;
const redRyalIcon = `<svg width="13" fill="#d32f2f" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1124.14 1256.39"><path d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z" /><path d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z" /></svg>`;
const greenRyalIcon = `<svg width="13" fill="#25d366" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1124.14 1256.39"><path d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z" /><path d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z" /></svg>`;

export default function PlansInGallery() {
  // مرتاح Modal
  const [openComfortModal, setOpenComfortModal] = React.useState(false);
  const [selectedPlanUrl, setSelectedPlanUrl] = React.useState("");

  const handleOpenComfortModal = (url) => {
    // Friday => skip modal
    // if (isFriday) {
    if (true) {
      window.location.href = `${url}&comfort_service=no`;
      return;
    }

    setSelectedPlanUrl(url);
    setOpenComfortModal(true);
  };

  const handleCloseComfortModal = () => {
    setOpenComfortModal(false);
  };

  const handleContinueOrder = (serviceValue) => {
    const finalUrl = `${selectedPlanUrl}&comfort_service=${serviceValue}`;

    window.location.href = finalUrl;
  };
  //
  const { data: AllManufacturer, isSuccess: isGetAllManufacturerSuccess } = useGetAllManufacturerApi();
  const { data: models, isSuccess } = useGetAllCarModelsApi();
  //
  const isFriday = dayjs().day() === 5; // 5 = Friday
  //
  const autoCompleteInputRef = React.useRef(null);
  // Get Passenger planes Prices
  const {
    data: passengerPlanePrices,
    // fetchStatus: pricesFetchStatus,
    // isSuccess: isFetchPricesSuccess,
  } = useGetPassengerServicesPricesApi();

  //
  React.useEffect(() => {
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
  const [isSelectPurchaseService, setIsSelectPurchaseService] = React.useState(queryParams.get("purchaseInspection") === "true");
  // مخدوم
  const [checkit, setCheckit] = React.useState(queryParams.get("checkit") === "true");
  // فحص المسافر
  const [passengerCheck, setPassengerCheck] = React.useState(queryParams.get("passengerCheck") === "true");
  // نوع السيارة (سيدان - دفع رباعي - فارهة)
  const [passenger, setPassenger] = React.useState(null);

  // URL Discount
  const [dis, setDis] = React.useState(queryParams.get("dis") === "fifty" || sessionStorage.getItem("dis") === "fifty");

  //
  // Create a component for checklist items with tooltips
  const ChecklistItem = ({ checked, text, tooltip }) => {
    return (
      <li
        style={{
          ...(languageText === "ar" ? { textAlign: "right" } : { textAlign: "left" }),
          fontSize: "15px",
          // backgroundColor: "red",
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
          <IconButton sx={{ padding: "6px", paddingLeft: 0 }}>
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

  //
  const [trigger, setTrigger] = React.useState(false);

  //
  const [selectedModelId, setSelectedModelId] = React.useState(null);
  const [selectedModel, setSelectedModel] = React.useState(null);
  const handleModelChange = (event, newValue) => {
    setSelectedModel(newValue);
    setSelectedModelId(newValue ? newValue.id : null);
  };

  // Year
  const [selectedYear, setSelectedYear] = React.useState(""); // State to hold the selected year
  const handleYearChange = (event, newValue) => {
    setSelectedYear(newValue); // Update the selected year
  };

  // Get Prices
  const { data: prices, fetchStatus: pricesFetchStatus, isSuccess: isFetchPricesSuccess } = useGetPlanDetailsByYearAndModel(selectedModelId, selectedYear, trigger);

  React.useEffect(() => {
    if (pricesFetchStatus === "idle") {
      setTrigger(false);

      // console.log(prices);
    }
  }, [pricesFetchStatus]);

  // --- Price state ---
  const [fullPrice, setFullPrice] = React.useState(0);
  const [basicPrice, setBasicPrice] = React.useState(0);
  const [engainPrice, setEngainPrice] = React.useState(0);
  const [passengerPrice, setPassengerPrice] = React.useState(0);

  const [oldPriceFullPrice, setOldPriceFullPrice] = React.useState(0);
  const [oldPriceBasicPrice, setOldPriceBasicPrice] = React.useState(0);
  const [oldPriceEngainPrice, setOldPriceEngainPrice] = React.useState(0);
  const [oldPricePassenger, setOldPricePassenger] = React.useState(0);

  const [saveFullPrice, setSaveFullPrice] = React.useState(0);
  const [saveBasicPrice, setSaveBasicPrice] = React.useState(0);
  const [saveEngainPrice, setSaveEngainPrice] = React.useState(0);
  const [savePassengerPrice, setSavePassengerPrice] = React.useState(0);

  // Populate state from API response
  React.useEffect(() => {
    if (!prices || prices.length === 0) return;

    const full = prices.find((p) => p.serviceId === 8);
    const basic = prices.find((p) => p.serviceId === 9);
    const engine = prices.find((p) => p.serviceId === 10);
    const passenger = prices.find((p) => p.serviceId === 15);

    // setFullPrice(Math.floor(full?.price ?? 0));
    // setOldPriceFullPrice(Math.floor(full?.original_price ?? 0));
    // setSaveFullPrice(Math.floor(full?.you_save ?? 0));

    // setBasicPrice(Math.floor(basic?.price ?? 0));
    // setOldPriceBasicPrice(Math.floor(basic?.original_price ?? 0));
    // setSaveBasicPrice(Math.floor(basic?.you_save ?? 0));

    // setEngainPrice(Math.floor(engine?.price ?? 0));
    // setOldPriceEngainPrice(Math.floor(engine?.original_price ?? 0));
    // setSaveEngainPrice(Math.floor(engine?.you_save ?? 0));

    // Full: force 10% off original_price
    // الشامل — force exactly 10% discount off original_price
    const fullOrig = Math.floor(full?.original_price ?? 0);
    const fullDisc = Math.floor(fullOrig * 0.9);
    setFullPrice(fullDisc);
    setOldPriceFullPrice(fullOrig);
    setSaveFullPrice(fullOrig - fullDisc);

    // الأساسي — no discount, show original_price as the actual price
    setBasicPrice(Math.floor(basic?.original_price ?? 0));
    setOldPriceBasicPrice(0);
    setSaveBasicPrice(0);

    // المحركات — no discount, show original_price as the actual price
    setEngainPrice(Math.floor(engine?.original_price ?? 0));
    setOldPriceEngainPrice(0);
    setSaveEngainPrice(0);

    setPassengerPrice(Math.floor(passenger?.price ?? 0));
    setOldPricePassenger(Math.floor(passenger?.original_price ?? 0));
    setSavePassengerPrice(Math.floor(passenger?.you_save ?? 0));
  }, [prices]);

  // CSS ribbon badges
  React.useEffect(() => {
    if (!prices || prices.length === 0) return;

    const full = prices.find((p) => p.serviceId === 8) ?? {};
    const basic = prices.find((p) => p.serviceId === 9) ?? {};
    const engine = prices.find((p) => p.serviceId === 10) ?? {};
    const passenger = prices.find((p) => p.serviceId === 15) ?? {};

    const badge = (record, overridePercent = null) => {
      const percent = overridePercent;
      if (!percent || percent === 0) return "content: none;";
      const label = languageText === "ar" ? `خصم ${percent}%` : `${percent}% Off`;
      return `content: "${label}";`;
    };

    const leftRight = languageText === "ar" ? "left: -50px; right: unset; transform: rotate(315deg);" : "right: -50px; left: unset; transform: rotate(45deg);";

    const styleEl = document.createElement("style");
    styleEl.innerHTML = `
        .full-Plane-catcher::after,
        .engines-catcher::after,
        .bascic-catcher::after,
        .passenger-plans-catcher::after { ${leftRight} }

        .full-Plane-catcher::after       { ${badge(full, 10)}  }
        .bascic-catcher::after           { ${badge(basic, 0)}  }
        .engines-catcher::after          { ${badge(engine, 0)} }
        .passenger-plans-catcher::after  { ${badge(passenger)} }
      `;
    document.head.appendChild(styleEl);

    // return () => styleEl.remove();
  }, [prices, languageText]);

  //
  const handleSubmit = () => {
    if (selectedModelId && selectedYear) {
      setTrigger(true);
    } else {
      toast.warn(t("Prices.pleaseSelectModelAndYear"));
    }
  };

  // Auto-reset timer ref
  const resetTimerRef = React.useRef(null);
  const [showPlans, setShowPlans] = React.useState(false);
  //
  const searchBtn = React.useRef(null);
  React.useEffect(() => {
    if (isFetchPricesSuccess && prices && prices?.length > 0 && prices[0]?.carMarkId === selectedModelId) {
      // overlay.current.style.padding = "16px";
      overlay.current.style.gridTemplateRows = "1fr";
      setShowPlans(true);

      // Wait for the layout to be updated before scrolling
      setTimeout(() => {
        searchBtn.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      }, 100);

      // Clear any previous timer, then start a fresh 2-minute auto-reset timer
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
      }
      resetTimerRef.current = setTimeout(() => {
        handleBack();
      }, 2 * 60 * 1000); // 2 minutes
    } else {
      if (overlay.current) {
        overlay.current.style.gridTemplateRows = "0fr";
      }
      setShowPlans(false);
    }
  }, [prices]);

  // Clear reset timer on unmount
  React.useEffect(() => {
    return () => {
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

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

  //
  const handleBack = () => {
    setShowPlans(false);
    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
      resetTimerRef.current = null;
    }
    setSelectedModel(null);
    setSelectedModelId(null);
    setSelectedYear("");
    if (overlay.current) {
      overlay.current.style.gridTemplateRows = "0fr";
    }
  };

  return (
    <div className={style.container}>
      <div className={style.header}>
        <div className={style.top_circle_header}>
          <img src={logo} alt="cashif logo" />
          <Tooltip title="مسح" className={style.three_dots} onClick={handleBack}>
            <IconButton
              sx={{
                "&:hover": {
                  backgroundColor: "transparent !important",
                },
              }}
            >
              <BackspaceIcon sx={{ color: "#fff", fontSize: "32px" }} />
            </IconButton>
          </Tooltip>
        </div>
        <div className={style.introCurve}>
          <svg style={{ width: "100%", height: "auto" }} viewBox="0 0 1920 74" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0H1920V0.96521C1920 0.96521 1335.71 74 960 74C584.29 74 0 0.96521 0 0.96521V0Z" fill="#174545" />
          </svg>
        </div>
      </div>

      {/* Shared Title */}
      <Typography variant="h6" component="div" className={style.title}>
        {t("Prices.enterTheVehicleType")}
      </Typography>

      {/* Select input (car model & year & Search button) */}
      {!passengerCheck && (
        <div className={style.box}>
          <Autocomplete
            value={selectedModel}
            dir={languageText === "ar" ? "rtl" : "ltr"}
            sx={{ backgroundColor: "#fff", width: "100%" }}
            disablePortal
            onChange={(event, newValue) => {
              handleModelChange(event, newValue);
              // Hide keyboard after selection on mobile
              if (autoCompleteInputRef.current) {
                autoCompleteInputRef.current.blur();
              }
            }}
            options={isSuccess ? models : []}
            getOptionLabel={(option) => {
              const manufacturer = AllManufacturer?.find((m) => m.id === option.carManufacturerId);
              const manufacturerName = languageText === "ar" ? manufacturer?.nameAr : manufacturer?.nameEn;
              return `${option.nameAr} - ${option.nameEn}${manufacturerName ? ` | ${manufacturerName}` : ""}`;
            }}
            renderInput={(params) => <TextField {...params} label={t("Prices.search")} inputRef={autoCompleteInputRef} />}
            // Use a unique key for each option
            renderOption={(props, option) => {
              const manufacturer = AllManufacturer?.find((m) => m.id === option.carManufacturerId);
              const manufacturerName = languageText === "ar" ? manufacturer?.nameAr : manufacturer?.nameEn;

              return (
                <li dir={languageText === "ar" ? "rtl" : "ltr"} {...props} key={option.id}>
                  <span>
                    {option.nameAr} - {option.nameEn}
                  </span>
                  {manufacturerName && <span style={{ marginRight: 8, marginLeft: 8, color: "#888", fontSize: "0.85em" }}>| {manufacturerName}</span>}
                </li>
              );
            }}
            filterOptions={(options, { inputValue }) => {
              const lower = inputValue.toLowerCase();
              return options.filter((option) => {
                const manufacturer = AllManufacturer?.find((m) => m.id === option.carManufacturerId);
                return (
                  option.nameAr?.includes(inputValue) ||
                  option.nameEn?.toLowerCase().includes(lower) ||
                  manufacturer?.nameAr?.includes(inputValue) ||
                  manufacturer?.nameEn?.toLowerCase().includes(lower)
                );
              });
            }}
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

          <Box sx={{ width: "100%", margin: "auto", marginTop: "28px" }}>
            <FormControl fullWidth>
              <InputLabel>{t("Prices.yearOfManufacture")}</InputLabel>
              <Select value={selectedYear} label={t("Prices.yearOfManufacture")} onChange={(e) => setSelectedYear(e.target.value)} sx={{ backgroundColor: "#fff" }}>
                {Array.from({ length: 29 }, (_, i) => {
                  const year = 2027 - i;
                  return (
                    <MenuItem key={year} value={year}>
                      {year === 1999 ? t("Prices.older") : year}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>

          {/* زر البحث */}
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

      {/* نص "أسعار الفحص" يظهر قبل ظهور الباقات */}
      {!showPlans && (
        <>
          <Typography
            variant="h4"
            component="div"
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              color: "#757575",
              marginTop: "50px",
              marginBottom: "100px",
              fontSize: "150px",
            }}
          >
            أسعار
            {/* {languageText === "ar" ? "أسعار الفحص" : "Inspection Prices"} */}
          </Typography>

          <Typography
            variant="h4"
            component="div"
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              color: "#757575",
              marginTop: 0,
              marginBottom: 0,
              fontSize: "150px",
            }}
          >
            الفحص
            {/* {languageText === "ar" ? "أسعار الفحص" : "Inspection Prices"} */}
          </Typography>
        </>
      )}

      {/* Plans */}
      {!passengerCheck && (
        <Box dir={languageText === "ar" ? "rtl" : "ltr"}>
          <div className="overlay" ref={overlay} style={{ marginBottom: passengerCheck ? 0 : "32px" }}>
            <div>
              <div className="title-box">
                <h2>{t("Prices.chooseTheRightPackage")}</h2>
              </div>
              <div className="plane-box plans-in-gallery-box">
                {/* المحركات */}
                {engainPrice !== 0 && (
                  <div className="col plane eng-pane dis rounded-3 shadow-sm engines-catcher" style={{ width: "219px" }}>
                    <div className="card mb-4 card-price eng">
                      <div className="card-header py-3">
                        <h4 className="my-0 fw-normal">{t("Prices.engines")}</h4>
                      </div>
                      <div className="card-body card-body-in-gallery-box">
                        <h1 dir="rtl" id="engain-price" className="card-title pricing-card-title" style={{ marginBottom: "16px" }}>
                          {engainPrice}
                          <span dangerouslySetInnerHTML={{ __html: ryalIcon }} />
                        </h1>

                        {saveEngainPrice > 0 && (
                          <h3 dir="rtl" style={{ marginTop: "-20px", marginBottom: "12px", fontSize: 16, color: "#d32f2f", textAlign: "center" }}>
                            <span style={{ textDecoration: "line-through" }}>{oldPriceEngainPrice}</span> <span dangerouslySetInnerHTML={{ __html: redRyalIcon }} />
                            <span
                              dir="rtl"
                              style={{ textDecoration: "none", color: "#25d366", backgroundColor: "#dff1d9", marginRight: 6, padding: "0 5px", borderRadius: 2, fontSize: 16 }}
                            >
                              {t("Prices.save")} {saveEngainPrice} <span dangerouslySetInnerHTML={{ __html: greenRyalIcon }} />
                            </span>
                          </h3>
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
                      </div>
                    </div>
                  </div>
                )}

                {/* الأساسي */}
                {basicPrice !== 0 && (
                  <div className="col plane main-plane dis rounded-3 shadow-sm bascic-catcher" style={{ width: "219px" }}>
                    <div className="card mb-4 card-price">
                      <div className="card-header py-3">
                        <h4 className="my-0 fw-normal">{t("Prices.basic")}</h4>
                      </div>
                      <div className="card-body card-body-in-gallery-box">
                        <h1 dir="rtl" id="main-price" className="card-title pricing-card-title" style={{ marginBottom: "16px" }}>
                          {basicPrice}
                          <span dangerouslySetInnerHTML={{ __html: ryalIcon }} />
                        </h1>

                        {saveBasicPrice > 0 && (
                          <h3 dir="rtl" style={{ marginTop: "-20px", marginBottom: "12px", fontSize: 16, color: "#d32f2f", textAlign: "center" }}>
                            <span style={{ textDecoration: "line-through" }}>{oldPriceBasicPrice}</span> <span dangerouslySetInnerHTML={{ __html: redRyalIcon }} />
                            <span
                              dir="rtl"
                              style={{ textDecoration: "none", color: "#25d366", backgroundColor: "#dff1d9", marginRight: 6, padding: "0 5px", borderRadius: 2, fontSize: 16 }}
                            >
                              {t("Prices.save")} {saveBasicPrice} <span dangerouslySetInnerHTML={{ __html: greenRyalIcon }} />
                            </span>
                          </h3>
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
                      </div>
                    </div>
                  </div>
                )}

                {/* الشامل */}
                {fullPrice !== 0 && (
                  <div className="col plane crown-box full-pane dis rounded-3 shadow-sm full-Plane-catcher" style={{ border: "2px solid #174545", width: "223px" }}>
                    <div className="card mb-0 card-price">
                      <div className="card-header py-3 crown">
                        <h4 className="my-0 fw-normal">{t("Prices.fullInspection")}</h4>
                      </div>
                      <div className="card-body card-body-in-gallery-box">
                        <h1 dir="rtl" id="full-price" className="card-title pricing-card-title">
                          {fullPrice}
                          <span dangerouslySetInnerHTML={{ __html: ryalIcon }} />
                        </h1>

                        {saveFullPrice > 0 && (
                          <h3 dir="rtl" style={{ marginTop: "-20px", marginBottom: "12px", fontSize: 16, color: "#d32f2f", textAlign: "center" }}>
                            <span style={{ textDecoration: "line-through" }}>{oldPriceFullPrice}</span> <span dangerouslySetInnerHTML={{ __html: redRyalIcon }} />
                            <span
                              dir="rtl"
                              style={{ textDecoration: "none", color: "#25d366", backgroundColor: "#dff1d9", marginRight: 6, padding: "0 5px", borderRadius: 2, fontSize: 16 }}
                            >
                              {t("Prices.save")} {saveFullPrice} <span dangerouslySetInnerHTML={{ __html: greenRyalIcon }} />
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
                      </div>
                    </div>
                  </div>
                )}
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
              <div className="plane-box plans-in-gallery-box" style={{ gap: "0px important" }}>
                {/* سيدان - دفع رباعي - فارهة */}
                <div className="col plane eng-pane dis rounded-3 shadow-sm passenger-plans-catcher" style={{ width: "229px" }}>
                  <div className="card mb-4 card-price eng">
                    <div className="card-header py-3">
                      <h4 className="my-0 fw-normal">
                        {passenger && passenger === "sedan" && t("Prices.sedan")}
                        {passenger && passenger === "suv" && t("Prices.suv")}
                        {passenger && passenger === "luxury" && t("Prices.luxury")}
                      </h4>
                    </div>

                    <div className="card-body card-body-in-gallery-box">
                      <h1 dir="rtl" id="engain-price" className="card-title pricing-card-title">
                        {passenger && passenger === "sedan" && Math.floor(passengerPlanePrices?.data[2]?.price || 0)}
                        {passenger && passenger === "suv" && Math.floor(passengerPlanePrices?.data[1]?.price || 0)}
                        {passenger && passenger === "luxury" && Math.floor(passengerPlanePrices?.data[0]?.price || 0)}
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
                            {Math.floor(passengerPlanePrices?.data?.[passenger === "luxury" ? 0 : passenger === "suv" ? 1 : 2]?.original_price || 0)}
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
                            {t("Prices.save")} {Math.floor(passengerPlanePrices?.data?.[passenger === "luxury" ? 0 : passenger === "suv" ? 1 : 2]?.you_save || 0)}{" "}
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Box>
      )}
    </div>
  );
}
