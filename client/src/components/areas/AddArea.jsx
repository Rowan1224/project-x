import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ThemeContext } from "../../contexts/ThemeContext";

import CustomModal from "../generic/CustomModal";
import CustomModalAlert from "../generic/CustomModalAlert";

const AddArea = (props) => {
    const [status, setStatus] = useState(undefined);
    const [statusVariant, setStatusVariant] = useState("danger");

    // Themes
    const { isLightTheme, theme } = useContext(ThemeContext);
    const type = isLightTheme ? theme.light.type : theme.dark.type;
    const btnTypeClass = isLightTheme
        ? theme.light.btnTypeClass
        : theme.dark.btnTypeClass;
    const custom_text = isLightTheme
        ? theme.light.custom_text
        : theme.dark.custom_text;

    const handleAddArea = () => {
        const API_URL = "/addArea/";

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

            <CustomModal
                actionVariant={type}
                modalTitle="Add Product"
                handleAction={handleAddArea}
                modalBody={
                    <>
                        Do you really want to add Area:{" "}
                        <span className={custom_text}>
                            {props.area.area_name}
                        </span>{" "}
                        as your service area?
                    </>
                }
                modalButtonClass={"btn btn-sm" + btnTypeClass}
                actionButtonBody={
                    <>
                        <FontAwesomeIcon
                            className="fa-icon mr-2"
                            icon={["fas", "plus"]}
                        />
                        Add
                    </>
                }
            >
                <FontAwesomeIcon
                    className="fa-icon mr-2"
                    icon={["fas", "warehouse"]}
                />
                Add to Service Area
            </CustomModal>
        </>
    );
};

export default AddArea;
