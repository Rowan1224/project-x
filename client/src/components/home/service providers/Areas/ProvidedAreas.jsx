import React, { useContext, useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import Title from "../../../generic/title";
import emoji from "react-easy-emoji";

import CustomModalAlert from "../../../generic/CustomModalAlert";
import { ThemeContext } from "../../../../contexts/ThemeContext";
import Infobar from "../../../generic/infobar";
import RemoveArea from "./RemoveArea";

const ProvidedAreas = (props) => {
    const [statusVariant] = useState("danger");
    const [status, setStatus] = useState(undefined);
    const [providedAreas, setProvidedAreas] = useState([]);

    // Themes
    const { isLightTheme, theme } = useContext(ThemeContext);
    const ui = isLightTheme ? theme.light.ui : theme.dark.ui;
    const syntax = isLightTheme ? theme.light.syntax : theme.dark.syntax;
    const border = isLightTheme ? theme.light.border : theme.dark.border;
    // const type = isLightTheme ? theme.light.type : theme.dark.type;

    useEffect(() => {
        const API_URL = "/showarea/";

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

                setProvidedAreas(data.Areas);
            } catch (error) {
                setStatus(error);
            }
        };

        loadData();
    }, []);

    return (
        <>
            {providedAreas && providedAreas.length > 0 ? (
                <div className="row">
                    {providedAreas.map((providedArea) => (
                        <div
                            key={providedArea.area_id}
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
                                        {providedArea.area_name}
                                    </Card.Title>

                                    <div>
                                        <Title>Thana: </Title>{" "}
                                        {providedArea.thana}
                                        <br />
                                        <Title>Upazilla: </Title>{" "}
                                        {providedArea.upazilla}
                                        <br />
                                        <Title>District: </Title>{" "}
                                        {providedArea.district}
                                        <br />
                                        <Title>Longitude: </Title>{" "}
                                        {providedArea.longi}
                                        <br />
                                        <Title>Latitude: </Title>{" "}
                                        {providedArea.lati}
                                    </div>

                                    <div className="mt-2">
                                        <RemoveArea area={providedArea} />
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

export default ProvidedAreas;
