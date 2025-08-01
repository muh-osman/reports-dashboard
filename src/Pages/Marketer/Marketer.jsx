import style from "./Marketer.module.scss";
import { Navigate, Link, useNavigate } from "react-router-dom";
// Cookies
import { useCookies } from "react-cookie";
// MUI
import * as React from "react";
import Button from "@mui/material/Button";
import { Box, CircularProgress } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import Divider from "@mui/material/Divider";
import InfoIcon from "@mui/icons-material/Info";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import GavelIcon from "@mui/icons-material/Gavel";
import WorkIcon from "@mui/icons-material/Work";
import Modal from "@mui/material/Modal";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
//
import { toast } from "react-toastify";
// Image
import userImg from "../../Assets/Images/user.jpg";
// Api
import useGetMarketerApi from "../../API/useGetMarketerApi";
import useMarketerSettingsApi from "../../API/useMarketerSettingsApi";
import { useCreateMarketerApi } from "../../API/useCreateMarketerApi";
// Component
import CouponImages from "../../Components/CouponImages";
import InfoAboutCashif from "../../Components/InfoAboutCashif";
import HowWorks from "../../Components/HowWorks";
import InstructionsBeforePublishingContent from "../../Components/InstructionsBeforePublishingContent";
// NumberFlow
import NumberFlow from "@number-flow/react";
// Lang
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";

export default function Marketer() {
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
  //
  const navigate = useNavigate();
  //
  React.useEffect(() => {
    // Scroll to the top of the page
    window.scrollTo(0, 0);
  }, []);
  // Cookies
  const [cookies, setCookie] = useCookies(["tokenApp", "userId"]);

  // Tabs system
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // info icon
  // Controll the positin of drop down menue
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // condetion And Terms Modal
  const [openCondetionAndTermsModal, setOpenCondetionAndTermsModal] =
    React.useState(false);
  const handleCondetionAndTermsModalOpen = () =>
    setOpenCondetionAndTermsModal(true);
  const handleCondetionAndTermsModalClose = () =>
    setOpenCondetionAndTermsModal(false);

  // Marketer Data
  const { data: marketerData, isError: isGetMarketerError } =
    useGetMarketerApi();
  const { data: MarketerSettings } = useMarketerSettingsApi();
  // console.log(marketerData);

  // Create Marketer if Get Marketer Faild
  const { mutate: createMarketer } = useCreateMarketerApi();

  React.useEffect(() => {
    if (isGetMarketerError) {
      const data = {
        // id: 0,
        // code: randomCode,
        // points: 0,
        clientId: cookies.userId,
        // cardCountFromSite: 0,
        isActive: true,
      };
      createMarketer(data);
    }
  }, [isGetMarketerError]);

  // If pageOne cookie is Not set, navigate to falak page
  if (!cookies[`pageOne-${cookies.userId}`] && cookies.tokenApp) {
    return <Navigate to={`${process.env.PUBLIC_URL}/falak`} />;
  }
  // If pageTwo cookie is Not set, navigate to conditions page
  if (!cookies[`pageTwo-${cookies.userId}`] && cookies.tokenApp) {
    return <Navigate to={`${process.env.PUBLIC_URL}/falak/conditions`} />;
  }
  // If pageThree cookie is Not set, navigate to how-works page
  if (!cookies[`pageThree-${cookies.userId}`] && cookies.tokenApp) {
    return <Navigate to={`${process.env.PUBLIC_URL}/falak/how-works`} />;
  }

  // Handel Transfer Button
  const transfer = () => {
    if (marketerData?.points >= 200) {
      navigate(`${process.env.PUBLIC_URL}/falak/transfer`);
    } else {
      toast.warn(t("Marketer.minimumWithdrawalAmountIs200Riyals"));
    }
  };

  // Render component based on selected tab
  const renderTabContent = () => {
    switch (value) {
      case 0:
        return <InfoAboutCashif />;
      case 1:
        return (
          <CouponImages
            code={marketerData?.code || "-"}
            percent={MarketerSettings?.codeDiscountPercentage || 0}
          />
        );
      case 2:
        return <HowWorks />;
      case 3:
        return <InstructionsBeforePublishingContent />;

      default:
        return <InfoAboutCashif />;
    }
  };

  return (
    <div
      dir={languageText === "ar" ? "rtl" : "ltr"}
      className={style.container}
    >
      {!cookies.tokenApp ? (
        <div className={style.not_auth_container}>
          <div className={style.not_auth_box}>
            <div>
              <div className={style.not_auth_img}>
                <svg
                  style={{ width: "100px", fill: "#174545" }}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                >
                  <path d="M323.4 85.2l-96.8 78.4c-16.1 13-19.2 36.4-7 53.1c12.9 17.8 38 21.3 55.3 7.8l99.3-77.2c7-5.4 17-4.2 22.5 2.8s4.2 17-2.8 22.5l-20.9 16.2L512 316.8 512 128l-.7 0-3.9-2.5L434.8 79c-15.3-9.8-33.2-15-51.4-15c-21.8 0-43 7.5-60 21.2zm22.8 124.4l-51.7 40.2C263 274.4 217.3 268 193.7 235.6c-22.2-30.5-16.6-73.1 12.7-96.8l83.2-67.3c-11.6-4.9-24.1-7.4-36.8-7.4C234 64 215.7 69.6 200 80l-72 48 0 224 28.2 0 91.4 83.4c19.6 17.9 49.9 16.5 67.8-3.1c5.5-6.1 9.2-13.2 11.1-20.6l17 15.6c19.5 17.9 49.9 16.6 67.8-2.9c4.5-4.9 7.8-10.6 9.9-16.5c19.4 13 45.8 10.3 62.1-7.5c17.9-19.5 16.6-49.9-2.9-67.8l-134.2-123zM16 128c-8.8 0-16 7.2-16 16L0 352c0 17.7 14.3 32 32 32l32 0c17.7 0 32-14.3 32-32l0-224-80 0zM48 320a16 16 0 1 1 0 32 16 16 0 1 1 0-32zM544 128l0 224c0 17.7 14.3 32 32 32l32 0c17.7 0 32-14.3 32-32l0-208c0-8.8-7.2-16-16-16l-80 0zm32 208a16 16 0 1 1 32 0 16 16 0 1 1 -32 0z" />
                </svg>
              </div>
              <h1>{t("Marketer.title")}</h1>
              <p>{t("Marketer.subTitleOne")}</p>
              <p>{t("Marketer.subTitleTwo")}</p>
              <p>
                {t("Marketer.subTitleThree")}{" "}
                <span style={{ fontWeight: "bold" }}>
                  {t("Marketer.subTitleFour")}
                </span>
              </p>
            </div>

            <Button
              fullWidth
              sx={{ marginTop: "30px" }}
              variant="contained"
              component={Link}
              size="large"
              to={`${process.env.PUBLIC_URL}/login`}
            >
              {t("Marketer.joinNow")}
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className={style.main_container}>
            <div className={style.money_card_container}>
              <div className={style.money_card_header}>
                <div>
                  <p>{t("Marketer.currentBalance")}</p>
                  <h1 dir="rtl">
                    {/* {marketerData?.points || 0}{" "} */}
                    <NumberFlow
                      value={marketerData?.points || 0}
                      duration={1500}
                      delay={0}
                      ease="outExpo"
                      formattingFn={(value) =>
                        Math.floor(value).toLocaleString()
                      }
                    />{" "}
                    <span className={style.rial}>
                      <svg
                        data-name="Layer 1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1124.14 1256.39"
                      >
                        <defs></defs>
                        <path d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z"></path>
                        <path d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z"></path>
                      </svg>
                    </span>
                  </h1>
                </div>

                <div>
                  <Box position="relative" display="inline-flex">
                    <CircularProgress
                      variant="determinate"
                      value={100}
                      size={100}
                      thickness={6}
                      sx={{
                        color: "#3887d5",
                        position: "absolute",
                      }}
                    />
                    <CircularProgress
                      variant="determinate"
                      value={Math.min((marketerData?.points / 200) * 100, 100)}
                      size={100}
                      thickness={6}
                      sx={{
                        color: "#fff",
                        borderRadius: "10px",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <TrendingUpIcon
                        style={{
                          fontSize: 35,
                          color: "#fff",
                          verticalAlign: "middle",
                        }}
                      />
                    </div>
                  </Box>
                </div>
              </div>

              <div className={style.money_card_footer}>
                <h3>
                  {t("Marketer.commissionRate")}{" "}
                  {MarketerSettings?.marketerCommissionPercentage || 0}%
                </h3>
                <h3 style={{ backgroundColor: "#3887d5", color: "#fff" }}>
                  {t("Marketer.discountRate")}{" "}
                  {MarketerSettings?.codeDiscountPercentage || 0}%
                </h3>
              </div>
            </div>

            <div className={style.person_card_container}>
              <Tooltip
                title={t("Marketer.more")}
                className={style.infoIcon}
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <IconButton>
                  <InfoIcon />
                </IconButton>
              </Tooltip>

              <Popover
                dir={languageText === "ar" ? "rtl" : "ltr"}
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: isSmallScreen ? "center" : "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: isSmallScreen ? "center" : "right",
                }}
                disableScrollLock={false}
              >
                <Paper sx={{ maxWidth: "100%" }}>
                  <MenuList>
                    <MenuItem onClick={handleCondetionAndTermsModalOpen}>
                      <ListItemIcon>
                        <GavelIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>
                        {t("Marketer.termsAndConditions")}
                      </ListItemText>
                    </MenuItem>
                  </MenuList>
                </Paper>
              </Popover>

              {/* Condetion And Terms Modal */}
              <Modal
                open={openCondetionAndTermsModal}
                onClose={handleCondetionAndTermsModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                dir={languageText === "ar" ? "rtl" : "ltr"}
              >
                <Box
                  dir={languageText === "ar" ? "rtl" : "ltr"}
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: {
                      xs: 361, // width for small screens
                      md: 750, // width for medium and larger screens
                    },
                    bgcolor: "background.paper",
                    p: {
                      xs: 2,
                      md: 4,
                    },
                    textAlign: "center",
                    borderRadius: "16px",
                    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#fff",
                    maxHeight: "80vh", // Set a maximum height for the modal
                    overflowY: "auto", // Enable vertical scrolling
                    overflowX: "hidden", // Prevent horizontal scrolling
                  }}
                >
                  <div
                    className={style.terms_box}
                    style={
                      languageText === "ar"
                        ? { textAlign: "right" }
                        : { textAlign: "left" }
                    }
                  >
                    <div>
                      <h1>{t("Conditions.termsAndConditions")}:</h1>
                      <p>{t("Conditions.termsHeader")}</p>

                      <h6>{t("Conditions.definitions")}</h6>
                      <div>
                        <ul
                          style={
                            languageText === "ar"
                              ? { paddingRight: 16 }
                              : { paddingLeft: 16 }
                          }
                        >
                          <li>{t("Conditions.definitionsA")}</li>
                          <li>{t("Conditions.definitionsB")}</li>
                          <li>{t("Conditions.definitionsC")}</li>
                          <li>{t("Conditions.definitionsD")}</li>
                        </ul>
                      </div>

                      <h6>{t("Conditions.registrationTerms")}</h6>
                      <div>
                        <ul
                          style={
                            languageText === "ar"
                              ? { paddingRight: 16 }
                              : { paddingLeft: 16 }
                          }
                        >
                          <li>{t("Conditions.registrationTermsA")}</li>
                          <li>{t("Conditions.registrationTermsB")}</li>
                          <li>{t("Conditions.registrationTermsC")}</li>
                          <li>{t("Conditions.registrationTermsD")}</li>
                          <li>{t("Conditions.registrationTermsE")}</li>
                          <li>{t("Conditions.registrationTermsF")}</li>
                          <li>{t("Conditions.registrationTermsG")}</li>
                        </ul>
                      </div>

                      <h6>{t("Conditions.mechanismOfAction")}</h6>
                      <div>
                        <ul
                          style={
                            languageText === "ar"
                              ? { paddingRight: 16 }
                              : { paddingLeft: 16 }
                          }
                        >
                          <li>{t("Conditions.mechanismOfActionA")}</li>
                          <li>{t("Conditions.mechanismOfActionB")}</li>
                          <li>{t("Conditions.mechanismOfActionC")}</li>
                          <li>{t("Conditions.mechanismOfActionD")}</li>
                          <li>{t("Conditions.mechanismOfActionE")}</li>
                          <li>{t("Conditions.mechanismOfActionF")}</li>
                          <li>{t("Conditions.mechanismOfActionG")}</li>
                        </ul>
                      </div>

                      <h6>{t("Conditions.payment")}</h6>
                      <div>
                        <ul
                          style={
                            languageText === "ar"
                              ? { paddingRight: 16 }
                              : { paddingLeft: 16 }
                          }
                        >
                          <li>{t("Conditions.paymentA")}</li>
                          <li>{t("Conditions.paymentB")}</li>
                          <li>{t("Conditions.paymentC")}</li>
                          <li>{t("Conditions.paymentD")}</li>
                          <li>{t("Conditions.paymentE")}</li>
                        </ul>
                      </div>

                      <h6>{t("Conditions.marketerObligations")}</h6>
                      <div>
                        <ul
                          style={
                            languageText === "ar"
                              ? { paddingRight: 16 }
                              : { paddingLeft: 16 }
                          }
                        >
                          <li>{t("Conditions.marketerObligationsA")}</li>
                          <li>{t("Conditions.marketerObligationsB")}</li>
                          <li>{t("Conditions.marketerObligationsC")}</li>
                          <li>{t("Conditions.marketerObligationsD")}</li>
                        </ul>
                      </div>

                      <h6>{t("Conditions.companyObligations")}</h6>
                      <div>
                        <ul
                          style={
                            languageText === "ar"
                              ? { paddingRight: 16 }
                              : { paddingLeft: 16 }
                          }
                        >
                          <li>{t("Conditions.companyObligationsA")}</li>
                          <li>{t("Conditions.companyObligationsB")}</li>
                          <li>{t("Conditions.companyObligationsC")}</li>
                        </ul>
                      </div>

                      <h6>{t("Conditions.cancellation")}</h6>
                      <div>
                        <ul
                          style={
                            languageText === "ar"
                              ? { paddingRight: 16 }
                              : { paddingLeft: 16 }
                          }
                        >
                          <li>{t("Conditions.cancellationA")}</li>
                          <li>{t("Conditions.cancellationB")}</li>
                          <li>{t("Conditions.cancellationC")}</li>
                          <li>{t("Conditions.cancellationD")}</li>
                        </ul>
                      </div>

                      <h6>{t("Conditions.modifications")}</h6>
                      <div>
                        <ul
                          style={
                            languageText === "ar"
                              ? { paddingRight: 16 }
                              : { paddingLeft: 16 }
                          }
                        >
                          <li>{t("Conditions.modificationsA")}</li>
                          <li>{t("Conditions.modificationsB")}</li>
                        </ul>
                      </div>

                      <h6>{t("Conditions.applicableLaws")}</h6>
                      <div>
                        <ul
                          style={
                            languageText === "ar"
                              ? { paddingRight: 16 }
                              : { paddingLeft: 16 }
                          }
                        >
                          <li>{t("Conditions.applicableLawsA")}</li>
                          <li>{t("Conditions.applicableLawsB")}</li>
                        </ul>
                      </div>

                      <h6>{t("Conditions.disclaimer")}</h6>
                      <p>{t("Conditions.disclaimerA")}</p>
                    </div>

                    <div>
                      <FormControlLabel
                        control={
                          <Checkbox required checked={true} disabled={true} />
                        }
                        label={t("Conditions.label")}
                      />
                    </div>

                    <Button
                      fullWidth
                      sx={{ marginTop: "30px" }}
                      variant="contained"
                      size="large"
                      disabled={true}
                    >
                      {t("Conditions.ok")}
                    </Button>
                  </div>
                </Box>
              </Modal>

              <div style={{ width: "100%" }}>
                <h1 dir="ltr">{marketerData?.clientName}</h1>
                <p dir="ltr">{marketerData?.phoneNumber}</p>

                <div className={style.person_data_box}>
                  <div>
                    <p>{t("Marketer.useTheCode")}</p>
                    <h3>{marketerData?.cardCount || 0}</h3>
                  </div>

                  <div>
                    <p>{t("Marketer.status")}</p>
                    <h3
                      style={{
                        color: marketerData?.isActive ? "#25d366" : "#d32f2f",
                      }}
                    >
                      {marketerData?.isActive
                        ? t("Marketer.active")
                        : t("Marketer.inactive")}
                    </h3>
                  </div>

                  <div>
                    <p>{t("Marketer.marketingCode")}</p>
                    <h3>{marketerData?.code || "-"}</h3>
                  </div>
                </div>

                <div className={style.button_box}>
                  <Button
                    fullWidth
                    sx={{ width: "50%" }}
                    variant="contained"
                    onClick={transfer}
                  >
                    {t("Marketer.withdrawProfits")}
                  </Button>

                  <Button
                    fullWidth
                    sx={{ width: "50%" }}
                    variant="outlined"
                    component={Link}
                    to={`${process.env.PUBLIC_URL}/falak/history`}
                  >
                    {t("Marketer.history")}
                  </Button>
                </div>
              </div>

              <div className={style.person_img_box}>
                <img src={userImg} alt="user" />
              </div>
            </div>
          </div>

          {/* Tabs */}
          <h5 className={style.last_reports_title}>
            {t("Marketer.marketerBag")}
          </h5>
          <Divider sx={{ marginBottom: "18px" }} />

          <Box
            sx={{
              width: "100%",
              bgcolor: "#fff",
              color: "#174545",
              borderRadius: "9px",
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              centered
              variant="fullWidth"
              sx={{
                marginBottom: "16px",
                "& .MuiTabs-indicator": {
                  backgroundColor: "#f0f1f3",
                  border: "4px solid #fff",
                  borderRadius: "9px",
                  height: "100%",
                },
              }}
            >
              <Tab
                disableRipple
                label={t("Marketer.InfoAboutCashif")}
                sx={{
                  color: "#174545",
                  minWidth: "69px",
                  "&.Mui-selected": {
                    backgroundColor: "transparent",
                    color: "#174545", // Optional: Change text color when selected
                    zIndex: 1,
                  },
                }}
              />
              <Tab
                disableRipple
                label={t("Marketer.visualContent")}
                sx={{
                  color: "#174545",
                  minWidth: "69px",
                  "&.Mui-selected": {
                    backgroundColor: "transparent",
                    color: "#174545",
                    zIndex: 1,
                  },
                }}
              />
              <Tab
                disableRipple
                label={t("Marketer.howWorks")}
                sx={{
                  color: "#174545",
                  minWidth: "69px",
                  "&.Mui-selected": {
                    backgroundColor: "transparent",
                    color: "#174545", // Optional: Change text color when selected
                    zIndex: 1,
                  },
                }}
              />
              <Tab
                disableRipple
                label={t("Marketer.InstructionsBeforePublishing")}
                sx={{
                  color: "#174545",
                  minWidth: "69px",
                  "&.Mui-selected": {
                    backgroundColor: "transparent",
                    color: "#174545", // Optional: Change text color when selected
                    zIndex: 1,
                  },
                }}
              />
            </Tabs>
          </Box>

          {/* Render the appropriate component based on the selected tab */}
          {renderTabContent()}
        </>
      )}
    </div>
  );
}
