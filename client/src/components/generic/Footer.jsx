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
                    <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
                        <h5>About</h5>
                        <hr style={bottomBorder} className="mb-3 mt-n1" />

                        <p className="text-justify">
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Iste atque ea quis molestias. Fugiat pariatur
                            maxime quis culpa corporis vitae repudiandae aliquam
                            voluptatem veniam, est atque cumque eum delectus
                            sint! Iste atque ea quis molestias. Fugiat pariatur
                            maxime quis culpa corporis vitae veniam, est atque
                            cumque eum delectus sint!
                        </p>
                    </div>

                    <div className="col-lg-3 col-6 mb-4 mb-md-0 text-lg-right">
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
                    </div>

                    <div className="col-lg-3 col-6 mb-4 mb-md-0 text-right">
                        <h5>Contacts</h5>
                        <hr style={bottomBorder} className="mb-3 mt-n1" />

                        <div className={link}>
                            <p>
                                <FontAwesomeIcon
                                    className="mr-2"
                                    icon={["fas", "phone"]}
                                />
                                + 01 234 567 88
                            </p>
                            <p>
                                <FontAwesomeIcon
                                    className="mr-2"
                                    icon={["fas", "fax"]}
                                />
                                + 01 234 567 89
                            </p>
                            <p>
                                <FontAwesomeIcon
                                    className="mr-2"
                                    icon={["fas", "envelope"]}
                                />
                                info@example.com
                            </p>
                            <p>
                                <FontAwesomeIcon
                                    className="mr-2"
                                    icon={["fas", "home"]}
                                />
                                New York, NY 10012, US
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
