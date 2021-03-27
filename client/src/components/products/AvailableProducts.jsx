import React, { useState, useContext, useEffect } from "react";
import { Card } from "react-bootstrap";
import emoji from "react-easy-emoji";

import Title from "../generic/title";
import AddProduct from "./AddProduct";
import SearchBar from "../generic/SearchBar";
import CustomCard from "../generic/CustomCard";
import { ThemeContext } from "../../contexts/ThemeContext";
import SelectCategory from "./SelectCategory";
import { ProductContext } from "../../contexts/ProductContext";

const AvailableProducts = (props) => {
    const [flag, setFlag] = useState(true);
    const [status, setStatus] = useState(undefined);
    const [searchData, setSearchData] = useState("");
    const [availableProducts, setAvailableProducts] = useState([]);

    const { category } = useContext(ProductContext);

    // Themes
    const { isLightTheme, theme } = useContext(ThemeContext);
    const syntax = isLightTheme ? theme.light.syntax : theme.dark.syntax;

    useEffect(() => {
        const API_URL = "/availableProduct/";

        const loadData = async () => {
            const bodyData = {
                category: category,
                search_data: searchData,
                service_id: localStorage.getItem("userID"),
            };

            try {
                const response = await fetch(API_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(bodyData),
                });

                const data = await response.json();

                if (!response.ok) setStatus(data.message);

                setAvailableProducts(data.items);
            } catch (error) {
                setStatus(error);
            }
        };

        loadData();
    }, [flag, searchData, category]);

    const updateFlag = () => setFlag(!flag);

    const handleChange = (e) => setSearchData(e.target.value);

    return (
        <>
            <h4 className={"mb-5 text-center" + syntax}>
                Add to your Inventory
            </h4>

            <SearchBar
                handleChange={handleChange}
                placeholder="Search products...."
                searchBy="Search products by product name or company name"
            />

            <div className="mb-4">
                <SelectCategory />
            </div>

            <h4 className={"mb-5 text-center" + syntax}>Available Products</h4>

            <CustomCard
                status={status}
                setStatus={setStatus}
                values={availableProducts}
                cardBodyData={(availableProduct) => (
                    <>
                        <Card.Title>{availableProduct.product_name}</Card.Title>

                        <div>
                            <Title>Vat: </Title> {availableProduct.vat}%
                            <br />
                            {/* <Title>Base Price: </Title>{" "}
                            <span className="font-weight-bold">৳ </span>
                            {availableProduct.base_price} BDT
                            <br /> */}
                            <Title>Quantity: </Title> {availableProduct.qty}{" "}
                            {availableProduct.unit}
                            <br />
                            <Title>Company: </Title>{" "}
                            {availableProduct.company_name}
                        </div>

                        <AddProduct
                            updateFlag={updateFlag}
                            availableProduct={availableProduct}
                            base_price={availableProduct.base_price}
                            product_name={availableProduct.product_name}
                        />
                    </>
                )}
                noValueInfo={
                    <>
                        No new products to show to add to your inventory{" "}
                        {emoji("☹")}
                    </>
                }
            />
        </>
    );
};

export default AvailableProducts;
