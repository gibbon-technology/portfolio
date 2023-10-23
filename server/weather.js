import directions from "degrees-to-direction";
import config from "./config.js";

export default async (city) => {
  const api_key = config.openweather;
  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;
  const req = await fetch(weatherURL);
  const res = await req.json();

  const { description, icon: iconCode } = res.weather[0];

  const {
    temp,
    feels_like,
    temp_min: low,
    temp_max: high,
    humidity,
  } = res.main;

  const { speed, deg } = res.wind;
  const { sunrise: _sunrise, sunset: _sunset } = res.sys;
  const { dt } = res;

  const __updateTimeDate = new Date(dt * 1000);
  const date = __updateTimeDate.toDateString();
  const updateTime = __updateTimeDate.toLocaleTimeString();
  const sunrise = new Date(_sunrise * 1000).toLocaleTimeString();
  const sunset = new Date(_sunset * 1000).toLocaleTimeString();

  // REMOVE SECONDS FROM TIMES //

  const removeSeconds = (timeString) => {
    const time_split = timeString.split(":");
    const hr = time_split[0];
    const min = time_split[1];
    const am_pm = timeString.slice(-2);
    return `${hr}:${min} ${am_pm.toLowerCase()}`;
  };

  const data = {
    city: city[0].toUpperCase() + city.slice(1),
    temp: Math.round(temp),
    feels_like: Math.round(feels_like),
    low: Math.round(low),
    high: Math.round(high),
    humidity,
    date,
    updateTime: removeSeconds(updateTime),
    sunrise: removeSeconds(sunrise),
    sunset: removeSeconds(sunset),
    speed: Math.round(speed),
    wind_direction: directions(deg),
    description: description.toUpperCase(),
    // icon: `https://openweathermap.org/img/wn/${iconCode}.png`,
    icon: iconCode,
  };

  return data;
};
