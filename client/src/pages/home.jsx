import React from "react";
import Layout from "../components/generic/layout";
import LocationDropDown from "../components/location/locationDropdown";
import LocationContextProvider from "../contexts/LocationContext";
import Providers from "../components/service providers/providers";

const Home = () => {
    return (
        <Layout>
            <LocationContextProvider>
                <LocationDropDown />
                <Providers />
            </LocationContextProvider>
        </Layout>
    );
};

export default Home;
