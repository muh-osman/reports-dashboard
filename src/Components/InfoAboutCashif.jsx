import style from "./InfoAboutCashif.module.scss";
// MUI
import * as React from "react";
import { Box } from "@mui/material";

// Lang
import i18n from "../i18n";
import { useTranslation } from "react-i18next";

export default function InfoAboutCashif() {
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

  return (
    <div className={style.container}>
      <Box
        dir={languageText === "ar" ? "rtl" : "ltr"}
        sx={{
          bgcolor: "background.paper",
          p: {
            xs: 2,
            md: 4,
          },
          textAlign: "center",
          borderRadius: "9px",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#fff",
        }}
      >
        <div
          className={style.terms_box}
          style={
            languageText === "ar"
              ? { textAlign: "right" }
              : { textAlign: "left" }
          }
        >
          <div>
            <h2>{t("InfoAboutCashif.t1")}:</h2>

            <h6>{t("InfoAboutCashif.t2")}</h6>
            <div>
              <ul
                style={
                  languageText === "ar"
                    ? { paddingRight: 16 }
                    : { paddingLeft: 16 }
                }
              >
                <li>{t("InfoAboutCashif.t3")}</li>
              </ul>
            </div>

            <h6>{t("InfoAboutCashif.t4")}</h6>
            <div>
              <ul
                style={
                  languageText === "ar"
                    ? { paddingRight: 16 }
                    : { paddingLeft: 16 }
                }
              >
                <li>{t("InfoAboutCashif.t5")}</li>
              </ul>
            </div>

            <h6>{t("InfoAboutCashif.t6")}</h6>
            <div>
              <ul
                style={
                  languageText === "ar"
                    ? { paddingRight: 16 }
                    : { paddingLeft: 16 }
                }
              >
                <li>{t("InfoAboutCashif.t7")}</li>
                <li>{t("InfoAboutCashif.t8")}</li>
                <li>{t("InfoAboutCashif.t9")}</li>
                <li>{t("InfoAboutCashif.t10")}</li>
                <li>{t("InfoAboutCashif.t11")}</li>
                <li>{t("InfoAboutCashif.t12")}</li>
                <li>{t("InfoAboutCashif.t13")}</li>
                <li>{t("InfoAboutCashif.t14")}</li>
              </ul>
            </div>

            <h6>{t("InfoAboutCashif.t15")}</h6>
            <div>
              <ul
                style={
                  languageText === "ar"
                    ? { paddingRight: 16 }
                    : { paddingLeft: 16 }
                }
              >
                <li>{t("InfoAboutCashif.t16")}</li>
                <li>{t("InfoAboutCashif.t17")}</li>
                <li>{t("InfoAboutCashif.t18")}</li>
                <li>{t("InfoAboutCashif.t19")}</li>
              </ul>
            </div>

            <h6>{t("InfoAboutCashif.t20")}</h6>
            <div>
              <ul
                style={
                  languageText === "ar"
                    ? { paddingRight: 16 }
                    : { paddingLeft: 16 }
                }
              >
                <li>{t("InfoAboutCashif.t21")}</li>
                <li>{t("InfoAboutCashif.t22")}</li>
                <li>{t("InfoAboutCashif.t23")}</li>
              </ul>
            </div>

            <h6>{t("InfoAboutCashif.t24")}</h6>
            <div>
              <ul
                style={
                  languageText === "ar"
                    ? { paddingRight: 16 }
                    : { paddingLeft: 16 }
                }
              >
                <li>{t("InfoAboutCashif.t25")}</li>
                <li>{t("InfoAboutCashif.t26")}</li>
                <li>{t("InfoAboutCashif.t27")}</li>
                <li>{t("InfoAboutCashif.t28")}</li>
                <li>{t("InfoAboutCashif.t29")}</li>
                <li>{t("InfoAboutCashif.t30")}</li>
                <li>{t("InfoAboutCashif.t31")}</li>
              </ul>
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
}
