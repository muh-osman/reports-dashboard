import style from "./Plans.module.scss";
// MUI
import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import SearchIcon from "@mui/icons-material/Search";
import { CircularProgress } from "@mui/material";
import Chip from "@mui/material/Chip";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
// MUI Icons
import CheckIcon from "@mui/icons-material/Check";
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

const TrueIcon = `<svg fill="#25d366" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" /></svg>`;
const FalseIcon = `<svg class="wrong-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"></path></svg>`;
const ryalIcon = `<svg fill="#174545" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1124.14 1256.39"><path d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z" /><path d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z" /></svg>`;
const redRyalIcon = `<svg width="13" fill="#d32f2f" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1124.14 1256.39"><path d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z" /><path d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z" /></svg>`;
const greenRyalIcon = `<svg width="13" fill="#25d366" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1124.14 1256.39"><path d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z" /><path d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z" /></svg>`;

// MERGE: Plans is now a *controlled* component. It no longer reads its own
// query params or owns `passenger` state — the parent (Prices) owns which
// service is selected and which car type (for the passenger flow) is picked,
// and passes them in as props. This lets Prices decide when to scroll.
const Plans = React.forwardRef(function Plans({ selectedService, passengerCarType, onCarTypeSelect }, ref) {
  // مرتاح Modal
  const [openComfortModal, setOpenComfortModal] = React.useState(false);
  const [selectedPlanUrl, setSelectedPlanUrl] = React.useState("");

  const handleOpenComfortModal = (url) => {
    // Friday => skip modal
    if (isFriday) {
      // if (true) {
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

  // MERGE: which service is active now comes from the parent as a prop
  // instead of being read from the URL here.
  // الفحص العادي
  const isSelectPurchaseService = selectedService === "purchaseInspection";
  // مخدوم
  const checkit = selectedService === "checkit";
  // فحص المسافر
  const passengerCheck = selectedService === "passengerCheck";
  // نوع السيارة (سيدان - دفع رباعي - فارهة) — now controlled by the parent
  const passenger = passengerCarType;

  // URL Discount
  const [dis, setDis] = React.useState(sessionStorage.getItem("dis") === "fifty");

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
    { text: t("Prices.checklist.items.0.text"), tooltip: t("Prices.checklist.items.0.tooltip") },
    { text: t("Prices.checklist.items.1.text"), tooltip: t("Prices.checklist.items.1.tooltip") },
    { text: t("Prices.checklist.items.2.text"), tooltip: t("Prices.checklist.items.2.tooltip") },
    { text: t("Prices.checklist.items.3.text"), tooltip: t("Prices.checklist.items.3.tooltip") },
    { text: t("Prices.checklist.items.4.text"), tooltip: t("Prices.checklist.items.4.tooltip") },
    { text: t("Prices.checklist.items.5.text"), tooltip: t("Prices.checklist.items.5.tooltip") },
    { text: t("Prices.checklist.items.6.text"), tooltip: t("Prices.checklist.items.6.tooltip") },
    { text: t("Prices.checklist.items.7.text"), tooltip: t("Prices.checklist.items.7.tooltip") },
    { text: t("Prices.checklist.items.8.text"), tooltip: t("Prices.checklist.items.8.tooltip") },
    { text: t("Prices.checklist.items.9.text"), tooltip: t("Prices.checklist.items.9.tooltip") },
    { text: t("Prices.checklist.items.10.text"), tooltip: t("Prices.checklist.items.10.tooltip") },
    { text: t("Prices.checklist.items.11.text"), tooltip: t("Prices.checklist.items.11.tooltip") },
    { text: t("Prices.checklist.items.12.text"), tooltip: t("Prices.checklist.items.12.tooltip") },
    { text: t("Prices.checklist.items.13.text"), tooltip: t("Prices.checklist.items.13.tooltip") },
    { text: t("Prices.checklist.items.14.text"), tooltip: t("Prices.checklist.items.14.tooltip") },
  ];
  // Create an array of all Passenger checklist (فحص المسافر) items with their tooltips
  const PassengerchecklistItems = [
    { text: t("Prices.passengerChecklist.items.0.text"), tooltip: t("Prices.passengerChecklist.items.0.tooltip") },
    { text: t("Prices.passengerChecklist.items.1.text"), tooltip: t("Prices.passengerChecklist.items.1.tooltip") },
    { text: t("Prices.passengerChecklist.items.2.text"), tooltip: t("Prices.passengerChecklist.items.2.tooltip") },
    { text: t("Prices.passengerChecklist.items.3.text"), tooltip: t("Prices.passengerChecklist.items.3.tooltip") },
    { text: t("Prices.passengerChecklist.items.4.text"), tooltip: t("Prices.passengerChecklist.items.4.tooltip") },
    { text: t("Prices.passengerChecklist.items.5.text"), tooltip: t("Prices.passengerChecklist.items.5.tooltip") },
    { text: t("Prices.passengerChecklist.items.6.text"), tooltip: t("Prices.passengerChecklist.items.6.tooltip") },
    { text: t("Prices.passengerChecklist.items.7.text"), tooltip: t("Prices.passengerChecklist.items.7.tooltip") },
    { text: t("Prices.passengerChecklist.items.8.text"), tooltip: t("Prices.passengerChecklist.items.8.tooltip") },
    { text: t("Prices.passengerChecklist.items.9.text"), tooltip: t("Prices.passengerChecklist.items.9.tooltip") },
    { text: t("Prices.passengerChecklist.items.10.text"), tooltip: t("Prices.passengerChecklist.items.10.tooltip") },
    { text: t("Prices.passengerChecklist.items.11.text"), tooltip: t("Prices.passengerChecklist.items.11.tooltip") },
    { text: t("Prices.passengerChecklist.items.12.text"), tooltip: t("Prices.passengerChecklist.items.12.tooltip") },
    { text: t("Prices.passengerChecklist.items.13.text"), tooltip: t("Prices.passengerChecklist.items.13.tooltip") },
    { text: t("Prices.passengerChecklist.items.14.text"), tooltip: t("Prices.passengerChecklist.items.14.tooltip") },
    { text: t("Prices.passengerChecklist.items.15.text"), tooltip: t("Prices.passengerChecklist.items.15.tooltip") },
  ];

  // Plans Overlay
  const overlay = React.useRef(null);

  //
  const [trigger, setTrigger] = React.useState(false);

  //
  const [selectedModelId, setSelectedModelId] = React.useState(null);
  const handleModelChange = (event, newValue) => {
    if (newValue) {
      setSelectedModelId(newValue.id); // Set the selected model ID
    } else {
      setSelectedModelId(null); // Reset if no model is selected
    }
  };

  // Year
  const [selectedYear, setSelectedYear] = React.useState(""); // State to hold the selected year

  // Get Prices
  const { data: prices, fetchStatus: pricesFetchStatus, isSuccess: isFetchPricesSuccess } = useGetPlanDetailsByYearAndModel(selectedModelId, selectedYear, trigger);

  React.useEffect(() => {
    if (pricesFetchStatus === "idle") {
      setTrigger(false);
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
    const passengerRow = prices.find((p) => p.serviceId === 15);

    setFullPrice(Math.floor(full?.price ?? 0));
    setOldPriceFullPrice(Math.floor(full?.original_price ?? 0));
    setSaveFullPrice(Math.floor(full?.you_save ?? 0));

    setBasicPrice(Math.floor(basic?.price ?? 0));
    setOldPriceBasicPrice(Math.floor(basic?.original_price ?? 0));
    setSaveBasicPrice(Math.floor(basic?.you_save ?? 0));

    setEngainPrice(Math.floor(engine?.price ?? 0));
    setOldPriceEngainPrice(Math.floor(engine?.original_price ?? 0));
    setSaveEngainPrice(Math.floor(engine?.you_save ?? 0));

    setPassengerPrice(Math.floor(passengerRow?.price ?? 0));
    setOldPricePassenger(Math.floor(passengerRow?.original_price ?? 0));
    setSavePassengerPrice(Math.floor(passengerRow?.you_save ?? 0));
  }, [prices]);

  // CSS ribbon badges
  React.useEffect(() => {
    if (!prices || prices.length === 0) return;

    const full = prices.find((p) => p.serviceId === 8) ?? {};
    const basic = prices.find((p) => p.serviceId === 9) ?? {};
    const engine = prices.find((p) => p.serviceId === 10) ?? {};

    const badge = (record) => {
      if (!record.discount_percent || record.discount_percent === 0) return "content: none;";
      const label = languageText === "ar" ? `خصم ${record.discount_percent}${record.discount_unit}` : `${record.discount_percent}${record.discount_unit} Off`;
      return `content: "${label}";`;
    };

    const leftRight = languageText === "ar" ? "left: -50px; right: unset; transform: rotate(315deg);" : "right: -50px; left: unset; transform: rotate(45deg);";

    const styleEl = document.createElement("style");
    styleEl.innerHTML = `
    .full-Plane-catcher::after,
    .engines-catcher::after,
    .bascic-catcher::after,
    .passenger-plans-catcher::after { ${leftRight} }

    .full-Plane-catcher::after       { ${badge(full)}      }
    .bascic-catcher::after           { ${badge(basic)}     }
    .engines-catcher::after          { ${badge(engine)}    }
  `;
    document.head.appendChild(styleEl);
  }, [prices, languageText]);

  //
  const handleSubmit = () => {
    if (selectedModelId && selectedYear) {
      setTrigger(true);
    } else {
      toast.warn(t("Prices.pleaseSelectModelAndYear"));
    }
  };

  //
  const searchBtn = React.useRef(null);
  React.useEffect(() => {
    if (isFetchPricesSuccess && prices && prices?.length > 0 && prices[0]?.carMarkId === selectedModelId) {
      overlay.current.style.gridTemplateRows = "1fr";

      setTimeout(() => {
        searchBtn.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      }, 100);
    } else {
      if (overlay.current) {
        overlay.current.style.gridTemplateRows = "0fr";
      }
    }
  }, [prices]);

  // Show Passenger Card
  const passengerOverlay = React.useRef(null);
  React.useEffect(() => {
    if (passenger && passengerCheck && passengerOverlay.current) {
      passengerOverlay.current.style.gridTemplateRows = "1fr";
    }
  }, [passenger, passengerCheck]);

  // Let the parent (Prices) scroll straight to this card once it's expanded,
  // instead of guessing at Plans' internal layout.
  React.useImperativeHandle(ref, () => ({
    scrollToPassengerPlan: () => {
      passengerOverlay.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    },
  }));

  // MERGE: car type selection is reported up to the parent (Prices), which
  // owns the state and decides when to scroll (after a car type is picked).
  const handleCarTypesChange = (option) => {
    onCarTypeSelect(option);
  };
  const carTypes = [
    { value: "luxury", label: t("Prices.luxury"), image: C },
    { value: "suv", label: t("Prices.suv"), image: B },
    { value: "sedan", label: t("Prices.sedan"), image: A },
  ];

  React.useEffect(() => {
    const styleEl = document.createElement("style");

    const discountPercentForPassngerPlans = passengerPlanePrices?.data?.[passenger === "luxury" ? 0 : passenger === "suv" ? 1 : 2]?.discount_percent ?? "0";

    const content = languageText === "ar" ? `خصم ${discountPercentForPassngerPlans}%` : `${discountPercentForPassngerPlans}% Off`;

    styleEl.innerHTML = `
      .passenger-plans-catcher::after
      {
        left: ${languageText === "ar" ? "-50px" : "unset"};
        right: ${languageText === "ar" ? "unset" : "-50px"};
        transform: ${languageText === "ar" ? "rotate(315deg)" : "rotate(45deg)"};
        ${discountPercentForPassngerPlans == 0 ? "content: none;" : `content: "${content}";`}
      }`;
    document.head.appendChild(styleEl);
  }, [languageText, passenger]);

  return (
    <div className={style.container}>
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
            onChange={(event, newValue) => {
              handleModelChange(event, newValue);
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
            <IconButton size="large" onClick={handleSubmit} disabled={pricesFetchStatus === "fetching"} className={style.search_btn}>
              {pricesFetchStatus === "fetching" ? <CircularProgress size={46} /> : <SearchIcon sx={{ fontSize: "46px", color: "#174545" }} />}
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
                {engainPrice !== 0 && (
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

                        {checkit && (
                          <div dir="ltr" style={{ display: "flex", flexWrap: "wrap", marginTop: "24px", marginBottom: "24px", gap: "12px" }}>
                            <Chip
                              style={{ margin: "auto", backgroundColor: "#f0f1f3" }}
                              icon={<CheckIcon style={{ color: "#25d366" }} />}
                              label={t("Prices.explainedReportInVideo")}
                            />
                          </div>
                        )}

                        <h5>{t("Prices.includesExamination")}:</h5>
                        <ul className="list-unstyled mt-3 mb-4">
                          {checklistItems.map((item, index) => (
                            <ChecklistItem key={index} checked={index < 7} text={item.text} tooltip={item.tooltip} />
                          ))}
                        </ul>

                        <a
                          aria-label="Ask now Button"
                          id="plane-one"
                          className="ask-now"
                          rel="noopener noreferrer"
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();

                            handleOpenComfortModal(
                              `${process.env.PUBLIC_URL}${checkit ? "/pay/makdom-check" : "/pay/purchase-check"}/?plan=${languageText === "ar" ? "محركات" : "Engine"}&year_id=${
                                selectedYear >= 2017 ? 2 : 1
                              }&car_model_id=${selectedModelId}&price_id=10&full_year=${selectedYear}${dis ? "&dis=fifty" : ""}&off=${
                                prices?.find((p) => p.serviceId === 10)?.discount_percent ?? "0"
                              }`
                            );
                          }}
                        >
                          {t("Prices.orderNow")}
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                {/* الأساسي */}
                {basicPrice !== 0 && (
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

                        {checkit && (
                          <div dir="ltr" style={{ display: "flex", flexWrap: "wrap", marginTop: "24px", marginBottom: "24px", gap: "12px" }}>
                            <Chip
                              style={{ margin: "auto", backgroundColor: "#f0f1f3" }}
                              icon={<CheckIcon style={{ color: "#25d366" }} />}
                              label={t("Prices.explainedReportInVideo")}
                            />
                          </div>
                        )}

                        <h5>{t("Prices.includesExamination")}:</h5>
                        <ul className="list-unstyled mt-3 mb-4">
                          {checklistItems.map((item, index) => (
                            <ChecklistItem key={index} checked={index < 9} text={item.text} tooltip={item.tooltip} />
                          ))}
                        </ul>

                        <a
                          aria-label="Ask now Button"
                          id="plane-two"
                          className="ask-now"
                          rel="noopener noreferrer"
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();

                            handleOpenComfortModal(
                              `${process.env.PUBLIC_URL}${checkit ? "/pay/makdom-check" : "/pay/purchase-check"}/?plan=${languageText === "ar" ? "أساسي" : "Basic"}&year_id=${
                                selectedYear >= 2017 ? 2 : 1
                              }&car_model_id=${selectedModelId}&price_id=9&full_year=${selectedYear}${dis ? "&dis=fifty" : ""}&off=${
                                prices?.find((p) => p.serviceId === 9)?.discount_percent ?? "0"
                              }`
                            );
                          }}
                        >
                          {t("Prices.orderNow")}
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                {/* الشامل */}
                {fullPrice !== 0 && (
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

                        {checkit && (
                          <div dir="ltr" style={{ display: "flex", flexWrap: "wrap", marginTop: "24px", marginBottom: "24px", gap: "12px" }}>
                            <Chip
                              style={{ margin: "auto", backgroundColor: "#f0f1f3" }}
                              icon={<CheckIcon style={{ color: "#25d366" }} />}
                              label={t("Prices.explainedReportInVideo")}
                            />
                          </div>
                        )}

                        <h5>{t("Prices.includesExamination")}:</h5>
                        <ul className="list-unstyled mt-3 mb-4">
                          {checklistItems.map((item) => (
                            <ChecklistItem key={item.text} checked={true} text={item.text} tooltip={item.tooltip} />
                          ))}
                        </ul>

                        <a
                          aria-label="Ask now Button"
                          id="plane-three"
                          className="ask-now"
                          rel="noopener noreferrer"
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();

                            handleOpenComfortModal(
                              `${process.env.PUBLIC_URL}${checkit ? "/pay/makdom-check" : "/pay/purchase-check"}/?plan=${
                                languageText === "ar" ? "شامل" : "Full-Inspection"
                              }&year_id=${selectedYear >= 2017 ? 2 : 1}&car_model_id=${selectedModelId}&price_id=8&full_year=${selectedYear}${dis ? "&dis=fifty" : ""}&off=${
                                prices?.find((p) => p.serviceId === 8)?.discount_percent ?? "0"
                              }`
                            );
                          }}
                        >
                          {t("Prices.orderNow")}
                        </a>
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
                        {passenger && passenger === "sedan" && Math.floor(passengerPlanePrices?.data[2]?.price || 0)}
                        {passenger && passenger === "suv" && Math.floor(passengerPlanePrices?.data[1]?.price || 0)}
                        {passenger && passenger === "luxury" && Math.floor(passengerPlanePrices?.data[0]?.price || 0)}
                        <span dangerouslySetInnerHTML={{ __html: ryalIcon }} />
                      </h1>

                      {passengerPlanePrices?.data?.[passenger === "luxury" ? 0 : passenger === "suv" ? 1 : 2]?.discount_percent != 0 && (
                        <h3 dir="rtl" style={{ marginTop: "-20px", marginBottom: "12px", fontSize: 16, color: "#d32f2f", textAlign: "center" }}>
                          <span style={{ textDecoration: "line-through" }}>
                            {Math.floor(passengerPlanePrices?.data?.[passenger === "luxury" ? 0 : passenger === "suv" ? 1 : 2]?.original_price || 0)}
                          </span>{" "}
                          <span>
                            <span dangerouslySetInnerHTML={{ __html: redRyalIcon }} />
                          </span>
                          <span
                            dir="rtl"
                            style={{ textDecoration: "none", color: "#25d366", backgroundColor: "#dff1d9", marginRight: 6, padding: "0 5px", borderRadius: 2, fontSize: 16 }}
                          >
                            {t("Prices.save")} {Math.floor(passengerPlanePrices?.data?.[passenger === "luxury" ? 0 : passenger === "suv" ? 1 : 2]?.you_save || 0)}{" "}
                            <span dangerouslySetInnerHTML={{ __html: greenRyalIcon }} />
                          </span>
                        </h3>
                      )}

                      <h5>{t("Prices.includesExamination")}:</h5>
                      <ul className="list-unstyled mt-3 mb-4">
                        {PassengerchecklistItems.map((item, index) => (
                          <PassengerChecklistItem key={index} checked={true} text={item.text} tooltip={item.tooltip} />
                        ))}
                      </ul>

                      {passengerPlanePrices && (
                        <a
                          aria-label="Ask now Button"
                          id="plane-one"
                          className="ask-now"
                          rel="noopener noreferrer"
                          href={`${process.env.PUBLIC_URL}/pay/passenger-check/?plan=passenger&year_id=1&car_model_id=9&price_id=2${dis ? "&dis=fifty" : ""}${
                            passenger ? `&passenger=${passenger}` : ""
                          }&off=${passengerPlanePrices?.data[passenger === "luxury" ? 0 : passenger === "suv" ? 1 : 2]?.discount_percent || "0"}`}
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

      {/* مرتاح Modal */}
      <Modal open={openComfortModal} onClose={handleCloseComfortModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 350,
            bgcolor: "background.paper",
            borderRadius: 3,
            boxShadow: 24,
            p: 4,
            textAlign: "center",
            direction: languageText === "ar" ? "rtl" : "ltr",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#164544", mb: 2 }}>
            {t("Prices.WouldYouLikeToRequestComfortableService")}
          </Typography>

          <Typography sx={{ color: "#666", mb: 3, fontSize: "14px" }}>
            {t("Prices.WePickUpTheCarFromYourLocationViaFlatbedTruckInspectItAtTheInspectionCenterAndReturnItToTheSameLocation")}
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, justifyContent: "center" }}>
            <Button sx={{ width: "100%" }} variant="outlined" color="inherit" onClick={() => handleContinueOrder("no")}>
              لا
            </Button>

            <Button variant="contained" sx={{ backgroundColor: "#164544", width: "100%" }} onClick={() => handleContinueOrder("yes")}>
              نعم (+345 ريال)
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
});

export default Plans;
