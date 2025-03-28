import style from "./HowWorks.module.scss";
import { Link, Navigate } from "react-router-dom";
// Cookies
import { useCookies } from "react-cookie";
// MUI
import * as React from "react";
import Button from "@mui/material/Button";

export default function HowWorks() {
  React.useEffect(() => {
    // Scroll to the top of the page
    window.scrollTo(0, 0);
  }, []);
  // Cookies
  const [cookies, setCookie] = useCookies([
    "tokenApp",
    "pageOne",
    "pageTwo",
    "pageThree",
  ]);

  // Page status
  const pageThree = () => {
    setCookie("pageThree", "true", {
      path: "/zxc",
      expires: new Date(Date.now() + 10 * 365 * 24 * 60 * 60 * 1000),
    });
  };

  // If pageThree cookie is set, navigate to marketer page
  if (cookies.pageThree) {
    return <Navigate to={`${process.env.PUBLIC_URL}/falak/marketer`} />;
  }

  return (
    <div dir="rtl" className={style.container}>
      <div className={style.not_auth_container}>
        <div className={style.not_auth_box}>
          <div>
            <h1>نحن سعداء لانضمامك إلى برنامج "فالك"!</h1>

            <p>
              باستخدام الصورة التسويقية التي تحتوي على{" "}
              <span style={{ fontWeight: "bold" }}>كودك الخاص</span>، يمكنك
              الترويج لخدمة فحص السيارات.
            </p>
            <p>
              الكود يمنح العملاء{" "}
              <span style={{ fontWeight: "bold" }}>خصم 20%</span>، بينما تحصل
              أنت على <span style={{ fontWeight: "bold" }}>عمولة 10%</span> عن
              كل عملية حجز تتم باستخدام الكود.
            </p>

            <h3>كيفية العمل:</h3>
            <div>
              <ol>
                <li>
                  <span style={{ fontWeight: "bold" }}>
                    استخدم الصورة والكود
                  </span>{" "}
                  للترويج عبر منصاتك الإلكترونية.
                </li>
                <li>
                  <span style={{ fontWeight: "bold" }}>شارك مع جمهورك</span> بأن
                  الكود يتيح لهم خصم 20% عند حجز خدمة فحص السيارات.
                </li>
                <li>
                  <span style={{ fontWeight: "bold" }}>احصل على عمولة 10%</span>{" "}
                  عن كل حجز يتم باستخدام كودك.
                </li>
              </ol>
            </div>

            <p>انطلق في الترويج الآن وابدأ في جني الأرباح!</p>
            <p style={{ fontWeight: "bold" }}>وفالك التوفيق!</p>
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
              استمرار
            </Button>
          ) : (
            <Button
              fullWidth
              sx={{ marginTop: "30px" }}
              variant="contained"
              size="large"
              onClick={pageThree}
            >
              استمرار
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
