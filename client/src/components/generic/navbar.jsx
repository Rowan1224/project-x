import React, { useState, useContext } from "react";
import { Navbar, Nav, Dropdown } from "react-bootstrap";
import {
    History,
    Equalizer,
    ShoppingCart,
    AccountCircle,
    ArrowDropDown,
} from "@material-ui/icons";
import { NavLink } from "react-router-dom";
import { useWindowScroll } from "beautiful-react-hooks";

import ToggleTheme from "../theme/ToggleTheme";
import { ThemeContext } from "../../contexts/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { SettingsContext } from "../../contexts/SettingsContext";

const MainNav = (props) => {
    // const { isAnimated } = useContext(SettingsContext);
    const [isShadow, setIsShadow] = useState(window.scrollY > 20);
    const [isAuthenticated] = useState(localStorage.getItem("isAuthenticated"));
    const [isServiceProvider] = useState(
        localStorage.getItem("isServiceProvider") === "true"
    );

    useWindowScroll((event) => {
        setIsShadow(window.scrollY > 20);
    });

    // Themes
    const { isLightTheme, theme } = useContext(ThemeContext);
    const ui = isLightTheme ? theme.light.ui : theme.dark.ui;
    const type = isLightTheme ? theme.light.type : theme.dark.type;
    const syntax = isLightTheme ? theme.light.syntax : theme.dark.syntax;
    const border = isLightTheme ? theme.light.border : theme.dark.border;
    const dropdown_text = isLightTheme
        ? theme.light.dropdown_text
        : theme.dark.dropdown_text;
    const bg = isLightTheme ? theme.light.bg : theme.dark.bg;
    const variant = isLightTheme ? "light" : "dark";
    const borderLeft = isLightTheme
        ? theme.light.borderLeft
        : theme.dark.borderLeft;
    const custom_text = isLightTheme
        ? theme.light.custom_text
        : theme.dark.custom_text;

    const navLinkStyle = {
        paddingLeft: 15,
        paddingRight: 15,
        cursor: "pointer",
        // fontWeight: "600",
        borderLeft: "1px solid" + borderLeft,
    };

    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <div
            ref={ref}
            style={navLinkStyle}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
            className={"h-100 pt-2" + custom_text}
        >
            {children}
            <ArrowDropDown className="mb-1" />
        </div>
    ));

    return (
        <Navbar
            expand="lg"
            sticky="top"
            variant={variant}
            style={{ backgroundColor: bg }}
            className={isShadow ? "shadow" : ""}
        >
            <Navbar.Brand
                as={NavLink}
                className={custom_text}
                to={isServiceProvider ? "/orders" : "/"}
                style={{ fontFamily: "MuseoModerno", fontSize: "1.4rem" }}
            >
                ProjectX
                <sup>&alpha;</sup>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="main-nav" />
            <Navbar.Collapse id="main-nav">
                <Nav className="ml-auto">
                    <Nav.Link
                        as={NavLink}
                        style={navLinkStyle}
                        className={"font-weight-bold" + custom_text}
                        to={isAuthenticated ? "/profile" : "/login"}
                    >
                        <AccountCircle className="mb-1" />
                        <span className="ml-2">
                            {localStorage.getItem("username")
                                ? localStorage.getItem("username")
                                : "Login"}
                        </span>
                    </Nav.Link>

                    <Nav.Link
                        as={NavLink}
                        to={"/history"}
                        style={navLinkStyle}
                        className={"font-weight-bold" + custom_text}
                    >
                        <History className="mb-1" />
                        <span className="ml-2">History</span>
                    </Nav.Link>

                    <Nav.Link style={navLinkStyle}>
                        <ToggleTheme />
                    </Nav.Link>

                    {isServiceProvider ? (
                        <Dropdown alignRight={true}>
                            <Dropdown.Toggle as={CustomToggle}>
                                <Equalizer className="mb-1" />
                                <span className="font-weight-bold ml-2">
                                    Dashboard
                                </span>
                            </Dropdown.Toggle>

                            <Dropdown.Menu
                                className={ui + border}
                                style={{ width: "14rem" }}
                            >
                                <Dropdown.Item
                                    as={NavLink}
                                    to="/orders"
                                    variant={type}
                                    className={
                                        "text-wrap" + syntax + dropdown_text
                                    }
                                >
                                    <FontAwesomeIcon
                                        className="fa-icon mr-2"
                                        icon={["fas", "tasks"]}
                                    />
                                    Orders
                                </Dropdown.Item>

                                <Dropdown.Item
                                    as={NavLink}
                                    to="/statistics"
                                    variant={type}
                                    className={
                                        "text-wrap" + syntax + dropdown_text
                                    }
                                >
                                    <FontAwesomeIcon
                                        className="fa-icon mr-2"
                                        icon={["fas", "chart-line"]}
                                    />
                                    Statistics
                                </Dropdown.Item>

                                <Dropdown.Item
                                    as={NavLink}
                                    variant={type}
                                    to={`/service/provider/${localStorage.getItem(
                                        "userID"
                                    )}`}
                                    className={
                                        "text-wrap" + syntax + dropdown_text
                                    }
                                >
                                    <FontAwesomeIcon
                                        className="fa-icon mr-2"
                                        icon={["fas", "boxes"]}
                                    />
                                    Inventory
                                </Dropdown.Item>

                                <Dropdown.Item
                                    as={NavLink}
                                    variant={type}
                                    to="/add/product"
                                    className={
                                        "text-wrap" + syntax + dropdown_text
                                    }
                                >
                                    <FontAwesomeIcon
                                        className="fa-icon mr-2"
                                        icon={["fas", "plus-circle"]}
                                    />
                                    Add Products
                                </Dropdown.Item>

                                <Dropdown.Item
                                    as={NavLink}
                                    to="/areas"
                                    variant={type}
                                    className={
                                        "text-wrap" + syntax + dropdown_text
                                    }
                                >
                                    <FontAwesomeIcon
                                        className="fa-icon mr-2"
                                        icon={["fas", "map-marked-alt"]}
                                    />
                                    Manage Areas
                                </Dropdown.Item>

                                <Dropdown.Item
                                    as={NavLink}
                                    to="/employee"
                                    variant={type}
                                    className={
                                        "text-wrap" + syntax + dropdown_text
                                    }
                                >
                                    <FontAwesomeIcon
                                        className="fa-icon mr-2"
                                        icon={["fas", "users-cog"]}
                                    />
                                    Employee Details
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    ) : (
                        <Nav.Link
                            to="/cart"
                            as={NavLink}
                            style={navLinkStyle}
                            className={custom_text}
                        >
                            <ShoppingCart className="mb-1" />
                            <span className="ml-2">Cart</span>
                        </Nav.Link>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default MainNav;
