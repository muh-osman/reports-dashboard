import style from "./EditBooking.module.scss";
import { Link, useParams } from "react-router-dom";
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
import Autocomplete from "@mui/material/Autocomplete";
//
import dayjs from "dayjs";
// API
import useGetAllBranchesApi from "../../API/useGetAllBranchesApi";
import useGetAllManufacturerApi from "../../API/useGetAllManufacturerApi";
import useGetServices from "../../API/useGetServices";
import { useEditAppointmentApi } from "../../API/useEditAppointmentApi";
import useGetAppointmentApi from "../../API/useGetAppointmentApi";
// Lang
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";

export default function EditBooking() {
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
  // Get the id from the URL
  const { id } = useParams();
  //
  const [isHovered, setIsHovered] = React.useState(false);
  // Cookies
  const [cookies, setCookie] = useCookies(["tokenApp", "userId"]);

  // Branches
  const { data: allBranches } = useGetAllBranchesApi();
  // Manufacturers
  const { data: allManufacturers } = useGetAllManufacturerApi();
  // Services
  const { data: allServices } = useGetServices();

  // Get All Appointment before edit
  const { data: allAppointment } = useGetAppointmentApi();

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
  const handleManufacturerChange = (event, newValue) => {
    if (newValue) {
      setSelectedManufacturer(newValue.id);
    } else {
      setSelectedManufacturer(null);
    }
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
    setSelectedServiceId([event.target.value]);
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
  const { mutate, isPending, isSuccess } = useEditAppointmentApi(id);
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
          {t("EditBooking.please")}{" "}
          <Link
            to={`${process.env.PUBLIC_URL}/login`}
            style={{
              color: "#1976d2",
              textDecoration: isHovered ? "underline" : "none",
            }}
            onMouseOver={() => setIsHovered(true)}
            onMouseOut={() => setIsHovered(false)}
          >
            {t("EditBooking.logIn")}
          </Link>{" "}
          {t("EditBooking.toModifyTheReservation")}
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
              fontSize: "32px",
              fontWeight: "bold",
            }}
          >
            {t("EditBooking.modifyReservation")}
          </Typography>
          <Box sx={{ minWidth: 120, maxWidth: "400px", margin: "auto" }}>
            {/*  مكان الفحص */}
            <FormControl fullWidth dir={languageText === "ar" ? "rtl" : "ltr"}>
              {/* الفرع  */}
              <TextField
                sx={{ backgroundColor: "#fff", marginTop: "16px" }}
                dir={languageText === "ar" ? "rtl" : "ltr"}
                required
                fullWidth
                select
                label={t("EditBooking.branch")}
                value={selectedBranch}
                onChange={handleBranchChange}
                disabled={isPending || isSuccess}
              >
                {allBranches && allBranches.length > 0 ? (
                  allBranches
                    .filter(
                      (branch) =>
                        branch.nameAr !== "افتراضي" ||
                        branch.nameEn !== "Virtual"
                    )
                    .map((branch) => (
                      <MenuItem
                        dir={languageText === "ar" ? "rtl" : "ltr"}
                        key={branch.id}
                        value={branch.id}
                      >
                        {languageText === "en"
                          ? branch?.nameEn
                          : branch?.nameAr}
                      </MenuItem>
                    ))
                ) : (
                  <MenuItem
                    dir={languageText === "ar" ? "rtl" : "ltr"}
                    value=""
                  >
                    {t("EditBooking.loading")}
                  </MenuItem>
                )}
              </TextField>

              {/* الشركة المصنعة */}
              <Autocomplete
                className={style.autocomplete_input}
                dir={languageText === "ar" ? "rtl" : "ltr"}
                sx={{ backgroundColor: "#fff", marginTop: "16px" }}
                disablePortal
                onChange={handleManufacturerChange} // Add the onChange handler
                options={allManufacturers ? allManufacturers : []}
                getOptionLabel={(option) =>
                  languageText === "en" ? option.nameEn : option.nameAr
                }
                value={
                  allManufacturers?.find(
                    (manufacturer) => manufacturer.id === selectedManufacturer
                  ) || null
                }
                renderInput={(params) => (
                  <TextField
                    dir={languageText === "ar" ? "rtl" : "ltr"}
                    {...params}
                    label={t("EditBooking.manufacturer")}
                  />
                )}
                // Use a unique key for each option
                renderOption={(props, option) => (
                  <li
                    dir={languageText === "ar" ? "rtl" : "ltr"}
                    {...props}
                    key={option.id}
                  >
                    {/* {option.nameAr} */}
                    {languageText === "en" ? option.nameEn : option.nameAr}
                  </li>
                )}
                disabled={isPending || isSuccess}
                clearOnBlur={false}
                clearIcon={null}
                noOptionsText={
                  allManufacturers === null
                    ? t("EditBooking.loading")
                    : t("EditBooking.noOptionsAvailable")
                }
              />

              {/*  سنة الصنع */}
              <TextField
                sx={{ backgroundColor: "#fff", marginTop: "16px" }}
                dir={languageText === "ar" ? "rtl" : "ltr"}
                required
                fullWidth
                select
                label={t("EditBooking.yearOfManufacture")}
                value={selectedYear}
                onChange={handleYearChange}
                disabled={isPending || isSuccess}
              >
                {years && years.length > 0 ? (
                  years.map((year) => (
                    <MenuItem
                      dir={languageText === "ar" ? "rtl" : "ltr"}
                      key={year.id}
                      value={year.id}
                    >
                      {year.year}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem
                    dir={languageText === "ar" ? "rtl" : "ltr"}
                    value=""
                  >
                    {t("EditBooking.loading")}
                  </MenuItem>
                )}
              </TextField>

              <div className={style.date_and_time_container}>
                {/* تاريخ */}
                <div
                  dir={languageText === "ar" ? "rtl" : "ltr"}
                  className={style.datePickerContainer}
                >
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    adapterLocale="en"
                  >
                    <DemoContainer components={["MobileDatePicker"]}>
                      <MobileDatePicker
                        dir={languageText === "ar" ? "rtl" : "ltr"}
                        sx={{
                          backgroundColor: "#fff",
                          width: "100%",
                        }}
                        label={t("EditBooking.examinationDate")}
                        format="DD/MM/YYYY"
                        value={date}
                        onChange={(newValue) => setDate(newValue)}
                        minDate={dayjs()}
                        required
                        disabled={isPending || isSuccess}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>

                {/* الوقت */}
                <div
                  dir={languageText === "ar" ? "rtl" : "ltr"}
                  className={style.datePickerContainer}
                >
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    adapterLocale="en"
                  >
                    <DemoContainer components={["MobileTimePicker"]}>
                      <MobileTimePicker
                        dir={languageText === "ar" ? "rtl" : "ltr"}
                        sx={{
                          backgroundColor: "#fff",
                          width: "100%",
                        }}
                        label={t("EditBooking.examinationTime")}
                        // format=""
                        value={time}
                        onChange={(newValue) => setTime(newValue)}
                        required
                        disabled={isPending || isSuccess}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
              </div>
              <p
                dir={languageText === "ar" ? "rtl" : "ltr"}
                style={{
                  fontSize: "14px",
                  padding: "3px 3px 0 0",
                  color: "#757575",
                }}
              >
                {t("EditBooking.chooseTheTimeFromNineAmToNinePm")}
              </p>

              {/*  نوع الخدمة */}
              <TextField
                sx={{ backgroundColor: "#fff", marginTop: "16px" }}
                dir={languageText === "ar" ? "rtl" : "ltr"}
                required
                fullWidth
                select
                label={t("EditBooking.typeOfService")}
                value={selectedServiceId}
                onChange={handleServicesChange}
                disabled={isPending || isSuccess}
              >
                {allServices && allServices.length > 0 ? (
                  allServices.map((service) => (
                    <MenuItem
                      dir={languageText === "ar" ? "rtl" : "ltr"}
                      key={service.id}
                      value={service.id}
                    >
                      {/* {service.nameAr} */}
                      {languageText === "en"
                        ? service?.nameEn
                        : service?.nameAr}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem
                    dir={languageText === "ar" ? "rtl" : "ltr"}
                    value=""
                  >
                    {t("EditBooking.loading")}
                  </MenuItem>
                )}
              </TextField>

              {/* Display the descriptionAr of the selected service */}
              {selectedServiceId && (
                <div className={style.description}>
                  {selectedService && (
                    <pre>
                      {(languageText === "en"
                        ? selectedService?.descriptionEn
                        : selectedService?.descriptionAr
                      )?.replace(/(\d+)[.-]\s*/g, "$1. ")}
                    </pre>
                  )}
                </div>
              )}

              {/* Button */}
              <LoadingButton
                onClick={submitEditForm}
                style={{ marginTop: "32px" }}
                variant="contained"
                size="large"
                loading={isPending}
              >
                {t("EditBooking.edit")}
                {/* {selectedServiceId && (
                  <span style={{ paddingRight: "9px" }}>
                    ({selectedService?.pricing} ريال تقريبا)
                  </span>
                )} */}
              </LoadingButton>
            </FormControl>
          </Box>
        </>
      )}
    </div>
  );
}
