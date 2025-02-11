// Mui
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
// import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LoadingButton from "@mui/lab/LoadingButton";
import Copyright from "../../Components/Copyright";
import InputAdornment from "@mui/material/InputAdornment";
// API
import { useAskCodeApi } from "../../API/useAskCodeApi";
// Toastify
import { toast } from "react-toastify";

export default function SignUp() {
  // Allow only digits (0-9) and control keys (backspace, delete, etc.)
  const handleKeyPress = (event) => {
    if (
      !/[0-9]/.test(event.key) &&
      !["Backspace", "Delete", "ArrowLeft", "ArrowRight"].includes(event.key)
    ) {
      event.preventDefault();
    }
  };

  // Handle past or type num start with 0
  const handleChange = (e) => {
    let value = e.target.value;

    // Remove leading '0' if present
    if (value.startsWith("0")) {
      value = value.slice(1);
      toast.warn("لا داعي لإدخال 0 في بداية الرقم");
    }

    // Update the input value
    e.target.value = value;
  };

  // handle submit
  const formRef = React.useRef();

  const { mutate, isPending } = useAskCodeApi();

  const handleSubmit = (e) => {
    e.preventDefault();
    // required input
    const validate = formRef.current.reportValidity();
    if (!validate) return;

    // check if phone number is 9 characters long
    const phoneNumber = e.currentTarget.elements.phoneNumber.value;

    if (
      phoneNumber.length < 9 ||
      phoneNumber.length > 9 ||
      isNaN(phoneNumber)
    ) {
      toast.warn("Enter a valid phone number");
      return;
    }

    // Prepend '0' to the phone number
    const formattedPhoneNumber = "0" + phoneNumber;

    // Submit data
    const data = new FormData(e.currentTarget);
    data.set("phoneNumber", formattedPhoneNumber); // Update the phoneNumber in FormData
    mutate(data);
  };

  return (
    <Container
      dir="rtl"
      component="main"
      maxWidth="xs"
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box>
        <Avatar
          sx={{
            margin: "auto",
            marginBottom: "8px",
            bgcolor: "#e0e0e0",
            color: "#174545",
          }}
        >
          <ExitToAppIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>
          تسجيل الدخول
        </Typography>

        <Typography
          dir="rtl"
          component="h5"
          variant="h5"
          sx={{
            textAlign: "center",
            color: "#00000099",
            fontSize: "0.875rem",
            marginTop: "9px",
            marginBottom: "32px",
          }}
        >
          للحصول على تقرير الفحص استخدم رقم الجوال المسجل في التقرير
        </Typography>

        <Box
          onSubmit={handleSubmit}
          ref={formRef}
          component="form"
          noValidate
          sx={{ mt: 3 }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} sx={{ minWidth: { xs: "auto", md: "396px" } }}>
              <TextField
                fullWidth
                label="رقم الجوال"
                name="phoneNumber"
                type="tel"
                autoFocus
                required
                dir="ltr"
                disabled={isPending}
                onKeyPress={handleKeyPress}
                onChange={handleChange}
                InputLabelProps={{
                  className: "custom-label-rtl",
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">+966</InputAdornment>
                  ),
                }}
                placeholder="5xxxxxxxx"
              />
            </Grid>
          </Grid>

          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            disableRipple
            loading={isPending}
            sx={{ mt: 3, mb: 2, transition: "0.1s" }}
          >
            متابعة
          </LoadingButton>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
