import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/generic/layout";

const Home = (props) => {
  return (
    <Layout>
      <Link to="/about">About Us</Link>
      <h1 style={{ height: 1233 }}>Welcome to project-x</h1>
    </Layout>
  );
};

export default Home;
