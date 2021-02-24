import React, { useContext, useState, useEffect } from "react";
import { Image } from "react-bootstrap";
// import Service from "./service";
import { v4 as uuidv4 } from "uuid";
import emoji from "react-easy-emoji";
// import Infobar from "../../generic/infobar";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useParams } from "react-router-dom";

const Inventory = () => {
    const [products, setProducts] = useState([]);
    const [sName, setSName] = useState("");
    const params = useParams();

    // componentDidMount
    // useEffect(() => {
    //     const API_URL = "/ownProducts/";

    //     const loadData = async () => {
    //         const servideID = {
    //             service_id: params.id,
    //         };

    //         const response = await fetch(API_URL, {
    //             method: "POST",
    //             headers: {
    //                 Accept: "application/json",
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify(servideID),
    //         });

    //         const data = await response.json();

    //         setServices(data.products);
    //     };
    //     loadData();
    // }, [params]);

    // Themes
    const { isLightTheme, theme } = useContext(ThemeContext);
    const border = isLightTheme ? theme.light.border : theme.dark.border;
    const syntax = isLightTheme ? theme.light.syntax : theme.dark.syntax;
    const custom_text = isLightTheme
        ? theme.light.custom_text
        : theme.dark.custom_text;

    return (
        <div>
            {/* {services && services.length > 0 ? (
                <div className="row">
                    {services.map((service) => (
                        // Here gives unmounted error 🙁
                        <Service serviceInfo={service} key={uuidv4()} />
                    ))}
                </div>
            ) : (
                <Infobar>
                    Sorry, we are not providing any services in this area at
                    this moment {emoji("☹")}
                </Infobar>
            )} */}
        </div>
    );
};

export default Inventory;
