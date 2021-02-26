import { useHistory } from "react-router-dom";
import { Alert, Modal, Spinner } from "react-bootstrap";
import { ThemeContext } from "../../contexts/ThemeContext";
import { SettingsContext } from "../../contexts/SettingsContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useContext, useEffect, useCallback } from "react";

const CustomModalAlert = (props) => {
    const timeoutTime = 2000;
    const history = useHistory();
    const { setStatus, redirect, updateFlag } = props;
    const [show, setShow] = useState(true);

    const { isAnimated } = useContext(SettingsContext);

    // Themes
    const { isLightTheme, theme } = useContext(ThemeContext);
    const ui = isLightTheme ? theme.light.ui : theme.dark.ui;
    const bg = isLightTheme ? theme.light.bg : theme.dark.bg;
    const syntax = isLightTheme ? theme.light.syntax : theme.dark.syntax;
    const border = isLightTheme ? theme.light.border : theme.dark.border;

    const handleClose = useCallback(() => {
        setStatus(undefined);
        setShow(false);
        redirect && history.push(redirect);
        updateFlag && updateFlag();
    }, [setStatus, history, redirect, updateFlag]);

    useEffect(() => {
        setTimeout(handleClose, timeoutTime);
    }, [handleClose]);

    return (
        <Modal
            centered
            size="md"
            show={show}
            onHide={handleClose}
            animation={isAnimated}
            className="text-center"
            style={{ background: bg }}
        >
            <div className={"rounded" + syntax + border + ui}>
                <Modal.Body>
                    <Alert
                        className={"m-0 " + props.alertClass}
                        variant={props.variant ? props.variant : "danger"}
                    >
                        <div className="mb-3">
                            <FontAwesomeIcon
                                style={{ fontSize: "4rem" }}
                                icon={[
                                    "fas",
                                    props.variant === "success"
                                        ? "check-circle"
                                        : "times-circle",
                                ]}
                            />
                        </div>

                        {props.status}

                        {redirect && (
                            <div className="mt-2">
                                <Spinner
                                    size="sm"
                                    animation="border"
                                    className="mb-1"
                                />

                                <span className="ml-2">Redirecting...</span>
                            </div>
                        )}
                    </Alert>
                </Modal.Body>
            </div>
        </Modal>
    );
};

export default CustomModalAlert;
