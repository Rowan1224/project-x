import React, { useContext, useState, useEffect } from "react";
import { Image, Modal, Button } from "react-bootstrap";
import Service from "./service";
import { v4 as uuidv4 } from "uuid";
import emoji from "react-easy-emoji";
import Infobar from "../../generic/infobar";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Services = (props) => {
    const [services, setServices] = useState([]);
    const [sName, setSName] = useState("");
    const [show, setShow] = useState(false);
    const params = useParams();

    // componentDidMount
    useEffect(() => {
        const API_URL = "/ownProducts/";

        const loadData = async () => {
            const servideID = {
                service_id: params.id,
            };

            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(servideID),
            });

            const data = await response.json();

            setServices(data.products);
        };
        loadData();
    }, [params]);

    useEffect(() => {
        const API_URL = "/getProfile/";

        const loadData = async () => {
            const servideID = {
                service_id:
                    services.length > 0 ? services[0].service_id : undefined,
            };

            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(servideID),
            });

            const data = await response.json();

            setSName(data.service_name);
        };
        loadData();
    }, [services]);

    // Themes
    const { isLightTheme, theme } = useContext(ThemeContext);
    const ui = isLightTheme ? theme.light.ui : theme.dark.ui;
    const border = isLightTheme ? theme.light.border : theme.dark.border;
    const syntax = isLightTheme ? theme.light.syntax : theme.dark.syntax;
    const type = isLightTheme ? theme.light.type : theme.dark.type;
    const currency_text = isLightTheme
        ? theme.light.currency_text
        : theme.dark.currency_text;

    const handleShow = () => {
        setShow(true);
    };

    const handleClose = () => {
        setShow(false);
    };

    // const handleTimeout = () => {
    //     setTimeout(handleClose, 1500);
    // };

    return (
        <div>
            <Modal
                size="md"
                centered
                show={show}
                onHide={handleClose}
                // onEntered={handleTimeout}
            >
                <div className={"rounded" + ui + border + syntax}>
                    <Modal.Header>
                        <Modal.Title className={"mx-auto" + currency_text}>
                            Item added
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="text-center">
                        This item has been added to your cart
                        <h3 className={"mt-4" + currency_text}>
                            <FontAwesomeIcon
                                className="fa-icon"
                                icon={["fas", "check"]}
                            />
                        </h3>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant={type}
                            onClick={handleClose}
                            // className="mb-4"
                        >
                            Close
                        </Button>
                        <Button
                            variant={"outline-" + type}
                            as={Link}
                            to="/cart"
                        >
                            Show cart
                        </Button>
                    </Modal.Footer>
                </div>
            </Modal>

            <div className="mt-5 pt-1 text-center">
                <div className="inner">
                    <Image
                        className={"w-100 rounded profile-pic" + border}
                        alt="profile picture"
                        src={`https://picsum.photos/id/${Math.floor(
                            Math.random() * 1000
                        )}/800`}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/img/profile_pic_default.png";
                        }}
                    />
                </div>

                <Infobar>
                    {sName ? sName + " " : "Company name"}
                    {emoji("🤪")}
                </Infobar>
                <h3 className="pt-5">Our Services</h3>
            </div>
            <div className="row mt-5">
                {services.map((service) => (
                    <Service
                        serviceInfo={service}
                        key={uuidv4()}
                        handleShow={handleShow}
                    />
                ))}
            </div>
        </div>
    );
};

export default Services;
