import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";

import CustomTable from "../generic/CustomTable";

const OrderDetails = (props) => {
    const params = useParams();
    const [orderDetailsState, setOrderDetailsState] = useState([]);

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
            { className: "", value: "Price (per unit)" },
            { className: "", value: "Product Size" },
        ],
        allowedEntry: [
            "product_name",
            "quantity",
            "product_price_per_unit",
            "product_size",
        ],
    };

    return (
        <CustomTable
            ths={tableData.ths}
            datas={orderDetailsState}
            allowedEntry={tableData.allowedEntry}
        />
    );
};

export default OrderDetails;
