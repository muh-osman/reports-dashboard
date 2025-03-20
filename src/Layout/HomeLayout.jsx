import style from "./HomeLayout.module.scss";

import * as React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
// MUI Icons
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LogoutIcon from "@mui/icons-material/Logout";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
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
// Logo
import logo from "../Assets/Images/logo.png";
// Cookies
import { useCookies } from "react-cookie";

function HomeLayout() {
  const navigate = useNavigate();

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

  const falak = () => {
    handleClose();
    navigate(`${process.env.PUBLIC_URL}/falak`);
  };
  const contact = () => {
    handleClose();
    navigate(`${process.env.PUBLIC_URL}/contact`);
  };

  // Mobile Navbar add active class
  const listRefs = React.useRef([]);
  const activeLink = (index) => {
    // Remove 'act' class from all items
    listRefs.current.forEach((item) => item.classList.remove("act"));
    // Add 'act' class to the clicked item
    listRefs.current[index].classList.add("act");
  };

  return (
    <div style={{ backgroundColor: "#f0f1f3" }}>
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

      <Popover
        dir="rtl"
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
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
            <MenuItem onClick={falak}>
              <ListItemIcon>
                <AttachMoneyIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>"فالك" للتسويق بالعمولة</ListItemText>
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
      <Box component="main" sx={{ p: 3 }}>
        <Outlet />
      </Box>

      {/* <!-- Start mobile phone Navbar & Category shelve under it --> */}
      <nav className="mob-phone-nav">
        <div className="navigation">
          <ul>
            <li
              className="list"
              aria-label="حجز موعد"
              title="حجز موعد"
              onClick={() => activeLink(0)}
              ref={(el) => (listRefs.current[0] = el)} // Assign ref
            >
              <Link to={`${process.env.PUBLIC_URL}/`}>
                <span className="icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <g>
                      <path d="M22.46 7.57L12.357 2.115c-.223-.12-.49-.12-.713 0L1.543 7.57c-.364.197-.5.652-.303 1.017.135.25.394.393.66.393.12 0 .243-.03.356-.09l.815-.44L4.7 19.963c.214 1.215 1.308 2.062 2.658 2.062h9.282c1.352 0 2.445-.848 2.663-2.087l1.626-11.49.818.442c.364.193.82.06 1.017-.304.196-.363.06-.818-.304-1.016zm-4.638 12.133c-.107.606-.703.822-1.18.822H7.36c-.48 0-1.075-.216-1.178-.798L4.48 7.69 12 3.628l7.522 4.06-1.7 12.015z"></path>
                      <path d="M8.22 12.184c0 2.084 1.695 3.78 3.78 3.78s3.78-1.696 3.78-3.78-1.695-3.78-3.78-3.78-3.78 1.696-3.78 3.78zm6.06 0c0 1.258-1.022 2.28-2.28 2.28s-2.28-1.022-2.28-2.28 1.022-2.28 2.28-2.28 2.28 1.022 2.28 2.28z"></path>
                    </g>
                  </svg>
                </span>
                <span className="text-mob-nav">حجز موعد</span>
              </Link>
            </li>

            <li
              className="list"
              aria-label="تقاريري"
              title="تقاريري"
              onClick={() => activeLink(1)}
              ref={(el) => (listRefs.current[1] = el)} // Assign ref
            >
              <Link to={`${process.env.PUBLIC_URL}/`}>
                <span className="icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <g>
                      <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                    </g>
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
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <g>
                      <path d="M22.46 7.57L12.357 2.115c-.223-.12-.49-.12-.713 0L1.543 7.57c-.364.197-.5.652-.303 1.017.135.25.394.393.66.393.12 0 .243-.03.356-.09l.815-.44L4.7 19.963c.214 1.215 1.308 2.062 2.658 2.062h9.282c1.352 0 2.445-.848 2.663-2.087l1.626-11.49.818.442c.364.193.82.06 1.017-.304.196-.363.06-.818-.304-1.016zm-4.638 12.133c-.107.606-.703.822-1.18.822H7.36c-.48 0-1.075-.216-1.178-.798L4.48 7.69 12 3.628l7.522 4.06-1.7 12.015z"></path>
                      <path d="M8.22 12.184c0 2.084 1.695 3.78 3.78 3.78s3.78-1.696 3.78-3.78-1.695-3.78-3.78-3.78-3.78 1.696-3.78 3.78zm6.06 0c0 1.258-1.022 2.28-2.28 2.28s-2.28-1.022-2.28-2.28 1.022-2.28 2.28-2.28 2.28 1.022 2.28 2.28z"></path>
                    </g>
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
              <Link to={`${process.env.PUBLIC_URL}/`}>
                <span className="icon">


                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="24" height="24" fill="currentColor">
  <path d="M308 96c6.627 0 12-5.373 12-12V44c0-6.627-5.373-12-12-12H12C5.373 32 0 37.373 0 44v44.748c0 6.627 5.373 12 12 12h85.28c27.308 0 48.261 9.958 60.97 27.252H12c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h158.757c-1.715 13.607-6.647 25.978-14.851 36.182-11.324 13.879-28.014 21.818-48.287 21.818H12c-6.627 0-12 5.373-12 12v53.748c0 6.627 5.373 12 12 12h92.971c42.689 0 79.143-15.108 105.539-43.043 13.559-14.531 23.661-32.066 30.267-52.099H308c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12h-58.719c-2.06-10.477-5.757-20.213-11.073-28.824-10.02-16.172-25.424-28.092-45.196-34.914C210.752 129.031 216 113.123 216 96h92z"/>
</svg>
                </span>
                <span className="text-mob-nav">الأسعار</span>
              </Link>
            </li>

            <li
              className="list"
              aria-label="الحساب"
              title="الحساب"
              onClick={() => activeLink(4)}
              ref={(el) => (listRefs.current[4] = el)} // Assign ref
            >
              <Link to={`${process.env.PUBLIC_URL}/`}>
                <span className="icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <g>
                      <path d="M12 11.816c1.355 0 2.872-.15 3.84-1.256.814-.93 1.078-2.368.806-4.392-.38-2.825-2.117-4.512-4.646-4.512S7.734 3.343 7.354 6.17c-.272 2.022-.008 3.46.806 4.39.968 1.107 2.485 1.256 3.84 1.256zM8.84 6.368c.162-1.2.787-3.212 3.16-3.212s2.998 2.013 3.16 3.212c.207 1.55.057 2.627-.45 3.205-.455.52-1.266.743-2.71.743s-2.255-.223-2.71-.743c-.507-.578-.657-1.656-.45-3.205zm11.44 12.868c-.877-3.526-4.282-5.99-8.28-5.99s-7.403 2.464-8.28 5.99c-.172.692-.028 1.4.395 1.94.408.52 1.04.82 1.733.82h12.304c.693 0 1.325-.3 1.733-.82.424-.54.567-1.247.394-1.94zm-1.576 1.016c-.126.16-.316.246-.552.246H5.848c-.235 0-.426-.085-.552-.246-.137-.174-.18-.412-.12-.654.71-2.855 3.517-4.85 6.824-4.85s6.114 1.994 6.824 4.85c.06.242.017.48-.12.654z"></path>
                    </g>
                  </svg>
                </span>
                <span className="text-mob-nav">الحساب</span>
              </Link>
            </li>
            <div className="indicat"></div>
          </ul>
        </div>
      </nav>
    </div>
  );
}
export default HomeLayout;
