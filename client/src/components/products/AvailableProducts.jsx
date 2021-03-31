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
import CustomPagination from "../generic/CustomPagination";

const AvailableProducts = (props) => {
    const [flag, setFlag] = useState(true);
    const [totalPage, setTotalPage] = useState(0);
    const [status, setStatus] = useState(undefined);
    const [activePage, setActivePage] = useState(1);
    const [searchData, setSearchData] = useState("");
    const [availableProducts, setAvailableProducts] = useState([]);

    const { category } = useContext(ProductContext);

    // Themes
    const { isLightTheme, theme } = useContext(ThemeContext);
    const syntax = isLightTheme ? theme.light.syntax : theme.dark.syntax;

    useEffect(() => {
        let API_URL = "/availableProduct/";

        const loadData = async () => {
            let bodyData = {
                category: category,
                search_data: searchData,
                page_number: activePage,
                service_id: localStorage.getItem("userID"),
            };

            try {
                let response = await fetch(API_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(bodyData),
                });

                let data = await response.json();

                if (!response.ok) setStatus(data.message);

                setAvailableProducts(data.items);

                // Get total page count
                API_URL = "/category/page/";

                bodyData = {
                    category: category,
                    search_data: searchData,
                    service_id: localStorage.getItem("userID"),
                };

                response = await fetch(API_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(bodyData),
                });

                data = await response.json();

                if (!response.ok) setStatus(data.message);

                setTotalPage(data.details);
            } catch (error) {
                setStatus(error);
            }
        };

        loadData();
    }, [flag, searchData, category, activePage]);

    const updateFlag = () => setFlag(!flag);

    const handleChange = (e) => setSearchData(e.target.value);

    const handlePageClick = (e) => setActivePage(e);

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

            <CustomPagination
                totalPage={totalPage}
                activePage={activePage}
                handlePageClick={handlePageClick}
            />
        </>
    );
};

export default AvailableProducts;
