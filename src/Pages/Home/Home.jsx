import style from "./Home.module.scss";
// MUI
import * as React from "react";
import { Box } from "@mui/material";
// Icons
import A from "../../Assets/Images/A.jpg";
import B from "../../Assets/Images/B.jpg";

export default function Home() {
  React.useEffect(() => {
    // Scroll to the top of the page
    window.scrollTo(0, 0);
  }, []);

  return (
    <div dir="rtl" className={style.container}>
      <h1
        style={{ textAlign: "center", marginTop: "16px", marginBottom: "32px" }}
      >
        خدماتنا
      </h1>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 5,
        }}
      >
        <div className={style.card}>
          <div className={style.img_box}>
            <img src={A} alt="icon" />
          </div>
          <h3>فحص الشراء</h3>
          <p>
            فحص جميع أجزاء المركبة لمعرفة واكتشاف الأعطال والعيوب قبل اتخاذ قرار
            الشراء.
          </p>
        </div>

        <div className={style.card}>
          <div className={style.img_box}>
            <img src={B} alt="icon" />
          </div>
          <h3>فحص ما قبل السفر</h3>
          <p>
            التأكد من سلامة وجاهزية المركبة للسفر على الطرق الطويلة مما يساعد في
            تفادي أي عطل كفاجئ.
          </p>
        </div>
      </Box>
    </div>
  );
}
