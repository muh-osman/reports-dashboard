import style from "./Booking.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useEffect } from "react";
// npm install --save html-to-image --legacy-peer-deps
import { toPng } from "html-to-image"; //html-to-image library
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
import Modal from "@mui/material/Modal";
// MUI Icons
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MinorCrashIcon from "@mui/icons-material/MinorCrash";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import StyleIcon from "@mui/icons-material/Style";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";
// Lang
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";
//
import dayjs from "dayjs";
// Cookies
import { useCookies } from "react-cookie";
// Logo
import logo from "../../Assets/Images/logo.webp";
// API
import useGetAllBranchesApi from "../../API/useGetAllBranchesApi";
import useGetAllManufacturerApi from "../../API/useGetAllManufacturerApi";
import useGetAllCarModelsApi from "../../API/useGetAllCarModelsApi";
import useGetServices from "../../API/useGetServices";
import useGetFullDataOfClientApi from "../../API/useGetFullDataOfClientApi";
import { useGetAppointmentApi } from "../../API/useGetAppointmentApi";
import { useDeleteAppointmentApi } from "../../API/useDeleteAppointmentApi";
import { usePostApoinmentFormApi } from "../../API/usePostApoinmentFormApi";
//
import { toast } from "react-toastify";

export default function Booking() {
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
  // Full Data Of Client
  const { data: fullDataOfClient } = useGetFullDataOfClientApi();

  // Branches
  const { data: allBranches } = useGetAllBranchesApi();
  // Manufacturers
  const { data: allManufacturers } = useGetAllManufacturerApi();
  // Models
  const { data: allCarModels } = useGetAllCarModelsApi();
  // Services
  const { data: allServices } = useGetServices();
  // Appointment
  const {
    mutate: getAppointments,
    data: allAppointment,
    status: fetchAppointmentStatus,
  } = useGetAppointmentApi();

  // console.log(allAppointment?.items);

  const appointmentQueryParams = {
    itemsPerPage: 999,
    currentPage: 0,
    textSearch: "",
    status: 7,
    from: null,
    to: null,
    clientId: null,
    plateNumber: null,
    branchId: null,
  };

  useEffect(() => {
    getAppointments(appointmentQueryParams);
  }, []);

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
      setSelectedModelId(null);
      setSelectedCarClassId(null); // Clear the carClassId
    } else {
      setSelectedManufacturer(null);
      setSelectedModelId(null);
      setSelectedCarClassId(null);
    }
  };

  // Model
  const [selectedModelId, setSelectedModelId] = React.useState("");
  const [selectedCarClassId, setSelectedCarClassId] = React.useState(null);

  const handleModelChange = (event, newValue) => {
    if (newValue) {
      setSelectedModelId(newValue.id);
      setSelectedCarClassId(newValue.carClassId); // Store the carClassId
    } else {
      setSelectedModelId(null);
      setSelectedCarClassId(null); // Clear the carClassId
    }
  };

  // Filter models based on selected manufacturer
  const filteredModels = selectedManufacturer
    ? allCarModels?.filter(
        (model) => model.carManufacturerId === selectedManufacturer
      )
    : [];

  // Transmission
  const [selectedTransmissionID, setSelectedTransmissionID] =
    React.useState("");
  const handleTransmissionChange = (event) => {
    setSelectedTransmissionID(event.target.value || null);
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
  // Submit Modal
  const [openBookingModal, setOpenBookingModal] = React.useState(false);
  const handleBookingModalOpen = () => setOpenBookingModal(true);
  const handleBookingModalClose = () => setOpenBookingModal(false);

  // Function to convert modal to image and download it
  const modalRef = useRef(null);
  const saveModalAsImage = () => {
    if (openBookingModal) {
      // Add small delay to ensure modal is fully rendered
      setTimeout(() => {
        toPng(modalRef.current, {
          backgroundColor: "#f0f1f3",
          style: {
            transform: "none", // Override any transforms
          },
          // width: modalRef.current.offsetWidth * 2, // Double the width for higher quality
          // height: modalRef.current.scrollHeight * 2, // Capture full height
          quality: 1, // Maximum quality
        })
          .then((dataUrl) => {
            // Create a filename with date and time
            const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
            const filename = `reservation-details-${timestamp}.png`;

            // Create a download link
            const link = document.createElement("a");
            link.download = filename;
            link.href = dataUrl;
            link.click();

            // Show success notification
            // setSnackbarMessage(t("Booking.reservationImageSaved"));
            // setSnackbarSeverity("success");
            // setSnackbarOpen(true);
          })
          .catch((error) => {
            console.error("Error saving modal as image:", error);
            // setSnackbarMessage(t("Booking.errorSavingImage"));
            // setSnackbarSeverity("error");
            // setSnackbarOpen(true);
          });
      }, 500); // 500ms delay to ensure modal is rendered
    }
  };

  // Effect to automatically save the modal as image when it opens
  React.useEffect(() => {
    saveModalAsImage();
  }, [openBookingModal]);

  const {
    mutate: PostApoinmentFormMutate,
    isPending: isPostApoinmentFormMutatePending,
    isSuccess: isPostApoinmentFormMutateSuccess,
  } = usePostApoinmentFormApi();

  // Modal Data
  const [selectedDataForModal, setSelectedDataForModal] = React.useState({
    branch: "",
    manufacturer: "",
    year: "",
    date: "",
    time: "",
    service: "",
  });

  const [timeError, setTimeError] = React.useState(false);
  const validateTime = (newTime) => {
    const now = dayjs();
    const selectedTime = dayjs(newTime);
    const isToday = date ? dayjs(date).isSame(now, "day") : false;

    const minTime = selectedBranch === 19 || selectedBranch === 20 ? 8 : 10;
    const maxTime = selectedBranch === 19 || selectedBranch === 20 ? 23.5 : 22;

    // Check if time is between minTime of branch and maxTime of branch
    if (
      selectedTime.hour() < minTime ||
      selectedTime.hour() + selectedTime.minute() / 60 > maxTime
    ) {
      setTimeError(true);
      toast.warn(t("Booking.timeValidationForWorkHores"));
      return false;
    }

    // Check if selected time is at least 1 hour after minTime
    const minTimeWithBuffer = dayjs().hour(minTime).minute(0).add(59, "minute");
    if (selectedTime.isBefore(minTimeWithBuffer)) {
      setTimeError(true);
      toast.warn(t("Booking.timeValidationMinBufferZone"));
      return false;
    }

    // Check if selected time is at least 1 hour before maxTime
    const maxTimeWithBuffer = dayjs()
      .hour(maxTime)
      .minute(selectedBranch === 19 || selectedBranch === 20 ? 30 : 0)
      .subtract(1, "hour");

    if (selectedTime.isAfter(maxTimeWithBuffer)) {
      setTimeError(true);
      toast.warn(t("Booking.timeValidationMaxBufferZone"));
      return false;
    }

    // Check if selected time is NOT in the past time (for today only)
    if (isToday && selectedTime.isBefore(now)) {
      setTimeError(true);
      toast.warn(t("Booking.timeValidationPastTime"));
      return false;
    }

    // Check if selected time is at least 1 hour from now (for today only)
    const oneHourFromNow = now.add(1, "hour");
    if (isToday && selectedTime.isBefore(oneHourFromNow)) {
      setTimeError(true);
      toast.warn(t("Booking.timeValidation1Hour"));
      return false;
    }

    // If all validations pass
    setTimeError(false);

    return true;
  };

  const submitForm = async () => {
    // Format the date and time using dayjs
    let dateAfterFormat = date
      ? dayjs(date).format("YYYY-MM-DDTHH:mm:ss.SSSSSS")
      : null;
    let timeAfterFormat = time ? dayjs(time).format("HH:mm:ss") : null;

    // Validate the selected time
    if (!validateTime(time)) {
      return; // Stop form submission if validation fails
    }

    //////////////////////////////
    // Store selected data for modal
    const selectedBranchObj = allBranches?.find(
      (b) => b.id === parseInt(selectedBranch)
    );
    const selectedManufacturerObj = allManufacturers?.find(
      (m) => m.id === parseInt(selectedManufacturer)
    );
    const selectedServiceObj = allServices?.find(
      (s) => s.id === parseInt(selectedServiceId)
    );

    setSelectedDataForModal({
      branch:
        languageText === "en"
          ? selectedBranchObj?.nameEn
          : selectedBranchObj?.nameAr,
      manufacturer:
        languageText === "en"
          ? selectedManufacturerObj?.nameEn
          : selectedManufacturerObj?.nameAr,
      year: selectedYear,
      date: dateAfterFormat,
      time: timeAfterFormat,
      service:
        languageText === "en"
          ? selectedServiceObj?.nameEn
          : selectedServiceObj?.nameAr,
    });
    /////////////////////////////
    const data = {
      card: {
        checkPlace: 1,
        carManufacturerId: selectedManufacturer,
        carModelId: selectedModelId,
        carClassId: selectedCarClassId,
        gearType: selectedTransmissionID,
        cardStatus: 7, // mean -> appoinment
        branchId: selectedBranch,
        totalCost: 0,
        year: selectedYear,
        servicesCard: [
          {
            serviceId: selectedServiceId,
            price: 0,
          },
        ],
        checkDate: dateAfterFormat,
        checkTime: timeAfterFormat,
      },
      client: {
        name: fullDataOfClient?.name,
        phoneNumber: fullDataOfClient?.phoneNumber,
        resourceId: fullDataOfClient?.resourceId || 1,
        categoryId: 1,
        // 1=>indvisual, 2=> company
        type: fullDataOfClient?.type === "INDIVIDUAL" ? 1 : 2,
        countryCode: "sa",

        // Company Section
        ...(fullDataOfClient?.type !== "INDIVIDUAL" && {
          email: fullDataOfClient?.email || "Not Found",
          taxNumber: fullDataOfClient?.taxNumber || "Not Found",
          commerialRecord: fullDataOfClient?.commerialRecord || "Not Found",
          streetName: fullDataOfClient?.streetName || "Not Found",
          additionalStreetName:
            fullDataOfClient?.additionalStreetName || "Not Found",
          cityName: fullDataOfClient?.cityName || "Not Found",
          postalZone: fullDataOfClient?.postalZone || "Not Found",
          countrySubentity: fullDataOfClient?.countrySubentity || "Not Found",
          buildingNumber: fullDataOfClient?.buildingNumber || "Not Found",
          citySubdivisionName:
            fullDataOfClient?.citySubdivisionName || "Not Found",
        }),
      },
    };

    PostApoinmentFormMutate(data, {
      onSuccess: () => {
        // Re-fetch appointments after successful creation
        getAppointments(appointmentQueryParams);

        // Reset form fields
        setSelectedServiceId("");
        setTime(null);
        setDate(null);
        setSelectedYear("");
        setSelectedManufacturer("");
        setSelectedBranch("");
        setSelectedModelId("");
        setSelectedCarClassId(null);
        setSelectedTransmissionID("");

        // Open the success modal
        handleBookingModalOpen();

        // Scroll to top
        window.scrollTo(0, 0);
      },
    });
  };

  // React.useEffect(() => {
  //   if (isPostApoinmentFormMutateSuccess) {
  //     setSelectedServiceId("");
  //     setTime(null);
  //     setDate(null);
  //     setSelectedYear("");
  //     setSelectedManufacturer("");
  //     setSelectedBranch("");

  //     window.scrollTo(0, 0);
  //   }
  // }, [isPostApoinmentFormMutateSuccess]);

  // Delete Apoinment
  const { mutate: deleteApoinmentMutate } = useDeleteAppointmentApi();
  const [loadingDelete, setLoadingDelete] = React.useState({});

  let handleDeleteApoinment = (id) => {
    const isConfirmed = window.confirm(t("Booking.confirmDelete"));
    if (isConfirmed) {
      setLoadingDelete((prev) => ({ ...prev, [id]: true })); // Set loading for the specific card
      deleteApoinmentMutate(id, {
        onSuccess: () => {
          // Re-fetch appointments after successful deletion
          getAppointments(appointmentQueryParams);
        },
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
        {t("Booking.bookAppointment")}
      </Typography>
      <Box sx={{ minWidth: 120, maxWidth: "400px", margin: "auto" }}>
        {/*  مكان الفحص */}
        <FormControl fullWidth dir={languageText === "ar" ? "rtl" : "ltr"}>
          {/* الفرع  */}
          {!cookies.tokenApp && (
            <TextField
              sx={{ backgroundColor: "#fff" }}
              dir={languageText === "ar" ? "rtl" : "ltr"}
              required
              fullWidth
              select
              label={t("Booking.branch")}
              value=""
              disabled={isPostApoinmentFormMutatePending}
            >
              <MenuItem
                onClick={navToLoginPage}
                dir={languageText === "ar" ? "rtl" : "ltr"}
                value={"notAuth"}
              >
                {t("Booking.pleaseLogInToBookAnAppointment")}
              </MenuItem>
            </TextField>
          )}

          {cookies.tokenApp && (
            <TextField
              sx={{ backgroundColor: "#fff", marginTop: "16px" }}
              dir={languageText === "ar" ? "rtl" : "ltr"}
              required
              fullWidth
              select
              label={t("Booking.branch")}
              value={selectedBranch}
              onChange={handleBranchChange}
              disabled={isPostApoinmentFormMutatePending}
            >
              {allBranches && allBranches.length > 0 ? (
                allBranches
                  .filter(
                    (branch) =>
                      branch.nameAr !== "افتراضي" || branch.nameEn !== "Virtual"
                  ) // Filter out branches with nameAr "افتراضي"
                  .map((branch) => (
                    <MenuItem
                      dir={languageText === "ar" ? "rtl" : "ltr"}
                      key={branch.id}
                      value={branch.id}
                    >
                      {languageText === "en" ? branch?.nameEn : branch?.nameAr}
                    </MenuItem>
                  ))
              ) : (
                <MenuItem dir={languageText === "ar" ? "rtl" : "ltr"} value="">
                  {t("Booking.loading")}
                </MenuItem>
              )}
            </TextField>
          )}

          {/* الشركة المصنعة */}
          {cookies.tokenApp && selectedBranch && (
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
              renderInput={(params) => (
                <TextField
                  dir={languageText === "ar" ? "rtl" : "ltr"}
                  {...params}
                  label={t("Booking.manufacturer")}
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
              disabled={isPostApoinmentFormMutatePending}
              clearOnBlur={false}
              clearIcon={null}
              noOptionsText={
                allManufacturers === null
                  ? t("Booking.loading")
                  : t("Booking.noOptionsAvailable")
              }
            />
          )}

          {/* الموديل */}
          {cookies.tokenApp && selectedManufacturer && (
            <Autocomplete
              className={style.autocomplete_input}
              dir={languageText === "ar" ? "rtl" : "ltr"}
              sx={{ backgroundColor: "#fff", marginTop: "16px" }}
              disablePortal
              onChange={handleModelChange}
              options={filteredModels} // Use the filtered models here
              getOptionLabel={(option) =>
                languageText === "en" ? option.nameEn : option.nameAr
              }
              renderInput={(params) => (
                <TextField
                  dir={languageText === "ar" ? "rtl" : "ltr"}
                  {...params}
                  label={t("Booking.model")}
                />
              )}
              renderOption={(props, option) => (
                <li
                  dir={languageText === "ar" ? "rtl" : "ltr"}
                  {...props}
                  key={option.id}
                >
                  {languageText === "en" ? option.nameEn : option.nameAr}
                </li>
              )}
              disabled={isPostApoinmentFormMutatePending}
              clearOnBlur={false}
              clearIcon={null}
              noOptionsText={
                allCarModels === null
                  ? t("Booking.loading")
                  : t("Booking.noOptionsAvailable")
              }
            />
          )}

          {/*  ناقل الحركة */}
          {cookies.tokenApp && selectedModelId && (
            <TextField
              sx={{ backgroundColor: "#fff", marginTop: "16px" }}
              dir={languageText === "ar" ? "rtl" : "ltr"}
              required
              fullWidth
              select
              label={t("Booking.transmission")}
              value={selectedTransmissionID || ""}
              onChange={handleTransmissionChange}
              disabled={isPostApoinmentFormMutatePending}
            >
              <MenuItem dir={languageText === "ar" ? "rtl" : "ltr"} value={1}>
                {t("Booking.normal")}
              </MenuItem>
              <MenuItem dir={languageText === "ar" ? "rtl" : "ltr"} value={2}>
                {t("Booking.automatic")}
              </MenuItem>
            </TextField>
          )}

          {/*  سنة الصنع */}
          {cookies.tokenApp && selectedTransmissionID && (
            <TextField
              sx={{ backgroundColor: "#fff", marginTop: "16px" }}
              dir={languageText === "ar" ? "rtl" : "ltr"}
              required
              fullWidth
              select
              label={t("Booking.yearOfManufacture")}
              value={selectedYear}
              onChange={handleYearChange}
              disabled={isPostApoinmentFormMutatePending}
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
                <MenuItem dir={languageText === "ar" ? "rtl" : "ltr"} value="">
                  {t("Booking.loading")}
                </MenuItem>
              )}
            </TextField>
          )}

          <div className={style.date_and_time_container}>
            {/* تاريخ */}
            {cookies.tokenApp && selectedYear && (
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
                      fullWidth
                      dir={languageText === "ar" ? "rtl" : "ltr"}
                      sx={{ backgroundColor: "#fff", width: "100%" }}
                      label={t("Booking.examinationDate")}
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
                      fullWidth
                      dir={languageText === "ar" ? "rtl" : "ltr"}
                      sx={{
                        backgroundColor: "#fff",
                        width: "100%",
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: timeError ? "red" : undefined,
                          },
                          "&:hover fieldset": {
                            borderColor: timeError ? "red" : undefined,
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: timeError ? "red" : undefined,
                          },
                        },
                      }}
                      label={t("Booking.examinationTime")}
                      // format=""
                      value={time}
                      onChange={(newValue) => {
                        setTime(newValue);
                        setTimeError(false); // Reset error when user changes the time
                      }}
                      required
                      disabled={isPostApoinmentFormMutatePending}
                      onAccept={(newValue) => {
                        // Only validate when user clicks OK
                        if (validateTime(newValue)) {
                          setTime(newValue);
                        }
                      }}
                      error={timeError}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
            )}
          </div>
          {cookies.tokenApp && selectedYear && (
            <p
              dir={languageText === "ar" ? "rtl" : "ltr"}
              style={{
                fontSize: "14px",
                padding: "3px 3px 0 0",
                color: "#757575",
              }}
            >
              {selectedBranch === 19 || selectedBranch === 20
                ? t("Booking.timeValidationForAlqadisiaAndAlshifa")
                : t("Booking.timeValidationForJeddahAndDammam")}
            </p>
          )}

          {/*  نوع الخدمة */}
          {cookies.tokenApp && time && date && (
            <>
              <TextField
                sx={{ backgroundColor: "#fff", marginTop: "16px" }}
                dir={languageText === "ar" ? "rtl" : "ltr"}
                required
                fullWidth
                select
                label={t("Booking.typeOfService")}
                value={selectedServiceId}
                onChange={handleServicesChange}
                disabled={isPostApoinmentFormMutatePending}
              >
                {allServices && allServices.length > 0 ? (
                  allServices.map((service) => (
                    <MenuItem
                      dir={languageText === "ar" ? "rtl" : "ltr"}
                      key={service.id}
                      value={service.id}
                    >
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
                    {t("Booking.loading")}
                  </MenuItem>
                )}
              </TextField>

              {/* Display the descriptionAr of the selected service */}
              {cookies.tokenApp && selectedServiceId && (
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
              {t("Booking.reservation")}
              {/* {" "}
              <span style={{ paddingRight: "9px" }}>
                ({selectedService?.pricing} ريال تقريبا)
              </span> */}
            </LoadingButton>
          )}
        </FormControl>

        {/* Booking Modal */}
        <Modal
          ref={modalRef}
          open={openBookingModal}
          onClose={handleBookingModalClose}
        >
          <Box
            dir={languageText === "ar" ? "rtl" : "ltr"}
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 310,
              bgcolor: "background.paper",
              p: 2,
              textAlign: "center",
              borderRadius: "16px",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#fff",
              // maxHeight: "80vh",
              overflowY: "hidden",
              overflowX: "hidden",
              border: "3px solid #174545",
              backgroundColor: "#f0f1f3",
              paddingTop: "12px",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "0",
                left: "0",
                height: "100px",
                backgroundColor: "#174545",
                width: "100%",
                zIndex: "-1",
              }}
            ></div>
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

            <div style={{ width: "75px", margin: "auto" }}>
              <img style={{ width: "100%" }} src={logo} alt="cashif logo" />
            </div>

            <div>
              <h1 style={{ fontSize: "24px", marginBottom: "10px" }}>
                {t("Booking.reservationDetails")}
              </h1>
            </div>

            <Card
              sx={{
                position: "relative",
                borderRadius: "9px",
                boxShadow: "none",
                padding: 0,
                backgroundColor: "#fff",
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
                    {selectedDataForModal.branch}
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
                    {selectedDataForModal.manufacturer}
                  </Typography>
                </Box>

                <Box
                  display="flex"
                  alignItems="center"
                  gap={1}
                  marginBottom={"9px"}
                >
                  <HourglassTopIcon style={{ color: "#000000de" }} />
                  <Typography
                    variant="h5"
                    component="div"
                    style={{ fontSize: "14px" }}
                  >
                    {selectedDataForModal.year}
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
                    {selectedDataForModal.time &&
                      new Date(
                        `1970-01-01T${selectedDataForModal.time}`
                      ).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                  </Typography>
                </Box>

                <Box
                  display="flex"
                  alignItems="center"
                  gap={1}
                  marginBottom={"9px"}
                >
                  <CalendarMonthIcon style={{ color: "#000000de" }} />
                  <Typography
                    variant="h5"
                    component="div"
                    style={{ fontSize: "14px" }}
                  >
                    {selectedDataForModal.date &&
                      formatDate(selectedDataForModal.date)}
                  </Typography>
                </Box>

                <Box
                  display="flex"
                  alignItems="center"
                  gap={1}
                  marginBottom={"9px"}
                >
                  <StyleIcon style={{ color: "#000000de" }} />
                  <Typography
                    variant="h5"
                    component="div"
                    style={{ fontSize: "14px" }}
                  >
                    {selectedDataForModal.service}
                  </Typography>
                </Box>

                <Box display="flex" alignItems="center" gap={1}>
                  <DoNotDisturbOnIcon style={{ color: "#d32f2f" }} />
                  <Typography
                    variant="h5"
                    component="div"
                    style={{
                      fontSize: "14px",
                      color: "#d32f2f",
                      textAlign: languageText === "ar" ? "right" : "left",
                    }}
                  >
                    {t("Booking.late15Minutes")}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Modal>
      </Box>

      {/* Booking Cards */}
      <h5
        dir={languageText === "ar" ? "rtl" : "ltr"}
        className={style.last_appointment_title}
      >
        {t("Booking.myReservations")}
      </h5>
      <Divider sx={{ marginBottom: "18px" }} />

      {!cookies.tokenApp ? (
        <Typography
          variant="h6"
          component="div"
          style={{ textAlign: "center", margin: "20px", color: "#757575" }}
        >
          {t("Booking.please")}{" "}
          <Link
            to={`${process.env.PUBLIC_URL}/login`}
            style={{
              color: "#1976d2",
              textDecoration: isHovered ? "underline" : "none",
            }}
            onMouseOver={() => setIsHovered(true)}
            onMouseOut={() => setIsHovered(false)}
          >
            {t("Booking.logIn")}
          </Link>{" "}
          {t("Booking.toViewReservations")}
        </Typography>
      ) : (
        <div
          dir={languageText === "ar" ? "rtl" : "ltr"}
          className={style.appointment_cards_container}
        >
          {allAppointment && allAppointment.items.length > 0 ? (
            allAppointment?.items
              .slice()
              .filter((card) => {
                const cardDate = new Date(card.checkDate);
                const today = new Date();
                today.setHours(0, 0, 0, 0); // Set to start of day for accurate comparison
                return cardDate >= today;
              })
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
                        {/* {card.branchNameAr} */}

                        {languageText === "en"
                          ? card?.branchNameEn
                          : card?.branchNameAr}
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
                        {/* {card.carManufacturerNameAr} */}

                        {languageText === "en"
                          ? card?.carManufacturerNameEn
                          : card?.carManufacturerNameAr}
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
                          `1970-01-01T${card.checkTime}`
                        ).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </Typography>
                    </Box>

                    <Box
                      display="flex"
                      alignItems="center"
                      gap={1}
                      marginBottom={"9px"}
                    >
                      <CalendarMonthIcon style={{ color: "#000000de" }} />
                      <Typography
                        variant="h5"
                        component="div"
                        style={{ fontSize: "14px" }}
                      >
                        {formatDate(card.checkDate)}
                      </Typography>
                    </Box>

                    <Box display="flex" alignItems="center" gap={1}>
                      <DoNotDisturbOnIcon style={{ color: "#d32f2f" }} />
                      <Typography
                        variant="h5"
                        component="div"
                        style={{
                          fontSize: "14px",
                          color: "#d32f2f",
                          textAlign: languageText === "ar" ? "right" : "left",
                        }}
                      >
                        {t("Booking.late15Minutes")}
                      </Typography>
                    </Box>
                  </CardContent>

                  <Divider />

                  <CardActions
                    dir={languageText === "ar" ? "ltr" : "rtl"}
                    sx={{ backgroundColor: "#fdfefe" }}
                  >
                    <Tooltip title={t("Booking.delete")}>
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

                    <Tooltip title={t("Booking.edit")}>
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
              dir={languageText === "ar" ? "rtl" : "ltr"}
              variant="h6"
              component="div"
              style={{ textAlign: "center", margin: "20px", color: "#757575" }}
            >
              {fetchAppointmentStatus === "fetching"
                ? t("Booking.loading")
                : t("Booking.noReservations")}
            </Typography>
          )}
        </div>
      )}
    </div>
  );
}
