import styles from "./Lottery.module.scss";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
// Image
import image from "../../Assets/Images/21.jpg";
// Axios
import axios from "axios";
// Toastify
import { toast } from "react-toastify";
// react-qr-code
import QRCode from "react-qr-code";
// MUI
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Container, Box, Typography, TextField, Button, Card, Divider } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ShareIcon from "@mui/icons-material/Share";
import { Grid, Tooltip } from "@mui/material";
import { Modal, Backdrop, Fade } from "@mui/material";
//
import Confetti from "react-confetti";
//
import { useWindowSize } from "react-use";
//
import { X as XIcon, WhatsApp as WhatsAppIcon, Instagram as InstagramIcon, Telegram as TelegramIcon } from "@mui/icons-material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const SnapIcon = () => (
  <svg aria-hidden="true" width={24} height={24} fill="#fff" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
    <path d="M510.846 392.673c-5.211 12.157-27.239 21.089-67.36 27.318-2.064 2.786-3.775 14.686-6.507 23.956-1.625 5.566-5.623 8.869-12.128 8.869l-.297-.005c-9.395 0-19.203-4.323-38.852-4.323-26.521 0-35.662 6.043-56.254 20.588-21.832 15.438-42.771 28.764-74.027 27.399-31.646 2.334-58.025-16.908-72.871-27.404-20.714-14.643-29.828-20.582-56.241-20.582-18.864 0-30.736 4.72-38.852 4.72-8.073 0-11.213-4.922-12.422-9.04-2.703-9.189-4.404-21.263-6.523-24.13-20.679-3.209-67.31-11.344-68.498-32.15a10.627 10.627 0 0 1 8.877-11.069c69.583-11.455 100.924-82.901 102.227-85.934.074-.176.155-.344.237-.515 3.713-7.537 4.544-13.849 2.463-18.753-5.05-11.896-26.872-16.164-36.053-19.796-23.715-9.366-27.015-20.128-25.612-27.504 2.437-12.836 21.725-20.735 33.002-15.453 8.919 4.181 16.843 6.297 23.547 6.297 5.022 0 8.212-1.204 9.96-2.171-2.043-35.936-7.101-87.29 5.687-115.969C158.122 21.304 229.705 15.42 250.826 15.42c.944 0 9.141-.089 10.11-.089 52.148 0 102.254 26.78 126.723 81.643 12.777 28.65 7.749 79.792 5.695 116.009 1.582.872 4.357 1.942 8.599 2.139 6.397-.286 13.815-2.389 22.069-6.257 6.085-2.846 14.406-2.461 20.48.058l.029.01c9.476 3.385 15.439 10.215 15.589 17.87.184 9.747-8.522 18.165-25.878 25.018-2.118.835-4.694 1.655-7.434 2.525-9.797 3.106-24.6 7.805-28.616 17.271-2.079 4.904-1.256 11.211 2.46 18.748.087.168.166.342.239.515 1.301 3.03 32.615 74.46 102.23 85.934 6.427 1.058 11.163 7.877 7.725 15.859z"></path>
  </svg>
);

const Tiktok = () => (
  <svg aria-hidden="true" width={24} height={24} fill="#fff" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
    <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"></path>
  </svg>
);

export default function Lottery() {
  const [shareOpen, setShareOpen] = useState(false);

  const handleOpenShare = () => setShareOpen(true);
  const handleCloseShare = () => setShareOpen(false);
  //
  const SHARE_LINK = "https://cashif.cc/dashboard/1/?utm_source=shared-from-cashif";
  const handleCopyShareLink = async () => {
    try {
      await navigator.clipboard.writeText(SHARE_LINK);
      toast.success("تم نسخ رابط المشاركة 📋");
    } catch (err) {
      toast.error("فشل نسخ الرابط");
    }
  };
  //
  const { width, height } = useWindowSize();
  //
  const [name, setName] = useState("");
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

  // Store query string in session storage on component mount
  const [queryString, setQueryString] = useState("");
  React.useEffect(() => {
    // Get current query string
    const currentQueryString = window.location.search;

    console.log(currentQueryString);


    // Check if we have stored query string from previous visit
    const storedQueryString = sessionStorage.getItem("lottery_referral_params");

    // Priority: current URL params > stored params
    if (currentQueryString) {
      // Store current query string
      sessionStorage.setItem("lottery_referral_params", currentQueryString);
      setQueryString(currentQueryString);
      console.log("Using current URL params:", currentQueryString);
    } else if (storedQueryString) {
      // Use stored params if no current params
      setQueryString(storedQueryString);
      console.log("Using stored params:", storedQueryString);
    }
  }, []);

  // Also listen for URL changes
  React.useEffect(() => {
    const handleUrlChange = () => {
      const newQueryString = window.location.search;
      if (newQueryString) {
        sessionStorage.setItem("lottery_referral_params", newQueryString);
        setQueryString(newQueryString);
      }
    };

    // Check URL on initial load (already done in first useEffect)
    // Listen for popstate (back/forward navigation)
    window.addEventListener("popstate", handleUrlChange);

    // For SPA navigation, you might need to use your router's navigation events
    // If using React Router, you could add a location listener

    return () => {
      window.removeEventListener("popstate", handleUrlChange);
    };
  }, []);

  //
  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};

    // Name validation
    if (!name.trim()) {
      newErrors.name = "الاسم مطلوب";
    } else if (!/^[\u0600-\u06FFa-zA-Z\s]+$/.test(name)) {
      newErrors.name = "الاسم يجب أن يحتوي على حروف فقط";
    }

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
      // Get query string from state (which comes from session storage)
      let paramsToSend = "";

      if (queryString) {
        // Remove the leading "?" for cleaner storage
        paramsToSend = queryString.startsWith("?") ? queryString.substring(1) : queryString;
      }

      // Also check session storage directly as backup
      const storedParams = sessionStorage.getItem("lottery_referral_params");
      if (!paramsToSend && storedParams) {
        paramsToSend = storedParams.startsWith("?") ? storedParams.substring(1) : storedParams;
      }

      console.log("Sending params to API:", paramsToSend);

      // Prepare the data object
      const requestData = {
        name,
        phone,
      };

      // Only add query_params if it exists and is not empty
      if (paramsToSend && paramsToSend.trim() !== "") {
        requestData.query_params = paramsToSend;
      }

      await axios.post("https://cashif.online/back-end/public/api/lottery", requestData);

      // toast.success("تم تسجيل بياناتك بنجاح 🎉");
      setSubmitted(true);
      sessionStorage.setItem("phone", phone);
    } catch (error) {
      if (error.response?.status === 422) {
        toast.error("هذا الرقم مسجل مسبقًا");
      } else {
        toast.error("حدث خطأ أثناء الإرسال، حاول مرة أخرى");
      }
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

  //
  const sharePlatforms = () => {
    const post = "https://cashif.cc/dashboard/1/?utm_source=shared-from-cashif";
    return [
      {
        name: "نسخ الرابط",
        icon: <ContentCopyIcon />,
        color: "#757575",
        onClick: () => handleCopyShareLink(),
      },
      {
        name: "X (Twitter)",
        icon: <XIcon />,
        color: "#757575",
        onClick: () => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(post)}`, "_blank"),
      },
      {
        name: "WhatsApp",
        icon: <WhatsAppIcon />,
        color: "#757575",
        onClick: () => window.open(`https://wa.me/?text=${encodeURIComponent(post)}`, "_blank"),
      },
      {
        name: "Snapchat",
        icon: <SnapIcon />,
        color: "#757575",
        onClick: () => {
          // Snapchat doesn't have a direct share URL, so we use the Web Share API
          if (navigator.share) {
            navigator.share({ text: post }).catch(console.error);
          } else {
            window.open("https://www.snapchat.com/", "_blank");
          }
        },
      },
      {
        name: "TikTok",
        icon: <Tiktok />,
        color: "#757575",
        onClick: () => window.open("https://www.tiktok.com/", "_blank"),
      },
      {
        name: "Instagram",
        icon: <InstagramIcon />,
        color: "#757575",
        onClick: () => window.open("https://www.instagram.com/", "_blank"),
      },
      {
        name: "Telegram",
        icon: <TelegramIcon />,
        color: "#757575",
        onClick: () => window.open(`https://telegram.me/share/url?url=https://cashif.cc/dashboard/1/?utm_source=shared-from-cashif`, "_blank"),
      },
    ];
  };

  return (
    <div className={styles.container}>
      {submitted && <Confetti width={width} height={height} numberOfPieces={250} gravity={0.25} recycle={false} />}
      <Container maxWidth="sm" style={{ padding: 0 }}>
        {!submitted ? (
          <>
            <Card className={styles.wrapper}>
              {/* Placeholder for prizes image */}
              <Box className={styles.prizesBox}>
                {/* Share button */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: { xs: 9, sm: 12 },
                    right: { xs: 9, sm: 12 },
                    width: 35,
                    height: 35,
                  }}
                >
                  {/* Water wave */}
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: "50%",
                      backgroundColor: "rgba(227, 210, 152, 0.6)",
                      animation: "wave 1.8s infinite",
                      "@keyframes wave": {
                        "0%": {
                          transform: "scale(1)",
                          opacity: 0.6,
                        },
                        "100%": {
                          transform: "scale(2.4)",
                          opacity: 0,
                        },
                      },
                    }}
                  />

                  {/* Share button */}
                  <IconButton
                    onClick={handleOpenShare}
                    sx={{
                      position: "relative",
                      zIndex: 2,
                      width: 35,
                      height: 35,
                      backgroundColor: "#e3d298",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                      "&:hover": {
                        backgroundColor: "#e1c156",
                      },
                    }}
                  >
                    <ShareIcon sx={{ color: "#174545" }} />
                  </IconButton>
                </Box>

                <img src={image} alt="iamge" />
              </Box>
            </Card>

            {/* Social media icons */}
            <Modal open={shareOpen} onClose={handleCloseShare} closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{ timeout: 300 }}>
              <Fade in={shareOpen}>
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: { xs: "90%", sm: 500 },
                    bgcolor: "background.paper",
                    borderRadius: 3,
                    boxShadow: 24,
                    p: 3,
                    textAlign: "center",
                  }}
                >
                  <Typography sx={{ mb: 2, fontWeight: "bold", fontSize: 18 }}>مشاركة الرابط</Typography>

                  <Grid dir="rtl" container spacing={2} justifyContent="center" sx={{ flexWrap: { xs: "wrap", sm: "nowrap" } }}>
                    {sharePlatforms().map((platform) => (
                      <Grid item xs={3} key={platform.name}>
                        <Tooltip title={platform.name}>
                          <IconButton
                            onClick={() => {
                              platform.onClick();
                              handleCloseShare();
                            }}
                            sx={{
                              backgroundColor: platform.color,
                              color: "#fff",
                              width: 48,
                              height: 48,
                              "&:hover": { backgroundColor: "#626262" },
                            }}
                          >
                            {platform.icon}
                          </IconButton>
                        </Tooltip>
                      </Grid>
                    ))}
                  </Grid>

                  <Button onClick={handleCloseShare} fullWidth sx={{ mt: 3 }} variant="outlined">
                    إغلاق
                  </Button>
                </Box>
              </Fade>
            </Modal>

            <Card className={styles.formBox}>
              {/* Header */}
              <Typography className={styles.formTitle}>قم بتعبئة البيانات وادخل السحب</Typography>
              <Typography className={styles.formSupTitle}>يعلن عن الفائزين في السحب بتاريخ 28 شعبان</Typography>
              {/* Form */}
              <Box component="form" onSubmit={handleSubmit} className={styles.form}>
                <TextField
                  dir="rtl"
                  fullWidth
                  label="الاسم"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  error={!!errors.name}
                  helperText={errors.name}
                  disabled={loading}
                />

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

                <div style={{ display: "flex", justifyContent: "center", gap: "3px" }}>
                  <p>رقم مسجل سابقا</p>
                  <Link to={`${process.env.PUBLIC_URL}/lottery-already-registered`}>انقر هنا</Link>
                </div>
              </Box>

              <Divider />

              {/* Notes */}
              <Box className={styles.notes}>
                <Typography className={styles.notesTitle}>ملاحظات مهمة:</Typography>
                <ul>
                  <li>يتم السحب عشوائيًا على الجوائز بين جميع المشاركين.</li>
                  <li>سيتم التواصل مع الفائزين عبر رقم الجوال المسجّل.</li>
                  <li>يحق لكل رقم جوال مشاركة واحدة فقط.</li>
                  <li>الجوائز غير قابلة للتحويل أو الاستبدال النقدي.</li>
                </ul>
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
                تم تسجيل بياناتك بنجاح
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
