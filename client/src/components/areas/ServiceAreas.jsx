import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import emoji from "react-easy-emoji";

import Title from "../generic/title";
import RemoveArea from "./RemoveArea";
import CustomCard from "../generic/CustomCard";
// import { ThemeContext } from "../../contexts/ThemeContext";

const ServiceAreas = (props) => {
    const [status, setStatus] = useState(undefined);
    const [serviceAreas, setServiceAreas] = useState([]);

    // Themes
    // const { isLightTheme, theme } = useContext(ThemeContext);
    // const link = isLightTheme ? theme.light.link : theme.dark.link;
    // const custom_text = isLightTheme
    //     ? theme.light.custom_text
    //     : theme.dark.custom_text;

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

                setServiceAreas(data.Areas);
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
            values={serviceAreas}
            cardBodyData={(serviceArea) => (
                <>
                    <Card.Title>{serviceArea.area_name}</Card.Title>

                    <div>
                        <Title>Thana: </Title> {serviceArea.thana}
                        <br />
                        <Title>District: </Title> {serviceArea.district}
                        {/* <div className={"py-2" + link}>
                            <a
                                target="_blank"
                                rel="noreferrer"
                                className={custom_text}
                                href={`http://www.google.com/maps/place/${serviceArea.lati},${serviceArea.longi}`}
                            >
                                Open in Google Map
                            </a>
                        </div> */}
                    </div>

                    {/* <div className="mt-2"> */}
                    <div className="mt-3">
                        <RemoveArea area={serviceArea} />
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

export default ServiceAreas;
