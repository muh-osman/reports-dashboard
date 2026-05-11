import style from "./PayMojaz.module.scss";
import { useEffect, useState, useRef } from "react";
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
import { Box, Stepper, Step, StepLabel } from "@mui/material";
// Cookies
import { useCookies } from "react-cookie";
// API
import { useGetAllCardsApi } from "../../API/useGetAllCardsApi";

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
const steps = ["بيانات المركبة", "الدفع", "تحميل التقرير"];

export default function PayMojaz() {
  const { data: cardsData, fetchStatus: fetchCardStatus } = useGetAllCardsApi();

  const branchNameAr = useRef(null);

  useEffect(() => {
    if (cardsData && cardsData?.length > 0 && fetchCardStatus === "idle") {
      let lastCard = cardsData?.length > 0 ? cardsData[cardsData.length - 1] : null;

      branchNameAr.current = lastCard?.branchNameAr ?? null;
    }
  }, [cardsData]);

  //
  const [activeStep, setActiveStep] = useState(1);
  //
  useEffect(() => {
    // Scroll to the top of the page
    window.scrollTo(0, 0);
  }, []);

  // Cookies
  const [cookies, setCookie] = useCookies(["tokenApp", "username", "userId", "phoneNumber"]);
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
  const lookupType = searchParams.get("lookup_type");
  const lookupValue = searchParams.get("lookup_value");
  //   const name = searchParams.get("name");
  //   const phone = searchParams.get("phone");
  //   const userId = searchParams.get("user_id");
  const name = cookies.username;
  const phone = cookies.phoneNumber;
  const userId = cookies.userId?.toString();

  //   console.log(lookupType);
  //   console.log(lookupValue);
  //   console.log(name);
  //   console.log(phone);
  //   console.log(userId);

  //
  const [expanded, setExpanded] = useState("panel3");
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  //

  // Moyasar
  useEffect(() => {
    // Initialize Moyasar after script loads
    if (window.Moyasar) {
      window.Moyasar.init({
        element: ".mysr-form",
        amount: 119 * 100,
        currency: "SAR",
        language: languageText === "ar" ? "ar" : "en",
        description: "Cashif for car inspection (Mojaz report)",
        publishable_api_key: window.location.hostname === "localhost" ? process.env.REACT_APP_SHIPPING_MOYASAR_TEST_KEY : process.env.REACT_APP_SHIPPING_MOYASAR_LIVE_KEY,
        callback_url: `${window.location.origin}${process.env.PUBLIC_URL}/pay-mojaz/thanks`,
        supported_networks: ["visa", "mastercard", "mada"],
        methods: ["creditcard", "applepay"],

        apple_pay: {
          country: "SA",
          label: "Cashif for car inspection",
          validate_merchant_url: "https://api.moyasar.com/v1/applepay/initiate",
        },

        metadata: {
          lookupType: lookupType,
          lookupValue: lookupValue,
          name: name,
          phone: phone,
          userId: userId,
          price: 119,
          email: branchNameAr?.current || null,
        },

        on_failure: async function (error) {
          console.log(error);
        },

        on_initiating: async function () {
          console.log({
            lookupType: lookupType,
            lookupValue: lookupValue,
            name: name,
            phone: phone,
            userId: userId,
            price: 119,
            email: branchNameAr?.current || null,
          });

          // Update the data
          return {
            amount: 119 * 100,
            metadata: {
              lookupType: lookupType,
              lookupValue: lookupValue,
              name: name,
              phone: phone,
              userId: userId,
              price: 119,
              email: branchNameAr?.current || null,
            },
          };
        },
      });
    }
  }, [languageText, lookupType, lookupValue, name, phone, userId, cardsData]);

  return (
    <div className={style.container} dir={languageText === "ar" ? "rtl" : "ltr"}>
      <Box className={style.card} style={{ marginBottom: "16px" }}>
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          sx={{
            direction: "rtl",
            // Target the root container
            "&.MuiStepper-alternativeLabel": {
              direction: "rtl",
            },
            // Target the connector lines specifically
            "& .MuiStepConnector-root": {
              left: "calc(50% + 20px) !important",
              right: "calc(-50% + 20px) !important",
            },
            "& .MuiStepConnector-alternativeLabel": {
              left: "calc(50% + 20px) !important",
              right: "calc(-50% + 20px) !important",
            },
            "& .MuiStepConnector-line": {
              transform: "scaleX(-1)", // Flip the line horizontally
            },
          }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      <div className={style.pay_box}>
        <h3>{t("PayShipping.details")}</h3>

        <div className={style.details_order_table}>
          <div>
            <p>نوع التقرير</p>
            <p>موجز</p>
          </div>
          <div>
            <p>{lookupType === "sequence" ? "رقم التسلسلي" : "رقم الهيكل"}</p>
            <p>{lookupValue}</p>
          </div>

          <div style={{ borderBottom: "none", paddingBottom: 0 }}>
            <p></p>
            <h4 style={{ fontWeight: "bold" }}>
              <span>{t("PayShipping.total")}</span>
              <span style={{ fontSize: "20px" }}>119</span>
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
        {/* Moyasar Form */}
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
            <div className="mysr-form"></div>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
}
