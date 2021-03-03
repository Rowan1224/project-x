import React, { useContext, useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import DeleteModal from "../../../generic/DeleteModal";
import CustomModalAlert from "../../../generic/CustomModalAlert";

import { ThemeContext } from "../../../../contexts/ThemeContext";

const RemoveArea = (props) => {
    const [status, setStatus] = useState(undefined);
    const [statusVariant, setStatusVariant] = useState("danger");

    // Themes
    const { isLightTheme, theme } = useContext(ThemeContext);
    const custom_text = isLightTheme
        ? theme.light.custom_text
        : theme.dark.custom_text;

    const handleRemoveArea = () => {
        const API_URL = "/removearea/";

        const loadData = async () => {
            const bodyData = {
                area_id: props.area.area_id,
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

                if (response.ok) {
                    setStatus(data.message);
                    setStatusVariant("success");
                    window.location.reload();
                } else setStatus(data.message);
            } catch (error) {
                setStatus(error);
            }
        };

        loadData();
    };

    return (
        <>
            {status && (
                <CustomModalAlert
                    status={status}
                    setStatus={setStatus}
                    variant={statusVariant}
                />
            )}

            <DeleteModal
                deleteText={"Remove Area"}
                handleAction={handleRemoveArea}
                modalBody={
                    <>
                        Do you really want to remove Area:{" "}
                        <span className={custom_text}>
                            {props.area.area_name}
                        </span>{" "}
                        from your service area?
                    </>
                }
            />
        </>
    );
};

export default RemoveArea;
