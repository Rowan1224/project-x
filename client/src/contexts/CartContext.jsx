import React, { createContext, useState } from 'react';

export const CartContext = createContext();

const CartContextProvider = (props) => {
    // dummy data
    const items = [
        {
            product: "Toyota Car",
            price: 789
        },
        {
            product: "Tesla model X",
            price: 987
        },
        {
            product: "Toyota Car",
            price: 789
        },
        {
            product: "Toyota Car",
            price: 789
        },
        {
            product: "Toyota Car",
            price: 789
        },
        {
            product: "Toyota Car",
            price: 789
        },
        {
            product: "Toyota Car",
            price: 789
        },
        {
            product: "Toyota Car",
            price: 789
        },
        {
            product: "Toyota Car",
            price: 789
        },
    ]

    const [price, setPrice] = useState(0);
    const [amount, setAmount] = useState(1);

    // For avoiding the warning -_-
    const uselessFunc = () => {
        setPrice(0);
        setAmount(1);
    }

    return (
        <CartContext.Provider value={{ items, price, amount, uselessFunc }}>
            { props.children }
        </CartContext.Provider>
    );
}
 
export default CartContextProvider;