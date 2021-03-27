import React, { createContext, useState, useEffect } from "react";

export const ProductContext = createContext();

const ProductContextProvider = (props) => {
    const [category, setCategory] = useState("");

    // componentDidUpdate
    useEffect(() => {
        const json = sessionStorage.getItem("product_category");
        const localCategory = JSON.parse(json);

        if (localCategory) setCategory(localCategory);
    }, []);

    // componentDidUpdate
    useEffect(() => {
        const json = sessionStorage.getItem("product_category");
        const localCategory = JSON.parse(json);

        if (localCategory !== category)
            sessionStorage.setItem(
                "product_category",
                JSON.stringify(category)
            );
    }, [category]);

    const changeCategory = (selectedCategory) => {
        setCategory(selectedCategory);

        // Updating sessionStorage
        sessionStorage.setItem("product_category", JSON.stringify(selectedCategory));
    };

    return (
        <ProductContext.Provider value={{ category, changeCategory }}>
            {props.children}
        </ProductContext.Provider>
    );
};

export default ProductContextProvider;
