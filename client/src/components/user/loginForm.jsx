import React, { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Button } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LoginForm = (props) => {
    // Themes
    const { isLightTheme, theme } = useContext(ThemeContext);
    const ui = isLightTheme ? theme.light.ui : theme.dark.ui;
    const type = isLightTheme ? theme.light.type : theme.dark.type;
    const syntax = isLightTheme ? theme.light.syntax : theme.dark.syntax;
    const border = isLightTheme ? theme.light.border : theme.dark.border;

    const form = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        const API_URL = "/login/";

        const loadData = async () => {
            const formData = new FormData(form.current);

            try {
                const response = await fetch(API_URL, {
                    method: "POST",
                    body: formData,
                });

                const data = await response.json();
                console.log(data);

                // if (!response.ok) setStatus(data.non_field_errors);
                // else {
                //     localStorage.setItem("userID", data.user.pk);
                //     handleAuthentication("Yes");
                //     window.location.replace("/");
                // }
            } catch (error) {
                // setStatus(error);
            }
        };

        loadData();
    };

    return (
        <div className={"card" + ui + syntax + border}>
            <article
                className="card-body p-5 mx-auto"
                style={{ maxWidth: "30rem" }}
            >
                <div className="d-flex justify-content-between mb-4 mx-0">
                    <div className="w-50 p-0">
                        <img
                            src="/img/profile_pic.png"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "/img/Default.png";
                            }}
                            alt="profile"
                            className={"rounded w-100" + border}
                        />
                    </div>

                    {/* <div className="col-2 mb-5"></div> */}
                    <div className="text-center my-auto">
                        <Link
                            to="/registration"
                            className={"btn btn-outline-" + type}
                        >
                            Sign up
                        </Link>
                        <div className="my-3 text-center divider-text">
                            <span className={"px-4" + ui}>OR</span>
                        </div>
                        <h5 className="card-title">Sign in</h5>
                    </div>
                </div>

                <form ref={form} onSubmit={handleSubmit}>
                    {/* <div className="form-group">
                        <label>Your email</label>
                        <div className={"input-group rounded" + border}>
                            <div className="input-group-prepend">
                                <span className="input-group-text rounded-0">
                                    <FontAwesomeIcon
                                        className="fa-icon"
                                        icon={["fas", "user"]}
                                    />
                                </span>
                            </div>
                            <input
                                name=""
                                className="form-control rounded-0"
                                placeholder="Email"
                                type="email"
                            />
                        </div>
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
                            <option value="1">+972</option>
                            <option value="2">+198</option>
                            <option value="3">+701</option>
                        </select>
                        <input
                            required
                            name="phone"
                            type="number"
                            placeholder="Phone number"
                            className="form-control rounded-0"
                        />
                    </div>

                    {/* <div className="form-group">
                        <div className={link}>
                            <Link className="float-right" to="#">
                                Forgot?
                            </Link>
                        </div>
                        <label>Your password</label>
                        <div className={"input-group rounded" + border}>
                            <div className="input-group-prepend">
                                <span className="input-group-text rounded-0">
                                    <FontAwesomeIcon
                                        className="fa-icon"
                                        icon={["fas", "lock"]}
                                    />
                                </span>
                            </div>
                            <input
                                className="form-control rounded-0"
                                placeholder="Password"
                                type="password"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="checkbox">
                            <input type="checkbox" />
                            <label className="ml-1">Save password</label>
                        </div>
                    </div> */}

                    <div className="text-center mb-3">
                        <small>
                            A verification code will be sent to this phone
                            number to login into your account
                        </small>
                    </div>

                    <div className="form-group">
                        <Button type="submit" variant={type} className="w-100">
                            Send Verification Code
                        </Button>
                    </div>
                </form>
            </article>
        </div>
    );
};

export default LoginForm;
