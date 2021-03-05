import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import emoji from "react-easy-emoji";

import Title from "../generic/title";
import RemoveArea from "./RemoveArea";
import CustomCard from "../generic/CustomCard";

const ProvidedAreas = (props) => {
    const [status, setStatus] = useState(undefined);
    const [providedAreas, setProvidedAreas] = useState([]);

    useEffect(() => {
        const API_URL = "/showarea/";

        const loadData = async () => {
            const bodyData = {
                search_data: props.searchData,
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
    }, [props.searchData]);

    return (
        <CustomCard
            status={status}
            setStatus={setStatus}
            values={providedAreas}
            cardBodyData={(providedArea) => (
                <>
                    <Card.Title>{providedArea.area_name}</Card.Title>

                    <div>
                        <Title>Thana: </Title> {providedArea.thana}
                        <br />
                        <Title>Upazilla: </Title> {providedArea.upazilla}
                        <br />
                        <Title>District: </Title> {providedArea.district}
                        <br />
                        <Title>Longitude: </Title> {providedArea.longi}
                        <br />
                        <Title>Latitude: </Title> {providedArea.lati}
                    </div>

                    <div className="mt-2">
                        <RemoveArea area={providedArea} />
                    </div>
                </>
            )}
            noValueInfo={
                <>
                    Currently you don't provide your service to any area{" "}
                    {emoji("☹")}
                </>
            }
        />
    );
};

export default ProvidedAreas;
