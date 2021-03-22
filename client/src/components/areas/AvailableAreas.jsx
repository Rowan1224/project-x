import React, { useState, useEffect, useContext } from "react";
// import { Card } from "react-bootstrap";
// import emoji from "react-easy-emoji";

import AddArea from "./AddArea";
// import Title from "../generic/title";
// import CustomCard from "../generic/CustomCard";
import CustomTable from "../generic/CustomTable";
import SelectArea from "./SelectArea";
import CustomAlert from "../generic/CustomAlert";
import { LocationContext } from "../../contexts/LocationContext";
// import { ThemeContext } from "../../contexts/ThemeContext";

const AvailableAreas = (props) => {
    const [status, setStatus] = useState(undefined);
    const [availableAreas, setAvailableAreas] = useState([]);

    const { location } = useContext(LocationContext);

    // Themes
    // const { isLightTheme, theme } = useContext(ThemeContext);
    // const link = isLightTheme ? theme.light.link : theme.dark.link;
    // const custom_text = isLightTheme
    //     ? theme.light.custom_text
    //     : theme.dark.custom_text;

    useEffect(() => {
        const API_URL = "/availablearea/";

        const loadData = async () => {
            const bodyData = {
                location: location,
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

                setAvailableAreas(data.Areas);
            } catch (error) {
                setStatus(error);
            }
        };

        loadData();
    }, [props.searchData, location]);

    const tableData = {
        ths: [
            { className: "", value: "Area Name" },
            { className: "", value: "Add Area" },
        ],
        allowedEntry: ["area_name"],
    };

    return (
        // <CustomCard
        //     status={status}
        //     setStatus={setStatus}
        //     values={availableAreas}
        //     cardBodyData={(availableArea) => (
        //         <>
        //             <Card.Title>{availableArea.area_name}</Card.Title>

        //             <div>
        //                 <Title>Thana: </Title> {availableArea.thana}
        //                 <br />
        //                 <Title>District: </Title> {availableArea.district}
        //                 {/* <div className={"py-2" + link}>
        //                     <a
        //                         target="_blank"
        //                         rel="noreferrer"
        //                         className={custom_text}
        //                         href={`http://www.google.com/maps/place/${availableArea.lati},${availableArea.longi}`}
        //                     >
        //                         Open in Google Map
        //                     </a>
        //                 </div> */}
        //             </div>

        //             {/* <div className="mt-2"> */}
        //             <div className="mt-3">
        //                 <AddArea area={availableArea} />
        //             </div>
        //         </>
        //     )}
        //     noValueInfo={
        //         <>No new areas to show to add to your area {emoji("☹")}</>
        //     }
        // />
        <>
            {status && <CustomAlert status={status} />}

            <div className="mb-4">
                <SelectArea />
            </div>

            <CustomTable
                ths={tableData.ths}
                datas={availableAreas}
                allowedEntry={tableData.allowedEntry}
                ActionComponents={[
                    {
                        component: (availableArea) => (
                            <AddArea area={availableArea} />
                        ),
                        className: "",
                    },
                ]}
            />
        </>
    );
};

export default AvailableAreas;
