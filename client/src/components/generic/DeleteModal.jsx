import React from "react";
import CustomModal from "./CustomModal";
import { withRouter } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DeleteModal = (props) => {
    const handleAction = () => {
        props.redirect && props.history.push(props.redirect);
        props.handleAction();
        props.updateFlag && props.updateFlag();
    };

    return (
        <CustomModal
            modalTitle="Delete"
            actionVariant="danger"
            handleAction={handleAction}
            modalBody={props.modalBody}
            modalButtonClass="btn btn-sm btn-danger"
            actionButtonBody={
                <>
                    <FontAwesomeIcon
                        className="fa-icon mr-2"
                        icon={["fas", "trash-alt"]}
                    />
                    {props.deleteText ? props.deleteText : "Delete"}
                </>
            }
        >
            <FontAwesomeIcon
                className={props.deleteText ? "fa-icon mr-1" : "fa-icon"}
                icon={["fas", "trash-alt"]}
            />
            {props.deleteText && props.deleteText}
        </CustomModal>
    );
};

export default withRouter(DeleteModal);
