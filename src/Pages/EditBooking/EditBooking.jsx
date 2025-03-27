import style from "./EditBooking.module.scss";
import { Link, useParams, useNavigate } from "react-router-dom";
// Cookies
import { useCookies } from "react-cookie";
// MUI
import * as React from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { LoadingButton } from "@mui/lab";
//
import dayjs from "dayjs";
// API
import useGetAllBranchesApi from "../../API/useGetAllBranchesApi";
import useGetAllManufacturerApi from "../../API/useGetAllManufacturerApi";
import useGetServices from "../../API/useGetServices";
// import useGetOneAppointmentApi from "../../API/useGetOneAppointmentApi";
import { useEditAppointmentApi } from "../../API/useEditAppointmentApi";
import useGetAppointmentApi from "../../API/useGetAppointmentApi";

export default function EditBooking() {
  React.useEffect(() => {
    // Scroll to the top of the page
    window.scrollTo(0, 0);
  }, []);
  // Get the id from the URL
  const { id } = useParams();
  //
  const [isHovered, setIsHovered] = React.useState(false);
  // Cookies
  const [cookies, setCookie] = useCookies(["tokenApp", "userId"]);

  // Utility function to format date to dd/mm/yyyy
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
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
  // Get One Appointment before edit
  // const {
  //   data: oneAppointmentData,
  //   fetchStatus,
  //   isSuccess,
  // } = useGetOneAppointmentApi(id);

  // Get All Appointment before edit
  const {
    data: allAppointment,
    fetchAppointmentStatus,
    isAppointmentSuccess,
  } = useGetAppointmentApi();

  // Filter appointments based on the provided id to get spacific appointment
  const oneAppointmentData = allAppointment?.find(
    (appointment) => appointment.id === parseInt(id)
  );

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

  // Location Of Inspection
  // const [selectedLocation, setSelectedLocation] = React.useState(0);
  // const handleSelectedLocationChange = (event) => {
  //   setSelectedLocation(event.target.value);
  // };

  // Branches
  const [selectedBranch, setSelectedBranch] = React.useState("");
  const handleBranchChange = (event) => {
    setSelectedBranch(event.target.value);
  };

  React.useEffect(() => {
    if (allBranches && oneAppointmentData) {
      setSelectedBranch(oneAppointmentData?.branchId || "");
    }
  }, [allBranches, oneAppointmentData]);

  // Manufacturers
  const [selectedManufacturer, setSelectedManufacturer] = React.useState("");
  const handleManufacturerChange = (event) => {
    setSelectedManufacturer(event.target.value);
  };

  React.useEffect(() => {
    if (allManufacturers && oneAppointmentData) {
      setSelectedManufacturer(oneAppointmentData?.carManufacturerId || "");
    }
  }, [allManufacturers, oneAppointmentData]);

  // Years
  const [selectedYear, setSelectedYear] = React.useState("");
  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  React.useEffect(() => {
    if (oneAppointmentData) {
      setSelectedYear(oneAppointmentData?.year || "");
    }
  }, [oneAppointmentData]);

  // Date
  const [date, setDate] = React.useState(null);
  React.useEffect(() => {
    if (oneAppointmentData && oneAppointmentData.check_Date) {
      // Parse the check_Date string and set it to the date state
      const parsedDate = dayjs(oneAppointmentData.check_Date);
      setDate(parsedDate);
    }
  }, [oneAppointmentData]);

  // Time
  const [time, setTime] = React.useState(null);
  React.useEffect(() => {
    if (oneAppointmentData && oneAppointmentData.check_Time) {
      // Parse the check_Time string and set it to the time state
      const [hours, minutes] = oneAppointmentData.check_Time.split(":");
      const parsedTime = dayjs()
        .hour(parseInt(hours))
        .minute(parseInt(minutes));
      setTime(parsedTime);
    }
  }, [oneAppointmentData]);

  // Services
  const [selectedServiceId, setSelectedServiceId] = React.useState("");
  const handleServicesChange = (event) => {
    setSelectedServiceId(event.target.value);
  };

  // Find the selected service based on the selectedServiceId
  const selectedService = allServices?.find(
    (service) => service.id === parseInt(selectedServiceId)
  );

  React.useEffect(() => {
    if (allServices && oneAppointmentData) {
      setSelectedServiceId(oneAppointmentData?.servicesList || "");
    }
  }, [allServices, oneAppointmentData]);

  //  Submit Edit
  const { mutate, isPending } = useEditAppointmentApi(id);
  const submitEditForm = () => {
    // Format the date and time using dayjs
    let dateAfterFormat = date
      ? dayjs(date).format("YYYY-MM-DDTHH:mm:ss.SSSSSS")
      : null;
    let timeAfterFormat = time ? dayjs(time).format("HH:mm:ss") : null;

    let data = {
      clientId: cookies.userId,
      check_Place: 1,
      branchId: selectedBranch,
      carManufacturerId: selectedManufacturer,
      year: selectedYear,
      check_Date: dateAfterFormat,
      check_Time: timeAfterFormat,
      check_Time2: timeAfterFormat,
      servicesList: selectedServiceId,
      totalCost: selectedService?.pricing,
    };

    mutate(data);
  };

  return (
    <div className={style.container}>
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
          لتعديل الحجز
        </Typography>
      ) : (
        <>
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
            تعديل الحجز
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

              {/* الشركة المصنعة */}
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

              {/*  سنة الصنع */}
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

              {/* تاريخ */}
              <div dir="rtl" className={style.datePickerContainer}>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="en"
                >
                  <DemoContainer components={["DatePicker"]}>
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
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>

              {/* الوقت */}
              <div dir="rtl" className={style.datePickerContainer}>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="en"
                >
                  <DemoContainer components={["DatePicker"]}>
                    <MobileTimePicker
                      fullWidth
                      dir="rtl"
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

              {/*  نوع الخدمة */}
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

              {/* Button */}
              <LoadingButton
                onClick={submitEditForm}
                style={{ marginTop: "32px" }}
                variant="contained"
                loading={isPending}
              >
                تعديل{" "}
                {selectedServiceId && (
                  <span style={{ paddingRight: "9px" }}>
                    ({selectedService?.pricing} ريال تقريبا)
                  </span>
                )}
              </LoadingButton>
            </FormControl>
          </Box>
        </>
      )}
    </div>
  );
}
