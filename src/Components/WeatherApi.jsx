import axios from "axios";
import { DateTime } from "luxon";

const KEY = "5d59e6156a78262d32c8d6e0b658e528";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const getWeatherData = (infoType, searchParams) => {
  const url = new URL(BASE_URL + "/" + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: KEY });

  return fetch(url).then((res) => res.json());
};

const formatCurrentWeather = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
    timezone,
  } = data;

  const { main: details, icon } = weather[0];
  const formattedLocalTime = formatToLocalTime(dt, timezone);
  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    dt,
    formattedLocalTime,
    country,
    sunrise: formatToLocalTime(sunrise, timezone, "hh:mm a"),
    sunset: formatToLocalTime(sunset, timezone, "hh:mm a"),
    details,

    icon: iconUrlFromCode(icon),
    speed,
    timezone,
  };
};
const formatForecastWeather = (secs, zone, data) => {
  // Filtering hourly data: get data for timestamps after 'secs'
  const hourly = data
    .filter((f) => f.dt > secs)
    .map((f) => ({
      temp: f.main.temp,
      title: formatToLocalTime(f.dt, zone, "hh:mm a"), // Format time using the correct zone
      icon: iconUrlFromCode(f.weather[0].icon),
      date: formatToLocalTime(f.dt, zone, "cccc, dd LLL yyyy"), // Add full date for reference
    }))
    .slice(0, 5); // Only take the first 5 hourly entries

  // Filtering daily data: get entries where the time is midnight (00:00:00)
  const daily = data
    .filter((f) => f.dt_txt.slice(-8) === "00:00:00")
    .map((f) => ({
      temp: f.main.temp,
      title: formatToLocalTime(f.dt, zone, "ccc"), // Use the weekday format
      icon: iconUrlFromCode(f.weather[0].icon),
      date: formatToLocalTime(f.dt, zone, "cccc, dd LLL yyyy"), // Add full date for daily entries
    }));

  return { hourly, daily };
};

const getFormattedWeatherData = async (searchParams) => {
  const formattedCurrentWeather = await getWeatherData(
    "weather",
    searchParams
  ).then(formatCurrentWeather);

  const { lat, lon, dt, timezone } = formattedCurrentWeather;

  const formattedForecastWeather = await getWeatherData("forecast", {
    lat,
    lon,
    units: searchParams.units,
  }).then((d) => formatForecastWeather(dt, timezone, d.list));

  return { ...formattedCurrentWeather, ...formattedForecastWeather };
};

const formatToLocalTime = (
  secs = Math.floor(Date.now() / 1000),
  zone,
  format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrlFromCode = (code) =>
  `http://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;

export { formatToLocalTime, iconUrlFromCode };
