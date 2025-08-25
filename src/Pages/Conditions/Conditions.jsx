import style from "./Conditions.module.scss";
import { Link, Navigate } from "react-router-dom";
// Cookies
import { useCookies } from "react-cookie";
// MUI
import * as React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
// Lang
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";

export default function Conditions() {
  React.useEffect(() => {
    // Scroll to the top of the page
    window.scrollTo(0, 0);
  }, []);
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
  const [isHovered, setIsHovered] = React.useState(false);
  // Cookies
  const [cookies, setCookie] = useCookies(["tokenApp", "userId"]);
  const [pageTwoInState, setPageTwoInState] = React.useState(false);

  // State to manage the checkbox value
  const [checked, setChecked] = React.useState(false);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  // Page status
  const pageTwo = () => {
    setCookie(`pageTwo-${cookies.userId}`, "true", {
      path: "/dashboard",
      expires: new Date(Date.now() + 10 * 365 * 24 * 60 * 60 * 1000),
    });

    setPageTwoInState(true);
  };

  // If pageTwo cookie is set, navigate to how-works page
  if (cookies[`pageTwo-${cookies.userId}`] || pageTwoInState) {
    return <Navigate to={`${process.env.PUBLIC_URL}/falak/how-works`} />;
  }

  return (
    <div
      dir={languageText === "ar" ? "rtl" : "ltr"}
      className={style.container}
    >
      {!cookies.tokenApp ? (
        <Typography
          variant="h6"
          component="div"
          style={{ textAlign: "center", margin: "20px", color: "#757575" }}
        >
          {t("Conditions.please")}{" "}
          <Link
            to={`${process.env.PUBLIC_URL}/login`}
            style={{
              color: "#1976d2",
              textDecoration: isHovered ? "underline" : "none",
            }}
            onMouseOver={() => setIsHovered(true)}
            onMouseOut={() => setIsHovered(false)}
          >
            {t("Conditions.logIn")}
          </Link>{" "}
          {t("Conditions.toViewTheTermsAndConditions")}
        </Typography>
      ) : (
        <div className={style.not_auth_container}>
          <div className={style.not_auth_box}>
            <div>
              <h1>{t("Conditions.termsAndConditions")}:</h1>
              <p>{t("Conditions.termsHeader")}</p>

              <h6>{t("Conditions.definitions")}</h6>
              <div>
                <ul
                  style={
                    languageText === "ar"
                      ? { paddingRight: 16 }
                      : { paddingLeft: 16 }
                  }
                >
                  <li>{t("Conditions.definitionsA")}</li>
                  <li>{t("Conditions.definitionsB")}</li>
                  <li>{t("Conditions.definitionsC")}</li>
                  <li>{t("Conditions.definitionsD")}</li>
                </ul>
              </div>

              <h6>{t("Conditions.registrationTerms")}</h6>
              <div>
                <ul
                  style={
                    languageText === "ar"
                      ? { paddingRight: 16 }
                      : { paddingLeft: 16 }
                  }
                >
                  <li>{t("Conditions.registrationTermsA")}</li>
                  <li>{t("Conditions.registrationTermsB")}</li>
                  <li>{t("Conditions.registrationTermsC")}</li>
                  <li>{t("Conditions.registrationTermsD")}</li>
                  <li>{t("Conditions.registrationTermsE")}</li>
                  <li>{t("Conditions.registrationTermsF")}</li>
                  <li>{t("Conditions.registrationTermsG")}</li>
                </ul>
              </div>

              <h6>{t("Conditions.mechanismOfAction")}</h6>
              <div>
                <ul
                  style={
                    languageText === "ar"
                      ? { paddingRight: 16 }
                      : { paddingLeft: 16 }
                  }
                >
                  <li>{t("Conditions.mechanismOfActionA")}</li>
                  <li>{t("Conditions.mechanismOfActionB")}</li>
                  <li>{t("Conditions.mechanismOfActionC")}</li>
                  <li>{t("Conditions.mechanismOfActionD")}</li>
                  <li>{t("Conditions.mechanismOfActionE")}</li>
                  <li>{t("Conditions.mechanismOfActionF")}</li>
                  <li>{t("Conditions.mechanismOfActionG")}</li>
                </ul>
              </div>

              <h6>{t("Conditions.payment")}</h6>
              <div>
                <ul
                  style={
                    languageText === "ar"
                      ? { paddingRight: 16 }
                      : { paddingLeft: 16 }
                  }
                >
                  <li>{t("Conditions.paymentA")}</li>
                  <li>{t("Conditions.paymentB")}</li>
                  <li>{t("Conditions.paymentC")}</li>
                  <li>{t("Conditions.paymentD")}</li>
                  <li>{t("Conditions.paymentE")}</li>
                </ul>
              </div>

              <h6>{t("Conditions.marketerObligations")}</h6>
              <div>
                <ul
                  style={
                    languageText === "ar"
                      ? { paddingRight: 16 }
                      : { paddingLeft: 16 }
                  }
                >
                  <li>{t("Conditions.marketerObligationsA")}</li>
                  <li>{t("Conditions.marketerObligationsB")}</li>
                  <li>{t("Conditions.marketerObligationsC")}</li>
                  <li>{t("Conditions.marketerObligationsD")}</li>
                </ul>
              </div>

              <h6>{t("Conditions.companyObligations")}</h6>
              <div>
                <ul
                  style={
                    languageText === "ar"
                      ? { paddingRight: 16 }
                      : { paddingLeft: 16 }
                  }
                >
                  <li>{t("Conditions.companyObligationsA")}</li>
                  <li>{t("Conditions.companyObligationsB")}</li>
                  <li>{t("Conditions.companyObligationsC")}</li>
                </ul>
              </div>

              <h6>{t("Conditions.cancellation")}</h6>
              <div>
                <ul
                  style={
                    languageText === "ar"
                      ? { paddingRight: 16 }
                      : { paddingLeft: 16 }
                  }
                >
                  <li>{t("Conditions.cancellationA")}</li>
                  <li>{t("Conditions.cancellationB")}</li>
                  <li>{t("Conditions.cancellationC")}</li>
                  <li>{t("Conditions.cancellationD")}</li>
                </ul>
              </div>

              <h6>{t("Conditions.modifications")}</h6>
              <div>
                <ul
                  style={
                    languageText === "ar"
                      ? { paddingRight: 16 }
                      : { paddingLeft: 16 }
                  }
                >
                  <li>{t("Conditions.modificationsA")}</li>
                  <li>{t("Conditions.modificationsB")}</li>
                </ul>
              </div>

              <h6>{t("Conditions.applicableLaws")}</h6>
              <div>
                <ul
                  style={
                    languageText === "ar"
                      ? { paddingRight: 16 }
                      : { paddingLeft: 16 }
                  }
                >
                  <li>{t("Conditions.applicableLawsA")}</li>
                  <li>{t("Conditions.applicableLawsB")}</li>
                </ul>
              </div>

              <h6>{t("Conditions.disclaimer")}</h6>
              <p>{t("Conditions.disclaimerA")}</p>
            </div>

            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    required
                    checked={checked}
                    onChange={handleChange}
                  />
                }
                label={t("Conditions.label")}
              />
            </div>

            <Button
              fullWidth
              sx={{ marginTop: "30px" }}
              variant="contained"
              size="large"
              onClick={pageTwo}
              disabled={!checked}
            >
              {t("Conditions.ok")}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
