import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import Infobar from "../../generic/infobar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ThemeContext } from "../../../contexts/ThemeContext";
import CustomModalAlert from "../../generic/CustomModalAlert";
import UpdateEmployeeDetails from "./UpdateEmployeeDetails";
import CustomModal from "../../generic/CustomModal";

const EmployeeList = (props) => {
    const [flag, setFlag] = useState(true);
    const [employes, setEmployes] = useState([]);
    const [status, setStatus] = useState(undefined);
    const [statusVariant, setStatusVariant] = useState("danger");

    // Themes
    const { isLightTheme, theme } = useContext(ThemeContext);
    const variant = isLightTheme ? "light" : "dark";
    const border = isLightTheme ? theme.light.border : theme.dark.border;
    const dangerTextColor = isLightTheme
        ? theme.light.dangerTextColor
        : theme.dark.dangerTextColor;
    const custom_text = isLightTheme
        ? theme.light.custom_text
        : theme.dark.custom_text;

    // componentDidMount
    useEffect(() => {
        const API_URL = "/getEmployee/";

        const loadData = async () => {
            const serviceID = {
                service_id: localStorage.getItem("userID"),
            };

            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(serviceID),
            });

            const data = await response.json();
            setEmployes(data.employee);
        };
        loadData();
    }, [flag]);

    const handleDelete = (id) => {
        const API_URL = "/deleteEmployee/";

        const loadData = async () => {
            const employeeID = {
                employee_id: id,
            };

            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(employeeID),
            });

            const data = await response.json();
            if (response.ok) setStatusVariant("success");
            setStatus(data.message);
        };
        loadData();
    };

    const updateFlag = () => setFlag(!flag);

    return (
        <>
            {employes ? (
                <div className={"shadow rounded" + border}>
                    {status && (
                        <CustomModalAlert
                            status={status}
                            setStatus={setStatus}
                            variant={statusVariant}
                        />
                    )}

                    <Table
                        striped
                        responsive="sm"
                        className="mb-0"
                        variant={variant}
                    >
                        <thead>
                            <tr>
                                <th
                                    scope="col"
                                    className="text-center align-middle"
                                >
                                    Index
                                </th>
                                <th
                                    scope="col"
                                    className="text-center align-middle"
                                >
                                    Employee Name
                                </th>
                                <th
                                    scope="col"
                                    className="text-center align-middle"
                                >
                                    Phone
                                </th>
                                <th
                                    scope="col"
                                    className="text-center align-middle"
                                >
                                    Update
                                </th>
                                <th
                                    scope="col"
                                    className="text-center align-middle"
                                >
                                    Delete
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {employes.map((employee, index) => (
                                <tr key={uuidv4()}>
                                    <td className="text-center align-middle">
                                        {index + 1}
                                    </td>

                                    <td className="text-center align-middle">
                                        {employee.employee_name}
                                    </td>

                                    <td className="text-center align-middle">
                                        {employee.phone_number}
                                    </td>
                                    <td className="text-center align-middle">
                                        <UpdateEmployeeDetails
                                            employee={employee}
                                            updateFlag={updateFlag}
                                        />
                                    </td>
                                    <td className="text-center align-middle">
                                        <CustomModal
                                            modalTitle="Delete"
                                            actionVariant="danger"
                                            updateFlag={updateFlag}
                                            handleAction={() =>
                                                handleDelete(
                                                    employee.employee_id
                                                )
                                            }
                                            modalButtonClass="btn btn-sm btn-danger"
                                            modalBody={
                                                <>
                                                    Do you really want to delete
                                                    details of Employee:{" "}
                                                    <span
                                                        className={custom_text}
                                                    >
                                                        {employee.employee_name}
                                                    </span>
                                                    ?<br />
                                                    <span
                                                        className={
                                                            dangerTextColor
                                                        }
                                                    >
                                                        Caution: This action
                                                        cannot be undone
                                                    </span>
                                                </>
                                            }
                                            actionButtonBody={
                                                <>
                                                    <FontAwesomeIcon
                                                        className="fa-icon mr-2"
                                                        icon={[
                                                            "fas",
                                                            "trash-alt",
                                                        ]}
                                                    />
                                                    Delete
                                                </>
                                            }
                                        >
                                            <FontAwesomeIcon
                                                className="fa-icon"
                                                icon={["fas", "trash-alt"]}
                                            />
                                        </CustomModal>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            ) : (
                <Infobar>You have no employee details to show</Infobar>
            )}
        </>
    );
};

export default EmployeeList;
