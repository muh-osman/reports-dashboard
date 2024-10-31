import * as React from "react";
import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
//
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import PersonIcon from "@mui/icons-material/Person";
// Logo
import logo from "../Assets/Images/logo.png";
// Cookies
import { useCookies } from "react-cookie";

const pages = [];

function HomeLayout() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900); // Assuming md breakpoint is 960px

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // Logout
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const logout = () => {
    removeCookie("token", { path: "/" });
  };

  return (
    <Box>
      <AppBar position="static">
        <Container
          maxWidth="xl"
          sx={{ paddingLeft: { xs: 2, md: 4 }, paddingRight: { xs: 2, md: 4 } }}
        >
          <Toolbar disableGutters>
            <div
              style={{
                width: "55px",
                height: "67px",
                margin: "6px",
                justifyContent: "center",
                alignItems: "center",
                display: isMobile ? "none" : "flex",
              }}
            >
              <Link to="/" style={{ display: "flex", alignItems: "center" }}>
                <img style={{ width: "100%" }} src={logo} alt="logo" />
              </Link>
            </div>

            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            ></Typography>

            <div
              style={{
                width: "45px",
                height: "55px",
                margin: "6px",
                justifyContent: "center",
                alignItems: "center",
                display: isMobile ? "flex" : "none",
              }}
            >
              <Link to="/" style={{ display: "flex", alignItems: "center" }}>
                <img style={{ width: "100%" }} src={logo} alt="logo" />
              </Link>
            </div>

            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            ></Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>
            <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}>
              <Typography variant="body1" sx={{ marginRight: 1 }}>
                محمد علي احمد
              </Typography>

              <Tooltip title="Account">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar>
                    <PersonIcon sx={{ color: "white", fontSize: "2rem" }} />
                  </Avatar>
                </IconButton>
              </Tooltip>

              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography
                    sx={{ textAlign: "right", width: "100%" }}
                    onClick={logout}
                  >
                    تسجيل خروج
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Outlet */}
      <Box component="main" sx={{ p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
}
export default HomeLayout;
