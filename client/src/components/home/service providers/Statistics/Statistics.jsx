import moment from "moment";
import "moment-duration-format";
import { withRouter } from "react-router-dom";
import React, { useContext, useRef, useState, useEffect } from "react";

import { ThemeContext } from "../../../../contexts/ThemeContext";
import { Button, Row, Col } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import CustomAlert from "../../../generic/CustomAlert";
import CustomTable from "../../../generic/CustomTable";
import Charts from "./Charts";

const Statistics = (props) => {
    const form = useRef(null);
    const [status, setStatus] = useState(undefined);
    const [statistics, setStatistics] = useState({});
    const [date, setDate] = useState({
        start_date: moment(new Date().toLocaleDateString("en-CA"))
            .subtract(1, "year")
            .format("YYYY-MM-DD"),
        end_date: new Date().toLocaleDateString("en-CA"),
    });

    // Themes
    const { isLightTheme, theme } = useContext(ThemeContext);
    const ui = isLightTheme ? theme.light.ui : theme.dark.ui;
    const type = isLightTheme ? theme.light.type : theme.dark.type;
    const syntax = isLightTheme ? theme.light.syntax : theme.dark.syntax;
    const border = isLightTheme ? theme.light.border : theme.dark.border;
    const custom_text = isLightTheme
        ? theme.light.custom_text
        : theme.dark.custom_text;

    // componentDidMount
    useEffect(() => {
        handleSubmit();
    }, []);

    const handleSubmit = (e) => {
        e && e.preventDefault();

        const API_URL = "/getservicestats/";

        const loadData = async () => {
            const formData = new FormData(form.current);

            let object = {};
            formData.forEach((value, key) => {
                object[key] = value;
            });

            object["service_id"] = localStorage.getItem("userID");
            object["end_date"] = moment(object["end_date"])
                .add(1, "days")
                .format("YYYY-MM-DD");

            setDate({
                start_date: object["start_date"],
                end_date: object["end_date"],
            });

            try {
                const response = await fetch(API_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(object),
                });

                const data = await response.json();

                if (!response.ok) setStatus(data.message);
                else setStatistics(data);
            } catch (error) {
                setStatus(error);
            }
        };

        loadData();
    };

    const tableData = {
        ths: [
            { className: "", value: "Employee Name" },
            { className: "", value: "Phone Number" },
            { className: "", value: "Delivered" },
            { className: "", value: "Income" },
        ],
        allowedEntry: ["name", "phone", "delivered"],
    };

    return (
        <>
            <div className={"card mb-4" + ui + syntax + border}>
                <div className="card-body">
                    <h4 className={"text-center m-0" + custom_text}>
                        Statistics of last{" "}
                        {moment
                            .duration(
                                moment(date.end_date).diff(
                                    moment(date.start_date)
                                )
                            )
                            .format("Y [year] M [month] w [week] d [days]")}
                    </h4>
                </div>
            </div>

            {status && <CustomAlert status={status} />}

            <Row>
                <Col className="mb-4">
                    <div className={"card" + ui + syntax + border}>
                        <div className="card-body">
                            <form ref={form} onSubmit={handleSubmit}>
                                <Row className="d-flex align-items-center">
                                    <Col lg={4}>
                                        <Row className="mb-lg-0 mb-3">
                                            <Col className="my-auto">
                                                <FontAwesomeIcon
                                                    className="mr-2"
                                                    icon={[
                                                        "fas",
                                                        "hourglass-start",
                                                    ]}
                                                />
                                                Start Date:
                                            </Col>
                                            <Col
                                                md={7}
                                                sm={12}
                                                className="my-auto"
                                            >
                                                <div
                                                    className={
                                                        "input-group rounded" +
                                                        border
                                                    }
                                                >
                                                    <input
                                                        required
                                                        type="date"
                                                        id="start_date"
                                                        name="start_date"
                                                        placeholder="2020-02-17"
                                                        defaultValue={
                                                            date.start_date
                                                        }
                                                        className="form-control text-center rounded-0"
                                                    />
                                                    <div className="invalid-feedback">
                                                        Please select a valid
                                                        date
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>

                                    <Col lg={4}>
                                        <Row className="mb-lg-0 mb-3">
                                            <Col className="my-auto">
                                                <FontAwesomeIcon
                                                    className="mr-2"
                                                    icon={[
                                                        "fas",
                                                        "hourglass-end",
                                                    ]}
                                                />
                                                Start Date:
                                            </Col>
                                            <Col
                                                md={7}
                                                sm={12}
                                                className="my-auto"
                                            >
                                                <div
                                                    className={
                                                        "input-group rounded" +
                                                        border
                                                    }
                                                >
                                                    <input
                                                        required
                                                        type="date"
                                                        id="end_date"
                                                        name="end_date"
                                                        placeholder="2021-02-18"
                                                        defaultValue={
                                                            date.end_date
                                                        }
                                                        className="form-control text-center rounded-0"
                                                    />
                                                    <div className="invalid-feedback">
                                                        Please provide a valid
                                                        date
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>

                                    <Col lg={4}>
                                        <Button
                                            type="submit"
                                            variant={type}
                                            className="w-100"
                                        >
                                            <FontAwesomeIcon
                                                className="mr-2"
                                                icon={[
                                                    "fas",
                                                    "file-invoice-dollar",
                                                ]}
                                            />
                                            Update statistics
                                        </Button>
                                    </Col>
                                </Row>
                            </form>
                        </div>
                    </div>
                </Col>
            </Row>

            <Charts
                date={date}
                extraData={
                    <div className={"card h-100" + ui + syntax + border}>
                        <div className="card-body d-flex mx-auto">
                            <div className="my-auto">
                                <Row className="form-group">
                                    <Col className="my-auto">
                                        <FontAwesomeIcon
                                            className="mr-2"
                                            icon={["fas", "sort-amount-down"]}
                                        />
                                        Orders Recieved:
                                    </Col>
                                    <Col md={6} sm={12}>
                                        <div
                                            className={
                                                "input-group rounded" + border
                                            }
                                        >
                                            <input
                                                readOnly
                                                type="number"
                                                name="total_orders"
                                                defaultValue={
                                                    statistics.total_orders
                                                }
                                                className="form-control text-center rounded-0"
                                            />
                                        </div>
                                    </Col>
                                </Row>

                                <Row className="form-group">
                                    <Col className="my-auto">
                                        <FontAwesomeIcon
                                            className="mr-2"
                                            icon={["fas", "truck"]}
                                        />
                                        Delivered:
                                    </Col>
                                    <Col md={6} sm={12}>
                                        <div
                                            className={
                                                "input-group rounded" + border
                                            }
                                        >
                                            <input
                                                readOnly
                                                type="number"
                                                name="delivered"
                                                defaultValue={
                                                    statistics.delivered
                                                }
                                                className="form-control text-center rounded-0"
                                            />
                                        </div>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col className="my-auto">
                                        <span className="font-weight-bold mr-2">
                                            ৳
                                        </span>
                                        Total Income:
                                    </Col>
                                    <Col md={6} sm={12}>
                                        <div
                                            className={
                                                "input-group rounded" + border
                                            }
                                        >
                                            <input
                                                readOnly
                                                type="number"
                                                name="income"
                                                defaultValue={statistics.income}
                                                className="form-control text-center rounded-0"
                                            />
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                }
            />

            {statistics.employee && statistics.employee.length > 0 && (
                <Row>
                    <Col>
                        <CustomTable
                            ths={tableData.ths}
                            datas={statistics.employee}
                            allowedEntry={tableData.allowedEntry}
                            ActionComponents={[
                                {
                                    component: (employee) => (
                                        <>
                                            <span className="font-weight-bold">
                                                ৳{" "}
                                            </span>
                                            {employee.income}
                                        </>
                                    ),
                                    className: "",
                                },
                            ]}
                        />
                    </Col>
                </Row>
            )}
        </>
    );
};

export default withRouter(Statistics);
