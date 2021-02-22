import React, { useState, useEffect } from "react";
// import Counter from "../../generic/counter";
import { Table } from "react-bootstrap";
// import DeleteTwoToneIcon from "@material-ui/icons/DeleteTwoTone";
// import Icon from "@material-ui/core/Icon";
import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { ThemeContext } from "../../../contexts/ThemeContext";
// import { Link } from "react-router-dom";
// import emoji from "react-easy-emoji";
// import Infobar from "../../generic/infobar";
import { useParams } from "react-router-dom";

const OrderDetails = (props) => {
    const params = useParams();
    const [orderDetails, setOrderDetails] = useState([]);

    // Themes
    // const { isLightTheme, theme } = useContext(ThemeContext);
    const { isLightTheme } = useContext(ThemeContext);
    const variant = isLightTheme ? "light" : "dark";
    // const ui = isLightTheme ? theme.light.ui : theme.dark.ui;
    // const type = isLightTheme ? theme.light.type : theme.dark.type;
    // const syntax = isLightTheme ? theme.light.syntax : theme.dark.syntax;
    // const border = isLightTheme ? theme.light.border : theme.dark.border;
    // const custom_text = isLightTheme
    //     ? theme.light.custom_text
    //     : theme.dark.custom_text;

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
            setOrderDetails(data.details);
        };
        loadData();
    }, [params.order_id]);

    return (
        <Table responsive="sm" striped bordered variant={variant}>
            <thead>
                <tr>
                    <th scope="col" className="text-center align-middle">
                        Product Name
                    </th>
                    <th scope="col" className="text-center align-middle">
                        Quantity
                    </th>
                    <th scope="col" className="text-center align-middle">
                        Price (per unit)
                    </th>
                    <th scope="col" className="text-center align-middle">
                        Product Size
                    </th>
                </tr>
            </thead>
            <tbody>
                {orderDetails.map((orderDetail) => (
                    <tr key={uuidv4()}>
                        <td className="text-center align-middle">
                            {orderDetail.product_name}
                        </td>

                        <td className="text-center align-middle">
                            {orderDetail.quantity}
                        </td>

                        <td className="text-center align-middle">
                        ৳{orderDetail.product_price_per_unit}
                        </td>

                        <td className="text-center align-middle">
                            {orderDetail.product_size}
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default OrderDetails;
