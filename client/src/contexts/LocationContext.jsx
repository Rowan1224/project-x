import React, { createContext, useState } from 'react';

export const LocationContext = createContext();

const LocationContextProvider = (props) => {
    const [districts, setDistricts] = useState(["dhaka", "sylhet", "Rangpur", "Rajshahi"]);
    const [areas, setAreas] = useState(["Modina market", "Gulshan", "Banani", "Gazipur"]);
    const [location, setLocation] = useState({ district:'', area:'' });

    const changeLocation = (title, selectedlocation) => {
        title === "District" ?
            setLocation({ ...location, district: selectedlocation }) : 
            setLocation({ ...location, area: selectedlocation })
    }

    return (
        <LocationContext.Provider value={{ districts, areas, location, changeLocation }}>
            { props.children }
        </LocationContext.Provider>
    );
}
 
export default LocationContextProvider;