import style from "./Transfer.module.scss";
import { Navigate } from "react-router-dom";
// MUI
import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
// Lang
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";
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
  //
  const { t } = useTranslation();
  const [languageText, setLanguageText] = React.useState(i18n.language);
  // Add language change listener
  React.useEffect(() => {
    const handleLanguageChange = (lng) => {
      setLanguageText(lng);
    };

    i18n.on("languageChanged", handleLanguageChange);

    // Cleanup function to remove the listener when component unmounts
    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
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
    if (isSuccess) {
      setAccountNumber(lastPayment?.accountNumber || "");
    }
  }, [isSuccess]);

  // Amount
  const [amount, setAmount] = React.useState(0);
  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  // Get Marketer Id
  const { data: marketerData, isSuccess: isGetMarketerDataSuccess } =
    useGetMarketerApi();

  React.useEffect(() => {
    if (isGetMarketerDataSuccess) {
      setAmount(marketerData?.points || 0);
    }
  }, [isGetMarketerDataSuccess]);

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
      toast.warn(t("Transfer.minimumWithdrawalAmountIs200Riyals"));
      return;
    }

    if (amount > marketerData.points) {
      toast.warn(
        t("Transfer.theAmountEnteredIsGreaterThanAvailableBalanceInYourAccount")
      );
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
        actionDate: null,
        // rejectReason: "string",
        // status: 0,
      };

      mutate(data);
    }
  };

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
        {t("Transfer.withdrawProfits")}
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
          dir={languageText === "ar" ? "rtl" : "ltr"}
          required
          fullWidth
          select
          label={t("Transfer.paymentMechanism")}
          value={selectedPaymentType}
          onChange={handlePaymentTypeChange}
          disabled={isPending || !checkIfPaymentRequestIsValid}
        >
          {paymentTypes && paymentTypes.length > 0 ? (
            paymentTypes.map((type) => (
              <MenuItem
                dir={languageText === "ar" ? "rtl" : "ltr"}
                key={type.id}
                value={type.id}
              >
                {/* {type.nameAr} */}
                {languageText === "ar" ? type.nameAr : type.nameEn}
              </MenuItem>
            ))
          ) : (
            <MenuItem dir={languageText === "ar" ? "rtl" : "ltr"} value="">
              {t("Transfer.loading")}
            </MenuItem>
          )}
        </TextField>

        <TextField
          sx={{ backgroundColor: "#fff", marginTop: "16px" }}
          fullWidth
          label={t("Transfer.accountNumber")}
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
          label={t("Transfer.amount")}
          type="tel"
          required
          dir="ltr"
          value={amount}
          onChange={handleAmountChange}
          disabled={isPending || !checkIfPaymentRequestIsValid}
        />
        <p
          dir="rtl"
          style={{
            color: "#00000099",
            fontSize: "15px",
            marginRight: "3px",
            marginTop: "9px",
          }}
        >
          {t("Transfer.availableBalanceForWithdrawal")} {marketerData?.points}{" "}
          {t("Transfer.riyal")}
        </p>

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
            ? t("Transfer.submitApplication")
            : t("Transfer.pleaseWaitForApprovalOfThePreviousRequest")}
        </LoadingButton>
      </Box>
    </div>
  );
}
