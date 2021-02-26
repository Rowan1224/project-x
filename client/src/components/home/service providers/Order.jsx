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
import emoji from "react-easy-emoji";
import Infobar from "../../generic/infobar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DropDown from "../location/dropDown";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import CustomAlert from "../../generic/CustomAlert";

const Order = (props) => {
    const [value, setValue] = useState(0);
    const [flag, setFlag] = useState(true);
    const [orders, setOrders] = useState([]);
    const [employes, setEmployes] = useState([]);
    const [status, setStatus] = useState(undefined);
    const [tabs] = useState(["Not Assigned", "Assigned"]);
    const [assignedOrders, setAssignedOrders] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState({}); // {27: "Toha", 28: "Dhruvo", 32: "lkbnefj".........}

    // Themes
    const { isLightTheme, theme } = useContext(ThemeContext);
    const variant = isLightTheme ? "light" : "dark";
    const ui = isLightTheme ? theme.light.ui : theme.dark.ui;
    const tabColor = isLightTheme ? theme.light.tabColor : theme.dark.tabColor;
    const type = isLightTheme ? theme.light.type : theme.dark.type;
    // const syntax = isLightTheme ? theme.light.syntax : theme.dark.syntax;
    const border = isLightTheme ? theme.light.border : theme.dark.border;
    const custom_text = isLightTheme
        ? theme.light.custom_text
        : theme.dark.custom_text;

    // componentDidMount
    useEffect(() => {
        let API_URL = "/getserviceorders/";

        const loadData = async () => {
            let userID = {
                userid: localStorage.getItem("userID"),
            };

            let response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userID),
            });

            let data = await response.json();

            if (!response.ok) setStatus(data.message);
            else setOrders(data.details);

            // Get employee's list
            API_URL = "/getEmployee/";

            const serviceID = {
                service_id: localStorage.getItem("userID"),
            };

            response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(serviceID),
            });

            data = await response.json();

            if (!response.ok) setStatus(data.message);
            else setEmployes(data.employee);

            // Get assigned employee
            API_URL = "/getassignedserviceorders/";

            userID = {
                userid: localStorage.getItem("userID"),
            };

            response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userID),
            });

            data = await response.json();

            if (!response.ok) setStatus(data.message);
            else setAssignedOrders(data.details);
        };
        loadData();
    }, [flag]);

    const handleOrderComplete = (order_id) => {
        const API_URL = "/completeserviceorder/";

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

            const data = await response.json();

            if (response.ok) {
                !alert(
                    `Order Id: ${order_id} has been completed successfully`
                ) && setFlag(!flag);
            } else setStatus(data.message);
        };
        loadData();
    };

    const handleAssignComplete = (order_id) => {
        const API_URL = "/assignEmployee/";

        const loadData = async () => {
            const body = {
                order_id: order_id,
                employee_name: selectedEmployee[order_id],
                service_id: localStorage.getItem("userID"),
            };

            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });

            const data = await response.json();

            if (response.ok) {
                !alert(
                    `Employee ${selectedEmployee[order_id]} has been assigned successfully for Order Id: ${order_id}`
                ) && setFlag(!flag);
            } else setStatus(data.message);
        };
        loadData();
    };

    const handleEmployeeSelect = (id, e) => {
        setSelectedEmployee({ ...selectedEmployee, [id]: e });
    };

    // Tab related things.....
    const TabPanel = (props) => {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`scrollable-auto-tabpanel-${index}`}
                aria-labelledby={`scrollable-auto-tab-${index}`}
                {...other}
            >
                {value === index && <Box>{children}</Box>}
            </div>
        );
    };

    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.any.isRequired,
        value: PropTypes.any.isRequired,
    };

    const a11yProps = (index) => {
        return {
            id: `scrollable-auto-tab-${index}`,
            "aria-controls": `scrollable-auto-tabpanel-${index}`,
        };
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <AppBar position="static" className={"rounded" + ui}>
                <Tabs
                    value={value}
                    className={custom_text}
                    TabIndicatorProps={{ style: { background: tabColor } }}
                    variant="fullWidth"
                    onChange={handleChange}
                >
                    {tabs.map((tab) => (
                        <Tab
                            label={tab}
                            key={uuidv4()}
                            {...a11yProps(uuidv4())}
                            style={{ textTransform: "none" }}
                        />
                    ))}
                </Tabs>
            </AppBar>

            {tabs.map((tab, index) => (
                <TabPanel
                    key={uuidv4()}
                    value={value}
                    index={index}
                    className="pt-4"
                >
                    {status && (
                        <CustomAlert variant="warning" status={status} />
                    )}

                    {(index === 0 ? orders : assignedOrders) ? (
                        <div className={"shadow rounded" + border}>
                            <Table
                                striped
                                // bordered
                                responsive="sm"
                                variant={variant}
                            >
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
                                            {index === 0
                                                ? "Select Employee"
                                                : "Employee"}
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
                                    {(index === 0
                                        ? orders
                                        : assignedOrders
                                    ).map((order) => (
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
                                            <td className="text-center text-break align-middle">
                                                {order.address}
                                            </td>
                                            <td className="text-center align-middle">
                                                {order.further_description}
                                            </td>
                                            <td className="text-center align-middle">
                                                <span className="font-weight-bold">
                                                    ৳{" "}
                                                </span>
                                                {order.payment}
                                            </td>
                                            <td className="text-center align-middle">
                                                {Moment(order.time).format(
                                                    "DD/MM/YY hh:mmA"
                                                )}
                                            </td>
                                            <td className="text-center align-middle">
                                                {index === 0 ? (
                                                    <DropDown
                                                        size="sm"
                                                        type={
                                                            selectedEmployee[
                                                                order.order_id
                                                            ]
                                                                ? type
                                                                : "outline-" +
                                                                  type
                                                        }
                                                        subElement="employee_name"
                                                        values={
                                                            employes
                                                                ? employes
                                                                : []
                                                        }
                                                        title={
                                                            selectedEmployee[
                                                                order.order_id
                                                            ]
                                                                ? selectedEmployee[
                                                                      order
                                                                          .order_id
                                                                  ]
                                                                : "Assign"
                                                        }
                                                        handleSelect={(e) =>
                                                            handleEmployeeSelect(
                                                                order.order_id,
                                                                e
                                                            )
                                                        }
                                                    />
                                                ) : (
                                                    order.employee
                                                )}
                                            </td>
                                            <td className="text-center align-middle">
                                                <Button
                                                    size="sm"
                                                    variant="success"
                                                    onClick={() =>
                                                        index === 0
                                                            ? handleAssignComplete(
                                                                  order.order_id
                                                              )
                                                            : handleOrderComplete(
                                                                  order.order_id
                                                              )
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
                        </div>
                    ) : index === 0 ? (
                        <Infobar>
                            You have no orders to show {emoji("🥲")}
                        </Infobar>
                    ) : (
                        <Infobar>
                            You haven't assigned any orders yet! {emoji("🙁")}
                        </Infobar>
                    )}
                </TabPanel>
            ))}
        </>
    );
};

export default Order;
