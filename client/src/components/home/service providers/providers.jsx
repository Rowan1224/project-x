import React, { useContext, useState, useEffect } from "react";
import Provider from "./provider";
import { v4 as uuidv4 } from "uuid";
import { LocationContext } from "../../../contexts/LocationContext";
import emoji from "react-easy-emoji";
import Infobar from "../../generic/infobar";

const Providers = () => {
    const { location } = useContext(LocationContext);

    const [providers, setProviders] = useState([]);

    // componentDidMount
    useEffect(() => {
        const API_URL = "getServiceName/" + location.id;

        const loadData = async () => {
            const apiData = [];
            const response = await fetch(API_URL);
            const data = await response.json();

            data.services.map((service) => apiData.push(service));
            setProviders(apiData);
        };
        loadData();
    }, [location]);

    return location && location.district && location.area ? (
        <div className="row mt-5">
            {providers.map((provider) => (
                <Provider Service={provider} key={uuidv4()} />
            ))}
        </div>
    ) : (
        <Infobar>
            Select a location to see the service providers {emoji("😀")}
        </Infobar>
    );
};

export default Providers;
