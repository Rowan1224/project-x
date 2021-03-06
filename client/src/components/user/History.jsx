import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Link } from "react-router-dom";
import emoji from "react-easy-emoji";
import Infobar from "../generic/infobar";
import Moment from "moment";
import CustomTable from "../generic/CustomTable";
import SearchBar from "../generic/SearchBar";

const History = (props) => {
    const [isServiceProvider] = useState(
        localStorage.getItem("isServiceProvider") === "true"
    );

    const [histories, setHistories] = useState([]);
    const [searchData, setSearchData] = useState("");

    // Themes
    const { isLightTheme, theme } = useContext(ThemeContext);
    const link = isLightTheme ? theme.light.link : theme.dark.link;

    // componentDidMount
    useEffect(() => {
        const API_URL = isServiceProvider
            ? "/getserviceorderhistory/"
            : "/getcustomerorderhistory";

        const loadData = async () => {
            const bodyData = {
                search_data: searchData,
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
            setHistories(data.details);
        };
        loadData();
    }, [isServiceProvider, searchData]);

    const handleChange = (e) => setSearchData(e.target.value);

    const tableData = {
        ths: isServiceProvider
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
        allowedEntry: isServiceProvider
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
            <Infobar>Order History</Infobar>

            <SearchBar
                handleChange={handleChange}
                placeholder="Search histories...."
            />

            {histories ? (
                <CustomTable
                    ths={tableData.ths}
                    allowedEntry={tableData.allowedEntry}
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
                    datas={histories}
                    tdsClassName={tableData.tdsClassName}
                    ActionComponents={[
                        {
                            component: (history) => (
                                <>
                                    <span className="font-weight-bold">৳ </span>
                                    {history.payment}
                                </>
                            ),
                            className: "",
                        },
                        {
                            component: (history) =>
                                Moment(history.time).format("DD/MM/YY hh:mmA"),
                            className: "",
                        },
                    ]}
                />
            ) : (
                <Infobar>You have no history to show {emoji("🙁")}</Infobar>
            )}
        </>
    );
};

export default History;
