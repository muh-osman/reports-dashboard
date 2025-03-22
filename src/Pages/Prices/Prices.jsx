import style from "./Prices.module.scss";
// MUI
import * as React from "react";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Paper from "@mui/material/Paper";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { debounce } from "@mui/material/utils";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

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

function CustomPaper(props) {
  return <Paper {...props}>{props.children}</Paper>;
}

CustomPaper.propTypes = {
  children: PropTypes.node,
};

const fetchCarModels = debounce(async (input, callback) => {
  try {
    const response = await fetch(
      "https://cashif.online/back-end/public/api/car-models/limited-general-search",
      {
        method: "POST", // Set the method to POST
        headers: {
          "Content-Type": "application/json", // Set the content type
        },
        body: JSON.stringify({ search: input }), // Include the input in the request body if needed
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    // Assuming the API returns an array of car models
    const filteredModels = data.carModels.filter((model) =>
      model.model_name.toLowerCase().includes(input.toLowerCase())
    );

    callback(
      filteredModels.map((model) => ({
        id: model.id,
        description: model.model_name,
      }))
    );
  } catch (error) {
    console.error("Error fetching car models:", error);
    callback([]); // Return an empty array on error
  }
}, 400);

export default function Prices() {
  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState("");
  const [options, setOptions] = React.useState([]);
  const inputRef = React.useRef(null); // Create a ref for the TextField

  React.useEffect(() => {
    if (inputValue === "") {
      setOptions([]);
      return;
    }

    fetchCarModels(inputValue, (results) => {
      setOptions(results);
    });
  }, [inputValue]);

  React.useEffect(() => {
    // Focus the TextField when the component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue) {
      console.log("Selected Car ID:", newValue.id); // Log the ID of the selected car
    }
  };

  return (
    <div className={style.container}>
      <Typography
        variant="h6"
        component="div"
        style={{ textAlign: "center", margin: "20px", color: "#757575" }}
      >
        ابحث عن اسم سيارتك
      </Typography>

      <div className={style.box}>
        <Autocomplete
          dir="auto"
          getOptionLabel={(option) => option.description}
          options={options}
          autoComplete
          includeInputInList
          filterSelectedOptions
          value={value}
          noOptionsText="لا يوجد خيارات"
          onChange={handleChange} // Use the handleChange function
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          isOptionEqualToValue={(option, value) =>
            option.description === value.description
          } // Custom equality check
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search"
              fullWidth
              inputRef={inputRef}
            />
          )}
          renderOption={(props, option) => (
            <li {...props}>
              <Grid container sx={{ alignItems: "center" }}>
                <Grid sx={{ display: "flex", width: 44 }}>
                  <DirectionsCarIcon sx={{ color: "text.secondary" }} />
                </Grid>
                <Grid
                  sx={{ width: "calc(100% - 44px)", wordWrap: "break-word" }}
                >
                  <Typography variant="body1">{option.description}</Typography>
                </Grid>
              </Grid>
            </li>
          )}
          PaperComponent={CustomPaper}
        />

        <Box sx={{ width: "80%", margin: "auto", marginTop: "32px" }}>
          <Typography
            variant="h6"
            component="div"
            style={{ textAlign: "center", margin: "auto", color: "#757575" }}
          >
            سنة الصنع
          </Typography>
          <Slider
            aria-label="سنة الصنع"
            defaultValue={2018}
            valueLabelDisplay="auto"
            shiftStep={1}
            step={1}
            marks={marks}
            min={2009}
            max={2026}
          />
        </Box>
      </div>
    </div>
  );
}
