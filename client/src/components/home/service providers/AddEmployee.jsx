import React, { useContext, useRef, useState } from "react";

import { Link } from "react-router-dom";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { Button } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import CustomAlert from "../../generic/CustomAlert";
import CustomModalAlert from "../../generic/CustomModalAlert";
// import { AuthenticationContext } from "../../../contexts/AuthenticationContext";

const AddEmployee = (props) => {
    const form = useRef(null);
    const [status, setStatus] = useState(undefined);
    const [variant, setVariant] = useState("danger");
    // const { handleAuthentication } = useContext(AuthenticationContext);

    // const [isServiceProvider, setIsServiceProvider] = useState(false);
    // const [showVerificationArea, setShowVerificationArea] = useState(false);

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
                } else setStatus(data.message);
            } catch (error) {
                setStatus(error);
            }
        };

        loadData();
    };

    return (
        <div
            className={"card mx-auto" + ui + syntax + border}
            style={{ maxWidth: "35rem" }}
        >
            <div className="card-body col">
                <form ref={form} onSubmit={handleSubmit}>
                    {status &&
                        (variant === "success" ? (
                            <CustomModalAlert
                                status={status}
                                variant={variant}
                                setStatus={setStatus}
                                redirect="/employee/list"
                            />
                        ) : (
                            <CustomAlert status={status} variant={variant} />
                        ))}

                    <div className={"form-group input-group rounded" + border}>
                        <div className="input-group-prepend">
                            <span className="input-group-text rounded-0">
                                <FontAwesomeIcon
                                    className="fa-icon"
                                    icon={["fas", "user-plus"]}
                                />
                            </span>
                        </div>
                        <input
                            required
                            type="text"
                            name="employee_name"
                            placeholder="Employee name"
                            className="form-control rounded-0"
                        />
                    </div>

                    <div className={"form-group input-group rounded" + border}>
                        <div className="input-group-prepend">
                            <span className="input-group-text rounded-0">
                                <FontAwesomeIcon
                                    className="fa-icon mr-1"
                                    icon={["fas", "phone"]}
                                />
                            </span>
                        </div>
                        <input
                            required
                            type="number"
                            name="phone_number"
                            placeholder="Phone Number"
                            className="form-control rounded-0"
                        />
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <Button
                                as={Link}
                                to="/employee/list"
                                variant={"outline-" + type}
                                className="w-100 mb-2 mb-md-0"
                            >
                                <FontAwesomeIcon
                                    className="mr-2"
                                    icon={["fas", "users"]}
                                />
                                Show Employee List
                            </Button>
                        </div>

                        <div className="col-md-6">
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
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEmployee;
