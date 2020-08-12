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
        <div className={"card" + border}>
            <article className={"card-body" + ui + syntax}>
                <Link
                    to="/registration"
                    className={"float-right btn btn-outline-" + type}
                >
                    Sign up
                </Link>
                <h4 className="card-title mb-4 mt-1">Sign in</h4>
                <form>
                    <div className="form-group">
                        {/* <label>Your email</label>
                        <FontAwesomeIcon
                            className="fa-icon"
                            icon={["fas", "user"]}
                        /> */}
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
                            className="form-control"
                            placeholder="Email"
                            type="email"
                        />
                    </div>
                    <div className="form-group">
                        <Link className={"float-right" + link} to="#">
                            Forgot?
                        </Link>
                        <label>Your password</label>
                        <input
                            className={"form-control" + border}
                            placeholder="******"
                            type="password"
                        />
                    </div>
                    <div className="form-group">
                        <div className="checkbox">
                            <label>
                                <input type="checkbox" /> Save password
                            </label>
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
