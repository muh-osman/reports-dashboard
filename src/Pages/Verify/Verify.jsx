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
// API
import { useVerifyApi } from "../../API/useVerifyApi";
// PhoneNumberContext
import { usePhoneNumber } from "../../Contexts/PhoneNumberContext";

export default function Verify() {
  const { phoneNumber, setPhoneNumber } = usePhoneNumber();

  // handle submit
  const formRef = React.useRef();

  const { mutate, isPending } = useVerifyApi();

  const handleChange = (e) => {
    const code = e.target.value;

    // Check if code has a length of 5 characters
    if (code.length === 5) {
      const data = new FormData(formRef.current);
      // console.log(code);
      mutate(data);
    }
  };

  return !phoneNumber ? (
    <Navigate to="/" replace />
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
            color: "#00000099", // Use the secondary color from your theme
            fontSize: "0.875rem", // Adjust the font size as needed (this is equivalent to 14px)
          }}
        >
          لقد أرسلنا رسالة الى رقمك تحوي كود التحقق.
        </Typography>

        <Box
          ref={formRef}
          component="form"
          noValidate
          sx={{ minWidth: { xs: "auto", md: "396px" }, mt: 3 }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                onChange={handleChange}
                autoFocus
                fullWidth
                name="code"
                label="كود التحقق"
                type="tel"
                required
                disabled={isPending}
                InputLabelProps={{
                  className: "custom-label-rtl",
                }}
              />
            </Grid>
          </Grid>
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
          to="/"
          onMouseOver={(e) => (e.target.style.color = "#7431fa")}
          onMouseOut={(e) => (e.target.style.color = "inherit")}
        >
          لم أتلقى رمز التحقق
        </Link>
      </Typography>
    </Container>
  );
}
