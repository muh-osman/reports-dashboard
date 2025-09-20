import style from "./HowWorks.module.scss";
// MUI
import * as React from "react";
import { Box } from "@mui/material";

// Lang
import i18n from "../i18n";
import { useTranslation } from "react-i18next";

export default function HowWorks() {
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
            <h2>{t("HowWorksComponent.t1")}</h2>

            <div>
              <ul
                style={
                  languageText === "ar"
                    ? { paddingRight: 16 }
                    : { paddingLeft: 16 }
                }
              >
                <li>{t("HowWorksComponent.t2")}</li>
                <li>{t("HowWorksComponent.t3")}</li>
              </ul>
            </div>

            <h6>{t("HowWorksComponent.t4")}</h6>
            <div>
              <ol
                style={
                  languageText === "ar"
                    ? { paddingRight: 16 }
                    : { paddingLeft: 16 }
                }
              >
                <li>{t("HowWorksComponent.t5")}</li>
                <li>{t("HowWorksComponent.t6")}</li>
                <li>{t("HowWorksComponent.t7")}</li>
              </ol>
            </div>

            <p style={{ marginTop: "32px" }}>{t("HowWorksComponent.t8")}</p>
            <h6 style={{ marginTop: "8px" }}>{t("HowWorksComponent.t9")}</h6>
          </div>
        </div>
      </Box>
    </div>
  );
}
