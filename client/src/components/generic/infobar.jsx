import React, { useContext } from "react";
// import { Alert } from "react-bootstrap";

import { ThemeContext } from "../../contexts/ThemeContext";

const Infobar = (props) => {
    // Themes
    const { isLightTheme, theme } = useContext(ThemeContext);
    // const mainBG = isLightTheme ? theme.light.mainBG : theme.dark.mainBG;
    const border = isLightTheme ? theme.light.border : theme.dark.border;
    // const syntax = isLightTheme ? theme.light.syntax : theme.dark.syntax;
    const custom_text = isLightTheme
        ? theme.light.custom_text
        : theme.dark.custom_text;

    // const text_color = props.text ? " " + props.text : syntax;

    return (
        <div className="text-center mb-4">
            <h5 className={"rounded p-3" + custom_text + border}>
                {props.children}
            </h5>
            {/* <h5 className={"rounded p-3" + text_color}>{props.children}</h5> */}
            {/* <Alert variant="dark">{props.children}</Alert> */}
        </div>
    );
};

export default Infobar;
