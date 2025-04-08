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
import CircularProgress from "@mui/material/CircularProgress";
import Tooltip from "@mui/material/Tooltip";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import { LoadingButton } from "@mui/lab";
import Autocomplete from "@mui/material/Autocomplete";
// MUI Icons
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MinorCrashIcon from "@mui/icons-material/MinorCrash";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
//
import dayjs from "dayjs";
// Cookies
import { useCookies } from "react-cookie";
// API
import useGetAllBranchesApi from "../../API/useGetAllBranchesApi";
import useGetAllManufacturerApi from "../../API/useGetAllManufacturerApi";
import useGetServices from "../../API/useGetServices";
import useGetAppointmentApi from "../../API/useGetAppointmentApi";
import { useDeleteAppointmentApi } from "../../API/useDeleteAppointmentApi";
import { usePostApoinmentFormApi } from "../../API/usePostApoinmentFormApi";

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
    return `${year}/${month}/${day}`;
  };
  //
  const [isHovered, setIsHovered] = React.useState(false);
  // Cookies
  const [cookies, setCookie] = useCookies(["tokenApp", "userId"]);
  //
  const navigate = useNavigate();
  const navToLoginPage = () => {
    navigate(`${process.env.PUBLIC_URL}/login`);
  };
  // Branches
  const { data: allBranches } = useGetAllBranchesApi();
  // Manufacturers
  const { data: allManufacturers } = useGetAllManufacturerApi();
  // Services
  const { data: allServices } = useGetServices();
  // Appointment
  const { data: allAppointment, fetchStatus: fetchAppointmentStatus } =
    useGetAppointmentApi();

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
      id: 2009,
      year: "2009",
    },
    {
      id: 2008,
      year: "2008",
    },
    {
      id: 2007,
      year: "2007",
    },
    {
      id: 2006,
      year: "2006",
    },
    {
      id: 2005,
      year: "2005",
    },
    {
      id: 2004,
      year: "2004",
    },
    {
      id: 2003,
      year: "2003",
    },
    {
      id: 2002,
      year: "2002",
    },
    {
      id: 2001,
      year: "2001",
    },
    {
      id: 2000,
      year: "2000",
    },
  ];

  // Branches
  const [selectedBranch, setSelectedBranch] = React.useState("");
  const handleBranchChange = (event) => {
    setSelectedBranch(event.target.value);
  };

  // Manufacturers
  const [selectedManufacturer, setSelectedManufacturer] = React.useState("");
  const handleManufacturerChange = (event, newValue) => {
    if (newValue) {
      setSelectedManufacturer(newValue.id);
    } else {
      setSelectedManufacturer(null);
    }
  };

  // Years
  const [selectedYear, setSelectedYear] = React.useState("");
  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  // Date
  const [date, setDate] = React.useState(null);

  // Time
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

  // Submit Apoinment form
  const {
    mutate: PostApoinmentFormMutate,
    isPending: isPostApoinmentFormMutatePending,
    isSuccess: isPostApoinmentFormMutateSuccess,
  } = usePostApoinmentFormApi();

  const submitForm = () => {
    // Format the date and time using dayjs
    let dateAfterFormat = date
      ? dayjs(date).format("YYYY-MM-DDTHH:mm:ss.SSSSSS")
      : null;
    let timeAfterFormat = time ? dayjs(time).format("HH:mm:ss") : null;
    const data = {
      clientId: cookies.userId,
      check_Place: 1,
      branchId: selectedBranch,
      carManufacturerId: selectedManufacturer,
      year: selectedYear,
      check_Date: dateAfterFormat,
      check_Time: timeAfterFormat,
      check_Time2: timeAfterFormat,
      servicesList: [selectedServiceId],
      totalCost: selectedService?.pricing,
    };

    PostApoinmentFormMutate(data);
  };

  React.useEffect(() => {
    if (isPostApoinmentFormMutateSuccess) {
      setSelectedServiceId("");
      setTime(null);
      setDate(null);
      setSelectedYear("");
      setSelectedManufacturer("");
      setSelectedBranch("");

      window.scrollTo(0, 0);
    }
  }, [isPostApoinmentFormMutateSuccess]);

  // Delete Apoinment
  const { mutate: deleteApoinmentMutate } = useDeleteAppointmentApi();
  const [loadingDelete, setLoadingDelete] = React.useState({});

  let handleDeleteApoinment = (id) => {
    const isConfirmed = window.confirm("هل أنت متأكد من حذف الموعد؟");
    if (isConfirmed) {
      setLoadingDelete((prev) => ({ ...prev, [id]: true })); // Set loading for the specific card
      deleteApoinmentMutate(id, {
        onSettled: () => {
          // Reset loading state regardless of success or error
          setLoadingDelete((prev) => ({ ...prev, [id]: false }));
        },
      });
    }
  };

  // Go to Edit Appoinment Page
  let handleEditApoinment = (id) => {
    navigate(`${process.env.PUBLIC_URL}/edit-booking/${id}`);
  };

  return (
    <div className={style.container}>
      <Typography
        variant="h6"
        component="div"
        style={{
          textAlign: "center",
          margin: "20px",
          marginTop: "8px",
          marginBottom: "24px",
          fontSize: "32px",
          fontWeight: "bold",
        }}
      >
        احجز موعد
      </Typography>
      <Box sx={{ minWidth: 120, maxWidth: "400px", margin: "auto" }}>
        {/*  مكان الفحص */}
        <FormControl fullWidth dir="rtl">
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
              disabled={isPostApoinmentFormMutatePending}
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
              disabled={isPostApoinmentFormMutatePending}
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
          {cookies.tokenApp && selectedBranch && (
            <Autocomplete
              className={style.autocomplete_input}
              dir="ltr"
              sx={{ backgroundColor: "#fff", marginTop: "16px" }}
              disablePortal
              onChange={handleManufacturerChange} // Add the onChange handler
              options={allManufacturers ? allManufacturers : []}
              getOptionLabel={(option) => option.nameAr}
              renderInput={(params) => (
                <TextField {...params} label="الشركة المصنعة" />
              )}
              // Use a unique key for each option
              renderOption={(props, option) => (
                <li dir="rtl" {...props} key={option.id}>
                  {option.nameAr}
                </li>
              )}
              disabled={isPostApoinmentFormMutatePending}
              clearOnBlur={false}
              clearIcon={null}
              noOptionsText={
                allManufacturers === null
                  ? "جاري التحميل..."
                  : "لا توجد خيارات متاحة"
              }
            />
          )}

          {/*  سنة الصنع */}
          {cookies.tokenApp && selectedManufacturer && (
            <TextField
              sx={{ backgroundColor: "#fff", marginTop: "16px" }}
              dir="rtl"
              required
              fullWidth
              select
              label="سنة الصنع"
              value={selectedYear}
              onChange={handleYearChange}
              disabled={isPostApoinmentFormMutatePending}
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

          <div className={style.date_and_time_container}>
            {/* تاريخ */}
            {cookies.tokenApp && selectedYear && (
              <div dir="rtl" className={style.datePickerContainer}>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="en"
                >
                  <DemoContainer components={["MobileDatePicker"]}>
                    <MobileDatePicker
                      fullWidth
                      dir="rtl"
                      sx={{ backgroundColor: "#fff", width: "100%" }}
                      label="* تاريخ الفحص"
                      format="DD/MM/YYYY"
                      value={date}
                      onChange={(newValue) => setDate(newValue)}
                      minDate={dayjs()}
                      required
                      disabled={isPostApoinmentFormMutatePending}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
            )}

            {/* الوقت */}
            {cookies.tokenApp && selectedYear && (
              <div dir="rtl" className={style.datePickerContainer}>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="en"
                >
                  <DemoContainer components={["MobileTimePicker"]}>
                    <MobileTimePicker
                      fullWidth
                      dir="rtl"
                      sx={{ backgroundColor: "#fff", width: "100%" }}
                      label="* وقت الفحص"
                      // format=""
                      value={time}
                      onChange={(newValue) => setTime(newValue)}
                      required
                      disabled={isPostApoinmentFormMutatePending}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
            )}
          </div>
          {cookies.tokenApp && selectedYear && (
            <p
              dir="rtl"
              style={{
                fontSize: "14px",
                padding: "3px 3px 0 0",
                color: "#757575",
              }}
            >
              اختيار الوقت (من التاسعة صباحاً وحتى التاسعة مساءً)
            </p>
          )}

          {/*  نوع الخدمة */}
          {cookies.tokenApp && time && date && (
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
                disabled={isPostApoinmentFormMutatePending}
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
              {cookies.tokenApp && selectedServiceId && (
                <div className={style.description}>
                  {selectedService && (
                    <pre>
                      {selectedService?.descriptionAr?.replace(
                        /(\d+)[.-]\s*/g,
                        "$1. "
                      )}
                    </pre>
                  )}
                </div>
              )}
            </>
          )}

          {/* Button */}
          {cookies.tokenApp && selectedServiceId && (
            <LoadingButton
              onClick={submitForm}
              style={{ marginTop: "32px" }}
              variant="contained"
              size="large"
              loading={isPostApoinmentFormMutatePending}
            >
              حجز{" "}
              <span style={{ paddingRight: "9px" }}>
                ({selectedService?.pricing} ريال تقريبا)
              </span>
            </LoadingButton>
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
            allAppointment
              .slice()
              .reverse()
              .map((card) => (
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
                        dir="ltr"
                        variant="h5"
                        component="div"
                        style={{ fontSize: "14px" }}
                      >
                        {new Date(
                          `1970-01-01T${card.check_Time}`
                        ).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
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

                  <CardActions dir="ltr" sx={{ backgroundColor: "#fdfefe" }}>
                    <Tooltip title="حذف">
                      <IconButton
                        onClick={() => handleDeleteApoinment(card.id)}
                        color="error"
                        size="small"
                        disabled={loadingDelete[card.id]} // Disable button if loading
                      >
                        {loadingDelete[card.id] ? (
                          <CircularProgress size={24} color="inherit" />
                        ) : (
                          <DeleteIcon />
                        )}
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="تعديل">
                      <IconButton
                        onClick={() => handleEditApoinment(card.id)}
                        sx={{ color: "#1976d2" }}
                        size="small"
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
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
              {fetchAppointmentStatus === "fetching"
                ? "جاري التحميل.."
                : "لا يوجد حجوزات"}
            </Typography>
          )}
        </div>
      )}
    </div>
  );
}
