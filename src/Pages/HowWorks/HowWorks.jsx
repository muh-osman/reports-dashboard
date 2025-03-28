import style from "./HowWorks.module.scss";
import { Link, useNavigate } from "react-router-dom";
// Cookies
import { useCookies } from "react-cookie";
// MUI
import * as React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function HowWorks() {
  React.useEffect(() => {
    // Scroll to the top of the page
    window.scrollTo(0, 0);
  }, []);
  //
  const [isHovered, setIsHovered] = React.useState(false);
  // Cookies
  const [cookies, setCookie] = useCookies(["tokenApp"]);

  // Page One localStorage status
  const navigate = useNavigate();
  React.useEffect(() => {
    const isPageThreeSeen = localStorage.getItem("pageThree");
    if (isPageThreeSeen === "seen") {
      navigate(`${process.env.PUBLIC_URL}/falak/marketer`, { replace: true });
    }
  }, []);

  const pageThree = () => {
    localStorage.setItem("pageThree", "seen");
    navigate(`${process.env.PUBLIC_URL}/falak/marketer`, { replace: true });
  };

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

            <h6>كيفية العمل:</h6>
            <div>
              <ol>
                <li>استخدم الصورة والكود للترويج عبر منصاتك الإلكترونية.</li>
                <li>
                  شارك مع جمهورك بأن الكود يتيح لهم خصم 20% عند حجز خدمة فحص
                  السيارات.
                </li>
                <li>احصل على عمولة 10% عن كل حجز يتم باستخدام كودك.</li>
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
