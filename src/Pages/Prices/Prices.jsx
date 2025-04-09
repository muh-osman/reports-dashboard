import style from "./Prices.module.scss";
import { useLocation } from "react-router-dom";
// MUI
import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import SearchIcon from "@mui/icons-material/Search";
import { CircularProgress } from "@mui/material";
// Toastify
import { toast } from "react-toastify";
// API
import useSearchApi from "../../API/useSearchApi";
import useGetPricesApi from "../../API/useGetPricesApi";

const marks = [
  {
    value: 2009,
    label: "أقدم",
  },
  {
    value: 2010,
    label: "",
  },
  {
    value: 2011,
    label: "",
  },
  {
    value: 2012,
    label: "",
  },
  {
    value: 2013,
    label: "",
  },
  {
    value: 2014,
    label: "",
  },
  {
    value: 2015,
    label: "",
  },
  {
    value: 2016,
    label: "",
  },
  {
    value: 2017,
    label: "",
  },
  {
    value: 2018,
    label: "",
  },
  {
    value: 2019,
    label: "",
  },
  {
    value: 2020,
    label: "",
  },
  {
    value: 2021,
    label: "",
  },
  {
    value: 2022,
    label: "",
  },
  {
    value: 2023,
    label: "",
  },
  {
    value: 2024,
    label: "",
  },
  {
    value: 2025,
    label: "",
  },
  {
    value: 2026,
    label: "2026",
  },
];

const TrueIcon = `<svg fill="#25d366" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" /></svg>`;
const FalseIcon = `<svg class="wrong-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"></path></svg>`;
const ryalIcon = `<svg fill="#174545" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1124.14 1256.39"><path d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z" /><path d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z" /></svg>`;
const redRyalIcon = `<svg width="13" fill="#d32f2f" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1124.14 1256.39"><path d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z" /><path d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z" /></svg>`;
const greenRyalIcon = `<svg width="13" fill="#25d366" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1124.14 1256.39"><path d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z" /><path d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z" /></svg>`;

// Create a component for checklist items with tooltips
const ChecklistItem = ({ checked, text, tooltip }) => {
  return (
    <li>
      <span
        dangerouslySetInnerHTML={{ __html: checked ? TrueIcon : FalseIcon }}
      ></span>{" "}
      {text}
      <Tooltip title={tooltip} arrow enterTouchDelay={0}>
        <IconButton>
          <InfoIcon sx={{ fontSize: "16px" }} />
        </IconButton>
      </Tooltip>
    </li>
  );
};

// Create an array of all checklist items with their tooltips
const checklistItems = [
  {
    text: "المحرك",
    tooltip: "فحص الأداء، مستوى الزيت، والصوت",
  },
  {
    text: "ناقل الحركة",
    tooltip: "اختبار سلاسة التبديل والأداء",
  },
  {
    text: "الدفرنس",
    tooltip: "فحص الأصوات والتسربات",
  },
  {
    text: "ميكانيكا أسفل السيارة",
    tooltip:
      "فحص ميكانيكا أسفل السيارة: الأجزاء المتحركة: فحص الأجزاء المتحركة والتأكد من عدم وجود تلف أو تآكل الهيكل السفلي: التحقق من عدم وجود أي صدأ أو تلف في الهيكل السفلي",
  },
  {
    text: "الكمبيوتر والحساسات",
    tooltip: "استخدام أجهزة التشخيص لفحص الأنظمة الإلكترونية",
  },
  {
    text: "الهيكل الداخلي",
    tooltip:
      "التحقق من شاص السيارة: الصدمات، الصدأ، اللحامات، نقاط التثبيت، والاتصالات الميكانيكية لضمان السلامة الهيكلية والسيارة",
  },
  {
    text: "تجربة السيارة",
    tooltip: "تجربة القيادة للتحقق من الأداء العام",
  },
  {
    text: "الهيكل الخارجي",
    tooltip: "فحص البودي، الدهان، الصدمات، والخدوش",
  },
  {
    text: "الوسائد الهوائية",
    tooltip: "التحقق من سلامة وعمل الوسائد الهوائية (الايرباق)",
  },
  {
    text: "الديكورات الداخلية",
    tooltip: "فحص سلامة المقاعد والأزرار والأجهزة الداخلية",
  },
  {
    text: "المزايا المخصصة للسيارة",
    tooltip: "التحقق من نظام الملاحة، الكاميرات، والمستشعرات. وغيرها",
  },
  {
    text: "الملحقات الخارجية للسيارة",
    tooltip: "فحص المرايا والأضواء الخارجية",
  },
  {
    text: "الزجاج",
    tooltip: "التحقق من سلامة الزجاج",
  },
  {
    text: "الكفرات والجنوط",
    tooltip: "فحص تآكل الكفرات وتوازن الجنوط",
  },
  {
    text: "الشمعات والأسطبات",
    tooltip: "فحص عمل وسلامة الشمعات والأسطبات",
  },
];

export default function Prices() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const checkit = queryParams.get("checkit") === "true"; // Returns (boolean)
  //
  const inputRef = React.useRef(null);
  const overlay = React.useRef(null);
  React.useEffect(() => {
    // Scroll to the top of the page
    window.scrollTo(0, 0);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  //
  const [trigger, setTrigger] = React.useState(false);
  //
  const { data: models, isSuccess } = useSearchApi();
  //
  const [selectedModelId, setSelectedModelId] = React.useState(null);
  const handleModelChange = (event, newValue) => {
    overlay.current.style.gridTemplateRows = "0fr";
    setTrigger(false);
    if (newValue) {
      setSelectedModelId(newValue.id); // Set the selected model ID
      // console.log("Selected Model ID:", newValue.id); // Log the selected model ID
    } else {
      setSelectedModelId(null); // Reset if no model is selected
    }
  };

  //
  const [selectedYear, setSelectedYear] = React.useState(2018); // State to hold the selected year
  const handleYearChange = (event, newValue) => {
    overlay.current.style.gridTemplateRows = "0fr";
    setTrigger(false);
    setSelectedYear(newValue); // Update the selected year
  };

  const {
    data: prices,
    fetchStatus: pricesFetchStatus,
    isSuccess: isFetchPricesSuccess,
  } = useGetPricesApi(selectedModelId, selectedYear, trigger);

  // Check if prices is defined and has at least one element
  let fullPrice = 0;
  let basicPrice = 0;
  let engainPrice = 0;
  let oldPrice = 0;
  let save = 0;

  if (prices && prices.length > 0) {
    fullPrice = Math.floor(prices[0]?.prices[0]?.price);
    basicPrice = Math.floor(prices[0]?.prices[1]?.price);
    engainPrice = Math.floor(prices[0]?.prices[2]?.price);

    oldPrice = Math.floor(prices[0]?.prices[0]?.price / 0.8);
    save = Math.floor(oldPrice - fullPrice);
  }

  const handleSubmit = () => {
    if (selectedModelId && selectedYear) {
      setTrigger(true);
    } else {
      toast.warn("الرجاء تحديد النوع وسنة الصنع");
    }
  };

  const searchBtn = React.useRef(null);
  React.useEffect(() => {
    if (isFetchPricesSuccess) {
      // overlay.current.style.padding = "16px";
      overlay.current.style.gridTemplateRows = "1fr";

      // Wait for the layout to be updated before scrolling
      setTimeout(() => {
        searchBtn.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      }, 100);
    }
  }, [isFetchPricesSuccess]);

  return (
    <div className={style.container}>
      <Typography
        variant="h6"
        component="div"
        style={{
          textAlign: "center",
          margin: "20px",
          marginTop: "8px",
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        ضع نوع السيارة
      </Typography>

      <div className={style.box}>
        <Autocomplete
          dir="rtl"
          sx={{ backgroundColor: "#fff" }}
          ref={inputRef}
          disablePortal
          onChange={handleModelChange} // Add the onChange handler
          options={isSuccess ? models.carModels : []}
          getOptionLabel={(option) => option.model_name}
          renderInput={(params) => <TextField {...params} label="بحث" />}
          // Use a unique key for each option
          renderOption={(props, option) => (
            <li dir="rtl" {...props} key={option.id}>
              {option.model_name}
            </li>
          )}
          noOptionsText={"جاري التحميل..."}
        />

        <Box sx={{ width: "85%", margin: "auto", marginTop: "28px" }}>
          <Typography
            variant="h6"
            component="div"
            style={{ textAlign: "center", margin: "auto", color: "#757575" }}
          >
            اختر سنة الصنع
          </Typography>
          <Slider
            aria-label="سنة الصنع"
            value={selectedYear} // Set the value of the slider to the selected year
            onChange={handleYearChange} // Add the onChange handler
            valueLabelDisplay="auto"
            step={1}
            marks={marks}
            min={2009}
            max={2026}
          />
        </Box>

        <Box ref={searchBtn} sx={{ marginTop: "32px", textAlign: "center" }}>
          <IconButton
            size="large"
            onClick={handleSubmit}
            disabled={pricesFetchStatus === "fetching"} // Disable button while loading
            className={style.search_btn}
          >
            {pricesFetchStatus === "fetching" ? (
              <CircularProgress size={46} /> // Show loading spinner
            ) : (
              <SearchIcon sx={{ fontSize: "46px", color: "#174545" }} />
            )}
          </IconButton>
        </Box>
      </div>

      <Box dir="rtl">
        <div className="overlay" ref={overlay} id="overlay">
          <div>
            <div className="title-box">
              <h2>اختر الباقة المناسبة</h2>
            </div>
            <div className="plane-box">
              {/* المحركات */}
              {!checkit && (
                <div className="col plane eng-pane dis rounded-3 shadow-sm">
                  <div className="card mb-4 card-price eng">
                    <div className="card-header py-3">
                      <h4 className="my-0 fw-normal">المحركات</h4>
                    </div>
                    <div className="card-body">
                      <h1
                        id="engain-price"
                        className="card-title pricing-card-title"
                      >
                        {engainPrice}
                        <span dangerouslySetInnerHTML={{ __html: ryalIcon }} />
                      </h1>
                      <h3
                        id="old-price-a"
                        style={{
                          marginTop: "-12px",
                          fontSize: 16,
                          color: "#d32f2f",
                        }}
                      ></h3>
                      <h5>تشمل فحص:</h5>
                      <ul className="list-unstyled mt-3 mb-4">
                        {checklistItems.map((item, index) => (
                          <ChecklistItem
                            key={index}
                            checked={index < 7} // First 7 items checked for engines plan
                            text={item.text}
                            tooltip={item.tooltip}
                          />
                        ))}
                      </ul>
                      <a
                        aria-label="Ask now Button"
                        id="plane-one"
                        className="ask-now"
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`https://cashif.cc/${
                          checkit ? "check-it/receipt" : "pay"
                        }/?plan=محركات&year_id=${
                          selectedYear >= 2015 ? 2 : 1
                        }&car_model_id=${selectedModelId}&price_id=2`}
                      >
                        أطلب الأن
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* الأساسي */}
              <div className="col plane main-plane dis rounded-3 shadow-sm">
                <div className="card mb-4 card-price">
                  <div className="card-header py-3">
                    <h4 className="my-0 fw-normal">الأساسي</h4>
                  </div>
                  <div className="card-body">
                    <h1
                      id="main-price"
                      className="card-title pricing-card-title"
                    >
                      {basicPrice}
                      <span dangerouslySetInnerHTML={{ __html: ryalIcon }} />
                    </h1>
                    <h3
                      id="old-price-b"
                      style={{
                        marginTop: "-12px",
                        fontSize: 16,
                        color: "#d32f2f",
                      }}
                    ></h3>
                    <h5>تشمل فحص:</h5>
                    <ul className="list-unstyled mt-3 mb-4">
                      {checklistItems.map((item, index) => (
                        <ChecklistItem
                          key={index}
                          checked={index < 9} // First 9 items checked for basic plan
                          text={item.text}
                          tooltip={item.tooltip}
                        />
                      ))}
                    </ul>
                    <a
                      aria-label="Ask now Button"
                      id="plane-two"
                      className="ask-now"
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`https://cashif.cc/${
                        checkit ? "check-it/receipt" : "pay"
                      }/?plan=أساسي&year_id=${
                        selectedYear >= 2015 ? 2 : 1
                      }&car_model_id=${selectedModelId}&price_id=1`}
                    >
                      أطلب الأن
                    </a>
                  </div>
                </div>
              </div>

              {/* الشامل */}
              <div
                className="col plane crown-box full-pane dis rounded-3 shadow-sm"
                style={{ border: "2px solid #174545" }}
              >
                <div className="card mb-0 card-price">
                  <div className="card-header py-3 crown">
                    <h4 className="my-0 fw-normal">الشامل</h4>
                  </div>
                  <div className="card-body">
                    <h1
                      id="full-price"
                      className="card-title pricing-card-title"
                    >
                      {fullPrice}
                      <span dangerouslySetInnerHTML={{ __html: ryalIcon }} />
                    </h1>
                    <h3
                      id="old-price-c"
                      style={{
                        marginTop: "-20px",
                        marginBottom: "12px",
                        fontSize: 16,
                        color: "#d32f2f",
                        textAlign: "center",
                      }}
                    >
                      <span style={{ textDecoration: "line-through" }}>
                        {oldPrice}
                      </span>{" "}
                      <span>
                        <span
                          dangerouslySetInnerHTML={{ __html: redRyalIcon }}
                        />
                      </span>
                      <span
                        style={{
                          textDecoration: "none",
                          color: "#25d366",
                          backgroundColor: "#dff1d9",
                          marginRight: 6,
                          padding: "0 5px",
                          borderRadius: 2,
                          fontSize: 16,
                        }}
                      >
                        وفر {save}{" "}
                        <span
                          dangerouslySetInnerHTML={{ __html: greenRyalIcon }}
                        />
                      </span>
                    </h3>
                    <h5>تشمل فحص:</h5>
                    <ul className="list-unstyled mt-3 mb-4">
                      {checklistItems.map((item) => (
                        <ChecklistItem
                          key={item.text}
                          checked={true} // All items checked for full plan
                          text={item.text}
                          tooltip={item.tooltip}
                        />
                      ))}
                    </ul>
                    <a
                      aria-label="Ask now Button"
                      id="plane-three"
                      className="ask-now"
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`https://cashif.cc/${
                        checkit ? "check-it/receipt" : "pay"
                      }/?plan=شامل&year_id=${
                        selectedYear >= 2015 ? 2 : 1
                      }&car_model_id=${selectedModelId}&price_id=0`}
                    >
                      أطلب الأن
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
}
