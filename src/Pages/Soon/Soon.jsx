import style from "./Soon.module.scss";
import { Link } from "react-router-dom";
// Cookies
import { useCookies } from "react-cookie";
// MUI
import * as React from "react";
import Button from "@mui/material/Button";
// Lang
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";

export default function Soon() {
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
  // Cookies
  const [cookies, setCookie] = useCookies(["tokenApp", "userId"]);

  return (
    <div
      dir={languageText === "ar" ? "rtl" : "ltr"}
      className={style.container}
    >
      <div className={style.not_auth_container}>
        <div className={style.not_auth_box}>
          <div>
            <div className={style.not_auth_img}>
              <svg
                style={{ width: "100px", fill: "#174545" }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
              >
                <path d="M323.4 85.2l-96.8 78.4c-16.1 13-19.2 36.4-7 53.1c12.9 17.8 38 21.3 55.3 7.8l99.3-77.2c7-5.4 17-4.2 22.5 2.8s4.2 17-2.8 22.5l-20.9 16.2L512 316.8 512 128l-.7 0-3.9-2.5L434.8 79c-15.3-9.8-33.2-15-51.4-15c-21.8 0-43 7.5-60 21.2zm22.8 124.4l-51.7 40.2C263 274.4 217.3 268 193.7 235.6c-22.2-30.5-16.6-73.1 12.7-96.8l83.2-67.3c-11.6-4.9-24.1-7.4-36.8-7.4C234 64 215.7 69.6 200 80l-72 48 0 224 28.2 0 91.4 83.4c19.6 17.9 49.9 16.5 67.8-3.1c5.5-6.1 9.2-13.2 11.1-20.6l17 15.6c19.5 17.9 49.9 16.6 67.8-2.9c4.5-4.9 7.8-10.6 9.9-16.5c19.4 13 45.8 10.3 62.1-7.5c17.9-19.5 16.6-49.9-2.9-67.8l-134.2-123zM16 128c-8.8 0-16 7.2-16 16L0 352c0 17.7 14.3 32 32 32l32 0c17.7 0 32-14.3 32-32l0-224-80 0zM48 320a16 16 0 1 1 0 32 16 16 0 1 1 0-32zM544 128l0 224c0 17.7 14.3 32 32 32l32 0c17.7 0 32-14.3 32-32l0-208c0-8.8-7.2-16-16-16l-80 0zm32 208a16 16 0 1 1 32 0 16 16 0 1 1 -32 0z" />
              </svg>
            </div>
            <h1>{t("Soon.title")}</h1>
            <p>{t("Soon.subTitleOne")}</p>
            <p>{t("Soon.subTitleTwo")}</p>
            <p>
              {t("Soon.subTitleThree")}{" "}
              <span style={{ fontWeight: "bold" }}>
                {t("Soon.subTitleFour")}
              </span>
            </p>
          </div>

          {!cookies.tokenApp ? (
            <Button
              fullWidth
              sx={{ marginTop: "30px" }}
              variant="contained"
              component={Link}
              size="large"
              to={`${process.env.PUBLIC_URL}/login`}
            >
              {t("Soon.login")}
            </Button>
          ) : (
            <Button
              fullWidth
              sx={{ marginTop: "30px" }}
              variant="contained"
              size="large"
              disabled={true}
            >
              {t("Soon.soon")}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
