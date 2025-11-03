import style from "./PayShipping.module.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// Lang
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";
// MUI
import { styled } from "@mui/material/styles";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary, { accordionSummaryClasses } from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { Backdrop, CircularProgress, Modal, Button } from "@mui/material";
// Image
// import tamaraLogo from "../../Assets/Images/tamara-logo.svg";
// import tabbyLogo from "../../Assets/Images/tabby.png";
// API
import useGetOneCardDataApi from "../../API/useGetOneCardDataApi";
// JSON
import carData from "../Shippings/data.json";
// Cookies
import { useCookies } from "react-cookie";

const Accordion = styled((props) => <MuiAccordion disableGutters elevation={0} square {...props} />)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderLeft: "none",
  borderRight: "none",
  borderTop: "none",
  "&:last-child": {
    borderBottom: 0,
    // backgroundColor: "red"
  },
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => <MuiAccordionSummary expandIcon={<ArrowBackIosNewIcon sx={{ fontSize: "0.9rem" }} />} {...props} />)(({ theme }) => ({
  // backgroundColor: "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  padding: "0px !important",
  [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]: {
    transform: "rotate(-90deg)",
  },
  [`& .${accordionSummaryClasses.content}`]: {
    marginLeft: theme.spacing(1),
  },
  ...theme.applyStyles("dark", {
    backgroundColor: "rgba(255, 255, 255, .05)",
  }),
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  // borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

//
function getCarModelCategory(model) {
  if (!model) return null;

  const normalizedModel = model.toLowerCase().trim();

  if (carData.low_models.some((lowModel) => lowModel.toLowerCase().trim() === normalizedModel)) {
    return "Low";
  }

  if (carData.medium_models.some((mediumModel) => mediumModel.toLowerCase().trim() === normalizedModel)) {
    return "Medium";
  }

  if (carData.high_models.some((highModel) => highModel.toLowerCase().trim() === normalizedModel)) {
    return "High";
  }

  return null; // Model not found
}

export default function PayShipping() {
  //
  useEffect(() => {
    // Scroll to the top of the page
    window.scrollTo(0, 0);
  }, []);
  // Cookies
  const [cookies, setCookie] = useCookies(["tokenApp"]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!cookies.tokenApp) {
      navigate(`${process.env.PUBLIC_URL}/login`, { replace: true });
    }
  }, []);

  // Lang
  const { t } = useTranslation();
  const [languageText, setLanguageText] = useState(i18n.language);
  // Add language change listener
  useEffect(() => {
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
  // Get search params from current URL
  const searchParams = new URLSearchParams(window.location.search);

  // Get individual parameters
  const reportNumber = searchParams.get("report_number");
  // const model = searchParams.get("model");
  // const modelCategory = searchParams.get("model_category");
  // const plateNumber = searchParams.get("plate_number");
  // const from = searchParams.get("from");
  const to = searchParams.get("to");
  const shippingType = searchParams.get("shipping_type");
  // const price = searchParams.get("price");

  const [price, setPrice] = useState(null);

  // Get the id (report number) from the URL
  const { data: oneCardData, isLoading: isFetchDataLoading, isSuccess: isFetchDataSuccess } = useGetOneCardDataApi(reportNumber);

  //
  const [expanded, setExpanded] = useState("panel3");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  //
  const [isTamaraBtnLoading, setIsTamaraBtnLoading] = useState(false);
  const [isTabbyLoading, setIsTabbyBtnLoading] = useState(false);

  // const handleClickTamaraBtn = () => {
  //   setIsTamaraBtnLoading(true);
  // };
  // const handleClickTabbyBtn = () => {
  //   setIsTabbyBtnLoading(true);
  // };

  //
  const [modelCategory, setModelCategory] = useState(null); // Low, Medium, High or null (if model not exist in json file)
  // State for loading data overlay
  const [showOverlay, setShowOverlay] = useState(true);
  const [overlayMessage, setOverlayMessage] = useState("");
  useEffect(() => {
    if (isFetchDataLoading) {
      setShowOverlay(true);
      setOverlayMessage("");
    } else if (isFetchDataSuccess) {
      let category = getCarModelCategory(oneCardData?.carModelNameAr);
      if (category) {
        setModelCategory(category);
        setShowOverlay(false);
        setOverlayMessage("");
      } else {
        setShowOverlay(true);
        // هذا الخطأ سيظهر في حال موديل السيارة غير موجود في ملف الـ (JSON)
        setOverlayMessage(`خطأ في تحميل بيانات: ${oneCardData?.carModelNameAr}`);
      }
    } else {
      setShowOverlay(true);
      setOverlayMessage("خطأ في الشبكة");
    }
  }, [isFetchDataLoading, isFetchDataSuccess]);

  // Price calculation function
  function calculateShippingPrice(fromCity, modelCategory, toCity, shippingType) {
    // Validate inputs
    if (!fromCity || !modelCategory || !toCity || !shippingType) {
      return null;
    }

    // Get the price data for the from city
    const cityData = carData.from[fromCity === "القادسية" || fromCity === "الشفا" ? "الرياض" : fromCity];
    if (!cityData) {
      return null;
    }

    // Get the category data (Low, Medium, High)
    const categoryData = cityData[modelCategory];
    if (!categoryData) {
      return null;
    }

    // Get prices based on shipping type
    let price;

    if (modelCategory === "Low") {
      // Low category has both public and private options
      if (shippingType === "نقل عام") {
        price = categoryData.prices.public[toCity];
      } else if (shippingType === "سطحة خاصة") {
        price = categoryData.prices.private[toCity];
      } else {
        return null;
      }
    } else {
      // Medium and High categories only have heavy option
      if (shippingType === "نقل ثقيل") {
        price = categoryData.prices.heavy[toCity];
      } else {
        return null;
      }
    }

    // Return the price (could be a number or 99999 for unavailable routes)
    return price;
  }

  useEffect(() => {
    if (oneCardData?.branchNameAr && modelCategory && to && shippingType) {
      // console.log(oneCardData?.branchNameAr);
      // console.log(modelCategory);
      // console.log(to);
      // console.log(shippingType);
      setPrice(calculateShippingPrice(oneCardData?.branchNameAr, modelCategory, to, shippingType));
    }
  }, [modelCategory, to, shippingType]);

  // Moyasar
  useEffect(() => {
    // Initialize Moyasar after script loads
    if (price && window.Moyasar) {
      window.Moyasar.init({
        element: ".mysr-form",
        amount: price * 100,
        currency: "SAR",
        language: languageText === "ar" ? "ar" : "en",
        description: "Cashif for car inspection",
        publishable_api_key: "My_PK",
        callback_url: `${window.location.origin}${process.env.PUBLIC_URL}/pay/shipping/thanks`,
        supported_networks: ["visa", "mastercard", "mada"],
        methods: ["creditcard", "applepay"],

        apple_pay: {
          country: "SA",
          label: "Cashif for car inspection",
          validate_merchant_url: "https://api.moyasar.com/v1/applepay/initiate",
        },

        metadata: {
          name: oneCardData?.clientName,
          reportNumber: reportNumber,
          model: oneCardData?.carModelNameAr,
          modelCategory: modelCategory,
          plateNumber: oneCardData?.plateNumber,
          from: oneCardData?.branchNameAr,
          to: to,
          shippingType: shippingType,
          price: price,
          phoneNumber: oneCardData?.clientPhoneNumber,
        },

        on_failure: async function (error) {
          console.log(error);
        },
      });
    }

    return () => {
      // Clean up Moyasar form when component unmounts
      const formElement = document.querySelector(".mysr-form");
      if (formElement) {
        formElement.innerHTML = "";
      }
    };
  }, [price, languageText, oneCardData, reportNumber, modelCategory, to, shippingType]);

  return (
    <div className={style.container} dir={languageText === "ar" ? "rtl" : "ltr"}>
      {/* Overlay with MUI Spinner */}
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          flexDirection: "column",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
        }}
        open={showOverlay}
      >
        {isFetchDataLoading && (
          <>
            <CircularProgress color="inherit" />
            <Typography dir={languageText === "ar" ? "rtl" : "ltr"} variant="h6" sx={{ mt: 2 }}>
              {t("PayShipping.loading")}
            </Typography>
          </>
        )}

        {overlayMessage && (
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            {overlayMessage}
          </Typography>
        )}
      </Backdrop>

      <div className={style.pay_box}>
        <h3>{t("PayShipping.details")}</h3>

        <div className={style.details_order_table}>
          <div>
            <p>{t("PayShipping.model")}</p>
            <p>{languageText === "ar" ? oneCardData?.carModelNameAr : oneCardData?.carModelNameEn}</p>
          </div>
          <div>
            <p>{t("PayShipping.plateId")}</p>
            <p>{oneCardData?.plateNumber}</p>
          </div>
          <div>
            <p>{t("PayShipping.from")}</p>
            <p>{languageText === "ar" ? oneCardData?.branchNameAr : oneCardData?.branchNameEn}</p>
          </div>
          <div>
            <p>{t("PayShipping.to")}</p>
            <p>{to}</p>
          </div>
          <div>
            <p>{t("PayShipping.shippingType")}</p>
            <p>{shippingType}</p>
          </div>
          <div style={{ borderBottom: "none", paddingBottom: 0 }}>
            <p></p>
            <h4 style={{ fontWeight: "bold" }}>
              <span>{t("PayShipping.total")}</span>
              <span style={{ fontSize: "20px" }}>{price}</span>
              <span>
                <svg fill="#000000de" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1124.14 1256.39">
                  <path d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z" />
                  <path d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z" />
                </svg>
              </span>
            </h4>
          </div>
        </div>
      </div>

      <div className={style.payment_methods_box}>
        {/* <Accordion expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
          <AccordionSummary
            aria-controls="panel1d-content"
            id="panel1d-header"
            sx={{
              gap: "8px",
            }}
          >
            <Typography component="h5">
              <span style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                <span style={{ display: "flex" }}>
                  <img src={tamaraLogo} alt="tamara" />
                </span>
                <span style={{ fontWeight: "700" }}>قسمها على 4 دفعات</span>
              </span>
              <span style={{ display: "inline-block", color: "#747a79", fontSize: "12px" }}>بدون رسوم تأخير، متوافقة مع الشريعة الإسلامية</span>
            </Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: "8px 0px 16px" }}>
            <LoadingButton
              style={{ width: "100%", backgroundColor: "#6a00cb", fontWeight: "700", color: isTamaraBtnLoading ? "#6a00cb" : "#fff" }}
              variant="contained"
              size="large"
              onClick={handleClickTamaraBtn}
              loading={isTamaraBtnLoading}
              disabled={isTamaraBtnLoading}
            >
              تأكيد الطلب
            </LoadingButton>
          </AccordionDetails>
        </Accordion> */}

        {/* <Accordion expanded={expanded === "panel2"} onChange={handleChange("panel2")}>
          <AccordionSummary
            aria-controls="panel2d-content"
            id="panel2d-header"
            sx={{
              gap: "8px",
            }}
          >
            <Typography component="h5">
              <span style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                <span style={{ display: "flex" }}>
                  <img style={{ width: "74px" }} src={tabbyLogo} alt="tamara" />
                </span>
                <span style={{ fontWeight: "700" }}>قسمها على 4 دفعات</span>
              </span>
              <span style={{ display: "inline-block", color: "#747a79", fontSize: "12px" }}>بدون أي فوائد، أو رسوم</span>
            </Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: "8px 0px 16px" }}>
            <LoadingButton
              style={{ width: "100%", backgroundColor: "#3bffc6", fontWeight: "700", color: isTabbyLoading ? "#3bffc6" : "#000000de" }}
              variant="contained"
              size="large"
              onClick={handleClickTabbyBtn}
              loading={isTabbyLoading}
              disabled={isTabbyLoading}
            >
              تأكيد الطلب
            </LoadingButton>
          </AccordionDetails>
        </Accordion> */}

        <Accordion expanded={expanded === "panel3"} onChange={handleChange("panel3")}>
          <AccordionSummary
            aria-controls="panel3d-content"
            id="panel3d-header"
            sx={{
              gap: "8px",
            }}
          >
            <Typography component="h5">
              <span style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                <span style={{ fontWeight: "700" }}>{t("PayShipping.ePayment")}</span>
              </span>
              <span style={{ display: "inline-block", color: "#747a79", fontSize: "12px" }}>{t("PayShipping.payWithMadaMasterAndVisa")}</span>
            </Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: "8px 0px 16px" }}>
            {/* Moyasar Form */}
            <div className="mysr-form"></div>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
}
