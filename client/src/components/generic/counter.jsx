import React, { useState, useEffect } from "react";
import Icon from "@material-ui/core/Icon";
import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";

const Counter = (props) => {
    const { items, handleAddOne, handleMinusOne } = useContext(CartContext);
    const [count, setCount] = useState(1);

    useEffect(() => {
        items.map((item) =>
            item.id === props.id ? setCount(item.count) : undefined
        );
    }, [items, props.id]);

    const addOne = () => {
        handleAddOne(props.id);
    };

    const minusOne = () => {
        handleMinusOne(props.id);
    };

    return (
        <div>
            <Icon
                style={{
                    verticalAlign: "middle",
                    fontSize: "18px",
                    color: "#0275d8",
                }}
                onClick={addOne}
                className="mb-1"
            >
                add_circle
            </Icon>
            <strong className="px-1">{count}</strong>
            <Icon
                style={{
                    verticalAlign: "middle",
                    fontSize: "18px",
                    color: "#d9534f",
                }}
                onClick={minusOne}
                className="mb-1"
            >
                remove_circle
            </Icon>
        </div>
    );
};

export default Counter;
