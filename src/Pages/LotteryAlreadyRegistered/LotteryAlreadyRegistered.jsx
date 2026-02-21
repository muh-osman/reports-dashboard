import styles from "./LotteryAlreadyRegistered.module.scss";
import React, { useState } from "react";
import { Link } from "react-router-dom";
// Axios
import axios from "axios";
// Toastify
import { toast } from "react-toastify";
// react-qr-code
import QRCode from "react-qr-code";
// MUI
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Container, Box, Typography, TextField, Button, Card } from "@mui/material";
//
import { useWindowSize } from "react-use";

export default function LotteryAlreadyRegistered() {
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  //
  React.useEffect(() => {
    // Scroll to the top of the page
    window.scrollTo(0, 0);
  }, [submitted]);

  // alert if the user tries to refresh or close the tab
  React.useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (submitted) {
        event.preventDefault();
        event.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [submitted]);
  //

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};

    // Saudi phone validation
    if (!phone.trim()) {
      newErrors.phone = "رقم الجوال مطلوب";
    } else if (!/^05[0-9]{8}$/.test(phone)) {
      newErrors.phone = "رقم الجوال غير صحيح (مثال: 05XXXXXXXX)";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      await axios.get(`https://cashif.online/back-end/public/api/lottery/check/${phone}`);

      // toast.success("تم تسجيل بياناتك بنجاح 🎉");
      setSubmitted(true);
      sessionStorage.setItem("phone", phone);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  //
  const handleDownloadQRCode = () => {
    const svg = document.getElementById("qr-code-svg");
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    // Padding settings (in pixels)
    const padding = 20; // Adjust this value as needed

    img.onload = () => {
      // Set canvas size to include padding
      canvas.width = img.width + padding * 2;
      canvas.height = img.height + padding * 2;

      // Fill background with white
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw the QR code with padding
      ctx.drawImage(img, padding, padding, img.width, img.height);

      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = `qrcode-capone.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  // Effect to automatically download QR code when component successful
  React.useEffect(() => {
    if (submitted) {
      // Small delay to ensure QR code is rendered
      const timer = setTimeout(() => {
        handleDownloadQRCode();
      }, 1000); // 1 second delay to ensure rendering

      return () => clearTimeout(timer);
    }
  }, [submitted]);

  return (
    <div className={styles.container}>
      <Container maxWidth="sm" style={{ padding: 0 }}>
        {!submitted ? (
          <>
            <Card className={styles.formBox}>
              {/* Header */}
              <Typography className={styles.formTitle}>قم بتعبئة البيانات</Typography>
              {/* Form */}
              <Box component="form" onSubmit={handleSubmit} className={styles.form}>
                <TextField
                  dir="ltr"
                  fullWidth
                  label="رقم الجوال"
                  type="tel"
                  placeholder="05XXXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  error={!!errors.phone}
                  helperText={errors.phone}
                  inputProps={{ maxLength: 10 }}
                  disabled={loading}
                />

                <Button size="large" type="submit" variant="contained" fullWidth disabled={loading}>
                  {loading ? "جاري الإرسال..." : "ارسل"}
                </Button>
              </Box>
            </Card>
          </>
        ) : (
          <>
            {/* Success Message */}
            <Box
              className={styles.successBox}
              sx={{
                textAlign: "center",
                padding: "24px",
                // background: "linear-gradient(135deg, #174545, #1f6b6b)",
                backgroundColor: "#174545",
                borderRadius: "16px",
                color: "#fff",
                mb: 3,
                boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
              }}
            >
              <Typography className={styles.successTitle} sx={{ fontSize: "22px", fontWeight: "bold", mb: 1 }}>
                تم تسجيل بياناتك سابقا
              </Typography>
              <Typography sx={{ opacity: 0.9 }}>سوف يتم الإعلان عن الفائزين بتاريخ 28 شعبان</Typography>
            </Box>

            {/* Coupon Section */}
            <Box
              className={styles.couponBox}
              sx={{
                textAlign: "center",
                padding: "24px",
                borderRadius: "16px",
                background: "#fff",
                boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
              }}
            >
              <Typography dir="ltr" sx={{ fontSize: "20px", fontWeight: "bold", mb: 1 }}>
                🎉 مبروك حصلت على خصم
              </Typography>

              <Typography
                className={styles.couponDiscount}
                sx={{
                  fontSize: "26px",
                  fontWeight: "bold",
                  color: "#174545",
                  mb: 1,
                }}
              >
                20% على جميع باقات الفحص
              </Typography>

              <Typography sx={{ mb: 3 }}>تاريخ الإنتهاء: 1447/10/01</Typography>

              {/* Website Link */}
              <Box
                sx={{
                  background: "#f0f1f3",
                  padding: "16px",
                  borderRadius: "12px",
                  mb: 3,
                  border: "2px dashed #174545",
                }}
              >
                <Typography sx={{ mb: 1, fontWeight: "bold" }}>اضغط على الرابط للاستفادة من الخصم عند الطلب من الموقع</Typography>
                <Link to={`${process.env.PUBLIC_URL}/prices`} dir="ltr">
                  https://cashif.cc
                </Link>
              </Box>

              <Typography sx={{ mb: 2, fontWeight: "bold" }}>أو</Typography>

              {/* QR Section */}
              <Box
                sx={{
                  background: "#f0f1f3",
                  padding: "20px",
                  borderRadius: "12px",
                  mb: 3,
                  border: "2px dashed #174545",
                }}
              >
                <Typography sx={{ mb: 2, fontWeight: "bold" }}>استخدم QR Code للاستفادة من الخصم عند زيارة الفرع</Typography>

                <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                  <Box sx={{ background: "#fff", padding: "12px", borderRadius: "8px" }}>
                    <QRCode id="qr-code-svg" value={`lottery-${phone}`} size={220} level="H" />
                  </Box>

                  <Button
                    variant="contained"
                    onClick={handleDownloadQRCode}
                    sx={{
                      backgroundColor: "#174545",
                      fontWeight: "bold",
                      padding: "8px 20px",
                      borderRadius: "8px",
                      "&:hover": { backgroundColor: "#123838" },
                    }}
                  >
                    تحميل QR Code
                  </Button>
                </Box>
              </Box>

              {/* Branches */}
              <Box
                className={styles.steps_box}
                dir="rtl"
                sx={{
                  background: "#174545",
                  color: "#fff",
                  padding: "20px",
                  borderRadius: "12px",
                }}
              >
                <Typography sx={{ mb: 2, fontSize: "24px", fontWeight: "bold", textAlign: "center" }}>فروعنا</Typography>

                <ul style={{ paddingRight: "18px", textAlign: "right", lineHeight: "2" }}>
                  <li>
                    <a href="https://maps.app.goo.gl/MiFGsgakfo62on7u8" target="_blank" rel="noreferrer">
                      الرياض - القادسية <OpenInNewIcon sx={{ fontSize: 16 }} />
                    </a>
                  </li>
                  <li>
                    <a href="https://maps.app.goo.gl/pXCnG7RPXJ2CDLqe7?g_st=aw" target="_blank" rel="noreferrer">
                      الرياض - الشفا <OpenInNewIcon sx={{ fontSize: 16 }} />
                    </a>
                  </li>
                  <li>
                    <a href="https://maps.app.goo.gl/Gd7g3VScomNQP8DR7" target="_blank" rel="noreferrer">
                      القصيم <OpenInNewIcon sx={{ fontSize: 16 }} />
                    </a>
                  </li>
                  <li>
                    <a href="https://maps.app.goo.gl/9UiHq4kW7Mjh1Aik8" target="_blank" rel="noreferrer">
                      الدمام <OpenInNewIcon sx={{ fontSize: 16 }} />
                    </a>
                  </li>
                  <li>
                    <a href="https://maps.app.goo.gl/697yXkaS4o6kYsos8" target="_blank" rel="noreferrer">
                      جدة <OpenInNewIcon sx={{ fontSize: 16 }} />
                    </a>
                  </li>
                </ul>
              </Box>
            </Box>
          </>
        )}
      </Container>
    </div>
  );
}
