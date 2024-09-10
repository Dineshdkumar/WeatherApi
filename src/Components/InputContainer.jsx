import React, { useState } from "react";
import { Input, InputLabel } from "@mui/material";
import {
  IoLocationOutline,
  IoLocationSharp,
  IoSearchOutline,
  IoSearchSharp,
} from "react-icons/io5";
import { RiCelsiusFill, RiFahrenheitLine } from "react-icons/ri";
const InputContainer = ({ setQuery, setUnits }) => {
  const [city, setCity] = useState("");

  const handleSearchClick = () => {
    if (city != "") {
      setQuery({ q: city });
    }
  };
  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setQuery({ lat: latitude, lon: longitude });
      });
    }
  };
  return (
    <>
      <div className="flex flex-row items-center text-white justify-center  gap-8">
        <Input
          placeholder="Search..."
          type="text"
          value={city}
          className="bg-white w-[50%] focus:outline-none capitalize placeholder:lowercase"
          onChange={(e) => setCity(e.target.value)}
        />
        <IoSearchSharp
          size={21}
          className="cursor-pointer hover:scale-150"
          onClick={handleSearchClick}
        />
        <IoLocationSharp
          size={21}
          className="cursor-pointer hover:scale-150"
          onClick={handleLocation}
        />
        <span className="flex items-center gap-1">
          <RiCelsiusFill
            size={21}
            onClick={() => setUnits("metric")}
            className="cursor-pointer hover:scale-125"
          />
          <p className="mb-1 ">|</p>
          <RiFahrenheitLine
            size={21}
            onClick={() => setUnits("imperial")}
            className="cursor-pointer hover:scale-125"
          />
        </span>
      </div>
    </>
  );
};

export default InputContainer;
