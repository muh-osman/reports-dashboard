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
// Toastify
import { toast } from "react-toastify";
// Api
import useGetPoinsApi from "../../API/useGetPoinsApi";
import useDownloadCardApi, {
  fetchDownloadCard,
} from "../../API/useDownloadCardApi";
import { useGetAllCardsApi } from "../../API/useGetAllCardsApi";
import useGetImgCardApi from "../../API/useGetImgCardApi";

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

  const {
    data: pdfFile,
    fetchStatus: pdfFileFetchStatus,
    isSuccess: pdfFileIsSuccess,
  } = useDownloadCardApi();

  useEffect(() => {
    // Get all cards data
    mutate();
  }, []);

  // Download pdf Card
  const [loadingDownload, setLoadingDownload] = useState({}); // Track loading state for download
  const [loadingPreview, setLoadingPreview] = useState({}); // Track loading state for preview
  const handleDownloadCard = async (id) => {
    setLoadingDownload((prev) => ({ ...prev, [id]: true })); // Set loading for the specific card
    try {
      // Call the API to download the card
      const response = await fetchDownloadCard(id);

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
  const handlePreviewCard = async (id) => {
    setLoadingPreview((prev) => ({ ...prev, [id]: true })); // Set loading for the specific card
    try {
      // Call the API to fetch the PDF data
      const response = await fetchDownloadCard(id);

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

  // imageCard
  // Filter cards that imageCard to get there ids
  const [ids, setIds] = useState([]);
  useEffect(() => {
    if (cardsData) {
      const imageCardIds = isGetAllCardsSuccess
        ? cardsData.filter((card) => card.includeImage).map((card) => card.id)
        : [];

      console.log(imageCardIds);
      setIds(imageCardIds);
    }
  }, [cardsData]);
  // Fetch imageCard data using useGetImgCardApi
  // State to accumulate image card data
  const [allImgCardData, setAllImgCardData] = useState([]);
  const {
    data: imgCardData,
    fetchStatus: imgCardFetchStatus,
    isSuccess: imgCardIsSuccess,
  } = useGetImgCardApi(ids);

  // Effect to accumulate image card data
  useEffect(() => {
    if (imgCardIsSuccess && imgCardData) {
      setAllImgCardData((prevData) => [...prevData, ...imgCardData]);
    }
  }, [imgCardIsSuccess, imgCardData]);

  // Log the accumulated image card data for debugging
  console.log(allImgCardData);

  return (
    <div dir="rtl" className={style.container}>
      {(fetchStatus === "fetching" ||
        pdfFileFetchStatus === "fetching" ||
        isPending ||
        imgCardFetchStatus === "fetching") && (
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
          cardsData
            .filter((card) => card.includeImage === false)
            .map((card) => (
              <Card
                key={card.id}
                sx={{ width: 300, backgroundColor: "#f5f5f5" }}
              >
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
                    onClick={() => handlePreviewCard(card.id)}
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
                    onClick={() => handleDownloadCard(card.id)}
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

      {/* Img Cards */}
      {/* <h5 className={style.last_reports_title}>تقاريري المصورة</h5>
      <Divider sx={{ marginBottom: "18px" }} />

      <div className={style.reports_cards_container}>
        {allImgCardData && allImgCardData.length > 0 ? (
          allImgCardData.map((card) => (
            <Card key={card.id} sx={{ width: 300, backgroundColor: "#f5f5f5" }}>
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
                  onClick={() => handlePreviewCard(card.id)}
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
                  onClick={() => handleDownloadCard(card.id)}
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
            لا يوجد تقارير
          </Typography>
        )}
      </div> */}
    </div>
  );
}
