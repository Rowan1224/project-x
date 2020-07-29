import React, { useState, useContext } from "react";
import DropDown from "./dropDown";
import { LocationContext } from "../../../contexts/LocationContext";

const LocationDropDown = () => {
  const { dummyLocation, changeLocation } = useContext(LocationContext);

  const json = sessionStorage.getItem("location");
  const localLocation = JSON.parse(json)
    ? JSON.parse(json)
    : { district: "", area: "" };

  const [district, setDistrict] = useState(localLocation.district);
  const [area, setArea] = useState(localLocation.area);
  const [areas, setAreas] = useState(dummyLocation[localLocation.district]);

  const districts = Object.keys(dummyLocation);

  const handleDistrictSelect = (e) => {
    setArea("");
    setDistrict(e);
    setAreas(dummyLocation[e]);
    changeLocation(e, "");
  };

  const handleAreaSelect = (e) => {
    setArea(e);
    changeLocation(district, e);
  };

  return (
    <div>
      <div className="text-center">
        <h2>
          Why fear, when{" "}
          <span style={{ fontFamily: "MuseoModerno" }}>ProjectX</span> is here!
        </h2>
      </div>
      <div className="row mt-5">
        <div className="col-md-6">
          <DropDown
            title={district ? district : "District"}
            values={districts ? districts : []}
            handleSelect={handleDistrictSelect}
            status=""
          />
        </div>
        <div className="col-md-6">
          <DropDown
            title={area ? area : "Area"}
            values={areas ? areas : []}
            handleSelect={handleAreaSelect}
            status={!district}
          />
        </div>
        {/* <Button
          size="lg"
          variant="success"
          type="submit"
          className="col-sm mb-2 mx-3"
        >
          Search
        </Button> */}
      </div>
    </div>
  );
};

export default LocationDropDown;
