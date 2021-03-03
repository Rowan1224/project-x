import React from "react";
import Infobar from "../../../generic/infobar";
import AvailableAreas from "./AvailableAreas";
import ProvidedAreas from "./ProvidedAreas";

const Areas = (props) => {
    return (
        <>
            <Infobar>Available Areas</Infobar>
            <div className="my-4">
                <AvailableAreas />
            </div>

            <Infobar>Your Areas</Infobar>
            <div className="my-4">
                <ProvidedAreas />
            </div>
        </>
    );
};

export default Areas;
