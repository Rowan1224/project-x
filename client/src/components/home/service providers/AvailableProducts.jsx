import React, { useContext, useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import Title from "../../generic/title";
import emoji from "react-easy-emoji";

import CustomModalAlert from "../../generic/CustomModalAlert";
import { ThemeContext } from "../../../contexts/ThemeContext";
import Infobar from "../../generic/infobar";
import AddProduct from "./AddProduct";

const AvailableProducts = (props) => {
    const [flag, setFlag] = useState(true);
    const [statusVariant] = useState("danger");
    const [status, setStatus] = useState(undefined);
    const [availableProducts, setAvailableProducts] = useState([]);

    // Themes
    const { isLightTheme, theme } = useContext(ThemeContext);
    const ui = isLightTheme ? theme.light.ui : theme.dark.ui;
    const syntax = isLightTheme ? theme.light.syntax : theme.dark.syntax;
    const border = isLightTheme ? theme.light.border : theme.dark.border;
    // const type = isLightTheme ? theme.light.type : theme.dark.type;

    useEffect(() => {
        const API_URL = "/availableProduct/";

        const loadData = async () => {
            const bodyData = {
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
    }, [flag]);

    const updateFlag = () => setFlag(!flag);

    return (
        <>
            <Infobar>Available Products</Infobar>
            {availableProducts && availableProducts.length > 0 ? (
                <div className="row mt-4">
                    {availableProducts.map((availableProduct) => (
                        <div
                            key={availableProduct.product_id}
                            className="col-lg-3 col-md-4 col-sm-6 mb-4 text-center"
                        >
                            <Card className={"shadow" + ui + border}>
                                {status && (
                                    <CustomModalAlert
                                        status={status}
                                        setStatus={setStatus}
                                        variant={statusVariant}
                                    />
                                )}

                                <Card.Body className={syntax}>
                                    <Card.Title>
                                        {availableProduct.product_name}
                                    </Card.Title>

                                    <div>
                                        <Title>Vat: </Title>{" "}
                                        {availableProduct.vat}%
                                        <br />
                                        <Title>Quantity: </Title>{" "}
                                        {availableProduct.qty}{" "}
                                        {availableProduct.unit}
                                        <br />
                                        <Title>Company: </Title>{" "}
                                        {availableProduct.company_name}
                                    </div>

                                    <AddProduct
                                        updateFlag={updateFlag}
                                        availableProduct={availableProduct}
                                        product_name={
                                            availableProduct.product_name
                                        }
                                    />
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>
            ) : (
                <Infobar>
                    No new products to show to add to your inventory{" "}
                    {emoji("☹")}
                </Infobar>
            )}
        </>
    );
};

export default AvailableProducts;
