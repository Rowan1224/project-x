import React, { useState, useEffect } from "react";
// import Counter from "../../generic/counter";
import { Table, Button } from "react-bootstrap";
// import DeleteTwoToneIcon from "@material-ui/icons/DeleteTwoTone";
// import Icon from "@material-ui/core/Icon";
import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import Moment from "moment";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { Link } from "react-router-dom";
// import emoji from "react-easy-emoji";
import Infobar from "../../generic/infobar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Order = (props) => {
    const [flag, setFlag] = useState(true);
    const [orders, setOrders] = useState([]);

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
        const API_URL = "/getserviceorders/";

        const loadData = async () => {
            const userID = {
                userid: localStorage.getItem("userID"),
            };

            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userID),
            });

            const data = await response.json();
            setOrders(data.details);
        };
        loadData();
    }, [flag]);

    const handleComplete = (order_id) => {
        const API_URL = "/completeserviceorder";

        const loadData = async () => {
            const orderID = {
                order_id: order_id,
            };

            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(orderID),
            });

            if (response.ok) {
                !alert("Order Id " + order_id + " completed successfully") &&
                    setFlag(!flag);
            }
        };
        loadData();
    };

    return (
        <>
            {orders ? (
                <Table responsive="sm" striped bordered variant={variant}>
                    <thead>
                        <tr>
                            <th
                                scope="col"
                                className="text-center align-middle"
                            >
                                Order ID
                            </th>
                            <th
                                scope="col"
                                className="text-center align-middle"
                            >
                                Customer Name
                            </th>
                            <th
                                scope="col"
                                className="text-center align-middle"
                            >
                                Customer Phone
                            </th>
                            <th
                                scope="col"
                                className="text-center align-middle"
                            >
                                Address
                            </th>
                            <th
                                scope="col"
                                className="text-center align-middle"
                            >
                                Further Description
                            </th>
                            <th
                                scope="col"
                                className="text-center align-middle"
                            >
                                Payment
                            </th>
                            <th
                                scope="col"
                                className="text-center align-middle"
                            >
                                Time
                            </th>
                            <th
                                scope="col"
                                className="text-center align-middle"
                            >
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={uuidv4()}>
                                <td className="text-center align-middle">
                                    <Link
                                        to={`/order/details/${order.order_id}/`}
                                    >
                                        {order.order_id}
                                    </Link>
                                </td>

                                <td className="text-center align-middle">
                                    {order.customer_name}
                                </td>

                                <td className="text-center align-middle">
                                    {order.customer_phone}
                                </td>

                                <td className="text-center align-middle">
                                    {order.address}
                                </td>

                                <td className="text-center align-middle">
                                    {order.further_description}
                                </td>

                                <td className="text-center align-middle">
                                ৳{order.payment}
                                </td>

                                <td className="text-center align-middle">
                                    {Moment(order.time).format(
                                        "DD/MM/YY hh:mmA"
                                    )}
                                </td>

                                <td className="text-center align-middle">
                                    <Button
                                        size="sm"
                                        variant="success"
                                        onClick={() =>
                                            handleComplete(order.order_id)
                                        }
                                    >
                                        <FontAwesomeIcon
                                            icon={["fas", "check"]}
                                        />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <Infobar>You have no orders to show</Infobar>
            )}
        </>
    );
};

export default Order;
