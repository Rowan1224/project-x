import React from "react";
import { Container } from "react-bootstrap";
import MainNav from "./navbar";
import ThemeContextProvider from "../../contexts/ThemeContext";

const Layout = (props) => {
  return (
    <ThemeContextProvider>
      <MainNav />
      <div className="mt-5 vertical-center">
        <Container>{props.children}</Container>
      </div>
    </ThemeContextProvider>
  );
};

export default Layout;
