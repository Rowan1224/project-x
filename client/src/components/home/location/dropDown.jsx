import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

const DropDown = (props) => {
  const [title, setTitle] = useState(props.title);

  const handleSelect = (e) => {
    setTitle(e);
    props.handleSelect(e);
  };

  return (
    <Dropdown>
      <Dropdown.Toggle size="lg" disabled={props.status} variant="facebook" className="shadow mb-2 w-100">
        {title}
      </Dropdown.Toggle>

      <Dropdown.Menu className="text-center bg-light w-100">
        {props.values.map((value) => (
          <Dropdown.Item
            eventKey={value}
            key={uuidv4()}
            onSelect={handleSelect}
            className="text-wrap dropdown-text"
          >
            {value}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropDown;
