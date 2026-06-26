import style from "./AskMojazReport.module.scss";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Modal,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import InfoIcon from "@mui/icons-material/Info";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import mojazInfoModal from "../../Assets/Images/mojaz-info-modal.png";
import Fade from "@mui/material/Fade";
// Cookies
import { useCookies } from "react-cookie";
// Toastify
import { toast } from "react-toastify";
// imgs
import mojazLgo from "../../Assets/Images/mojaz-logo.webp";

// SAR logo
const CurrencyIcon = ({ fill = "#000000de", ...props }) => {
  return (
    <svg fill={fill} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1124.14 1256.39" {...props}>
      <path d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z" />
      <path d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z" />
    </svg>
  );
};

const steps = ["بيانات المركبة", "الدفع", "تحميل التقرير"];

export default function AskMojazReport() {
  //
  useEffect(() => {
    // Scroll to the top of the page
    window.scrollTo(0, 0);
    // GetCardsPendingApproveCards();
  }, []);
  //
  const navigate = useNavigate();
  //
  const [cookies, setCookie] = useCookies(["tokenApp", "username", "userId", "phoneNumber", "auth", "clientData"]);
  //
  useEffect(() => {
    if (!cookies.auth) {
      navigate(`${process.env.PUBLIC_URL}/login`, { replace: true });
    }
  }, [cookies.auth]);

  const [loading, setLoading] = useState(false);
  const nav = async () => {
    setLoading(true);
    try {
      // 1. Call backend API
      const response = await fetch("https://cashif.cc/payment-system/back-end/public/api/mojaz/inquiry", {
        //   const response = await fetch("http://127.0.0.1:8000/api/mojaz/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lookup_type: form.lookup_type,
          lookup_value: form.lookup_value,
        }),
      });

      const data = await response.json();

      //   console.log(data);

      if (data?.data === null) {
        toast.warn("يرجى ادخال بيانات صحيحة");
        setLoading(false);
        return;
      }

      // 🚫 If vehicle NOT found → stop
      if (data?.data?.resultObject === false) {
        toast.warn(data.data.resultMessage);
        setLoading(false);
        return;
      }

      // Check result from backend
      if (!response.ok || data?.data?.status === 400) {
        toast.warn(data?.data?.message || "فشل التحقق من المركبة");
        setLoading(false);
        return;
      }

      // 3. If success → navigate
      const params = new URLSearchParams();

      Object.entries(form).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });

      navigate({
        pathname: `${process.env.PUBLIC_URL}/pay-mojaz/`,
        search: params.toString(),
      });
    } catch (error) {
      console.error("Mojaz Inquiry Error:", error);
      setLoading(false);
      alert("حدث خطأ أثناء الاتصال بالخادم");
    }
  };

  //
  const [activeStep, setActiveStep] = useState(0);

  let { reportId } = useParams();

  const [form, setForm] = useState({
    lookup_type: null,
    lookup_value: "",

    name: cookies.username,
    // email: "",
    phone: cookies.phoneNumber,
    user_id: cookies.userId,
    main_report_number: reportId,
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  //
  useEffect(() => {
    if (cookies.auth) {
      setForm((prev) => ({
        ...prev,
        name: cookies.username,
        // email: cookies.,
        phone: cookies.phoneNumber,
        user_id: cookies.userId,
      }));
    }
  }, [cookies]);

  //
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  //
  const maxLength = form.lookup_type === "sequence" ? 10 : 17;
  const isTooLong = form.lookup_value.length > maxLength;

  // reset input when change
  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      lookup_value: "",
    }));
  }, [form.lookup_type]);

  return (
    <div className={style.container} dir="rtl">
      {/* <Typography
        variant="h6"
        component="div"
        style={{
          textAlign: "center",
          margin: "20px",
          marginTop: "8px",
          marginBottom: "32px",
          fontSize: "28px",
          fontWeight: "800",
          color: "#164544",
        }}
      >
        طلب تقرير "موجز"
      </Typography> */}

      {/* Start Mojaz card ad */}
      <Box className={style.card} style={{ marginBottom: "16px", padding: 0 }}>
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            // marginTop: "20px",
            borderRadius: "16px",
            padding: "16px",
            boxShadow: "none",
            width: "fit-content",
            width: {
              xs: "100%", // 100% on extra-small screens (0px - 600px)
              // sm: "429px", // Auto/default width on small screens and up (600px+)
            },
          }}
        >
          <CardContent sx={{ padding: "0 !important" }}>
            <Box display="flex" alignItems="center" justifyContent="space-between" gap={2}>
              {/* Text */}
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  طلب تقرير موجز
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  تاريخ السيارة الكامل في تقرير واحد
                </Typography>
              </Box>

              {/* Icon */}
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  // backgroundColor: "#f2f2f2",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* <DescriptionIcon sx={{ color: "#0f3d2e", fontSize: 30 }} /> */}
                <img style={{ width: "100%", borderRadius: "9px" }} src={mojazLgo} alt="mojaz logo" />
              </Box>
            </Box>

            {/* List + Price */}
            <Box mt={3} display="flex" gap={1} alignItems="stretch" justifyContent="space-between" flexDirection="row-reverse">
              {/* Price Box */}
              <Box
                sx={{
                  // minWidth: "110px",
                  // backgroundColor: "#f3eaea",
                  borderRadius: "12px",
                  padding: "12px",
                  paddingLeft: 0,
                  textAlign: "center",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#555",
                    marginBottom: "6px",
                    textAlign: "right",
                  }}
                >
                  سعر التقرير
                </Typography>

                <Typography
                  sx={{
                    fontSize: "28px",
                    fontWeight: "bold",
                    color: "#1a1a2e",
                    textAlign: "right",
                  }}
                >
                  119 <CurrencyIcon fill="#1a1a2e" style={{ width: "21px", height: "23px" }} />
                </Typography>

                {/* Red line */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 10,
                    bottom: 10,
                    width: "3px",
                    backgroundColor: "#be1e2d",
                    // left: languageText === "ar" ? "auto" : 0,
                    // right: languageText === "ar" ? 0 : "auto",
                    right: 0,
                  }}
                />
              </Box>

              {/* List */}
              <Box flex={1}>
                <Box display="flex" alignItems="center" gap="6px" mb={1}>
                  <CheckCircleIcon sx={{ color: "green", fontSize: "20px" }} />
                  <Typography sx={{ fontSize: "14px" }}>عدد الملاك السابقين</Typography>
                </Box>

                <Box display="flex" alignItems="center" gap="6px" mb={1}>
                  <CheckCircleIcon sx={{ color: "green", fontSize: "20px" }} />
                  <Typography sx={{ fontSize: "14px" }}>سجل الحوادث المسجلة</Typography>
                </Box>

                <Box display="flex" alignItems="center" gap="6px">
                  <CheckCircleIcon sx={{ color: "green", fontSize: "20px" }} />
                  <Typography sx={{ fontSize: "14px" }}>تفاصيل الفحص الدوري</Typography>
                </Box>
              </Box>
            </Box>
          </CardContent>

          {/* <CardActions style={{ flexDirection: "column", padding: 0 }}>
            <Button
              fullWidth
              variant="contained"
              sx={{
                marginTop: "24px",
                backgroundColor: "#be1e2d",
                borderRadius: "12px",
                padding: "12px",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#a50f15",
                },
              }}
            >
              طلب موجز
            </Button>
          </CardActions> */}
        </Card>
      </Box>

      <Box className={style.card} style={{ marginBottom: "16px" }}>
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          sx={{
            direction: "rtl",
            // Target the root container
            "&.MuiStepper-alternativeLabel": {
              direction: "rtl",
            },
            // Target the connector lines specifically
            "& .MuiStepConnector-root": {
              left: "calc(50% + 20px) !important",
              right: "calc(-50% + 20px) !important",
            },
            "& .MuiStepConnector-alternativeLabel": {
              left: "calc(50% + 20px) !important",
              right: "calc(-50% + 20px) !important",
            },
            "& .MuiStepConnector-line": {
              transform: "scaleX(-1)", // Flip the line horizontally
            },
          }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      <Box className={style.card}>
        <Box className={style.content}>
          <Box className={style.step}>
            <Typography
              variant="h6"
              component="div"
              style={{
                textAlign: "center",
                fontSize: "24px",
                fontWeight: "700",
                color: "#164544",
              }}
            >
              نوع البحث
            </Typography>

            <RadioGroup name="lookup_type" value={form.lookup_type} onChange={handleChange} row style={{ margin: "auto" }}>
              <FormControlLabel disabled={loading} sx={{ margin: 0, width: "133px" }} value="sequence" control={<Radio />} label="رقم التسلسلي" />
              <FormControlLabel disabled={loading} sx={{ margin: 0, width: "133px" }} value="vin" control={<Radio />} label="رقم الهيكل" />
            </RadioGroup>

            <div style={{ overflow: "hidden", transition: "0.2s", height: form.lookup_type ? "100px" : "0" }}>
              <TextField
                dir="ltr"
                // label={form.lookup_type === "sequence" ? "رقم التسلسلي" : "رقم الهيكل"}
                placeholder={form.lookup_type === "sequence" ? "مثال: 0487635336" : form.lookup_type === "vin" ? "JE4LR33M21J704303 :مثال" : ""}
                name="lookup_value"
                value={form.lookup_value}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                style={{ margin: 0 }}
                disabled={!form.lookup_type || loading}
                type={form.lookup_type === "sequence" ? "number" : "text"}
                error={isTooLong}
                helperText={isTooLong ? `الحد الأقصى ${maxLength} أحرف` : ""}
                sx={{
                  "& .MuiFormHelperText-root": {
                    direction: "rtl",
                    textAlign: "right",
                    marginRight: 0,
                  },
                  // Hide number input arrows
                  "& input[type=number]": {
                    MozAppearance: "textfield", // Firefox
                    "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
                      WebkitAppearance: "none",
                      margin: 0,
                    },
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton disabled={loading} onClick={handleModalOpen} edge="end" size="small" sx={{ color: "#164544" }}>
                        <InfoIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          </Box>
        </Box>

        {/* الأزرار */}
        <Box className={style.actions}>
          <Button
            style={{ margin: "auto", fontSize: "16px" }}
            disableRipple
            fullWidth
            variant="contained"
            onClick={nav}
            disabled={!form.lookup_value || !form.lookup_type || isTooLong || loading || !cookies.userId}
          >
            {loading ? (
              <>
                جاري التحقق...
                <CircularProgress size={16} color="inherit" sx={{ mr: 1 }} />
              </>
            ) : (
              "التالي"
            )}
          </Button>
        </Box>
      </Box>

      {/* Modal Component */}
      <Modal open={modalOpen} onClose={handleModalClose}>
        <Fade in={modalOpen} timeout={300}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "95%", sm: "80%", md: "720px" },
              maxHeight: "90vh",
              bgcolor: "#fff",
              borderRadius: "16px",
              boxShadow: 24,
              overflow: "hidden",
              direction: "rtl",
            }}
          >
            {/* Header */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                px: 3,
                py: 2,
                borderBottom: "1px solid #eee",
              }}
            >
              <Typography sx={{ fontWeight: 700, fontSize: "18px" }}>أين يمكنني العثور على الرقم التسلسلي؟</Typography>
            </Box>

            {/* Body */}
            <Box sx={{ p: 3, overflowY: "auto" }}>
              {/* Highlight text */}
              <Typography
                sx={{
                  background: "#e8f0fe",
                  p: 2,
                  borderRadius: 2,
                  mb: 3,
                  fontSize: "14px",
                }}
              >
                يمكنك العثور على الرقم التسلسلي (رقم تعريف المركبة) في أحد هذه الأماكن، وقد يتغير ذلك اعتمادًا على نموذج المركبة.
              </Typography>

              {/* Image */}
              <Box
                component="img"
                src={mojazInfoModal}
                alt="vin locations"
                sx={{
                  width: "100%",
                  borderRadius: "12px",
                  mb: 3,
                }}
              />

              {/* Steps */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {[
                  "يمكنك العثور عليه على عتبة الباب الأمامي.",
                  "يمكنك العثور عليه تحت الزجاج الأمامي للسائق على لوحة القيادة.",
                  "يمكنك العثور عليه في محرك المركبة.",
                  "يمكنك العثور عليه في وثائق تسجيل المركبة.",
                ].map((text, index) => (
                  <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                      sx={{
                        width: 28,
                        height: 28,
                        minWidth: 28,
                        borderRadius: "50%",
                        background: "#174545",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "14px",
                      }}
                    >
                      {index + 1}
                    </Box>
                    <Typography sx={{ fontSize: "14px" }}>{text}</Typography>
                  </Box>
                ))}
              </Box>

              {/* Button */}
              <div style={{ textAlign: "center" }}>
                <Button
                  onClick={handleModalClose}
                  variant="contained"
                  sx={{
                    margin: "auto",
                    mt: 3,
                    borderRadius: "8px",
                    px: 4,
                  }}
                >
                  حسنًا
                </Button>
              </div>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
