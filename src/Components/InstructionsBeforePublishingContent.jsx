import style from "./InstructionsBeforePublishingContent.module.scss";
// MUI
import * as React from "react";
import { Box } from "@mui/material";

// Lang
import i18n from "../i18n";
import { useTranslation } from "react-i18next";

export default function InstructionsBeforePublishingContent() {
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
            <h1>{t("InstructionsBeforePublishingContent.t1")}:</h1>

            <h6>{t("InstructionsBeforePublishingContent.t2")}</h6>
            <div>
              <ul
                style={
                  languageText === "ar"
                    ? { paddingRight: 16 }
                    : { paddingLeft: 16 }
                }
              >
                <li>{t("InstructionsBeforePublishingContent.t3")}</li>
                <li>{t("InstructionsBeforePublishingContent.t4")}</li>
              </ul>
            </div>

            <h6>{t("InstructionsBeforePublishingContent.t5")}</h6>
            <div>
              <ul
                style={
                  languageText === "ar"
                    ? { paddingRight: 16 }
                    : { paddingLeft: 16 }
                }
              >
                <li>{t("InstructionsBeforePublishingContent.t6")}</li>
                <li>{t("InstructionsBeforePublishingContent.t7")}</li>
                <li>{t("InstructionsBeforePublishingContent.t8")}</li>
                <li>{t("InstructionsBeforePublishingContent.t9")}</li>
                <li>{t("InstructionsBeforePublishingContent.t10")}</li>
                <li>{t("InstructionsBeforePublishingContent.t11")}</li>
              </ul>
            </div>

            <h6>{t("InstructionsBeforePublishingContent.t12")}</h6>
            <div>
              <ul
                style={
                  languageText === "ar"
                    ? { paddingRight: 16 }
                    : { paddingLeft: 16 }
                }
              >
                <li>{t("InstructionsBeforePublishingContent.t13")}</li>
                <li>{t("InstructionsBeforePublishingContent.t14")}</li>
                <li>{t("InstructionsBeforePublishingContent.t15")}</li>
                <li>{t("InstructionsBeforePublishingContent.t16")}</li>
                <li>{t("InstructionsBeforePublishingContent.t17")}</li>
                <li>{t("InstructionsBeforePublishingContent.t18")}</li>
                <li>{t("InstructionsBeforePublishingContent.t19")}</li>
              </ul>
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
}
