import React, { useState, useContext } from 'react';
import { Dropdown, SplitButton } from "react-bootstrap";
import { v4 as uuidv4 } from 'uuid';
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
            className="col-sm ml-2"
        >
            { props.values.map(value => (
                <Dropdown.Item eventKey={ value } key={ uuidv4() }>{ value }</Dropdown.Item>
            )) }
        </SplitButton>
    );
}
 
export default DropDown;