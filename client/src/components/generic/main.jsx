import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import { ThemeContext } from "../../contexts/ThemeContext";

const Main = (props) => {
    // Themes
    const { isLightTheme, theme } = useContext(ThemeContext);
    const bg = isLightTheme ? theme.light.bg : theme.dark.bg;

    return (
        <div className="vertical-center" style={{ background: bg }}>
            <Container className="mt-5">{props.children}</Container>
        </div>
    );
};

export default Main;
