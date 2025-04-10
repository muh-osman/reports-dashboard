import style from "./Transfer.module.scss";
import { Navigate } from "react-router-dom";
// MUI
import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
//
import { toast } from "react-toastify";
// Cookies
import { useCookies } from "react-cookie";
// Api
import useGetPaymentTypesApi from "../../API/useGetPaymentTypesApi";
import useCheckIfPaymentRequestIsValidApi from "../../API/useCheckIfPaymentRequestIsValidApi";
import { useMakeTransferPaymentApi } from "../../API/useMakeTransferPaymentApi";
import useGetMarketerApi from "../../API/useGetMarketerApi";
import useGetLastPaymentApi from "../../API/useGetLastPaymentApi";

export default function Transfer() {
  React.useEffect(() => {
    // Scroll to the top of the page
    window.scrollTo(0, 0);
  }, []);
  // Cookies
  const [cookies, setCookie] = useCookies(["tokenApp", "userId"]);

  // Payment Types Data
  const { data: paymentTypes } = useGetPaymentTypesApi();
  const [selectedPaymentType, setSelectedPaymentType] = React.useState("");
  const handlePaymentTypeChange = (event) => {
    setSelectedPaymentType(event.target.value);
  };

  // Account Number
  const [accountNumber, setAccountNumber] = React.useState("");
  const handleAccountNumberChange = (event) => {
    setAccountNumber(event.target.value);
  };

  // Get Last Payment
  const { data: lastPayment, isSuccess } = useGetLastPaymentApi();
  React.useEffect(() => {
    setAccountNumber(lastPayment?.accountNumber || "");
  }, [isSuccess]);

  // Amount
  const [amount, setAmount] = React.useState(200);
  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  // Get Marketer Id
  const { data: marketerData } = useGetMarketerApi();
  // Check If Payment RequestIs Valid
  const { data: checkIfPaymentRequestIsValid } =
    useCheckIfPaymentRequestIsValidApi(marketerData?.id);

  // Handle Submit
  const { mutate, isPending } = useMakeTransferPaymentApi();
  const formRef = React.useRef();
  const handleSubmit = (e) => {
    e.preventDefault();

    // required input
    const validate = formRef.current.reportValidity();
    if (!validate) return;

    if (amount < 200 || isNaN(amount)) {
      toast.warn("الحد الأدنى لسحب الأرباح 200 ريال");
      return;
    }

    if (checkIfPaymentRequestIsValid) {
      const data = {
        // id: 0,
        marketerId: marketerData.id,
        point: +amount,
        tranferPaymentTypeId: selectedPaymentType,
        accountNumber: accountNumber,
        // actionBy: 0,
        actionDate: new Date().toISOString(),
        // rejectReason: "string",
        // status: 0,
      };

      mutate(data);
    }
  };

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
        سحب الأرباح
      </Typography>

      <Box
        onSubmit={handleSubmit}
        ref={formRef}
        component="form"
        noValidate
        sx={{ minWidth: 120, maxWidth: "400px", margin: "auto" }}
      >
        <TextField
          sx={{ backgroundColor: "#fff", marginTop: "16px" }}
          dir="rtl"
          required
          fullWidth
          select
          label="آلية الدفع"
          value={selectedPaymentType}
          onChange={handlePaymentTypeChange}
          disabled={isPending || !checkIfPaymentRequestIsValid}
        >
          {paymentTypes && paymentTypes.length > 0 ? (
            paymentTypes.map((type) => (
              <MenuItem dir="rtl" key={type.id} value={type.id}>
                {type.nameAr}
              </MenuItem>
            ))
          ) : (
            <MenuItem dir="rtl" value="">
              جاري التحميل..
            </MenuItem>
          )}
        </TextField>

        <TextField
          sx={{ backgroundColor: "#fff", marginTop: "16px" }}
          fullWidth
          label="رقم الحساب"
          type="text"
          required
          dir="ltr"
          value={accountNumber}
          onChange={handleAccountNumberChange}
          disabled={isPending || !checkIfPaymentRequestIsValid}
        />

        <TextField
          sx={{ backgroundColor: "#fff", marginTop: "16px" }}
          fullWidth
          label="المبلغ"
          type="tel"
          required
          dir="ltr"
          value={amount}
          onChange={handleAmountChange}
          disabled={isPending || !checkIfPaymentRequestIsValid}
        />

        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          disableRipple
          size="large"
          sx={{ mt: 3, mb: 2, transition: "0.1s" }}
          loading={isPending}
          disabled={!checkIfPaymentRequestIsValid}
        >
          {checkIfPaymentRequestIsValid
            ? "إرسال الطلب"
            : "يرجى انتظار الموافقة على الطلب السابق"}
        </LoadingButton>
      </Box>
    </div>
  );
}
