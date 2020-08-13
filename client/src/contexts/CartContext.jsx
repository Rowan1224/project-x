import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

const CartContextProvider = (props) => {
    const [items, setItems] = useState([]);

    // componentDidMount
    useEffect(() => {
        const json = sessionStorage.getItem("items");
        const local = JSON.parse(json);

        if (local) setItems(local);
    }, []);

    // componentDidUpdate
    useEffect(() => {
        const json = sessionStorage.getItem("items");
        const local = JSON.parse(json);

        if (local !== items)
            sessionStorage.setItem("items", JSON.stringify(items));
    }, [items]);

    const addItem = (item) => {
        setItems([...items, item]);
    };

    return (
        <CartContext.Provider value={{ items, addItem }}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartContextProvider;
