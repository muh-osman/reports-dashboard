import style from "./Prices.module.scss";
// MUI
import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import LoadingButton from "@mui/lab/LoadingButton";
import LinearProgress from "@mui/material/LinearProgress";
// API
import useSearchApi from "../../API/useSearchApi";
import useGetPricesApi from "../../API/useGetPricesApi";

const marks = [
  {
    value: 2009,
    label: "أقدم",
  },
  {
    value: 2010,
    label: "",
  },
  {
    value: 2011,
    label: "",
  },
  {
    value: 2012,
    label: "",
  },
  {
    value: 2013,
    label: "",
  },
  {
    value: 2014,
    label: "",
  },
  {
    value: 2015,
    label: "",
  },
  {
    value: 2016,
    label: "",
  },
  {
    value: 2017,
    label: "",
  },
  {
    value: 2018,
    label: "",
  },
  {
    value: 2019,
    label: "",
  },
  {
    value: 2020,
    label: "",
  },
  {
    value: 2021,
    label: "",
  },
  {
    value: 2022,
    label: "",
  },
  {
    value: 2023,
    label: "",
  },
  {
    value: 2024,
    label: "",
  },
  {
    value: 2025,
    label: "",
  },
  {
    value: 2026,
    label: "2026",
  },
];

export default function Prices() {
  //
  const inputRef = React.useRef(null);
  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  //
  const [trigger, setTrigger] = React.useState(false);
  //
  const { data: models, fetchStatus, isSuccess } = useSearchApi();
  //
  const [selectedModelId, setSelectedModelId] = React.useState(null);
  const handleModelChange = (event, newValue) => {
    setTrigger(false);
    if (newValue) {
      setSelectedModelId(newValue.id); // Set the selected model ID
      console.log("Selected Model ID:", newValue.id); // Log the selected model ID
    } else {
      setSelectedModelId(null); // Reset if no model is selected
    }
  };

  //
  const [selectedYear, setSelectedYear] = React.useState(2018); // State to hold the selected year
  const handleYearChange = (event, newValue) => {
    setTrigger(false);
    setSelectedYear(newValue); // Update the selected year
    console.log("Selected Year:", newValue); // Log the selected year
  };

  const {
    data: prices,
    fetchStatus: pricesFetchStatus,
    isSuccess: isFetchPricesSuccess,
  } = useGetPricesApi(selectedModelId, selectedYear, trigger);

  const handleSubmit = () => {
    if (selectedModelId && selectedYear) {
      setTrigger(true);
    } else {
      console.log("Please select a model and year.");
      alert("Please select a model and year.");
    }
  };

  return (
    <div className={style.container}>
      {fetchStatus === "fetching" && (
        <div className={style.progressContainer}>
          <LinearProgress />
        </div>
      )}

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
        ابحث عن اسم سيارتك, واختر سنة الصنع
      </Typography>

      <div className={style.box}>
        <Autocomplete
          dir="auto"
          sx={{ backgroundColor: "#fff" }}
          ref={inputRef}
          disablePortal
          onChange={handleModelChange} // Add the onChange handler
          options={isSuccess ? models.carModels : []}
          getOptionLabel={(option) => option.model_name}
          renderInput={(params) => <TextField {...params} label="Search" />}
          // Use a unique key for each option
          renderOption={(props, option) => (
            <li {...props} key={option.id}>
              {" "}
              {/* Use option.id as the key */}
              {option.model_name}
            </li>
          )}
        />

        <Box sx={{ width: "85%", margin: "auto", marginTop: "28px" }}>
          {/* <Typography
            variant="h6"
            component="div"
            style={{ textAlign: "center", margin: "auto", color: "#757575" }}
          >
            سنة الصنع
          </Typography> */}
          <Slider
            aria-label="سنة الصنع"
            value={selectedYear} // Set the value of the slider to the selected year
            onChange={handleYearChange} // Add the onChange handler
            valueLabelDisplay="auto"
            step={1}
            marks={marks}
            min={2009}
            max={2026}
          />
        </Box>

        <Box sx={{ marginTop: "32px", textAlign: "center" }}>
          <LoadingButton
            sx={{ maxWidth: "300px" }}
            fullWidth
            type="submit"
            variant="contained"
            disableRipple
            loading={pricesFetchStatus === "fetching"} // Show loading state
            onClick={handleSubmit} // Call handleSubmit on button click
          >
            بحث
          </LoadingButton>
        </Box>
      </div>
    </div>
  );
}
