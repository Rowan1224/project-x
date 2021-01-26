import React, { useContext, useRef, useState } from "react";
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
    const [isServiceProvider, setIsServiceProvider] = useState(false);
    const [showVerificationArea, setShowVerificationArea] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const API_URL = isServiceProvider ? "/servicelogin/" : "/login/";

        const loadData = async () => {
            const formData = new FormData(form.current);
            // const plainFormData = Object.fromEntries(formData.entries());
	        // const formDataJsonString = JSON.stringify(plainFormData);
            var object = {};
            formData.forEach(function(value, key){
                object[key] = value;
            });
            var json = JSON.stringify(object);
            console.log(json);
            try {
                const response = await fetch(API_URL, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        
                    },
                    body: json,
                                })

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
        setShowVerificationArea(true);
    };

    const handleCheck = () => setIsServiceProvider(!isServiceProvider);

    return (
        <div
            className={"card mx-auto" + ui + syntax + border}
            style={{ maxWidth: "30rem" }}
        >
            <article className="card-body p-md-5 mx-auto">
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

                    {showVerificationArea ? (
                        <div
                            className={
                                "form-group input-group rounded" + border
                            }
                        >
                            <div className="input-group-prepend">
                                <span className="input-group-text rounded-0">
                                    <FontAwesomeIcon icon={["fas", "code"]} />
                                </span>
                            </div>
                            <input
                                required
                                name=""
                                type="number"
                                placeholder="Verification Code"
                                className="form-control rounded-0"
                            />
                        </div>
                    ) : (
                        <div className="text-center">
                            <input type="checkbox" onClick={handleCheck} />
                            <label className="ml-1">
                                Login as a Service Provider
                            </label>
                        </div>
                    )}

                    <div className="text-center mb-3">
                        <small>
                            A verification code will be sent to this phone
                            number to login into your account
                        </small>
                    </div>

                    <div className="form-group">
                        <Button type="submit" variant={type} className="w-100">
                            {showVerificationArea
                                ? "Login"
                                : "Send Verification Code"}
                        </Button>
                    </div>
                </form>
            </article>
        </div>
    );
};

export default LoginForm;
