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
import useGetAllCarModelsApi from "../../API/useGetAllCarModelsApi";
import useGetServices from "../../API/useGetServices";
import useGetFullDataOfClientApi from "../../API/useGetFullDataOfClientApi";
import { useEditAppointmentApi } from "../../API/useEditAppointmentApi";
// import { useGetAppointmentApi } from "../../API/useGetAppointmentApi";
import useGetOneCardDataApi from "../../API/useGetOneCardDataApi";

// Lang
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";
//
import { toast } from "react-toastify";

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

  // Get All Appointment before edit
  // const {
  //   mutate: getAppointments,
  //   data: allAppointment,
  //   status: fetchAppointmentStatus,
  // } = useGetAppointmentApi();

  // Filter appointments based on the provided id to get spacific appointment
  // const oneAppointmentData = allAppointment?.find(
  //   (appointment) => appointment.id === parseInt(id)
  // );

  // Get One Card Data
  const { data: oneAppointmentData } = useGetOneCardDataApi(id);

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

  React.useEffect(() => {
    if (allCarModels && oneAppointmentData) {
      // Find the model from the appointment data
      const appointmentModel = allCarModels.find(
        (model) => model.id === oneAppointmentData.carModelId
      );

      if (appointmentModel) {
        setSelectedModelId(appointmentModel.id);
        setSelectedCarClassId(appointmentModel.carClassId);
      }
    }
  }, [allCarModels, oneAppointmentData]);

  // Transmission
  const [selectedTransmissionID, setSelectedTransmissionID] =
    React.useState("");
  const handleTransmissionChange = (event) => {
    setSelectedTransmissionID(event.target.value || null);
  };

  React.useEffect(() => {
    if (oneAppointmentData) {
      setSelectedTransmissionID(oneAppointmentData?.gearType || "");
    }
  }, [oneAppointmentData]);

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
    if (oneAppointmentData && oneAppointmentData.checkDate) {
      // Parse the check_Date string and set it to the date state
      const parsedDate = dayjs(oneAppointmentData.checkDate);
      setDate(parsedDate);
    }
  }, [oneAppointmentData]);

  // Time
  const [time, setTime] = React.useState(null);
  React.useEffect(() => {
    if (oneAppointmentData && oneAppointmentData.checkTime) {
      // Parse the check_Time string and set it to the time state
      const [hours, minutes] = oneAppointmentData.checkTime.split(":");
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
    // console.log(oneAppointmentData?.servicesList);

    if (allServices && oneAppointmentData) {
      setSelectedServiceId(oneAppointmentData?.servicesList[0] || "");
    }
  }, [allServices, oneAppointmentData]);

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

  //  Submit Edit
  const { mutate, isPending, isSuccess } = useEditAppointmentApi(id);
  const submitEditForm = () => {
    // Format the date and time using dayjs
    let dateAfterFormat = date
      ? dayjs(date).format("YYYY-MM-DDTHH:mm:ss.SSSSSS")
      : null;
    let timeAfterFormat = time ? dayjs(time).format("HH:mm:ss") : null;

    // Validate the selected time
    if (!validateTime(time)) {
      return; // Stop form submission if validation fails
    }

    let data = {
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

              {/* الموديل */}
              <Autocomplete
                className={style.autocomplete_input}
                dir={languageText === "ar" ? "rtl" : "ltr"}
                sx={{ backgroundColor: "#fff", marginTop: "16px" }}
                disablePortal
                onChange={handleModelChange}
                options={filteredModels || []} // Use the filtered models here
                getOptionLabel={(option) =>
                  languageText === "en" ? option.nameEn : option.nameAr
                }
                value={
                  allCarModels?.find((model) => model.id === selectedModelId) ||
                  null
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
                disabled={isPending || isSuccess || !selectedManufacturer}
                clearOnBlur={false}
                clearIcon={null}
                noOptionsText={
                  allCarModels === null
                    ? t("Booking.loading")
                    : t("Booking.noOptionsAvailable")
                }
              />

              {/*  ناقل الحركة */}
              <TextField
                sx={{ backgroundColor: "#fff", marginTop: "16px" }}
                dir={languageText === "ar" ? "rtl" : "ltr"}
                required
                fullWidth
                select
                label={t("Booking.transmission")}
                value={selectedTransmissionID || ""}
                onChange={handleTransmissionChange}
                disabled={isPending || isSuccess}
              >
                <MenuItem dir={languageText === "ar" ? "rtl" : "ltr"} value={1}>
                  {t("Booking.normal")}
                </MenuItem>
                <MenuItem dir={languageText === "ar" ? "rtl" : "ltr"} value={2}>
                  {t("Booking.automatic")}
                </MenuItem>
              </TextField>

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
                        label={t("EditBooking.examinationTime")}
                        // format=""
                        value={time}
                        onChange={(newValue) => {
                          setTime(newValue);
                          setTimeError(false); // Reset error when user changes the time
                        }}
                        required
                        disabled={isPending || isSuccess}
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
              </div>
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
