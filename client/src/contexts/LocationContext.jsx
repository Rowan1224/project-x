import React, { createContext, useState, useEffect } from "react";

export const LocationContext = createContext();

const LocationContextProvider = (props) => {
    const [location, setLocation] = useState({
        id: -1,
        area: "",
        thana: "",
        district: "",
    });

    // componentDidUpdate
    useEffect(() => {
        const json = sessionStorage.getItem("location");
        const localLocation = JSON.parse(json);

        if (localLocation) setLocation(localLocation);
    }, []);

    // componentDidUpdate
    useEffect(() => {
        const json = sessionStorage.getItem("location");
        const localLocation = JSON.parse(json);

        if (localLocation !== location)
            sessionStorage.setItem("location", JSON.stringify(location));
    }, [location]);

    const changeLocation = (selectedLocation) => {
        const loadData = async () => {
            const API_URL = "/getAreaID/";

            const bodyData = {
                ...selectedLocation,
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

                // if (!response.ok) setStatus(data.message);

                sessionStorage.setItem("areaID", data.id);
                setLocation({ ...selectedLocation, id: data.id });
            } catch (error) {
                // setStatus(error);
            }
        };

        loadData();

        // Updating sessionStorage
        sessionStorage.setItem("location", JSON.stringify(selectedLocation));
    };

    return (
        <LocationContext.Provider value={{ location, changeLocation }}>
            {props.children}
        </LocationContext.Provider>
    );
};

export default LocationContextProvider;
