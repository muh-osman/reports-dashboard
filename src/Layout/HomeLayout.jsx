import style from "./HomeLayout.module.scss";

import * as React from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
// MUI Icons
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LogoutIcon from "@mui/icons-material/Logout";
import PhoneIcon from "@mui/icons-material/Phone";
import TranslateIcon from "@mui/icons-material/Translate";
import LoginIcon from "@mui/icons-material/Login";
//
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Popover from "@mui/material/Popover";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
// Logo
import logo from "../Assets/Images/logo.png";
// Cookies
import { useCookies } from "react-cookie";

function HomeLayout() {
  // Controll the positin of drop down menue
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  //
  const navigate = useNavigate();
  const location = useLocation();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Logout
  const [cookies, setCookie, removeCookie] = useCookies([
    "token",
    "username",
    "userId",
    "phoneNumber",
  ]);

  const logout = () => {
    handleClose();
    removeCookie("userId", { path: "/dashboard" });
    removeCookie("phoneNumber", { path: "/dashboard" });
    removeCookie("username", { path: "/dashboard" });
    removeCookie("token", { path: "/dashboard" });

    navigate(`${process.env.PUBLIC_URL}/home`);
  };
  const login = () => {
    handleClose();
    navigate(`${process.env.PUBLIC_URL}/login`);
  };

  const listRefs = React.useRef([]);
  const contact = () => {
    handleClose();
    listRefs.current.forEach((item) => item.classList.remove("act"));
    navigate(`${process.env.PUBLIC_URL}/contact`);
  };

  // Mobile Navbar add active class
  const indicat = React.useRef(null);
  const activeLink = (index) => {
    // Remove 'act' class from all items
    listRefs.current.forEach((item) => item.classList.remove("act"));
    // Add 'act' class to the clicked item
    listRefs.current[index].classList.add("act");
  };

  // Set active class based on current path
  React.useEffect(() => {
    const paths = [
      `${process.env.PUBLIC_URL}/booking`,
      `${process.env.PUBLIC_URL}/reports`,
      `${process.env.PUBLIC_URL}/`,
      `${process.env.PUBLIC_URL}/prices`,
      `${process.env.PUBLIC_URL}/falak`,
    ];

    // Check if the current path is not in the list of paths
    if (!paths.includes(location.pathname)) {
      // Remove 'act' class from all <li> tags
      listRefs.current.forEach((item) => item.classList.remove("act"));
      // Hide the indicator
      if (indicat.current) {
        indicat.current.style.display = "none";
      }
    } else {
      // If the current path is in the list, set the active class
      indicat.current.style.display = "block";
      const index = paths.findIndex((path) => path === location.pathname);
      if (index !== -1) {
        activeLink(index);
      }
    }
  }, [location]);

  return (
    <div style={{ backgroundColor: "#f0f1f3" }}>
      <div
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          right: "0",
          zIndex: "999",
        }}
      >
        <div className={style.top_circle_header}>
          <Link to={`${process.env.PUBLIC_URL}/`}>
            <img src={logo} alt="cashif logo" />
          </Link>
          <Tooltip
            title="المزيد"
            className={style.three_dots}
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <IconButton>
              <MoreVertIcon sx={{ color: "#fff", fontSize: "32px" }} />
            </IconButton>
          </Tooltip>
        </div>
        <div className={style.introCurve}>
          <svg
            style={{ width: "100%", height: "auto" }}
            viewBox="0 0 1920 74"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 0H1920V0.96521C1920 0.96521 1335.71 74 960 74C584.29 74 0 0.96521 0 0.96521V0Z"
              fill="#174545"
            />
          </svg>
        </div>
      </div>

      <Popover
        dir="rtl"
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: isSmallScreen ? "center" : "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: isSmallScreen ? "center" : "right",
        }}
        disableScrollLock={true}
      >
        <Paper sx={{ maxWidth: "100%" }}>
          <MenuList>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <TranslateIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>English</ListItemText>
            </MenuItem>
            <MenuItem onClick={contact}>
              <ListItemIcon>
                <PhoneIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>اتصل بنا</ListItemText>
            </MenuItem>
            <Divider />

            {cookies.token ? (
              <MenuItem onClick={logout}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>تسجيل الخروج</ListItemText>
              </MenuItem>
            ) : (
              <MenuItem onClick={login}>
                <ListItemIcon>
                  <LoginIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>تسجيل الدخول</ListItemText>
              </MenuItem>
            )}
          </MenuList>
        </Paper>
      </Popover>

      {/* Outlet */}
      <Box component="main">
        <Outlet />
      </Box>

      {/* <!-- Start mobile phone Navbar & Category shelve under it --> */}
      <nav className="mob-phone-nav">
        <div className="navigation">
          <ul>
            <li
              className="list"
              aria-label="فالك"
              title="فالك"
              onClick={() => activeLink(4)}
              ref={(el) => (listRefs.current[4] = el)} // Assign ref
            >
              <Link to={`${process.env.PUBLIC_URL}/falak`}>
                <span className="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M480 32c0-12.9-7.8-24.6-19.8-29.6s-25.7-2.2-34.9 6.9L381.7 53c-48 48-113.1 75-181 75l-8.7 0-32 0-96 0c-35.3 0-64 28.7-64 64l0 96c0 35.3 28.7 64 64 64l0 128c0 17.7 14.3 32 32 32l64 0c17.7 0 32-14.3 32-32l0-128 8.7 0c67.9 0 133 27 181 75l43.6 43.6c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6l0-147.6c18.6-8.8 32-32.5 32-60.4s-13.4-51.6-32-60.4L480 32zm-64 76.7L416 240l0 131.3C357.2 317.8 280.5 288 200.7 288l-8.7 0 0-96 8.7 0c79.8 0 156.5-29.8 215.3-83.3z" />
                  </svg>
                </span>
                <span className="text-mob-nav">فالك</span>
              </Link>
            </li>

            <li
              className="list"
              aria-label="تقاريري"
              title="تقاريري"
              onClick={() => activeLink(1)}
              ref={(el) => (listRefs.current[1] = el)} // Assign ref
            >
              <Link to={`${process.env.PUBLIC_URL}/reports`}>
                <span className="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                    <path d="M64 0C28.7 0 0 28.7 0 64L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-288-128 0c-17.7 0-32-14.3-32-32L224 0 64 0zM256 0l0 128 128 0L256 0zM112 256l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16z" />
                  </svg>
                </span>
                <span className="text-mob-nav">تقاريري</span>
              </Link>
            </li>

            <li
              className="list act"
              aria-label="الرئيسية"
              title="الرئيسية"
              onClick={() => activeLink(2)}
              ref={(el) => (listRefs.current[2] = el)} // Assign ref
            >
              <Link to={`${process.env.PUBLIC_URL}/`}>
                <span className="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                    <path d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
                  </svg>
                </span>
                <span className="text-mob-nav">الرئيسية</span>
              </Link>
            </li>

            <li
              className="list"
              aria-label="الأسعار"
              title="الأسعار"
              onClick={() => activeLink(3)}
              ref={(el) => (listRefs.current[3] = el)} // Assign ref
            >
              <Link to={`${process.env.PUBLIC_URL}/prices`}>
                <span className="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M320 96L192 96 144.6 24.9C137.5 14.2 145.1 0 157.9 0L354.1 0c12.8 0 20.4 14.2 13.3 24.9L320 96zM192 128l128 0c3.8 2.5 8.1 5.3 13 8.4C389.7 172.7 512 250.9 512 416c0 53-43 96-96 96L96 512c-53 0-96-43-96-96C0 250.9 122.3 172.7 179 136.4c0 0 0 0 0 0s0 0 0 0c4.8-3.1 9.2-5.9 13-8.4zm84 88c0-11-9-20-20-20s-20 9-20 20l0 14c-7.6 1.7-15.2 4.4-22.2 8.5c-13.9 8.3-25.9 22.8-25.8 43.9c.1 20.3 12 33.1 24.7 40.7c11 6.6 24.7 10.8 35.6 14l1.7 .5c12.6 3.8 21.8 6.8 28 10.7c5.1 3.2 5.8 5.4 5.9 8.2c.1 5-1.8 8-5.9 10.5c-5 3.1-12.9 5-21.4 4.7c-11.1-.4-21.5-3.9-35.1-8.5c-2.3-.8-4.7-1.6-7.2-2.4c-10.5-3.5-21.8 2.2-25.3 12.6s2.2 21.8 12.6 25.3c1.9 .6 4 1.3 6.1 2.1c0 0 0 0 0 0s0 0 0 0c8.3 2.9 17.9 6.2 28.2 8.4l0 14.6c0 11 9 20 20 20s20-9 20-20l0-13.8c8-1.7 16-4.5 23.2-9c14.3-8.9 25.1-24.1 24.8-45c-.3-20.3-11.7-33.4-24.6-41.6c-11.5-7.2-25.9-11.6-37.1-15c0 0 0 0 0 0l-.7-.2c-12.8-3.9-21.9-6.7-28.3-10.5c-5.2-3.1-5.3-4.9-5.3-6.7c0-3.7 1.4-6.5 6.2-9.3c5.4-3.2 13.6-5.1 21.5-5c9.6 .1 20.2 2.2 31.2 5.2c10.7 2.8 21.6-3.5 24.5-14.2s-3.5-21.6-14.2-24.5c-6.5-1.7-13.7-3.4-21.1-4.7l0-13.9z" />
                  </svg>
                </span>
                <span className="text-mob-nav">الأسعار</span>
              </Link>
            </li>

            <li
              className="list"
              aria-label="حجز موعد"
              title="حجز موعد"
              onClick={() => activeLink(0)}
              ref={(el) => (listRefs.current[0] = el)} // Assign ref
            >
              <Link to={`${process.env.PUBLIC_URL}/booking`}>
                <span className="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M128 0c17.7 0 32 14.3 32 32l0 32 128 0 0-32c0-17.7 14.3-32 32-32s32 14.3 32 32l0 32 48 0c26.5 0 48 21.5 48 48l0 48L0 160l0-48C0 85.5 21.5 64 48 64l48 0 0-32c0-17.7 14.3-32 32-32zM0 192l448 0 0 272c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 192zm64 80l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm128 0l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM64 400l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zm112 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16z" />
                  </svg>
                </span>
                <span className="text-mob-nav">حجز موعد</span>
              </Link>
            </li>

            <div ref={indicat} className="indicat"></div>
          </ul>
        </div>
      </nav>
    </div>
  );
}
export default HomeLayout;
