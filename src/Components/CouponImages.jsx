import style from "./CouponImages.module.scss";
import { useState, useRef, useCallback } from "react";
// npm install --save html-to-image --legacy-peer-deps
import { toPng } from "html-to-image"; //html-to-image library
// MUI
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Snackbar from "@mui/material/Snackbar";
import { Box, Grid, IconButton, Tooltip } from "@mui/material";
//
import {
  X as XIcon,
  WhatsApp as WhatsAppIcon,
  CameraAlt as SnapchatIcon,
  MusicNote as TikTokIcon,
  Instagram as InstagramIcon,
  Telegram as TelegramIcon,
  Facebook as FacebookIcon,
} from "@mui/icons-material";
// IMG
import imgOne from "../Assets/Images/1.jpg";
import imgTwo from "../Assets/Images/2.jpg";
import imgThree from "../Assets/Images/3.jpg";
//
// import {
//   FacebookShareButton,
//   FacebookMessengerShareButton,
//   TelegramShareButton,
//   TwitterShareButton,
//   WhatsappShareButton,
//   FacebookIcon,
//   FacebookMessengerIcon,
//   TelegramIcon,
//   TwitterIcon,
//   WhatsappIcon,
// } from "react-share";

export default function CouponImages({ code, percent }) {
  const [allImages, setAllImages] = useState([imgThree, imgTwo, imgOne]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [oneImage, setOneImage] = useState(allImages[0]);

  // Bio data with text
  const bioData = [
    {
      text: `السيارة المستعملة قرار كبير، والفحص هو الخطوة الأهم. تأكد من حالتها قبل الشراء لتجنب المفاجآت.
  كود الخصم: ${code}
  https://cashif.cc
  #كاشف_لفحص_السيارات`,
    },
    {
      text: `المظهر لحاله ما يكفي، فحص السيارة يكشف حقيقتها قبل الشراء.
  كود الخصم: ${code}
  https://cashif.cc
  #كاشف_لفحص_السيارات`,
    },
    {
      text: `لا تدفع ثمن العيوب، الفحص يكشف الحقيقة. افحص السيارة المستعملة قبل الشراء واتخذ قرارك بثقة.
  كود الخصم: ${code}
  https://cashif.cc
  #كاشف_لفحص_السيارات`,
    },
  ];

  //
  function nextBtn() {
    // Calculate the next index
    const nextIndex = (currentIndex + 1) % allImages.length; // Wrap around to the start
    setCurrentIndex(nextIndex);
    setOneImage(allImages[nextIndex]);
  }

  //
  function prevBtn() {
    // Calculate the previous index
    const prevIndex = (currentIndex - 1 + allImages.length) % allImages.length; // Wrap around to the end
    setCurrentIndex(prevIndex);
    setOneImage(allImages[prevIndex]);
  }

  //  Download Button
  const ref = useRef(null);
  const downloadImg = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "meme.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref]);

  // Copy Button
  const [open, setOpen] = useState(false);

  let post = bioData[currentIndex]?.text;

  const handleClick = () => {
    navigator.clipboard.writeText(post);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  //

  const sharePlatforms = [
    {
      name: "X (Twitter)",
      icon: <XIcon />,
      color: "#757575",
      onClick: () =>
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(post)}`,
          "_blank"
        ),
    },
    {
      name: "WhatsApp",
      icon: <WhatsAppIcon />,
      color: "#757575",
      onClick: () =>
        window.open(
          `https://wa.me/?text=${encodeURIComponent(post)}`,
          "_blank"
        ),
    },
    {
      name: "Snapchat",
      icon: <SnapchatIcon />,
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
      icon: <TikTokIcon />,
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
      onClick: () =>
        window.open(
          `https://t.me/share/url?text=${encodeURIComponent(post)}`,
          "_blank"
        ),
    },
    {
      name: "Facebook",
      icon: <FacebookIcon />,
      color: "#757575",
      onClick: () => {
        // Facebook requires a URL, but we can use a blank placeholder if needed
        const placeholderUrl = "https://www.cashif.cc/"; // or just ""
        window.open(
          `https://www.facebook.com/sharer/sharer.php?quote=${encodeURIComponent(
            post
          )}&u=${encodeURIComponent(placeholderUrl)}`,
          "_blank"
        );
      },
    },
  ];

  return (
    <main className={style.zxc}>
      <div ref={ref} className={style.img_box}>
        <img id="img" src={oneImage} alt="cashif off" />

        <div className={style.down_text}>
          <div>
            <h1>{code}</h1>
          </div>

          <div className={style.sale}>
            <p>خصم</p>
            <p>%{percent}</p>
          </div>
        </div>
      </div>

      <div className={style.bio}>
        <p style={{ whiteSpace: "pre-line" }}>{post}</p>
        <button onClick={handleClick}>
          <ContentCopyIcon />
        </button>
      </div>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message="تم النسخ"
      />

      <div className={style.share_btn}></div>

      <Box>
        <Grid container sx={{ justifyContent: "space-evenly" }}>
          {sharePlatforms.map((platform) => (
            <Grid item key={platform.name}>
              <Tooltip title={platform.name}>
                <IconButton
                  aria-label={`Share on ${platform.name}`}
                  onClick={platform.onClick}
                  sx={{
                    backgroundColor: platform.color,
                    color: "white",
                    "&:hover": {
                      backgroundColor: platform.color,
                      opacity: 0.9,
                    },
                  }}
                >
                  {platform.icon}
                </IconButton>
              </Tooltip>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Stack
        dir="ltr"
        spacing={2}
        sx={{ paddingTop: "16px", paddingBottom: "16px" }}
        direction="row"
      >
        <Button variant="outlined" onClick={nextBtn}>
          <ArrowBackIosNewIcon />
        </Button>
        <Button variant="contained" sx={{ flex: 1 }} onClick={downloadImg}>
          تحميل
        </Button>
        <Button variant="outlined" onClick={prevBtn}>
          <ArrowForwardIosIcon />
        </Button>
      </Stack>
    </main>
  );
}
