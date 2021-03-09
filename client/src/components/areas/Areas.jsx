import React, { useContext, useState } from "react";
import emoji from "react-easy-emoji";

import { ThemeContext } from "../../contexts/ThemeContext";

import ProvidedAreas from "./ServiceAreas";
import SearchBar from "../generic/SearchBar";
import AvailableAreas from "./AvailableAreas";

const Areas = (props) => {
    const [searchData, setSearchData] = useState("");

    // Themes
    const { isLightTheme, theme } = useContext(ThemeContext);
    const syntax = isLightTheme ? theme.light.syntax : theme.dark.syntax;

    const handleChange = (e) => setSearchData(e.target.value);

    return (
        <div className={"text-center" + syntax}>
            <h4 className={"mb-5 text-center" + syntax}>
                Add your service area
            </h4>

            <SearchBar
                handleChange={handleChange}
                placeholder="Search areas...."
                searchBy={<>Search areas by anything {emoji("😄")}</>}
            />

            <h4 className={"mb-5 text-center" + syntax}>Your Service Areas</h4>

            <div className="my-4">
                <ProvidedAreas searchData={searchData} />
            </div>

            <h4 className={"my-5 text-center" + syntax}>Available Areas</h4>

            <div className="my-4">
                <AvailableAreas searchData={searchData} />
            </div>
        </div>
    );
};

export default Areas;
