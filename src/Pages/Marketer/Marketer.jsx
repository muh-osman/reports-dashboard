import style from "./Marketer.module.scss";
import { Navigate, Link, useNavigate } from "react-router-dom";
// Cookies
import { useCookies } from "react-cookie";
// MUI
import * as React from "react";
import Button from "@mui/material/Button";
import { Box, CircularProgress, Typography } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import Divider from "@mui/material/Divider";
//
import { toast } from "react-toastify";
// Image
import userImg from "../../Assets/Images/user.jpg";
// Api
import useGetMarketerApi from "../../API/useGetMarketerApi";

export default function Marketer() {
  const navigate = useNavigate();
  //
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

  // Marketer Data
  const { data: marketerData } = useGetMarketerApi();
  // console.log(marketerData);

  // If pageOne cookie is Not set, navigate to falak page
  if (!cookies.pageOne && cookies.tokenApp) {
    return <Navigate to={`${process.env.PUBLIC_URL}/falak`} />;
  }
  // If pageTwo cookie is Not set, navigate to conditions page
  if (!cookies.pageTwo && cookies.tokenApp) {
    return <Navigate to={`${process.env.PUBLIC_URL}/falak/conditions`} />;
  }
  // If pageThree cookie is Not set, navigate to how-works page
  if (!cookies.pageThree && cookies.tokenApp) {
    return <Navigate to={`${process.env.PUBLIC_URL}/falak/how-works`} />;
  }

  // Handel Transfer Button
  const transfer = () => {
    if (marketerData?.points >= 200) {
      navigate(`${process.env.PUBLIC_URL}/falak/transfer`);
    } else {
      toast.warn("الحد الأدنى لسحب الأرباح 200 ريال");
    }
  };

  return (
    <div dir="rtl" className={style.container}>
      {!cookies.tokenApp ? (
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
              <h1>"فالك" للتسويق بالعمولة</h1>
              <p>
                برنامج "فالك" للتسويق بالعمولة هو منصة تتيح لك كمسوق فرصة ربح
                المال بسهولة من خلال الترويج لخدمات مركز كاشف لفحص السيارات عبر
                الإنترنت او من خلال التوصية المباشرة لدوائر المعارف والأصدقاء
                والمقربين.
              </p>
              <p>
                من خلال الانضمام إلى البرنامج، تحصل على "كود" تسويقي خاص بك
                للترويج لمنتجات الفحص، وعندما يقوم الأشخاص بزيارة مراكز كاشف
                لفحص السيارت والحصول على احد منتجات الفحص عبر "الكود"، تكسب
                عمولة على كل عملية فحص.
              </p>
              <p>
                انضم إلى "فالك" اليوم وابدأ رحلتك في عالم التسويق بالعمولة.{" "}
                <span style={{ fontWeight: "bold" }}>وفالك التوفيق!</span>
              </p>
            </div>

            <Button
              fullWidth
              sx={{ marginTop: "30px" }}
              variant="contained"
              component={Link}
              size="large"
              to={`${process.env.PUBLIC_URL}/login`}
            >
              انضم الآن
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className={style.main_container}>
            <div className={style.money_card_container}>
              <div className={style.money_card_header}>
                <div>
                  <p>الرصيد الحالي</p>
                  <h1>
                    {marketerData?.points || 0}{" "}
                    <span className={style.rial}>
                      <svg
                        data-name="Layer 1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1124.14 1256.39"
                      >
                        <defs></defs>
                        <path d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z"></path>
                        <path d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z"></path>
                      </svg>
                    </span>
                  </h1>
                </div>

                <div>
                  <Box position="relative" display="inline-flex">
                    <CircularProgress
                      variant="determinate"
                      value={100}
                      size={100}
                      thickness={6}
                      sx={{
                        color: "#3887d5",
                        position: "absolute",
                      }}
                    />
                    <CircularProgress
                      variant="determinate"
                      value={(marketerData?.points / 200) * 100}
                      size={100}
                      thickness={6}
                      sx={{
                        color: "#fff",
                        borderRadius: "10px",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <TrendingUpIcon
                        style={{
                          fontSize: 35,
                          color: "#fff",
                          verticalAlign: "middle",
                        }}
                      />
                      {/* Adjust size and color as needed */}
                    </div>
                  </Box>
                </div>
              </div>

              <div className={style.money_card_footer}>
                <h3>نسبة العمولة 10%</h3>
                <h3 style={{ backgroundColor: "#3887d5", color: "#fff" }}>
                  نسبة الخصم 20%
                </h3>
              </div>
            </div>

            <div className={style.person_card_container}>
              <div style={{ width: "100%" }}>
                <h1 dir="ltr">{marketerData?.clientName}</h1>
                <p dir="ltr">{marketerData?.phoneNumber}</p>

                <div className={style.person_data_box}>
                  <div>
                    <p>الحالة</p>
                    <h3
                      style={{
                        color: marketerData?.isActive ? "#25d366" : "#d32f2f",
                      }}
                    >
                      {marketerData?.isActive ? "نشط" : "غير نشط"}
                    </h3>
                  </div>

                  <div>
                    <p>استخدام الكود</p>
                    <h3>{marketerData?.cardCount || 0}</h3>
                  </div>

                  <div>
                    <p>كود التسويق</p>
                    <h3>{marketerData?.code || "-"}</h3>
                  </div>
                </div>

                <div className={style.button_box}>
                  <Button
                    fullWidth
                    sx={{ width: "50%" }}
                    variant="contained"
                    onClick={transfer}
                  >
                    سحب الأرباح
                  </Button>

                  <Button
                    fullWidth
                    sx={{ width: "50%" }}
                    variant="outlined"
                    component={Link}
                    to={`${process.env.PUBLIC_URL}/falak/marketer`}
                  >
                    الإعدادات
                  </Button>
                </div>
              </div>

              <div className={style.person_img_box}>
                <img src={userImg} alt="user" />
              </div>
            </div>
          </div>

          {/* History */}
          <h5 className={style.last_reports_title}>السجل</h5>
          <Divider sx={{ marginBottom: "18px" }} />
          <Typography
            variant="h6"
            component="div"
            style={{ textAlign: "center", margin: "20px", color: "#757575" }}
          >
            لا يوجد بيانات
          </Typography>
        </>
      )}
    </div>
  );
}
