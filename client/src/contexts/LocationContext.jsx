import React, { createContext, useState } from 'react';

export const LocationContext = createContext();

const LocationContextProvider = (props) => {
    const [districts, setDistricts] = useState(["dhaka", "sylhet", "Rangpur", "Rajshahi"]);
    const [areas, setAreas] = useState(["Modina market", "Gulshan", "Banani", "Gazipur"]);
    const [location, setLocation] = useState({ district:"", area:"" });
    let district = "", area = "";

    const selectLocation = (title, selectedlocation) => {
        title === "District" && selectedlocation ?
            district = selectedlocation :  
            area = selectedlocation
    }

    const changeLocation = () => {
        if(district && area){
            setLocation({ ...location, district, area });
        }
    }

    return (
        <LocationContext.Provider value={{ districts, areas, location, selectLocation, changeLocation }}>
            { props.children }
        </LocationContext.Provider>
    );
}
 
export default LocationContextProvider;