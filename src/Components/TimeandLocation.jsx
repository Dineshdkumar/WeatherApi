import React from "react";

const TimeandLocation = ({
  weather: { formattedLocalTime, name, country },
}) => {
  return (
    <>
      <div className="flex justify-center items-center py-2">
        <p className="text-white ">{formattedLocalTime}</p>
      </div>
      <div>
        <h1 className="text-white text-center font-bold text-2xl">
          {name}, {country}
        </h1>
      </div>
    </>
  );
};

export default TimeandLocation;
