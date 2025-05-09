import style from "./Verify.module.scss";
//
import logo from "../../Assets/Images/logo.webp";
// React router
import { Link, Navigate, useNavigate } from "react-router-dom";
// Mui
import * as React from "react";
// import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LoadingButton from "@mui/lab/LoadingButton";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// Lang
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";
// API
import { useVerifyApi } from "../../API/useVerifyApi";
// PhoneNumberContext
import { usePhoneNumber } from "../../Contexts/PhoneNumberContext";

export default function Verify() {
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
    navigate(`${process.env.PUBLIC_URL}/login`);
  };
  const { phoneNumber, setPhoneNumber } = usePhoneNumber();

  // handle submit
  const formRef = React.useRef();

  const { mutate, isPending } = useVerifyApi();

  // const handleChange = (e) => {
  //   const otp = e.target.value;

  //   // Check if otp has a length of 5 characters
  //   if (otp.length === 4) {
  //     const data = new FormData(formRef.current);
  //     // Append phoneNumber to the FormData
  //     data.append("phoneNumber", phoneNumber);
  //     mutate(data);
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(formRef.current);
    // Append phoneNumber to the FormData
    data.append("phoneNumber", phoneNumber);
    mutate(data);
  };

  return !phoneNumber ? (
    <Navigate to={`${process.env.PUBLIC_URL}/login`} replace />
  ) : (
    <div style={{ backgroundColor: "#f0f1f3" }}>
      <div className={style.header}>
        <div className={style.top_circle_header}>
          <a href="https://cashif.cc/">
            <img src={logo} alt="cashif logo" />
          </a>
          <Tooltip
            title={t("Verify.back")}
            className={style.three_dots}
            onClick={handleBack}
          >
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
        <Container
          dir={languageText === "ar" ? "rtl" : "ltr"}
          component="main"
          maxWidth="xs"
          className={style.box}
          // sx={{
          //   display: "flex",
          //   flexDirection: "column",
          //   alignItems: "center",
          //   justifyContent: "center",
          // }}
        >
          <Box sx={{ width: "100%" }}>
            <Typography
              dir={languageText === "ar" ? "rtl" : "ltr"}
              component="h1"
              variant="h5"
              sx={{ textAlign: "center", paddingTop: "16px" }}
            >
              {phoneNumber}
            </Typography>

            <Typography
              dir={languageText === "ar" ? "rtl" : "ltr"}
              component="h5"
              variant="h5"
              sx={{
                textAlign: "center",
                color: "#00000099",
                fontSize: "0.875rem",
              }}
            >
              {t("Verify.weSentMessageToYourNumberContainingVerificationCode")}
            </Typography>

            <Box
              onSubmit={handleSubmit}
              ref={formRef}
              component="form"
              noValidate
              sx={{ minWidth: { xs: "auto" }, mt: 3 }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    // onChange={handleChange}
                    dir="ltr"
                    autoFocus
                    fullWidth
                    name="otp"
                    label={t("Verify.verificationCode")}
                    type="number"
                    required
                    disabled={isPending}
                    InputLabelProps={{
                      className: "custom-label-rtl",
                    }}
                    InputProps={{
                      classes: {
                        input: "hide-arrows", // Apply the custom class here
                      },
                    }}
                    // inputProps={{ maxLength: 4 }}
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
                {t("Verify.verify")}
              </LoadingButton>
            </Box>
          </Box>

          <Typography
            sx={{ mt: 1 }}
            dir="auto"
            variant="body2"
            color="text.secondary"
            align="center"
          >
            {t("Verify.didNotReceiveTheCode")}{" "}
            <Link
              to={`${process.env.PUBLIC_URL}/login`}
              style={{ color: "#1976d2" }}
            >
              {t("Verify.ReOrder")}
            </Link>
          </Typography>
        </Container>
      </div>
    </div>
  );
}
