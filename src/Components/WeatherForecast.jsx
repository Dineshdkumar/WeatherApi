import React, { useEffect, useState } from "react";
import { FaCloud } from "react-icons/fa6";
import { iconUrlFromCode } from "./WeatherApi";

const WeatherForecast = ({ hourly, daily, units }) => {
  const [degree, setDegree] = useState(["C"]);
  useEffect(() => {
    if (units == "metric") {
      setDegree("C");
    } else {
      setDegree("F");
    }
  }, [units]);
  return (
    <>
      <div className="mt-1">
        <h1 className="uppercase flex ml-20  text-white text-sm font-bold">
          Hourly Forecast
        </h1>

        <hr className="w-[79%] text-center ml-20 mt-2 mb-2" />
        <div className="flex items-center justify-evenly text-white">
          {hourly.map((data) => (
            <div className="flex flex-col justify-center gap-0 items-center">
              <p className="text-xs ">{data.title}</p>
              <img src={data.icon} className="w-10 h-10 my-1 mt-0" alt="" />
              <p className="text-sm ">
                {data.temp.toFixed()}&deg;{degree}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-2 h-25">
        <h1 className="uppercase flex ml-20  text-white text-sm font-bold">
          Daily Forecast
        </h1>

        <hr className="w-[79%] text-center ml-20 mt-2 mb-2" />
        <div className="flex items-center justify-evenly text-white">
          {daily.map((data) => (
            <div className="flex flex-col justify-center gap-0 items-center">
              <p className="text-xs ">{data.title}</p>
              <img src={data.icon} className="w-10 my-1 h-10 mt-0" alt="" />
              <p className="text-sm">
                {data.temp.toFixed()}&deg;{degree}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default WeatherForecast;
