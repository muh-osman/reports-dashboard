import style from "./Home.module.scss";
// MUI
import * as React from "react";
import { Box } from "@mui/material";
// Icons
import A from "../../Assets/Images/A.jpg";
import B from "../../Assets/Images/B.jpg";
import C from "../../Assets/Images/C.jpg";
import D from "../../Assets/Images/D.jpg";
import E from "../../Assets/Images/E.jpg";
import F from "../../Assets/Images/F.jpg";

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
            التأكد من سلامة وجاهزية المركبة للسفر على الطرق الطويلة لتفادي أي
            عطل مفاجئ.
          </p>
        </div>

        <div className={style.card}>
          <div className={style.img_box}>
            <img src={C} alt="icon" />
          </div>
          <h3>فحص الصيانة</h3>
          <p>
            فحص المركبة قبل إجراء الصيانة لمعرفة نوع العطل, وبعد الصيانة للتأكد
            من وجود الإصلاحات.
          </p>
        </div>

        <div className={style.card}>
          <div className={style.img_box}>
            <img src={D} alt="icon" />
          </div>
          <h3>الفحص المتنقل</h3>
          <p>
            يمكن لفريق كاشف عبر مركبة الفحص المتنقل التوجه الى موقع العميل لفحص
            المركبات, تتيح هذه الخدمة للعملاء توفير الوقت والجهد.
          </p>
        </div>

        <div className={style.card}>
          <div className={style.img_box}>
            <img src={E} alt="icon" />
          </div>
          <h3>فحص مركبتي الخاصة</h3>
          <p>
            خدمة مخصصة للتأكد من حالة وأداء مركبتك الخاصة, واكتشاف الأعطال التي
            تظهر فيها, بهدف التحقق من سلامتها وجاهزيتها اليومية.
          </p>
        </div>

        <div className={style.card}>
          <div className={style.img_box}>
            <img src={F} alt="icon" />
          </div>
          <h3>الفحص خارج نطاق مراكزنا</h3>
          <p>
            في حال وجدت سيارة للبيع في مدينة الرياض أو الدمام وكنت تسكن خارج
            هاتين المدينتين مركز كاشف يقوم نيابة عنك بفحص السيارة وتصوريها
            وارسال تقريرها لك، ونساعدك في تأمينها ونقل ملكيتها وشحنها لمدينتك.
          </p>
        </div>
      </Box>
    </div>
  );
}
