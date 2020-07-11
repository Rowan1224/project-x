import React, { useState, useContext } from 'react';
import { Dropdown, SplitButton } from "react-bootstrap";
import uuid from 'react-uuid';
import { LocationContext } from '../../contexts/LocationContext';

const DropDown = (props) => {
    const [title, setTitle] = useState(props.title);
    const { changeLocation } = useContext(LocationContext);

    const handleSelect = e => {
        setTitle(e.toUpperCase());
        changeLocation(props.title, e);
    }

    return (
        <SplitButton 
            id="dropdown-split-basic"
            variant="secondary"
            size="lg"
            title={ title }
            onSelect={ handleSelect }
            className="col-sm"
        >
            { props.values.map(value => (
                <Dropdown.Item eventKey={ value } key={ uuid() }>{ value }</Dropdown.Item>
            )) }
        </SplitButton>
    );
}
 
export default DropDown;