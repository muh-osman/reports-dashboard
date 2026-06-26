import style from "./StaticPlans.module.scss";
import { useLocation } from "react-router-dom";
import * as React from "react";

// MUI
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
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

// MUI Icons
import CheckIcon from "@mui/icons-material/Check";

// Lang
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";

// Toastify
import { toast } from "react-toastify";

// API (Only keeping Passenger API as requested)
import useGetPassengerServicesPricesApi from "../../API/useGetPassengerServicesPricesApi";

// Static Data Import (Adjust the path to your JSON file location)
import carData from "./carData.json";

// Images
import A from "../../Assets/Images/1.jpg";
import B from "../../Assets/Images/2.jpg";
import C from "../../Assets/Images/3.jpg";

const TrueIcon = `<svg fill="#25d366" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" /></svg>`;
const FalseIcon = `<svg class="wrong-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"></path></svg>`;
const ryalIcon = `<svg fill="#174545" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1124.14 1256.39"><path d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z" /><path d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z" /></svg>`;
const redRyalIcon = `<svg width="13" fill="#d32f2f" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1124.14 1256.39"><path d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z" /><path d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z" /></svg>`;
const greenRyalIcon = `<svg width="13" fill="#25d366" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1124.14 1256.39"><path d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z" /><path d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z" /></svg>`;

export default function StaticPlans() {
  const autoCompleteInputRef = React.useRef(null);
  const searchBtn = React.useRef(null);
  const overlay = React.useRef(null);
  const passengerOverlay = React.useRef(null);

  const { t } = useTranslation();
  const [languageText, setLanguageText] = React.useState(i18n.language);

  // States for filter conditions
  const [selectedModelId, setSelectedModelId] = React.useState(null);
  const [selectedYear, setSelectedYear] = React.useState("");
  const [prices, setPrices] = React.useState([]);
  const [isSearching, setIsSearching] = React.useState(false);
  const [hasSearched, setHasSearched] = React.useState(false);

  // Derive unique models from static JSON
  const models = React.useMemo(() => {
    const unique = [];
    const maps = new Set();
    carData.forEach((item) => {
      if (!maps.has(item.carMarkId)) {
        maps.add(item.carMarkId);
        unique.push({
          id: item.carMarkId,
          nameAr: item.carMarkAr.trim(),
          nameEn: item.carMarkEn.trim(),
        });
      }
    });
    return unique;
  }, []);

  // Passenger state configuration
  const { data: passengerPlanePrices } = useGetPassengerServicesPricesApi();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [checkit] = React.useState(queryParams.get("checkit") === "true");
  const [passengerCheck] = React.useState(queryParams.get("passengerCheck") === "true");
  const [passenger, setPassenger] = React.useState(null);
  const [dis] = React.useState(queryParams.get("dis") === "fifty" || sessionStorage.getItem("dis") === "fifty");

  // Price tracking state variables
  const [fullPrice, setFullPrice] = React.useState(0);
  const [basicPrice, setBasicPrice] = React.useState(0);
  const [engainPrice, setEngainPrice] = React.useState(0);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  React.useEffect(() => {
    const handleLanguageChange = (lng) => setLanguageText(lng);
    i18n.on("languageChanged", handleLanguageChange);
    return () => i18n.off("languageChanged", handleLanguageChange);
  }, []);

  const handleModelChange = (event, newValue) => {
    if (newValue) {
      setSelectedModelId(newValue.id);
    } else {
      setSelectedModelId(null);
    }
    if (autoCompleteInputRef.current) {
      autoCompleteInputRef.current.blur();
    }
  };

  // Local static file submission filter
  const handleSubmit = () => {
    if (selectedModelId && selectedYear) {
      setIsSearching(true);
      const chosenYear = Number(selectedYear);

      // Match item using parameters from the structural schema
      const matches = carData.filter((item) => item.carMarkId === selectedModelId && chosenYear >= item.fromYear && chosenYear <= item.toYear);

      setPrices(matches);
      setHasSearched(true);
      setIsSearching(false);
    } else {
      toast.warn(t("Prices.pleaseSelectModelAndYear"));
    }
  };

  // Extract prices when state changes
  React.useEffect(() => {
    if (!prices || prices.length === 0) {
      setFullPrice(0);
      setBasicPrice(0);
      setEngainPrice(0);
      return;
    }

    const full = prices.find((p) => p.serviceId === 8);
    const basic = prices.find((p) => p.serviceId === 9);
    const engine = prices.find((p) => p.serviceId === 10);

    setFullPrice(Math.floor(full?.price ?? 0));
    setBasicPrice(Math.floor(basic?.price ?? 0));
    setEngainPrice(Math.floor(engine?.price ?? 0));
  }, [prices]);

  // Adjust standard layout visibility upon successful search results matching
  React.useEffect(() => {
    if (hasSearched && prices && prices.length > 0) {
      overlay.current.style.gridTemplateRows = "1fr";
      setTimeout(() => {
        searchBtn.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      }, 100);
    } else if (overlay.current) {
      overlay.current.style.gridTemplateRows = "0fr";
    }
  }, [prices, hasSearched]);

  React.useEffect(() => {
    if (passenger && passengerCheck && passengerOverlay.current) {
      passengerOverlay.current.style.gridTemplateRows = "1fr";
    }
  }, [passenger, passengerCheck]);

  const handleCarTypesChange = (option) => {
    setPassenger(option);
  };

  const carTypes = [
    { value: "luxury", label: t("Prices.luxury"), image: C },
    { value: "suv", label: t("Prices.suv"), image: B },
    { value: "sedan", label: t("Prices.sedan"), image: A },
  ];

  // Dynamic injection layout adjustments setup
  React.useEffect(() => {
    const styleElement = document.createElement("style");
    const discountPercent = passengerPlanePrices?.data?.[passenger === "luxury" ? 0 : passenger === "suv" ? 1 : 2]?.discount_percent ?? "0";
    const content = languageText === "ar" ? `خصم ${discountPercent}%` : `${discountPercent}% Off`;
    const leftRight = languageText === "ar" ? "left: -50px; right: unset; transform: rotate(315deg);" : "right: -50px; left: unset; transform: rotate(45deg);";

    styleElement.innerHTML = `
      .full-Plane-catcher::after, .engines-catcher::after, .bascic-catcher::after, .passenger-plans-catcher::after { ${leftRight} }
      .full-Plane-catcher::after, .bascic-catcher::after, .engines-catcher::after { content: none; }
      .passenger-plans-catcher::after { ${discountPercent == 0 ? "content: none;" : `content: "${content}";`} }
    `;
    document.head.appendChild(styleElement);
    return () => styleElement.remove();
  }, [languageText, passenger, passengerPlanePrices]);

  const ChecklistItem = ({ checked, text, tooltip }) => (
    <li style={{ textAlign: languageText === "ar" ? "right" : "left" }}>
      <span style={{ [languageText === "ar" ? "marginLeft" : "marginRight"]: "6px" }} dangerouslySetInnerHTML={{ __html: checked ? TrueIcon : FalseIcon }} />
      {text}
      <Tooltip title={<p style={{ direction: "rtl" }}>{tooltip}</p>} arrow enterTouchDelay={0}>
        <IconButton>
          <InfoIcon sx={{ fontSize: "16px" }} />
        </IconButton>
      </Tooltip>
    </li>
  );

  const PassengerChecklistItem = ({ checked, text, tooltip }) => (
    <li style={{ textAlign: languageText === "ar" ? "right" : "left" }}>
      <span style={{ [languageText === "ar" ? "marginLeft" : "marginRight"]: "6px" }} dangerouslySetInnerHTML={{ __html: checked ? TrueIcon : FalseIcon }} />
      {text}
      <Tooltip title={<p style={{ direction: "rtl" }}>{tooltip}</p>} arrow enterTouchDelay={0}>
        <IconButton>
          <InfoIcon sx={{ fontSize: "16px" }} />
        </IconButton>
      </Tooltip>
    </li>
  );

  const checklistItems = Array.from({ length: 15 }, (_, i) => ({
    text: t(`Prices.checklist.items.${i}.text`),
    tooltip: t(`Prices.checklist.items.${i}.tooltip`),
  }));

  const PassengerchecklistItems = Array.from({ length: 16 }, (_, i) => ({
    text: t(`Prices.passengerChecklist.items.${i}.text`),
    tooltip: t(`Prices.passengerChecklist.items.${i}.tooltip`),
  }));

  return (
    <div className={style.container}>
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

      {!passengerCheck && (
        <div className={style.box}>
          <Autocomplete
            dir={languageText === "ar" ? "rtl" : "ltr"}
            sx={{ backgroundColor: "#fff" }}
            disablePortal
            onChange={handleModelChange}
            options={models}
            getOptionLabel={(option) => `${option.nameAr} - ${option.nameEn}`}
            renderInput={(params) => <TextField {...params} label={t("Prices.search")} inputRef={autoCompleteInputRef} />}
            renderOption={(props, option) => (
              <li dir={languageText === "ar" ? "rtl" : "ltr"} {...props} key={option.id}>
                <span>
                  {option.nameAr} - {option.nameEn}
                </span>
              </li>
            )}
            filterOptions={(options, { inputValue }) => {
              const lower = inputValue.toLowerCase();
              return options.filter((option) => option.nameAr?.includes(inputValue) || option.nameEn?.toLowerCase().includes(lower));
            }}
            noOptionsText={
              <div dir={languageText === "ar" ? "rtl" : "ltr"} style={{ padding: "8px 16px", textAlign: "center" }}>
                {t("Prices.CarModelNotAvailableContactUs")}
              </div>
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

          <Box ref={searchBtn} sx={{ marginTop: "32px", textAlign: "center" }}>
            <IconButton size="large" onClick={handleSubmit} disabled={isSearching} className={style.search_btn}>
              {isSearching ? <CircularProgress size={46} /> : <SearchIcon sx={{ fontSize: "46px", color: "#174545" }} />}
            </IconButton>
          </Box>
        </div>
      )}

      {!passengerCheck && (
        <Box dir={languageText === "ar" ? "rtl" : "ltr"}>
          <div className="overlay" ref={overlay} style={{ marginBottom: "32px" }}>
            <div>
              <div className="title-box">
                <h2>{t("Prices.chooseTheRightPackage")}</h2>
              </div>
              <div className="plane-box">
                {/* Engines Inspection */}
                {engainPrice !== 0 && (
                  <div className="col plane eng-pane dis rounded-3 shadow-sm engines-catcher">
                    <div className="card mb-4 card-price eng">
                      <div className="card-header py-3">
                        <h4 className="my-0 fw-normal">{t("Prices.engines")}</h4>
                      </div>
                      <div className="card-body">
                        <h1 dir="rtl" className="card-title pricing-card-title">
                          {engainPrice}
                          <span dangerouslySetInnerHTML={{ __html: ryalIcon }} />
                        </h1>

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
                      </div>
                    </div>
                  </div>
                )}

                {/* Basic Inspection */}
                {basicPrice !== 0 && (
                  <div className="col plane main-plane dis rounded-3 shadow-sm bascic-catcher">
                    <div className="card mb-4 card-price">
                      <div className="card-header py-3">
                        <h4 className="my-0 fw-normal">{t("Prices.basic")}</h4>
                      </div>
                      <div className="card-body">
                        <h1 dir="rtl" className="card-title pricing-card-title">
                          {basicPrice}
                          <span dangerouslySetInnerHTML={{ __html: ryalIcon }} />
                        </h1>

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
                      </div>
                    </div>
                  </div>
                )}

                {/* Full Inspection */}
                {fullPrice !== 0 && (
                  <div className="col plane crown-box full-pane dis rounded-3 shadow-sm full-Plane-catcher" style={{ border: "2px solid #174545" }}>
                    <div className="card mb-0 card-price">
                      <div className="card-header py-3 crown">
                        <h4 className="my-0 fw-normal">{t("Prices.fullInspection")}</h4>
                      </div>
                      <div className="card-body">
                        <h1 dir="rtl" className="card-title pricing-card-title">
                          {fullPrice}
                          <span dangerouslySetInnerHTML={{ __html: ryalIcon }} />
                        </h1>

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
                            <ChecklistItem key={index} checked={true} text={item.text} tooltip={item.tooltip} />
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

      {passengerCheck && (
        <Box dir={languageText === "ar" ? "rtl" : "ltr"}>
          <div className="overlay" ref={passengerOverlay}>
            <div>
              <div className="title-box">
                <h2>{t("Prices.chooseThePackage")}</h2>
              </div>
              <div className="plane-box">
                <div className="col plane eng-pane dis rounded-3 shadow-sm passenger-plans-catcher">
                  <div className="card mb-4 card-price eng">
                    <div className="card-header py-3">
                      <h4 className="my-0 fw-normal">
                        {passenger === "sedan" && t("Prices.sedan")}
                        {passenger === "suv" && t("Prices.suv")}
                        {passenger === "luxury" && t("Prices.luxury")}
                      </h4>
                    </div>

                    <div className="card-body">
                      <h1 dir="rtl" className="card-title pricing-card-title">
                        {passenger === "sedan" && Math.floor(passengerPlanePrices?.data?.price || 0)}
                        {passenger === "suv" && Math.floor(passengerPlanePrices?.data?.price || 0)}
                        {passenger === "luxury" && Math.floor(passengerPlanePrices?.data?.price || 0)}
                        <span dangerouslySetInnerHTML={{ __html: ryalIcon }} />
                      </h1>

                      <h5>{t("Prices.includesExamination")}:</h5>
                      <ul className="list-unstyled mt-3 mb-4">
                        {PassengerchecklistItems.map((item, index) => (
                          <PassengerChecklistItem key={index} checked={true} text={item.text} tooltip={item.tooltip} />
                        ))}
                      </ul>

                      {passengerPlanePrices && (
                        <a
                          aria-label="Ask now Button"
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
    </div>
  );
}
