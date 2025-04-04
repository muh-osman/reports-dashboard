import style from "./CouponImages.module.scss";
import { useState, useEffect, useRef, useCallback } from "react";
// npm install --save html-to-image --legacy-peer-deps
import { toPng } from "html-to-image"; //html-to-image library
// MUI
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Snackbar from "@mui/material/Snackbar";
// IMG
import imgOne from "../Assets/Images/1.jpg";
import imgTwo from "../Assets/Images/2.jpg";
import imgThree from "../Assets/Images/3.jpg";
//
import {
  FacebookShareButton,
  FacebookMessengerShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

export default function CouponImages({ code, percent }) {
  const [allImages, setAllImages] = useState([imgThree, imgTwo, imgOne]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [oneImage, setOneImage] = useState(allImages[0]);

  // Bio data with text
  const bioData = [
    {
      text: "السيارة المستعملة قرار كبير، والفحص هو الخطوة الأهم. تأكد من حالتها قبل الشراء لتجنب المفاجآت.",
    },
    {
      text: "المظهر لحاله ما يكفي، فحص السيارة يكشف حقيقتها قبل الشراء.",
    },
    {
      text: "لا تدفع ثمن العيوب، الفحص يكشف الحقيقة. افحص السيارة المستعملة قبل الشراء واتخذ قرارك بثقة.",
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

  const handleClick = () => {
    navigator.clipboard.writeText(bioData[currentIndex]?.text);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  //

  const title = bioData[currentIndex]?.text;
  const shareUrl = `\nكود الخصم: ${code}\nhttps://cashif.cc\n#كاشف_لفحص_السيارات
  `;

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
        <p>{bioData[currentIndex]?.text}</p>
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

      <div className={style.share_btn}>
        <FacebookShareButton url={shareUrl} quote={title}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <FacebookMessengerShareButton url={shareUrl} appId="YOUR_APP_ID">
          <FacebookMessengerIcon size={32} round />
        </FacebookMessengerShareButton>
        <TelegramShareButton url={shareUrl}>
          <TelegramIcon size={32} round />
        </TelegramShareButton>
        <TwitterShareButton url={shareUrl} title={title}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        <WhatsappShareButton url={shareUrl} title={title}>
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
      </div>

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
