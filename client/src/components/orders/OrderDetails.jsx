import { useParams } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";

import { ThemeContext } from "../../contexts/ThemeContext";

import CustomTable from "../generic/CustomTable";
import CustomAlert from "../generic/CustomAlert";

const OrderDetails = (props) => {
    const params = useParams();
    const [status, setStatus] = useState(undefined);
    const [orderDetailsState, setOrderDetailsState] = useState([]);
    const [isServiceProvider] = useState(
        localStorage.getItem("isServiceProvider") === "true"
    );

    // Themes
    const { isLightTheme, theme } = useContext(ThemeContext);
    const syntax = isLightTheme ? theme.light.syntax : theme.dark.syntax;

    // componentDidMount
    useEffect(() => {
        const API_URL = isServiceProvider
            ? "/service/orderDetails/"
            : "/customer/orderDetails/";

        const loadData = async () => {
            const orderID = {
                order_id: params.order_id,
                userid: localStorage.getItem("userID"),
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

            if (!response.ok) setStatus(data.message);
            else {
                setStatus(undefined);
                setOrderDetailsState(data.details);
            }
        };
        loadData();
    }, [params.order_id, isServiceProvider]);

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
            {status ? (
                <CustomAlert status={status} />
            ) : (
                <>
                    <h4 className={"mb-5 text-center" + syntax}>
                        Order Details
                    </h4>
                    <CustomTable
                        ths={tableData.ths}
                        datas={orderDetailsState}
                        allowedEntry={tableData.allowedEntry}
                        ActionComponents={[
                            {
                                component: (order) => (
                                    <>
                                        <span className="font-weight-bold">
                                            ৳{" "}
                                        </span>
                                        {order.product_price_per_unit}
                                    </>
                                ),
                                className: "",
                            },
                        ]}
                    />
                </>
            )}
        </>
    );
};

export default OrderDetails;
