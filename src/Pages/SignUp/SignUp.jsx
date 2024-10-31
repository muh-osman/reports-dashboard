// React router
// import { Link as RouterLink } from "react-router-dom";
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

    // Submit data
    const data = new FormData(e.currentTarget);
    // console.log(data.get("phoneNumber"));
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
                InputLabelProps={{
                  className: "custom-label-rtl",
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">+966</InputAdornment>
                  ),
                }}
                inputProps={{ maxLength: 9 }}
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
