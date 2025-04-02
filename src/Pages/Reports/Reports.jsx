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
// import LinearProgress from "@mui/material/LinearProgress";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
// MUI Icons
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import DownloadIcon from "@mui/icons-material/Download";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MinorCrashIcon from "@mui/icons-material/MinorCrash";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import StyleIcon from "@mui/icons-material/Style";
// Toastify
import { toast } from "react-toastify";
// Cookies
import { useCookies } from "react-cookie";
// Api
import useGetPoinsApi from "../../API/useGetPoinsApi";
import { useGetAllCardsApi } from "../../API/useGetAllCardsApi";
import { fetchDownloadCard } from "../../API/useDownloadCardApi";
import { fetchImgCard } from "../../API/useGetImgCardApi";

// Utility function to format date to dd/mm/yyyy
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export default function Reports() {
  // Cookies
  const [cookies, setCookie] = useCookies(["tokenApp"]);

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Scroll to the top of the page
    window.scrollTo(0, 0);
  }, []);

  const { data: points } = useGetPoinsApi();
  const { data: cardsData, fetchStatus: fetchCardStatus } = useGetAllCardsApi();

  // Download pdf Card
  const [loadingDownload, setLoadingDownload] = useState({});

  const handleDownloadCard = async (id, includeImage) => {
    setLoadingDownload((prev) => ({ ...prev, [id]: true })); // Set loading for the specific card
    try {
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
  };

  return (
    <div dir="rtl" className={style.container}>
      {/* {(fetchStatus === "fetching" || isPending) && (
        <div className={style.progressContainer}>
          <LinearProgress />
        </div>
      )} */}

      {/* Points */}
      <div className={style.points_container}>
        <div className={style.point_card}>
          <div>
            <h2 style={{ backgroundColor: "#873fe5" }}>
              {points && points.points !== undefined ? points.points : 0}
            </h2>
          </div>
          <div>
            <h3>رصيد النقاط الحالي</h3>
            <p>كل نقطة تساوي ريال واحد</p>
          </div>
        </div>

        <div className={style.point_card}>
          <div>
            <h2 style={{ backgroundColor: "#696969" }}>
              {points && points.pointsConsumed !== undefined
                ? points.pointsConsumed
                : 0}
            </h2>
          </div>
          <div>
            <h3>مجموع النقاط المستخدمة</h3>
            <p>جميع النقاط التي تم استخدامها من حسابك</p>
          </div>
        </div>
      </div>

      {/* Cards */}
      <h5 className={style.last_reports_title}>تقاريري</h5>
      <Divider sx={{ marginBottom: "18px" }} />

      {!cookies.tokenApp ? (
        <Typography
          variant="h6"
          component="div"
          style={{ textAlign: "center", margin: "20px", color: "#757575" }}
        >
          يرجى{" "}
          <Link
            to={`${process.env.PUBLIC_URL}/login`}
            style={{
              color: "#1976d2",
              textDecoration: isHovered ? "underline" : "none",
            }}
            onMouseOver={() => setIsHovered(true)}
            onMouseOut={() => setIsHovered(false)}
          >
            تسجيل الدخول
          </Link>{" "}
          لعرض التقارير
        </Typography>
      ) : (
        <div className={style.reports_cards_container}>
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
                    <Tooltip title="تقرير مصور">
                      <PhotoLibraryIcon
                        style={{
                          position: "absolute",
                          top: 16,
                          left: 16,
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
                        {card.carManufacturerNameAr}
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
                        {card.carModelNameAr}
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
                        {card.servicesListNameAr.length > 0
                          ? card.servicesListNameAr.join(", ")
                          : "غير محدد"}
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

                  <CardActions dir="ltr" sx={{ backgroundColor: "#fdfefe" }}>
                    <Tooltip title="تحميل">
                      <IconButton
                        onClick={() =>
                          handleDownloadCard(card.id, card.includeImage)
                        }
                        sx={{ color: "#1976d2" }}
                        size="small"
                        disabled={loadingDownload[card.id]} // Disable button if loading
                      >
                        {loadingDownload[card.id] ? (
                          <CircularProgress size={24} color="inherit" />
                        ) : (
                          <DownloadIcon />
                        )}
                      </IconButton>
                    </Tooltip>
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
                ? "جاري التحميل.."
                : "لا يوجد تقارير"}
            </Typography>
          )}
        </div>
      )}
    </div>
  );
}
