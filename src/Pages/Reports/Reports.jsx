import style from "./Reports.module.scss";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// MUI
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import Modal from "@mui/material/Modal";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
// MUI Icons
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import DownloadIcon from "@mui/icons-material/Download";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MinorCrashIcon from "@mui/icons-material/MinorCrash";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import StyleIcon from "@mui/icons-material/Style";
import InfoIcon from "@mui/icons-material/Info";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
// Toastify
import { toast } from "react-toastify";
// Cookies
import { useCookies } from "react-cookie";
// Api
import useGetPoinsApi from "../../API/useGetPoinsApi";
import { useGetAllCardsApi } from "../../API/useGetAllCardsApi";
import { fetchDownloadCard } from "../../API/useDownloadCardApi";
import { fetchImgCard } from "../../API/useGetImgCardApi";
import useGetAllSummaryReportsNumbersApi from "../../API/useGetAllSummaryReportsNumbersApi";
import { fetchDownloadSummaryReport } from "../../API/useDownloadSummaryReportsApi";
// NumberFlow
import NumberFlow from "@number-flow/react";
// MUI Table
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// Lang
import i18n from "../../i18n"; // Make sure to import i18n
import { useTranslation } from "react-i18next";

// Utility function to format date to dd/mm/yyyy
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();
  return `${year}/${month}/${day}`;
};

// MUI Table
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, clr) {
  return { name, calories, fat, carbs, clr };
}

export default function Reports() {
  const { t } = useTranslation();
  const [languageText, setLanguageText] = useState(i18n.language);
  // Add language change listener
  useEffect(() => {
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
  useEffect(() => {
    // Scroll to the top of the page
    window.scrollTo(0, 0);
  }, []);

  // Cookies
  const [cookies, setCookie] = useCookies(["tokenApp"]);
  const [temporaryCookie, setTemporaryCookie] = useState([]);

  const [isHovered, setIsHovered] = useState(false);
  //
  const {
    data: AllSummaryReportsNumbers,
    fetchStatus: fetchAllSummaryReportsNumbersStatus,
  } = useGetAllSummaryReportsNumbersApi();
  //

  const { data: points } = useGetPoinsApi();
  const { data: cardsData, fetchStatus: fetchCardStatus } = useGetAllCardsApi();

  // State to manage the checkbox value in trems and condetions
  // condetion And Terms Modal
  const [openCondetionAndTermsModal, setOpenCondetionAndTermsModal] =
    useState(false);

  const [currentCardId, setCurrentCardId] = useState(null);
  const [currentCardIncludeImage, setCurrentCardIncludeImage] = useState(false);
  const handleCondetionAndTermsModalOpen = (id, includeImage) => {
    setCurrentCardId(id);
    setCurrentCardIncludeImage(includeImage);
    setOpenCondetionAndTermsModal(true);
  };

  const handleCondetionAndTermsModalClose = () => {
    setOpenCondetionAndTermsModal(false);
  };

  const [checked, setChecked] = useState(false);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  // Download pdf Card
  const [loadingDownload, setLoadingDownload] = useState({});

  const handleDownloadCard = async (id, includeImage) => {
    setChecked(false); // Reset terms and condetions checkbox

    // Check if NOT accepted terms before
    // if (!cookies[`card-${id}`] && !temporaryCookie[`card-${id}`]) {
    if (false) {
      handleCondetionAndTermsModalOpen(id, includeImage); // Open terms modal
    } else {
      try {
        setLoadingDownload((prev) => ({ ...prev, [id]: true })); // Set loading for the specific card
        // Call the API to download the card
        let response;
        if (includeImage) {
          response = await fetchImgCard(id);
        } else {
          response = await fetchDownloadCard(id);
        }

        // Create a blob from the response data
        const blob = new Blob([response], { type: "application/pdf" });

        // Create a link element
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = `card_${id}.pdf`; // Set the file name

        // Append to the body
        document.body.appendChild(link);

        // Trigger the download
        link.click();

        // Clean up and remove the link
        document.body.removeChild(link);
      } catch (error) {
        console.error("Error downloading the card:", error);
        toast.error(error.message);
      } finally {
        setLoadingDownload((prev) => ({ ...prev, [id]: false })); // Reset loading for the specific card
        setChecked(false); // Reset terms and condetions checkbox
      }
    }
  };

  // Download Summary Reports Button
  const [loadingSummaryCardDownload, setLoadingSummaryCardDownload] = useState(
    {}
  );
  const handleDownloadSummaryCard = async (id) => {
    try {
      setLoadingSummaryCardDownload((prev) => ({ ...prev, [id]: true })); // Set loading for the specific card
      // Call the API to download the card
      let response = await fetchDownloadSummaryReport(id);

      // Create a blob from the response data
      const blob = new Blob([response], { type: "application/pdf" });

      // Create a link element
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `card_${id}.pdf`; // Set the file name

      // Append to the body
      document.body.appendChild(link);

      // Trigger the download
      link.click();

      // Clean up and remove the link
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading the card:", error);
      toast.error(error.message);
    } finally {
      setLoadingSummaryCardDownload((prev) => ({ ...prev, [id]: false })); // Reset loading for the specific card
    }
  };

  //
  const downloadFromTermsModal = async () => {
    if (!currentCardId) return; // Add a safety check

    setLoadingDownload((prev) => ({ ...prev, [currentCardId]: true })); // Set loading for the specific card

    setCookie(`card-${currentCardId}`, "true", {
      path: "/dashboard",
      expires: new Date(Date.now() + 10 * 365 * 24 * 60 * 60 * 1000),
    });

    setTemporaryCookie((prev) => ({
      ...prev,
      [`card-${currentCardId}`]: true,
    }));

    setOpenCondetionAndTermsModal(false); // Close the Modal

    try {
      // Call the API to download the card
      let response;
      if (currentCardIncludeImage) {
        response = await fetchImgCard(currentCardId);
      } else {
        response = await fetchDownloadCard(currentCardId);
      }

      // Create a blob from the response data
      const blob = new Blob([response], { type: "application/pdf" });

      // Create a link element
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `card_${currentCardId}.pdf`; // Set the file name

      // Append to the body
      document.body.appendChild(link);

      // Trigger the download
      link.click();

      // Clean up and remove the link
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading the card:", error);
      toast.error(error.message);
    } finally {
      setLoadingDownload((prev) => ({ ...prev, [currentCardId]: false })); // Reset loading for the specific card
      setChecked(false); // Reset terms and condetions checkbox
    }
  };

  // Change color
  const getClientColor = () => {
    switch (points?.clientTypeAr) {
      case "برونزي":
        return "#E69546"; // برونزي
      case "فضي":
        return "#D4D4D4"; // فضي
      case "ذهبي":
        return "#FFDF00"; // ذهبي
      case "بلاتيني":
        return "#E5E4E2"; // بلاتيني
      case "نخبة":
        return "#000000"; // بنفسجي (للمستوى نخبة)
      default:
        return "#fff"; // لون افتراضي إذا لم يتطابق أي نوع
    }
  };

  // Handle calculateProgress Value
  // First, let's create a function to calculate the progress value based on points and client type
  const calculateProgressValue = (pointsData) => {
    if (!pointsData) return 0;

    const { points, clientTypeAr } = pointsData;
    const currentPoints = points || 0;

    // Define the minimum points required for each level
    const levelRequirements = {
      إفتراضي: 0,
      برونزي: 1,
      فضي: 101,
      ذهبي: 251,
      بلاتيني: 501,
      نخبة: 851,
    };

    // Get current level and next level requirements
    const currentLevel = clientTypeAr || "إفتراضي";
    const currentLevelPoints = levelRequirements[currentLevel];
    const nextLevel = getNextLevel(currentLevel);
    const nextLevelPoints = nextLevel
      ? levelRequirements[nextLevel]
      : levelRequirements["نخبة"];

    // If user is at the highest level (نخبة), show 100%
    if (!nextLevel) return 100;

    // Calculate progress towards next level
    const pointsNeededForNextLevel = nextLevelPoints - currentLevelPoints;
    const pointsAchievedTowardsNextLevel = currentPoints - currentLevelPoints;

    // Calculate percentage (capped at 100)
    const progress = Math.min(
      Math.round(
        (pointsAchievedTowardsNextLevel / pointsNeededForNextLevel) * 100
      ),
      100
    );

    return progress;
  };

  // Helper function to get the next level
  const getNextLevel = (currentLevel) => {
    const levels = ["إفتراضي", "برونزي", "فضي", "ذهبي", "بلاتيني", "نخبة"];
    const currentIndex = levels.indexOf(currentLevel);
    return currentIndex < levels.length - 1 ? levels[currentIndex + 1] : null;
  };

  // Modal
  const [isClientTypesModalOpen, setisClientTypesModalOpen] = useState(false);
  const handleOpenClientTypesModal = () => setisClientTypesModalOpen(true);
  const handleClientTypesModalClose = () => setisClientTypesModalOpen(false);

  const rows = [
    createData(t("Reports.bronze"), 1, 100, 5, "#E69546"),
    createData(t("Reports.silver"), 101, 250, 6, "#D4D4D4"),
    createData(t("Reports.golden"), 251, 500, 7, "#FFDF00"),
    createData(t("Reports.platini"), 501, 850, 8, "#E5E4E2"),
    createData(t("Reports.elite"), 851, 100000, 10, "#000000"),
  ];

  return (
    <div
      dir={languageText === "ar" ? "rtl" : "ltr"}
      className={style.container}
    >
      {/* Points */}

      <div className={style.points_container}>
        <div className={style.money_card_container}>
          <div className={style.money_card_header}>
            <div>
              <h3>{t("Reports.points")}</h3>
              <p style={{ fontSize: "14px" }}>
                {t("Reports.pointWorthInRiyal")}
              </p>
              {/* <h1>
                {points && points.points !== undefined ? points.points : 0}{" "}
              </h1> */}
              <h1>
                <NumberFlow
                  value={points?.points || 0}
                  duration={1500}
                  delay={0}
                  ease="outExpo"
                  formattingFn={(value) => Math.floor(value).toLocaleString()}
                />
              </h1>
            </div>

            <div>
              <Box position="relative" display="inline-flex">
                <CircularProgress
                  variant="determinate"
                  value={100}
                  size={150}
                  thickness={6}
                  sx={{
                    color: "#3887d5",
                    position: "absolute",
                  }}
                />
                <CircularProgress
                  variant="determinate"
                  value={calculateProgressValue(points)}
                  size={150}
                  thickness={6}
                  sx={{
                    color: getClientColor,
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
                  <h3 style={{ textAlign: "center", color: getClientColor() }}>
                    {t("Reports.rank")}
                  </h3>
                  <h3 style={{ textAlign: "center", color: getClientColor() }}>
                    {languageText === "ar"
                      ? points?.clientTypeAr || "-"
                      : points?.clientTypeEn || "-"}
                  </h3>
                  {/* Adjust size and color as needed */}
                </div>
              </Box>
            </div>
          </div>

          <div className={style.money_card_footer}>
            <Tooltip
              title={t("Reports.allPointsUsedFromYourAccount")}
              arrow
              enterTouchDelay={0}
            >
              <h3>
                {t("Reports.totalPointsUsed")}{" "}
                {points && points.pointsConsumed !== undefined
                  ? points.pointsConsumed
                  : 0}
              </h3>
            </Tooltip>
          </div>

          <div
            className={style.info_icon}
            style={{
              ...(languageText === "en" ? { right: 0 } : { left: 0 }),
            }}
          >
            <IconButton onClick={handleOpenClientTypesModal}>
              <InfoIcon sx={{ color: "#fff" }} />
            </IconButton>
          </div>
        </div>
      </div>

      {/* Client types modal */}
      <Modal
        open={isClientTypesModalOpen}
        onClose={handleClientTypesModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          dir={languageText === "ar" ? "rtl" : "ltr"}
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
          <div className={style.table_box}>
            <div dir={languageText === "ar" ? "rtl" : "ltr"}>
              <h1>{t("Reports.customerCategories")}</h1>

              <TableContainer
                dir={languageText === "ar" ? "rtl" : "ltr"}
                component={Paper}
              >
                <Table
                  dir={languageText === "ar" ? "rtl" : "ltr"}
                  aria-label="customized table"
                >
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="center">
                        {t("Reports.rank")}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {t("Reports.minimumPoints")}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {t("Reports.maximumPoints")}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {t("Reports.pointsPercentage")}
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <StyledTableRow key={row.name}>
                        <StyledTableCell
                          align="center"
                          component="th"
                          scope="row"
                        >
                          {row.name}{" "}
                          <WorkspacePremiumIcon
                            sx={{ verticalAlign: "middle", color: row.clr }}
                          />
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.calories}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.fat}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.carbs}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </Box>
      </Modal>

      {/* Cards */}
      <h5 className={style.last_reports_title}>{t("Reports.myReports")}</h5>
      <Divider sx={{ marginBottom: "18px" }} />

      {!cookies.tokenApp ? (
        <Typography
          variant="h6"
          component="div"
          style={{ textAlign: "center", margin: "20px", color: "#757575" }}
        >
          {t("Reports.please")}{" "}
          <Link
            to={`${process.env.PUBLIC_URL}/login`}
            style={{
              color: "#1976d2",
              textDecoration: isHovered ? "underline" : "none",
            }}
            onMouseOver={() => setIsHovered(true)}
            onMouseOut={() => setIsHovered(false)}
          >
            {t("Reports.logIn")}
          </Link>{" "}
          {t("Reports.toViewReports")}
        </Typography>
      ) : (
        <div className={style.reports_cards_container}>
          {/* Condetion And Terms Modal */}
          <Modal
            open={openCondetionAndTermsModal}
            onClose={handleCondetionAndTermsModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              dir={languageText === "ar" ? "rtl" : "ltr"}
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
                  <h1>وثيقة ضمان المركبة</h1>

                  <h6>البند الأول. مقدمة:</h6>
                  <div>
                    <ul>
                      <li>
                        مركز كاشف يقدم خدمة الفحص الفني للمركبات وفقًا للمعايير
                        المهنية المتعارف عليها، وبناءً على ذلك، نتحمل مسؤولية أي
                        خطأ ناتج عن الفحص خلال مدة الضمان المحددة.
                      </li>
                      <li>
                        يحق للعميل الذي يثبت وقوع خطأ في الفحص مراجعة المركز
                        خلال فترة الضمان المحددة، بحيث يتم دراسة الحالة والتحقق
                        من صحة الحالة، وفي حال ثبوت الخطأ، يتم تعويض العميل
                        وفقًا للإجراءات المعتمدة لدينا، ووفق بنود وثيقة الشروط
                        والأحكام المنصوص عليها في سياسة الضمان الخاصة بنا
                        والمرفقة مع تقرير الفحص، والتي توضح آلية التعويض وحدوده.
                      </li>
                      <li>
                        بعد انتهاء مدة الضمان، فإن مسؤولية المركز عن أي خطأ في
                        الفحص تنتهي، ولا يحق للعميل المطالبة بأي تعويض أو إصلاح،
                        وذلك لكون الفحص يعكس الحالة الفنية للمركبة وقت الفحص
                        فقط، ولا يمكن تحميل المركز مسؤولية أي أعطال أو تغيرات
                        تطرأ بعد انتهاء مدة الضمان.
                      </li>
                    </ul>
                  </div>

                  <h6>
                    البند الثاني. شروط وأحكام وثيقة ضمان الأجزاء المذكورة في
                    التقرير:
                  </h6>
                  <div>
                    <ul>
                      <li>
                        تعتبر المقدمة ضمن الشروط وجزء لا يتجزأ من اتفاقية تقديم
                        الضمان.
                      </li>
                      <li>
                        يمنح الضمان على النقاط والملاحظات المذكورة في تقرير
                        الفحص.
                      </li>
                      <li>يبدأ سريان الضمان من تاريخ الفحص.</li>
                      <li>
                        يستفيد من وثيقة الضمان طالب الفحص المسجل التقرير بأسمه
                        وليس البائع او مالك المركبة.
                      </li>
                      <li>
                        لا يشمل الضمان المركبات التي تجاوز سنة صنعها 15 سنة او
                        قراءة العداد تجاوزت 300 الف كيلو.
                      </li>
                      <li>
                        وثيقة الضمان ليست إقرار بعدم وقوع أي خلل طبيعي أو عارض
                        على بقية أجزاء السيارة الأخرى.
                      </li>
                      <li>
                        مدة الضمان 7 أيام او 250 كيلو ويشمل الأجزاء الرئيسية (
                        المكينة – الجيربوكس – الشاسيه ) فقط.
                      </li>
                      <li>
                        مدة الضمان للهيكل الخارجي (بودي) 3 أيام ولايشمل الصدامات
                        او المركبات التي عليها عازل أو حماية.
                      </li>
                      <li>
                        في حال وجود فك أو تهريب في أي جزء من الأجزاء الأساسية
                        للمركبة مثل :المكينة، الجيربوكس، الدفرنس، الدبل فإن
                        الضمان لا يشمل المركبة.
                      </li>
                      <li>الضمان لا يشمل مبرد القير ومبرد المكينة.</li>
                      <li>
                        مركز كاشف غير مسؤول عن فك أي أجزاء من المكينة او القير
                        للوصول الى عناصر داخلية اثناء الفحص، وفي حال حدوث أي عطل
                        لاحقاً داخل هذه الأجزاء فهي من الأجزاء المخفية التي لا
                        يمكن فحصها، وبالتالي لا يشملها الضمان.
                      </li>
                      <li>
                        الضمان لا يشمل الأجزاء الاستهلاكية والأعطال الكهربائية.
                      </li>
                      <li>
                        الضمان لا يشمل السيارات المعدلة والكلاسيكية والتراثية.
                      </li>
                      <li>
                        يقتصر دور مركز كاشف أثناء فحص الكمبيوتر للكشف على
                        الوسائد الهوائية (الإيرباقات) الأخذ بالنتائج الصادرة من
                        الكمبيوتر دون اللجوء الى إزالة الأجزاء الداخلية من
                        الديكور لمعرفة ما إذا كانت الوسائد موجودة أو لا.
                      </li>
                      <li>
                        عند وجود طلاء أو معجون على الهيكل الداخلي (الشاسيه)
                        للمركبة يخفي عيوب محتملة فمركز كاشف غير مسؤول عن إزالة
                        هذا الطلاء للتأكد من سلامة الهيكل، وفي هذه الحالة لا
                        يمنح ضمان.
                      </li>
                      <li>
                        في حالة النزاع فإن تقرير الوكالة هو المعتمد بين الأطراف
                        ولايؤخذ بأي تقرير من أي جهة أخرى.
                      </li>
                      <li>
                        بعد ان تتم المراجعة والتقدير فإن حدود التعويض بعد
                        الإقرار لا يتجاوز ( 3000 ريال لمركبات السيدان والدفع
                        الرباعي و 6000 ريال للمركبات الأوربية والفارهة).
                      </li>
                      <li>
                        ترفق هذه الوثيقة ضمن تقرير الفحص وهو إقرار من العميل
                        بالعلم والإطلاع ولا تحتاج الى ختم أو توقيع.
                      </li>
                      <li>
                        مركز كاشف غير مسؤول عن توفير تقرير مختوم لإعتماد التقرير
                        ووثيقة الضمان لأي مطالبات خارج اختصاص المركز تخص طالب
                        الفحص.
                      </li>
                    </ul>
                  </div>

                  <h6>البند الثالث. تحذيرات عامة:</h6>
                  <div>
                    <ul>
                      <li>
                        عند ظهور اي رسالة تحذيرية في لوحة القيادة ( الطبلون ) او
                        عن طريق الفحص المختص لكمبيوتر المركبة لابد من مراجعة
                        الوكيل او فني مختص لتجنب اي تلفيات أو اعطال محتملة.
                      </li>
                      <li>
                        عند وجود اي تلف او تآكل جزئي في سير المكينة الخارجي او
                        المحامل الدوارة (البكرات) فإنها تؤثر على عمل جميع
                        الاجزاء المرتبطة بالسير وتجعلها عرضة للتلف الجزئي او
                        الكامل.
                      </li>
                      <li>
                        وجود شوائب او رواسب كربونية او صمغية داخل الأجزاء
                        الدوارة للمحرك او نظام نقل القدرة سيؤثر سلباً على عمل
                        طرمبة الزيت بشكل اساسي مما يؤدي الى احتكاك داخلي او
                        خشونة في العمل.
                      </li>
                      <li>
                        عند وجود اي حادث له تأثير على الهيكل الداخلي للمركبة (
                        الشاصيه ) يؤثر على استقامة قواعد المحرك فإن المحرك سيكون
                        عرضة للتلف الجزئي او الكلي نتيجة تمركزه بشكل غير سليم.
                      </li>
                      <li>
                        عند وجود اي تسريبات للسوائل ( ماء - زيوت ) تم ذكرها في
                        تقرير الفحص فإنها قد تؤدي في حال عدم معالجتها الى تلف
                        كامل للمنظومة التابعة لها.
                      </li>
                      <li>
                        عند تعطل أو توقف انظمة التهوية ( المراوح - الشبك) فإن
                        ذلك قد يؤدي الى ارتفاع درجة الحرارة وتلف كامل للمنظومة
                        التابعة لها.
                      </li>
                      <li>
                        عند وجود خلل في أنظمة الفرامل أو التوجيه فإن ذلك قد يشكل
                        خطراً كبيرًا، حيث تزيد احتمالية وقوع الحوادث، مما قد
                        يعرض السائق والركاب والمشاة للخطر.
                      </li>
                      <li>
                        عند وجود تسريب في انظمة الوقود فإن ذلك قد يشكل خطراً
                        كبيرًا، حيث يمكن أن يؤدي الى إشتعال النار أو حدوث
                        انفجار، مما يهدد حياة السائق والركاب، ويزيد من خطر
                        الحوادث.
                      </li>
                    </ul>
                  </div>

                  <h6>البند الرابع. حالات الغاء وثيقة ضمان المركبة:</h6>
                  <div>
                    <ul>
                      <li>سوء الاستخدام أو الأهمال.</li>
                      <li>استخدام الطرق غير المعبدة او المناطق الصحراوية.</li>
                      <li>
                        انتقال ملكية المركبة من العميل المسجل التقرير بإسمه الى
                        مالك جديد.
                      </li>
                      <li>
                        اصلاح العطل الذي يشمله الضمان قبل ابلاغ مركز الفحص عن
                        العطل.
                      </li>
                      <li>
                        استخدام زيوت غير اصلية أو الزيوت الثقيلة التي تخفي
                        العيوب أو غير مناسبة لنوع المركبة.
                      </li>
                      <li>تغيير زيت القير.</li>
                      <li>
                        تغيير قراءة عداد المسافة أو أي تلاعب يمنع من قراءة
                        العداد.
                      </li>
                      <li>
                        إذا تأثرت أجزاء الضمان جراء حادث اصطدام أو انقلاب أو ضرب
                        رصيف من أسفل أو لأي سبب خارجي.
                      </li>
                      <li>
                        خروج المركبة من المدينة التي تم الفحص فيها، يستثنى من
                        ذلك المركبات التي تم شحنها للمشتري عبر شركة نقل رسمية.
                      </li>
                    </ul>
                  </div>
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
                    label="أوافق على الشروط والأحكام, وأقر بأنني قرأتها وفهمتها بالكامل"
                  />
                </div>

                <Button
                  fullWidth
                  sx={{ marginTop: "30px" }}
                  variant="contained"
                  size="large"
                  disabled={!checked}
                  onClick={downloadFromTermsModal}
                >
                  موافق
                </Button>
              </div>
            </Box>
          </Modal>
          {cardsData && cardsData.length > 0 ? (
            cardsData
              .slice()
              .reverse()
              .map((card) => (
                <Card
                  key={card.id}
                  sx={{
                    width: { xs: "100%", sm: 300 },
                    position: "relative",
                    borderRadius: "9px",
                    boxShadow: "none",
                  }}
                >
                  {card.includeImage && (
                    <Tooltip title={t("Reports.photoReport")}>
                      <PhotoLibraryIcon
                        style={{
                          position: "absolute",
                          top: 16,
                          ...(languageText === "en"
                            ? { right: 16 }
                            : { left: 16 }),
                        }}
                      />
                    </Tooltip>
                  )}
                  <CardContent>
                    <Box
                      display="flex"
                      alignItems="center"
                      gap={1}
                      marginBottom={"9px"}
                    >
                      <MinorCrashIcon style={{ color: "#000000de" }} />
                      <Typography
                        variant="h5"
                        component="div"
                        style={{ fontSize: "14px" }}
                      >
                        {languageText === "en"
                          ? card?.carManufacturerNameEn || "-"
                          : card?.carManufacturerNameAr || "-"}
                      </Typography>
                    </Box>

                    <Box
                      display="flex"
                      alignItems="center"
                      gap={1}
                      marginBottom={"9px"}
                    >
                      <StyleIcon style={{ color: "#000000de" }} />
                      <Typography
                        variant="h5"
                        component="div"
                        style={{ fontSize: "14px" }}
                      >
                        {languageText === "en"
                          ? card?.carModelNameEn || "-"
                          : card?.carModelNameAr || "-"}
                      </Typography>
                    </Box>

                    <Box
                      display="flex"
                      alignItems="center"
                      gap={1}
                      marginBottom={"9px"}
                    >
                      <ContentPasteSearchIcon style={{ color: "#000000de" }} />
                      <Typography
                        variant="h5"
                        component="div"
                        style={{ fontSize: "14px" }}
                      >
                        {/* {card.servicesListNameAr.length > 0
                          ? card.servicesListNameAr.join(", ")
                          : "غير محدد"} */}

                        {languageText === "en"
                          ? card?.servicesListNameEn.join(", ") || "-"
                          : card?.servicesListNameAr.join(", ") || "-"}
                      </Typography>
                    </Box>

                    <Box display="flex" alignItems="center" gap={1}>
                      <CalendarMonthIcon style={{ color: "#000000de" }} />
                      <Typography
                        variant="h5"
                        component="div"
                        style={{ fontSize: "14px" }}
                      >
                        {formatDate(card.createdDate)}
                      </Typography>
                    </Box>
                  </CardContent>

                  <Divider />

                  <CardActions
                    dir={languageText === "en" ? "ltr" : "rtl"}
                    sx={{
                      backgroundColor: "#fdfefe",
                      justifyContent: "center",
                      gap: "16px",
                    }}
                  >
                    <Button
                      onClick={() =>
                        handleDownloadCard(card.id, card.includeImage)
                      }
                      size="small"
                      variant="contained"
                      disabled={loadingDownload[card.id]} // Disable button if loading
                      endIcon={
                        loadingDownload[card.id] ? (
                          <CircularProgress
                            size={18}
                            sx={{
                              margin:
                                languageText === "en"
                                  ? "0px 0px 0px 0px"
                                  : "0px 8px 0px -8px",
                            }}
                          />
                        ) : (
                          <DownloadIcon
                            sx={{
                              margin:
                                languageText === "en"
                                  ? "0px 0px 0px 0px"
                                  : "0px 8px 0px -8px",
                            }}
                          />
                        )
                      }
                    >
                      {t("Reports.downloadReport")}
                    </Button>

                    {/* Summary Reports Button */}
                    {AllSummaryReportsNumbers?.data?.includes(
                      card.id.toString()
                    ) && (
                      <Button
                        sx={{ margin: "0 !important" }}
                        onClick={() => handleDownloadSummaryCard(card.id)}
                        size="small"
                        variant="outlined"
                        disabled={loadingSummaryCardDownload[card.id]} // Disable button if loading
                        endIcon={
                          loadingSummaryCardDownload[card.id] ? (
                            <CircularProgress
                              size={18}
                              sx={{
                                margin:
                                  languageText === "en"
                                    ? "0px 0px 0px 0px"
                                    : "0px 8px 0px -8px",
                              }}
                            />
                          ) : (
                            <DownloadIcon
                              sx={{
                                margin:
                                  languageText === "en"
                                    ? "0px 0px 0px 0px"
                                    : "0px 8px 0px -8px",
                              }}
                            />
                          )
                        }
                      >
                        {t("Reports.downloadSummaryReport")}
                      </Button>
                    )}
                  </CardActions>
                </Card>
              ))
          ) : (
            <Typography
              variant="h6"
              component="div"
              style={{ textAlign: "center", margin: "20px", color: "#757575" }}
            >
              {fetchCardStatus === "fetching"
                ? t("Reports.loading")
                : t("Reports.noReports")}
            </Typography>
          )}
        </div>
      )}
    </div>
  );
}
