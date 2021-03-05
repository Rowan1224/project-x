import React from "react";

import Layout from "../components/generic/layout";
import Services from "../components/services/services";
import CartContextProvider from "../contexts/CartContext";
import LocationContextProvider from "../contexts/LocationContext";

const ServiceProviders = () => {
    return (
        <Layout>
            <LocationContextProvider>
                <CartContextProvider>
                    <Services />
                </CartContextProvider>
            </LocationContextProvider>
        </Layout>
    );
};

export default ServiceProviders;
