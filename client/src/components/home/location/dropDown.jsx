import React, { useState } from "react";
import { Dropdown, DropdownButton, ButtonGroup } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

const DropDown = (props) => {
  const [title, setTitle] = useState(props.title);

  const handleSelect = (e) => {
    setTitle(e);
    props.handleSelect(e);
  };

  return (
    <DropdownButton
      size="lg"
      title={title}
      as={ButtonGroup}
      variant="facebook"
      onSelect={handleSelect}
      className="shadow px-0 mx-3 col-sm mb-2"
      // style={{ minWidth: "15rem" }}
    >
      {props.values.map((value) => (
        <Dropdown.Item
          eventKey={value}
          key={uuidv4()}
          className="card-body text-center"
          // style={{ minWidth: "15rem" }}
        >
          {value}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
};

export default DropDown;
