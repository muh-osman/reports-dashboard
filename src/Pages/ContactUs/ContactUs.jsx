import style from "./ContactUs.module.scss";
// MUI
import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import EmailIcon from "@mui/icons-material/Email";
import { Box, Typography } from "@mui/material";
import CardContent from "@mui/material/CardContent";
// Lang
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";
// Images
import alqadisia from "../../Assets/Images/alqadisia.jpg";
import alshifa from "../../Assets/Images/alshifa.jpg";
import damam from "../../Assets/Images/damam.jpg";
import jeddah from "../../Assets/Images/jeddah.jpg";

export default function ContactUs() {
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

  return (
    <div dir="rtl" className={style.container}>
      <h1
        style={{ textAlign: "center", marginTop: "16px", marginBottom: "32px" }}
      >
        {t("ContactUs.ourBranches")}
      </h1>
      <Box
        dir={languageText === "ar" ? "rtl" : "ltr"}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 5,
        }}
      >
        <Card
          sx={{
            maxWidth: { xs: "100%", sm: 345 },
            width: "100%",
            borderRadius: "9px",
            boxShadow: "none",
          }}
        >
          <CardMedia
            component="img"
            height="194"
            image={alqadisia}
            alt="كاشف لفحص السيارات"
          />
          <CardContent sx={{ paddingBottom: "0px" }}>
            <Typography variant="h5" component="div">
              {t("ContactUs.RiyadhAlQadisiyah")}
            </Typography>
          </CardContent>

          <CardActions disableSpacing>
            <IconButton
              aria-label="الموقع"
              href="https://maps.app.goo.gl/MiFGsgakfo62on7u8"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LocationOnIcon />
            </IconButton>

            <IconButton aria-label="جوال" href="mailto:info@cashif.cc">
              <EmailIcon />
            </IconButton>
            <Typography
              variant="body2"
              sx={{
                marginLeft: languageText === "ar" ? 1 : 0,
                marginRight: languageText === "ar" ? 0 : 1,
              }}
            >
              info@cashif.cc
            </Typography>

            <IconButton aria-label="جوال" href="tel:920019948">
              <PhoneIphoneIcon />
            </IconButton>
            <Typography
              variant="body2"
              sx={{
                marginLeft: languageText === "ar" ? 1 : 0,
                marginRight: languageText === "ar" ? 0 : 1,
              }}
            >
              920019948
            </Typography>
          </CardActions>
        </Card>

        <Card
          sx={{
            maxWidth: { xs: "100%", sm: 345 },
            width: "100%",
            borderRadius: "9px",
            boxShadow: "none",
          }}
        >
          <CardMedia
            component="img"
            height="194"
            image={alshifa}
            alt="كاشف لفحص السيارات"
          />

          <CardContent sx={{ paddingBottom: "0px" }}>
            <Typography variant="h5" component="div">
              {t("ContactUs.RiyadhAlShifa")}
            </Typography>
          </CardContent>

          <CardActions disableSpacing>
            <IconButton
              aria-label="الموقع"
              href="https://maps.app.goo.gl/pXCnG7RPXJ2CDLqe7?g_st=aw"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LocationOnIcon />
            </IconButton>

            <IconButton aria-label="جوال" href="mailto:info@cashif.cc">
              <EmailIcon />
            </IconButton>
            <Typography
              variant="body2"
              sx={{
                marginLeft: languageText === "ar" ? 1 : 0,
                marginRight: languageText === "ar" ? 0 : 1,
              }}
            >
              info@cashif.cc
            </Typography>

            <IconButton aria-label="جوال" href="tel:920019948">
              <PhoneIphoneIcon />
            </IconButton>
            <Typography
              variant="body2"
              sx={{
                marginLeft: languageText === "ar" ? 1 : 0,
                marginRight: languageText === "ar" ? 0 : 1,
              }}
            >
              920019948
            </Typography>
          </CardActions>
        </Card>

        <Card
          sx={{
            maxWidth: { xs: "100%", sm: 345 },
            width: "100%",
            borderRadius: "9px",
            boxShadow: "none",
          }}
        >
          <CardMedia
            component="img"
            height="194"
            image={damam}
            alt="كاشف لفحص السيارات"
          />

          <CardContent sx={{ paddingBottom: "0px" }}>
            <Typography variant="h5" component="div">
              {t("ContactUs.Dammam")}
            </Typography>
          </CardContent>

          <CardActions disableSpacing>
            <IconButton
              aria-label="الموقع"
              href="https://maps.app.goo.gl/9UiHq4kW7Mjh1Aik8"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LocationOnIcon />
            </IconButton>

            <IconButton aria-label="جوال" href="mailto:info@cashif.cc">
              <EmailIcon />
            </IconButton>
            <Typography
              variant="body2"
              sx={{
                marginLeft: languageText === "ar" ? 1 : 0,
                marginRight: languageText === "ar" ? 0 : 1,
              }}
            >
              info@cashif.cc
            </Typography>

            <IconButton aria-label="جوال" href="tel:920019948">
              <PhoneIphoneIcon />
            </IconButton>
            <Typography
              variant="body2"
              sx={{
                marginLeft: languageText === "ar" ? 1 : 0,
                marginRight: languageText === "ar" ? 0 : 1,
              }}
            >
              920019948
            </Typography>
          </CardActions>
        </Card>

        <Card
          sx={{
            maxWidth: { xs: "100%", sm: 345 },
            width: "100%",
            borderRadius: "9px",
            boxShadow: "none",
          }}
        >
          <CardMedia
            component="img"
            height="194"
            image={jeddah}
            alt="كاشف لفحص السيارات"
          />

          <CardContent sx={{ paddingBottom: "0px" }}>
            <Typography variant="h5" component="div">
              {t("ContactUs.Jeddah")}
            </Typography>
          </CardContent>

          <CardActions disableSpacing>
            <IconButton
              aria-label="الموقع"
              href="https://maps.app.goo.gl/697yXkaS4o6kYsos8"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LocationOnIcon />
            </IconButton>

            <IconButton aria-label="جوال" href="mailto:info@cashif.cc">
              <EmailIcon />
            </IconButton>
            <Typography
              variant="body2"
              sx={{
                marginLeft: languageText === "ar" ? 1 : 0,
                marginRight: languageText === "ar" ? 0 : 1,
              }}
            >
              info@cashif.cc
            </Typography>

            <IconButton aria-label="جوال" href="tel:920019948">
              <PhoneIphoneIcon />
            </IconButton>
            <Typography
              variant="body2"
              sx={{
                marginLeft: languageText === "ar" ? 1 : 0,
                marginRight: languageText === "ar" ? 0 : 1,
              }}
            >
              920019948
            </Typography>
          </CardActions>
        </Card>
      </Box>
    </div>
  );
}
