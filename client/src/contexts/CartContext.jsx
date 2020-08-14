import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

const CartContextProvider = (props) => {
    const [items, setItems] = useState([]);
    const discount = 8;

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

    const handleCount = (id, count) => {
        let tmp = items.map((item) => {
            if (item.id === id) {
                item.count = count;
                return item;
            }
            return item;
        });
        // setItems([...tmp]);
    };

    console.log(items);

    return (
        <CartContext.Provider value={{ items, discount, handleCount, addItem }}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartContextProvider;
