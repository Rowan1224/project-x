import React from "react";

import Layout from "../components/generic/layout";
import AvailableProducts from "../components/products/AvailableProducts";
import ProductContextProvider from "../contexts/ProductContext";

const Home = () => {
    return (
        <Layout>
            <ProductContextProvider>
                <AvailableProducts />
            </ProductContextProvider>
        </Layout>
    );
};

export default Home;
