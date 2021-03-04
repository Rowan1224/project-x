import React, { useContext, useState } from "react";

import ProvidedAreas from "./ProvidedAreas";
import AvailableAreas from "./AvailableAreas";
import SearchBar from "../../../generic/SearchBar";
import { ThemeContext } from "../../../../contexts/ThemeContext";

const Areas = (props) => {
    const [searchData, setSearchData] = useState("");

    // Themes
    const { isLightTheme, theme } = useContext(ThemeContext);
    const syntax = isLightTheme ? theme.light.syntax : theme.dark.syntax;

    const handleChange = (e) => setSearchData(e.target.value);

    return (
        <div className={syntax}>
            <SearchBar
                handleChange={handleChange}
                placeholder="Search areas...."
            />

            <h4>Your Areas</h4>
            <div className="my-4">
                <ProvidedAreas searchData={searchData} />
            </div>

            <h4>Available Areas</h4>
            <div className="my-4">
                <AvailableAreas searchData={searchData} />
            </div>
        </div>
    );
};

export default Areas;
