import React, { useState, useContext, useEffect } from "react";
import LocationDropDown from "./LocationDropDown";
import { LocationContext } from "../../contexts/LocationContext";
import { ThemeContext } from "../../contexts/ThemeContext";

const SelectLocation = () => {
    const { locationsfs, changeLocation } = useContext(LocationContext);

    const json = sessionStorage.getItem("location");
    const localLocation = JSON.parse(json)
        ? JSON.parse(json)
        : { district: "", thana: "", area: "" };

    const [district, setDistrict] = useState(localLocation.district);
    const [thana, setThana] = useState(localLocation.thana);
    const [area, setArea] = useState(localLocation.area);
    const [thanas, setThanas] = useState([]);
    const [areas, setAreas] = useState([]);

    const districts = Object.keys(locationsfs);

    // componentDidUpdate
    useEffect(() => {
        setAreas(locationsfs[localLocation.district]);
    }, [locationsfs, localLocation.district]);

    const handleDistrictSelect = (e) => {
        setArea("");
        setDistrict(e);
        setAreas(locationsfs[e]);
        changeLocation(e, "");
    };

    const handleThanaSelect = (e) => {
        // setArea("");
        // setDistrict(e);
        // setAreas(locationsfs[e]);
        // changeLocation(e, "");
    };

    const handleAreaSelect = (e) => {
        setArea(e);
        changeLocation(district, e);
    };

    // Themes
    const { isLightTheme, theme } = useContext(ThemeContext);
    const syntax = isLightTheme ? theme.light.syntax : theme.dark.syntax;

    return (
        <div>
            <div className={"text-center mt-2" + syntax}>
                <h2>
                    Why fear, when <span className="logo-text">ProjectX</span>{" "}
                    is here!
                </h2>
            </div>

            <div className="row mt-5">
                <div className="col-sm-12 col-md-4">
                    <LocationDropDown
                        size="lg"
                        status=""
                        customClass="mb-2 w-100"
                        values={districts ? districts : []}
                        handleSelect={handleDistrictSelect}
                        title={district ? district : "District"}
                    />
                </div>
                
                <div className="col-sm-12 col-md-4">
                    <LocationDropDown
                        size="lg"
                        status=""
                        customClass="mb-2 w-100"
                        values={thanas ? thanas : []}
                        title={thana ? thana : "Thana"}
                        handleSelect={handleThanaSelect}
                    />
                </div>

                <div className="col-sm-12 col-md-4">
                    <LocationDropDown
                        size="lg"
                        status={!district}
                        customClass="mb-2 w-100"
                        values={areas ? areas : []}
                        title={area ? area : "Area"}
                        handleSelect={handleAreaSelect}
                    />
                </div>
            </div>
        </div>
    );
};

export default SelectLocation;
