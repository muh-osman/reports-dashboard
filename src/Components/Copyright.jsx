import { Link as RouterLink } from "react-router-dom";
import * as React from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

export default function Copyright(props) {
  return (
    <Typography
      dir="auto"
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link
        color="inherit"
        component={RouterLink}
        to={`${process.env.PUBLIC_URL}/`}
        onMouseOver={(e) => (e.target.style.color = "#7431fa")}
        onMouseOut={(e) => (e.target.style.color = "inherit")}
      >
        Cashif
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
