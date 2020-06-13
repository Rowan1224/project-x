import React from "react";
import { Link } from "react-router-dom";
import APITest from "../components/home/apiTest";

const Home = (props) => {
  return (
    <div>
      <Link to="/about">About Us</Link>
      <h1>Welcome to project-x</h1>
      <APITest />
    </div>
  );
};

export default Home;
