import React, { useContext, useState } from "react";
import { withRouter } from "react-router";
import { Button, Modal, Col } from "react-bootstrap";
import { SettingsContext } from "../../contexts/SettingsContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ThemeContext } from "../../contexts/ThemeContext";

const CustomModal = (props) => {
    const { isAnimated } = useContext(SettingsContext);
    const [show, setShow] = useState(props.show ? props.show : false);

    // Themes
    const { isLightTheme, theme } = useContext(ThemeContext);
    // const variant = isLightTheme ? "light" : "dark";
    const ui = isLightTheme ? theme.light.ui : theme.dark.ui;
    // const type = isLightTheme ? theme.light.type : theme.dark.type;
    const syntax = isLightTheme ? theme.light.syntax : theme.dark.syntax;
    const border = isLightTheme ? theme.light.border : theme.dark.border;
    const secondary = isLightTheme
        ? theme.light.secondary
        : theme.dark.secondary;
    // const custom_text = isLightTheme
    //     ? theme.light.custom_text
    //     : theme.dark.custom_text;

    const handleClose = () => {
        setShow(false);
        props.handleCloseAction && props.handleCloseAction();
    };

    const handleShow = () => setShow(true);
    const handleAction = () => {
        props.redirect && props.history.push(props.redirect);
        // handleClose();
        props.handleAction();
        props.updateFlag && props.updateFlag();
    };

    return (
        <>
            {!props.noAction && (
                <button
                    onClick={handleShow}
                    disabled={props.edit}
                    style={props.modalButtonStyle}
                    className={props.modalButtonClass}
                >
                    {props.children}
                </button>
            )}

            <Modal
                centered
                show={show}
                size={props.size}
                onHide={handleClose}
                animation={isAnimated}
                className={props.modalClass}
            >
                <div className={"rounded" + syntax + border + ui}>
                    <Modal.Body>
                        <div className="mb-3">
                            {props.size === "sm" ? (
                                props.modalTitle
                            ) : (
                                <Modal.Title>{props.modalTitle}</Modal.Title>
                            )}
                        </div>

                        {props.modalBody}

                        {!props.noAction ? (
                            <div className="d-flex mt-4">
                                <Col className="pl-0">
                                    <Button
                                        className="w-100"
                                        variant={secondary}
                                        onClick={handleClose}
                                    >
                                        <FontAwesomeIcon
                                            icon={["fas", "times"]}
                                            className="mr-2"
                                        />
                                        Close
                                    </Button>
                                </Col>

                                <Col className="p-0">
                                    <Button
                                        className="w-100"
                                        onClick={handleAction}
                                        variant={props.actionVariant}
                                    >
                                        {props.actionButtonBody}
                                    </Button>
                                </Col>
                            </div>
                        ) : (
                            <div className="mt-4">
                                <Button
                                    className="w-100"
                                    variant={secondary}
                                    onClick={handleClose}
                                >
                                    <FontAwesomeIcon
                                        icon={["fas", "times"]}
                                        className="mr-2"
                                    />
                                    Close
                                </Button>
                            </div>
                        )}
                    </Modal.Body>
                </div>
            </Modal>
        </>
    );
};

export default withRouter(CustomModal);
