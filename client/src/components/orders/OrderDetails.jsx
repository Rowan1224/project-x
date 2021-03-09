import { useParams } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";

import CustomTable from "../generic/CustomTable";
import { ThemeContext } from "../../contexts/ThemeContext";

const OrderDetails = (props) => {
    const params = useParams();
    const [orderDetailsState, setOrderDetailsState] = useState([]);

    // Themes
    const { isLightTheme, theme } = useContext(ThemeContext);
    const syntax = isLightTheme ? theme.light.syntax : theme.dark.syntax;

    // componentDidMount
    useEffect(() => {
        const API_URL = "/getserviceordersdetails/";

        const loadData = async () => {
            const orderID = {
                order_id: params.order_id,
            };

            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(orderID),
            });

            const data = await response.json();
            setOrderDetailsState(data.details);
        };
        loadData();
    }, [params.order_id]);

    const tableData = {
        ths: [
            { className: "", value: "Product Name" },
            { className: "", value: "Quantity" },
            { className: "", value: "Product Size" },
            { className: "", value: "Price (per unit)" },
        ],
        allowedEntry: ["product_name", "quantity", "product_size"],
    };

    return (
        <>
            <h4 className={"mb-5 text-center" + syntax}>Order Details</h4>
            <CustomTable
                ths={tableData.ths}
                datas={orderDetailsState}
                allowedEntry={tableData.allowedEntry}
                ActionComponents={[
                    {
                        component: (order) => (
                            <>
                                <span className="font-weight-bold">৳ </span>
                                {order.product_price_per_unit}
                            </>
                        ),
                        className: "",
                    },
                ]}
            />
        </>
    );
};

export default OrderDetails;
