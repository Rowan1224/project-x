import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import AvailableAreas from "./AvailableAreas";
import ProvidedAreas from "./ProvidedAreas";
import { ThemeContext } from "../../../../contexts/ThemeContext";
import { Button } from "react-bootstrap";

const Areas = (props) => {
    const [searchData, setSearchData] = useState("");

    // Themes
    const { isLightTheme, theme } = useContext(ThemeContext);
    const type = isLightTheme ? theme.light.type : theme.dark.type;
    const syntax = isLightTheme ? theme.light.syntax : theme.dark.syntax;
    const custom_text = isLightTheme
        ? theme.light.custom_text
        : theme.dark.custom_text;
    const mainColor = isLightTheme
        ? theme.light.mainColor
        : theme.dark.mainColor;

    const handleChange = (e) => {
        setSearchData(e.target.value);
    };

    return (
        <div className={syntax}>
            <div className="d-flex mb-5">
                <input
                    autoFocus
                    type="text"
                    name="search"
                    onChange={handleChange}
                    placeholder="Search areas..."
                    style={{ borderBottom: "2px solid " + mainColor }}
                    className={
                        "transparent__input mr-3 pl-2 text-danger" + custom_text
                    }
                />

                <Button variant={type}>
                    <FontAwesomeIcon
                        className="fa-icon mr-2"
                        icon={["fas", "search"]}
                    />
                    Search
                </Button>
            </div>

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
