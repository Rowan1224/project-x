import React, { useState, useContext } from "react";
import { Dropdown } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

import { ThemeContext } from "../../contexts/ThemeContext";

const EmployeeDropDown = (props) => {
    const [title, setTitle] = useState(props.title);

    const handleSelect = (e, value) => {
        setTitle(value);
        // console.log(e, "Needs name here", value);
        const tmp = { id: e, name: value };
        // props.handleSelect(e);
        props.handleSelect(tmp);
    };

    // Themes
    const { isLightTheme, theme } = useContext(ThemeContext);
    const ui = isLightTheme ? theme.light.ui : theme.dark.ui;
    const type = isLightTheme ? theme.light.type : theme.dark.type;
    const syntax = isLightTheme ? theme.light.syntax : theme.dark.syntax;
    const border = isLightTheme ? theme.light.border : theme.dark.border;
    const dropdown_text = isLightTheme
        ? theme.light.dropdown_text
        : theme.dark.dropdown_text;

    return (
        <Dropdown>
            <Dropdown.Toggle
                size={props.size}
                disabled={props.status && props.status}
                variant={props.type ? props.type : type}
                className={
                    props.customClass && props.customClass + " text-wrap"
                }
            >
                {title}
            </Dropdown.Toggle>

            <Dropdown.Menu className={"text-center w-100 shadow" + ui + border}>
                {props.values.map((value) => (
                    <Dropdown.Item
                        eventKey={
                            props.subElementKey
                                ? value[props.subElementKey]
                                : value
                        }
                        key={uuidv4()}
                        onSelect={(e) =>
                            handleSelect(
                                e,
                                props.subElementValue &&
                                    value[props.subElementValue]
                            )
                        }
                        className={"text-wrap" + syntax + dropdown_text}
                    >
                        {props.subElementValue
                            ? value[props.subElementValue]
                            : value}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default EmployeeDropDown;
