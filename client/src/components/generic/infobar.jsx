import React, { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

const Infobar = (props) => {
    // Themes
    const { isLightTheme, theme } = useContext(ThemeContext);
    const ui = isLightTheme ? theme.light.ui : theme.dark.ui;
    const syntax = isLightTheme ? theme.light.syntax : theme.dark.syntax;
    const border = isLightTheme ? theme.light.border : theme.dark.border;

    const text_color = props.text ? " " + props.text : syntax;

    return (
        <div className="text-center mb-4">
            <h5 className={"rounded p-3" + border + ui + text_color}>
                {/* <h5
                className={"rounded p-3" + border + text_color}
                style={{ backgroundColor: "red" }}
            > */}
                {props.children}
            </h5>
        </div>
    );
};

export default Infobar;
