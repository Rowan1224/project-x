import React, { useContext, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { SettingsContext } from "../../../contexts/SettingsContext";
import CustomAlert from "../../generic/CustomAlert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UpdateEmployeeDetails = (props) => {
    const form = useRef(null);
    const [show, setShow] = useState(false);
    const [status, setStatus] = useState(undefined);
    const { isAnimated } = useContext(SettingsContext);
    const [statusVariant, setStatusVariant] = useState("danger");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleUpdate = (e) => {
        e.preventDefault();

        const API_URL = "/updateEmployee/";
        const loadData = async () => {
            const formData = new FormData(form.current);

            let object = {};
            formData.forEach(function (value, key) {
                object[key] = value;
            });
            object["employee_id"] = props.employee_id;

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
                setStatusVariant("success");
                handleClose();
                props.updateFlag();
            }
            setStatus(data.message);
        };
        loadData();
    };

    return (
        <>
            <button onClick={handleShow} className={props.actionButtonClass}>
                {props.children}
            </button>

            <Modal
                centered
                size="sm"
                show={show}
                onHide={handleClose}
                animation={isAnimated}
            >
                <Modal.Header closeButton>{props.modalTitle}</Modal.Header>
                <Modal.Body>
                    <form ref={form} onSubmit={handleUpdate}>
                        {status && (
                            <CustomAlert
                                status={status}
                                variant={statusVariant}
                            />
                        )}

                        <div className="form-group">
                            <label>Employee Name</label>

                            <input
                                required
                                autoFocus
                                type="text"
                                name="employee_name"
                                className="form-control"
                                placeholder="Employee Name"
                                defaultValue={props.employee_name}
                            />

                            <label className="mt-3">Phone Number</label>

                            <input
                                type="text"
                                name="phone_number"
                                className="form-control"
                                placeholder="Phone Number"
                                defaultValue={props.phone_number}
                            />
                        </div>

                        <button type="submit" className="w-100 btn btn-main">
                            <FontAwesomeIcon
                                icon={["fas", "wrench"]}
                                className="mr-2"
                            />
                            Update
                        </button>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default UpdateEmployeeDetails;
