import Moment from "moment";
import React, { useContext, useRef, useState } from "react";
import { withRouter } from "react-router-dom";

import { ThemeContext } from "../../../contexts/ThemeContext";
import { Button, Row, Col } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import CustomAlert from "../../generic/CustomAlert";
import CustomTable from "../../generic/CustomTable";

const Statistics = (props) => {
    const form = useRef(null);
    const [showStat, setShowStat] = useState(false);
    const [status, setStatus] = useState(undefined);
    const [statistics, setStatistics] = useState({});

    // Themes
    const { isLightTheme, theme } = useContext(ThemeContext);
    const ui = isLightTheme ? theme.light.ui : theme.dark.ui;
    const type = isLightTheme ? theme.light.type : theme.dark.type;
    const syntax = isLightTheme ? theme.light.syntax : theme.dark.syntax;
    const border = isLightTheme ? theme.light.border : theme.dark.border;

    const handleSubmit = (e) => {
        e.preventDefault();

        const API_URL = "/getservicestats/";

        const loadData = async () => {
            const formData = new FormData(form.current);

            let object = {};
            formData.forEach((value, key) => {
                object[key] = value;
            });

            object["service_id"] = localStorage.getItem("userID");
            object["end_date"] = Moment(object["end_date"])
                .add(1, "days")
                .format("YYYY-MM-DD");

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
                else {
                    setShowStat(true);
                    setStatistics(data);
                }
            } catch (error) {
                setStatus(error);
            }
        };

        loadData();
    };

    const tableData = {
        ths: [
            { className: "", value: "Employee Name" },
            { className: "", value: "Delivered" },
            { className: "", value: "Income" },
        ],
        allowedEntry: ["name", "delivered"],
    };

    return (
        <>
            <Row>
                <Col
                    md={showStat && 6}
                    className="mb-4 mx-auto"
                    style={{ maxWidth: "36rem" }}
                >
                    <div className={"card h-100" + ui + syntax + border}>
                        <div
                            style={{ maxWidth: "30rem" }}
                            className="card-body d-flex mx-auto"
                        >
                            <form
                                ref={form}
                                className="my-auto"
                                onSubmit={handleSubmit}
                            >
                                {status && <CustomAlert status={status} />}

                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="start_date">
                                            Start Date
                                        </label>
                                        <input
                                            required
                                            type="date"
                                            id="start_date"
                                            name="start_date"
                                            placeholder="2021-02-17"
                                            defaultValue={new Date().toLocaleDateString(
                                                "en-CA"
                                            )}
                                            className={
                                                "form-control text-center" +
                                                border
                                            }
                                        />
                                        <div className="invalid-feedback">
                                            Please select a valid date
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="end_date">
                                            End date
                                        </label>
                                        <input
                                            required
                                            type="date"
                                            id="end_date"
                                            name="end_date"
                                            placeholder="2021-02-18"
                                            defaultValue={new Date().toLocaleDateString(
                                                "en-CA"
                                            )}
                                            className={
                                                "form-control text-center" +
                                                border
                                            }
                                        />
                                        <div className="invalid-feedback">
                                            Please provide a valid date
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    variant={type}
                                    className="w-100"
                                >
                                    <FontAwesomeIcon
                                        className="mr-2"
                                        icon={["fas", "file-invoice-dollar"]}
                                    />
                                    Show statistics
                                </Button>
                            </form>
                        </div>
                    </div>
                </Col>

                {showStat && (
                    <Col md={6} className="mb-4">
                        <div className={"card" + ui + syntax + border}>
                            <div
                                style={{ maxWidth: "30rem" }}
                                className="card-body d-flex mx-auto"
                            >
                                <form
                                    className="my-auto"
                                    onSubmit={handleSubmit}
                                >
                                    <Row className="form-group">
                                        <Col className="my-auto">
                                            <FontAwesomeIcon
                                                className="mr-2"
                                                icon={[
                                                    "fas",
                                                    "sort-amount-down",
                                                ]}
                                            />
                                            Total Orders:
                                        </Col>
                                        <Col md={6} sm={12}>
                                            <div
                                                className={
                                                    "input-group rounded" +
                                                    border
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
                                                    "input-group rounded" +
                                                    border
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
                                                    "input-group rounded" +
                                                    border
                                                }
                                            >
                                                <input
                                                    readOnly
                                                    type="number"
                                                    name="income"
                                                    defaultValue={
                                                        statistics.income
                                                    }
                                                    className="form-control text-center rounded-0"
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                </form>
                            </div>
                        </div>
                    </Col>
                )}
            </Row>

            {showStat && statistics.employee && statistics.employee.length > 0 && (
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
