import React, { useState } from "react";

function WeatherApp() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [emptyInput, setEmptyInput] = useState(false);

  const checkWeather = async () => {
    const api_key = "7c27471e11a178d63e9da06519dc4f7c";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      setWeatherData(data);

      if (data.cod === "404") {
        setNotFound(true);
      } else {
        setNotFound(false);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setNotFound(true);
    }
  };

  const handleSearchClick = () => {
    if (!city.trim()) {
      setEmptyInput(true);
    } else {
      setEmptyInput(false);
      checkWeather();
    }
  };

  const getWeatherImage = (weather) => {
    switch (weather) {
      case "Clouds":
        return "./src/assets/cloud.png";
      case "Clear":
        return "./src/assets/clear.png";
      case "Rain":
        return "./src/assets/rain.png";
      case "Mist":
        return "./src/assets/mist.png";
      case "Snow":
        return "./src/assets/snow.png";
      case "Thunderstorm":
        return "./src/assets/thunder.png";
      default:
        return "./src/assets/default.png";
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="min-h-fit mx-2 my-12 p-12 bg-l-gray shadow-lg rounded-xl">
        <div className="text-center mb-5">
          <div className="flex justify-center items-center">
            <input
              type="text"
              placeholder="Enter a location..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="p-3 w-5/6 rounded-md outline-none shadow-lg"
            />
            <button
              className="fa-solid fa-magnifying-glass bg-n-blue hover:bg-h-blue text-l-gray border-none rounded-r-lg p-3"
              onClick={handleSearchClick}
            ></button>
          </div>
          {emptyInput && (
            <p className="text-red-500 mt-2">Please enter a location</p>
          )}
        </div>

        {notFound ? (
          <div className="flex-col capitalize items-center">
            <h1 className="m-6 mt-20 font-bold text-3xl text-center">
              {weatherData.message}!!!
            </h1>
            <img className="mx-auto" src="./src/assets/404.png" alt="404" />
          </div>
        ) : weatherData ? (
          <div className="text-center text-lg p-7">
            <img
              src={getWeatherImage(weatherData.weather[0].main)}
              alt="weather-image"
              className="w-24 h-auto my-5 mx-auto"
            />
            <div className="mb-5">
              <p className="text-5xl">
                {Math.round(weatherData.main.temp - 273.15)}
                <sup className="text-2xl">&deg;C</sup>
              </p>
              <p className="text-2xl text-gray-600 mt-2.5 capitalize">
                {weatherData.weather[0].description}
              </p>
            </div>
            <div className="flex justify-between mt-20">
              <div className="flex items-center text-lg">
                <i className="fa-solid fa-droplet text-2xl me-2.5"></i>
                <div className="flex flex-col items-center">
                  <span className="text-xl font-semibold">
                    {weatherData.main.humidity}%
                  </span>
                  <p className="m-0 text-gray-600">Humidity</p>
                </div>
              </div>
              <div className="flex items-center text-lg ">
                <i className="fa-solid fa-wind text-2xl me-2.5"></i>
                <div className="flex flex-col items-center">
                  <span className="text-xl font-semibold">
                    {weatherData.wind.speed}Km/H
                  </span>
                  <p className="m-0 text-gray-600">Wind Speed</p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default WeatherApp;
