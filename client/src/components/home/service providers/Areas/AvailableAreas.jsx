import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import Title from "../../../generic/title";
import emoji from "react-easy-emoji";

import AddArea from "./AddArea";
import CustomCard from "../../../generic/CustomCard";

const AvailableAreas = (props) => {
    const [status, setStatus] = useState(undefined);
    const [availableAreas, setAvailableAreas] = useState([]);

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
        <CustomCard
            status={status}
            setStatus={setStatus}
            values={availableAreas}
            cardBodyData={(availableArea) => (
                <>
                    <Card.Title>{availableArea.area_name}</Card.Title>

                    <div>
                        <Title>Thana: </Title> {availableArea.thana}
                        <br />
                        <Title>Upazilla: </Title> {availableArea.upazilla}
                        <br />
                        <Title>District: </Title> {availableArea.district}
                        <br />
                        <Title>Longitude: </Title> {availableArea.longi}
                        <br />
                        <Title>Latitude: </Title> {availableArea.lati}
                    </div>

                    <div className="mt-2">
                        <AddArea area={availableArea} />
                    </div>
                </>
            )}
            noValueInfo={
                <>No new areas to show to add to your area {emoji("☹")}</>
            }
        />
    );
};

export default AvailableAreas;
