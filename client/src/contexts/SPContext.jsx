import React, { useState, createContext } from 'react';
import { useEffect } from 'react';

export const SPContext = createContext();

const SPContextProvider = (props) => {
    const [serviceID, setServiceID] = useState(-1);

    // // componentDidMount
    // useEffect(() => {
    //     const json = sessionStorage.getItem("service_id");
    //     const local = JSON.parse(json);

    //     if(local)
    //         setServiceID(local);
    // }, [])

    // // componentDidUpdate
    // useEffect(() => {
    //     const json = sessionStorage.getItem("service_id");
    //     const local = JSON.parse(json);

    //     if(local !== serviceID)
    //         sessionStorage.setItem("service_id", JSON.stringify(serviceID));

    // }, [serviceID])

    const handleServiceID = id => {
        console.log("ID: ", id);
        setServiceID(id);
    }

    useEffect(() => { console.log("Actual service ID", serviceID) }, [serviceID])

    return (
        <SPContext.Provider
            value={{ serviceID, handleServiceID }}
        >
            {props.children}
        </SPContext.Provider>
    );
}
 
export default SPContextProvider;