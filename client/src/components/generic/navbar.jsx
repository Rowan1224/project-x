import React, { useState, useContext } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { AccountCircle, ShoppingCart } from "@material-ui/icons";
import { useWindowScroll } from "beautiful-react-hooks";
import { NavLink } from "react-router-dom";
import ToggleTheme from "../theme/ToggleTheme";
import { ThemeContext } from "../../contexts/ThemeContext";

const MainNav = (props) => {
    const [isShadow, setIsShadow] = useState(window.scrollY > 20);

    useWindowScroll((event) => {
        setIsShadow(window.scrollY > 20);
    });

    // Themes
    const { isLightTheme, theme } = useContext(ThemeContext);
    const bg = isLightTheme ? theme.light.bg : theme.dark.bg;
    const borderLeft = isLightTheme
        ? theme.light.borderLeft
        : theme.dark.borderLeft;
    const custom_text = isLightTheme
        ? theme.light.custom_text
        : theme.dark.custom_text;

    const navLinkStyle = {
        borderLeft: "1px solid" + borderLeft,
        paddingLeft: 15,
        paddingRight: 15,
    };

    return (
        <Navbar
            sticky="top"
            style={{ backgroundColor: bg }}
            className={isShadow ? "shadow" : ""}
        >
            <Navbar.Brand
                style={{ fontFamily: "MuseoModerno" }}
                className={custom_text}
                as={NavLink}
                to="/"
            >
                ProjectX
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="main-nav" />
            <Navbar.Collapse id="main-nav">
                <Nav className="ml-auto">
                    <Nav.Link style={navLinkStyle}>
                        <ToggleTheme />
                    </Nav.Link>
                    <Nav.Link
                        style={navLinkStyle}
                        className={custom_text}
                        as={NavLink}
                        to="/login"
                    >
                        <AccountCircle />
                    </Nav.Link>
                    <Nav.Link
                        style={navLinkStyle}
                        className={custom_text}
                        as={NavLink}
                        to="/cart"
                    >
                        <ShoppingCart />
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default MainNav;
