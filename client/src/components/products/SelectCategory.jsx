import React, { useState, useContext, useEffect } from "react";

import { ProductContext } from "../../contexts/ProductContext";

import CustomAlert from "../generic/CustomAlert";
import LocationDropDown from "../location/LocationDropDown";

const SelectCategory = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(
        JSON.parse(sessionStorage.getItem("product_category"))
            ? JSON.parse(sessionStorage.getItem("product_category"))
            : ""
    );
    const [status, setStatus] = useState(undefined);

    const { changeCategory } = useContext(ProductContext);

    // ComponentDidMount
    useEffect(() => {
        const loadData = async () => {
            const API_URL = "/product/category/";

            try {
                const response = await fetch(API_URL, {
                    method: "GET",
                });

                const data = await response.json();

                if (!response.ok) setStatus(data.message);

                setCategories(data.details);
            } catch (error) {
                setStatus(error);
            }
        };

        loadData();
    }, []);

    const handleCategorySelect = (e) => {
        setSelectedCategory(e);
        changeCategory(e);
    };

    return (
        <div>
            {status && <CustomAlert status={status} />}

            <div className="row">
                <div className="col-12">
                    <LocationDropDown
                        size="lg"
                        status=""
                        customClass="mb-2 w-100"
                        values={categories ? categories : []}
                        handleSelect={handleCategorySelect}
                        title={
                            selectedCategory
                                ? selectedCategory
                                : "Select Category"
                        }
                    />
                </div>
            </div>
        </div>
    );
};

export default SelectCategory;
