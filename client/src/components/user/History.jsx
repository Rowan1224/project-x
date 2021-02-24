import React, { useState, useEffect } from "react";
// import Counter from "../../generic/counter";
import { Table } from "react-bootstrap";
// import DeleteTwoToneIcon from "@material-ui/icons/DeleteTwoTone";
// import Icon from "@material-ui/core/Icon";
import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Link } from "react-router-dom";
// import emoji from "react-easy-emoji";
import Infobar from "../generic/infobar";
import Moment from "moment";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const History = (props) => {
    const [isServiceProvider] = useState(
        localStorage.getItem("isServiceProvider") === "true"
    );
    const [histories, setHistories] = useState([]);

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
        const API_URL = isServiceProvider
            ? "/getserviceorderhistory/"
            : "/getcustomerorderhistory";

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
            setHistories(data.details);
        };
        loadData();
    }, [isServiceProvider]);

    return (
        <>
            {histories ? (
                <Table responsive="sm" striped bordered variant={variant}>
                    <thead>
                        <tr>
                            <th
                                scope="col"
                                className="text-center align-middle"
                            >
                                Order ID
                            </th>
                            {isServiceProvider && (
                                <th
                                    scope="col"
                                    className="text-center align-middle"
                                >
                                    Customer Name
                                </th>
                            )}
                            <th
                                scope="col"
                                className="text-center align-middle"
                            >
                                Phone
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
                            {isServiceProvider && (
                                <th
                                    scope="col"
                                    className="text-center align-middle"
                                >
                                    Employee
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {histories.map((history) => (
                            <tr key={uuidv4()}>
                                <td className="text-center align-middle">
                                    <Link
                                        to={`/order/details/${history.order_id}/`}
                                    >
                                        {history.order_id}
                                    </Link>
                                </td>

                                {isServiceProvider && (
                                    <td className="text-center align-middle">
                                        {history.customer_name}
                                    </td>
                                )}

                                <td className="text-center align-middle">
                                    {history.customer_phone}
                                </td>
                                <td className="text-center align-middle">
                                    {history.address}
                                </td>
                                <td className="text-center align-middle">
                                    {history.further_description}
                                </td>
                                <td className="text-center align-middle">
                                    ৳{history.payment}
                                </td>
                                <td className="text-center align-middle">
                                    {Moment(history.time).format(
                                        "DD/MM/YY hh:mmA"
                                    )}
                                </td>
                                {isServiceProvider && (
                                    <td className="text-center align-middle">
                                        {history.employee}
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <Infobar>You have no history to show</Infobar>
            )}
        </>
    );
};

export default History;
