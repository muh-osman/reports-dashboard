import style from "./CouponImages.module.scss";
import { useEffect, useState, useRef, useCallback } from "react";
// npm install --save html-to-image --legacy-peer-deps
import { toPng } from "html-to-image"; //html-to-image library
// MUI
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Box, Grid, IconButton, Tooltip } from "@mui/material";
// Api
import useGetAllMarketingPostsApi from "../API/useGetAllMarketingPostsApi";
//
import { toast } from "react-toastify";
//
import {
  X as XIcon,
  WhatsApp as WhatsAppIcon,
  Instagram as InstagramIcon,
  Telegram as TelegramIcon,
} from "@mui/icons-material";
// Image
import palceholderImage from "../Assets/Images/skeleton-loading.gif";

const SnapIcon = () => (
  <svg
    aria-hidden="true"
    width={24}
    height={24}
    fill="#fff"
    viewBox="0 0 512 512"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M510.846 392.673c-5.211 12.157-27.239 21.089-67.36 27.318-2.064 2.786-3.775 14.686-6.507 23.956-1.625 5.566-5.623 8.869-12.128 8.869l-.297-.005c-9.395 0-19.203-4.323-38.852-4.323-26.521 0-35.662 6.043-56.254 20.588-21.832 15.438-42.771 28.764-74.027 27.399-31.646 2.334-58.025-16.908-72.871-27.404-20.714-14.643-29.828-20.582-56.241-20.582-18.864 0-30.736 4.72-38.852 4.72-8.073 0-11.213-4.922-12.422-9.04-2.703-9.189-4.404-21.263-6.523-24.13-20.679-3.209-67.31-11.344-68.498-32.15a10.627 10.627 0 0 1 8.877-11.069c69.583-11.455 100.924-82.901 102.227-85.934.074-.176.155-.344.237-.515 3.713-7.537 4.544-13.849 2.463-18.753-5.05-11.896-26.872-16.164-36.053-19.796-23.715-9.366-27.015-20.128-25.612-27.504 2.437-12.836 21.725-20.735 33.002-15.453 8.919 4.181 16.843 6.297 23.547 6.297 5.022 0 8.212-1.204 9.96-2.171-2.043-35.936-7.101-87.29 5.687-115.969C158.122 21.304 229.705 15.42 250.826 15.42c.944 0 9.141-.089 10.11-.089 52.148 0 102.254 26.78 126.723 81.643 12.777 28.65 7.749 79.792 5.695 116.009 1.582.872 4.357 1.942 8.599 2.139 6.397-.286 13.815-2.389 22.069-6.257 6.085-2.846 14.406-2.461 20.48.058l.029.01c9.476 3.385 15.439 10.215 15.589 17.87.184 9.747-8.522 18.165-25.878 25.018-2.118.835-4.694 1.655-7.434 2.525-9.797 3.106-24.6 7.805-28.616 17.271-2.079 4.904-1.256 11.211 2.46 18.748.087.168.166.342.239.515 1.301 3.03 32.615 74.46 102.23 85.934 6.427 1.058 11.163 7.877 7.725 15.859z"></path>
  </svg>
);

const Tiktok = () => (
  <svg
    aria-hidden="true"
    width={24}
    height={24}
    fill="#fff"
    viewBox="0 0 448 512"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"></path>
  </svg>
);

export default function CouponImages({ code, percent }) {
  const [allImages, setAllImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [oneImage, setOneImage] = useState([palceholderImage]);

  // Api
  const {
    data: AllPosts,
    isPending: isGetAllPostsPending,
    isSuccess: isGetAllPostsSuccess,
    fetchStatus: fetchAllPostsStatus,
  } = useGetAllMarketingPostsApi();

  const [allTitles, setAllTitles] = useState([]);
  useEffect(() => {
    if (isGetAllPostsSuccess && AllPosts?.data) {
      const imageUrls = AllPosts.data.map((item) => item.image_data);
      const titles = AllPosts.data.map((item) => item.title);

      setAllImages(imageUrls);
      setAllTitles(titles);

      if (imageUrls.length > 0) {
        setOneImage(imageUrls[0]);
      }
    }
  }, [isGetAllPostsSuccess, AllPosts]);

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
    const options = {
      quality: 1, // Maximum quality (0-1)
      pixelRatio: 2, // Double the resolution
      // canvasWidth: ref.current.clientWidth * 2, // Double the width
      // canvasHeight: ref.current.clientHeight * 2, // Double the height
    };

    if (ref.current) {
      toPng(ref.current, options)
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = "coupon-image.png"; // Set the name of the downloaded file
          link.href = dataUrl; // Set the data URL as the href
          link.click(); // Trigger the download
        })
        .catch((err) => {
          console.error("Error generating image:", err);
          toast.error("فشل تحميل الصورة");
        });
    }
  }, [ref]);

  const post = `${allTitles[currentIndex] || ""}
  كود الخصم: ${code}
  https://cashif.cc
  #كاشف_لفحص_السيارات`;

  const handleClick = () => {
    navigator.clipboard.writeText(post);
    toast.success("تم النسخ");
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
      onClick: () =>
        window.open(
          `https://telegram.me/share/url?url=https://cashif.cc/&text=${encodeURIComponent(
            post
          )}`,
          "_blank"
        ),
    },
  ];

  if (!isGetAllPostsSuccess || !AllPosts?.data) {
    return (
      <div className={style.llc}>
        <main className={style.zxxc}>
          <div className={style.img_box}>
            <img src={palceholderImage} alt="cashif off" />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={style.llc}>
      <main className={style.zxxc}>
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
    </div>
  );
}
