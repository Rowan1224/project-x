import React from "react";
import { Container } from "react-bootstrap";
import MainNav from "./navbar";

const Layout = (props) => {
  return (
    <div className="main">
      <MainNav />
      <Container fluid>{props.children}</Container>
    </div>
  );
};

export default Layout;
