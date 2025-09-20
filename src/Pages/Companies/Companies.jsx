import style from "./Companies.module.scss";
import { useEffect } from "react";
// Mui
import * as React from "react";
import TextField from "@mui/material/TextField";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LoadingButton from "@mui/lab/LoadingButton";
import InputAdornment from "@mui/material/InputAdornment";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Fab from "@mui/material/Fab"; // Add this import for the floating button
import Zoom from "@mui/material/Zoom"; // Add this import for smooth animation
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
// Lang
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";
// API
import { useCreateCompanyAccountApi } from "../../API/useCreateCompanyAccountApi";
// Toastify
import { toast } from "react-toastify";
//
import logo from "../../Assets/Images/logo.webp";

export default function Companies() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const fromUrlParam = searchParams.get("from");
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
  const handleBack = () => {
    // navigate(`${process.env.PUBLIC_URL}/signup`);

    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate(`${process.env.PUBLIC_URL}/signup/${fromUrlParam ? "?from=" + fromUrlParam : ""}`);
    }
  };
  useEffect(() => {
    // Scroll to the top of the page
    window.scrollTo(0, 0);
  }, []);
  // Allow only digits (0-9) and control keys (backspace, delete, etc.)
  const handleKeyPress = (event) => {
    if (!/[0-9]/.test(event.key) && !["Backspace", "Delete", "ArrowLeft", "ArrowRight"].includes(event.key)) {
      event.preventDefault();
    }
  };

  // Handel phone number input
  // Handle past or type num start with 0
  const handlPhoneNumbereChange = (e) => {
    let value = e.target.value;

    // Remove leading '0' if present
    if (value.startsWith("0")) {
      value = value.slice(1);
      toast.warn(t("Companies.noNeedToEnter0ABeginningOfNumber"));
    }

    // Update the input value
    e.target.value = value;
  };

  // handle submit
  const formRef = React.useRef();

  const { mutate, isPending } = useCreateCompanyAccountApi();

  const handleSubmit = (e) => {
    e.preventDefault();
    // required input
    const validate = formRef.current.reportValidity();
    if (!validate) return;

    // check if phone number is 9 characters long
    const phoneNumber = e.currentTarget.elements.phoneNumber.value;

    if (phoneNumber.length < 9 || phoneNumber.length > 9 || isNaN(phoneNumber)) {
      toast.warn(t("Companies.enterValidPhoneNumber"));
      return;
    }

    // Prepend '0' to the phone number
    const formattedPhoneNumber = "0" + phoneNumber;

    // Submit data
    const data = new FormData(e.currentTarget);
    data.set("phoneNumber", formattedPhoneNumber); // Update the phoneNumber in FormData

    // console.log(data.get("name"));
    // console.log(data.get("phoneNumber"));
    // console.log(data.get("address"));
    // console.log(data.get("taxNumber"));
    // console.log(data.get("commerialRecord"));

    mutate(data);
  };

  return (
    <div style={{ backgroundColor: "#f0f1f3" }}>
      <div className={style.header}>
        <div className={style.top_circle_header}>
          <a href="https://cashif.cc/">
            <img src={logo} alt="cashif logo" />
          </a>
          <Tooltip title={t("Companies.back")} className={style.three_dots} onClick={handleBack}>
            <IconButton>
              <ArrowBackIcon sx={{ color: "#fff", fontSize: "32px" }} />
            </IconButton>
          </Tooltip>
        </div>
        <div className={style.introCurve}>
          <svg
            style={{ width: "100%", height: "auto" }}
            viewBox="0 0 1920 74"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 0H1920V0.96521C1920 0.96521 1335.71 74 960 74C584.29 74 0 0.96521 0 0.96521V0Z"
              fill="#174545"
            />
          </svg>
        </div>
      </div>

      <div className={style.container}>
        <Container dir="rtl" component="main" maxWidth="xs" className={style.box}>
          <Typography
            sx={{
              marginTop: "16px",
              // marginBottom: "32px",
              textAlign: "center",
            }}
            component="h1"
            variant="h5"
          >
            {t("Companies.institutionalAccount")}
          </Typography>

          <Box
            sx={{
              borderRadius: "9px",
            }}
          >
            <Box onSubmit={handleSubmit} ref={formRef} component="form" noValidate sx={{ mt: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sx={{ minWidth: { xs: "auto", md: "396px" } }}>
                  <TextField
                    fullWidth
                    label={t("Companies.companyOrInstitutionName")}
                    name="name"
                    type="text"
                    autoFocus
                    required
                    dir="auto"
                    disabled={isPending}
                    InputLabelProps={{
                      className: "custom-label-rtl",
                    }}
                  />
                </Grid>

                <Grid item xs={12} sx={{ minWidth: { xs: "auto", md: "396px" } }}>
                  <TextField
                    fullWidth
                    label={t("Companies.mobileNumber")}
                    name="phoneNumber"
                    type="tel"
                    required
                    dir="ltr"
                    disabled={isPending}
                    onKeyPress={handleKeyPress}
                    onChange={handlPhoneNumbereChange}
                    InputLabelProps={{
                      className: "custom-label-rtl",
                    }}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">+966</InputAdornment>,
                    }}
                    placeholder="5xxxxxxxx"
                  />
                </Grid>

                <Grid item xs={12} sx={{ minWidth: { xs: "auto", md: "396px" } }}>
                  <TextField
                    fullWidth
                    label={t("Companies.companyOrInstitutionAddress")}
                    name="address"
                    type="text"
                    required
                    dir="auto"
                    disabled={isPending}
                    InputLabelProps={{
                      className: "custom-label-rtl",
                    }}
                  />
                </Grid>

                <Grid item xs={12} sx={{ minWidth: { xs: "auto", md: "396px" } }}>
                  <TextField
                    fullWidth
                    label={t("Companies.taxNumber")}
                    name="taxNumber"
                    type="tel"
                    required
                    dir="auto"
                    disabled={isPending}
                    InputLabelProps={{
                      className: "custom-label-rtl",
                    }}
                  />
                </Grid>

                <Grid item xs={12} sx={{ minWidth: { xs: "auto", md: "396px" } }}>
                  <TextField
                    fullWidth
                    label={t("Companies.commercialRegister")}
                    name="commerialRecord"
                    type="text"
                    required
                    dir="auto"
                    disabled={isPending}
                    InputLabelProps={{
                      className: "custom-label-rtl",
                    }}
                  />
                </Grid>
              </Grid>

              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                disableRipple
                size="large"
                loading={isPending}
                sx={{ mt: 3, mb: 2, transition: "0.1s" }}
              >
                {t("Companies.create")}
              </LoadingButton>
            </Box>
          </Box>
        </Container>
      </div>

      {/* Floating WhatsApp Button */}
      <Zoom in={true}>
        <Fab
          color="primary"
          aria-label="whatsapp"
          sx={{
            position: "fixed",
            bottom: { xs: 16, sm: 32 },
            left: { xs: 16, sm: 32 },
            zIndex: 1000,
            backgroundColor: "#25D366", // WhatsApp green color
            "&:hover": {
              backgroundColor: "#128C7E", // Darker green on hover
            },
          }}
          onClick={() =>
            window.open("https://api.whatsapp.com/send?phone=966920019948&text=*اختر من القائمة الرئيسية*", "_blank")
          }
        >
          <WhatsAppIcon sx={{ color: "white", fontSize: 36 }} />
        </Fab>
      </Zoom>
    </div>
  );
}
