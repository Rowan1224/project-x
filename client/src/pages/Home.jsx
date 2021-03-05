import React from "react";
import { useHistory } from "react-router-dom";

import Layout from "../components/generic/layout";
import Providers from "../components/providers/providers";
import LocationContextProvider from "../contexts/LocationContext";
import SelectLocation from "../components/location/SelectLocation";

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
