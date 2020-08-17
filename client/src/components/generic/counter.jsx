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

    return (
        <div>
            <Icon
                style={{
                    verticalAlign: "middle",
                    fontSize: "1.125rem",
                    color: "#0275d8",
                }}
                onClick={() => handleAddOne(props.id)}
                className="mb-1"
            >
                add_circle
            </Icon>
            <strong className="px-1">{count}</strong>
            <Icon
                style={{
                    verticalAlign: "middle",
                    fontSize: "1.125rem",
                    color: "#d9534f",
                }}
                onClick={() => handleMinusOne(props.id)}
                className="mb-1"
            >
                remove_circle
            </Icon>
            {/* <div className="w-25 input-group">
                <input
                    type="text"
                    className="form-control"
                    // value={count}
                />
                <div className="input-group-append">
                    <span className="input-group-text">
                        a
                    </span>
                </div>
            </div> */}
        </div>
    );
};

export default Counter;
