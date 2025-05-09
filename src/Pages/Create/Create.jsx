import style from "./Create.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
//
import logo from "../../Assets/Images/logo.webp";
import signUp from "../../Assets/Images/sign-up.svg";
// MUI
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// MUI Icons
import PersonIcon from "@mui/icons-material/Person";
import ApartmentIcon from "@mui/icons-material/Apartment";
// Lang
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";

export default function Create() {
  //
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
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(`${process.env.PUBLIC_URL}/login`);
  };

  return (
    <div style={{ backgroundColor: "#f0f1f3" }}>
      <div className={style.header}>
        <div className={style.top_circle_header}>
          <a href="https://cashif.cc/">
            <img src={logo} alt="cashif logo" />
          </a>

          <Tooltip
            title={t("Create.back")}
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

      <div className={style.main_container}>
        <Typography
          sx={{
            marginTop: "32px",
            //   marginBottom: "32px",
            textAlign: "center",
          }}
          component="h1"
          variant="h4"
        >
          {t("Create.createAccount")}
        </Typography>

        <div className={style.container}>
          <div className={style.hero_img_box}>
            <img src={signUp} alt="hero" />
          </div>

          <div className={style.cards_box}>
            <Link
              to={`${process.env.PUBLIC_URL}/individuals`}
              className={style.box}
            >
              <PersonIcon sx={{ fontSize: "48px" }} />
              <h3>{t("Create.individuals")}</h3>
            </Link>
            <Link
              to={`${process.env.PUBLIC_URL}/companies`}
              className={style.box}
            >
              <ApartmentIcon sx={{ fontSize: "48px" }} />
              <h3>{t("Create.institutions")}</h3>
            </Link>

            <Typography
              dir="rtl"
              component="h5"
              variant="h5"
              sx={{
                textAlign: "center",
                color: "#00000099",
                fontSize: "0.875rem",
                marginBottom: "32px",
              }}
            >
              {t("Create.doYouHaveAccount")}{" "}
              <Link
                to={`${process.env.PUBLIC_URL}/login`}
                style={{ color: "#1976d2" }}
              >
                {t("Create.login")}
              </Link>
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
