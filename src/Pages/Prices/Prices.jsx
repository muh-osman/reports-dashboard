import style from "./Prices.module.scss";
// MUI
import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import LoadingButton from "@mui/lab/LoadingButton";
import LinearProgress from "@mui/material/LinearProgress";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
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

export default function Prices() {
  //
  const inputRef = React.useRef(null);
  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  //
  const [trigger, setTrigger] = React.useState(false);
  //
  const { data: models, fetchStatus, isSuccess } = useSearchApi();
  //
  const [selectedModelId, setSelectedModelId] = React.useState(null);
  const handleModelChange = (event, newValue) => {
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
    setTrigger(false);
    setSelectedYear(newValue); // Update the selected year
    // console.log("Selected Year:", newValue); // Log the selected year
  };

  const handleSubmit = () => {
    if (selectedModelId && selectedYear) {
      setTrigger(true);
    } else {
      toast.warn("الرجاء تحديد الموديل وسنة الصنع");
    }
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

  // console.log(prices[0]);
  // console.log(prices[0]?.manufacturer_name);
  // console.log(prices[0]?.model_name);
  // console.log(prices[0]?.prices[0].price);
  // console.log(prices[0]?.prices[1].price);
  // console.log(prices[0]?.prices[2].price);

  return (
    <div className={style.container}>
      {fetchStatus === "fetching" && (
        <div className={style.progressContainer}>
          <LinearProgress />
        </div>
      )}

      <Typography
        variant="h6"
        component="div"
        style={{
          textAlign: "center",
          margin: "20px",
          marginTop: "8px",
          color: "#757575",
        }}
      >
        ابحث عن اسم سيارتك, واختر سنة الصنع
      </Typography>

      <div className={style.box}>
        <Autocomplete
          dir="auto"
          sx={{ backgroundColor: "#fff" }}
          ref={inputRef}
          disablePortal
          onChange={handleModelChange} // Add the onChange handler
          options={isSuccess ? models.carModels : []}
          getOptionLabel={(option) => option.model_name}
          renderInput={(params) => <TextField {...params} label="Search" />}
          // Use a unique key for each option
          renderOption={(props, option) => (
            <li {...props} key={option.id}>
              {" "}
              {/* Use option.id as the key */}
              {option.model_name}
            </li>
          )}
        />

        <Box sx={{ width: "85%", margin: "auto", marginTop: "28px" }}>
          {/* <Typography
            variant="h6"
            component="div"
            style={{ textAlign: "center", margin: "auto", color: "#757575" }}
          >
            سنة الصنع
          </Typography> */}
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

        <Box sx={{ marginTop: "32px", textAlign: "center" }}>
          <LoadingButton
            sx={{ maxWidth: "300px" }}
            fullWidth
            type="submit"
            variant="contained"
            disableRipple
            loading={pricesFetchStatus === "fetching"} // Show loading state
            onClick={handleSubmit} // Call handleSubmit on button click
          >
            بحث
          </LoadingButton>
        </Box>
      </div>

      <Box dir="rtl">
        <div
          className="overlay"
          id="overlay"
          style={{ padding: 16, gridTemplateRows: "1fr" }}
        >
          <div>
            <div className="title-box">
              <h2>اختر الباقة المناسبة</h2>
            </div>
            <div className="plane-box">
              {/* المحركات */}
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
                      <svg
                        id="Layer_1"
                        data-name="Layer 1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1124.14 1256.39"
                      >
                        <defs>
                          <style
                            dangerouslySetInnerHTML={{
                              __html:
                                "\n      .cls-1 {\n        fill: #174545;\n      }\n    ",
                            }}
                          />
                        </defs>
                        <path
                          className="cls-1"
                          d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z"
                        />
                        <path
                          className="cls-1"
                          d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z"
                        />
                      </svg>
                    </h1>
                    <h3
                      id="old-price-a"
                      style={{
                        marginTop: "-12px",
                        fontSize: 16,
                        color: "#d32f2f",
                      }}
                    />
                    <h5>تشمل فحص:</h5>
                    <ul className="list-unstyled mt-3 mb-4">
                      <li>
                        <span>
                          <svg
                            className="true-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            {/*!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
                            <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                          </svg>
                        </span>{" "}
                        المحرك
                        <Tooltip
                          title="فحص الأداء، مستوى الزيت، والصوت"
                          arrow
                          enterTouchDelay={0}
                        >
                          <IconButton>
                            <InfoIcon sx={{ fontSize: "16px" }} />
                          </IconButton>
                        </Tooltip>
                      </li>
                      <li>
                        <span>
                          <svg
                            className="true-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            {/*!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
                            <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                          </svg>
                        </span>{" "}
                        ناقل الحركة
                        <Tooltip
                          title="اختبار سلاسة التبديل والأداء"
                          arrow
                          enterTouchDelay={0}
                        >
                          <IconButton>
                            <InfoIcon sx={{ fontSize: "16px" }} />
                          </IconButton>
                        </Tooltip>
                      </li>
                      <li>
                        <span>
                          <svg
                            className="true-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            {/*!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
                            <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                          </svg>
                        </span>{" "}
                        الدفرنس
                        <Tooltip
                          title="فحص الأصوات والتسربات"
                          arrow
                          enterTouchDelay={0}
                        >
                          <IconButton>
                            <InfoIcon sx={{ fontSize: "16px" }} />
                          </IconButton>
                        </Tooltip>
                      </li>
                      <li>
                        <span>
                          <svg
                            className="true-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            {/*!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
                            <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                          </svg>
                        </span>{" "}
                        ميكانيكا أسفل السيارة
                        <Tooltip
                          dir="rtl"
                          title="فحص ميكانيكا أسفل السيارة: الأجزاء المتحركة: فحص الأجزاء المتحركة والتأكد من عدم وجود تلف أو تآكل
الهيكل السفلي: التحقق من عدم وجود أي صدأ أو تلف في الهيكل السفلي"
                          arrow
                          enterTouchDelay={0}
                        >
                          <IconButton>
                            <InfoIcon sx={{ fontSize: "16px" }} />
                          </IconButton>
                        </Tooltip>
                      </li>
                      <li>
                        <span>
                          <svg
                            className="true-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            {/*!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
                            <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                          </svg>
                        </span>{" "}
                        الكمبيوتر والحساسات
                        <Tooltip
                          title="استخدام أجهزة التشخيص لفحص الأنظمة الإلكترونية"
                          arrow
                          enterTouchDelay={0}
                        >
                          <IconButton>
                            <InfoIcon sx={{ fontSize: "16px" }} />
                          </IconButton>
                        </Tooltip>
                      </li>
                      <li>
                        <span>
                          <svg
                            className="true-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            {/*!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
                            <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                          </svg>
                        </span>{" "}
                        الهيكل الداخلي
                        <Tooltip
                          title="التحقق من شاص السيارة: الصدمات، الصدأ، اللحامات، نقاط التثبيت، والاتصالات الميكانيكية لضمان السلامة الهيكلية والسيارة"
                          arrow
                          enterTouchDelay={0}
                        >
                          <IconButton>
                            <InfoIcon sx={{ fontSize: "16px" }} />
                          </IconButton>
                        </Tooltip>
                      </li>
                      <li>
                        <span>
                          <svg
                            className="true-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            {/*!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
                            <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                          </svg>
                        </span>{" "}
                        تجربة السيارة
                        <Tooltip
                          title="تجربة القيادة للتحقق من الأداء العام"
                          arrow
                          enterTouchDelay={0}
                        >
                          <IconButton>
                            <InfoIcon sx={{ fontSize: "16px" }} />
                          </IconButton>
                        </Tooltip>
                      </li>
                      <li>
                        <span>
                          <svg
                            className="wrong-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 384 512"
                          >
                            {/*!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
                            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                          </svg>
                        </span>{" "}
                        الهيكل الخارجي
                        <Tooltip
                          title="فحص البودي، الدهان، الصدمات، والخدوش"
                          arrow
                          enterTouchDelay={0}
                        >
                          <IconButton>
                            <InfoIcon sx={{ fontSize: "16px" }} />
                          </IconButton>
                        </Tooltip>
                      </li>
                      <li>
                        <span>
                          <svg
                            className="wrong-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 384 512"
                          >
                            {/*!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
                            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                          </svg>
                        </span>{" "}
                        الوسائد الهوائية
                        <Tooltip
                          title="التحقق من سلامة وعمل الوسائد الهوائية (الايرباق)"
                          arrow
                          enterTouchDelay={0}
                        >
                          <IconButton>
                            <InfoIcon sx={{ fontSize: "16px" }} />
                          </IconButton>
                        </Tooltip>
                      </li>
                      <li>
                        <span>
                          <svg
                            className="wrong-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 384 512"
                          >
                            {/*!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
                            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                          </svg>
                        </span>{" "}
                        الديكورات الداخلية
                        <Tooltip
                          title="فحص سلامة المقاعد والأزرار والأجهزة الداخلية"
                          arrow
                          enterTouchDelay={0}
                        >
                          <IconButton>
                            <InfoIcon sx={{ fontSize: "16px" }} />
                          </IconButton>
                        </Tooltip>
                      </li>
                      <li>
                        <span>
                          <svg
                            className="wrong-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 384 512"
                          >
                            {/*!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
                            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                          </svg>
                        </span>{" "}
                        المزايا المخصصة للسيارة
                        <Tooltip
                          title="التحقق من نظام الملاحة، الكاميرات، والمستشعرات. وغيرها"
                          arrow
                          enterTouchDelay={0}
                        >
                          <IconButton>
                            <InfoIcon sx={{ fontSize: "16px" }} />
                          </IconButton>
                        </Tooltip>
                      </li>
                      <li>
                        <span>
                          <svg
                            className="wrong-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 384 512"
                          >
                            {/*!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
                            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                          </svg>
                        </span>{" "}
                        الملحقات الخارجية للسيارة
                        <Tooltip
                          title="فحص المرايا والأضواء الخارجية"
                          arrow
                          enterTouchDelay={0}
                        >
                          <IconButton>
                            <InfoIcon sx={{ fontSize: "16px" }} />
                          </IconButton>
                        </Tooltip>
                      </li>
                      <li>
                        <span>
                          <svg
                            className="wrong-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 384 512"
                          >
                            {/*!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
                            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                          </svg>
                        </span>{" "}
                        الزجاج
                        <Tooltip
                          title="التحقق من سلامة الزجاج"
                          arrow
                          enterTouchDelay={0}
                        >
                          <IconButton>
                            <InfoIcon sx={{ fontSize: "16px" }} />
                          </IconButton>
                        </Tooltip>
                      </li>
                      <li>
                        <span>
                          <svg
                            className="wrong-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 384 512"
                          >
                            {/*!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
                            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                          </svg>
                        </span>{" "}
                        الكفرات والجنوط
                        <Tooltip
                          title="فحص تآكل الكفرات وتوازن الجنوط"
                          arrow
                          enterTouchDelay={0}
                        >
                          <IconButton>
                            <InfoIcon sx={{ fontSize: "16px" }} />
                          </IconButton>
                        </Tooltip>
                      </li>
                      <li>
                        <span>
                          <svg
                            className="wrong-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 384 512"
                          >
                            {/*!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
                            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                          </svg>
                        </span>{" "}
                        الشمعات والأسطبات
                        <Tooltip
                          title="فحص عمل وسلامة الشمعات والأسطبات"
                          arrow
                          enterTouchDelay={0}
                        >
                          <IconButton>
                            <InfoIcon sx={{ fontSize: "16px" }} />
                          </IconButton>
                        </Tooltip>
                      </li>
                    </ul>
                    <a
                      aria-label="Ask now Button"
                      id="plane-one"
                      className="ask-now"
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`https://cashif.cc/pay/?plan=محركات&year_id=${
                        selectedYear >= 2015 ? 2 : 1
                      }&car_model_id=${selectedModelId}&price_id=2`}
                    >
                      أطلب الأن
                    </a>
                  </div>
                </div>
              </div>

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
                      <svg
                        id="Layer_1"
                        data-name="Layer 1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1124.14 1256.39"
                      >
                        <defs>
                          <style
                            dangerouslySetInnerHTML={{
                              __html:
                                "\n      .cls-1 {\n        fill: #174545;\n      }\n    ",
                            }}
                          />
                        </defs>
                        <path
                          className="cls-1"
                          d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z"
                        />
                        <path
                          className="cls-1"
                          d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z"
                        />
                      </svg>
                    </h1>
                    <h3
                      id="old-price-b"
                      style={{
                        marginTop: "-12px",
                        fontSize: 16,
                        color: "#d32f2f",
                      }}
                    />
                    <h5>تشمل فحص:</h5>
                    <ul className="list-unstyled mt-3 mb-4">
                      <li>
                        <span>
                          <svg
                            className="true-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            {/*!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
                            <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                          </svg>
                        </span>{" "}
                        المحرك
                        <Tooltip
                          title="فحص الأداء، مستوى الزيت، والصوت"
                          arrow
                          enterTouchDelay={0}
                        >
                          <IconButton>
                            <InfoIcon sx={{ fontSize: "16px" }} />
                          </IconButton>
                        </Tooltip>
                      </li>
                      <li>
                        <span>
                          <svg
                            className="true-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            {/*!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
                            <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                          </svg>
                        </span>{" "}
                        ناقل الحركة
                        <Tooltip
                          title="اختبار سلاسة التبديل والأداء"
                          arrow
                          enterTouchDelay={0}
                        >
                          <IconButton>
                            <InfoIcon sx={{ fontSize: "16px" }} />
                          </IconButton>
                        </Tooltip>
                      </li>
                      <li>
                        <span>
                          <svg
                            className="true-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            {/*!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
                            <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                          </svg>
                        </span>{" "}
                        الدفرنس
                        <Tooltip
                          title="فحص الأصوات والتسربات"
                          arrow
                          enterTouchDelay={0}
                        >
                          <IconButton>
                            <InfoIcon sx={{ fontSize: "16px" }} />
                          </IconButton>
                        </Tooltip>
                      </li>
                      <li>
                        <span>
                          <svg
                            className="true-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            {/*!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
                            <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                          </svg>
                        </span>{" "}
                        ميكانيكا أسفل السيارة
                        <Tooltip
                          dir="rtl"
                          title="فحص ميكانيكا أسفل السيارة: الأجزاء المتحركة: فحص الأجزاء المتحركة والتأكد من عدم وجود تلف أو تآكل
الهيكل السفلي: التحقق من عدم وجود أي صدأ أو تلف في الهيكل السفلي"
                          arrow
                          enterTouchDelay={0}
                        >
                          <IconButton>
                            <InfoIcon sx={{ fontSize: "16px" }} />
                          </IconButton>
                        </Tooltip>
                      </li>
                      <li>
                        <span>
                          <svg
                            className="true-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            {/*!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
                            <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                          </svg>
                        </span>{" "}
                        الكمبيوتر والحساسات
                        <Tooltip
                          title="استخدام أجهزة التشخيص لفحص الأنظمة الإلكترونية"
                          arrow
                          enterTouchDelay={0}
                        >
                          <IconButton>
                            <InfoIcon sx={{ fontSize: "16px" }} />
                          </IconButton>
                        </Tooltip>
                      </li>
                      <li>
                        <span>
                          <svg
                            className="true-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            {/*!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
                            <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                          </svg>
                        </span>{" "}
                        الهيكل الداخلي
                        <Tooltip
                          title="التحقق من شاص السيارة: الصدمات، الصدأ، اللحامات، نقاط التثبيت، والاتصالات الميكانيكية لضمان السلامة الهيكلية والسيارة"
                          arrow
                          enterTouchDelay={0}
                        >
                          <IconButton>
                            <InfoIcon sx={{ fontSize: "16px" }} />
                          </IconButton>
                        </Tooltip>
                      </li>
                      <li>
                        <span>
                          <svg
                            className="true-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            {/*!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
                            <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                          </svg>
                        </span>{" "}
                        تجربة السيارة
                        <Tooltip
                          title="تجربة القيادة للتحقق من الأداء العام"
                          arrow
                          enterTouchDelay={0}
                        >
                          <IconButton>
                            <InfoIcon sx={{ fontSize: "16px" }} />
                          </IconButton>
                        </Tooltip>
                      </li>
                      <li>
                        <span>
                          <svg
                            className="true-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            {/*!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
                            <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                          </svg>
                        </span>{" "}
                        الهيكل الخارجي
                        <Tooltip
                          title="فحص البودي، الدهان، الصدمات، والخدوش"
                          arrow
                          enterTouchDelay={0}
                        >
                          <IconButton>
                            <InfoIcon sx={{ fontSize: "16px" }} />
                          </IconButton>
                        </Tooltip>
                      </li>
                      <li>
                        <span>
                          <svg
                            className="true-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            {/*!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
                            <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                          </svg>
                        </span>{" "}
                        الوسائد الهوائية
                        <Tooltip
                          title="التحقق من سلامة وعمل الوسائد الهوائية (الايرباق)"
                          arrow
                          enterTouchDelay={0}
                        >
                          <IconButton>
                            <InfoIcon sx={{ fontSize: "16px" }} />
                          </IconButton>
                        </Tooltip>
                      </li>
                      <li>
                        <span>
                          <svg
                            className="wrong-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 384 512"
                          >
                            {/*!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
                            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                          </svg>
                        </span>{" "}
                        الديكورات الداخلية
                        <Tooltip
                          title="فحص سلامة المقاعد والأزرار والأجهزة الداخلية"
                          arrow
                          enterTouchDelay={0}
                        >
                          <IconButton>
                            <InfoIcon sx={{ fontSize: "16px" }} />
                          </IconButton>
                        </Tooltip>
                      </li>
                      <li>
                        <span>
                          <svg
                            className="wrong-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 384 512"
                          >
                            {/*!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
                            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                          </svg>
                        </span>{" "}
                        المزايا المخصصة للسيارة
                        <Tooltip
                          title="التحقق من نظام الملاحة، الكاميرات، والمستشعرات. وغيرها"
                          arrow
                          enterTouchDelay={0}
                        >
                          <IconButton>
                            <InfoIcon sx={{ fontSize: "16px" }} />
                          </IconButton>
                        </Tooltip>
                      </li>
                      <li>
                        <span>
                          <svg
                            className="wrong-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 384 512"
                          >
                            {/*!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
                            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                          </svg>
                        </span>{" "}
                        الملحقات الخارجية للسيارة
                        <Tooltip
                          title="فحص المرايا والأضواء الخارجية"
                          arrow
                          enterTouchDelay={0}
                        >
                          <IconButton>
                            <InfoIcon sx={{ fontSize: "16px" }} />
                          </IconButton>
                        </Tooltip>
                      </li>
                      <li>
                        <span>
                          <svg
                            className="wrong-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 384 512"
                          >
                            {/*!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
                            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                          </svg>
                        </span>{" "}
                        الزجاج
                        <Tooltip
                          title="التحقق من سلامة الزجاج"
                          arrow
                          enterTouchDelay={0}
                        >
                          <IconButton>
                            <InfoIcon sx={{ fontSize: "16px" }} />
                          </IconButton>
                        </Tooltip>
                      </li>
                      <li>
                        <span>
                          <svg
                            className="wrong-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 384 512"
                          >
                            {/*!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
                            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                          </svg>
                        </span>{" "}
                        الكفرات والجنوط
                        <Tooltip
                          title="فحص تآكل الكفرات وتوازن الجنوط"
                          arrow
                          enterTouchDelay={0}
                        >
                          <IconButton>
                            <InfoIcon sx={{ fontSize: "16px" }} />
                          </IconButton>
                        </Tooltip>
                      </li>
                      <li>
                        <span>
                          <svg
                            className="wrong-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 384 512"
                          >
                            {/*!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
                            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                          </svg>
                        </span>{" "}
                        الشمعات والأسطبات
                        <Tooltip
                          title="فحص عمل وسلامة الشمعات والأسطبات"
                          arrow
                          enterTouchDelay={0}
                        >
                          <IconButton>
                            <InfoIcon sx={{ fontSize: "16px" }} />
                          </IconButton>
                        </Tooltip>
                      </li>
                    </ul>
                    <a
                      aria-label="Ask now Button"
                      id="plane-two"
                      className="ask-now"
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`https://cashif.cc/pay/?plan=أساسي&year_id=${
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
                      <svg
                        id="Layer_1"
                        data-name="Layer 1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1124.14 1256.39"
                      >
                        <defs>
                          <style
                            dangerouslySetInnerHTML={{
                              __html:
                                "\n      .cls-1 {\n        fill: #174545;\n      }\n    ",
                            }}
                          />
                        </defs>
                        <path
                          className="cls-1"
                          d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z"
                        />
                        <path
                          className="cls-1"
                          d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z"
                        />
                      </svg>
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
                        <svg
                          width={13}
                          id="Layer_1"
                          data-name="Layer 1"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 1124.14 1256.39"
                        >
                          <defs>
                            <style
                              dangerouslySetInnerHTML={{
                                __html:
                                  "\n      .cls-2 {\n        fill: #d32f2f;\n      }\n    ",
                              }}
                            />
                          </defs>
                          <path
                            className="cls-2"
                            d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z"
                          />
                          <path
                            className="cls-2"
                            d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z"
                          />
                        </svg>
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
                        <svg
                          width={13}
                          id="Layer_1"
                          data-name="Layer 1"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 1124.14 1256.39"
                        >
                          <defs>
                            <style
                              dangerouslySetInnerHTML={{
                                __html:
                                  "\n      .cls-3 {\n        fill: #25d366;\n      }\n    ",
                              }}
                            />
                          </defs>
                          <path
                            className="cls-3"
                            d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z"
                          />
                          <path
                            className="cls-3"
                            d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z"
                          />
                        </svg>
                      </span>
                    </h3>
                    <h5>تشمل فحص:</h5>
                    <ul className="list-unstyled mt-3 mb-4">
                      <li>
                        <span>
                          <svg
                            className="true-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            {/*!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
                            <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                          </svg>
                        </span>{" "}
                        المحرك
                        <Tooltip
                          title="فحص الأداء، مستوى الزيت، والصوت"
                          arrow
                          enterTouchDelay={0}
                        >
                          <IconButton>
                            <InfoIcon sx={{ fontSize: "16px" }} />
                          </IconButton>
                        </Tooltip>
                      </li>
                      <li>
                        <span>
                          <svg
                            className="true-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            {/*!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
                            <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                          </svg>
                        </span>{" "}
                        ناقل الحركة
                        <Tooltip
                          title="اختبار سلاسة التبديل والأداء"
                          arrow
                          enterTouchDelay={0}
                        >
                          <IconButton>
                            <InfoIcon sx={{ fontSize: "16px" }} />
                          </IconButton>
                        </Tooltip>
                      </li>
                      <li>
                        <span>
                          <svg
                            className="true-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            {/*!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
                            <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                          </svg>
                        </span>{" "}
                        الدفرنس
                        <Tooltip
                          title="فحص الأصوات والتسربات"
                          arrow
                          enterTouchDelay={0}
                        >
                          <IconButton>
                            <InfoIcon sx={{ fontSize: "16px" }} />
                          </IconButton>
                        </Tooltip>
                      </li>
                      <li>
                        <span>
                          <svg
                            className="true-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            {/*!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
                            <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                          </svg>
                        </span>{" "}
                        ميكانيكا أسفل السيارة
                        <Tooltip
                          dir="rtl"
                          title="فحص ميكانيكا أسفل السيارة: الأجزاء المتحركة: فحص الأجزاء المتحركة والتأكد من عدم وجود تلف أو تآكل
الهيكل السفلي: التحقق من عدم وجود أي صدأ أو تلف في الهيكل السفلي"
                          arrow
                          enterTouchDelay={0}
                        >
                          <IconButton>
                            <InfoIcon sx={{ fontSize: "16px" }} />
                          </IconButton>
                        </Tooltip>
                      </li>
                      <li>
                        <span>
                          <svg
                            className="true-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            {/*!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
                            <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                          </svg>
                        </span>{" "}
                        الكمبيوتر والحساسات
                        <Tooltip
                          title="استخدام أجهزة التشخيص لفحص الأنظمة الإلكترونية"
                          arrow
                          enterTouchDelay={0}
                        >
                          <IconButton>
                            <InfoIcon sx={{ fontSize: "16px" }} />
                          </IconButton>
                        </Tooltip>
                      </li>
                      <li>
                        <span>
                          <svg
                            className="true-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            {/*!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
                            <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                          </svg>
                        </span>{" "}
                        الهيكل الداخلي
                        <Tooltip
                          title="التحقق من شاص السيارة: الصدمات، الصدأ، اللحامات، نقاط التثبيت، والاتصالات الميكانيكية لضمان السلامة الهيكلية والسيارة"
                          arrow
                          enterTouchDelay={0}
                        >
                          <IconButton>
                            <InfoIcon sx={{ fontSize: "16px" }} />
                          </IconButton>
                        </Tooltip>
                      </li>
                      <li>
                        <span>
                          <svg
                            className="true-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            {/*!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
                            <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                          </svg>
                        </span>{" "}
                        تجربة السيارة
                        <Tooltip
                          title="تجربة القيادة للتحقق من الأداء العام"
                          arrow
                          enterTouchDelay={0}
                        >
                          <IconButton>
                            <InfoIcon sx={{ fontSize: "16px" }} />
                          </IconButton>
                        </Tooltip>
                      </li>
                      <li>
                        <span>
                          <svg
                            className="true-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            {/*!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
                            <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                          </svg>
                        </span>{" "}
                        الهيكل الخارجي
                        <Tooltip
                          title="فحص البودي، الدهان، الصدمات، والخدوش"
                          arrow
                          enterTouchDelay={0}
                        >
                          <IconButton>
                            <InfoIcon sx={{ fontSize: "16px" }} />
                          </IconButton>
                        </Tooltip>
                      </li>
                      <li>
                        <span>
                          <svg
                            className="true-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            {/*!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
                            <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                          </svg>
                        </span>{" "}
                        الوسائد الهوائية
                        <Tooltip
                          title="التحقق من سلامة وعمل الوسائد الهوائية (الايرباق)"
                          arrow
                          enterTouchDelay={0}
                        >
                          <IconButton>
                            <InfoIcon sx={{ fontSize: "16px" }} />
                          </IconButton>
                        </Tooltip>
                      </li>
                      <li>
                        <span>
                          <svg
                            className="true-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            {/*!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
                            <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                          </svg>
                        </span>{" "}
                        الديكورات الداخلية
                        <Tooltip
                          title="فحص سلامة المقاعد والأزرار والأجهزة الداخلية"
                          arrow
                          enterTouchDelay={0}
                        >
                          <IconButton>
                            <InfoIcon sx={{ fontSize: "16px" }} />
                          </IconButton>
                        </Tooltip>
                      </li>
                      <li>
                        <span>
                          <svg
                            className="true-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            {/*!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
                            <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                          </svg>
                        </span>{" "}
                        المزايا المخصصة للسيارة
                        <Tooltip
                          title="التحقق من نظام الملاحة، الكاميرات، والمستشعرات. وغيرها"
                          arrow
                          enterTouchDelay={0}
                        >
                          <IconButton>
                            <InfoIcon sx={{ fontSize: "16px" }} />
                          </IconButton>
                        </Tooltip>
                      </li>
                      <li>
                        <span>
                          <svg
                            className="true-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            {/*!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
                            <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                          </svg>
                        </span>{" "}
                        الملحقات الخارجية للسيارة
                        <Tooltip
                          title="فحص المرايا والأضواء الخارجية"
                          arrow
                          enterTouchDelay={0}
                        >
                          <IconButton>
                            <InfoIcon sx={{ fontSize: "16px" }} />
                          </IconButton>
                        </Tooltip>
                      </li>
                      <li>
                        <span>
                          <svg
                            className="true-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            {/*!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
                            <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                          </svg>
                        </span>{" "}
                        الزجاج
                        <Tooltip
                          title="التحقق من سلامة الزجاج"
                          arrow
                          enterTouchDelay={0}
                        >
                          <IconButton>
                            <InfoIcon sx={{ fontSize: "16px" }} />
                          </IconButton>
                        </Tooltip>
                      </li>
                      <li>
                        <span>
                          <svg
                            className="true-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            {/*!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
                            <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                          </svg>
                        </span>{" "}
                        الكفرات والجنوط
                        <Tooltip
                          title="فحص تآكل الكفرات وتوازن الجنوط"
                          arrow
                          enterTouchDelay={0}
                        >
                          <IconButton>
                            <InfoIcon sx={{ fontSize: "16px" }} />
                          </IconButton>
                        </Tooltip>
                      </li>
                      <li>
                        <span>
                          <svg
                            className="true-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            {/*!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
                            <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                          </svg>
                        </span>{" "}
                        الشمعات والأسطبات
                        <Tooltip
                          title="فحص عمل وسلامة الشمعات والأسطبات"
                          arrow
                          enterTouchDelay={0}
                        >
                          <IconButton>
                            <InfoIcon sx={{ fontSize: "16px" }} />
                          </IconButton>
                        </Tooltip>
                      </li>
                    </ul>
                    <a
                      aria-label="Ask now Button"
                      id="plane-three"
                      className="ask-now"
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`https://cashif.cc/pay/?plan=شامل&year_id=${
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
