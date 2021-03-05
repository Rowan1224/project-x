import React, { useContext, useRef, useState } from "react";
import { Button, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ThemeContext } from "../../contexts/ThemeContext";

import CustomAlert from "../generic/CustomAlert";
import CustomModalAlert from "../generic/CustomModalAlert";

const AddEmployee = (props) => {
    const form = useRef(null);
    const [status, setStatus] = useState(undefined);
    const [variant, setVariant] = useState("danger");

    // Themes
    const { isLightTheme, theme } = useContext(ThemeContext);
    const ui = isLightTheme ? theme.light.ui : theme.dark.ui;
    const type = isLightTheme ? theme.light.type : theme.dark.type;
    const syntax = isLightTheme ? theme.light.syntax : theme.dark.syntax;
    const border = isLightTheme ? theme.light.border : theme.dark.border;

    const handleSubmit = (e) => {
        e.preventDefault();

        const API_URL = "/addEmployee/";

        const loadData = async () => {
            const formData = new FormData(form.current);
            let object = {};
            formData.forEach((value, key) => {
                object[key] = value;
            });
            object["service_id"] = localStorage.getItem("userID");

            try {
                const response = await fetch(API_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(object),
                });

                const data = await response.json();

                if (response.ok) {
                    setVariant("success");
                    setStatus(data.message);
                    props.updateFlag();
                } else {
                    setVariant("danger");
                    setStatus(data.message);
                }
            } catch (error) {
                setStatus(error);
            }
        };

        loadData();
    };

    return (
        <>
            {status &&
                (variant === "success" ? (
                    <CustomModalAlert
                        status={status}
                        variant={variant}
                        setStatus={setStatus}
                    />
                ) : (
                    <CustomAlert status={status} variant={variant} />
                ))}
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
                                                    className="fa-icon mr-2"
                                                    icon={["fas", "user-plus"]}
                                                />
                                                Name:
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
                                                        type="text"
                                                        id="employee_name"
                                                        name="employee_name"
                                                        placeholder="Employee name"
                                                        className="form-control text-center rounded-0"
                                                    />
                                                    <div className="invalid-feedback">
                                                        Please select a valid
                                                        name
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>

                                    <Col lg={5}>
                                        <Row className="mb-lg-0 mb-3">
                                            <Col className="my-auto">
                                                <FontAwesomeIcon
                                                    className="fa-icon mr-2"
                                                    icon={["fas", "phone"]}
                                                />
                                                Phone Number:
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
                                                        type="number"
                                                        id="phone_number"
                                                        name="phone_number"
                                                        placeholder="Phone Number"
                                                        className="form-control text-center rounded-0"
                                                    />
                                                    <div className="invalid-feedback">
                                                        Please provide a valid
                                                        phone number
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>

                                    <Col lg={3}>
                                        <Button
                                            type="submit"
                                            variant={type}
                                            className="w-100"
                                        >
                                            <FontAwesomeIcon
                                                className="mr-2"
                                                icon={["fas", "user-plus"]}
                                            />
                                            Add Employee
                                        </Button>
                                    </Col>
                                </Row>
                            </form>
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    );
};

export default AddEmployee;
