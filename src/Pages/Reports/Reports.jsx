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
import { Box, Radio } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import Modal from "@mui/material/Modal";
// import Checkbox from "@mui/material/Checkbox";
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
import VideocamIcon from "@mui/icons-material/Videocam";
// Toastify
import { toast } from "react-toastify";
// Cookies
import { useCookies } from "react-cookie";
// Api
import useGetPoinsApi from "../../API/useGetPoinsApi";
import { useGetAllCardsApi } from "../../API/useGetAllCardsApi";
import { fetchDownloadCard } from "../../API/useDownloadCardApi";
import { fetchImgCard } from "../../API/useGetImgCardApi";
import useGetTermsApi from "../../API/useGetTermsApi";
import { useApproveTermsApi } from "../../API/useApproveTermsApi";
import { useGetCardsPendingApproveCardsApi } from "../../API/useGetCardsPendingApproveCardsApi";

import { useCheckAllSummaryReportsNumbersApi } from "../../API/useCheckAllSummaryReportsNumbersApi";
import { fetchDownloadSummaryReport } from "../../API/useDownloadSummaryReportsApi";

import { useCheckCardsIfHaveVideosApi } from "../../API/useCheckCardsIfHaveVideosApi";
import { fetchVideo } from "../../API/useDownloadVideoApi";
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
  // Cookies
  const [cookies, setCookie] = useCookies(["tokenApp"]);

  const [isHovered, setIsHovered] = useState(false);

  //
  const { mutate: GetCardsPendingApproveCards } = useGetCardsPendingApproveCardsApi();
  //
  useEffect(() => {
    // Scroll to the top of the page
    window.scrollTo(0, 0);
    // GetCardsPendingApproveCards();
  }, []);
  //
  const { mutate: checkIfCardsHaveSummeryReportMutate, data: AllSummaryReportsStatus } = useCheckAllSummaryReportsNumbersApi();
  //
  const { mutate: checkIfCardsHaveVideosMutate, data: AllVideoReportsStatus } = useCheckCardsIfHaveVideosApi();
  //

  const { data: points } = useGetPoinsApi();
  const { data: cardsData, fetchStatus: fetchCardStatus } = useGetAllCardsApi();

  // All Card IDs
  const [cardIds, setCardIds] = useState([]);
  useEffect(() => {
    if (cardsData && cardsData.length > 0) {
      // Extract all IDs from cardsData and store them in state
      const ids = cardsData.map((card) => card.id);
      setCardIds(ids);

      checkIfCardsHaveSummeryReportMutate(ids);
      checkIfCardsHaveVideosMutate(ids);

      // Optional: log the IDs to verify
      // console.log(ids);
    }
  }, [cardsData]);

  // State to manage the checkbox value in trems and condetions
  const { data: terms } = useGetTermsApi();

  // condetion And Terms Modal
  const [openCondetionAndTermsModal, setOpenCondetionAndTermsModal] = useState(false);

  const [checked, setChecked] = useState(null);
  //
  const [currentCardId, setCurrentCardId] = useState(null);
  const [currentCardIncludeImage, setCurrentCardIncludeImage] = useState(false);
  const handleCondetionAndTermsModalOpen = (id, includeImage) => {
    setCurrentCardId(id);
    setCurrentCardIncludeImage(includeImage);
    setOpenCondetionAndTermsModal(true);
    setChecked(null); // Reset terms and condetions checkbox
  };

  const handleCondetionAndTermsModalClose = () => {
    setOpenCondetionAndTermsModal(false);
  };

  const handleChange = (event) => {
    setChecked(event);
  };

  // Download pdf Card
  const [loadingDownload, setLoadingDownload] = useState({});

  const handleDownloadCard = async (id, includeImage, approveTerms) => {
    // approveTerms === null ==> download immediately
    // approveTerms === false ==> download after accept Terms
    // approveTerms === true ==> download immediately

    // if (approveTerms === false) {
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
      }
    }
  };

  //

  const { mutateAsync: approveTerms } = useApproveTermsApi();

  const downloadFromTermsModal = async () => {
    if (!currentCardId) return; // Add a safety check

    setLoadingDownload((prev) => ({ ...prev, [currentCardId]: true })); // Set loading for the specific card

    setOpenCondetionAndTermsModal(false); // Close the Modal

    try {
      // 1. Approve terms (which will trigger refetch cards)
      let data = {
        cardId: currentCardId,
        action: checked,
      };
      await approveTerms(data);

      // Call the API to download the card
      // 2. First download the card
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
      setChecked(null); // Reset terms and condetions checkbox
    }
  };

  // Download Summary Reports Button
  const [loadingSummaryCardDownload, setLoadingSummaryCardDownload] = useState({});
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

  // Download video Button
  const [loadingvideoDownload, setLoadingVideoDownload] = useState({});

  const handleDownloadVideo = async (id) => {
    try {
      console.log(`[Debug] Starting download for video ID: ${id}`);
      setLoadingVideoDownload((prev) => ({ ...prev, [id]: true }));

      const RETRY_DELAY_MS = 1000;
      const MAX_RETRIES = 3;
      let downloadedAtLeastOne = false;
      let lastError = null;

      // Enhanced MIME type mapping
      const videoMimeTypes = {
        // MP4 and variants
        ".mp4": "video/mp4",
        ".m4v": "video/x-m4v",

        // QuickTime/MOV
        ".mov": "video/quicktime",
        ".qt": "video/quicktime",

        // Web Formats
        ".webm": "video/webm",
        ".ogv": "video/ogg",

        // Microsoft
        ".avi": "video/x-msvideo",
        ".wmv": "video/x-ms-wmv",

        // Open/Container
        ".mkv": "video/x-matroska",
        ".flv": "video/x-flv",

        // MPEG
        ".mpeg": "video/mpeg",
        ".mpg": "video/mpeg",
        ".ts": "video/mp2t",
        ".m2ts": "video/mp2t",

        // Mobile
        ".3gp": "video/3gpp",
        ".3g2": "video/3gpp2",

        // Codecs
        ".hevc": "video/hevc",
        ".h265": "video/hevc",
        ".vp9": "video/vp9",
        ".av1": "video/av1",

        // Animation
        ".gif": "image/gif",
        ".webp": "image/webp",
      };

      for (let version = 1; version <= MAX_RETRIES; version++) {
        try {
          console.log(`[Debug] Attempting version ${version} download`);
          const response = await fetchVideo(id, version);

          // console.log(response);

          if (response?.success === false && response?.message === "Video file not found") {
            console.log(`[Debug] Version ${version} not found, skipping`);
            await delay(RETRY_DELAY_MS);
            continue;
          }

          // Get content type from headers
          const contentType = response.headers?.get("content-type") || "";
          console.log("[Debug] Content-Type header:", contentType);

          let fileExtension = ".mp4"; // Default fallback

          // Enhanced MIME type detection
          if (contentType) {
            const normalizedContentType = contentType.toLowerCase().trim();

            // 1. Try exact MIME type match
            for (const [ext, mime] of Object.entries(videoMimeTypes)) {
              if (normalizedContentType === mime.toLowerCase()) {
                fileExtension = ext;
                console.log(`[Debug] Exact MIME match: ${mime} → ${ext}`);
                break;
              }
            }

            // 2. Try partial match if still using default
            if (fileExtension === ".mp4") {
              for (const [ext, mime] of Object.entries(videoMimeTypes)) {
                const mimeParts = mime.toLowerCase().split("/");
                const typePart = mimeParts[1];

                if (normalizedContentType.includes(typePart) || normalizedContentType.includes(ext.replace(".", ""))) {
                  fileExtension = ext;
                  console.log(`[Debug] Partial MIME match: ${contentType} → ${ext}`);
                  break;
                }
              }
            }

            // 3. Special case for MOV files (common variations)
            if (fileExtension === ".mp4" && (normalizedContentType.includes("mov") || normalizedContentType.includes("quicktime"))) {
              fileExtension = ".mov";
              console.log(`[Debug] Special MOV handling: ${contentType} → .mov`);
            }
          }

          console.log("[Debug] Final extension:", fileExtension);

          // Validate extension
          if (!/^\.[a-z0-9]{1,5}$/i.test(fileExtension)) {
            console.log("[Debug] Invalid extension, defaulting to .mp4");
            fileExtension = ".mp4";
          }

          // Get MIME type (fallback to video/mp4)
          const mimeType = videoMimeTypes[fileExtension] || "video/mp4";
          console.log("[Debug] Determined MIME type:", mimeType);

          // Download logic
          const blob = new Blob([response.data], { type: mimeType });
          console.log("[Debug] Blob created with type:", blob.type);

          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `video_${id}_v${version}${fileExtension}`;
          console.log("[Debug] Download filename will be:", link.download);

          document.body.appendChild(link);
          link.click();

          setTimeout(() => {
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
          }, 100);

          downloadedAtLeastOne = true;
          await delay(RETRY_DELAY_MS);
        } catch (error) {
          console.error(`[Debug] Version ${version} failed:`, error);
          lastError = error;
          await delay(RETRY_DELAY_MS);
        }
      }

      if (!downloadedAtLeastOne) {
        console.error("[Debug] All download attempts failed");
        throw lastError || new Error("No video versions available");
      }
    } catch (error) {
      console.error("[Debug] Download process failed:", error);
      toast.error(error.message || "Failed to download video", {
        autoClose: 5000,
        position: "bottom-right",
      });
    } finally {
      console.log("[Debug] Download process completed");
      setLoadingVideoDownload((prev) => ({ ...prev, [id]: false }));
    }
  };

  // Helper function
  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

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
    const nextLevelPoints = nextLevel ? levelRequirements[nextLevel] : levelRequirements["نخبة"];

    // If user is at the highest level (نخبة), show 100%
    if (!nextLevel) return 100;

    // Calculate progress towards next level
    const pointsNeededForNextLevel = nextLevelPoints - currentLevelPoints;
    const pointsAchievedTowardsNextLevel = currentPoints - currentLevelPoints;

    // Calculate percentage (capped at 100)
    const progress = Math.min(Math.round((pointsAchievedTowardsNextLevel / pointsNeededForNextLevel) * 100), 100);

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
    <div dir={languageText === "ar" ? "rtl" : "ltr"} className={style.container}>
      {/* Points */}
      <div className={style.points_container}>
        <div className={style.money_card_container}>
          <div className={style.money_card_header}>
            <div>
              <h3>{t("Reports.points")}</h3>
              <p style={{ fontSize: "14px" }}>{t("Reports.pointWorthInRiyal")}</p>
              {/* <h1>
                {points && points.points !== undefined ? points.points : 0}{" "}
              </h1> */}
              <h1>
                <NumberFlow value={points?.points || 0} duration={1500} delay={0} ease="outExpo" formattingFn={(value) => Math.floor(value).toLocaleString()} />
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
                  <h3 style={{ textAlign: "center", color: getClientColor() }}>{t("Reports.rank")}</h3>
                  <h3 style={{ textAlign: "center", color: getClientColor() }}>{languageText === "ar" ? points?.clientTypeAr || "-" : points?.clientTypeEn || "-"}</h3>
                  {/* Adjust size and color as needed */}
                </div>
              </Box>
            </div>
          </div>

          <div className={style.money_card_footer}>
            <Tooltip title={t("Reports.allPointsUsedFromYourAccount")} arrow enterTouchDelay={0}>
              <h3>
                {t("Reports.totalPointsUsed")} {points && points.pointsConsumed !== undefined ? points.pointsConsumed : 0}
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
      <Modal open={isClientTypesModalOpen} onClose={handleClientTypesModalClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
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

              <TableContainer dir={languageText === "ar" ? "rtl" : "ltr"} component={Paper}>
                <Table dir={languageText === "ar" ? "rtl" : "ltr"} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="center">{t("Reports.rank")}</StyledTableCell>
                      <StyledTableCell align="center">{t("Reports.minimumPoints")}</StyledTableCell>
                      <StyledTableCell align="center">{t("Reports.maximumPoints")}</StyledTableCell>
                      <StyledTableCell align="center">{t("Reports.pointsPercentage")}</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <StyledTableRow key={row.name}>
                        <StyledTableCell align="center" component="th" scope="row">
                          {row.name} <WorkspacePremiumIcon sx={{ verticalAlign: "middle", color: row.clr }} />
                        </StyledTableCell>
                        <StyledTableCell align="center">{row.calories}</StyledTableCell>
                        <StyledTableCell align="center">{row.fat}</StyledTableCell>
                        <StyledTableCell align="center">{row.carbs}</StyledTableCell>
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
        <Typography variant="h6" component="div" style={{ textAlign: "center", margin: "20px", color: "#757575" }}>
          {t("Reports.please")}{" "}
          <Link
            to={`${process.env.PUBLIC_URL}/login/?from=reports`}
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
          <Modal open={openCondetionAndTermsModal} onClose={handleCondetionAndTermsModalClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
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
              <div className={style.terms_box} style={{ textAlign: languageText === "ar" ? "right" : "left" }}>
                <div>
                  <h1>{languageText === "ar" ? "وثيقة ضمان المركبة" : "Vehicle Warranty Document"}</h1>

                  <pre className={style.wrapping_pre}>
                    {(languageText === "ar" ? terms?.termsAndCondtionsAr || "" : terms?.termsAndCondtionsEn || "").split("\n").reduce((acc, paragraph, index) => {
                      if (paragraph.trim() === "") return acc;

                      if (paragraph.startsWith(languageText === "ar" ? "البند" : "Clause")) {
                        return [...acc, <h6 key={`h6-${index}`}>{paragraph}</h6>];
                      }

                      if (/^\d+\.\t/.test(paragraph)) {
                        const content = paragraph.replace(/^\d+\.\t/, "");
                        const lastElement = acc[acc.length - 1];

                        if (lastElement && lastElement.type === "ul") {
                          return [
                            ...acc.slice(0, -1),
                            <ul
                              key={lastElement.key}
                              style={{
                                padding: languageText === "ar" ? "0 24px 0 0" : "0 0 0 24px",
                              }}
                            >
                              {lastElement.props.children}
                              <li key={`li-${index}`}>{content}</li>
                            </ul>,
                          ];
                        } else {
                          return [
                            ...acc,
                            <ul
                              key={`ul-${index}`}
                              style={{
                                padding: languageText === "ar" ? "0 24px 0 0" : "0 0 0 24px",
                              }}
                            >
                              <li key={`li-${index}`}>{content}</li>
                            </ul>,
                          ];
                        }
                      }

                      return [...acc, <div key={`div-${index}`}>{paragraph}</div>];
                    }, [])}
                  </pre>

                  <h6>{languageText === "ar" ? "حالات الغاء وثيقة ضمان المركبة" : ""}</h6>

                  <pre className={style.wrapping_pre}>
                    {(languageText === "ar" ? terms?.cancelWarrantyDocumentAr || "" : terms?.cancelWarrantyDocumentEn || "").split("\n").reduce((acc, paragraph, index) => {
                      if (paragraph.trim() === "") return acc;

                      if (paragraph.startsWith(languageText === "ar" ? "البند" : "Clause")) {
                        return [...acc, <h6 key={`h6-${index}`}>{paragraph}</h6>];
                      }

                      if (/^\d+\.\t/.test(paragraph)) {
                        const content = paragraph.replace(/^\d+\.\t/, "");
                        const lastElement = acc[acc.length - 1];

                        if (lastElement && lastElement.type === "ul") {
                          return [
                            ...acc.slice(0, -1),
                            <ul
                              key={lastElement.key}
                              style={{
                                padding: languageText === "ar" ? "0 24px 0 0" : "0 0 0 24px",
                              }}
                            >
                              {lastElement.props.children}
                              <li key={`li-${index}`}>{content}</li>
                            </ul>,
                          ];
                        } else {
                          return [
                            ...acc,
                            <ul
                              key={`ul-${index}`}
                              style={{
                                padding: languageText === "ar" ? "0 24px 0 0" : "0 0 0 24px",
                              }}
                            >
                              <li key={`li-${index}`}>{content}</li>
                            </ul>,
                          ];
                        }
                      }

                      return [...acc, <div key={`div-${index}`}>{paragraph}</div>];
                    }, [])}
                  </pre>
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <FormControlLabel
                    control={<Radio required checked={checked === true} onChange={() => handleChange(true)} />}
                    label={
                      languageText === "ar"
                        ? "أوافق على الشروط والأحكام, وأقر بأنني قرأتها وفهمتها بالكامل"
                        : "I agree to the terms and conditions, and I acknowledge that I have read and fully understood them"
                    }
                  />
                  <FormControlLabel
                    control={<Radio required checked={checked === false} onChange={() => handleChange(false)} />}
                    label={languageText === "ar" ? "لا أوافق على الشروط والأحكام" : "I disagree to the terms and conditions"}
                  />
                </div>

                <Button fullWidth sx={{ marginTop: "30px" }} variant="contained" size="large" disabled={checked === null} onClick={downloadFromTermsModal}>
                  {languageText === "ar" ? "تحميل التقرير" : "Download the report"}
                </Button>
              </div>
            </Box>
          </Modal>

          {cardsData && cardsData.length > 0 ? (
            cardsData
              .filter((card) => card.cardStatus === 5) //  filter to exclude "Appoinment" cards with status 7
              .slice()
              .reverse()
              .map((card) => (
                <Card
                  key={card.id}
                  sx={{
                    width: { xs: "100%", sm: 310 },
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
                          ...(languageText === "en" ? { right: 16 } : { left: 16 }),
                        }}
                      />
                    </Tooltip>
                  )}
                  <CardContent>
                    <Box display="flex" alignItems="center" gap={1} marginBottom={"9px"}>
                      <MinorCrashIcon style={{ color: "#000000de" }} />
                      <Typography variant="h5" component="div" style={{ fontSize: "14px" }}>
                        {languageText === "en" ? card?.carManufacturerNameEn || "-" : card?.carManufacturerNameAr || "-"}
                      </Typography>
                    </Box>

                    <Box display="flex" alignItems="center" gap={1} marginBottom={"9px"}>
                      <StyleIcon style={{ color: "#000000de" }} />
                      <Typography variant="h5" component="div" style={{ fontSize: "14px" }}>
                        {languageText === "en" ? card?.carModelNameEn || "-" : card?.carModelNameAr || "-"}
                      </Typography>
                    </Box>

                    <Box display="flex" alignItems="center" gap={1} marginBottom={"9px"}>
                      <ContentPasteSearchIcon style={{ color: "#000000de" }} />
                      <Typography variant="h5" component="div" style={{ fontSize: "14px" }}>
                        {/* {card.servicesListNameAr.length > 0
                          ? card.servicesListNameAr.join(", ")
                          : "غير محدد"} */}

                        {languageText === "en" ? card?.servicesListNameEn.join(", ") || "-" : card?.servicesListNameAr.join(", ") || "-"}
                      </Typography>
                    </Box>

                    <Box display="flex" alignItems="center" gap={1}>
                      <CalendarMonthIcon style={{ color: "#000000de" }} />
                      <Typography variant="h5" component="div" style={{ fontSize: "14px" }}>
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
                      onClick={() => handleDownloadCard(card.id, card.includeImage, card.approveTerms)}
                      size="small"
                      variant="contained"
                      disabled={loadingDownload[card.id]} // Disable button if loading
                      endIcon={
                        loadingDownload[card.id] ? (
                          <CircularProgress
                            size={18}
                            sx={{
                              margin: languageText === "en" ? "0px 0px 0px 0px" : "0px 8px 0px -8px",
                            }}
                          />
                        ) : (
                          <DownloadIcon
                            sx={{
                              margin: languageText === "en" ? "0px 0px 0px 0px" : "0px 8px 0px -8px",
                            }}
                          />
                        )
                      }
                    >
                      {t("Reports.downloadReport")}
                    </Button>

                    {/* Summary Reports Button */}
                    {AllSummaryReportsStatus?.data?.[card.id.toString()] === true && (
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
                                margin: languageText === "en" ? "0px 0px 0px 0px" : "0px 8px 0px -8px",
                              }}
                            />
                          ) : (
                            <DownloadIcon
                              sx={{
                                margin: languageText === "en" ? "0px 0px 0px 0px" : "0px 8px 0px -8px",
                              }}
                            />
                          )
                        }
                      >
                        {t("Reports.downloadSummaryReport")}
                      </Button>
                    )}

                    {/*  Video Button */}
                    {AllVideoReportsStatus?.data?.[card.id.toString()] === true && (
                      <IconButton
                        sx={{
                          margin: "0 !important",
                          backgroundColor: "#0000000a",
                        }}
                        onClick={() => handleDownloadVideo(card.id)}
                        size="small"
                        disabled={loadingvideoDownload[card.id]} // Disable button if loading
                      >
                        {loadingvideoDownload[card.id] ? (
                          <CircularProgress size={24} />
                        ) : (
                          <VideocamIcon
                            fontSize="medium"
                            sx={{
                              color: "#103030",
                            }}
                          />
                        )}
                      </IconButton>
                    )}
                  </CardActions>
                </Card>
              ))
          ) : (
            <Typography variant="h6" component="div" style={{ textAlign: "center", margin: "20px", color: "#757575" }}>
              {fetchCardStatus === "fetching" ? t("Reports.loading") : t("Reports.noReports")}
            </Typography>
          )}
        </div>
      )}
    </div>
  );
}
