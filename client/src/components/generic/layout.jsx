import React from "react";
import { Container } from "react-bootstrap";
import MainNav from "./navbar";

const Layout = (props) => {
  return (
    <div>
      <MainNav />
      <div className="vertical-center">{props.children}</div>
    </div>
  );
};

export default Layout;
