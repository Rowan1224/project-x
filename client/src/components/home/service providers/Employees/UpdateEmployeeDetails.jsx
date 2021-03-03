import React, { useContext, useRef, useState } from "react";
import CustomModalAlert from "../../../generic/CustomModalAlert";
import CustomAlert from "../../../generic/CustomAlert";
import CustomModal from "../../../generic/CustomModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ThemeContext } from "../../../../contexts/ThemeContext";

const UpdateEmployeeDetails = (props) => {
    const form = useRef(null);
    const [status, setStatus] = useState(undefined);
    const [statusVariant, setStatusVariant] = useState("danger");

    // Themes
    const { isLightTheme, theme } = useContext(ThemeContext);
    const type = isLightTheme ? theme.light.type : theme.dark.type;
    const border = isLightTheme ? theme.light.border : theme.dark.border;

    const handleUpdate = () => {
        const API_URL = "/updateEmployee/";
        const loadData = async () => {
            const formData = new FormData(form.current);

            let object = {};
            formData.forEach(function (value, key) {
                object[key] = value;
            });
            object["employee_id"] = props.employee.employee_id;

            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(object),
            });
            const data = await response.json();
            if (response.ok) {
                setStatus(data.message);
                setStatusVariant("success");
            } else {
                setStatus(data.message);
                setStatusVariant("danger");
            }
        };
        loadData();
    };

    return (
        <CustomModal
            // size="md"
            actionVariant={type}
            handleAction={handleUpdate}
            modalTitle="Update Employee Details"
            actionButtonBody={
                <>
                    <FontAwesomeIcon
                        className="fa-icon mr-2"
                        icon={["fas", "wrench"]}
                    />
                    Update
                </>
            }
            modalButtonClass={"btn btn-sm btn-" + type}
            modalBody={
                <form ref={form}>
                    {status &&
                        (statusVariant === "success" ? (
                            <CustomModalAlert
                                status={status}
                                setStatus={setStatus}
                                variant={statusVariant}
                                updateFlag={props.updateFlag}
                            />
                        ) : (
                            <CustomAlert
                                status={status}
                                variant={statusVariant}
                            />
                        ))}

                    <div className="form-group">
                        <label>Employee Name</label>

                        <div
                            className={
                                "form-group input-group rounded" + border
                            }
                        >
                            <div className="input-group-prepend">
                                <span className="input-group-text rounded-0">
                                    <FontAwesomeIcon
                                        className="fa-icon"
                                        icon={["fas", "user"]}
                                    />
                                </span>
                            </div>
                            <input
                                required
                                autoFocus
                                type="text"
                                name="employee_name"
                                placeholder="Employee Name"
                                className="form-control rounded-0"
                                defaultValue={props.employee.employee_name}
                            />
                        </div>

                        <label className="mt-3">Phone Number</label>

                        <div
                            className={
                                "form-group input-group rounded" + border
                            }
                        >
                            <div className="input-group-prepend">
                                <span className="input-group-text rounded-0">
                                    <FontAwesomeIcon
                                        className="fa-icon"
                                        icon={["fas", "phone"]}
                                    />
                                </span>
                            </div>
                            <input
                                type="text"
                                name="phone_number"
                                placeholder="Phone Number"
                                className="form-control rounded-0"
                                defaultValue={props.employee.phone_number}
                            />
                        </div>
                    </div>
                </form>
            }
        >
            <FontAwesomeIcon className="fa-icon" icon={["fa", "wrench"]} />
        </CustomModal>
    );
};

export default UpdateEmployeeDetails;
