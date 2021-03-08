import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Button } from "react-bootstrap";
import { ThemeContext } from "../../contexts/ThemeContext";

const SearchBar = (props) => {
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
        props.handleChange(e);
    };

    return (
        <div className="my-5">
            <div className="d-flex">
                <input
                    autoFocus
                    type="text"
                    onChange={handleChange}
                    placeholder={props.placeholder}
                    style={{ borderBottom: "2px solid " + mainColor }}
                    className={
                        "transparent__input mr-3 pl-2 text-danger" + custom_text
                    }
                />

                <Button variant={type}>
                    <FontAwesomeIcon
                        className="fa-icon mr-sm-2"
                        icon={["fas", "search"]}
                    />
                    <span className="d-none d-sm-inline">Search</span>
                </Button>
            </div>

            <div className={"text-center mt-3" + syntax}>
                <small>{props.searchBy}</small>
            </div>
        </div>
    );
};

export default SearchBar;
