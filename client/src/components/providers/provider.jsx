import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Title from "../generic/title";
import { ThemeContext } from "../../contexts/ThemeContext";

const Provider = (props) => {
    const [show, setShow] = useState(true);

    // Themes
    const { isLightTheme, theme } = useContext(ThemeContext);
    const ui = isLightTheme ? theme.light.ui : theme.dark.ui;
    const syntax = isLightTheme ? theme.light.syntax : theme.dark.syntax;
    // const border = isLightTheme ? theme.light.border : theme.dark.border;
    const type = isLightTheme ? theme.light.type : theme.dark.type;

    const [provider, setProvider] = useState({});

    // componentDidMount
    useEffect(() => {
        const API_URL = "/getProfile/";

        const loadData = async () => {
            const servideID = {
                userid: props.Service.service_id,
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

            setProvider(data);
        };
        loadData();

        if (
            provider.userid &&
            sessionStorage.getItem("service_id") &&
            sessionStorage.getItem("service_id") !== provider.userid.toString()
        )
            setShow(false);
    }, [props.Service, provider.userid]);

    return (
        <div className="col-lg-6 mb-3">
            {/* <Card className={"p-3 shadow" + ui + border}> */}
            <Card className={"card-body" + ui}>
                <div>
                    <div className="d-block">
                        <img
                            src={`https://picsum.photos/id/${Math.floor(
                                Math.random() * 1000
                            )}/800`}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "/img/Default.png";
                            }}
                            alt="provider's"
                            // className={
                            //     "mb-1 mr-3 float-left profile-pic" + border
                            // }
                            className={"mb-1 mr-3 float-left profile-pic"}
                        />
                    </div>

                    <div className={syntax}>
                        <Title>Company: </Title> {provider.company_name}
                        <br />
                        <Title>Address: </Title> {provider.address}
                        <br />
                        <Title>Service type: </Title> {provider.service_type}
                        <br />
                        <Title>Phone number: </Title> {provider.phone_1},{" "}
                        {provider.phone_2}
                        <br />
                        <Title>Description: </Title> {provider.description}
                    </div>

                    <Button
                        variant={type}
                        disabled={!show}
                        as={show && Link}
                        className="w-100 mt-3"
                        to={"/service/provider/" + props.Service.service_id}
                    >
                        <FontAwesomeIcon
                            className="fa-icon mr-2"
                            icon={["fas", "shopping-basket"]}
                        />
                        Show their services
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default Provider;
