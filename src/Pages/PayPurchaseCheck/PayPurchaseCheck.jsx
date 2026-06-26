import style from "./PayPurchaseCheck.module.scss";
import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
// Lang
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";
// MUI
import { styled } from "@mui/material/styles";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary, { accordionSummaryClasses } from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { Backdrop, CircularProgress, Checkbox, FormControlLabel, FormHelperText, MenuItem, Select, Modal, Fade, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Box from "@mui/material/Box";
// Image
import tamaraLogo from "../../Assets/Images/tamara-logo.svg";
import tabbyLogo from "../../Assets/Images/tabby.png";
// API
import useGetPlanDetailsByYearAndModel from "../../API/useGetPlanDetailsByYearAndModel";
import useGetPoinsApi from "../../API/useGetPoinsApi";
import useCheckDiscountCodeApi from "../../API/useCheckDiscountCodeApi";
// Cookies
import { useCookies } from "react-cookie";
//
import { toast } from "react-toastify";

const Accordion = styled((props) => <MuiAccordion disableGutters elevation={0} square {...props} />)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderLeft: "none",
  borderRight: "none",
  borderTop: "none",
  "&:last-child": {
    borderBottom: 0,
    // backgroundColor: "red"
  },
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => <MuiAccordionSummary expandIcon={<ArrowBackIosNewIcon sx={{ fontSize: "0.9rem" }} />} {...props} />)(({ theme }) => ({
  // backgroundColor: "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  padding: "0px !important",
  [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]: {
    transform: "rotate(-90deg)",
  },
  [`& .${accordionSummaryClasses.content}`]: {
    marginLeft: theme.spacing(1),
  },
  ...theme.applyStyles("dark", {
    backgroundColor: "rgba(255, 255, 255, .05)",
  }),
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  // borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const CurrencyIcon = ({ fill = "#000000de", ...props }) => {
  return (
    <svg fill={fill} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1124.14 1256.39" {...props}>
      <path d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z" />
      <path d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z" />
    </svg>
  );
};

export default function PayPurchaseCheck() {
  ///////////////////////////////////////// Start Utils /////////////////////////////////////////
  useEffect(() => {
    // Scroll to the top of the page
    window.scrollTo(0, 0);
  }, []);
  // Cookies
  const [cookies, setCookie] = useCookies(["tokenApp", "userId", "phoneNumber", "username"]);

  // Lang
  const { t } = useTranslation();
  const [languageText, setLanguageText] = useState(i18n.language);
  // Add language change listener
  useEffect(() => {
    const handleLanguageChange = (lng) => {
      setLanguageText(lng);

      // Reload the page after a short delay to ensure language is changed
      setTimeout(() => {
        window.location.reload();
      }, 100); // Small delay to ensure i18n has updated
    };

    i18n.on("languageChanged", handleLanguageChange);

    // Cleanup function to remove the listener when component unmounts
    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, []);

  //
  const [expanded, setExpanded] = useState("panel3");
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  ///////////////////////////////////////// End Utils /////////////////////////////////////////

  ///////////////////////////////////////// Start Get params from URL /////////////////////////////////////////
  const searchParams = new URLSearchParams(window.location.search);
  const modelId = searchParams.get("car_model_id");
  const year = searchParams.get("full_year");
  const yearId = searchParams.get("year_id");
  const comfortService = searchParams.get("comfort_service");
  const serviceId = parseInt(searchParams.get("price_id"));
  ///////////////////////////////////////// End Get params from URL /////////////////////////////////////////

  // affiliate will be the front-end discount that should be to internal system back-end
  const [affiliate, setAffiliate] = useState(null);
  const affiliateRef = useRef(affiliate);
  useEffect(() => {
    affiliateRef.current = affiliate;
  }, [affiliate]);
  ////////////////////////////////////////////////////////////////////////

  // Fixed data value
  const [plan, setPlan] = useState("");
  const [model, setModel] = useState("");
  const [off, setOff] = useState(0);
  // Changed data value
  const [checkedAdditionalServices, setCheckedAdditionalServices] = useState([]);
  const checkedAdditionalServicesRef = useRef(checkedAdditionalServices);
  useEffect(() => {
    checkedAdditionalServicesRef.current = checkedAdditionalServices;
  }, [checkedAdditionalServices]);

  ///////////////////////////////////////// Start fetch APIs /////////////////////////////////////////
  const { data: points } = useGetPoinsApi();
  const { data: prices, fetchStatus: pricesFetchStatus, isSuccess: isFetchPricesSuccess } = useGetPlanDetailsByYearAndModel(modelId, year, true);

  useEffect(() => {
    if (isFetchPricesSuccess) {
      // set front-end discount(you_save) in Affiliate state
      const priceObj = prices.find((p) => p.serviceId === serviceId);
      setAffiliate(priceObj?.you_save ? priceObj?.you_save?.toString() : null);
    }
  }, [prices]);

  ///////////////////////////////////////// End fetch APIs /////////////////////////////////////////

  ///////////////////////////////////////// Start overlay /////////////////////////////////////////
  const [showOverlay, setShowOverlay] = useState(true);
  const [overlayMessage, setOverlayMessage] = useState("");
  useLayoutEffect(() => {
    if (pricesFetchStatus === "fetching") {
      setShowOverlay(true);
      setOverlayMessage("");
    } else if (isFetchPricesSuccess) {
      setShowOverlay(false);
      setOverlayMessage("");
    } else {
      setShowOverlay(true);
      setOverlayMessage("خطأ في الشبكة");
    }
  }, [pricesFetchStatus, isFetchPricesSuccess]);
  ///////////////////////////////////////// End overlay /////////////////////////////////////////

  const [total, setTotal] = useState(0);
  const totalRef = useRef(total);
  useEffect(() => {
    totalRef.current = total;
  }, [total]);

  ///////////////////////////////////////// Start discount code /////////////////////////////////////////
  const [discountCode, setDiscountCode] = useState("");
  const [isApplyingDiscount, setIsApplyingDiscount] = useState(false);
  const [appliedDiscount, setAppliedDiscount] = useState(null);
  const appliedDiscountRef = useRef(appliedDiscount);
  useEffect(() => {
    appliedDiscountRef.current = appliedDiscount;
  }, [appliedDiscount]);

  //
  // Marketer Share
  const [marketerShare, setMarketerShare] = useState(0);
  const marketerShareRef = useRef(marketerShare);
  useEffect(() => {
    setMarketerShare(Math.trunc(total * (discountCodeData?.marketerCommissionPercentage / 100)));
  }, [total, appliedDiscount]);
  useEffect(() => {
    marketerShareRef.current = marketerShare;
  }, [marketerShare]);

  //
  const { data: discountCodeData, fetchStatus: CheckDiscountCodeFetchStatus, isSuccess: isCheckDiscountCodeSuccess } = useCheckDiscountCodeApi(discountCode, isApplyingDiscount);

  // Function to handle discount application
  const discountToastShown = useRef(false);
  const handleApplyDiscount = () => {
    if (discountCode === "") {
      toast.warn("كود الخصم مطلوب!");
      return;
    }
    discountToastShown.current = false; // ← reset here
    setIsApplyingDiscount(true);
  };

  const [basePrice, setBasePrice] = useState(0);

  useEffect(() => {
    if (isCheckDiscountCodeSuccess && CheckDiscountCodeFetchStatus === "idle") {
      try {
        if (discountCodeData?.result === true) {
          // state 1
          if (discountCodeData?.codeDiscountPercentage === off) {
            // the front-end discount disabled so 0 will be send to intrenal system back-end
            setAffiliate(null);

            // Calculate discount amount only on base price
            const discountAmount = basePrice * (discountCodeData?.codeDiscountPercentage / 100);
            setAppliedDiscount({
              code: discountCode,
              amount: discountAmount,
              value: discountCodeData?.codeDiscountPercentage,
            });

            if (!discountToastShown.current) {
              discountToastShown.current = true;
              toast.warn(`نسبة الخصم المدخلة مطابقة للخصم الأصلي للباقة (${discountCodeData?.codeDiscountPercentage}%)، تم استبدال خصم الباقة بخصم الكود.`);
            }
            return;
          }
          // state 2
          if (discountCodeData?.codeDiscountPercentage < off) {
            // the discount code  will ignore and will keep front-end discount(you_save) and will be send to intrenal system back-end
            const priceObj = prices.find((p) => p.serviceId === serviceId);
            setAffiliate(priceObj?.you_save?.toString());

            // Do NOT
            // setAppliedDiscount({
            //   code: discountCode,
            //   amount: 0,
            //   value: 0,
            // });

            if (!discountToastShown.current) {
              discountToastShown.current = true;
              toast.warn(`كود الخصم المدخل (${discountCodeData?.codeDiscountPercentage}%) أقل من الخصم الأساسي على الباقة (${off}%), سيتم تطبيق القيمة الأعلى`);
            }
            return;
          }
          // state 3
          if (discountCodeData?.codeDiscountPercentage > off) {
            // the front-end discount disabled so 0 will be send to intrenal system back-end
            setAffiliate(null);

            // Calculate discount amount only on base price
            const discountAmount = basePrice * (discountCodeData?.codeDiscountPercentage / 100);
            setAppliedDiscount({
              code: discountCode,
              amount: discountAmount,
              value: discountCodeData?.codeDiscountPercentage,
            });
          }
        } else if (discountCodeData?.result === false) {
          setAppliedDiscount(null);
          toast.warn("كود غير صحيح");
        }
      } catch (error) {
        console.log(error);
        setAppliedDiscount(null);
      } finally {
        setIsApplyingDiscount(false);
      }
    }
  }, [CheckDiscountCodeFetchStatus, basePrice]);
  ///////////////////////////////////////// End discount code /////////////////////////////////////////

  ///////////////////////////////////////// Start redeem points /////////////////////////////////////////
  const [redeemPoints, setRedeemPoints] = useState("");
  const [isApplyingPoints, setIsApplyingPoints] = useState(false);
  const [appliedPoints, setAppliedPoints] = useState(0);
  const appliedPointsRef = useRef(appliedPoints);
  useEffect(() => {
    appliedPointsRef.current = appliedPoints;
  }, [appliedPoints]);

  // Function to handle points redemption
  const handleRedeemPoints = async () => {
    setIsApplyingPoints(true);

    try {
      const pointsValue = parseInt(redeemPoints);

      if (!cookies.tokenApp) {
        toast.warn("يرجى تسجيل الدخول لاستبدال النقاط");
        return;
      }

      if (!pointsValue || pointsValue <= 0) {
        toast.warn("الرجاء إدخال عدد نقاط صحيح");
        return;
      }

      // Validation checks
      if (isNaN(pointsValue)) {
        toast.warn("يرجى إدخال عدد صحيح فقط");
        return;
      }

      if (!/^\d+$/.test(redeemPoints.trim())) {
        toast.warn("يرجى إدخال رقم صحيح بدون كسور");
        return;
      }

      if (pointsValue > points?.points) {
        toast.warn(`لا يمكن استبدال نقاط أكثر من رصيدك. رصيدك الحالي: ${points?.points} نقطة`);
        return;
      }

      if (pointsValue > total) {
        toast.warn(`لا يمكن استبدال نقاط أكثر من قيمة الطلب. قيمة الطلب الحالي: ${total} ريال`);
        return;
      }

      if (pointsValue === total) {
        toast.warn(`لا يمكن استبدال نقاطك بكامل قيمة الطلب. الحد الأدنى للطلب 10 ريال`);
        return;
      }

      if (pointsValue > total - 10) {
        toast.warn(`لا يمكن استبدال نقاطك لكامل قيمة الفاتورة، الحد الأدنى للطلب 10 ريال`);
        return;
      }

      setAppliedPoints(pointsValue);

      toast.success(`تم استبدال ${pointsValue} نقطة بنجاح`);
    } catch (error) {
      toast.error("حدث خطأ في استبدال النقاط");
      console.error(error);
    } finally {
      setIsApplyingPoints(false);
    }
  };
  ///////////////////////////////////////// End redeem points /////////////////////////////////////////

  ///////////////////////////////////////// Start logic that updata the total /////////////////////////////////////////
  const [capturePhotosAndVideosForCarPrice, setCapturePhotosAndVideosForCarPrice] = useState(50);
  const [isCapturePhotosAndVideosForCarChecked, setIsCapturePhotosAndVideosForCarChecked] = useState(false);
  // Mertah service
  const [mertahServicePrice, setMertahServicePrice] = useState(345);
  const [isMertahServiceChecked, setIsMertahServiceChecked] = useState(comfortService === "yes");
  const isMertahServiceCheckedRef = useRef(isMertahServiceChecked);
  useEffect(() => {
    //
    isMertahServiceCheckedRef.current = isMertahServiceChecked;
    // reset additional service(CapturePhotosAndVideosForCar) if Mertah Service Checked OR unChecked
    setIsCapturePhotosAndVideosForCarChecked(false);
  }, [isMertahServiceChecked]);

  //
  useEffect(() => {
    // Only calculate if we have all the required data
    if (isFetchPricesSuccess && prices && prices.length > 0 && serviceId) {
      // Find the plan by serviceId
      const priceObj = prices.find((p) => p.serviceId === serviceId);

      if (priceObj) {
        setPlan(priceObj.serviceAr); // was prices[0].prices[priceId].service_name
        setModel(priceObj.carMarkAr); // was prices[0].model_name
        setOff(priceObj.discount_percent ?? 0);

        const calculatedBasePrice = Number(priceObj.price) || 0;
        setBasePrice(calculatedBasePrice);

        // Calculate total with discount applied only to base price
        let calculatedTotal = calculatedBasePrice;

        // Apply discount to base price if exists
        if (!!appliedDiscount?.amount) {
          setBasePrice(calculatedBasePrice / (1 - +off / 100));
          calculatedTotal = calculatedBasePrice / (1 - +off / 100) - appliedDiscount?.amount;
        }

        // Update checkedAdditionalServices based on isMertahServiceChecked
        setCheckedAdditionalServices((prev) => {
          const hasMertahService = prev.includes("خدمة مرتاح");

          if (isMertahServiceChecked && !hasMertahService) {
            // Add "خدمة مرتاح" if checked and not already in array
            return [...prev, "خدمة مرتاح"];
          } else if (!isMertahServiceChecked && hasMertahService) {
            // Remove "خدمة مرتاح" if unchecked and present in array
            return prev.filter((item) => item !== "خدمة مرتاح");
          }
          // Return unchanged if no change needed
          return prev;
        });

        // Update checkedAdditionalServices based on isCapturePhotosAndVideosForCarChecked
        setCheckedAdditionalServices((prev) => {
          const hasCapturePhotosAndVideosForCar = prev.includes("تصوير السيارة (فيديو + صور)");

          if (isCapturePhotosAndVideosForCarChecked && !hasCapturePhotosAndVideosForCar) {
            // Add "تصوير السيارة (فيديو + صور)" if checked and not already in array
            return [...prev, "تصوير السيارة (فيديو + صور)"];
          } else if (!isCapturePhotosAndVideosForCarChecked && hasCapturePhotosAndVideosForCar) {
            // Remove "تصوير السيارة (فيديو + صور)" if unchecked and present in array
            return prev.filter((item) => item !== "تصوير السيارة (فيديو + صور)");
          }
          // Return unchanged if no change needed
          return prev;
        });

        // Add mertahServicePrice price if checked
        if (isMertahServiceChecked) {
          calculatedTotal += mertahServicePrice;
        }

        // Add "Capture Photos And Videos For Car" price if checked
        if (isCapturePhotosAndVideosForCarChecked) {
          calculatedTotal += capturePhotosAndVideosForCarPrice;
        }

        // Apply points discount
        if (appliedPoints) {
          calculatedTotal -= appliedPoints;
        }

        // console.log("Setting total to:", Math.trunc(calculatedTotal));
        if (calculatedTotal < 10) {
          alert("الحد الأدنى للطلب 10 ريال");
          window.location.reload();
          return;
        }

        setTotal(Math.trunc(calculatedTotal));
      } else {
        console.log("Price object not found for serviceId:", serviceId);
        setBasePrice(0);
        setTotal(0);
      }
    } else {
      // Set to 0 if we don't have the data yet
      setBasePrice(0);
      setTotal(0);
    }
  }, [
    isMertahServiceChecked,
    mertahServicePrice,
    isFetchPricesSuccess,
    prices,
    serviceId,
    appliedDiscount,
    appliedPoints,
    capturePhotosAndVideosForCarPrice,
    isCapturePhotosAndVideosForCarChecked,
  ]);

  // Update the display to show discount amount based only on base price
  const discountAmount = appliedDiscount ? Math.trunc(basePrice * (appliedDiscount?.value / 100)) : 0;
  ///////////////////////////////////////// End logic that updata the total /////////////////////////////////////////

  ///////////////////////////////////////// Start Username input /////////////////////////////////////////
  // const [userName, setUserName] = useState("");
  // const userNameRef = useRef(userName);
  // useEffect(() => {
  //   userNameRef.current = userName;
  // }, [userName]);
  // const [userNameError, setUserNameError] = useState(false);
  // // Handle user name change
  // const handleUserNameChange = (e) => {
  //   const value = e.target.value;
  //   setUserName(value);
  // };
  // // validate user name
  // const handleUserNameBlur = () => {
  //   if (!userName.trim()) {
  //     toast.warn("الرجاء إدخال الاسم");
  //     setUserNameError(true);
  //     return;
  //   }

  //   // Check if starts with 5 (Saudi mobile numbers start with 5)
  //   if (userName.trim().length < 4) {
  //     toast.warn("يرجى ادخال الاسم كامل");
  //     setUserNameError(true);
  //     return;
  //   }

  //   setUserNameError(false);
  // };
  ///////////////////////////////////////// End Username input /////////////////////////////////////////

  ///////////////////////////////////////// Start Name inputs (First, Middle, Last) /////////////////////////////////////////
  const [firstName, setFirstName] = useState("");
  const firstNameRef = useRef("");
  const [middleName, setMiddleName] = useState("");
  const middleNameRef = useRef("");
  const [lastName, setLastName] = useState("");
  const lastNameRef = useRef("");

  // Combine all name parts
  const [userName, setUserName] = useState(""); // Full name
  const userNameRef = useRef(""); // Create a ref for the full name (concatenated)

  useEffect(() => {
    setUserName([firstName, middleName, lastName].filter(Boolean).join(" ").trim());
  }, [firstName, middleName, lastName]);
  useEffect(() => {
    userNameRef.current = userName;
  }, [userName]);

  useEffect(() => {
    firstNameRef.current = firstName;
  }, [firstName]);
  useEffect(() => {
    middleNameRef.current = middleName;
  }, [middleName]);
  useEffect(() => {
    lastNameRef.current = lastName;
  }, [lastName]);

  // if user Auth, the username will get from cookie and name input will hide
  useEffect(() => {
    // console.log(cookies?.username);
    if (cookies?.username) {
      setUserName(cookies?.username);
    }
  }, [cookies.username]);

  // Error states for each field
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [middleNameError, setMiddleNameError] = useState(false);

  // Handle first name change
  const handleFirstNameChange = (e) => {
    const value = e.target.value;
    setFirstName(value);
  };

  // Handle middle name change
  const handleMiddleNameChange = (e) => {
    const value = e.target.value;
    setMiddleName(value);
  };

  // Handle last name change
  const handleLastNameChange = (e) => {
    const value = e.target.value;
    setLastName(value);
  };

  // Validate first name
  const handleFirstNameBlur = () => {
    if (!firstName.trim()) {
      toast.warn("الرجاء إدخال الاسم الأول");
      setFirstNameError(true);
      return;
    }

    if (firstName.trim().length < 2) {
      toast.warn("الاسم الأول يجب أن يكون على الأقل حرفين");
      setFirstNameError(true);
      return;
    }

    setFirstNameError(false);
  };

  // Validate last name
  const handleLastNameBlur = () => {
    if (!lastName.trim()) {
      toast.warn("الرجاء إدخال اسم العائلة");
      setLastNameError(true);
      return;
    }

    if (lastName.trim().length < 2) {
      toast.warn("اسم العائلة يجب أن يكون على الأقل حرفين");
      setLastNameError(true);
      return;
    }

    setLastNameError(false);
  };

  // Validate middle name (optional)
  const handleMiddleNameBlur = () => {
    if (!middleName.trim()) {
      toast.warn("الرجاء إدخال الاسم الأوسط");
      setMiddleNameError(true);
      return;
    }

    if (middleName.trim().length < 2) {
      toast.warn("الاسم الأوسط يجب أن يكون على الأقل حرفين");
      setMiddleNameError(true);
      return;
    }

    setMiddleNameError(false);
  };
  ///////////////////////////////////////// End Name inputs (First, Middle, Last) /////////////////////////////////////////

  ///////////////////////////////////////// Start Phone Number input /////////////////////////////////////////
  const [phoneNumber, setPhoneNumber] = useState("");
  const [formatedPhoneNumber, setFormatedPhoneNumber] = useState("");
  const formatedPhoneNumberRef = useRef(formatedPhoneNumber);
  useEffect(() => {
    formatedPhoneNumberRef.current = formatedPhoneNumber;
  }, [formatedPhoneNumber]);
  const [phoneError, setPhoneError] = useState(false);
  // Handle phoneNumber change
  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    setPhoneNumber(value);
    setFormatedPhoneNumber(value.replace(/^0+/, "")); // Removes all leading zeros

    // console.log(formatedPhoneNumber);
  };

  // if user Auth, the phone number will get from cookie and phone number input will hide
  useEffect(() => {
    // console.log(cookies.phoneNumber);
    if (cookies?.phoneNumber) {
      setPhoneNumber(cookies?.phoneNumber);
      setFormatedPhoneNumber(cookies?.phoneNumber?.replace(/^0+/, "")); // Removes all leading zeros
    }
  }, [cookies.phoneNumber]);

  // validate phone number
  const handlePhoneNumberBlur = () => {
    // Remove all non-digit characters
    // const cleanPhone = phoneNumber.replace(/\D/g, "");

    if (!phoneNumber.trim()) {
      toast.warn("الرجاء إدخال رقم الجوال");
      setPhoneError(true);
      return;
    }

    // Check if starts with 5 (Saudi mobile numbers start with 5)
    if (!phoneNumber.startsWith("05")) {
      toast.warn("رقم الجوال يجب أن يبدأ بـ 05");
      setPhoneError(true);
      return;
    }

    // Check length (9 digits for Saudi mobile numbers without country code)
    if (phoneNumber.length !== 10) {
      toast.warn("رقم الجوال يجب أن يكون 10 أرقام");
      setPhoneError(true);
      return;
    }

    // Check if all digits are valid
    if (!/^05[0-9]{8}$/.test(phoneNumber)) {
      toast.warn("رقم الجوال غير صحيح");
      setPhoneError(true);
      return;
    }

    setPhoneError(false);
  };
  ///////////////////////////////////////// End Phone Number input /////////////////////////////////////////

  ///////////////////////////////////////// Start Branch input /////////////////////////////////////////
  const [selectedBranch, setSelectedBranch] = useState("");
  const selectedBranchRef = useRef(selectedBranch);
  useEffect(() => {
    selectedBranchRef.current = selectedBranch;
  }, [selectedBranch]);
  const branches = [
    { id: "1", value: "الرياض-القادسية", label: "الرياض - القادسية" },
    { id: "2", value: "الرياض-الشفا", label: "الرياض - الشفا" },
    { id: "3", value: "القصيم", label: "القصيم" },
    { id: "4", value: "الدمام", label: "الدمام" },
    { id: "5", value: "جدة", label: "جدة" },
  ];
  // Handle branch change
  const handleBranchChange = (e) => {
    const value = e.target.value;
    setSelectedBranch(value);
  };
  ///////////////////////////////////////// End Branch input /////////////////////////////////////////

  ///////////////////////////////////////// Start address input /////////////////////////////////////////
  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState(false);
  const addressRef = useRef(address);
  useEffect(() => {
    addressRef.current = address;
  }, [address]);
  // Handle address change
  const handleAddressChange = (e) => {
    const value = e.target.value;
    setAddress(value);
  };
  // validate address
  const handleAddressBlur = () => {
    if (!address.trim()) {
      if (isMertahServiceChecked) {
        toast.warn("يرجى ادخال بيانات العنوان");
      } else {
        toast.warn("يرجى ادخال بيانات المدينة");
      }
      setAddressError(true);
      return;
    }

    // Check if starts with 5 (Saudi mobile numbers start with 5)
    if (address.trim().length < 3) {
      toast.warn("يرجى ادخال بيانات صحيحة");
      setAddressError(true);
      return;
    }

    setAddressError(false);
  };
  ///////////////////////////////////////// End address input /////////////////////////////////////////

  ///////////////////////////////////////// Start Mertah Modal states /////////////////////////////////////////
  // checkbox
  const [acceptTerms, setAcceptTerms] = useState(false);
  // Modal
  const [openModal, setOpenModal] = useState(false);
  const [isAcceptMertahTerms, setIsAcceptMertahTerms] = useState(false);
  const acceptMertahTermsRef = useRef(isAcceptMertahTerms);
  useEffect(() => {
    acceptMertahTermsRef.current = isAcceptMertahTerms;
  }, [isAcceptMertahTerms]);

  const handleTermsChange = (e) => {
    setAcceptTerms(e.target.checked);
    setOpenModal(true);
  };

  // Handle modal confirmation
  const handleModalConfirm = () => {
    setAcceptTerms(true);
    setIsAcceptMertahTerms(true);
    setOpenModal(false);
  };

  // Handle modal close/cancel
  const handleModalClose = () => {
    setOpenModal(false);
    setAcceptTerms(false);
    setIsAcceptMertahTerms(false);
  };
  ///////////////////////////////////////// End Mertah Modal states /////////////////////////////////////////

  ///////////////////////////////////////// Start Tamara /////////////////////////////////////////
  const [isTamaraBtnLoading, setIsTamaraBtnLoading] = useState(false);
  const handleClickTamaraBtn = async () => {
    if (!cookies.username && (!firstNameRef.current || !middleNameRef.current || !lastNameRef.current || !userNameRef.current || userNameRef.current.trim().length < 6)) {
      toast.warn("الاسم الكامل مطلوب!");
      return;
    }
    if (!formatedPhoneNumberRef.current) {
      toast.warn("رقم الجوال مطلوب!");
      return;
    }
    if (!/^5\d{8}$/.test(formatedPhoneNumberRef.current)) {
      toast.warn("رقم الجوال غير صالح!");
      return;
    }
    if (!selectedBranchRef.current) {
      toast.warn("حقل الفرع مطلوب!");
      return;
    }
    if (isMertahServiceCheckedRef.current && !addressRef.current) {
      toast.warn("حقل العنوان مطلوب!");
      return;
    }
    // Check if user accept Mertah terms
    if (isMertahServiceCheckedRef.current && !acceptMertahTermsRef.current) {
      toast.warn("يرجى الموافقة على شروط خدمة مرتاح");
      return;
    }
    if (!addressRef.current) {
      toast.warn("حقل المدينة مطلوب!");
      return;
    }

    setIsTamaraBtnLoading(true);

    // Random string 16 Char
    const timestamp = Date.now().toString(36).slice(-6);
    let randomString = Math.random().toString(36).substr(2, 10);
    randomString = "ORDER-" + (timestamp + randomString).slice(0, 10); // Total length will be 16

    const orderData = {
      total_amount: {
        amount: totalRef.current, // price
        currency: "SAR",
      },
      shipping_amount: {
        amount: 0,
        currency: "SAR",
      },
      tax_amount: {
        amount: 0,
        currency: "SAR",
      },
      order_reference_id: randomString,
      discount: {
        name: "N/A",
        amount: {
          amount: 0,
          currency: "SAR",
        },
      },
      items: [
        {
          name: plan, // plan
          type: model, // model
          reference_id: randomString,
          sku: yearId, // yearId
          item_url: "https://item-url.com/1234",
          image_url: "https://item-url.com/1234",
          quantity: 1,
          total_amount: {
            amount: totalRef.current,
            currency: "SAR",
          },
        },
      ],
      consumer: {
        email: "customer@email.com",
        first_name: userNameRef.current.trim().split(" ")[0],
        last_name: userNameRef.current.trim().split(" ").slice(1).join(" "),
        phone_number: formatedPhoneNumberRef.current,
      },
      country_code: "SA",
      description: year || null, // fullYear
      merchant_url: {
        cancel: `${window.location.origin}${process.env.PUBLIC_URL}/pay/purchase-check/thanks?cancel=true`,
        failure: `${window.location.origin}${process.env.PUBLIC_URL}/pay/purchase-check/thanks?fail=true`,
        success: `${window.location.origin}${process.env.PUBLIC_URL}/pay/purchase-check/thanks`,
      },
      payment_type: "PAY_BY_INSTALMENTS",
      instalments: 3,
      billing_address: {
        country_code: "SA",
        region: String(marketerShareRef?.current) || null, // marketerShare
      },
      shipping_address: {
        city: selectedBranchRef.current, // Branch
        country_code: "SA",
        first_name: userNameRef.current.trim().split(" ")[0],
        last_name: userNameRef.current.trim().split(" ").slice(1).join(" "),
        line1: formatedPhoneNumberRef.current, // this is the used in back-end as PhoneNumber
        line2: isMertahServiceCheckedRef.current ? "مرتاح" : null, // Service
        phone_number: formatedPhoneNumberRef.current,
        region: addressRef.current || null, // address
      },
      locale: "ar_SA",

      additional_data: {
        delivery_method: userNameRef.current, // full name
        pickup_store: appliedDiscountRef?.current?.code || null, // discount Code
        store_code: affiliateRef.current || null, // Front-end discount
        vendor_amount: cookies?.userId || null, // clientId
        merchant_settlement_amount: appliedPointsRef.current || null, // redeemeAmoumntValue
        vendor_reference_code: checkedAdditionalServicesRef.current.join(", ") || "لايوجد", // additionalServices
      },
    };

    console.log(orderData);

    try {
      // this api will send the "user data(orderData)" to back-end then the back-end will send this data to Tamara API and return the "checkout_url" that will take it in Front-end to redirect the user to Tamara checkout page(Checkout Session), after the payment is done, tamara will redirect the user back to the "success_url (thanks page)" that we have set in the "orderData" object.
      const response = await fetch(`https://cashif.cc/payment-system/back-end/public/api/pay-with-tamara`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        setIsTamaraBtnLoading(false);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      // Redirect to Tamara checkout page
      if (result.checkout_url) {
        window.location.href = result.checkout_url;
      } else {
        setIsTamaraBtnLoading(false);
        toast.warn("Failed to retrieve checkout URL.");
      }
    } catch (error) {
      setIsTamaraBtnLoading(false);
      console.error("Error creating Tamara checkout:", error);
      toast.warn("An error occurred while processing your payment. Please try again.");
    }
  };
  ///////////////////////////////////////// End Tamara /////////////////////////////////////////

  ///////////////////////////////////////// Start Tabby /////////////////////////////////////////
  const [isTabbyLoading, setIsTabbyBtnLoading] = useState(false);
  const handleClickTabbyBtn = async () => {
    if (!cookies.username && (!firstNameRef.current || !middleNameRef.current || !lastNameRef.current || !userNameRef.current || userNameRef.current.trim().length < 6)) {
      toast.warn("الاسم الكامل مطلوب!");
      return;
    }
    if (!formatedPhoneNumberRef.current) {
      toast.warn("رقم الجوال مطلوب!");
      return;
    }
    if (!/^5\d{8}$/.test(formatedPhoneNumberRef.current)) {
      toast.warn("رقم الجوال غير صالح!");
      return;
    }
    if (!selectedBranchRef.current) {
      toast.warn("حقل الفرع مطلوب!");
      return;
    }
    if (isMertahServiceCheckedRef.current && !addressRef.current) {
      toast.warn("حقل العنوان مطلوب!");
      return;
    }
    // Check if user accept Mertah terms
    if (isMertahServiceCheckedRef.current && !acceptMertahTermsRef.current) {
      toast.warn("يرجى الموافقة على شروط خدمة مرتاح");
      return;
    }
    if (!addressRef.current) {
      toast.warn("حقل المدينة مطلوب!");
      return;
    }

    setIsTabbyBtnLoading(true);

    // Random string 16 Char
    const timestamp = Date.now().toString(36).slice(-6);
    let randomString = Math.random().toString(36).substr(2, 10);
    randomString = "TABBY-" + (timestamp + randomString).slice(0, 10); // Total length will be 16

    const now = new Date();
    const formattedDate = now.toISOString();

    const orderData = {
      payment: {
        amount: totalRef.current, // price,
        currency: "SAR",
        description: `id=${randomString}&fullname=${userNameRef.current}&phone=${formatedPhoneNumberRef.current}&branch=${selectedBranchRef.current}&plan=${plan}&price=${
          totalRef.current
        }&model=${model}&yearId=${yearId}&additionalServices=${checkedAdditionalServicesRef.current.join(", ") || "لايوجد"}${
          isMertahServiceCheckedRef.current ? `&service=مرتاح` : ""
        }${affiliateRef.current ? `&affiliate=${affiliateRef.current}` : ""}${
          appliedDiscountRef?.current?.code ? `&dc=${appliedDiscountRef?.current?.code}&msh=${marketerShareRef?.current}` : ""
        }${year ? `&fy=${year}` : ""}${appliedPointsRef.current ? `&rv=${appliedPointsRef.current}&cd=${cookies?.userId}` : ""}${
          addressRef.current ? `&ad=${addressRef.current}` : ""
        }`,
        buyer: {
          phone: formatedPhoneNumberRef.current,
          email: "user@example.com",
          name: userNameRef.current,
          dob: "2000-08-24",
        },
        shipping_address: {
          city: selectedBranchRef.current,
          address: selectedBranchRef.current,
          zip: "N/A",
        },
        order: {
          tax_amount: "0.00",
          shipping_amount: "0.00",
          discount_amount: "0.00",
          updated_at: formattedDate,
          reference_id: randomString,
          items: [
            {
              title: plan, // plan
              description: plan, // plan
              quantity: 1,
              unit_price: totalRef.current, // price,
              discount_amount: "0.00",
              reference_id: "string",
              image_url: "http://example.com",
              product_url: "http://example.com",
              gender: "Male",
              category: plan, // plan
              color: "string",
              product_material: "string",
              size_type: "string",
              size: "string",
              brand: model, // model
              is_refundable: false,
            },
          ],
        },
        buyer_history: {
          registered_since: formattedDate,
          loyalty_level: 0,
          wishlist_count: 0,
          is_social_networks_connected: true,
          is_phone_number_verified: true,
          is_email_verified: true,
        },
        order_history: [
          {
            purchased_at: formattedDate,
            amount: totalRef.current, // price,
            payment_method: "card",
            status: "new",
            buyer: {
              phone: formatedPhoneNumberRef.current,
              email: "user@example.com",
              name: userNameRef.current,
              dob: "2000-08-24",
            },
            shipping_address: {
              city: selectedBranchRef.current, // Branch
              address: selectedBranchRef.current, // Branch
              zip: "N/A",
            },
            items: [
              {
                title: plan, // plan,
                description: plan, // plan
                quantity: 1,
                unit_price: totalRef.current, // price
                discount_amount: "0.00",
                reference_id: randomString,
                image_url: "http://example.com",
                product_url: "http://example.com",
                ordered: 0,
                captured: 0,
                shipped: 0,
                refunded: 0,
                gender: "Male",
                category: plan, // plan
                color: "string",
                product_material: "string",
                size_type: "string",
                size: "string",
                brand: model, // model
              },
            ],
          },
        ],
        meta: {
          order_id: null,
          customer: null,
        },
        attachment: {
          body: '{"flight_reservation_details": {"pnr": "TR9088999","affiliate_name": "some affiliate"}}',
          content_type: "application/vnd.tabby.v1+json",
        },
      },
      lang: "ar",
      merchant_code: "SA",
      merchant_urls: {
        success: `${window.location.origin}${process.env.PUBLIC_URL}/pay/purchase-check/thanks/`,
        cancel: `${window.location.origin}${process.env.PUBLIC_URL}/pay/purchase-check/thanks/?cancel=true`,
        failure: `${window.location.origin}${process.env.PUBLIC_URL}/pay/purchase-check/thanks/?fail=true`,
      },
      token: null,
    };

    try {
      // this api will send the "user data(orderData)" to back-end then the back-end will send this data to Tabby API and return the "web_url" that will take it in Front-end to redirect the user to Tabby checkout page(Checkout Session), after the payment is done, Tabby will redirect the user back to the "success_url (thankyou page)" that we have set in the "orderData" object.
      const response = await fetch(`https://cashif.cc/payment-system/back-end/public/api/pay-with-tabby`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        setIsTabbyBtnLoading(false);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      // Redirect to Tabby checkout page
      if (result.checkout_url) {
        window.location.href = result.checkout_url;
      } else {
        setIsTabbyBtnLoading(false);
        toast.warn("Failed to retrieve checkout URL.");
      }
    } catch (error) {
      setIsTabbyBtnLoading(false);
      console.error("Error creating Tabby checkout:", error);
      toast.warn("An error occurred while processing your payment. Please try again.");
    }
  };
  ///////////////////////////////////////// End Tabby /////////////////////////////////////////

  ///////////////////////////////////////// Start Moyasar /////////////////////////////////////////
  const isMoyasarFormInit = useRef(false);
  useEffect(() => {
    if (isFetchPricesSuccess && window.Moyasar && total > 0) {
      // If form is already initialized, just update the amount
      if (isMoyasarFormInit.current) {
        window.Moyasar.setAmount(total * 100);
      }

      isMoyasarFormInit.current = true;

      window.Moyasar.init({
        element: ".mysr-form",
        amount: total * 100,
        currency: "SAR",
        language: languageText === "ar" ? "ar" : "en",
        description: `موديل ${model} - فحص ${plan}`,
        publishable_api_key: window.location.hostname === "localhost" ? process.env.REACT_APP_PURCHASE_MOYASAR_TEST_KEY : process.env.REACT_APP_PURCHASE_MOYASAR_LIVE_KEY,
        callback_url: `${window.location.origin}${process.env.PUBLIC_URL}/pay/purchase-check/thanks`,
        supported_networks: ["visa", "mastercard", "mada"],
        methods: ["creditcard", "applepay", "samsungpay"],

        apple_pay: {
          country: "SA",
          label: "Cashif for car inspection",
          validate_merchant_url: "https://api.moyasar.com/v1/applepay/initiate",
        },

        samsung_pay: {
          service_id: "4d1df6e9f3324a559f7fbf",
          order_number: "ORD-" + Date.now(),
          country: "SA",
          label: "Cashif for car inspection",
          environment: "PRODUCTION", // PRODUCTION, STAGE, STAGE_WITHOUT_APK
        },

        metadata: {
          name: userName,
          phone: formatedPhoneNumber,
          branch: selectedBranch,
          year: yearId,
          fy: year || null,
          plan: plan,
          model: model,
          price: total,
          service: isMertahServiceCheckedRef.current ? "مرتاح" : null,
          additionalServices: checkedAdditionalServices.join(", ") || "لايوجد",
          affiliate: affiliateRef.current || null,
          dc: appliedDiscount?.code || null,
          msh: marketerShare || null,
          cd: cookies?.userId || null,
          rv: appliedPoints || null,
          ad: address || null,
        },

        on_failure: async function (error) {
          console.log("Moyasar payment failed:", error);
        },

        on_initiating: async function () {
          console.log({
            name: userNameRef.current,
            phone: formatedPhoneNumberRef.current,
            branch: selectedBranchRef.current,
            year: yearId,
            fy: year || null,
            plan: plan,
            model: model,
            price: totalRef.current,
            service: isMertahServiceCheckedRef.current ? "مرتاح" : null,
            additionalServices: checkedAdditionalServicesRef.current.join(", ") || "لايوجد",
            affiliate: affiliateRef.current || null,
            dc: appliedDiscountRef?.current?.code || null,
            msh: marketerShareRef?.current || null,
            cd: cookies?.userId || null,
            rv: appliedPointsRef.current || null,
            ad: addressRef.current || null,
          });

          if (!cookies.username && (!firstNameRef.current || !middleNameRef.current || !lastNameRef.current || !userNameRef.current || userNameRef.current.trim().length < 6)) {
            toast.warn("الاسم الكامل مطلوب!");
            return false;
          }

          if (!formatedPhoneNumberRef.current) {
            toast.warn("رقم الجوال مطلوب!");
            return false;
          }

          if (!/^5\d{8}$/.test(formatedPhoneNumberRef.current)) {
            toast.warn("رقم الجوال غير صالح!");
            return false;
          }

          if (!selectedBranchRef.current) {
            toast.warn("حقل الفرع مطلوب!");
            return false;
          }

          if (isMertahServiceCheckedRef.current && !addressRef.current) {
            toast.warn("حقل العنوان مطلوب!");
            return false;
          }

          // Check if user accept Mertah terms
          if (isMertahServiceCheckedRef.current && !acceptMertahTermsRef.current) {
            toast.warn("يرجى الموافقة على شروط خدمة مرتاح");
            return false;
          }
          if (!addressRef.current) {
            toast.warn("حقل المدينة مطلوب!");
            return false;
          }

          // Update the data
          return {
            amount: totalRef.current * 100,
            metadata: {
              name: userNameRef.current,
              phone: formatedPhoneNumberRef.current,
              branch: selectedBranchRef.current,
              year: yearId,
              fy: year || null,
              plan: plan,
              model: model,
              price: totalRef.current,
              service: isMertahServiceCheckedRef.current ? "مرتاح" : null,
              additionalServices: checkedAdditionalServicesRef.current.join(", ") || "لايوجد",
              affiliate: affiliateRef.current || null,
              dc: appliedDiscountRef?.current?.code || null,
              msh: marketerShareRef?.current || null,
              cd: cookies?.userId || null,
              rv: appliedPointsRef.current || null,
              ad: addressRef.current || null,
            },
          };
        },
      });
    }
  }, [isFetchPricesSuccess, total, isMertahServiceChecked, languageText, isCapturePhotosAndVideosForCarChecked]);
  ///////////////////////////////////////// End Moyasar /////////////////////////////////////////

  return (
    <div className={style.container} dir={languageText === "ar" ? "rtl" : "ltr"}>
      {/* Overlay with MUI Spinner */}
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          flexDirection: "column",
          backgroundColor: "rgba(0, 0, 0, 1)",
        }}
        open={showOverlay}
      >
        {pricesFetchStatus === "fetching" && (
          <>
            <CircularProgress color="inherit" />
            <Typography dir={languageText === "ar" ? "rtl" : "ltr"} variant="h6" sx={{ mt: 2 }}>
              {t("PayPurchaseCheck.loading")}
            </Typography>
          </>
        )}

        {overlayMessage && (
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            {overlayMessage}
          </Typography>
        )}
      </Backdrop>

      {/* Box */}
      <div className={style.pay_box}>
        <h3>{t("PayPurchaseCheck.details")}</h3>

        <div className={style.details_order_table}>
          {/* نوع الفحص */}
          <div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", border: "none", padding: 0 }}>
              <p>{plan}</p>
              <p style={{ fontSize: "12px" }}>{model}</p>
            </div>
            <p style={{ display: "flex", alignItems: "center", gap: "3px", fontWeight: 700 }}>
              {Math.trunc(basePrice || 0)} <CurrencyIcon fill="#747a79" style={{ width: "20px", height: "20px" }} />
            </p>
          </div>

          {/* خدمة مرتاح */}
          <div>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isMertahServiceChecked}
                  onChange={(e) => setIsMertahServiceChecked(e.target.checked)}
                  sx={{
                    color: "primary.main",
                    padding: 0,
                    "&.Mui-checked": {
                      color: "primary.main",
                    },
                    // For RTL/LTR support
                    ...(languageText === "ar" && {
                      marginLeft: "8px",
                      marginRight: "0",
                    }),
                    ...(languageText === "en" && {
                      marginRight: "8px",
                      marginLeft: "0",
                    }),
                  }}
                />
              }
              label={<Typography variant="body1">{t("PayPurchaseCheck.mertahService")}</Typography>}
              sx={{
                margin: 0,
                width: "100%",
              }}
            />

            <p style={{ textDecoration: isMertahServiceChecked ? "none" : "line-through", display: "flex", alignItems: "center", gap: "3px", fontWeight: 700 }}>
              {mertahServicePrice} <CurrencyIcon fill="#747a79" style={{ width: "20px", height: "20px" }} />
            </p>
          </div>

          {/* تصوير السيارة (فيديو + صور) */}
          {isMertahServiceChecked && (
            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isCapturePhotosAndVideosForCarChecked}
                    onChange={(e) => setIsCapturePhotosAndVideosForCarChecked(e.target.checked)}
                    sx={{
                      color: "primary.main",
                      padding: 0,
                      "&.Mui-checked": {
                        color: "primary.main",
                      },
                      // For RTL/LTR support
                      ...(languageText === "ar" && {
                        marginLeft: "8px",
                        marginRight: "0",
                      }),
                      ...(languageText === "en" && {
                        marginRight: "8px",
                        marginLeft: "0",
                      }),
                    }}
                  />
                }
                label={<Typography variant="body1">{t("PayPurchaseCheck.capturePhotosAndVideosForCar")}</Typography>}
                sx={{
                  margin: 0,
                  width: "100%",
                }}
              />

              <p style={{ textDecoration: isCapturePhotosAndVideosForCarChecked ? "none" : "line-through", display: "flex", alignItems: "center", gap: "3px", fontWeight: 700 }}>
                {capturePhotosAndVideosForCarPrice} <CurrencyIcon fill="#747a79" style={{ width: "20px", height: "20px" }} />
              </p>
            </div>
          )}

          {/* Discount amount */}
          {!!appliedDiscount?.amount && (
            <div
              style={{
                padding: "16px 0 8px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                width: "100%",
                border: "none",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "8px 12px",
                  backgroundColor: "#e8f5e9",
                  borderRadius: "4px",
                  border: "none",
                  width: "100%",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", border: "none" }}>
                  <Typography variant="body2" color="success.main" sx={{ color: "#4caf50 !important" }}>
                    %{appliedDiscount?.value} {t("PayPurchaseCheck.discountApplied")}
                  </Typography>
                </div>

                <Typography variant="body2" fontWeight="bold" style={{ display: "flex", alignItems: "center", gap: "3px", fontWeight: 700, fontSize: "16px", color: "#4caf50" }}>
                  -{discountAmount}
                  <CurrencyIcon fill="#4caf50" style={{ width: "16px", height: "16px", marginLeft: "4px" }} />
                </Typography>
              </div>
            </div>
          )}

          {/* Applied Points Redemption */}
          {appliedPoints !== 0 && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "8px 12px",
                backgroundColor: "#e3f2fd",
                borderRadius: "4px",
                border: "none",
                width: "100%",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px", border: "none" }}>
                <Typography variant="body2" sx={{ color: "#1976d2 !important" }}>
                  {t("PayPurchaseCheck.redeem")} {appliedPoints} {t("PayPurchaseCheck.point")}
                </Typography>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Typography variant="body2" fontWeight="bold" style={{ display: "flex", alignItems: "center", gap: "3px", fontWeight: 700, fontSize: "16px", color: "#1976d2" }}>
                  -{Math.trunc(appliedPoints)}
                  <CurrencyIcon fill="#1976d2" style={{ width: "16px", height: "16px", marginLeft: "4px" }} />
                </Typography>
              </div>
            </div>
          )}

          {/* المجموع */}
          <div style={{ borderBottom: "none", paddingBottom: 0 }}>
            <p></p>
            <h4 style={{ fontWeight: "bold" }}>
              <span>{t("PayPurchaseCheck.total")}</span>
              <span style={{ fontSize: "20px" }}>{total}</span>
              <span>
                <CurrencyIcon fill="#000000de" style={{ width: "21px", height: "23px" }} />
              </span>
            </h4>
          </div>
        </div>
      </div>

      {/* Redeem/Discount Box */}

      <div className={style.discount_box}>
        {/* Discount input */}
        <div>
          <FormControl dir="ltr" sx={{ width: "100%" }} variant="outlined">
            <InputLabel htmlFor="discount-input-outlined">{t("PayPurchaseCheck.discountCode")}</InputLabel>
            <OutlinedInput
              label={t("PayPurchaseCheck.discountCode")}
              fullWidth
              id="discount-input-outlined"
              type="text"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              disabled={isApplyingDiscount || !!appliedDiscount}
              endAdornment={
                <LoadingButton
                  size="small"
                  variant="contained"
                  onClick={handleApplyDiscount}
                  loading={isApplyingDiscount}
                  disabled={!discountCode.trim() || isApplyingDiscount || !!appliedDiscount}
                  sx={{
                    minWidth: "80px",
                    height: "32px",
                    fontSize: "12px",
                  }}
                >
                  {t("PayPurchaseCheck.apply")}
                </LoadingButton>
              }
            />
            <FormHelperText dir="rtl" sx={{ margin: 0, textAlign: languageText === "ar" ? "right" : "left", marginTop: "3px", fontSize: "11px" }}>
              {t("PayPurchaseCheck.theHigherValueWillApply")}
            </FormHelperText>
          </FormControl>
        </div>

        {/* Redeem points */}
        {cookies.tokenApp && points?.points > 0 && (
          <div style={{ marginTop: "16px" }}>
            <FormControl dir="ltr" sx={{ width: "100%" }} variant="outlined">
              <InputLabel htmlFor="redeme-input-outlined">{t("PayPurchaseCheck.redeemeThePoints")}</InputLabel>
              <OutlinedInput
                label={t("PayPurchaseCheck.redeemeThePoints")}
                fullWidth
                id="redeme-input-outlined"
                type="number"
                value={redeemPoints}
                onChange={(e) => setRedeemPoints(e.target.value)}
                disabled={isApplyingPoints || !!appliedPoints}
                sx={{
                  "& input[type=number]": {
                    MozAppearance: "textfield",
                  },
                  "& input[type=number]::-webkit-outer-spin-button": {
                    WebkitAppearance: "none",
                    margin: 0,
                  },
                  "& input[type=number]::-webkit-inner-spin-button": {
                    WebkitAppearance: "none",
                    margin: 0,
                  },
                }}
                endAdornment={
                  <LoadingButton
                    size="small"
                    variant="contained"
                    onClick={handleRedeemPoints}
                    loading={isApplyingPoints}
                    disabled={!redeemPoints.trim() || isApplyingPoints || !!appliedPoints}
                    sx={{
                      minWidth: "80px",
                      height: "32px",
                      fontSize: "12px",
                    }}
                  >
                    {t("PayPurchaseCheck.apply")}
                  </LoadingButton>
                }
              />
              <FormHelperText dir="rtl" sx={{ margin: 0, textAlign: languageText === "ar" ? "right" : "left", marginTop: "3px", fontSize: "11px" }}>
                {t("PayPurchaseCheck.everyPointEqualOneRyal")}
              </FormHelperText>
            </FormControl>
          </div>
        )}

        {/* Points banner */}
        {cookies.tokenApp ? (
          <div className={style.login_box}>
            {t("PayPurchaseCheck.yourCurrentPointsBalance")} {Math.trunc(points?.points - appliedPoints || 0)} {t("PayPurchaseCheck.point")}
          </div>
        ) : (
          <div className={style.login_box}>
            {t("PayPurchaseCheck.toUsePoints")} <Link to={`${process.env.PUBLIC_URL}/login/?from=prices`}>{t("PayPurchaseCheck.login")}</Link> {t("PayPurchaseCheck.yourAccount")}
          </div>
        )}
      </div>

      {/* Name/Phone/Branch/Address */}
      <div className={style.user_data_box}>
        {/* Name */}
        {/* <FormControl fullWidth sx={{ marginBottom: "16px" }}>
          <InputLabel htmlFor="user-name">{t("PayPurchaseCheck.fullName")}</InputLabel>
          <OutlinedInput
            id="user-name"
            label={t("PayPurchaseCheck.fullName")}
            value={userName}
            onChange={handleUserNameChange}
            onBlur={handleUserNameBlur}
            placeholder={t("PayPurchaseCheck.enterTheFullName")}
            error={!!userNameError}
            sx={{
              "& .MuiOutlinedInput-input": {
                textAlign: languageText === "ar" ? "right" : "left",
              },
            }}
          />
          <FormHelperText sx={{ margin: 0, marginTop: "3px", textAlign: languageText === "ar" ? "right" : "left", color: "text.secondary" }}>
            {t("PayPurchaseCheck.nameRequiredToCompletePayment")}
          </FormHelperText>
        </FormControl> */}

        {/* Branch */}
        <FormControl fullWidth sx={{ marginBottom: "16px" }}>
          <InputLabel className={languageText === "ar" ? "custom-label-rtl" : ""} id="branch-select-label">
            {t("PayPurchaseCheck.selectTheBranch")}
          </InputLabel>
          <Select
            labelId="branch-select-label"
            id="branch-select"
            value={selectedBranch}
            label={t("PayPurchaseCheck.selectTheBranch")}
            onChange={handleBranchChange}
            sx={{
              "& .MuiSelect-icon": {
                right: languageText === "ar" ? "auto" : "14px",
                left: languageText === "ar" ? "14px" : "auto",
              },
              textAlign: languageText === "ar" ? "right" : "left",
              "& .MuiSelect-select": {
                textAlign: languageText === "ar" ? "right" : "left",
              },
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  "& .MuiMenuItem-root": {
                    textAlign: "right",
                    justifyContent: "flex-end",
                    paddingRight: "32px",
                  },
                },
              },
            }}
          >
            <MenuItem value="" disabled>
              <em>{t("PayPurchaseCheck.selectABranchOfTheExamination")}</em>
            </MenuItem>
            {branches.map((branch) => (
              <MenuItem key={branch.id} value={branch.value}>
                {branch.label}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText sx={{ margin: 0, marginTop: "3px", textAlign: languageText === "ar" ? "right" : "left", color: "text.secondary" }}>
            {t("PayPurchaseCheck.theExaminationWillBeConductedAtTheSpecifiedBranch")}
          </FormHelperText>
        </FormControl>

        {/* <h4 style={{ color: "#0009", marginBottom: "16px" }}>{t("PayPurchaseCheck.fullName")}</h4> */}

        {!cookies?.username && (
          <div style={{ display: "flex", gap: "6px" }}>
            <div>
              {/* First Name */}
              <FormControl fullWidth sx={{ marginBottom: "16px" }}>
                <InputLabel className={languageText === "ar" ? "custom-label-rtl" : ""} htmlFor="first-name">
                  {t("PayPurchaseCheck.firstName")}
                </InputLabel>
                <OutlinedInput
                  id="first-name"
                  label={t("PayPurchaseCheck.firstName")}
                  value={firstName}
                  onChange={handleFirstNameChange}
                  onBlur={handleFirstNameBlur}
                  // placeholder={t("PayPurchaseCheck.enterFirstName")}
                  error={!!firstNameError}
                  sx={{
                    "& .MuiOutlinedInput-input": {
                      textAlign: languageText === "ar" ? "right" : "left",
                    },
                  }}
                />
                <FormHelperText sx={{ margin: 0, marginTop: "3px", textAlign: languageText === "ar" ? "right" : "left", color: "text.secondary" }}>
                  {t("PayPurchaseCheck.lastNameRequired")}
                </FormHelperText>
              </FormControl>
            </div>

            <div>
              {/* Middle Name (Optional) */}
              <FormControl fullWidth sx={{ marginBottom: "16px" }}>
                <InputLabel className={languageText === "ar" ? "custom-label-rtl" : ""} htmlFor="middle-name">
                  {t("PayPurchaseCheck.middleName")}
                </InputLabel>
                <OutlinedInput
                  id="middle-name"
                  label={t("PayPurchaseCheck.middleName")}
                  value={middleName}
                  onChange={handleMiddleNameChange}
                  onBlur={handleMiddleNameBlur}
                  // placeholder={t("PayPurchaseCheck.enterMiddleName")}
                  error={!!middleNameError}
                  sx={{
                    "& .MuiOutlinedInput-input": {
                      textAlign: languageText === "ar" ? "right" : "left",
                    },
                  }}
                />
                <FormHelperText sx={{ margin: 0, marginTop: "3px", textAlign: languageText === "ar" ? "right" : "left", color: "text.secondary" }}>
                  {t("PayPurchaseCheck.lastNameRequired")}
                </FormHelperText>
              </FormControl>
            </div>

            <div>
              {/* Last Name */}
              <FormControl fullWidth sx={{ marginBottom: "16px" }}>
                <InputLabel className={languageText === "ar" ? "custom-label-rtl" : ""} htmlFor="last-name">
                  {t("PayPurchaseCheck.lastName")}
                </InputLabel>
                <OutlinedInput
                  id="last-name"
                  label={t("PayPurchaseCheck.lastName")}
                  value={lastName}
                  onChange={handleLastNameChange}
                  onBlur={handleLastNameBlur}
                  // placeholder={t("PayPurchaseCheck.enterLastName")}
                  error={!!lastNameError}
                  sx={{
                    "& .MuiOutlinedInput-input": {
                      textAlign: languageText === "ar" ? "right" : "left",
                    },
                  }}
                />
                <FormHelperText sx={{ margin: 0, marginTop: "3px", textAlign: languageText === "ar" ? "right" : "left", color: "text.secondary" }}>
                  {t("PayPurchaseCheck.lastNameRequired")}
                </FormHelperText>
              </FormControl>
            </div>
          </div>
        )}

        {/* Phone */}
        {!cookies?.phoneNumber && (
          <FormControl fullWidth sx={{ marginBottom: "16px" }}>
            <InputLabel className={languageText === "ar" ? "custom-label-rtl" : ""} htmlFor="user-phone">
              {t("PayPurchaseCheck.phoneNumber")}
            </InputLabel>
            <OutlinedInput
              onBlur={handlePhoneNumberBlur}
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              dir="ltr"
              type="tel"
              id="user-phone"
              label={t("PayPurchaseCheck.phoneNumber")}
              placeholder="05XXXXXXXX"
              inputProps={{
                maxLength: 10, // Limit to 10 characters maximum
              }}
              error={!!phoneError}
            />
            <FormHelperText sx={{ margin: 0, marginTop: "3px", textAlign: languageText === "ar" ? "right" : "left", color: "text.secondary" }}>
              {t("PayPurchaseCheck.TheNumberIsRequiredToCompleteThePayment")}
            </FormHelperText>
          </FormControl>
        )}

        {/* Address(City) */}
        <FormControl fullWidth>
          <InputLabel className={languageText === "ar" ? "custom-label-rtl" : ""} htmlFor="user-address">
            {isMertahServiceChecked ? t("PayPurchaseCheck.address") : t("PayPurchaseCheck.addressCity")}
          </InputLabel>
          <OutlinedInput
            id="user-address"
            label={isMertahServiceChecked ? t("PayPurchaseCheck.address") : t("PayPurchaseCheck.addressCity")}
            value={address}
            onChange={handleAddressChange}
            onBlur={handleAddressBlur}
            error={!!addressError}
            // placeholder={t("PayPurchaseCheck.addressPlaceholder")}
            inputProps={{
              maxLength: 200,
            }}
            required
          />

          <FormHelperText
            sx={{
              margin: 0,
              marginTop: "3px",
              textAlign: languageText === "ar" ? "right" : "left",
              color: "text.secondary",
            }}
          >
            {isMertahServiceChecked ? t("PayPurchaseCheck.addressHelperText") : t("PayPurchaseCheck.addressHelperTextCity")}
          </FormHelperText>
        </FormControl>

        {/* Accept terms of Mertah service */}
        {isMertahServiceChecked && (
          <FormControl fullWidth sx={{ marginTop: "16px" }}>
            <FormControlLabel
              control={
                <Checkbox
                  disabled={isAcceptMertahTerms}
                  checked={acceptTerms}
                  onChange={handleTermsChange}
                  sx={{
                    // color: "primary.main",
                    padding: 0,
                    "&.Mui-checked": {
                      // color: "primary.main",
                    },
                    ...(languageText === "ar" && {
                      marginLeft: "8px",
                      marginRight: "0",
                    }),
                    ...(languageText === "en" && {
                      marginRight: "8px",
                      marginLeft: "0",
                    }),
                  }}
                />
              }
              label={
                <Typography variant="body1" sx={{ color: isAcceptMertahTerms ? "#747a79" : "" }}>
                  {t("PayPurchaseCheck.termsCheckbox")}
                </Typography>
              }
              sx={{
                margin: 0,
                width: "100%",
                alignItems: "flex-start",
              }}
            />
          </FormControl>
        )}
      </div>

      {/* Payment methods (Tamara/Tabby/Moyasar) */}
      <div className={style.payment_methods_box}>
        {/* Tamara */}
        {total >= 100 && (
          <Accordion expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
              sx={{
                gap: "8px",
              }}
            >
              <Typography component="h5">
                <span style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                  <span style={{ display: "flex" }}>
                    <img src={tamaraLogo} alt="tamara" />
                  </span>
                  <span style={{ fontWeight: "700" }}>{t("PayPurchaseCheck.splitItInTo4Installments")}</span>
                </span>
                <span style={{ display: "inline-block", color: "#747a79", fontSize: "12px" }}>{t("PayPurchaseCheck.noLateFeesCompliantWithIslamicLaw")}</span>
              </Typography>
            </AccordionSummary>
            <AccordionDetails style={{ padding: "8px 0px 16px" }}>
              <LoadingButton
                style={{ boxShadow: "none", width: "100%", backgroundColor: "#6a00cb", fontWeight: "700", color: isTamaraBtnLoading ? "#6a00cb" : "#fff" }}
                variant="contained"
                size="large"
                onClick={handleClickTamaraBtn}
                loading={isTamaraBtnLoading}
                disabled={isTamaraBtnLoading}
                loadingIndicator={
                  <CircularProgress
                    size={16}
                    sx={{ color: "#fff" }} // Change spinner color here
                  />
                }
              >
                {t("PayPurchaseCheck.confirmOrder")}
              </LoadingButton>
            </AccordionDetails>
          </Accordion>
        )}

        {/* Tabby */}
        {total >= 100 && (
          <Accordion expanded={expanded === "panel2"} onChange={handleChange("panel2")}>
            <AccordionSummary
              aria-controls="panel2d-content"
              id="panel2d-header"
              sx={{
                gap: "8px",
              }}
            >
              <Typography component="h5">
                <span style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                  <span style={{ display: "flex" }}>
                    <img style={{ width: "74px" }} src={tabbyLogo} alt="Tabby" />
                  </span>
                  <span style={{ fontWeight: "700" }}>{t("PayPurchaseCheck.splitItInTo4Installments")}</span>
                </span>
                <span style={{ display: "inline-block", color: "#747a79", fontSize: "12px" }}>{t("PayPurchaseCheck.noInterestOrFees")}</span>
              </Typography>
            </AccordionSummary>

            <AccordionDetails style={{ padding: "8px 0px 16px" }}>
              <LoadingButton
                style={{ boxShadow: "none", width: "100%", backgroundColor: "#3bffc6", fontWeight: "700", color: isTabbyLoading ? "#3bffc6" : "#000000de" }}
                variant="contained"
                size="large"
                onClick={handleClickTabbyBtn}
                loading={isTabbyLoading}
                disabled={isTabbyLoading}
                loadingIndicator={
                  <CircularProgress
                    size={16}
                    sx={{ color: "#000000de" }} // Change spinner color here
                  />
                }
              >
                {t("PayPurchaseCheck.confirmOrder")}
              </LoadingButton>
            </AccordionDetails>
          </Accordion>
        )}

        {/* Moyasar */}
        <Accordion expanded={expanded === "panel3"} onChange={handleChange("panel3")}>
          <AccordionSummary
            aria-controls="panel3d-content"
            id="panel3d-header"
            sx={{
              gap: "8px",
            }}
          >
            <Typography component="h5">
              <span style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                <span style={{ fontWeight: "700" }}>{t("PayPurchaseCheck.ePayment")}</span>
              </span>
              <span style={{ display: "inline-block", color: "#747a79", fontSize: "12px" }}>{t("PayPurchaseCheck.payWithMadaMasterAndVisa")}</span>
            </Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: "8px 0px 16px" }}>
            {/* Moyasar Form */}
            <div className="mysr-form"></div>
          </AccordionDetails>
        </Accordion>
      </div>

      {/* MUI Modal for Comfort Service Terms Confirmation */}
      <Modal
        dir={languageText === "ar" ? "rtl" : "ltr"}
        open={openModal}
        onClose={handleModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "90%", sm: 500 },
              maxWidth: "90vw",
              maxHeight: "90vh",
              overflow: "auto",
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 24,
              p: 3,
              outline: "none",
            }}
          >
            <Typography
              variant="h6"
              component="h2"
              gutterBottom
              align="center"
              sx={{
                color: "#164544",
                fontWeight: "bold",
                mb: 3,
              }}
            >
              {t("PayPurchaseCheck.agreementTitle")}
            </Typography>

            <Box
              sx={{
                p: 3,
                mb: 3,
                borderRadius: 1,
                bgcolor: "#f0f1f3",
              }}
            >
              <Typography
                variant="body1"
                paragraph
                align="right"
                sx={{
                  lineHeight: 1.8,
                  fontSize: "1rem",
                  textAlign: "center",
                }}
              >
                {t("PayPurchaseCheck.liabilityClause")}
              </Typography>
              <Typography
                variant="body1"
                align="right"
                sx={{
                  lineHeight: 1.8,
                  fontSize: "1rem",
                  textAlign: "center",
                }}
              >
                {t("PayPurchaseCheck.nonRefundClause")}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
              <Button
                onClick={handleModalConfirm}
                variant="contained"
                sx={{
                  backgroundColor: "#164544",
                  width: "100%",
                  "&:hover": {
                    backgroundColor: "#0d3333",
                  },
                }}
              >
                {t("PayPurchaseCheck.agreeButton")}
              </Button>
              <Button
                onClick={handleModalClose}
                variant="outlined"
                sx={{
                  color: "#164544",
                  borderColor: "#164544",
                  width: "100%",
                  "&:hover": {
                    borderColor: "#164544",
                    backgroundColor: "rgba(22, 69, 68, 0.04)",
                  },
                }}
              >
                {t("PayPurchaseCheck.cancelButton")}
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
