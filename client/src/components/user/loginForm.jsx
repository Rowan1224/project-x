import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Button } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LoginForm = (props) => {
    // Themes
    const { isLightTheme, theme } = useContext(ThemeContext);
    const ui = isLightTheme ? theme.light.ui : theme.dark.ui;
    const link = isLightTheme ? theme.light.link : theme.dark.link;
    const type = isLightTheme ? theme.light.type : theme.dark.type;
    const syntax = isLightTheme ? theme.light.syntax : theme.dark.syntax;
    const border = isLightTheme ? theme.light.border : theme.dark.border;

    return (
        <div className="card">
            <article className={"card-body p-5" + ui + syntax + border}>
                <div className="row mb-4 mx-0">
                    <div className="col-md-3 p-0">
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

                    <div className="col-md-7 mb-5"></div>
                    <div className="col-md-2 text-center float-right my-auto">
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

                <form>
                    <div className="form-group">
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
                    </div>
                    <div className="form-group">
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
                    </div>
                    <div className="form-group">
                        <Button type="submit" variant={type} className="w-100">
                            Login
                        </Button>
                    </div>
                </form>
            </article>
        </div>
    );
};

export default LoginForm;
