import Moment from "moment";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import emoji from "react-easy-emoji";
import { Link } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
import { AppBar, Tabs, Tab, Box } from "@material-ui/core";

import { ThemeContext } from "../../contexts/ThemeContext";

import Infobar from "../generic/infobar";
import SearchBar from "../generic/SearchBar";
import CustomTable from "../generic/CustomTable";
import CustomModalAlert from "../generic/CustomModalAlert";
import DeleteModal from "../generic/DeleteModal";

const History = (props) => {
    const [isServiceProvider] = useState(
        localStorage.getItem("isServiceProvider") === "true"
    );

    const [value, setValue] = useState(0);
    const [flag, setFlag] = useState(true);
    const [status, setStatus] = useState(undefined);
    const [searchData, setSearchData] = useState("");
    const [activeHistories, setActiveHistories] = useState([]);
    const [statusVariant, setStatusVariant] = useState(undefined);
    const [deliveredHistories, setDeliveredHistories] = useState([]);
    const [cancelledHistories, setCancelledHistories] = useState([]);
    const [tabs] = useState(
        isServiceProvider
            ? ["Cancelled Orders", "Delivered Orders"]
            : ["Active Orders", "Cancelled Orders", "Delivered Orders"]
    );

    // Themes
    const { isLightTheme, theme } = useContext(ThemeContext);
    const ui = isLightTheme ? theme.light.ui : theme.dark.ui;
    const link = isLightTheme ? theme.light.link : theme.dark.link;
    const syntax = isLightTheme ? theme.light.syntax : theme.dark.syntax;
    const dangerTextColor = isLightTheme
        ? theme.light.dangerTextColor
        : theme.dark.dangerTextColor;
    const mainColor = isLightTheme
        ? theme.light.mainColor
        : theme.dark.mainColor;
    const custom_text = isLightTheme
        ? theme.light.custom_text
        : theme.dark.custom_text;

    // componentDidMount
    useEffect(() => {
        // Delivered Orders
        let API_URL = isServiceProvider
            ? "/getserviceorderhistory/"
            : "/orders/history/delivered/";

        const loadData = async () => {
            let bodyData = {
                search_data: searchData,
                userid: localStorage.getItem("userID"),
            };

            let response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(bodyData),
            });

            let data = await response.json();
            setDeliveredHistories(data.details);
            // console.log(data.details);

            // Active Orders
            API_URL = "/orders/history/active/";

            bodyData = {
                search_data: searchData,
                userid: localStorage.getItem("userID"),
            };

            response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(bodyData),
            });

            data = await response.json();
            setActiveHistories(data.details);
            // console.log(data.details);

            // Cancelled Orders
            API_URL = isServiceProvider
                ? "/getServiceCancelledOrderHistory/"
                : "/orders/history/cancelled/";

            bodyData = {
                search_data: searchData,
                userid: localStorage.getItem("userID"),
            };

            response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(bodyData),
            });

            data = await response.json();
            setCancelledHistories(data.details);
            // console.log(data.details);
        };
        loadData();
    }, [isServiceProvider, searchData, flag]);

    const handleCancel = async (order_id) => {
        const API_URL = "/order/cancel/";

        const bodyData = {
            order_id: order_id,
            userid: localStorage.getItem("userID"),
        };

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bodyData),
        });

        const data = await response.json();

        if (response.ok) {
            setStatusVariant("success");
            setStatus(data.message);
        } else {
            setStatusVariant("danger");
            setStatus(data.message);
        }
    };

    const handleChange = (e) => setSearchData(e.target.value);
    const updateFlag = () => setFlag(!flag);

    // Tab related settings.....
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

    const handleTabChange = (event, newValue) => setValue(newValue);

    const tableData = {
        activeThs: [
            { className: "", value: "Order ID" },
            { className: "", value: "Phone" },
            { className: "", value: "Address" },
            { className: "", value: "Further Description" },
            { className: "", value: "Payment" },
            { className: "", value: "Time" },
            { className: "", value: "Cancel" },
        ],
        cancelledThs: isServiceProvider
            ? [
                  { className: "", value: "Order ID" },
                  { className: "", value: "Customer Name" },
                  { className: "", value: "Phone" },
                  { className: "", value: "Address" },
                  { className: "", value: "Further Description" },
                  { className: "", value: "Payment" },
                  { className: "", value: "Time" },
                  { className: "", value: "Cancelled By" },
              ]
            : [
                  { className: "", value: "Order ID" },
                  { className: "", value: "Phone" },
                  { className: "", value: "Address" },
                  { className: "", value: "Further Description" },
                  { className: "", value: "Payment" },
                  { className: "", value: "Time" },
                  { className: "", value: "Cancelled By" },
              ],
        deliveredThs: isServiceProvider
            ? [
                  { className: "", value: "Order ID" },
                  { className: "", value: "Customer Name" },
                  { className: "", value: "Phone" },
                  { className: "", value: "Address" },
                  { className: "", value: "Further Description" },
                  { className: "", value: "Employee" },
                  { className: "", value: "Payment" },
                  { className: "", value: "Time" },
              ]
            : [
                  { className: "", value: "Order ID" },
                  { className: "", value: "Phone" },
                  { className: "", value: "Address" },
                  { className: "", value: "Further Description" },
                  { className: "", value: "Payment" },
                  { className: "", value: "Time" },
              ],
        tdsClassName: isServiceProvider
            ? ["", "", "text-break", "", ""]
            : ["", "text-break", ""],
        activeAllowedEntry: [
            "customer_phone",
            "address",
            "further_description",
        ],
        cancelledAllowedEntry: isServiceProvider
            ? [
                  "customer_name",
                  "customer_phone",
                  "address",
                  "further_description",
              ]
            : ["customer_phone", "address", "further_description"],
        deliveredAllowedEntry: isServiceProvider
            ? [
                  "customer_name",
                  "customer_phone",
                  "address",
                  "further_description",
                  "employee",
              ]
            : ["customer_phone", "address", "further_description"],
    };

    return (
        <>
            <h4 className={"mb-5 text-center" + syntax}>Order History</h4>

            <SearchBar
                handleChange={handleChange}
                placeholder="Search histories...."
                searchBy={<>Search by anything exept time and cancelled by</>}
            />

            <AppBar position="static" className={"rounded" + ui}>
                <Tabs
                    value={value}
                    variant="fullWidth"
                    className={custom_text}
                    onChange={handleTabChange}
                    TabIndicatorProps={{ style: { background: mainColor } }}
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

            {status && (
                <CustomModalAlert
                    status={status}
                    setStatus={setStatus}
                    variant={statusVariant}
                />
            )}

            {tabs.map((tab, index) => (
                <TabPanel
                    key={uuidv4()}
                    value={value}
                    index={index}
                    className="pt-4"
                >
                    {(
                        tab === "Active Orders"
                            ? activeHistories
                            : tab === "Cancelled Orders"
                            ? cancelledHistories
                            : deliveredHistories
                    ) ? (
                        <CustomTable
                            ths={
                                tab === "Active Orders"
                                    ? tableData.activeThs
                                    : tab === "Cancelled Orders"
                                    ? tableData.cancelledThs
                                    : tableData.deliveredThs
                            }
                            allowedEntry={
                                tab === "Active Orders"
                                    ? tableData.activeAllowedEntry
                                    : tab === "Cancelled Orders"
                                    ? tableData.cancelledAllowedEntry
                                    : tableData.deliveredAllowedEntry
                            }
                            PreActionComponents={[
                                {
                                    component: (history) => (
                                        <Link
                                            to={`/order/details/${history.order_id}/`}
                                        >
                                            {history.order_id}
                                        </Link>
                                    ),
                                    className: link,
                                },
                            ]}
                            datas={
                                tab === "Active Orders"
                                    ? activeHistories
                                    : tab === "Cancelled Orders"
                                    ? cancelledHistories
                                    : deliveredHistories
                            }
                            tdsClassName={tableData.tdsClassName}
                            ActionComponents={
                                tab === "Active Orders"
                                    ? [
                                          {
                                              component: (history) => (
                                                  <>
                                                      <span className="font-weight-bold">
                                                          ৳{" "}
                                                      </span>
                                                      {history.payment}
                                                  </>
                                              ),
                                              className: "",
                                          },
                                          {
                                              component: (history) =>
                                                  Moment(history.time).format(
                                                      "DD/MM/YY hh:mmA"
                                                  ),
                                              className: "",
                                          },
                                          {
                                              component: (history) => (
                                                  <DeleteModal
                                                      // deleteText="Cancel"
                                                      deleteTitle="Cancel Order"
                                                      updateFlag={updateFlag}
                                                      handleAction={() =>
                                                          handleCancel(
                                                              history.order_id
                                                          )
                                                      }
                                                      deleteIcon="ban"
                                                      modalBody={
                                                          <>
                                                              Do you really want
                                                              to cancel this
                                                              order?{" "}
                                                              <span
                                                                  className={
                                                                      dangerTextColor
                                                                  }
                                                              >
                                                                  Caution: This
                                                                  action cannot
                                                                  be undone
                                                              </span>
                                                          </>
                                                      }
                                                  />
                                              ),
                                              className: "",
                                          },
                                      ]
                                    : tab === "Cancelled Orders"
                                    ? [
                                          {
                                              component: (history) => (
                                                  <>
                                                      <span className="font-weight-bold">
                                                          ৳{" "}
                                                      </span>
                                                      {history.payment}
                                                  </>
                                              ),
                                              className: "",
                                          },
                                          {
                                              component: (history) =>
                                                  Moment(history.time).format(
                                                      "DD/MM/YY hh:mmA"
                                                  ),
                                              className: "",
                                          },
                                          {
                                              component: (history) => (
                                                  <span
                                                      className={
                                                          dangerTextColor
                                                      }
                                                  >
                                                      {history.reason}
                                                  </span>
                                              ),
                                              className: "",
                                          },
                                      ]
                                    : [
                                          {
                                              component: (history) => (
                                                  <>
                                                      <span className="font-weight-bold">
                                                          ৳{" "}
                                                      </span>
                                                      {history.payment}
                                                  </>
                                              ),
                                              className: "",
                                          },
                                          {
                                              component: (history) =>
                                                  Moment(history.time).format(
                                                      "DD/MM/YY hh:mmA"
                                                  ),
                                              className: "",
                                          },
                                      ]
                            }
                        />
                    ) : tab === "Active Orders" ? (
                        <Infobar>
                            You currently don't have any active orders{" "}
                            {emoji("🥲")}
                        </Infobar>
                    ) : tab === "Cancelled Orders" ? (
                        <Infobar>
                            You haven't cancelled any orders yet! {emoji("😄")}
                        </Infobar>
                    ) : (
                        <Infobar>
                            No delivered orders yet! {emoji("😅")}
                        </Infobar>
                    )}
                </TabPanel>
            ))}
        </>
    );
};

export default History;
