import React, { useState, useEffect } from "react";
// import Counter from "../../generic/counter";
import { Table, Button } from "react-bootstrap";
// import DeleteTwoToneIcon from "@material-ui/icons/DeleteTwoTone";
// import Icon from "@material-ui/core/Icon";
import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
// import emoji from "react-easy-emoji";
import Infobar from "../../generic/infobar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ThemeContext } from "../../../contexts/ThemeContext";
import CustomAlert from "../../generic/CustomAlert";
import UpdateEmployeeDetails from "./UpdateEmployeeDetails";

const EmployeeList = (props) => {
    const [flag, setFlag] = useState(true);
    const [employes, setEmployes] = useState([]);
    const [status, setStatus] = useState(undefined);
    const [statusVariant, setStatusVariant] = useState("danger");

    // Themes
    const { isLightTheme, theme } = useContext(ThemeContext);
    const variant = isLightTheme ? "light" : "dark";
    // const ui = isLightTheme ? theme.light.ui : theme.dark.ui;
    const type = isLightTheme ? theme.light.type : theme.dark.type;
    // const syntax = isLightTheme ? theme.light.syntax : theme.dark.syntax;
    const border = isLightTheme ? theme.light.border : theme.dark.border;
    // const custom_text = isLightTheme
    //     ? theme.light.custom_text
    //     : theme.dark.custom_text;

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
                        <CustomAlert variant={statusVariant} status={status} />
                    )}

                    <Table responsive="sm" striped variant={variant}>
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
                                            actionVariant={type}
                                            updateFlag={updateFlag}
                                            employee_id={employee.employee_id}
                                            phone_number={employee.phone_number}
                                            modalTitle="Update Employee Details"
                                            employee_name={
                                                employee.employee_name
                                            }
                                            actionButtonClass={
                                                "btn btn-sm btn-" + type
                                            }
                                        >
                                            <FontAwesomeIcon
                                                icon={["fas", "wrench"]}
                                            />
                                        </UpdateEmployeeDetails>
                                    </td>
                                    <td className="text-center align-middle">
                                        <Button
                                            size="sm"
                                            variant="danger"
                                            onClick={() =>
                                                handleDelete(
                                                    employee.employee_id
                                                )
                                            }
                                        >
                                            <FontAwesomeIcon
                                                icon={["fas", "trash"]}
                                            />
                                        </Button>
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
