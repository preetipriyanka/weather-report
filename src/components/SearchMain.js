import React, { useState, useEffect } from "react";
import WeatherDetails from "./WeatherDetails";

import "../components/style.css";

function SearchMain() {
  const [searchTerm, setSearchTerm] = useState("Mumbai");
  const [weatherTempInfo, setWeatherTempInfo] = useState({});

  const getWeatherInfo = async () => {
    try {
      let url = `http://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=metric&appid=b272527c2010d5eb958794696f7cfd95`;

      let res = await fetch(url);
      let data = await res.json();
      //   console.log(data);
      const { temp, humidity, pressure } = data.main;
      const { main: weatherType } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;
      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weatherType,
        name,
        speed,
        country,
        sunset,
      };

      setWeatherTempInfo(myNewWeatherInfo);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getWeatherInfo();
  }, []);

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="Search City"
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="searchButton" onClick={getWeatherInfo}>
          Search
        </button>
      </div>
      <WeatherDetails {...weatherTempInfo}/>
    </>
  );
}

export default SearchMain;
