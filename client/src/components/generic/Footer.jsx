import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ThemeContext } from "../../contexts/ThemeContext";

const Footer = () => {
    // Themes
    const { isLightTheme, theme } = useContext(ThemeContext);
    const bg = isLightTheme ? theme.light.bg : theme.dark.bg;
    const link = isLightTheme ? theme.light.link : theme.dark.link;
    const mainColor = isLightTheme
        ? theme.light.mainColor
        : theme.dark.mainColor;
    const syntax = isLightTheme ? theme.light.syntax : theme.dark.syntax;
    const custom_text = isLightTheme
        ? theme.light.custom_text
        : theme.dark.custom_text;

    const bottomBorder = {
        width: "60px",
        height: "2px",
        display: "inline-block",
        backgroundColor: mainColor,
    };

    return (
        <footer style={{ backgroundColor: bg }} className={"pt-5" + syntax}>
            <div className="container p-4">
                <div className="row">
                    <div className="col-md-8 mb-4 mb-md-0">
                        <h5>About</h5>
                        <hr style={bottomBorder} className="mb-3 mt-n1" />

                        <p className="text-justify">
                            Project X is founded with a vision to provide every
                            customer with a choice; The choice of buying
                            organic, authentic and cost effective products with
                            minimum friction. Project X is founded in 2020 by
                            students at{" "}
                            <a
                                target="_blank"
                                rel="noreferrer"
                                className={custom_text}
                                href="https://www.sust.edu/"
                            >
                                SUST
                            </a>
                            . The local market place will be only finger-tips
                            away for any customer in possession of a
                            smartphone/computer and an internet connection. They
                            will be able to purchase everything; from a
                            safety-pin to car from our website. For service
                            providers they can supervise their business at a
                            glace from the website.
                        </p>
                    </div>

                    {/* <div className="col-lg-3 col-6 mb-4 mb-md-0 text-lg-right">
                        <h5>Quick Links</h5>
                        <hr style={bottomBorder} className="mb-3 mt-n1" />

                        <div className={link}>
                            <p>
                                <a href="#!" className={custom_text}>
                                    Link 1
                                </a>
                            </p>
                            <p>
                                <a href="#!" className={custom_text}>
                                    Link 2
                                </a>
                            </p>
                            <p>
                                <a href="#!" className={custom_text}>
                                    Link 3
                                </a>
                            </p>
                            <p>
                                <a href="#!" className={custom_text}>
                                    Link 4
                                </a>
                            </p>
                        </div>
                    </div> */}

                    <div className="col-md-4 mb-4 mb-md-0 text-right">
                        <h5>Contacts</h5>
                        <hr style={bottomBorder} className="mb-3 mt-n1" />

                        <div className={link}>
                            <p>
                                <FontAwesomeIcon
                                    className="mr-2"
                                    icon={["fas", "phone"]}
                                />
                                01886298142
                            </p>
                            <p>
                                <FontAwesomeIcon
                                    className="mr-2"
                                    icon={["fas", "fax"]}
                                />
                                01534771222
                            </p>
                            <p>
                                <FontAwesomeIcon
                                    className="mr-2"
                                    icon={["fas", "envelope"]}
                                />
                                project_x@gmail.com
                            </p>
                            <p>
                                <FontAwesomeIcon
                                    className="mr-2"
                                    icon={["fas", "home"]}
                                />
                                Akhalia, Varsity gate, Sylhet
                            </p>
                        </div>
                    </div>
                </div>

                {localStorage.getItem("isAuthenticated") !== "Yes" && (
                    <div className={"text-center" + link}>
                        Register for free{" "}
                        <Link to="/registration" className={custom_text}>
                            Sign up
                        </Link>
                    </div>
                )}

                <section className="mt-4 text-center">
                    <a
                        href="#!"
                        role="button"
                        className="mx-4"
                        style={{ color: "#3b5998", fontSize: "1.5rem" }}
                    >
                        <FontAwesomeIcon icon={["fab", "facebook-f"]} />
                    </a>

                    <a
                        href="#!"
                        role="button"
                        className="mr-4"
                        style={{ color: "#55acee", fontSize: "1.5rem" }}
                    >
                        <FontAwesomeIcon icon={["fab", "twitter"]} />
                    </a>

                    <a
                        href="#!"
                        role="button"
                        className="mr-4"
                        style={{ color: "#dd4b39", fontSize: "1.5rem" }}
                    >
                        <FontAwesomeIcon icon={["fab", "google"]} />
                    </a>

                    <a
                        href="#!"
                        role="button"
                        className="mr-4"
                        style={{ color: "#ac2bac", fontSize: "1.5rem" }}
                    >
                        <FontAwesomeIcon icon={["fab", "instagram"]} />
                    </a>

                    <a
                        href="#!"
                        role="button"
                        className="mr-4"
                        style={{ color: "#0082ca", fontSize: "1.5rem" }}
                    >
                        <FontAwesomeIcon icon={["fab", "linkedin-in"]} />
                    </a>
                </section>
            </div>

            <div
                className={"text-center p-3" + link}
                // style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
            >
                © {new Date().getFullYear()} Copyright:{" "}
                <a className={custom_text} href="#!">
                    ProjectX | All rights reserved
                </a>
            </div>
        </footer>
    );
};

export default Footer;
