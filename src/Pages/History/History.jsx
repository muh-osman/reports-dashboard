import style from "./History.module.scss";
import { Navigate } from "react-router-dom";
// MUI
import Typography from "@mui/material/Typography";
// API
import useGetPaymentHistoryApi from "../../API/useGetPaymentHistoryApi";
// Cookies
import { useCookies } from "react-cookie";

export default function History() {
  const [cookies, setCookie] = useCookies(["tokenApp", "userId"]);

  // History
  const { data: paymentHistory, fetchStatus: fetchHistoryStatus } =
    useGetPaymentHistoryApi(cookies.userId);

  return !cookies.tokenApp ? (
    <Navigate to={`${process.env.PUBLIC_URL}/falak/marketer`} replace />
  ) : (
    <div dir="rtl" className={style.container}>
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
        المعاملات المالية
      </Typography>

      {/* History */}
      {paymentHistory?.length > 0 ? (
        <h1>....</h1>
      ) : (
        <Typography
          variant="h6"
          component="div"
          style={{ textAlign: "center", margin: "20px", color: "#757575" }}
        >
          {fetchHistoryStatus === "fetching"
            ? "جاري التحميل.."
            : "لا يوجد بيانات"}
        </Typography>
      )}
    </div>
  );
}
