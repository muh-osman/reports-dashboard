import style from "./History.module.scss";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
// MUI
import Typography from "@mui/material/Typography";
// MUI Icons
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import DangerousIcon from "@mui/icons-material/Dangerous";
// API
import useGetPaymentHistoryApi from "../../API/useGetPaymentHistoryApi";
// Cookies
import { useCookies } from "react-cookie";
// Lang
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";

// Format date function
const formatCreatedDate = (isoDateString) => {
  const date = new Date(isoDateString);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  return date.toLocaleString("en-GB", options);
};

export default function History() {
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
  const [cookies, setCookie] = useCookies(["tokenApp", "userId"]);

  // History
  const { data: paymentHistory, fetchStatus: fetchHistoryStatus } =
    useGetPaymentHistoryApi(cookies.userId);

  return !cookies.tokenApp ? (
    <Navigate to={`${process.env.PUBLIC_URL}/falak/marketer`} replace />
  ) : (
    <div
      dir={languageText === "ar" ? "rtl" : "ltr"}
      className={style.container}
    >
      <Typography
        variant="h6"
        component="div"
        style={{
          textAlign: "center",
          margin: "20px",
          marginTop: "8px",
          marginBottom: "24px",
          fontSize: "32px",
          fontWeight: "bold",
        }}
      >
        {t("History.financialTransactions")}
      </Typography>

      {/* History */}
      {paymentHistory?.length > 0 ? (
        paymentHistory
          .slice()
          .reverse()
          .map((payment) => (
            <div className={style.card_box} key={payment.id}>
              <div>
                <span>
                  <AccountBalanceWalletIcon />
                </span>
                <span>
                  {payment.point} {t("History.riyal")}
                </span>
              </div>
              <div
                style={{
                  color: payment?.status === "Accept" ? "#4caf50" : "#ff9800",
                }}
              >
                <span>
                  <CheckCircleIcon />
                </span>
                <span>{payment.status}</span>
              </div>
              {payment?.rejectReason && (
                <div style={{ color: "#d32f2f" }}>
                  <span>
                    <DangerousIcon />
                  </span>
                  <span>{payment?.rejectReason}</span>
                </div>
              )}
              <div>
                <span>
                  <CreditCardIcon />
                </span>
                <span>
                  {/* {payment.tranferPaymentTypeNameAr} */}
                  {languageText === "ar"
                    ? payment.tranferPaymentTypeNameAr
                    : payment.tranferPaymentTypeNameEn}
                </span>
              </div>
              <div>
                <span>
                  <AccountBalanceIcon />
                </span>
                <span>{payment.accountNumber}</span>
              </div>
              <div>
                <span>
                  <AccessTimeIcon />
                </span>
                <span dir="ltr">{formatCreatedDate(payment?.createdDate)}</span>
              </div>
            </div>
          ))
      ) : (
        <Typography
          variant="h6"
          component="div"
          style={{ textAlign: "center", margin: "20px", color: "#757575" }}
        >
          {fetchHistoryStatus === "fetching"
            ? t("History.loading")
            : t("History.noData")}
        </Typography>
      )}
    </div>
  );
}
