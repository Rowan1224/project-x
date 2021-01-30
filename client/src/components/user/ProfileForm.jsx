import React, { useEffect, useRef, useState, useContext } from "react";
import { Button, Card, Container, Row } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import CustomAlert from "../generic/CustomAlert";
import { AuthenticationContext } from "../../contexts/AuthenticationContext";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ThemeContext } from "../../contexts/ThemeContext";

const ProfileForm = () => {
    const [user, setUser] = useState({});
    const [status, setStatus] = useState(undefined);

    const { handleLogOut } = useContext(AuthenticationContext);

    // Themes
    const { isLightTheme, theme } = useContext(ThemeContext);
    const ui = isLightTheme ? theme.light.ui : theme.dark.ui;
    const type = isLightTheme ? theme.light.type : theme.dark.type;
    const syntax = isLightTheme ? theme.light.syntax : theme.dark.syntax;
    const border = isLightTheme ? theme.light.border : theme.dark.border;
    const form = useRef(null);
    const [isServiceProvider, setIsServiceProvider] = useState(false);
    const [showVerificationArea, setShowVerificationArea] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            const API_URL = "";
            const response = await fetch(API_URL, {
                method: "GET",
            });
            // if (response.status === 401) handleLogOut();

            const userData = await response.json();

            if (!response.ok) setStatus(userData.detail);
            else
                setUser({
                    name: "dhruvo",
                });
        };

        loadData();
    }, []);

    const handleSubmit = () => {};

    return (
        <div
            className={"card mx-auto" + ui + syntax + border}
            style={{ maxWidth: "50rem" }}
        >
            <article className="card-body">
                <h2 className="text-center">My Profile</h2>
                <form ref={form} onSubmit={handleSubmit}>
                    {status && <CustomAlert status={status} />}

                    <div className={"form-group input-group rounded" + border}>
                        <div className="input-group-prepend">
                            <span className="input-group-text rounded-0">
                                <FontAwesomeIcon icon={["fas", "user"]} />
                            </span>
                        </div>
                        <input
                            type="text"
                            name="username"
                            value="Shahriar Dhruvo"
                            className="form-control rounded-0"
                        />
                    </div>

                    <div className={"form-group input-group rounded" + border}>
                        <div className="input-group-prepend">
                            <span className="input-group-text rounded-0">
                                <FontAwesomeIcon icon={["fas", "phone"]} />
                            </span>
                        </div>
                        <input
                            name="phone"
                            type="number"
                            placeholder="Phone number"
                            className="form-control rounded-0"
                        />
                    </div>

                    <div className="row mt-3">
                        <div className="col-sm-12 mb-2 col-md-6">
                            <Button
                                variant={"outline-" + type}
                                className="w-100"
                                as={Link}
                                to="/"
                            >
                                <FontAwesomeIcon
                                    className="mr-2"
                                    icon={["fas", "sign-out-alt"]}
                                />
                                Logout
                            </Button>
                        </div>
                        <div className="col-sm-12 col-md-6 mb-2 text-right">
                            <Button variant={type} className="w-100">
                                <FontAwesomeIcon
                                    className="mr-2"
                                    icon={["fas", "wrench"]}
                                />
                                Update Profile
                            </Button>
                        </div>
                    </div>
                </form>
            </article>
        </div>
    );
};

export default ProfileForm;
