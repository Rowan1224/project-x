import React from "react";
import Layout from "../components/generic/layout";
import LocationDropDown from "../components/home/locationDropdown";
import LocationContextProvider from "../contexts/LocationContext";

const Home = (props) => {
  return (
    <Layout>
      <LocationContextProvider>
        <LocationDropDown />
      </LocationContextProvider>
    </Layout>
  );
};

export default Home;
