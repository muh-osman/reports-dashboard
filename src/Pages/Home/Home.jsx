import style from "./Home.module.scss";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/dashboard/login");
  }, []);
  return <div className={style.container}></div>;
}
// import "./Home.css";
// import style from "./Home.module.scss";
// import { useNavigate, Link } from "react-router-dom";
// // MUI
// import * as React from "react";
// import Tooltip from "@mui/material/Tooltip";
// import Popover from "@mui/material/Popover";
// import Divider from "@mui/material/Divider";
// import Paper from "@mui/material/Paper";
// import MenuList from "@mui/material/MenuList";
// import MenuItem from "@mui/material/MenuItem";
// import ListItemText from "@mui/material/ListItemText";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import Typography from "@mui/material/Typography";
// import Modal from "@mui/material/Modal";
// import IconButton from "@mui/material/IconButton";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import LogoutIcon from "@mui/icons-material/Logout";
// import IosShareIcon from "@mui/icons-material/IosShare";
// import PhoneIcon from "@mui/icons-material/Phone";
// import TranslateIcon from "@mui/icons-material/Translate";
// import LoginIcon from "@mui/icons-material/Login";
// import SystemUpdateIcon from "@mui/icons-material/SystemUpdate";
// import Box from "@mui/material/Box";
// import useMediaQuery from "@mui/material/useMediaQuery";
// import { useTheme } from "@mui/material/styles";
// import boldLogo from "../../Assets/Images/boldLogo.png";
// // Cookies
// import { useCookies } from "react-cookie";
// // Video
// import ReactPlayer from "react-player";
// import myVideoPoster from "../../Assets/videos/cashif.jpg";
// // Images
// import logo from "../../Assets/Images/logo.webp";
// import x1 from "../../Assets/Images/x1.webp";
// import x2 from "../../Assets/Images/x2.webp";
// import x3 from "../../Assets/Images/x3.webp";
// import x4 from "../../Assets/Images/x4.webp";
// import x5 from "../../Assets/Images/x5.webp";
// import x6 from "../../Assets/Images/x6.webp";
// import x7 from "../../Assets/Images/x7.webp";
// import x8 from "../../Assets/Images/x8.webp";
// import x9 from "../../Assets/Images/x9.webp";
// import x10 from "../../Assets/Images/x10.webp";
// import x11 from "../../Assets/Images/x11.webp";
// import x12 from "../../Assets/Images/x12.webp";

// //
// const externalLinkSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-up-right" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"></path><path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"></path></svg>`;

// // component for servicens section
// const ServiceCard = ({ service }) => {
//   return (
//     <div className="col-lg-6 col-md-6 col-12 serv-container additional-style">
//       <div className="service-card d-flex flex-column h-100">
//         <div className="service-img">
//           <svg xmlns="http://www.w3.org/2000/svg" viewBox={service.svgViewBox}>
//             <path d={service.svgPath}></path>
//           </svg>
//         </div>
//         <h4>{service.title}</h4>
//         <p dangerouslySetInnerHTML={{ __html: service.description }}></p>
//         <ul>
//           {service.features.map((feature, index) => (
//             <li key={index}>
//               <span>
//                 <svg
//                   className="SvgIcon-root MuiSvgIcon-fontSizeMedium css-119a5lz"
//                   focusable="false"
//                   aria-hidden="true"
//                   viewBox="0 0 24 24"
//                   data-testid="VerifiedUserIcon"
//                 >
//                   <path d="M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"></path>
//                 </svg>
//               </span>
//               <span>{feature}</span>
//             </li>
//           ))}
//         </ul>
//         <Link
//           to={`${process.env.PUBLIC_URL}${service.link}`}
//           className="ask-now-serv mt-4 text-center"
//         >
//           أطلب الأن
//         </Link>
//       </div>
//     </div>
//   );
// };

// const services = [
//   {
//     title: "فحص الشراء",
//     svgViewBox: "0 0 256 512",
//     svgPath:
//       "M160 64c0-11.8-6.5-22.6-16.9-28.2s-23-5-32.8 1.6l-96 64C-.5 111.2-4.4 131 5.4 145.8s29.7 18.7 44.4 8.9L96 123.8V416H32c-17.7 0-32 14.3-32 32s14.3 32 32 32h96 96c17.7 0 32-14.3 32-32s-14.3-32-32-32H160V64z",
//     description:
//       "فحص جميع أجزاء المركبة المستعملة لمعرفة واكتشاف الأعطال والعيوب قبل اتخاذ قرار الشراء.",
//     features: [
//       "فحص اجزاء السيارة",
//       "تجربة السيارة ميدانًيا",
//       "تقرير مفصل عن حالة السيارة",
//       "نقاط ومكافئات",
//     ],
//     link: "/prices",
//   },
//   {
//     title: "خدمة مخدوم",
//     svgViewBox: "0 0 320 512",
//     svgPath:
//       "M142.9 96c-21.5 0-42.2 8.5-57.4 23.8L54.6 150.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L40.2 74.5C67.5 47.3 104.4 32 142.9 32C223 32 288 97 288 177.1c0 38.5-15.3 75.4-42.5 102.6L109.3 416H288c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9L200.2 234.5c15.2-15.2 23.8-35.9 23.8-57.4c0-44.8-36.3-81.1-81.1-81.1z",
//     description: `في حال وجدت سيارة للبيع في <u>الرياض، جدة، أو الدمام</u> وأنت خارج هذه المدن، مركز كاشف يقوم بفحص شامل ودقيق للسيارة، مع تسهيل إجراءات نقل الملكية والتأمين.`,
//     features: [
//       "حضور مالك السيارة لأحد فروع كاشف",
//       "إجراء فحص شامل ودقيق للسيارة",
//       "تحميل تقرير الفحص عبر موقعنا",
//       "إتمام نقل الملكية والتأمين بكل سهولة",
//     ],
//     link: "/prices?checkit=true",
//   },
// ];
// //

// // Inspection parts
// const inspectionSteps = [
//   {
//     id: 1,
//     img: x1,
//     alt: "Vehicle data registration logo",
//     text: "تسجيل بيانات المركبة",
//   },
//   {
//     id: 2,
//     img: x2,
//     alt: "Engine and transmission mechanics inspection logo",
//     text: "فحص ميكانيكا المحرك والقير",
//   },
//   {
//     id: 3,
//     img: x3,
//     alt: "Computer checking of sensors logo",
//     text: "فحص الحساسات بالكمبيوتر",
//   },
//   {
//     id: 4,
//     img: x4,
//     alt: "Airbag safety check logo",
//     text: "فحص سلامة الوسائد الهوائية",
//   },
//   {
//     id: 5,
//     img: x5,
//     alt: "Mechanical inspection of the undercarriage logo",
//     text: "فحص ميكانيكا أسفل السيارة",
//   },
//   {
//     id: 6,
//     img: x6,
//     alt: "Checking oils, fluids and leaks logo",
//     text: "فحص الزيوت والسوائل والتسريبات",
//   },
//   {
//     id: 7,
//     img: x7,
//     alt: "Inspect brake and suspension systems logo",
//     text: "فحص أنظمة الفرامل والتعليق",
//   },
//   {
//     id: 8,
//     img: x8,
//     alt: "Chassis and plumbing inspection logo",
//     text: "فحص الهيكل والسمكرة",
//   },
//   {
//     id: 9,
//     img: x9,
//     alt: "Inspection of decoration and interior logo",
//     text: "فحص الديكور والداخلية",
//   },
//   {
//     id: 10,
//     img: x10,
//     alt: "Tire safety inspection logo",
//     text: "فحص سلامة الإطارات",
//   },
//   {
//     id: 11,
//     img: x11,
//     alt: "Test the vehicle on the road logo",
//     text: "تجربة المركبة على الطريق",
//   },
//   {
//     id: 12,
//     img: x12,
//     alt: "Print the report and explain it logo",
//     text: "طباعة التقرير وشرحه",
//   },
// ];
// const firstGroup = inspectionSteps.slice(0, 6);
// const secondGroup = inspectionSteps.slice(6);
// //

// // Why Deal with US
// const boxItems = [
//   {
//     icon: (
//       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
//         <path d="M173.8 5.5c11-7.3 25.4-7.3 36.4 0L228 17.2c6 3.9 13 5.8 20.1 5.4l21.3-1.3c13.2-.8 25.6 6.4 31.5 18.2l9.6 19.1c3.2 6.4 8.4 11.5 14.7 14.7L344.5 83c11.8 5.9 19 18.3 18.2 31.5l-1.3 21.3c-.4 7.1 1.5 14.2 5.4 20.1l11.8 17.8c7.3 11 7.3 25.4 0 36.4L366.8 228c-3.9 6-5.8 13-5.4 20.1l1.3 21.3c.8 13.2-6.4 25.6-18.2 31.5l-19.1 9.6c-6.4 3.2-11.5 8.4-14.7 14.7L301 344.5c-5.9 11.8-18.3 19-31.5 18.2l-21.3-1.3c-7.1-.4-14.2 1.5-20.1 5.4l-17.8 11.8c-11 7.3-25.4 7.3-36.4 0L156 366.8c-6-3.9-13-5.8-20.1-5.4l-21.3 1.3c-13.2 .8-25.6-6.4-31.5-18.2l-9.6-19.1c-3.2-6.4-8.4-11.5-14.7-14.7L39.5 301c-11.8-5.9-19-18.3-18.2-31.5l1.3-21.3c.4-7.1-1.5-14.2-5.4-20.1L5.5 210.2c-7.3-11-7.3-25.4 0-36.4L17.2 156c3.9-6 5.8-13 5.4-20.1l-1.3-21.3c-.8-13.2 6.4-25.6 18.2-31.5l19.1-9.6C65 70.2 70.2 65 73.4 58.6L83 39.5c5.9-11.8 18.3-19 31.5-18.2l21.3 1.3c7.1 .4 14.2-1.5 20.1-5.4L173.8 5.5zM272 192a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM1.3 441.8L44.4 339.3c.2 .1 .3 .2 .4 .4l9.6 19.1c11.7 23.2 36 37.3 62 35.8l21.3-1.3c.2 0 .5 0 .7 .2l17.8 11.8c5.1 3.3 10.5 5.9 16.1 7.7l-37.6 89.3c-2.3 5.5-7.4 9.2-13.3 9.7s-11.6-2.2-14.8-7.2L74.4 455.5l-56.1 8.3c-5.7 .8-11.4-1.5-15-6s-4.3-10.7-2.1-16zm248 60.4L211.7 413c5.6-1.8 11-4.3 16.1-7.7l17.8-11.8c.2-.1 .4-.2 .7-.2l21.3 1.3c26 1.5 50.3-12.6 62-35.8l9.6-19.1c.1-.2 .2-.3 .4-.4l43.2 102.5c2.2 5.3 1.4 11.4-2.1 16s-9.3 6.9-15 6l-56.1-8.3-32.2 49.2c-3.2 5-8.9 7.7-14.8 7.2s-11-4.3-13.3-9.7z"></path>
//       </svg>
//     ),
//     title: "ضمان صحة التقارير",
//     description:
//       "التزامًا بالجودة والموثوقية, نقدم ضمانًا لسلامة وصحة نتائج تقاريرنا في فحص السيارات",
//   },
//   {
//     icon: (
//       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
//         <path d="M280 24c0-13.3-10.7-24-24-24s-24 10.7-24 24v80c0 13.3 10.7 24 24 24s24-10.7 24-24V24zM185.8 224H326.2c6.8 0 12.8 4.3 15.1 10.6L360.3 288H151.7l19.1-53.4c2.3-6.4 8.3-10.6 15.1-10.6zm-75.3-10.9L82.2 292.4C62.1 300.9 48 320.8 48 344v40 64 32c0 17.7 14.3 32 32 32H96c17.7 0 32-14.3 32-32V448H384v32c0 17.7 14.3 32 32 32h16c17.7 0 32-14.3 32-32V448 384 344c0-23.2-14.1-43.1-34.2-51.6l-28.3-79.3C390.1 181.3 360 160 326.2 160H185.8c-33.8 0-64 21.3-75.3 53.1zM128 344a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm232 24a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zM39 39c-9.4 9.4-9.4 24.6 0 33.9l48 48c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L73 39c-9.4-9.4-24.6-9.4-33.9 0zm400 0L391 87c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l48-48c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0z"></path>
//       </svg>
//     ),
//     title: "فحص جميع السيارات",
//     description:
//       "نفحص جميع أنواع السيارات الكبيرة والصغيرة سواء كانت تعمل بالبنزين أو الكهرباء بدقة تامة",
//   },
//   {
//     icon: (
//       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
//         <path d="M400 0L176 0c-26.5 0-48.1 21.8-47.1 48.2c.2 5.3 .4 10.6 .7 15.8L24 64C10.7 64 0 74.7 0 88c0 92.6 33.5 157 78.5 200.7c44.3 43.1 98.3 64.8 138.1 75.8c23.4 6.5 39.4 26 39.4 45.6c0 20.9-17 37.9-37.9 37.9L192 448c-17.7 0-32 14.3-32 32s14.3 32 32 32l192 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-26.1 0C337 448 320 431 320 410.1c0-19.6 15.9-39.2 39.4-45.6c39.9-11 93.9-32.7 138.2-75.8C542.5 245 576 180.6 576 88c0-13.3-10.7-24-24-24L446.4 64c.3-5.2 .5-10.4 .7-15.8C448.1 21.8 426.5 0 400 0zM48.9 112l84.4 0c9.1 90.1 29.2 150.3 51.9 190.6c-24.9-11-50.8-26.5-73.2-48.3c-32-31.1-58-76-63-142.3zM464.1 254.3c-22.4 21.8-48.3 37.3-73.2 48.3c22.7-40.3 42.8-100.5 51.9-190.6l84.4 0c-5.1 66.3-31.1 111.2-63 142.3z"></path>
//       </svg>
//     ),
//     title: "نقاط ولاء للعملاء",
//     description:
//       "كل زيارة لمركز كاشف تحصل على رصيد مجاني تستفيد منه في الفحص القادم",
//   },
//   {
//     icon: (
//       <svg
//         aria-hidden="true"
//         className="e-font-icon-svg e-fas-star"
//         viewBox="0 0 576 512"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path>
//       </svg>
//     ),
//     title: "خبرة اكثر من 10+",
//     description:
//       "تمتد خبرتنا لأكثر من 12 عامًا في فحص السيارات حيث نتميز بدقة الفحص والتقارير",
//   },
// ];

// export default function Home() {
//   React.useEffect(() => {
//     // Scroll to the top of the page
//     window.scrollTo(0, 0);
//   }, []);
//   //
//   // Check if devics iPhone
//   const [isIOS, setIsIOS] = React.useState(false);
//   React.useEffect(() => {
//     const userAgent = window.navigator.userAgent.toLowerCase();
//     setIsIOS(/iphone|ipad|ipod/.test(userAgent));
//   }, []);

//   const [openIosModal, setOpenIosModal] = React.useState(false);
//   const handleIosModalOpen = () => setOpenIosModal(true);
//   const handleIosModalClose = () => setOpenIosModal(false);

//   // PWM Notification
//   const [deferredPrompt, setDeferredPrompt] = React.useState(null);

//   React.useEffect(() => {
//     const handleBeforeInstallPrompt = (event) => {
//       // console.log(event);
//       event.preventDefault();
//       setDeferredPrompt(event);
//     };

//     window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

//     return () => {
//       window.removeEventListener(
//         "beforeinstallprompt",
//         handleBeforeInstallPrompt
//       );
//     };
//   }, []);

//   const handleInstallClick = () => {
//     if (deferredPrompt) {
//       deferredPrompt.prompt();
//       deferredPrompt.userChoice.then((choiceResult) => {
//         if (choiceResult.outcome === "accepted") {
//           console.log("User accepted the A2HS prompt");
//         } else {
//           console.log("User dismissed the A2HS prompt");
//         }
//         setDeferredPrompt(null);
//       });
//     }
//   };

//   // Controll the positin of drop down menue
//   const theme = useTheme();
//   const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
//   //
//   const navigate = useNavigate();

//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const open = Boolean(anchorEl);
//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   // Logout
//   const [cookies, setCookie, removeCookie] = useCookies([
//     "tokenApp",
//     "username",
//     "userId",
//     "phoneNumber",
//   ]);

//   const logout = () => {
//     handleClose();
//     removeCookie("userId", { path: "/dashboard" });
//     removeCookie("phoneNumber", { path: "/dashboard" });
//     removeCookie("username", { path: "/dashboard" });
//     removeCookie("tokenApp", { path: "/dashboard" });

//     // Refresh the page after logout
//     window.location.reload();
//   };
//   const login = () => {
//     handleClose();
//     navigate(`${process.env.PUBLIC_URL}/login`);
//   };

//   const listRefs = React.useRef([]);
//   const contact = () => {
//     handleClose();
//     listRefs.current.forEach((item) => item.classList.remove("act"));
//     navigate(`${process.env.PUBLIC_URL}/contact`);
//   };

//   return (
//     <div dir="rtl" className={style.container}>
//       <div className="home-father">
//         {/* <!--Start intro section--> */}
//         <section className="intro-section">
//           <div className="circle circle-top"></div>
//           <div className="circle circle-top-left"></div>
//           <div className="circle circle-top-right"></div>
//           <div className="circle large-circle"></div>
//           <div className="circle xs-circle1"></div>
//           <div className="circle xs-circle"></div>

//           <div className="container p-0">
//             <div className="intro-content">
//               <div className="logo-img">
//                 <img src={logo} alt="Cashif logo" />
//               </div>
//               <div className="discount-details">
//                 <h6>
//                   <span>كاشف لفحص السيارات</span>
//                   <br />
//                   مركز متخصص في فحص السيارات المستعملة، يقدم مفهومًا جديدًا
//                   يواكب أحدث التقنيات ليساعدك في قرار الشراء
//                 </h6>
//               </div>

//               <div className="login-btn-box">
//                 <Tooltip
//                   title="المزيد"
//                   className={style.three_dots}
//                   id="basic-button"
//                   aria-controls={open ? "basic-menu" : undefined}
//                   aria-haspopup="true"
//                   aria-expanded={open ? "true" : undefined}
//                   onClick={handleClick}
//                 >
//                   <IconButton>
//                     {cookies.tokenApp ? (
//                       <AccountCircleIcon
//                         sx={{ color: "#fff", fontSize: "44px" }}
//                       />
//                     ) : (
//                       <MoreVertIcon sx={{ color: "#fff", fontSize: "32px" }} />
//                     )}
//                   </IconButton>
//                 </Tooltip>
//               </div>
//             </div>
//           </div>
//         </section>
//         {/* <!--End intro section--> */}

//         {/* Start Menue */}
//         <Popover
//           dir="rtl"
//           id="basic-menu"
//           anchorEl={anchorEl}
//           open={open}
//           onClose={handleClose}
//           anchorOrigin={{
//             vertical: "bottom",
//             horizontal: isSmallScreen ? "center" : "left",
//           }}
//           transformOrigin={{
//             vertical: "top",
//             horizontal: isSmallScreen ? "center" : "right",
//           }}
//           disableScrollLock={true}
//         >
//           <Paper sx={{ maxWidth: "100%" }}>
//             <MenuList>
//               <MenuItem onClick={handleClose}>
//                 <ListItemIcon>
//                   <TranslateIcon fontSize="small" />
//                 </ListItemIcon>
//                 <ListItemText>English</ListItemText>
//               </MenuItem>
//               <MenuItem onClick={contact}>
//                 <ListItemIcon>
//                   <PhoneIcon fontSize="small" />
//                 </ListItemIcon>
//                 <ListItemText>اتصل بنا</ListItemText>
//               </MenuItem>

//               {deferredPrompt && (
//                 <MenuItem onClick={handleInstallClick}>
//                   <ListItemIcon>
//                     <SystemUpdateIcon fontSize="small" />
//                   </ListItemIcon>
//                   <ListItemText>تثبيت كتطبيق PWA</ListItemText>
//                 </MenuItem>
//               )}

//               {isIOS && (
//                 <MenuItem onClick={handleIosModalOpen}>
//                   <ListItemIcon>
//                     <SystemUpdateIcon fontSize="small" />
//                   </ListItemIcon>
//                   <ListItemText>تثبيت كتطبيق PWA</ListItemText>
//                 </MenuItem>
//               )}

//               <Divider />

//               {cookies.tokenApp ? (
//                 <MenuItem onClick={logout}>
//                   <ListItemIcon>
//                     <LogoutIcon fontSize="small" />
//                   </ListItemIcon>
//                   <ListItemText>تسجيل الخروج</ListItemText>
//                 </MenuItem>
//               ) : (
//                 <MenuItem onClick={login}>
//                   <ListItemIcon>
//                     <LoginIcon fontSize="small" />
//                   </ListItemIcon>
//                   <ListItemText>تسجيل الدخول</ListItemText>
//                 </MenuItem>
//               )}
//             </MenuList>
//           </Paper>
//         </Popover>
//         {/* End Menue */}

//         {/* Start IOS Modal */}
//         <Modal
//           open={openIosModal}
//           onClose={handleIosModalClose}
//           aria-labelledby="modal-modal-title"
//           aria-describedby="modal-modal-description"
//         >
//           <Box
//             dir="rtl"
//             sx={{
//               position: "absolute",
//               top: "50%",
//               left: "50%",
//               transform: "translate(-50%, -50%)",
//               bgcolor: "background.paper",
//               p: 4,
//               textAlign: "center",
//               width: "361px",
//               borderRadius: "16px",
//               boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
//               backgroundColor: "#fff",
//             }}
//           >
//             <div
//               style={{
//                 width: "75px",
//                 margin: "auto",
//                 marginBottom: "32px",
//                 borderRadius: "9px",
//                 overflow: "hidden",
//                 aspectRatio: "1 / 1",
//               }}
//             >
//               <img style={{ width: "100%" }} src={boldLogo} alt="cashif logo" />
//             </div>
//             <Typography id="modal-modal-title" variant="h6" component="h2">
//               تثبيت كتطبيق PWA
//             </Typography>
//             <Typography
//               id="modal-modal-description"
//               sx={{ mt: 2, color: "#3e3e3e" }}
//             >
//               لتثبيت التطبيق قم بالضغط على زر "المشاركة"{" "}
//               <IosShareIcon sx={{ color: "#174545" }} /> ثم اختر "اضافة الى
//               الشاشة الرئيسية"
//             </Typography>
//           </Box>
//         </Modal>
//         {/* End IOS Modal */}

//         {/* <!--Start Video Section--> */}
//         <div className="title-box">
//           <h2 style={{ paddingTop: "60px" }}>من هو كاشف ؟</h2>
//         </div>
//         <section className="video-container">
//           <div className="container">
//             <div
//               className="video-box"
//               style={{ display: "flex", justifyContent: "center" }}
//             >
//               <ReactPlayer
//                 url="https://cashif.cc/wp-content/themes/cashif_theme/assets/videos/cashif.mp4"
//                 controls={true} // Show play/pause controls
//                 width="100%" // Responsive width
//                 height="auto" // Adjust height automatically
//                 light={myVideoPoster}
//                 style={{ aspectRatio: "16 / 9" }}
//               />
//             </div>
//           </div>
//         </section>
//         {/* <!--End Video Section--> */}

//         {/* <!-- Start Our Services Section --> */}
//         <div className="title-box">
//           <h2>خدماتنا</h2>
//         </div>
//         <section className="services-section">
//           <div className="container">
//             <div className="row justify-content-center">
//               {services.map((service, index) => (
//                 <ServiceCard key={index} service={service} />
//               ))}
//             </div>
//           </div>
//         </section>
//         {/* <!-- End Our Services Section --> */}

//         {/* <!-- Start inspection stage section --> */}
//         <div className="title-box">
//           <h2>أجزاء ومراحل الفحص</h2>
//         </div>
//         <div className="cont">
//           <div dir="rtl" className="price_box">
//             <div className="g_one">
//               <ul id="first_ul">
//                 {firstGroup.map((step) => (
//                   <li key={step.id} className="u_padd">
//                     <img className="stages-img" src={step.img} alt={step.alt} />
//                     {step.text}
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             <div className="g_two">
//               <ul id="second_ul">
//                 {secondGroup.map((step) => (
//                   <li key={step.id} className="u_padd">
//                     <img className="stages-img" src={step.img} alt={step.alt} />
//                     {step.text}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </div>
//         {/* <!-- End inspection stage section --> */}

//         {/* <!-- Start why deal with us section --> */}
//         <div className="title-box">
//           <h2>لماذا تتعامل معنا ؟</h2>
//         </div>
//         <section className="why-we-container">
//           <div className="why-we-boxs">
//             {boxItems.map((item, index) => (
//               <div className="how-we-box" key={index}>
//                 <div>{item.icon}</div>
//                 <h2>{item.title}</h2>
//                 <p>{item.description}</p>
//               </div>
//             ))}
//           </div>
//         </section>
//         {/* <!-- End why deal with us section --> */}

//         {/* <!--start footer section--> */}
//         <footer className="footer-section">
//           <div className="container">
//             <div className="row">
//               <div className="col-xl-3 col-lg-6 col-md-12 col-12">
//                 <div className="footer-logo-img">
//                   <img src={logo} alt="Cashif logo" />
//                 </div>

//                 <p className="footer-intro">
//                   نسعى في كاشف، لإبراز رسالة توعوية غاية في الأهمية؛ تتمثل في
//                   رفع الوعي لدى المستهلك بضرورة الكشف على المركبة المستعملة لدى
//                   مركز متخصص قبل الشروع في الشراء .
//                 </p>

//                 <div className="socials">
//                   <a
//                     href="https://www.youtube.com/@cashifcc"
//                     aria-label="YouTube"
//                   >
//                     <svg
//                       aria-hidden="true"
//                       className="e-font-icon-svg e-fab-youtube"
//                       viewBox="0 0 576 512"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"></path>
//                     </svg>
//                   </a>
//                   <a
//                     href="https://www.instagram.com/cashif_sa"
//                     aria-label="instagram"
//                   >
//                     <svg
//                       aria-hidden="true"
//                       className="e-font-icon-svg e-fab-instagram"
//                       viewBox="0 0 448 512"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
//                     </svg>
//                   </a>
//                   <a
//                     href="https://www.tiktok.com/@cashif_sa"
//                     aria-label="tiktok"
//                   >
//                     <svg
//                       aria-hidden="true"
//                       className="e-font-icon-svg e-fab-tiktok"
//                       viewBox="0 0 448 512"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"></path>
//                     </svg>
//                   </a>
//                   <a href="https://x.com/cashif_sa" aria-label="x">
//                     <svg
//                       aria-hidden="true"
//                       className="e-font-icon-svg e-fab-x-twitter"
//                       viewBox="0 0 512 512"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"></path>
//                     </svg>
//                   </a>
//                   <a
//                     href="https://www.snapchat.com/add/cashif_sa"
//                     aria-label="snapchat"
//                   >
//                     <svg
//                       aria-hidden="true"
//                       className="e-font-icon-svg e-fab-snapchat-ghost"
//                       viewBox="0 0 512 512"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path d="M510.846 392.673c-5.211 12.157-27.239 21.089-67.36 27.318-2.064 2.786-3.775 14.686-6.507 23.956-1.625 5.566-5.623 8.869-12.128 8.869l-.297-.005c-9.395 0-19.203-4.323-38.852-4.323-26.521 0-35.662 6.043-56.254 20.588-21.832 15.438-42.771 28.764-74.027 27.399-31.646 2.334-58.025-16.908-72.871-27.404-20.714-14.643-29.828-20.582-56.241-20.582-18.864 0-30.736 4.72-38.852 4.72-8.073 0-11.213-4.922-12.422-9.04-2.703-9.189-4.404-21.263-6.523-24.13-20.679-3.209-67.31-11.344-68.498-32.15a10.627 10.627 0 0 1 8.877-11.069c69.583-11.455 100.924-82.901 102.227-85.934.074-.176.155-.344.237-.515 3.713-7.537 4.544-13.849 2.463-18.753-5.05-11.896-26.872-16.164-36.053-19.796-23.715-9.366-27.015-20.128-25.612-27.504 2.437-12.836 21.725-20.735 33.002-15.453 8.919 4.181 16.843 6.297 23.547 6.297 5.022 0 8.212-1.204 9.96-2.171-2.043-35.936-7.101-87.29 5.687-115.969C158.122 21.304 229.705 15.42 250.826 15.42c.944 0 9.141-.089 10.11-.089 52.148 0 102.254 26.78 126.723 81.643 12.777 28.65 7.749 79.792 5.695 116.009 1.582.872 4.357 1.942 8.599 2.139 6.397-.286 13.815-2.389 22.069-6.257 6.085-2.846 14.406-2.461 20.48.058l.029.01c9.476 3.385 15.439 10.215 15.589 17.87.184 9.747-8.522 18.165-25.878 25.018-2.118.835-4.694 1.655-7.434 2.525-9.797 3.106-24.6 7.805-28.616 17.271-2.079 4.904-1.256 11.211 2.46 18.748.087.168.166.342.239.515 1.301 3.03 32.615 74.46 102.23 85.934 6.427 1.058 11.163 7.877 7.725 15.859z"></path>
//                     </svg>
//                   </a>
//                 </div>
//               </div>

//               <div className="col-xl-9 col-lg-6 col-md-12 col-12">
//                 <div className="row">
//                   <div className="col-xl-3 col-md-6 col-6">
//                     <div className="help-list">
//                       <h4>فروعنا</h4>
//                       <ul>
//                         <li>
//                           <a href="https://maps.app.goo.gl/MiFGsgakfo62on7u8">
//                             الرياض - القادسية{" "}
//                             <span
//                               dangerouslySetInnerHTML={{
//                                 __html: externalLinkSvg,
//                               }}
//                             ></span>
//                           </a>
//                         </li>

//                         <li>
//                           <a href="https://maps.app.goo.gl/pXCnG7RPXJ2CDLqe7?g_st=aw">
//                             الرياض - الشفا{" "}
//                             <span
//                               dangerouslySetInnerHTML={{
//                                 __html: externalLinkSvg,
//                               }}
//                             ></span>
//                           </a>
//                         </li>
//                         <li>
//                           <a href="https://maps.app.goo.gl/9UiHq4kW7Mjh1Aik8">
//                             الدمام{" "}
//                             <span
//                               dangerouslySetInnerHTML={{
//                                 __html: externalLinkSvg,
//                               }}
//                             ></span>
//                           </a>
//                         </li>
//                         <li>
//                           <a href="https://maps.app.goo.gl/697yXkaS4o6kYsos8">
//                             جدة{" "}
//                             <span
//                               dangerouslySetInnerHTML={{
//                                 __html: externalLinkSvg,
//                               }}
//                             ></span>
//                           </a>
//                         </li>
//                       </ul>
//                     </div>
//                   </div>

//                   <div className="col-xl-3 col-md-6 col-6">
//                     <div className="help-list">
//                       <h4>خدمات كاشف</h4>
//                       <ul>
//                         <li>
//                           <a href="#prices">فحص ما قبل الشراء</a>
//                         </li>

//                         <li>
//                           <a href="https://cashif.cc/check-it/">خدمة مخدوم</a>
//                         </li>
//                       </ul>
//                     </div>
//                   </div>

//                   <div className="col-xl-3 col-md-6 col-6">
//                     <div className="help-list">
//                       <h4>روابط مهمة</h4>
//                       <ul>
//                         <li>
//                           <a href="https://cashif.cc/terms-and-privacy-policy/">
//                             الأحكام والخصوصية
//                           </a>
//                         </li>

//                         <li>
//                           <a href="https://cashif.cc/return-policy/">
//                             الاسترجاع والاستبدال
//                           </a>
//                         </li>

//                         <li>
//                           <a href="https://cashif.cc/blog/">المدونة</a>
//                         </li>
//                       </ul>
//                     </div>
//                   </div>

//                   <div className="col-xl-3 col-md-6 col-6 contact-us">
//                     <div className="footer-contact">
//                       <h4>تواصل معنا</h4>
//                       <ul>
//                         <li className="footer-contact-li">
//                           <span>خدمة العملاء</span>
//                           <p>
//                             <a href="tel:920019948">920019948</a>
//                           </p>
//                         </li>
//                       </ul>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </footer>
//         {/* <!--end footer section--> */}
//       </div>
//     </div>
//   );
// }
