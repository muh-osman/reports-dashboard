import style from "./Home.module.scss";
import { useEffect, useState } from "react";
// MUI
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import CircularProgress from "@mui/material/CircularProgress";
// MUI icons
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
// Toastify
import { toast } from "react-toastify";
// Api
import useGetPoinsApi from "../../API/useGetPoinsApi";
import useDownloadCardApi, {
  fetchDownloadCard,
} from "../../API/useDownloadCardApi";
import { useGetAllCardsApi } from "../../API/useGetAllCardsApi";
import useGetImgCardApi, { fetchImgCard } from "../../API/useGetImgCardApi";

// Utility function to format date to dd/mm/yyyy
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export default function Home() {
  useEffect(() => {
    // Scroll to the top of the page
    window.scrollTo(0, 0);
  }, []);

  const { data: points, fetchStatus, isSuccess } = useGetPoinsApi();
  const {
    mutate,
    data: cardsData,
    isPending,
    isSuccess: isGetAllCardsSuccess,
  } = useGetAllCardsApi();

  useEffect(() => {
    // Get all cards data
    mutate();
  }, []);

  // Download pdf Card
  const [loadingDownload, setLoadingDownload] = useState({});
  const [loadingPreview, setLoadingPreview] = useState({});

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

  // Preview Card
  const handlePreviewCard = async (id, includeImage) => {
    setLoadingPreview((prev) => ({ ...prev, [id]: true })); // Set loading for the specific card
    try {
      // Call the API to fetch the PDF data
      let response;
      if (includeImage) {
        response = await fetchImgCard(id);
      } else {
        response = await fetchDownloadCard(id);
      }

      // Create a blob from the response data
      const blob = new Blob([response], { type: "application/pdf" });

      // Create a link element
      const url = window.URL.createObjectURL(blob);

      // Open the PDF in a new tab
      // window.open(url, "_blank");
      window.location.href = url;
    } catch (error) {
      console.error("Error previewing the card:", error);
      toast.error(error.message);
    } finally {
      setLoadingPreview((prev) => ({ ...prev, [id]: false })); // Reset loading for the specific card
    }
  };

  return (
    <div dir="rtl" className={style.container}>
      {(fetchStatus === "fetching" || isPending) && (
        <div className={style.progressContainer}>
          <LinearProgress />
        </div>
      )}

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

      <div className={style.reports_cards_container}>
        {cardsData && cardsData.length > 0 ? (
          cardsData.map((card) => (
            <Card
              key={card.id}
              sx={{
                width: 300,
                backgroundColor: "#f5f5f5",
                position: "relative",
              }}
            >
              {card.includeImage && (
                <PhotoLibraryIcon
                  style={{
                    position: "absolute",
                    top: 16,
                    left: 16,
                  }}
                />
              )}
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  style={{ fontSize: "14px" }}
                >
                  التاريخ: {formatDate(card.createdDate)}
                </Typography>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  style={{ fontSize: "14px" }}
                >
                  رقم الكرت: {card.id}
                </Typography>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  style={{ fontSize: "14px" }}
                >
                  الشركة المصنعة: {card.carManufacturerNameAr}
                </Typography>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  style={{ fontSize: "14px" }}
                >
                  ماركة السيارة: {card.carModelNameAr}
                </Typography>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  style={{ fontSize: "14px" }}
                >
                  رقم اللوحة: {card.plateNumber}
                </Typography>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  style={{ fontSize: "14px" }}
                >
                  الفرع: {card.branchNameAr}
                </Typography>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  style={{ fontSize: "14px" }}
                >
                  نوع الخدمة:{" "}
                  {card.servicesListNameAr.length > 0
                    ? card.servicesListNameAr.join(", ")
                    : "غير محدد"}
                </Typography>
              </CardContent>

              <CardActions sx={{ backgroundColor: "#fff" }}>
                <Button
                  onClick={() => handlePreviewCard(card.id, card.includeImage)}
                  sx={{ color: "#1976d2", width: "88px" }}
                  size="small"
                  disabled={loadingPreview[card.id]} // Disable button if loading
                >
                  {loadingPreview[card.id] ? (
                    <CircularProgress size={22} color="inherit" />
                  ) : (
                    "معاينة التقرير"
                  )}
                </Button>

                <Button
                  onClick={() => handleDownloadCard(card.id, card.includeImage)}
                  sx={{ color: "#1976d2" }}
                  size="small"
                  disabled={loadingDownload[card.id]} // Disable button if loading
                >
                  {loadingDownload[card.id] ? (
                    <CircularProgress size={22} color="inherit" />
                  ) : (
                    "تحميل"
                  )}
                </Button>
              </CardActions>
            </Card>
          ))
        ) : (
          <Typography
            variant="h6"
            component="div"
            style={{ textAlign: "center", margin: "20px", color: "#757575" }}
          >
            جاري تحميل التقارير ..
          </Typography>
        )}
      </div>
    </div>
  );
}
