import style from "./Booking.module.scss";
import { Link, useNavigate } from "react-router-dom";

// MUI
import * as React from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Divider, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import Button from "@mui/material/Button";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
// MUI Icons
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import DownloadIcon from "@mui/icons-material/Download";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MinorCrashIcon from "@mui/icons-material/MinorCrash";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import StyleIcon from "@mui/icons-material/Style";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from '@mui/icons-material/LocationOn';
//
import dayjs from "dayjs";
// Cookies
import { useCookies } from "react-cookie";
// API
import useGetAllBranchesApi from "../../API/useGetAllBranchesApi";
import useGetAllManufacturerApi from "../../API/useGetAllManufacturerApi";
import useGetServices from "../../API/useGetServices";
import useGetAppointmentApi from "../../API/useGetAppointmentApi";

export default function Booking() {
  React.useEffect(() => {
    // Scroll to the top of the page
    window.scrollTo(0, 0);
  }, []);
  //
  // Utility function to format date to dd/mm/yyyy
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  //
  const [isHovered, setIsHovered] = React.useState(false);
  // Cookies
  const [cookies, setCookie] = useCookies(["tokenApp"]);
  //
  const navigate = useNavigate();
  const navToLoginPage = () => {
    navigate(`${process.env.PUBLIC_URL}/login`);
  };
  // Branches
  const {
    data: allBranches,
    fetchBranchesStatus,
    isBranchesSuccess,
  } = useGetAllBranchesApi();
  // Manufacturers
  const {
    data: allManufacturers,
    fetchManufacturersStatus,
    isManufacturersSuccess,
  } = useGetAllManufacturerApi();
  // Services
  const {
    data: allServices,
    fetchServicesStatus,
    isServicesSuccess,
  } = useGetServices();
  // Appointment
  const {
    data: allAppointment,
    fetchAppointmentStatus,
    isAppointmentSuccess,
  } = useGetAppointmentApi();

  const years = [
    {
      id: 2026,
      year: "2026",
    },
    {
      id: 2025,
      year: "2025",
    },
    {
      id: 2024,
      year: "2024",
    },
    {
      id: 2023,
      year: "2023",
    },
    {
      id: 2022,
      year: "2022",
    },
    {
      id: 2021,
      year: "2021",
    },
    {
      id: 2020,
      year: "2020",
    },
    {
      id: 2019,
      year: "2019",
    },
    {
      id: 2018,
      year: "2018",
    },
    {
      id: 2017,
      year: "2017",
    },
    {
      id: 2016,
      year: "2016",
    },
    {
      id: 2015,
      year: "2015",
    },
    {
      id: 2014,
      year: "2014",
    },
    {
      id: 2013,
      year: "2013",
    },
    {
      id: 2012,
      year: "2012",
    },
    {
      id: 2011,
      year: "2011",
    },
    {
      id: 2010,
      year: "2010",
    },
    {
      id: 1,
      year: "أقدم",
    },
  ];

  // Location Of Inspection
  const [selectedLocation, setSelectedLocation] = React.useState(0);
  const handleSelectedLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  // Branches
  const [selectedBranch, setSelectedBranch] = React.useState("");
  const handleBranchChange = (event) => {
    setSelectedBranch(event.target.value);
  };

  // Manufacturers
  const [selectedManufacturer, setSelectedManufacturer] = React.useState("");
  const handleManufacturerChange = (event) => {
    setSelectedManufacturer(event.target.value);
  };

  // Years
  const [selectedYear, setSelectedYear] = React.useState("");
  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  // Date
  const [date, setDate] = React.useState(null);

  // Date
  const [time, setTime] = React.useState(null);

  // Services
  const [selectedServiceId, setSelectedServiceId] = React.useState("");
  const handleServicesChange = (event) => {
    setSelectedServiceId(event.target.value);
  };
  // Find the selected service based on the selectedServiceId
  const selectedService = allServices?.find(
    (service) => service.id === parseInt(selectedServiceId)
  );

  return (
    <div className={style.container}>
      <Typography
        variant="h6"
        component="div"
        style={{
          textAlign: "center",
          margin: "20px",
          marginTop: "8px",
          color: "#757575",
        }}
      >
        احجز موعد
      </Typography>
      <Box sx={{ minWidth: 120, maxWidth: "400px", margin: "auto" }}>
        {/*  مكان الفحص */}
        <FormControl fullWidth dir="rtl">
          {/* <TextField
            sx={{ backgroundColor: "#fff" }}
            dir="rtl"
            required
            fullWidth
            select
            label="مكان الفحص"
            value={selectedLocation}
            onChange={handleSelectedLocationChange}
            // disabled={}
          >
            <MenuItem dir="rtl" value={0}>
              فحص داخل الفرع
            </MenuItem>
          </TextField> */}

          {/* الفرع  */}
          {!cookies.tokenApp && (
            <TextField
              sx={{ backgroundColor: "#fff" }}
              dir="rtl"
              required
              fullWidth
              select
              label="الفرع"
              value=""
              // disabled={}
            >
              <MenuItem onClick={navToLoginPage} dir="rtl" value={"notAuth"}>
                يرجى تسجيل الدخول لحجز موعد
              </MenuItem>
            </TextField>
          )}

          {cookies.tokenApp && (
            <TextField
              sx={{ backgroundColor: "#fff", marginTop: "16px" }}
              dir="rtl"
              required
              fullWidth
              select
              label="الفرع"
              value={selectedBranch}
              onChange={handleBranchChange}
              // disabled={}
            >
              {allBranches && allBranches.length > 0 ? (
                allBranches.map((branch) => (
                  <MenuItem dir="rtl" key={branch.id} value={branch.id}>
                    {branch.nameAr}
                  </MenuItem>
                ))
              ) : (
                <MenuItem dir="rtl" value="">
                  جاري التحميل..
                </MenuItem>
              )}
            </TextField>
          )}

          {/* الشركة المصنعة */}
          {cookies.tokenApp && (
            <TextField
              sx={{ backgroundColor: "#fff", marginTop: "16px" }}
              dir="rtl"
              required
              fullWidth
              select
              label="الشركة المصنعة"
              value={selectedManufacturer}
              onChange={handleManufacturerChange}
              // disabled={}
            >
              {allManufacturers && allManufacturers.length > 0 ? (
                allManufacturers.map((Manufacturer) => (
                  <MenuItem
                    dir="rtl"
                    key={Manufacturer.id}
                    value={Manufacturer.id}
                  >
                    {Manufacturer.nameAr}
                  </MenuItem>
                ))
              ) : (
                <MenuItem dir="rtl" value="">
                  جاري التحميل..
                </MenuItem>
              )}
            </TextField>
          )}

          {/*  سنة الصنع */}
          {cookies.tokenApp && (
            <TextField
              sx={{ backgroundColor: "#fff", marginTop: "16px" }}
              dir="rtl"
              required
              fullWidth
              select
              label="سنة الصنع"
              value={selectedYear}
              onChange={handleYearChange}
              // disabled={}
            >
              {years && years.length > 0 ? (
                years.map((year) => (
                  <MenuItem dir="rtl" key={year.id} value={year.id}>
                    {year.year}
                  </MenuItem>
                ))
              ) : (
                <MenuItem dir="rtl" value="">
                  جاري التحميل..
                </MenuItem>
              )}
            </TextField>
          )}

          {/* تاريخ */}
          {cookies.tokenApp && (
            <div dir="ltr" className={style.datePickerContainer}>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="en"
              >
                <DemoContainer components={["DatePicker"]}>
                  <MobileDatePicker
                    fullWidth
                    dir="ltr"
                    sx={{ backgroundColor: "#fff", width: "100%" }}
                    label="* تاريخ الفحص"
                    format="DD/MM/YYYY"
                    value={date}
                    onChange={(newValue) => setDate(newValue)}
                    minDate={dayjs()}
                    required
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
          )}

          {/* الوقت */}
          {cookies.tokenApp && (
            <div dir="ltr" className={style.datePickerContainer}>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="en"
              >
                <DemoContainer components={["DatePicker"]}>
                  <MobileTimePicker
                    fullWidth
                    dir="ltr"
                    sx={{ backgroundColor: "#fff", width: "100%" }}
                    label="* وقت الفحص"
                    // format=""
                    value={time}
                    onChange={(newValue) => setTime(newValue)}
                    required
                  />
                </DemoContainer>
              </LocalizationProvider>
              <p
                dir="rtl"
                style={{
                  fontSize: "14px",
                  padding: "3px 3px 0 0",
                  color: "#757575",
                }}
              >
                اختيار الوقت (من التاسعة صباحا وحتى التاسعة مساءً)
              </p>
            </div>
          )}

          {/*  نوع الخدمة */}
          {cookies.tokenApp && (
            <>
              <TextField
                sx={{ backgroundColor: "#fff", marginTop: "16px" }}
                dir="rtl"
                required
                fullWidth
                select
                label="نوع الخدمة"
                value={selectedServiceId}
                onChange={handleServicesChange}
                // disabled={}
              >
                {allServices && allServices.length > 0 ? (
                  allServices.map((service) => (
                    <MenuItem dir="rtl" key={service.id} value={service.id}>
                      {service.nameAr}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem dir="rtl" value="">
                    جاري التحميل..
                  </MenuItem>
                )}
              </TextField>

              {/* Display the descriptionAr of the selected service */}
              {selectedServiceId && (
                <div className={style.description}>
                  {selectedService && (
                    <pre>{selectedService.descriptionAr}</pre>
                  )}
                </div>
              )}
            </>
          )}

          {cookies.tokenApp && (
            <Button style={{ marginTop: "32px" }} variant="contained">
              حجز{" "}
              <span style={{ paddingRight: "9px" }}>
                ({selectedService?.pricing} ريال تقريبا)
              </span>
            </Button>
          )}
        </FormControl>
      </Box>

      {/* Booking Cards */}
      <h5 className={style.last_appointment_title}>حجوزاتي</h5>
      <Divider sx={{ marginBottom: "18px" }} />

      {!cookies.tokenApp ? (
        <Typography
          variant="h6"
          component="div"
          style={{ textAlign: "center", margin: "20px", color: "#757575" }}
        >
          يرجى{" "}
          <Link
            to={`${process.env.PUBLIC_URL}/login`}
            style={{
              color: "#1976d2",
              textDecoration: isHovered ? "underline" : "none",
            }}
            onMouseOver={() => setIsHovered(true)}
            onMouseOut={() => setIsHovered(false)}
          >
            تسجيل الدخول
          </Link>{" "}
          لعرض الحجوزات
        </Typography>
      ) : (
        <div dir="rtl" className={style.appointment_cards_container}>
          {allAppointment && allAppointment.length > 0 ? (
            allAppointment.map((card) => (
              <Card
                key={card.id}
                sx={{
                  width: { xs: "100%", sm: 300 },
                  position: "relative",
                  borderRadius: "9px",
                  boxShadow: "none",
                }}
              >
                <CardContent>
                  <Box
                    display="flex"
                    alignItems="center"
                    gap={1}
                    marginBottom={"9px"}
                  >
                    <LocationOnIcon style={{ color: "#000000de" }} />
                    <Typography
                      variant="h5"
                      component="div"
                      style={{ fontSize: "14px" }}
                    >
                      {card.branchNameAr}
                    </Typography>
                  </Box>

                  <Box
                    display="flex"
                    alignItems="center"
                    gap={1}
                    marginBottom={"9px"}
                  >
                    <MinorCrashIcon style={{ color: "#000000de" }} />
                    <Typography
                      variant="h5"
                      component="div"
                      style={{ fontSize: "14px" }}
                    >
                      {card.carManufacturerNameAr}
                    </Typography>
                  </Box>

                  <Box
                    display="flex"
                    alignItems="center"
                    gap={1}
                    marginBottom={"9px"}
                  >
                    <AccessTimeIcon style={{ color: "#000000de" }} />
                    <Typography
                      variant="h5"
                      component="div"
                      style={{ fontSize: "14px" }}
                    >
                      {card.check_Time}
                    </Typography>
                  </Box>

                  <Box display="flex" alignItems="center" gap={1}>
                    <CalendarMonthIcon style={{ color: "#000000de" }} />
                    <Typography
                      variant="h5"
                      component="div"
                      style={{ fontSize: "14px" }}
                    >
                      {formatDate(card.check_Date)}
                    </Typography>
                  </Box>
                </CardContent>

                <Divider />

                <CardActions dir="ltr" sx={{ backgroundColor: "#fff" }}>
                  {/* <Button
          onClick={() => handlePreviewCard(card.id, card.includeImage)}
          sx={{ color: "#1976d2", width: "88px" }}
          size="small"
          disabled={loadingPreview[card.id]} // Disable button if loading
        >
          {loadingPreview[card.id] ? (
            <CircularProgress size={22} color="inherit" />
          ) : (
            "معاينة التقرير"
          )}
        </Button> */}

                  {/* <IconButton
                    onClick={() =>
                      handleDownloadCard(card.id, card.includeImage)
                    }
                    sx={{ color: "#1976d2" }}
                    size="small"
                    disabled={loadingDownload[card.id]} // Disable button if loading
                  >
                    {loadingDownload[card.id] ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      <DownloadIcon />
                    )}
                  </IconButton> */}
                </CardActions>
              </Card>
            ))
          ) : (
            <Typography
              dir="rtl"
              variant="h6"
              component="div"
              style={{ textAlign: "center", margin: "20px", color: "#757575" }}
            >
              جاري تحميل التقارير ..
            </Typography>
          )}
        </div>
      )}
    </div>
  );
}
