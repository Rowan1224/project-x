import React, { useState, useContext } from "react";
import {
    Navbar,
    Nav,
    NavDropdown,
    Form,
    FormControl,
    Button,
} from "react-bootstrap";
import { AccountCircle, ShoppingCart, History } from "@material-ui/icons";
import { useWindowScroll } from "beautiful-react-hooks";
import { NavLink } from "react-router-dom";
import ToggleTheme from "../theme/ToggleTheme";
import { ThemeContext } from "../../contexts/ThemeContext";

const MainNav = (props) => {
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
        <>
            <Navbar
                sticky="top"
                style={{ backgroundColor: bg }}
                className={isShadow ? "shadow" : ""}
            >
                <Navbar.Brand
                    to={isServiceProvider ? "/orders" : "/"}
                    as={NavLink}
                    className={custom_text}
                    style={{ fontFamily: "MuseoModerno" }}
                >
                    ProjectX
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-nav" />
                <Navbar.Collapse id="main-nav">
                    <Nav className="ml-auto">
                        <Nav.Link
                            as={NavLink}
                            style={navLinkStyle}
                            className={custom_text}
                            to={isAuthenticated ? "/profile" : "/login"}
                        >
                            <AccountCircle className="mb-1" />
                            <span className="d-none d-md-inline ml-2">
                                {localStorage.getItem("username")}
                            </span>
                        </Nav.Link>

                        <Nav.Link style={navLinkStyle}>
                            <ToggleTheme />
                        </Nav.Link>

                        <Nav.Link
                            as={NavLink}
                            to={"/history"}
                            style={navLinkStyle}
                            className={custom_text}
                        >
                            <History />
                        </Nav.Link>

                        <Nav.Link
                            as={NavLink}
                            style={navLinkStyle}
                            className={custom_text}
                            to={isServiceProvider ? "/orders" : "/cart"}
                        >
                            <ShoppingCart />
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">
                                Action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">
                                Something
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Separated link
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Form inline>
                        <FormControl
                            type="text"
                            placeholder="Search"
                            className="mr-sm-2"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
};

export default MainNav;
