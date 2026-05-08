import style from "./ThanksPayMojaz.module.scss";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//
import { Box, Stepper, Step, StepLabel } from "@mui/material";
//
const steps = ["بيانات المركبة", "الدفع", "تحميل التقرير"];

export default function ThanksPayMojaz() {
  // Get search params from current URL
  const searchParams = new URLSearchParams(window.location.search);
  // Get individual parameters
  const status = searchParams.get("status");
  const message = searchParams.get("message");

  const [paySuccsess, setPaySuccsess] = useState(false);
  //
  const [activeStep, setActiveStep] = useState(1);

  useEffect(() => {
    if (status === "paid" && message === "APPROVED") {
      setPaySuccsess(true);
      setActiveStep(2); // Add this
    }
  }, [status, message]);

  //
  return (
    <div className={style.container}>
      <Box className={style.card}>
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          sx={{
            direction: "rtl",
            // Target the root container
            "&.MuiStepper-alternativeLabel": {
              direction: "rtl",
            },
            // Target the connector lines specifically
            "& .MuiStepConnector-root": {
              left: "calc(50% + 20px) !important",
              right: "calc(-50% + 20px) !important",
            },
            "& .MuiStepConnector-alternativeLabel": {
              left: "calc(50% + 20px) !important",
              right: "calc(-50% + 20px) !important",
            },
            "& .MuiStepConnector-line": {
              transform: "scaleX(-1)", // Flip the line horizontally
            },
          }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      <Box className={style.card}>
        {paySuccsess ? (
          <div className={style.success_box}>
            <svg xmlns="http://www.w3.org/2000/svg" width={48} height={48} fill="#1fb952" className="bi bi-check-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
              <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
            </svg>

            <h2>تم الدفع</h2>
            <p style={{ textAlign: "center" }}>قد يستغرق إعداد التقرير 5 دقائق</p>
            <p style={{ textAlign: "center" }}>
              يمكنك تحميل التقرير من صفحة{" "}
              <span>
                <Link style={{ color: "#1976d2" }} to={`${process.env.PUBLIC_URL}/reports?tab=1`}>
                  تقاريري
                </Link>
              </span>
            </p>
          </div>
        ) : (
          <div className={style.error_box}>
            <svg xmlns="http://www.w3.org/2000/svg" width={48} height={48} fill="red" className="bi bi-exclamation-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
              <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
            </svg>

            <h2>خطأ في الدفع</h2>

            <Link style={{ color: "#1976d2", marginTop: "8px" }} to={`${process.env.PUBLIC_URL}/reports`}>
              عودة
            </Link>
          </div>
        )}
      </Box>
    </div>
  );
}
