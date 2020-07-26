import React, { useState, useContext } from 'react';

import {
    Dropdown,
    DropdownButton,
    ButtonGroup
} from "react-bootstrap";

import { v4 as uuidv4 } from 'uuid';

const DropDown = (props) => {
    const [title, setTitle] = useState(props.title);

    // const handleSelect = e => {
    //     setTitle(e.charAt(0).toUpperCase() + e.slice(1).toLowerCase());
    //     selectLocation(props.title, e);
    // }

    return (
        <DropdownButton 
            size="lg"
            title={ title }
            as={ ButtonGroup }
            variant="secondary"
            onSelect={ props.handleSelect }
            className="col-sm mb-2"
        >
            { props.values.map(value => (
                <Dropdown.Item
                    eventKey={ value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() }
                    key={ uuidv4() }
                >
                    { value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() }
                </Dropdown.Item>
            )) }
        </DropdownButton>
    );
}
 
export default DropDown;