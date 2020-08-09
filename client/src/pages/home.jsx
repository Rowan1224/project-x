import React from "react";
import Layout from "../components/generic/layout";
import LocationDropDown from "../components/home/location/locationDropdown";
import LocationContextProvider from "../contexts/LocationContext";
import Providers from "../components/home/service providers/providers";
import SPContextProvider from "../contexts/SPContext";

const Home = () => {
  return (
    <Layout>
      <LocationContextProvider>
        <LocationDropDown />
        <SPContextProvider>
          <Providers />
        </SPContextProvider>
      </LocationContextProvider>
    </Layout>
  );
};

export default Home;
