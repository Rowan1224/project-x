import React, { createContext, useState, useEffect } from 'react';

export const LocationContext = createContext();

const LocationContextProvider = (props) => {
    const [district, setDistrict] = useState("");
    const [area, setArea] = useState("");
    const [location, setLocation] = useState({ district, area });

    // Dummy datas
    const districts = ["Dhaka", "Sylhet", "Rangpur", "Rajshahi"];
    const areas = ["Modina market", "Gulshan", "Banani", "Gazipur"];
    
    // componentDidMount
    useEffect(() => {
        const json = sessionStorage.getItem("location");
        const localLocation = JSON.parse(json);
    
        if(localLocation)
            setLocation(localLocation);
        
    }, [])

    // componentDidUpdate
    useEffect(() => {
        const json = sessionStorage.getItem("location");
        const localLocation = JSON.parse(json);

        if(localLocation !== location)
            sessionStorage.setItem("location", JSON.stringify(location));
        
    }, [location])
    
    const selectLocation = (title, selectedlocation) => {
        title === "District" ?
            setDistrict(selectedlocation) :  
            setArea(selectedlocation)
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