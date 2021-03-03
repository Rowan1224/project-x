import React from "react";
import { useHistory } from "react-router-dom";
import Layout from "../components/generic/layout";
import LocationContextProvider from "../contexts/LocationContext";
import SelectLocation from "../components/home/location/SelectLocation";
import Providers from "../components/home/service providers/Providers/providers";

const Home = () => {
    const history = useHistory();

    return (
        <Layout>
            <LocationContextProvider>
                <SelectLocation />
                <Providers />
            </LocationContextProvider>

            {localStorage.getItem("isServiceProvider") === "true" &&
                history.push("/orders")}
        </Layout>
    );
};

export default Home;
