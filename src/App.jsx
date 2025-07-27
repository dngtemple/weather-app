import { useState } from "react";
import { MdDeviceThermostat, MdOutlineExplore } from "react-icons/md";
import { WiHumidity, WiStrongWind } from "react-icons/wi";
import { FaCloudSun } from "react-icons/fa";

import useFetchCities from "./hooks/useFetchCities.js";
import useWeather from "./hooks/useWeather.js";

export default function App() {
  const [input, setInput] = useState("");
  const [city, setCity] = useState("");

  const { data, loading } = useFetchCities(input);
  const { dataa, loadingg } = useWeather(city);

  return (
    <div className="relative w-full h-dvh overflow-hidden bg-gray-900 text-white">
      {/* Background Video or Image */}
      <video
        autoPlay
        muted
        loop
        className="absolute inset-0 w-full h-full object-cover brightness-75"
      >
        <source src="./video1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm"></div>

      {/* Main Content */}
      <div className="relative z-10 w-full h-full flex flex-col justify-center items-center px-4 sm:px-10">
        {/* Search Section */}
        <div className="w-full max-w-xl mb-8">
          <label className="input input-lg input-bordered flex items-center gap-2 w-full bg-white text-black">
            <input
              type="text"
              placeholder="Search city or country"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="grow outline-none"
            />
            <MdOutlineExplore className="text-xl" />
          </label>

          {input !== "" && (
            <ul className="mt-2 bg-white text-black rounded shadow">
              {loading ? (
                <li className="p-2">Loading...</li>
              ) : data.length > 0 ? (
                data.map((city, index) => (
                  <li
                    key={index}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => setCity(city.name)}
                  >
                    {city.name}, {city.state} {city.country && `- ${city.country}`}
                  </li>
                ))
              ) : (
                <li className="p-2">No results found</li>
              )}
            </ul>
          )}
        </div>

        {/* Weather Info */}
        <div className="text-center mb-10">
          {loadingg ? (
            <span className="loading loading-bars loading-lg text-white"></span>
          ) : (
            <>
              <h1 className="text-4xl font-bold">{city}</h1>
              <h2 className="text-6xl mt-2 font-light">{dataa?.main?.temp}°C</h2>
              <p className="text-xl mt-1 capitalize text-gray-200">
                {dataa?.weather?.[0]?.description || "No weather data"}
              </p>
            </>
          )}
        </div>

        {/* Weather Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-4xl">
          {/* Feels Like */}
          <WeatherCard
            icon={<MdDeviceThermostat className="text-4xl" />}
            title="Feels Like"
            value={`${dataa?.main?.feels_like}°C`}
            loading={loadingg}
          />

          {/* Humidity */}
          <WeatherCard
            icon={<WiHumidity className="text-5xl" />}
            title="Humidity"
            value={`${dataa?.main?.humidity}%`}
            loading={loadingg}
          />

          {/* Wind Speed */}
          <WeatherCard
            icon={<WiStrongWind className="text-5xl" />}
            title="Wind"
            value={`${dataa?.wind?.speed} km/h`}
            loading={loadingg}
          />
        </div>

        <footer className="mt-10 text-gray-400 text-sm">
          Powered by OpenWeatherMap • Designed by Temple 
        </footer>
      </div>
    </div>
  );
}

function WeatherCard({ icon, title, value, loading }) {
  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-2xl flex flex-col items-center justify-center text-center border border-white/20">
      {loading ? (
        <span className="loading loading-ring loading-lg text-white"></span>
      ) : (
        <>
          {icon}
          <h4 className="text-2xl mt-2 font-semibold">{value}</h4>
          <p className="text-md text-gray-300 mt-1">{title}</p>
        </>
      )}
    </div>
  );
}
