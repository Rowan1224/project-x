import { useContext } from "react";
import emoji from "react-easy-emoji";
import Infobar from "../../../generic/infobar";
import React, { useState, useEffect } from "react";
import DeleteModal from "../../../generic/DeleteModal";
import CustomTable from "../../../generic/CustomTable";
import UpdateEmployeeDetails from "./UpdateEmployeeDetails";
import { ThemeContext } from "../../../../contexts/ThemeContext";
import CustomModalAlert from "../../../generic/CustomModalAlert";
import AddEmployee from "./AddEmployee";

const EmployeeList = (props) => {
    const [flag, setFlag] = useState(true);
    const [employes, setEmployes] = useState([]);
    const [status, setStatus] = useState(undefined);
    const [statusVariant, setStatusVariant] = useState("danger");

    // Themes
    const { isLightTheme, theme } = useContext(ThemeContext);
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

    const tableData = {
        ths: [
            { className: "", value: "Index" },
            { className: "", value: "Employee Name" },
            { className: "", value: "Phone" },
            { className: "", value: "Update" },
            { className: "", value: "Delete" },
        ],
        allowedEntry: ["employee_name", "phone_number"],
    };

    return (
        <>
            <div className="mb-4">
                <AddEmployee updateFlag={updateFlag} />
            </div>

            {employes ? (
                <>
                    {status && (
                        <CustomModalAlert
                            status={status}
                            setStatus={setStatus}
                            variant={statusVariant}
                        />
                    )}

                    <CustomTable
                        index={true}
                        datas={employes}
                        ths={tableData.ths}
                        allowedEntry={tableData.allowedEntry}
                        ActionComponents={[
                            {
                                component: (employee) => (
                                    <UpdateEmployeeDetails
                                        employee={employee}
                                        updateFlag={updateFlag}
                                    />
                                ),
                                className: "",
                            },
                            {
                                component: (employee) => (
                                    <DeleteModal
                                        employee={employee}
                                        updateFlag={updateFlag}
                                        handleAction={() =>
                                            handleDelete(employee.employee_id)
                                        }
                                        modalBody={
                                            <>
                                                Do you really want to delete
                                                details of Employee:{" "}
                                                <span className={custom_text}>
                                                    {employee.employee_name}
                                                </span>
                                                ?<br />
                                                <span
                                                    className={dangerTextColor}
                                                >
                                                    Caution: This action cannot
                                                    be undone
                                                </span>
                                            </>
                                        }
                                    />
                                ),
                                className: "",
                            },
                        ]}
                    />
                </>
            ) : (
                <Infobar>
                    You have no employee details to show {emoji("🙁")}
                </Infobar>
            )}
        </>
    );
};

export default EmployeeList;
