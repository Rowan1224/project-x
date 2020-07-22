import React, { createContext, useState } from 'react';

export const CartContext = createContext();

const CartContextProvider = (props) => {
    const [price, setPrice] = useState(0);
    const [amount, setAmount] = useState(1);
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

    return (
        <CartContext.Provider value={{ items, price, amount }}>
            { props.children }
        </CartContext.Provider>
    );
}
 
export default CartContextProvider;