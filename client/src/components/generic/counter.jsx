import React, { useState, useEffect } from "react";
import Icon from "@material-ui/core/Icon";
import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";

const Counter = (props) => {
    const { items, handleCount } = useContext(CartContext);
    const [count, setCount] = useState(1);

    const handleAddOne = () => setCount(count + 1);
    const handleMinusOne = () => count > 1 ? setCount(count - 1) : setCount(1);

    // const storageKey = props.skey ? props.skey : 0;

    useEffect(() => {
        items.map((item) =>
            item.id === props.id ? setCount(item.count) : undefined
        );
    }, [items, props.id]);

    useEffect(() => {
        handleCount(props.id, count);
    }, [count, props.id, handleCount]);

    // useEffect(() => {
    //     const json = sessionStorage.getItem(storageKey);
    //     const localCount = parseInt(json, 10);

    //     if(!isNaN(localCount))
    //         setCount(localCount);
    // }, [storageKey])

    // // componentDidUpdate
    // useEffect(() => {
    //     const json = sessionStorage.getItem(storageKey);
    //     const localCount = parseInt(json, 10);

    //     if(localCount !== count)
    //         sessionStorage.setItem(storageKey, count);
    // }, [storageKey, count])

    return (
        <div>
            <Icon
                style={{
                    verticalAlign: "middle",
                    fontSize: "18px",
                    color: "#0275d8",
                }}
                onClick={ handleAddOne }
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
                onClick={ handleMinusOne }
                className="mb-1"
            >
                remove_circle
            </Icon>
        </div>
    );
};

export default Counter;
