import style from "./AskMojazReport.module.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
import InfoIcon from "@mui/icons-material/Info";
import mojazInfoModal from "../../Assets/Images/mojaz-info-modal.png";
import Fade from "@mui/material/Fade";
// Cookies
import { useCookies } from "react-cookie";
// Toastify
import { toast } from "react-toastify";

const steps = ["بيانات المركبة", "الدفع", "تحميل التقرير"];

export default function AskMojazReport() {
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

  const [form, setForm] = useState({
    lookup_type: null,
    lookup_value: "",

    name: cookies.username,
    // email: "",
    phone: cookies.phoneNumber,
    user_id: cookies.userId,
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
      <Typography
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
      </Typography>

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
