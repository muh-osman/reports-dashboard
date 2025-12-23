import style from "./PricesList.module.scss";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// Lang
import i18n from "../../i18n"; // Make sure to import i18n
import { useTranslation } from "react-i18next";
// MUI
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { TextField } from "@mui/material";
// JSON
import carData from "../Shippings/data.json";
// Image
import single from "../../Assets/Images/single.png";
import multible from "../../Assets/Images/multible.png";

export default function PricesList() {
  //
  useEffect(() => {
    // Scroll to the top of the page
    window.scrollTo(0, 0);
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

  const branches = [
    {
      id: 1,
      nameAr: "الرياض",
      nameEn: "Riyadh",
    },
    {
      id: 2,
      nameAr: "جدة",
      nameEn: "Jeddah",
    },
    {
      id: 3,
      nameAr: "الدمام",
      nameEn: "Dammam",
    },
    {
      id: 4,
      nameAr: "القصيم",
      nameEn: "Qassim",
    },
  ];

  const [selectedBranch, setSelectedBranch] = useState("");

  const handleBranchChange = (event) => {
    setSelectedBranch(event.target.value);
    setShippingType("");
  };

  //
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

    // Return the price (could be a number or 99999 for unavailable routes)
    return price;
  }

  const [price, setPrice] = useState(null);

  useEffect(() => {
    if (selectedBranch && selectedCity && shippingType) {
      // console.log(selectedBranch);
      // console.log(modelCategory);
      // console.log(selectedCity);
      // console.log(shippingType);

      setPrice(calculateShippingPrice(selectedBranch, selectedCity, shippingType));

      // Scroll to bottom
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth", // or 'auto' for instant scroll
      });
    }
  }, [selectedBranch, selectedCity, shippingType]);

  return (
    <div className={style.container}>
      {/*  */}
      <div dir={languageText === "ar" ? "rtl" : "ltr"} className={style.header_text}>
        <h1>{t("Shippings.shippingPrice")}</h1>
        <p style={{ textAlign: "center", marginTop: "6px", fontSize: "13px" }}>{t("Shippings.thisServiceForCachifClientOnly")}</p>
      </div>

      <Box sx={{ minWidth: 120, maxWidth: "400px", margin: "auto", marginTop: "6px" }}>
        <div dir="rtl" className={style.steps_box}>
          <ol
            style={{
              paddingRight: "18px",
            }}
          >
            <li>
              في حال الرغبة بطلب خدمة شحن السيارة، بعد الانتهاء من الفحص سيصلك تقرير الفحص عبر الموقع الإلكتروني ضمن خانة{" "}
              <Link to={`${process.env.PUBLIC_URL}/reports`}>تقاريري</Link>.
            </li>
            <li>يوجد زر «شحن السيارة»، يرجى الضغط عليه، ثم اختيار المدينة المراد الشحن إليها، وإتمام الدفع من خلال الموقع الإلكتروني.</li>
          </ol>
        </div>

        <FormControl fullWidth dir={languageText === "ar" ? "rtl" : "ltr"}>
          {/* شحن السيارة من:  */}
          <TextField
            sx={{ backgroundColor: "#fff", marginTop: "16px" }}
            dir={languageText === "ar" ? "rtl" : "ltr"}
            required
            fullWidth
            select
            label={t("Shippings.shippingFrom")}
            value={selectedBranch || ""} // Make sure you have state for this
            onChange={handleBranchChange}
            SelectProps={{
              displayEmpty: true,
              renderValue: (selected) => {
                if (!selected) {
                  return languageText === "en" ? "Select branch" : "اختر فرع";
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
              {languageText === "en" ? "Select branch" : "اختر فرع"}
            </MenuItem>

            {branches && branches.length > 0 ? (
              branches.map((branche) => (
                <MenuItem dir={languageText === "ar" ? "rtl" : "ltr"} key={branche.id} value={branche.nameAr}>
                  {languageText === "en" ? branche?.nameEn : branche?.nameAr}
                </MenuItem>
              ))
            ) : (
              <MenuItem dir={languageText === "ar" ? "rtl" : "ltr"} value="">
                {t("Booking.loading")}
              </MenuItem>
            )}
          </TextField>

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
            {selectedCity && calculateShippingPrice(selectedBranch, selectedCity, "نقل عام") !== 0 && (
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
            {selectedCity && calculateShippingPrice(selectedBranch, selectedCity, "سطحة خاصة") !== 0 && (
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
          </Box>

          {/* Price */}
          {selectedCity && shippingType && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                margin: "auto",
                marginTop: "42px",
                fontSize: "24px",
                backgroundColor: "#e8e8e9",
                borderRadius: "50%",
                aspectRatio: "1 / 1",
                width: "fit-content",
                padding: "16px",
                color: "#174545",
              }}
            >
              <span style={{ fontWeight: "700" }}>{price}.00</span>
              <span style={{ lineHeight: "1" }}>
                <svg style={{ width: "24px", fill: "#174545" }} data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1124.14 1256.39">
                  <defs></defs>
                  <path d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z"></path>
                  <path d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z"></path>
                </svg>
              </span>
            </div>
          )}
        </FormControl>
      </Box>
    </div>
  );
}
