import style from "./ThanksShipping.module.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ThanksShipping() {
  // Get search params from current URL
  const searchParams = new URLSearchParams(window.location.search);
  // Get individual parameters
  const status = searchParams.get("status");
  const message = searchParams.get("message");
  const paymentId = searchParams.get("id");

  const [paySuccsess, setPaySuccsess] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "paid" && message === "APPROVED") {
      setPaySuccsess(true);
    }
  }, [status, message]);

  // Retry API request up to 5 times
  const fetchShippingPaymentId = async () => {
    const maxRetries = 5;
    const retryDelay = 3000; // 3 seconds

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`API attempt ${attempt}/${maxRetries}`);

        const response = await fetch(`https://cashif.cc/payment-system/back-end/public/api/get-shipping-payment-id-by-paymentId/${paymentId}`);

        const data = await response.json();

        console.log("API response:", data);

        if (!response.ok || !data) {
          throw new Error(data?.message || "Shipping payment not found");
        }

        // Success → redirect
        window.location.replace(`https://cashif.online/shipping-client/${data}`);

        return;
      } catch (err) {
        console.error(`API attempt ${attempt} failed:`, err);

        // If this wasn't the last attempt, wait 3s and try again
        if (attempt < maxRetries) {
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
        } else {
          // All 5 attempts failed
          setError("حدث خطأ أثناء تجهيز طلب الشحن");
        }
      }
    }
  };

  useEffect(() => {
    if (!paySuccsess || !paymentId) {
      return;
    }

    // Countdown
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    // Redirect after 5 seconds
    const redirectTimeout = setTimeout(async () => {
      fetchShippingPaymentId();
    }, 5000);

    return () => {
      clearInterval(countdownInterval);
      clearTimeout(redirectTimeout);
    };
  }, [paySuccsess, paymentId]);

  return (
    <div className={style.container}>
      {paySuccsess ? (
        <div className={style.success_box}>
          <svg xmlns="http://www.w3.org/2000/svg" width={48} height={48} fill="#1fb952" className="bi bi-check-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
            <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 1-1.06 1.06L6.97 11.03a.75.75 0 0 1 1.079-.02l3.992-4.99a.75.75 0 0 1-1.071-1.05" />
          </svg>

          <h2>تم الدفع</h2>

          {error ? <p dir="rtl">{error}</p> : <p dir="rtl">يرجى الانتظار.. سيتم تحويلك خلال {countdown} ثواني</p>}
        </div>
      ) : (
        <div className={style.error_box}>
          <svg xmlns="http://www.w3.org/2000/svg" width={48} height={48} fill="red" className="bi bi-exclamation-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
            <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
          </svg>

          <h2>خطأ في الدفع</h2>

          <Link to={`${process.env.PUBLIC_URL}/reports`}>عودة</Link>
        </div>
      )}
    </div>
  );
}
