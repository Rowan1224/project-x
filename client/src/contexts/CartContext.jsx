import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

const CartContextProvider = (props) => {
    // dummy data
    // const items = [
    //     {
    //         product: "Toyota Car",
    //         price: 789
    //     },
    //     {
    //         product: "Tesla model X",
    //         price: 987
    //     },
    //     {
    //         product: "Toyota Car",
    //         price: 789
    //     },
    //     {
    //         product: "Toyota Car",
    //         price: 789
    //     },
    //     {
    //         product: "Toyota Car",
    //         price: 789
    //     },
    //     {
    //         product: "Toyota Car",
    //         price: 789
    //     },
    //     {
    //         product: "Toyota Car",
    //         price: 789
    //     },
    //     {
    //         product: "Toyota Car",
    //         price: 789
    //     },
    //     {
    //         product: "Toyota Car",
    //         price: 789
    //     },
    // ]

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

        console.log("This one ->", items);
    }, [items]);

    const addItem = (item) => {
        let tmp = items ? items : [];
        tmp.push(item);
        // console.log("From function", tmp);
        setItems(tmp);
    };

    return (
        <CartContext.Provider value={{ items, addItem }}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartContextProvider;
