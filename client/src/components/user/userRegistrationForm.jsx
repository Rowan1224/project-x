import React, { useContext, useState, useRef } from "react";
import { Button } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTwitter, faFacebook } from "@fortawesome/free-brands-svg-icons";

import { Link } from "react-router-dom";
import { ThemeContext } from "../../contexts/ThemeContext";

const RegistrationForm = () => {
    const form = useRef(null);
    const [isServiceProvider, setIsServiceProvider] = useState(false);

    // Themes
    const { isLightTheme, theme } = useContext(ThemeContext);
    const ui = isLightTheme ? theme.light.ui : theme.dark.ui;
    const link = isLightTheme ? theme.light.link : theme.dark.link;
    const type = isLightTheme ? theme.light.type : theme.dark.type;
    const syntax = isLightTheme ? theme.light.syntax : theme.dark.syntax;
    const border = isLightTheme ? theme.light.border : theme.dark.border;

    const handleSelect = (e) => {
        e.target.value === "2"
            ? setIsServiceProvider(true)
            : setIsServiceProvider(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const API_URL = isServiceProvider ? "/serviceregister/" : "/register/";

        const loadData = async () => {
            const formData = new FormData(form.current);

            try {
                const response = await fetch(API_URL, {
                    method: "POST",
                    body: formData,
                });

                const data = await response.json();

                console.log(data);
                // if (!response.ok) setStatus(data[Object.keys(data)[0]]);
                // else props.history.push(`/email/confirmation/sent/${email}`);
            } catch (error) {
                // setStatus(error);
            }
        };

        loadData();
    };

    return (
        <div className={"card py-4 shadow" + ui + syntax + border}>
            <article
                className="card-body mx-auto"
                style={{ maxWidth: "500px" }}
            >
                <h4 className="card-title mt-3 text-center">
                    Create an Account
                </h4>
                <p className="text-center">
                    Get started with your free account
                </p>

                {/* <div className="text-center">
                    <Button variant="twitter" className="mb-2 w-100">
                        <FontAwesomeIcon className="mr-2" icon={faTwitter} />
                        Signup via Twitter
                    </Button>

                    <Button variant="facebook" className="w-100">
                        <FontAwesomeIcon className="mr-2" icon={faFacebook} />
                        Signup via facebook
                    </Button>
                </div>

                <div className="my-3 text-center divider-text">
                    <span className={"px-4" + ui}>OR</span>
                </div> */}

                <form ref={form} onSubmit={handleSubmit}>
                    <div className={"form-group input-group rounded" + border}>
                        <div className="input-group-prepend">
                            <span className="input-group-text rounded-0">
                                <FontAwesomeIcon icon={["fas", "user"]} />
                            </span>
                        </div>
                        <input
                            name={
                                isServiceProvider ? "service_name" : "username"
                            }
                            type="text"
                            placeholder="Username"
                            className="form-control rounded-0"
                        />
                    </div>

                    {/* <div className={"form-group input-group rounded" + border}>
                        <div className="input-group-prepend">
                            <span className="input-group-text rounded-0">
                                <FontAwesomeIcon
                                    icon={["fas", "envelope"]}
                                />
                            </span>
                        </div>
                        <input
                            name=""
                            className="form-control rounded-0"
                            placeholder="Email address"
                            type="email"
                        />
                    </div> */}

                    <div className={"form-group input-group rounded" + border}>
                        <div className="input-group-prepend">
                            <span className="input-group-text rounded-0">
                                <FontAwesomeIcon icon={["fas", "phone"]} />
                            </span>
                        </div>
                        <select
                            className="custom-select"
                            style={{ maxWidth: "85px" }}
                        >
                            <option defaultValue="">+880</option>
                            {/* <option value="1">+972</option>
                            <option value="2">+198</option>
                            <option value="3">+701</option> */}
                        </select>
                        <input
                            name="phone_1"
                            type="number"
                            className="form-control rounded-0"
                            placeholder="Phone number"
                        />
                    </div>

                    <div className={"form-group input-group rounded" + border}>
                        <div className="input-group-prepend">
                            <span className="input-group-text rounded-0">
                                <FontAwesomeIcon icon={["fas", "building"]} />
                            </span>
                        </div>
                        <select
                            required
                            onChange={handleSelect}
                            className="form-control rounded-0"
                        >
                            {/* <option defaultValue="">Select your role</option> */}
                            <option defaultValue="1">Customer</option>
                            <option value="2">Service Provider</option>
                        </select>
                    </div>

                    {isServiceProvider && (
                        <>
                            <div
                                className={
                                    "form-group input-group rounded" + border
                                }
                            >
                                <div className="input-group-prepend">
                                    <span className="input-group-text rounded-0">
                                        <FontAwesomeIcon
                                            icon={["fas", "id-card"]}
                                        />
                                    </span>
                                </div>
                                <input
                                    name="nid"
                                    type="number"
                                    className="form-control rounded-0"
                                    placeholder="NID number"
                                />
                            </div>

                            <div
                                className={
                                    "form-group input-group rounded" + border
                                }
                            >
                                <div className="input-group-prepend">
                                    <span className="input-group-text rounded-0">
                                        <FontAwesomeIcon
                                            icon={["fas", "id-card"]}
                                        />
                                    </span>
                                </div>
                                <input
                                    name="trade_license"
                                    type="number"
                                    className="form-control rounded-0"
                                    placeholder="Trade license number"
                                />
                            </div>

                            <div
                                className={
                                    "form-group input-group rounded" + border
                                }
                            >
                                <div className="input-group-prepend">
                                    <span className="input-group-text rounded-0">
                                        <FontAwesomeIcon
                                            icon={["fas", "building"]}
                                        />
                                    </span>
                                </div>
                                <input
                                    name="company_name"
                                    type="text"
                                    className="form-control rounded-0"
                                    placeholder="Company name"
                                />
                            </div>

                            <div
                                className={
                                    "form-group input-group rounded" + border
                                }
                            >
                                <div className="input-group-prepend">
                                    <span className="input-group-text rounded-0">
                                        <FontAwesomeIcon
                                            icon={["fas", "taxi"]}
                                        />
                                    </span>
                                </div>
                                <input
                                    name="service_type"
                                    type="text"
                                    className="form-control rounded-0"
                                    placeholder="Service type"
                                />
                            </div>

                            <div
                                className={
                                    "form-group input-group rounded" + border
                                }
                            >
                                <div className="input-group-prepend">
                                    <span className="input-group-text rounded-0">
                                        <FontAwesomeIcon
                                            icon={["fas", "hand-holding-usd"]}
                                        />
                                    </span>
                                </div>
                                <input
                                    name="delivery_charge"
                                    type="number"
                                    className="form-control rounded-0"
                                    placeholder="Delivery charge"
                                />
                            </div>

                            <div
                                className={
                                    "form-group input-group rounded" + border
                                }
                            >
                                <div className="input-group-prepend">
                                    <span className="input-group-text rounded-0">
                                        <FontAwesomeIcon
                                            icon={["fas", "plus"]}
                                        />
                                    </span>
                                </div>
                                <input
                                    name="description"
                                    type="text"
                                    className="form-control rounded-0"
                                    placeholder="Description"
                                />
                            </div>

                            <div
                                className={
                                    "form-group input-group rounded" + border
                                }
                            >
                                <div className="input-group-prepend">
                                    <span className="input-group-text rounded-0">
                                        <FontAwesomeIcon
                                            icon={["fas", "home"]}
                                        />
                                    </span>
                                </div>
                                <input
                                    name=""
                                    disabled
                                    type="text"
                                    className="form-control rounded-0"
                                    placeholder="House"
                                />
                                <input
                                    name=""
                                    disabled
                                    type="text"
                                    className="form-control rounded-0"
                                    placeholder="Road"
                                />
                            </div>

                            <div
                                className={
                                    "form-group input-group rounded" + border
                                }
                            >
                                <div className="input-group-prepend">
                                    <span className="input-group-text rounded-0">
                                        <FontAwesomeIcon
                                            icon={["fas", "location-arrow"]}
                                        />
                                    </span>
                                </div>
                                <input
                                    type="text"
                                    name="address"
                                    className="form-control rounded-0"
                                    placeholder="Location Description"
                                />
                            </div>
                        </>
                    )}

                    {/* <div className={"form-group input-group rounded" + border}>
                        <div className="input-group-prepend">
                            <span className="input-group-text rounded-0">
                                <FontAwesomeIcon
                                    icon={["fas", "lock"]}
                                />
                            </span>
                        </div>
                        <input
                            className="form-control rounded-0"
                            placeholder="Create password"
                            type="password"
                        />
                    </div>
                    <div className={"form-group input-group rounded" + border}>
                        <div className="input-group-prepend">
                            <span className="input-group-text rounded-0">
                                <FontAwesomeIcon
                                    icon={["fas", "lock"]}
                                />
                            </span>
                        </div>
                        <input
                            className="form-control rounded-0"
                            placeholder="Repeat password"
                            type="password"
                        />
                    </div> */}

                    <div className="form-group">
                        <Button variant={type} type="submit" className="w-100">
                            Create Account
                        </Button>
                    </div>

                    <div className={"text-center" + link}>
                        Have an account? <Link to="/login">Log In</Link>
                    </div>
                </form>
            </article>
        </div>
    );
};

export default RegistrationForm;
