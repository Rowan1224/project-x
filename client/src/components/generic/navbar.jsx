import React, { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { AccountCircle, ShoppingCart } from "@material-ui/icons";
import { useWindowScroll } from "beautiful-react-hooks";
import { NavLink } from "react-router-dom";
import ToggleTheme from "../theme/ToggleTheme";

const MainNav = (props) => {
  const [isShadow, setIsShadow] = useState(window.scrollY > 20);

  useWindowScroll((event) => {
    setIsShadow(window.scrollY > 20);
  });

  const navLinkStyle = {
    borderLeft: "1px solid #eee",
    paddingLeft: 15,
    paddingRight: 15,
  };

  return (
    <Navbar
      sticky="top"
      style={{ backgroundColor: "#fff", transition: "all 0.3s" }}
      className={isShadow ? "shadow" : ""}
    >
      <Navbar.Brand
        style={{ fontFamily: "MuseoModerno" }}
        className="text-main"
        as={NavLink}
        to="/"
      >
        ProjectX
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="main-nav" />
      <Navbar.Collapse id="main-nav">
        <Nav className="ml-auto">
          <Nav.Link
            style={navLinkStyle}
          >
            <ToggleTheme />
          </Nav.Link>
          <Nav.Link
            style={navLinkStyle}
            className="text-main"
            as={NavLink}
            to="/registration"
          >
            <AccountCircle />
          </Nav.Link>
          <Nav.Link
            style={navLinkStyle}
            className="text-main"
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
