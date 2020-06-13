import React from "react";
import { Link } from "react-router-dom";

const Home = (props) => {
  return (
    <div>
      <Link to="/about">About Us</Link>
      <h1>Welcome to project-x</h1>
    </div>
  );
};

export default Home;
