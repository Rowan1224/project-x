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
                    Delete
                </>
            }
        >
            <FontAwesomeIcon className="fa-icon mr-1" icon={["fas", "trash-alt"]} />
            {props.deleteText && "Delete"}
        </CustomModal>
    );
};

export default withRouter(DeleteModal);
