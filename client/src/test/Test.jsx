import React from "react";
// import { Card, Button, Image } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import { useContext, useEffect } from "react";
// import { ThemeContext } from "../../../contexts/ThemeContext";
// import { useState } from "react";
// import Title from "../../generic/title";

const Test = (props) => {
    // // Themes
    // const { isLightTheme, theme } = useContext(ThemeContext);
    // const ui = isLightTheme ? theme.light.ui : theme.dark.ui;
    // const syntax = isLightTheme ? theme.light.syntax : theme.dark.syntax;
    // const border = isLightTheme ? theme.light.border : theme.dark.border;
    // const type = isLightTheme ? theme.light.type : theme.dark.type;

    // const [provider, setProvider] = useState({});

    // // componentDidMount
    // useEffect(() => {
    //     const API_URL = "/getProfile/";

    //     const loadData = async () => {
    //         const servideID = {
    //             userid: props.Service.service_id,
    //         };

    //         const response = await fetch(API_URL, {
    //             method: "POST",
    //             headers: {
    //                 Accept: "application/json",
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify(servideID),
    //         });

    //         const data = await response.json();

    //         setProvider(data);
    //     };
    //     loadData();
    // }, [props.Service]);

    return (
        <div className="col col-md-6 mb-3">
            {/* <Card className={"shadow" + ui + border}>
                <div className="row">
                    <div className="inner col col-md-6">
                        <Card.Img
                            variant="top"
                            alt="provider's"
                            src={`https://picsum.photos/id/${Math.floor(
                                Math.random() * 1000
                            )}/800`}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "/img/Default.png";
                            }}
                            className={"rounded border border-" + type}
                        />
                    </div>

                    <Card.Body
                        className={"col col-md-6 d-flex flex-column" + syntax}
                    >
                        <Card.Title className="text-center mr-md-6">
                            {provider.service_name}
                        </Card.Title>
                        <Card.Text className="mt-auto">
                            <Title>Company: </Title> {provider.company_name}
                            <br />
                            <Title>Address: </Title> {provider.address}
                            <br />
                            <Title>Service type: </Title>{" "}
                            {provider.service_type}
                            <br />
                            <Title>Phone number: </Title> {provider.phone_1},{" "}
                            {provider.phone_2}
                            <br />
                            <Title>Description: </Title> {provider.description}
                            <br />
                        </Card.Text>
                    </Card.Body>

                    <Button
                        as={Link}
                        variant={type}
                        className="my-3 w-75"
                        to={"/service-provider/" + props.Service.service_id}
                        disabled={sessionStorage.getItem("service_id")}
                    >
                        Show their services
                    </Button>
                </div>
            </Card> */}
        </div>
    );
};

export default Test;
