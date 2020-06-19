import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/generic/layout";

const About = (props) => {
  return (
    <Layout>
      <Link to="/">Go Back To Home</Link>
      <h1>We're project-x</h1>
    </Layout>
  );
};

export default About;
