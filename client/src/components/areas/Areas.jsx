import React, { useContext, useState } from "react";

import ProvidedAreas from "./ProvidedAreas";
import SearchBar from "../generic/SearchBar";
import AvailableAreas from "./AvailableAreas";
import { ThemeContext } from "../../contexts/ThemeContext";
import Infobar from "../generic/infobar";

const Areas = (props) => {
    const [searchData, setSearchData] = useState("");

    // Themes
    const { isLightTheme, theme } = useContext(ThemeContext);
    const syntax = isLightTheme ? theme.light.syntax : theme.dark.syntax;

    const handleChange = (e) => setSearchData(e.target.value);

    return (
        <div className={"text-center" + syntax}>
            <Infobar>Add your service area</Infobar>
            <SearchBar
                handleChange={handleChange}
                placeholder="Search areas...."
            />

            <Infobar>Your Areas</Infobar>
            {/* <h4 className="pb-4">Your Areas</h4> */}
            <div className="my-4">
                <ProvidedAreas searchData={searchData} />
            </div>

            <Infobar>Available Areas</Infobar>
            {/* <h4 className="pb-4">Available Areas</h4> */}
            <div className="my-4">
                <AvailableAreas searchData={searchData} />
            </div>
        </div>
    );
};

export default Areas;
