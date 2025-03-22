import style from "./Create.module.scss";
import { useEffect } from "react";
import { Link } from "react-router-dom";
//
import logo from "../../Assets/Images/logo.webp";
import signUp from "../../Assets/Images/sign-up.svg";
//
import MotionWrapper from "../../Utils/MotionWrapper";
// MUI
import Typography from "@mui/material/Typography";
// MUI Icons
import PersonIcon from "@mui/icons-material/Person";
import ApartmentIcon from "@mui/icons-material/Apartment";

export default function Create() {

  return (
    <div style={{ backgroundColor: "#f0f1f3" }}>
      <div className={style.top_circle_header}>
        <Link to={`${process.env.PUBLIC_URL}/`}>
          <img src={logo} alt="cashif logo" />
        </Link>
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

      <MotionWrapper>
        <Typography
          sx={{
            marginTop: "32px",
            //   marginBottom: "32px",
            textAlign: "center",
          }}
          component="h1"
          variant="h4"
        >
          إنشاء حساب
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
              <h3>أفراد</h3>
            </Link>
            <Link
              to={`${process.env.PUBLIC_URL}/companies`}
              className={style.box}
            >
              <ApartmentIcon sx={{ fontSize: "48px" }} />
              <h3>مؤسسات</h3>
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
              لديك حساب؟{" "}
              <Link
                to={`${process.env.PUBLIC_URL}/login`}
                style={{ color: "#1976d2" }}
              >
                تسجيل دخول
              </Link>
            </Typography>
          </div>
        </div>
      </MotionWrapper>
    </div>
  );
}
