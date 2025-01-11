// React router
import { Link as RouterLink, Navigate } from "react-router-dom";
// Mui
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import PasswordIcon from "@mui/icons-material/Password";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LoadingButton from "@mui/lab/LoadingButton";
// API
import { useVerifyApi } from "../../API/useVerifyApi";
// PhoneNumberContext
import { usePhoneNumber } from "../../Contexts/PhoneNumberContext";

export default function Verify() {
  // Add overflow: hidden to body when component mounts
  React.useEffect(() => {
    document.body.style.overflow = "hidden";

    // Cleanup function to remove the style when component unmounts
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const { phoneNumber, setPhoneNumber } = usePhoneNumber();

  // handle submit
  const formRef = React.useRef();

  const { mutate, isPending } = useVerifyApi();

  // const handleChange = (e) => {
  //   const otp = e.target.value;

  //   // Check if otp has a length of 5 characters
  //   if (otp.length === 4) {
  //     const data = new FormData(formRef.current);
  //     // Append phoneNumber to the FormData
  //     data.append("phoneNumber", phoneNumber);
  //     mutate(data);
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(formRef.current);
    // Append phoneNumber to the FormData
    data.append("phoneNumber", phoneNumber);
    mutate(data);
  };

  return !phoneNumber ? (
    <Navigate to={`${process.env.PUBLIC_URL}/`} replace />
  ) : (
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
          <PasswordIcon />
        </Avatar>
        <Typography
          dir="ltr"
          component="h1"
          variant="h5"
          sx={{ textAlign: "center" }}
        >
          {phoneNumber}
        </Typography>

        <Typography
          dir="rtl"
          component="h5"
          variant="h5"
          sx={{
            textAlign: "center",
            color: "#00000099",
            fontSize: "0.875rem",
          }}
        >
          لقد أرسلنا رسالة الى رقمك تحوي كود التحقق.
        </Typography>

        <Box
          onSubmit={handleSubmit}
          ref={formRef}
          component="form"
          noValidate
          sx={{ minWidth: { xs: "auto", md: "396px" }, mt: 3 }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                // onChange={handleChange}
                dir="ltr"
                autoFocus
                fullWidth
                name="otp"
                label="كود التحقق"
                type="number"
                required
                disabled={isPending}
                InputLabelProps={{
                  className: "custom-label-rtl",
                }}
                InputProps={{
                  classes: {
                    input: "hide-arrows", // Apply the custom class here
                  },
                }}
                // inputProps={{ maxLength: 4 }}
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
            تحقق
          </LoadingButton>
        </Box>
      </Box>

      <Typography
        sx={{ mt: 5 }}
        dir="auto"
        variant="body2"
        color="text.secondary"
        align="center"
      >
        <Link
          underline="hover"
          color="inherit"
          component={RouterLink}
          to={`${process.env.PUBLIC_URL}/`}
          onMouseOver={(e) => (e.target.style.color = "#7431fa")}
          onMouseOut={(e) => (e.target.style.color = "inherit")}
        >
          إعادة طلب رمز التحقق
        </Link>
      </Typography>
    </Container>
  );
}
