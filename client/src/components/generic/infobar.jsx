import React, { useContext } from "react";
import { Card } from "react-bootstrap";

import { ThemeContext } from "../../contexts/ThemeContext";

const Infobar = (props) => {
    // Themes
    const { isLightTheme, theme } = useContext(ThemeContext);
    // const mainBG = isLightTheme ? theme.light.mainBG : theme.dark.mainBG;
    // const syntax = isLightTheme ? theme.light.syntax : theme.dark.syntax;
    // const text_color = props.text ? " " + props.text : syntax;
    const ui = isLightTheme ? theme.light.ui : theme.dark.ui;
    const custom_text = isLightTheme
        ? theme.light.custom_text
        : theme.dark.custom_text;

    return (
        // <div className="text-center card mb-4">
        //     {/* <h5 className={"rounded p-3" + text_color}>{props.children}</h5> */}
        //     {/* <Alert variant="dark">{props.children}</Alert> */}
        //     <div className={"card-body rounded" + ui + custom_text}>
        //         {props.children}
        //     </div>
        // </div>
        <Card className={"mb-4" + ui}>
            <Card.Body className={"text-center" + custom_text}>
                <h5 className="mb-0">{props.children}</h5>
            </Card.Body>
        </Card>
    );
};

export default Infobar;
