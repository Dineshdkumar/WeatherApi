import React, { useEffect, useState } from "react";
import { FaCloud, FaTemperatureFull, FaWind } from "react-icons/fa6";
import { GiSunrise, GiSunset } from "react-icons/gi";
import { MdOutlineArrowDownward, MdOutlineArrowUpward } from "react-icons/md";
import { WiHumidity } from "react-icons/wi";

const TemperatureDetails = ({
  weather: {
    details,
    icon,
    temp,
    temp_min,
    temp_max,
    sunrise,
    sunset,
    humidity,
    speed,
    feels_like,
  },
  units,
}) => {
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
      <div className="py-3">
        <div className=" ">
          <p className="text-blue-100 font-mono text-center">{details}</p>
        </div>
        <div className="flex justify-evenly items-center  ">
          <div>
            <img src={icon} className="w-[80px] h-[80px] my-1" alt="" />
          </div>
          <h1 className="text-white text-2xl font-bold ml-16">
            {temp.toFixed()}&deg;{degree}
          </h1>
          <div className="text-white">
            <div className="flex items-center gap-2">
              <FaTemperatureFull />
              <p>
                Real Fell : {feels_like.toFixed()}&deg;{degree}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <WiHumidity />
              <p>Humidity : {humidity.toFixed()} %</p>
            </div>
            <div className="flex items-center gap-2">
              <FaWind />
              <p>Wind : {speed.toFixed()} km/h</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-4 items-center text-white gap-2">
          <div className="flex items-center gap-2 ">
            <GiSunrise size={22} />
            <p className=" text-sm">Rise : {sunset}</p>
            <p className="ml-1">|</p>
          </div>
          <div className="flex items-center gap-2">
            <GiSunset size={22} />
            <p className=" text-sm">Set : {sunrise}</p>
            <p className="ml-1">|</p>
          </div>
          <div className="flex items-center gap-2">
            <MdOutlineArrowUpward size={22} />
            <p className=" text-sm">
              High: {temp_max.toFixed()}&deg;{degree}
            </p>
            <p className="ml-1">|</p>
          </div>
          <div className="flex items-center  gap-2">
            <MdOutlineArrowDownward size={22} />
            <p className=" text-sm">
              Low: {temp_min.toFixed()}&deg;{degree}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TemperatureDetails;
