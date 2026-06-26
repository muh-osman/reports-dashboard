import style from "./MyOrders.module.scss";
//
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Box, Card, CardContent, Chip, CircularProgress, Divider, Grid, Stack, Typography, Alert, Avatar } from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PaymentIcon from "@mui/icons-material/Payment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import WarningIcon from "@mui/icons-material/Warning";
// Lang
import i18n from "../../i18n"; // Make sure to import i18n
import { useTranslation } from "react-i18next";
// Cookies
import { useCookies } from "react-cookie";
// Images
import Tabby from "../../Assets/logos/tabby.png";
import Tamara from "../../Assets/logos/tamara.png";
import Moyasar from "../../Assets/logos/moyasar.png";

// ─── helpers ────────────────────────────────────────────────────────────────

const TABLE_IMAGE = {
  Moyasar,
  Tabby,
  Tamara,
};

// const formatDate = (iso) => {
//   if (!iso) return "—";
//   return new Intl.DateTimeFormat("ar-SA", {
//     year: "numeric",
//     month: "short",
//     day: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//   }).format(new Date(iso));
// };

// Utility function to format date to dd/mm/yyyy
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();
  return `${year}/${month}/${day}`;
};

const PLAN_COLOR = "#174545";

// ─── sub-components ──────────────────────────────────────────────────────────

function OrderCard({ order, navigate }) {
  const payMethodImg = TABLE_IMAGE[order.table_name] ?? null;
  const planColor = PLAN_COLOR;
  //
  const paidQrCode = order.paid_qr_code ?? order.id;

  //   console.log(order.table_name);

  let goToThanksPage = (paidQrCode) => {
    // Check if "مخدوم" or "فحص الشراء"
    if (order.service && order.service.includes("مخدوم")) {
      if (order.table_name === "Moyasar") {
        navigate(`/dashboard/pay/makdom-check/thanks?status=paid&message=APPROVED&id=${paidQrCode}&noAutoDownload=true`);
      }

      if (order.table_name === "Tamara") {
        navigate(`/dashboard/pay/makdom-check/thanks?paymentStatus=approved&orderId=${paidQrCode}&noAutoDownload=true`);
      }

      if (order.table_name === "Tabby") {
        navigate(`/dashboard/pay/makdom-check/thanks?payment_id=${paidQrCode}&noAutoDownload=true`);
      }
    } else {
      if (order.table_name === "Moyasar") {
        navigate(`/dashboard/pay/purchase-check/thanks?status=paid&message=APPROVED&id=${paidQrCode}&noAutoDownload=true`);
      }

      if (order.table_name === "Tamara") {
        navigate(`/dashboard/pay/purchase-check/thanks?paymentStatus=approved&orderId=${paidQrCode}&noAutoDownload=true`);
      }

      if (order.table_name === "Tabby") {
        navigate(`/dashboard/pay/purchase-check/thanks?payment_id=${paidQrCode}&noAutoDownload=true`);
      }
    }
  };

  return (
    <Card
      onClick={() => goToThanksPage(paidQrCode)}
      elevation={0}
      sx={{
        borderRadius: 3,
        border: "1.5px solid #e8ecf4",
        transition: "box-shadow 0.2s, border-color 0.2s",
        "&:hover": {
          boxShadow: "0 8px 32px rgba(26,110,245,0.10)",
          borderColor: "#174545",
          cursor: "pointer",
        },
        direction: "rtl",
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* ── header row ── */}
        <Stack direction="row" alignItems="flex-start" justifyContent="space-between" mb={2} flexWrap="wrap" gap={1}>
          <Stack direction="row" alignItems="center" gap={1.5}>
            <Avatar
              sx={{
                bgcolor: `${planColor}18`,
                width: 44,
                height: 44,
                border: `2px solid ${planColor}33`,
              }}
            >
              <DirectionsCarIcon sx={{ color: planColor, fontSize: 22 }} />
            </Avatar>
            <Box>
              <Typography variant="subtitle1" fontWeight={700} color="#1a202c" lineHeight={1.2}>
                {order?.model}
              </Typography>
              <Typography variant="caption" color="#64748b">
                {order?.full_year}
              </Typography>
            </Box>
          </Stack>

          <Stack direction="row" gap={0.8} flexWrap="wrap">
            {payMethodImg && <Box component="img" src={payMethodImg} alt={order.table_name} sx={{ height: 42, objectFit: "contain" }} />}
          </Stack>
        </Stack>

        <Divider sx={{ mb: 2, borderColor: "#f1f5f9" }} />

        {/* ── detail grid ── */}
        <Grid container spacing={1.5}>
          <Grid item xs={12} sm={6}>
            <InfoRow icon={<LocationOnIcon sx={{ fontSize: 16, color: "#94a3b8" }} />} label="الفرع" value={order.branch} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InfoRow icon={<ContentPasteSearchIcon sx={{ fontSize: 16, color: "#94a3b8" }} />} label="الخطة" value={order.plan} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InfoRow icon={<PaymentIcon sx={{ fontSize: 16, color: "#94a3b8" }} />} label="السعر" value={`${parseFloat(order.price)} ريال`} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InfoRow icon={<CalendarTodayIcon sx={{ fontSize: 16, color: "#94a3b8" }} />} label="تاريخ الطلب" value={formatDate(order.created_at)} />
          </Grid>
          {order.discountCode && (
            <Grid item xs={12} sm={6}>
              <InfoRow
                icon={
                  <Box component="span" sx={{ fontSize: 14, color: "#94a3b8", lineHeight: 1 }}>
                    🏷
                  </Box>
                }
                label="كود الخصم"
                value={order.discountCode.toUpperCase()}
              />
            </Grid>
          )}
        </Grid>

        {/* ── order id ── */}
        <Typography dir="ltr" variant="caption" color="#c0cad8" display="block" mt={2} sx={{ fontSize: 10, letterSpacing: 0.5 }}>
          {order.paid_qr_code}
        </Typography>
      </CardContent>
    </Card>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <Stack direction="row" alignItems="center" gap={0.8}>
      {icon}
      <Typography variant="caption" color="#94a3b8" sx={{ minWidth: 56 }}>
        {label}:
      </Typography>
      <Typography variant="caption" color="#374151" fontWeight={600}>
        {value ?? "—"}
      </Typography>
    </Stack>
  );
}

// ─── page ────────────────────────────────────────────────────────────────────

export default function MyOrders() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  //
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
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["phoneNumber", "tokenApp"]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isHovered, setIsHovered] = useState(false); // ✅ was missing

  useEffect(() => {
    if (!cookies.phoneNumber) return;

    setLoading(true);
    setError(null);

    fetch(`https://cashif.cc/payment-system/back-end/public/api/my-orders/0506445921`)
    // fetch(`https://cashif.cc/payment-system/back-end/public/api/my-orders/${cookies.phoneNumber}`)
      .then((res) => {
        if (!res.ok) throw new Error("لم يتم العثور على طلبات.");
        return res.json();
      })
      .then((json) => {
        setOrders(json.data ?? []);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [cookies.phoneNumber]);

  return (
    <Box>
      {!cookies.tokenApp ? (
        <Box className={style.container} sx={{ direction: "rtl", maxWidth: "450px", margin: "auto" }}>
          <Typography sx={{ textAlign: "center", marginTop: "148px", color: "#757575" }}>
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
            لعرض الطلبات
          </Typography>
        </Box>
      ) : (
        <Box className={style.container} sx={{ direction: "rtl", maxWidth: "450px", margin: "auto" }}>
          {/* page header */}
          <Box mb={3}>
            <Typography
              variant="h6"
              component="div"
              style={{
                textAlign: "center",
                marginTop: "8px",
                fontSize: "28px",
                fontWeight: "800",
                color: "#164544",
              }}
            >
              طلباتي
            </Typography>

            {orders.length > 0 && (
              <Typography variant="body2" color="#94a3b8" mt={0.5} sx={{ textAlign: "center" }}>
                {orders.length} طلب مسجّل
              </Typography>
            )}
          </Box>

          {/* states */}
          {loading && (
            <Box display="flex" justifyContent="center" py={8}>
              <CircularProgress size={36} thickness={4} sx={{ color: "#174545" }} />
            </Box>
          )}

          {!loading && error && (
            <Alert sx={{ margin: "0px" }} severity="warning" icon={<WarningIcon sx={{ marginLeft: "12px", marginRight: "-12px" }} />}>
              {error}
            </Alert>
          )}

          {!loading && !error && orders.length === 0 && (
            <Box display="flex" flexDirection="column" alignItems="center" py={10} gap={2}>
              <DirectionsCarIcon sx={{ fontSize: 56, color: "#e2e8f0" }} />
              <Typography color="#94a3b8">لا توجد طلبات حتى الآن</Typography>
            </Box>
          )}

          {!loading && !error && orders.length > 0 && (
            <Stack spacing={2}>
              {orders.map((order) => (
                <OrderCard key={order.paid_qr_code ?? order.id} order={order} navigate={navigate} />
              ))}
            </Stack>
          )}
        </Box>
      )}
    </Box>
  );
}
