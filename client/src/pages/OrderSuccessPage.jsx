import React from "react";

import Layout from "../components/generic/layout";
import OrderSuccess from "../components/orders/OrderSuccess";
// import CartContextProvider from "../contexts/CartContext";

const OrderSuccessPage = () => {
    return (
        <Layout>
            {/* <CartContextProvider> */}
                <OrderSuccess />
            {/* </CartContextProvider> */}
        </Layout>
    );
};

export default OrderSuccessPage;
