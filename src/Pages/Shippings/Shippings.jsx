import style from "./Shippings.module.scss";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// Lang
import i18n from "../../i18n"; // Make sure to import i18n
import { useTranslation } from "react-i18next";
// API
import useGetOneCardDataApi from "../../API/useGetOneCardDataApi";
// MUI
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Backdrop, CircularProgress, Typography, Modal, Button } from "@mui/material";
// Toastify
import { toast } from "react-toastify";
// Cookies
import { useCookies } from "react-cookie";
// JSON
import carData from "./data.json";
// Image
import single from "../../Assets/Images/single.png";
import multible from "../../Assets/Images/multible.png";
// import heavy from "../../Assets/Images/heavy.png";

// Modal style
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 380,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

// function getCarModelCategory(model) {
//   if (!model) return null;

//   const normalizedModel = model.toLowerCase().trim();

//   if (carData.low_models.some((lowModel) => lowModel.toLowerCase().trim() === normalizedModel)) {
//     return "Low";
//   }

//   if (carData.medium_models.some((mediumModel) => mediumModel.toLowerCase().trim() === normalizedModel)) {
//     return "Medium";
//   }

//   if (carData.high_models.some((highModel) => highModel.toLowerCase().trim() === normalizedModel)) {
//     return "High";
//   }

//   return null; // Model not found
// }

export default function Shippings() {
  //
  useEffect(() => {
    // Scroll to the top of the page
    window.scrollTo(0, 0);
  }, []);
  // Cookies
  const [cookies, setCookie] = useCookies(["tokenApp"]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!cookies.tokenApp) {
      navigate(`${process.env.PUBLIC_URL}/login`, { replace: true });
    }
  }, []);
  // Lang
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
  // Get the id from the URL
  const { cardId } = useParams();
  const { data: oneCardData, isLoading: isFetchDataLoading, isSuccess: isFetchDataSuccess } = useGetOneCardDataApi(cardId);

  //
  // const [modelCategory, setModelCategory] = useState(null); // Low, Medium, High or null (if model not exist in json file)
  useEffect(() => {
    if (isFetchDataLoading) {
      setShowOverlay(true);
      setOverlayMessage("");
    }
    // else if (isFetchDataSuccess) {
    //   let category = getCarModelCategory(oneCardData?.carModelNameAr);
    //   if (category) {
    //     setModelCategory(category);
    //     setShowOverlay(false);
    //     setOverlayMessage("");
    //   } else {
    //     setShowOverlay(true);
    //     // هذا الخطأ سيظهر في حال موديل السيارة غير موجود في ملف الـ (JSON)
    //     setOverlayMessage(`خطأ في تحميل بيانات: ${oneCardData?.carModelNameAr}`);
    //   }
    // }
    else if (isFetchDataSuccess) {
      if (oneCardData?.branchNameAr === "افتراضي") {
        setShowOverlay(true);
        setOverlayMessage("الفرع 'افتراضي' غير مدعوم");
      } else {
        setShowOverlay(false);
        setOverlayMessage("");
      }
    } else {
      setShowOverlay(true);
      setOverlayMessage("خطأ في الشبكة");
    }
  }, [isFetchDataLoading, isFetchDataSuccess]);
  // State for loading data overlay
  const [showOverlay, setShowOverlay] = useState(true);
  const [overlayMessage, setOverlayMessage] = useState("");

  //
  // State for terms modal
  const [openTermsModal, setOpenTermsModal] = useState(false);
  // const [formData, setFormData] = useState(null);

  const cities = [
    {
      id: 1,
      nameAr: "الرياض",
      nameEn: "Riyadh",
    },
    {
      id: 2,
      nameAr: "الدمام",
      nameEn: "Dammam",
    },
    {
      id: 3,
      nameAr: "جدة",
      nameEn: "Jeddah",
    },
    {
      id: 4,
      nameAr: "ابها",
      nameEn: "Abha",
    },
    {
      id: 5,
      nameAr: "الطائف",
      nameEn: "Taif",
    },
    {
      id: 6,
      nameAr: "تبوك",
      nameEn: "Tabuk",
    },
    {
      id: 7,
      nameAr: "القريات",
      nameEn: "Al-Qurayyat",
    },
    {
      id: 8,
      nameAr: "مكة المكرمة",
      nameEn: "Makkah",
    },
    {
      id: 9,
      nameAr: "المدينة المنورة",
      nameEn: "Madinah",
    },
    {
      id: 10,
      nameAr: "جيزان",
      nameEn: "Jizan",
    },
    {
      id: 11,
      nameAr: "نجران",
      nameEn: "Najran",
    },

    {
      id: 12,
      nameAr: "القصيم",
      nameEn: "Al Qassim",
    },
    {
      id: 13,
      nameAr: "بيشة",
      nameEn: "Bisha",
    },
    {
      id: 14,
      nameAr: "عرعر",
      nameEn: "Arar",
    },
    {
      id: 15,
      nameAr: "سكاكا الجوف",
      nameEn: "Sakaka",
    },
    {
      id: 16,
      nameAr: "حفر الباطن",
      nameEn: "Hafar Al-Batin",
    },
    {
      id: 17,
      nameAr: "حائل",
      nameEn: "Hail",
    },
    {
      id: 18,
      nameAr: "الجبيل",
      nameEn: "Al-Jubail",
    },
    {
      id: 19,
      nameAr: "ينبع",
      nameEn: "Yanbu",
    },
    {
      id: 20,
      nameAr: "شرورة",
      nameEn: "Sharorah",
    },

    {
      id: 21,
      nameAr: "النماص",
      nameEn: "Al-Namas",
    },
    {
      id: 22,
      nameAr: "الهفوف",
      nameEn: "Al Hofuf",
    },
    {
      id: 23,
      nameAr: "ضبا",
      nameEn: "Duba",
    },
    {
      id: 24,
      nameAr: "الباحة",
      nameEn: "Al-Baha",
    },
    {
      id: 25,
      nameAr: "الخفجي",
      nameEn: "Al-Khafji",
    },
  ];

  const [selectedCity, setSelectedCity] = useState("");

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
    setShippingType("");
  };

  // Shipping types options
  const [shippingType, setShippingType] = useState("");
  const handleShippingTypesChange = (option) => {
    setShippingType(option);
  };

  //
  // Price calculation function
  function calculateShippingPrice(fromCity, toCity, shippingType) {
    // Validate inputs
    if (!fromCity || !toCity || !shippingType) {
      return null;
    }

    // Get the price data for the from city
    const cityData = carData.from[fromCity === "القادسية" || fromCity === "الشفا" ? "الرياض" : fromCity];
    if (!cityData) {
      return null;
    }

    // Get the category data (Low, Medium, High)
    // const categoryData = cityData[modelCategory];
    // if (!categoryData) {
    //   return null;
    // }

    // Get prices based on shipping type
    let price;

    if (shippingType === "نقل عام") {
      price = cityData.public[toCity];
    } else {
      price = cityData.private[toCity];
    }

    // if (modelCategory === "Low") {
    //   // Low category has both public and private options
    //   if (shippingType === "نقل عام") {
    //     price = categoryData.prices.public[toCity];
    //   } else if (shippingType === "سطحة خاصة") {
    //     price = categoryData.prices.private[toCity];
    //   } else {
    //     return null;
    //   }
    // } else {
    //   // Medium and High categories only have heavy option
    //   if (shippingType === "نقل ثقيل") {
    //     price = categoryData.prices.heavy[toCity];
    //   } else {
    //     return null;
    //   }
    // }

    // Return the price (could be a number or 99999 for unavailable routes)
    return price;
  }

  const [price, setPrice] = useState(null);
  useEffect(() => {
    if (oneCardData?.branchNameAr && selectedCity && shippingType) {
      // console.log(oneCardData?.branchNameAr);
      // console.log(modelCategory);
      // console.log(selectedCity);
      // console.log(shippingType);

      setPrice(calculateShippingPrice(oneCardData?.branchNameAr, selectedCity, shippingType));
    }
  }, [selectedCity, shippingType]);

  //
  const submitForm = () => {
    if (!selectedCity || !shippingType) {
      toast.warn(t("Shippings.allDataIsRequired"));
      return;
    }

    // Check if today is Friday (5 = Friday, 0 = Sunday, 1 = Monday, etc.)
    const today = new Date();
    if (today.getDay() === 5) {
      toast.warn(t("Shippings.cannotSubmitOnFriday"));
      return;
    }

    // Store form data and open terms modal instead of redirecting immediately
    // let data = {
    //   reportNumber: cardId,
    //   model: oneCardData?.carModelNameAr,
    //   from: oneCardData?.branchNameAr,
    //   to: selectedCity,
    //   shippingType: shippingType,
    //   price: price,
    // };

    // console.log(data);
    // setFormData(data);

    setOpenTermsModal(true);
  };

  // Function to handle terms acceptance and redirect
  const handleAcceptTerms = () => {
    setOpenTermsModal(false);

    // URL encode parameters to handle special characters and spaces
    const encodedParams = {
      report_number: encodeURIComponent(cardId || ""), // this is id NOT cardNumber
      model: encodeURIComponent(oneCardData?.carModelNameAr || ""),
      // model_category: encodeURIComponent(modelCategory || ""),
      plate_number: encodeURIComponent(oneCardData?.plateNumber || ""),
      from: encodeURIComponent(oneCardData?.branchNameAr || ""),
      to: encodeURIComponent(selectedCity || ""),
      shipping_type: encodeURIComponent(shippingType || ""),
      price: encodeURIComponent(price || ""),
    };

    // const url = `https://cashif.cc/shipping/?report_number=${encodedParams.report_number}&model=${encodedParams.model}&model_category=${encodedParams.model_category}&from=${encodedParams.from}&to=${encodedParams.to}&shipping_type=${encodedParams.shipping_type}&price=${encodedParams.price}`;
    // window.location.href = url;

    navigate(
      `${process.env.PUBLIC_URL}/pay/shipping/?report_number=${encodedParams.report_number}&model=${encodedParams.model}&plate_number=${encodedParams.plate_number}&from=${encodedParams.from}&to=${encodedParams.to}&shipping_type=${encodedParams.shipping_type}&price=${encodedParams.price}`
    );
  };

  // Function to handle terms rejection
  const handleRejectTerms = () => {
    setOpenTermsModal(false);
    toast.warn(t("Shippings.youMustAgreeToTheDisclaimerToContinue"));
  };

  return (
    <div className={style.container}>
      {/* Terms and Conditions Modal */}
      <Modal open={openTermsModal} onClose={handleRejectTerms} aria-labelledby="terms-modal-title" aria-describedby="terms-modal-description">
        <Box sx={modalStyle}>
          <Typography sx={{ textAlign: "center", fontWeight: "bold" }} id="terms-modal-title" variant="h6" component="h2" dir="rtl" gutterBottom>
            {t("Shippings.disclaimer")}
          </Typography>
          <Typography id="terms-modal-description" dir="rtl" sx={{ mt: 2, mb: 3, textAlign: "center" }}>
            {t("Shippings.disclaimerDescription")}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button variant="contained" onClick={handleAcceptTerms}>
              {t("Shippings.agree")}
            </Button>
          </Box>
        </Box>
      </Modal>
      {/* Overlay with MUI Spinner */}
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          flexDirection: "column",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
        }}
        open={showOverlay}
      >
        {isFetchDataLoading && (
          <>
            <CircularProgress color="inherit" />
            <Typography dir="rtl" variant="h6" sx={{ mt: 2 }}>
              جاري تحميل البيانات...
            </Typography>
          </>
        )}

        {overlayMessage && (
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            {overlayMessage}
          </Typography>
        )}
      </Backdrop>

      {/*  */}
      <div dir={languageText === "ar" ? "rtl" : "ltr"} className={style.header_text}>
        <h1>{t("Shippings.carSharging")}</h1>
        <p style={{ textAlign: "center", marginTop: "6px", fontSize: "13px" }}>{t("Shippings.shippingTakesPlaceEveryDayOfTheWeekExceptFriday")}</p>
      </div>

      <Box sx={{ minWidth: 120, maxWidth: "400px", margin: "auto", marginTop: "6px" }}>
        <FormControl fullWidth dir={languageText === "ar" ? "rtl" : "ltr"}>
          {/* السيارة  */}
          <TextField
            sx={{ backgroundColor: "#fff", marginTop: "16px" }}
            dir={languageText === "ar" ? "rtl" : "ltr"}
            fullWidth
            label={t("Shippings.model")}
            value={(languageText === "ar" ? oneCardData?.carModelNameAr : oneCardData?.carModelNameEn) || ""}
            disabled={true}
            InputLabelProps={{
              shrink: true,
            }}
          />

          {/* رقم اللوحة  */}
          <TextField
            sx={{ backgroundColor: "#fff", marginTop: "16px" }}
            dir={languageText === "ar" ? "rtl" : "ltr"}
            fullWidth
            label={t("Shippings.plateNumber")}
            value={oneCardData?.plateNumber || ""}
            disabled={true}
            InputLabelProps={{
              shrink: true,
            }}
          />

          {/* شحن السيارة من:  */}
          <TextField
            sx={{ backgroundColor: "#fff", marginTop: "16px" }}
            dir={languageText === "ar" ? "rtl" : "ltr"}
            fullWidth
            label={t("Shippings.shippingFrom")}
            value={(languageText === "ar" ? oneCardData?.branchNameAr : oneCardData?.branchNameEn) || ""}
            disabled={true}
            InputLabelProps={{
              shrink: true,
            }}
          />

          {/* شحن السيارة الى  */}
          <TextField
            sx={{ backgroundColor: "#fff", marginTop: "16px" }}
            dir={languageText === "ar" ? "rtl" : "ltr"}
            required
            fullWidth
            select
            label={t("Shippings.shippingTo")}
            value={selectedCity || ""} // Make sure you have state for this
            onChange={handleCityChange}
            // disabled={isPostApoinmentFormMutatePending || shouldAutoSubmit}

            SelectProps={{
              displayEmpty: true,
              renderValue: (selected) => {
                if (!selected) {
                  return languageText === "en" ? "Select city" : "اختر المدينة";
                }
                return selected;
              },
            }}
            InputLabelProps={{
              shrink: true,
            }}
          >
            {/* Placeholder option */}
            <MenuItem dir={languageText === "ar" ? "rtl" : "ltr"} value="" disabled>
              {languageText === "en" ? "Select city" : "اختر المدينة"}
            </MenuItem>

            {cities && cities.length > 0 ? (
              cities.map((city) => (
                <MenuItem dir={languageText === "ar" ? "rtl" : "ltr"} key={city.id} value={city.nameAr}>
                  {languageText === "en" ? city?.nameEn : city?.nameAr}
                </MenuItem>
              ))
            ) : (
              <MenuItem dir={languageText === "ar" ? "rtl" : "ltr"} value="">
                {t("Booking.loading")}
              </MenuItem>
            )}
          </TextField>

          {/* Shipping Type */}
          <Box className={style.label_box} sx={{ marginTop: "32px" }} dir="rtl">
            {/* Show "نقل عام" only if price is not 0 and selectedCity is not branch */}
            {selectedCity && calculateShippingPrice(oneCardData?.branchNameAr, selectedCity, "نقل عام") !== 0 && (
              <label dir="rtl" style={{ cursor: "pointer" }}>
                <div className={style.image_box} onClick={() => handleShippingTypesChange("نقل عام")}>
                  <img src={multible} alt="icon" />
                </div>
                <div className={style.label_text_box}>
                  <input checked={shippingType === "نقل عام"} type="radio" name="options" value="نقل عام" onChange={() => handleShippingTypesChange("نقل عام")} required />
                  {languageText === "en" ? "Public transport" : "نقل عام"}
                </div>
              </label>
            )}

            {/* Show for white group car (Low) */}
            {/* Show "سطحة خاصة" only if price is not 0 */}
            {selectedCity && calculateShippingPrice(oneCardData?.branchNameAr, selectedCity, "سطحة خاصة") !== 0 && (
              <label dir="rtl" style={{ cursor: "pointer" }}>
                <div className={style.image_box} onClick={() => handleShippingTypesChange("سطحة خاصة")}>
                  <img src={single} alt="icon" />
                </div>
                <div className={style.label_text_box}>
                  <input checked={shippingType === "سطحة خاصة"} type="radio" name="options" value="سطحة خاصة" onChange={() => handleShippingTypesChange("سطحة خاصة")} required />
                  {languageText === "en" ? "Private flatbed truck" : "سطحة خاصة"}
                </div>
              </label>
            )}

            {/* Show for yellow and red group car (Medium & High) */}
            {/* {(modelCategory === "Medium" || modelCategory === "High") && (
              <label dir="rtl" style={{ cursor: "pointer" }}>
                <div className={style.image_box} onClick={() => handleShippingTypesChange("نقل ثقيل")}>
                  <img src={heavy} alt="icon" />
                </div>
                <div className={style.label_text_box}>
                  <input type="radio" name="options" value="نقل ثقيل" onChange={() => handleShippingTypesChange("نقل ثقيل")} required />
                  {languageText === "en" ? "heavy transport" : "نقل ثقيل"}
                </div>
              </label>
            )} */}
          </Box>

          {/* Button */}
          <LoadingButton
            dir="rtl"
            style={{ marginTop: "32px", gap: "6px", fontSize: "16px" }}
            variant="contained"
            size="large"
            onClick={submitForm}
            // loading={isPostApoinmentFormMutatePending || shouldAutoSubmit}
            // disabled={price === null}
          >
            {selectedCity && shippingType ? (
              <>
                <span style={{ fontWeight: "700" }}>{price}.00</span>
                <span style={{ lineHeight: "1" }}>
                  <svg style={{ width: "18px", fill: "#fff" }} data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1124.14 1256.39">
                    <defs></defs>
                    <path d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z"></path>
                    <path d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z"></path>
                  </svg>
                </span>
              </>
            ) : (
              <span>{t("Shippings.orderNow")}</span>
            )}
          </LoadingButton>
        </FormControl>
      </Box>
    </div>
  );
}
