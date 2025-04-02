import style from "./Marketer.module.scss";
import { Navigate, Link, useNavigate } from "react-router-dom";
// Cookies
import { useCookies } from "react-cookie";
// MUI
import * as React from "react";
import Button from "@mui/material/Button";
import { Box, CircularProgress } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import Divider from "@mui/material/Divider";
import InfoIcon from "@mui/icons-material/Info";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import GavelIcon from "@mui/icons-material/Gavel";
import WorkIcon from "@mui/icons-material/Work";
import Modal from "@mui/material/Modal";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

//
import { toast } from "react-toastify";
// Image
import userImg from "../../Assets/Images/user.jpg";
// Api
import useGetMarketerApi from "../../API/useGetMarketerApi";
import useMarketerSettingsApi from "../../API/useMarketerSettingsApi";
// Component
import CouponImages from "../../Components/CouponImages";

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

  // info icon
  // Controll the positin of drop down menue
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // How Works Modal
  const [openHowWorksModal, setOpenHowWorksModal] = React.useState(false);
  const handleHowWorksModalOpen = () => setOpenHowWorksModal(true);
  const handleHowWorksModalClose = () => setOpenHowWorksModal(false);
  // condetion And Terms Modal
  const [openCondetionAndTermsModal, setOpenCondetionAndTermsModal] =
    React.useState(false);
  const handleCondetionAndTermsModalOpen = () =>
    setOpenCondetionAndTermsModal(true);
  const handleCondetionAndTermsModalClose = () =>
    setOpenCondetionAndTermsModal(false);

  // Marketer Data
  const { data: marketerData } = useGetMarketerApi();
  const { data: MarketerSettings } = useMarketerSettingsApi();
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
                <h3>
                  نسبة العمولة{" "}
                  {MarketerSettings?.marketerCommissionPercentage || 0}%
                </h3>
                <h3 style={{ backgroundColor: "#3887d5", color: "#fff" }}>
                  نسبة الخصم {MarketerSettings?.codeDiscountPercentage || 0}%
                </h3>
              </div>
            </div>

            <div className={style.person_card_container}>
              <Tooltip
                title="المزيد"
                className={style.infoIcon}
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <IconButton>
                  <InfoIcon />
                </IconButton>
              </Tooltip>

              <Popover
                dir="rtl"
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: isSmallScreen ? "center" : "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: isSmallScreen ? "center" : "right",
                }}
                disableScrollLock={true}
              >
                <Paper sx={{ maxWidth: "100%" }}>
                  <MenuList>
                    <MenuItem onClick={handleHowWorksModalOpen}>
                      <ListItemIcon>
                        <WorkIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>طريقة العمل</ListItemText>
                    </MenuItem>

                    <MenuItem onClick={handleCondetionAndTermsModalOpen}>
                      <ListItemIcon>
                        <GavelIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>الشروط والأحكام</ListItemText>
                    </MenuItem>
                  </MenuList>
                </Paper>
              </Popover>

              {/* How Works Modal */}
              <Modal
                open={openHowWorksModal}
                onClose={handleHowWorksModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box
                  dir="rtl"
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: {
                      xs: 361, // width for small screens
                      md: 750, // width for medium and larger screens
                    },
                    bgcolor: "background.paper",
                    borderRadius: "9px",
                    boxShadow: 24,
                    p: {
                      xs: 2,
                      md: 4,
                    },
                    textAlign: "center",
                    borderRadius: "16px",
                    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#fff",
                    maxHeight: "80vh", // Set a maximum height for the modal
                    overflowY: "auto", // Enable vertical scrolling
                    overflowX: "hidden", // Prevent horizontal scrolling
                  }}
                >
                  <div className={style.not_auth_img}>
                    <svg
                      style={{ width: "100px", fill: "#174545" }}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 512"
                    >
                      <path d="M323.4 85.2l-96.8 78.4c-16.1 13-19.2 36.4-7 53.1c12.9 17.8 38 21.3 55.3 7.8l99.3-77.2c7-5.4 17-4.2 22.5 2.8s4.2 17-2.8 22.5l-20.9 16.2L512 316.8 512 128l-.7 0-3.9-2.5L434.8 79c-15.3-9.8-33.2-15-51.4-15c-21.8 0-43 7.5-60 21.2zm22.8 124.4l-51.7 40.2C263 274.4 217.3 268 193.7 235.6c-22.2-30.5-16.6-73.1 12.7-96.8l83.2-67.3c-11.6-4.9-24.1-7.4-36.8-7.4C234 64 215.7 69.6 200 80l-72 48 0 224 28.2 0 91.4 83.4c19.6 17.9 49.9 16.5 67.8-3.1c5.5-6.1 9.2-13.2 11.1-20.6l17 15.6c19.5 17.9 49.9 16.6 67.8-2.9c4.5-4.9 7.8-10.6 9.9-16.5c19.4 13 45.8 10.3 62.1-7.5c17.9-19.5 16.6-49.9-2.9-67.8l-134.2-123zM16 128c-8.8 0-16 7.2-16 16L0 352c0 17.7 14.3 32 32 32l32 0c17.7 0 32-14.3 32-32l0-224-80 0zM48 320a16 16 0 1 1 0 32 16 16 0 1 1 0-32zM544 128l0 224c0 17.7 14.3 32 32 32l32 0c17.7 0 32-14.3 32-32l0-208c0-8.8-7.2-16-16-16l-80 0zm32 208a16 16 0 1 1 32 0 16 16 0 1 1 -32 0z" />
                    </svg>
                  </div>

                  <div>
                    <h1 style={{ fontSize: "24px", marginBottom: "10px" }}>
                      نحن سعداء لانضمامك إلى برنامج "فالك"!
                    </h1>

                    <p style={{ color: "#757575" }}>
                      باستخدام الصورة التسويقية التي تحتوي على{" "}
                      <span style={{ fontWeight: "bold" }}>كودك الخاص</span>،
                      يمكنك الترويج لخدمة فحص السيارات.
                    </p>
                    <p style={{ color: "#757575" }}>
                      الكود يمنح العملاء{" "}
                      <span style={{ fontWeight: "bold" }}>خصم 20%</span>، بينما
                      تحصل أنت على{" "}
                      <span style={{ fontWeight: "bold" }}>عمولة 10%</span> عن
                      كل عملية حجز تتم باستخدام الكود.
                    </p>

                    <div
                      style={{
                        color: "#757575",
                        textAlign: "right",
                        marginTop: "16px",
                      }}
                    >
                      <h3>كيفية العمل:</h3>
                      <div>
                        <ol
                          style={{
                            listStylePosition: "outside",
                            paddingRight: "16px",
                          }}
                        >
                          <li>
                            <span style={{ fontWeight: "bold" }}>
                              استخدم الصورة والكود
                            </span>{" "}
                            للترويج عبر منصاتك الإلكترونية.
                          </li>
                          <li>
                            <span style={{ fontWeight: "bold" }}>
                              شارك مع جمهورك
                            </span>{" "}
                            بأن الكود يتيح لهم خصم 20% عند حجز خدمة فحص
                            السيارات.
                          </li>
                          <li>
                            <span style={{ fontWeight: "bold" }}>
                              احصل على عمولة 10%
                            </span>{" "}
                            عن كل حجز يتم باستخدام كودك.
                          </li>
                        </ol>
                      </div>
                    </div>
                    <p style={{ color: "#757575", marginTop: "16px" }}>
                      انطلق في الترويج الآن وابدأ في جني الأرباح!
                    </p>
                    <p style={{ fontWeight: "bold", color: "#757575" }}>
                      وفالك التوفيق!
                    </p>
                  </div>
                </Box>
              </Modal>

              {/* Condetion And Terms Modal */}
              <Modal
                open={openCondetionAndTermsModal}
                onClose={handleCondetionAndTermsModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box
                  dir="rtl"
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: {
                      xs: 361, // width for small screens
                      md: 750, // width for medium and larger screens
                    },
                    bgcolor: "background.paper",
                    borderRadius: "9px",
                    boxShadow: 24,
                    p: {
                      xs: 2,
                      md: 4,
                    },
                    textAlign: "center",
                    borderRadius: "16px",
                    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#fff",
                    maxHeight: "80vh", // Set a maximum height for the modal
                    overflowY: "auto", // Enable vertical scrolling
                    overflowX: "hidden", // Prevent horizontal scrolling
                  }}
                >
                  <div className={style.terms_box}>
                    <div>
                      <h1>الشروط والأحكام:</h1>
                      <p>
                        فكرة التسويق بالعمولة هي فكرة تحت التجربة، وقد تكون
                        قابلة للإيقاف أو التعديل في أي لحظة بناءً على تقييم
                        الأداء ونتائج التجربة. نحرص على تقديم أفضل الحلول بما
                        يتناسب مع أهدافنا المشتركة،
                      </p>

                      <h6>تعريفات</h6>
                      <div>
                        <ul>
                          <li>
                            الشركة: الجهة المالكة للمنتجات أو الخدمات المقدمة
                            عبر برنامج التسويق بالعمولة.
                          </li>
                          <li>
                            المسوق: الشخص أو الكيان المشترك في البرنامج والذي
                            يسوّق للمنتجات أو الخدمات مقابل عمولة.
                          </li>
                          <li>
                            العمولة: المبلغ أو النسبة المالية التي يحصل عليها
                            المسوق مقابل كل عملية بيع أو إجراء محدد تم تحقيقه من
                            خلال الكود التسويقي الخاص به.
                          </li>
                          <li>
                            كود المسوق: الرابط الفريد الخاص بكل مسوق لمتابعة
                            الأداء وتحديد العمليات التي تمت من خلاله.
                          </li>
                        </ul>
                      </div>

                      <h6>شروط التسجيل</h6>
                      <div>
                        <ul>
                          <li>
                            يجب أن يكون المسوق شخصًا طبيعيًا أو اعتباريًا يتمتع
                            بالأهلية القانونية.
                          </li>
                          <li>الا يقل عمر المشترك عن 18 سنة.</li>
                          <li>
                            يُشترط تقديم بيانات صحيحة ودقيقة أثناء التسجيل.
                          </li>
                          <li>
                            يحق للشركة في أي مرحلة طلب صورة من الهوية والإقامة.
                          </li>
                          <li>
                            يجب على المشارك الإبلاغ عن أي تغييرات في معلوماته
                          </li>
                          <li>يحظر على المشارك تسجيل حسابات متعددة.</li>
                          <li>
                            تحتفظ الشركة بالحق في قبول أو رفض طلب التسجيل دون
                            إبداء أسباب.
                          </li>
                        </ul>
                      </div>

                      <h6>آلية العمل</h6>
                      <div>
                        <ul>
                          <li>
                            يحصل المسوق على كود تسويقي فريد بعد التسجيل
                            والموافقة.
                          </li>
                          <li>
                            سيحصل المسوق على عمولة 10% من صافي قيمة الفاتورة.
                          </li>
                          <li>
                            قد تتغير نسبة العمولة في أي وقت دون ابداء أسباب
                            التغيير.
                          </li>
                          <li>
                            تُحسب العمولات بناءً على العمليات التي تتم من خلال
                            الكود التسويقي وفقًا للاتفاق المبرم.
                          </li>
                          <li>
                            التطبيق هي المنصة الوحيدة التي تعرض تقارير الزيارات
                            التي وصلت من خلال نشر الكود.
                          </li>
                          <li>
                            لا يُسمح باستخدام أساليب غير قانونية أو غير أخلاقية
                            لجذب العملاء.
                          </li>
                          <li>
                            يستفيد المسوق من الخصم فقط ولا يحصل على عمولة اذا
                            استخدم كوده التسويقي لزياراته الخاصة.
                          </li>
                        </ul>
                      </div>

                      <h6>الدفع</h6>
                      <div>
                        <ul>
                          <li>
                            يتم دفع العمولات وفقًا لتقارير الأداء بعد التحقق من
                            صحة العمليات.
                          </li>
                          <li>
                            يُشترط أن تصل قيمة العمولات مستحقة الدفع إلى 200
                            ريال وهو الحد الأدنى للدفع المحدد.
                          </li>
                          <li>
                            لا يتم الدفع والتحويل الا على حسابات بنكية محلية او
                            تطبيقات سعودية كـ stc pay او urpay
                          </li>
                          <li>
                            يجب ان يكون الحساب المحول عليه العمولة باسم المسوق
                            المسجل في التطبيق.
                          </li>
                          <li>
                            أي نزاع حول العمولات يتم حله وفقًا لتقارير الشركة
                            النهائية.
                          </li>
                        </ul>
                      </div>

                      <h6>التزامات المسوق</h6>
                      <div>
                        <ul>
                          <li>
                            الالتزام بالترويج لمنتجات وأنواع الفحص والخدمات
                            بطريقة قانونية وأخلاقية.
                          </li>
                          <li>
                            الامتناع عن الإساءة لسمعة الشركة أو المنتجات بأي
                            شكل.
                          </li>
                          <li>
                            الامتناع عن استخدام العلامة التجارية للشركة في
                            الإعلانات المدفوعة دون إذن مسبق.
                          </li>
                          <li>
                            عدم انشاء أي حسابات في جميع مواقع التواصل باسم
                            الشركة بغرض التسويق للمنتجات.
                          </li>
                        </ul>
                      </div>

                      <h6>التزامات الشركة</h6>
                      <div>
                        <ul>
                          <li>
                            تقديم أدوات التسويق اللازمة مثل اكواد التسويق
                            والتقارير.
                          </li>
                          <li>
                            دفع العمولات في الوقت المحدد بعد التحقق من العمليات.
                          </li>
                          <li>
                            الاحتفاظ بسرية معلومات المسوق وعدم مشاركتها مع أطراف
                            خارجية دون موافقة.
                          </li>
                        </ul>
                      </div>

                      <h6>الإلغاء</h6>
                      <div>
                        <ul>
                          <li>
                            تحتفظ الشركة بالحق في إنهاء عضوية أي مسوق إذا تم
                            اكتشاف انتهاك للشروط.
                          </li>
                          <li>
                            يحق للشركة إيقاف العمل في خطة التسويق بالعمولة في أي
                            وقت دون ان يترتب على ذلك أي التزامات قانونية او
                            مالية تجاه الشركة.
                          </li>
                          <li>يمكن للمسوق إنهاء عضويته بإخطار مسبق للشركة.</li>
                          <li>
                            عند انهاء المسوق لعضويته فسيتم إزالة كافة بياناته
                            وعليه التسجيل من جديد في حال رغب بالانضمام مرة أخرى،
                            ولا يحق له المطالبة بأي عمولات متبقية من حسابه
                            الملغي.
                          </li>
                        </ul>
                      </div>

                      <h6>التعديلات</h6>
                      <div>
                        <ul>
                          <li>
                            يحق للشركة تعديل الشروط والأحكام في أي وقت، ويتم
                            إشعار المسوقين بالتعديلات قبل تطبيقها.
                          </li>
                          <li>
                            استمرار المسوق في استخدام البرنامج بعد التعديلات
                            يعتبر موافقة ضمنية عليها.
                          </li>
                        </ul>
                      </div>

                      <h6>القوانين المعمول بها</h6>
                      <div>
                        <ul>
                          <li>
                            تخضع هذه الشروط والأحكام للقوانين واللوائح المحلية.
                          </li>
                          <li>
                            يتم تسوية أي نزاع وفقًا للجهات القضائية المختصة.
                          </li>
                        </ul>
                      </div>

                      <h6>إخلاء المسؤولية</h6>
                      <p>
                        الشركة غير مسؤولة عن أي خسائر أو أضرار ناجمة عن سوء
                        استخدام برنامج التسويق بالعمولة من قبل المسوق.
                      </p>
                    </div>

                    <div>
                      <FormControlLabel
                        control={
                          <Checkbox required checked={true} disabled={true} />
                        }
                        label="أوافق على الشروط والأحكام, وأقر بأنني قرأتها وفهمتها بالكامل"
                      />
                    </div>

                    <Button
                      fullWidth
                      sx={{ marginTop: "30px" }}
                      variant="contained"
                      size="large"
                      disabled={true}
                    >
                      موافق
                    </Button>
                  </div>
                </Box>
              </Modal>

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
                    to={`${process.env.PUBLIC_URL}/falak/history`}
                  >
                    السجل
                  </Button>
                </div>
              </div>

              <div className={style.person_img_box}>
                <img src={userImg} alt="user" />
              </div>
            </div>
          </div>

          {/* Images Downloader */}
          <h5 className={style.last_reports_title}>حقيبة المسوق</h5>
          <Divider sx={{ marginBottom: "18px" }} />

          <CouponImages
            code={marketerData?.code || "-"}
            percent={MarketerSettings?.codeDiscountPercentage || 0}
          />
        </>
      )}
    </div>
  );
}
