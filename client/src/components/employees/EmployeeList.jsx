import { useContext } from "react";
import emoji from "react-easy-emoji";
import React, { useState, useEffect } from "react";

import { ThemeContext } from "../../contexts/ThemeContext";

import Infobar from "../generic/infobar";
import DeleteModal from "../generic/DeleteModal";
import CustomTable from "../generic/CustomTable";
import UpdateEmployeeDetails from "./UpdateEmployeeDetails";
import CustomModalAlert from "../generic/CustomModalAlert";
import AddEmployee from "./AddEmployee";
import SearchBar from "../generic/SearchBar";

const EmployeeList = (props) => {
    const [flag, setFlag] = useState(true);
    const [employees, setEmployees] = useState([]);
    const [status, setStatus] = useState(undefined);
    const [searchData, setSearchData] = useState("");
    const [statusVariant, setStatusVariant] = useState("danger");

    // Themes
    const { isLightTheme, theme } = useContext(ThemeContext);
    const syntax = isLightTheme ? theme.light.syntax : theme.dark.syntax;
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
            const bodyData = {
                search_data: searchData,
                service_id: localStorage.getItem("userID"),
            };

            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(bodyData),
            });

            const data = await response.json();
            setEmployees(data.employee);
        };
        loadData();
    }, [flag, searchData]);

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

    const handleChange = (e) => setSearchData(e.target.value);

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
            <h4 className={"mb-5 text-center" + syntax}>Employees Details</h4>

            <SearchBar
                handleChange={handleChange}
                placeholder="Search employees details...."
                searchBy={<>Search by anything {emoji("😄")}</>}
            />

            <AddEmployee updateFlag={updateFlag} />

            {employees ? (
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
                        datas={employees}
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
