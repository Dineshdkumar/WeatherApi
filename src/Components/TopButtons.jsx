import React from "react";
import "../App.css";
import { Box, Button } from "@mui/material";
const TopButtons = ({ setQuery }) => {
  const cities = [
    {
      cityId: 1,
      cityName: "London",
    },
    {
      cityId: 2,
      cityName: "Sydney",
    },
    {
      cityId: 3,
      cityName: "Mumbai",
    },
    {
      cityId: 4,
      cityName: "Malaysia",
    },
    {
      cityId: 5,
      cityName: "Singapore",
    },
  ];
  const handleClick = (city) => {
    setQuery({ q: city.cityName });
  };
  return (
    <>
      <Box className="py-1">
        <Box className="flex gap-11 items-center justify-center my-2 shadow-black">
          {cities.map((city, index) => (
            <Button
              variant="text"
              key={index}
              sx={{ color: "white" }}
              className="shadow-black"
              onClick={() => handleClick(city)}
            >
              {city.cityName}
            </Button>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default TopButtons;
