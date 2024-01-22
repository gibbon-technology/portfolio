import { useEffect, useState, useRef } from "react";
import sunriseIcon from "../assets/weatherIcons/sunrise.svg";
import sunsetIcon from "../assets/weatherIcons/sunset.svg";
import windIcon from "../assets/weatherIcons/wind.svg";
import degreesSymbol from "../assets/weatherIcons/degreesC.svg";
import temperatureIcon from "../assets/weatherIcons/temperature.svg";
import useSWR from "swr";
import redrockFetch from "../fetch.js";

const fetcher = () =>
  fetch("/api/base/get-weather?city=Barrie")
    .then((res) => res.json())
    .catch((err) => {
      const error = new Error("Error fetching weather");
      return error;
    });

export default function Weather() {
  const { data, error } = useSWR("/api/base/get-weather?city=Barrie", fetcher, {
    suspense: true,
  });

  const [city, setCity] = useState("Barrie");
  const [weather, setWeather] = useState(data.data);

  const fetchWeather = async () => {
    const data = await redrockFetch(
      `/api/base/get-weather?city=${city}`,
      "get"
    );
    setWeather(data);
  };

  const didMount = useRef(false);
  useEffect(() => {
    if (didMount.current) fetchWeather();
    else didMount.current = true;
  }, [city]);

  const imgStyle = {
    marginRight: "10px",
    width: "25px",
  };

  if (error) return <h1 className="my-5">Error loading weather</h1>;

  return (
    <div
      style={{
        borderRadius: "20px",
        padding: "20px",
        height: "100%",
        width: "100%",
        maxWidth: "600px",
        overflowY: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2 style={{ fontSize: "2rem" }}>{weather.date}</h2>
        <div
          style={{
            width: "75%",
            height: "10px",
            borderRadius: "5px",
            backgroundColor: "#c6e0e9",
          }}
        />
        <h2 className="text-center w-75 mt-3">Weather for {weather.city}</h2>
        <h6
          style={{
            display: weather.city === "Barrie" ? "block" : "none",
            fontWeight: 700,
          }}
        >
          Lake Simcoe water temperature: {weather.waterTemp}
        </h6>

        <div
          style={{
            width: "75%",
            height: "10px",
            borderRadius: "5px",
            backgroundColor: "#c6e0e9",
            margin: "10px 0",
          }}
        />
        <h2>{weather.description}</h2>
        <img
          width="75px"
          height="75px"
          src={`https://gibbontechnology.ca/weatherIcons/${weather.icon}.png`}
          alt="Weather icon"
        />
        <h3>
          <img src={temperatureIcon} alt="Sunrise icon" style={imgStyle} />
          {weather.temp}
          <img src={degreesSymbol} alt="Sunrise icon" style={imgStyle} />
        </h3>
        <h3>
          <img src={windIcon} alt="Sunrise icon" style={imgStyle} />
          {weather.wind_direction} {weather.speed} km/h
        </h3>
        <h3>
          <img src={sunriseIcon} alt="Sunrise icon" style={imgStyle} />
          {weather.sunrise}
        </h3>
        <h3>
          <img src={sunsetIcon} alt="Sunrise icon" style={imgStyle} />
          {weather.sunset}
        </h3>
        <button
          className="btn btn-primary btn-lg w-75 my-3"
          style={{ width: "100%", margin: "20px 0" }}
          onClick={() => setCity(city === "Barrie" ? "Toronto" : "Barrie")}
        >
          Switch to {city === "Barrie" ? "Toronto" : "Barrie"}
        </button>
        <h4>Updated at: {weather.updateTime}</h4>
      </div>
    </div>
  );
}
