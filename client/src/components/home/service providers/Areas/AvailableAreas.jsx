import React, { useContext, useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import Title from "../../../generic/title";
import emoji from "react-easy-emoji";

import CustomModalAlert from "../../../generic/CustomModalAlert";
import { ThemeContext } from "../../../../contexts/ThemeContext";
import Infobar from "../../../generic/infobar";
import AddArea from "./AddArea";

const AvailableAreas = (props) => {
    const [statusVariant] = useState("danger");
    const [status, setStatus] = useState(undefined);
    const [availableAreas, setAvailableAreas] = useState([]);

    // Themes
    const { isLightTheme, theme } = useContext(ThemeContext);
    const ui = isLightTheme ? theme.light.ui : theme.dark.ui;
    const syntax = isLightTheme ? theme.light.syntax : theme.dark.syntax;
    const border = isLightTheme ? theme.light.border : theme.dark.border;
    // const type = isLightTheme ? theme.light.type : theme.dark.type;

    useEffect(() => {
        const API_URL = "/availablearea/";

        const loadData = async () => {
            const bodyData = {
                service_id: localStorage.getItem("userID"),
            };

            try {
                const response = await fetch(API_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(bodyData),
                });

                const data = await response.json();

                if (!response.ok) setStatus(data.message);

                setAvailableAreas(data.Areas);
            } catch (error) {
                setStatus(error);
            }
        };

        loadData();
    }, []);

    return (
        <>
            {availableAreas && availableAreas.length > 0 ? (
                <div className="row">
                    {availableAreas.map((availableArea) => (
                        <div
                            key={availableArea.area_id}
                            className="col-lg-3 col-md-4 col-sm-6 mb-4 text-center"
                        >
                            <Card className={"shadow" + ui + border}>
                                {status && (
                                    <CustomModalAlert
                                        status={status}
                                        setStatus={setStatus}
                                        variant={statusVariant}
                                    />
                                )}

                                <Card.Body className={syntax}>
                                    <Card.Title>
                                        {availableArea.area_name}
                                    </Card.Title>

                                    <div>
                                        <Title>Thana: </Title>{" "}
                                        {availableArea.thana}
                                        <br />
                                        <Title>Upazilla: </Title>{" "}
                                        {availableArea.upazilla}
                                        <br />
                                        <Title>District: </Title>{" "}
                                        {availableArea.district}
                                        <br />
                                        <Title>Longitude: </Title>{" "}
                                        {availableArea.longi}
                                        <br />
                                        <Title>Latitude: </Title>{" "}
                                        {availableArea.lati}
                                    </div>

                                    <div className="mt-2">
                                        <AddArea
                                            area={availableArea}
                                        />
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>
            ) : (
                <Infobar>
                    No new areas to show to add to your area {emoji("☹")}
                </Infobar>
            )}
        </>
    );
};

export default AvailableAreas;
