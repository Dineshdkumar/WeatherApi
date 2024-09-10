import React, { useEffect, useState } from "react";
import TopButtons from "./Components/TopButtons";
import InputContainer from "./Components/InputContainer";
import TimeandLocation from "./Components/TimeandLocation";
import TemperatureDetails from "./Components/TemperatureDetails";
import WeatherForecast from "./Components/WeatherForecast";
import getFormattedWeatherData from "./Components/WeatherApi";
import { Alert, Snackbar } from "@mui/material";

const App = () => {
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");

  const [query, setQuery] = useState({ q: "london" });
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  useEffect(() => {
    getWeather();
  }, [query, units]);

  const getWeather = async () => {
    await getFormattedWeatherData({ ...query, units }).then((data) => {
      setWeather(data);
      setOpen(true);
      console.log(data);
    });
  };

  const formatBackground = () => {
    if (!weather) return "from-cyan-700 to-blue-700";
    const threshold = units === "metric" ? 23 : 65;
    if (weather.temp <= threshold) return "from-cyan-700 to-blue-700";
    return "from-yellow-700 to-orange-700";
  };

  return (
    <>
      <div
        className={`mx-auto h-fit max-w-screen-md shadow-md  w-[50%] bg-gradient-to-r ${formatBackground()}`}
      >
        <TopButtons setQuery={setQuery} />
        <InputContainer setQuery={setQuery} setUnits={setUnits} />
        {weather && (
          <>
            <TimeandLocation weather={weather} />
            <Snackbar
              open={open}
              autoHideDuration={3000}
              onClose={handleClose}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <Alert
                onClose={handleClose}
                severity="success"
                variant="filled"
                sx={{ width: "100%" }}
              >
                {query.q} Weather loaded successfully!
              </Alert>
            </Snackbar>
            <TemperatureDetails weather={weather} units={units} />
            <WeatherForecast
              hourly={weather.hourly}
              daily={weather.daily}
              units={units}
            />
          </>
        )}
      </div>
    </>
  );
};

export default App;
