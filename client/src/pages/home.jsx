import React from "react";
import Layout from "../components/generic/layout";
import LocationDropDown from "../components/home/locationDropdown";
import LocationContextProvider from "../contexts/LocationContext";
import Services from "../components/home/services";

const Home = (props) => {
  return (
    <Layout>
      <LocationContextProvider>
        <LocationDropDown />
      </LocationContextProvider>
      <Services />
    </Layout>
  );
};

export default Home;
