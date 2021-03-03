import React, { useContext, useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { ThemeContext } from "../../../contexts/ThemeContext";
import Title from "../../generic/title";
import { CartContext } from "../../../contexts/CartContext";
import Icon from "@material-ui/core/Icon";
import { useParams } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UpdateProductDetails from "./UpdateProductDetails";
import DeleteModal from "../../generic/DeleteModal";
import CustomModalAlert from "../../generic/CustomModalAlert";

const Service = (props) => {
    const params = useParams();
    const [show, setShow] = useState(false);
    const [count, setCount] = useState(1);
    const [isServiceProvider] = useState(
        localStorage.getItem("isServiceProvider") === "true"
    );
    const [status, setStatus] = useState(undefined);
    const [productDetails, setProductDetails] = useState({});
    const [statusVariant, setStatusVariant] = useState("danger");

    const { items, addItem, postCountUpdate } = useContext(CartContext);

    // Themes
    const { isLightTheme, theme } = useContext(ThemeContext);
    const ui = isLightTheme ? theme.light.ui : theme.dark.ui;
    const syntax = isLightTheme ? theme.light.syntax : theme.dark.syntax;
    const border = isLightTheme ? theme.light.border : theme.dark.border;
    const type = isLightTheme ? theme.light.type : theme.dark.type;
    const success = isLightTheme ? theme.light.success : theme.dark.success;
    const currency_text = isLightTheme
        ? theme.light.currency_text
        : theme.dark.currency_text;
    const dangerTextColor = isLightTheme
        ? theme.light.dangerTextColor
        : theme.dark.dangerTextColor;
    const custom_text = isLightTheme
        ? theme.light.custom_text
        : theme.dark.custom_text;

    useEffect(() => {
        const json = sessionStorage.getItem("items");
        const local = JSON.parse(json);

        if (local) {
            local.map((item) => {
                if (item.id === props.serviceInfo.product_id) {
                    setShow(true);
                    setCount(item.count);
                }
                return item;
            });
        }
    }, [props.serviceInfo.product_id]);

    useEffect(() => {
        const API_URL = "/getOwnProductDetails/";

        const loadData = async () => {
            const bodyData = {
                service_id: params.id,
                product_id: props.serviceInfo.product_id,
            };

            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(bodyData),
            });

            const data = await response.json();

            setProductDetails(data);
        };
        loadData();
    }, [props.serviceInfo.product_id, params.id]);

    useEffect(() => {
        if (show) postCountUpdate(props.serviceInfo.product_id, count);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [show, count, props.serviceInfo.product_id]);

    const price = Math.floor(
        props.serviceInfo.price +
            (props.serviceInfo.price * productDetails.vat) / 100
    );

    const handleShow = () => {
        setShow(true);
    };

    const handleAddItem = () => {
        let results = false;

        for (let i = 0; i < items.length; i++) {
            if (items[i].id === props.serviceInfo.product_id) {
                results = true;
                break;
            }
        }

        if (!results) {
            const product = {
                id: props.serviceInfo.product_id,
                productName: productDetails.product_name,
                qty: productDetails.qty,
                unit: productDetails.unit,
                count,
                price,
            };

            addItem(product);
            handleShow();
        }

        sessionStorage.setItem("service_id", props.serviceInfo.service_id);
    };

    const handleDeleteItem = (id) => {
        const API_URL = "/deleteproduct/";
        const loadData = async () => {
            const bodyData = {
                product_id: id,
                service_id: localStorage.getItem("userID"),
            };
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(bodyData),
            });
            const data = await response.json();
            if (response.ok) setStatusVariant("success");
            setStatus(data.message);
        };
        loadData();
    };

    const addOne = () => setCount(count + 1);
    const minusOne = () => (count > 1 ? setCount(count - 1) : setCount(1));

    return (
        <div className="col-lg-3 col-md-4 col-sm-6 mb-4 text-center">
            <Card className={"shadow" + ui + border}>
                {status && (
                    <CustomModalAlert
                        status={status}
                        setStatus={setStatus}
                        variant={statusVariant}
                    />
                )}

                <div className={"inner border-bottom border-" + type}>
                    <Card.Img
                        variant="top"
                        src={`https://picsum.photos/id/${Math.floor(
                            Math.random() * 1000
                        )}/800`}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/img/Default.png";
                        }}
                        style={{ maxHeight: "12rem" }}
                        alt="card image"
                    />
                </div>
                <Card.Body className={syntax}>
                    <Card.Title>{productDetails.product_name}</Card.Title>
                    <h5 className={currency_text}>
                        <span className="font-weight-bold">৳ </span>

                        {isServiceProvider
                            ? productDetails.price
                            : count * price}
                    </h5>

                    {isServiceProvider ? (
                        <p className={custom_text}>(Vat Excluded)</p>
                    ) : (
                        <p className={custom_text}>(Vat included)</p>
                    )}

                    <div>
                        <Title>Vat: </Title> {productDetails.vat}%
                        <br />
                        <Title>Quantity: </Title> {count * productDetails.qty}{" "}
                        {productDetails.unit}
                        <br />
                        <Title>Company: </Title> {productDetails.company_name}
                        {!isServiceProvider && (
                            <>
                                <br />
                                <div className="my-3 d-flex justify-content-center">
                                    <Icon
                                        style={{
                                            fontSize: "1.125rem",
                                            color: "#0275d8",
                                        }}
                                        onClick={addOne}
                                        className="mt-1"
                                    >
                                        add_circle
                                    </Icon>
                                    <input
                                        type="number"
                                        className={
                                            "show-cart-count mx-1" + syntax
                                        }
                                        value={count}
                                        style={{ maxWidth: "2.5rem" }}
                                        onChange={(e) =>
                                            setCount(e.target.value)
                                        }
                                        onKeyDown={(e) =>
                                            ["e", "E", "+", "-", "."].includes(
                                                e.key
                                            ) && e.preventDefault()
                                        }
                                    />
                                    <Icon
                                        style={{
                                            fontSize: "1.125rem",
                                            color: "#d9534f",
                                        }}
                                        onClick={minusOne}
                                        className="mt-1"
                                    >
                                        remove_circle
                                    </Icon>
                                </div>
                            </>
                        )}
                    </div>

                    {isServiceProvider ? (
                        <div className="d-flex justify-content-around mt-3">
                            <UpdateProductDetails
                                product={productDetails}
                                updateFlag={props.updateFlag}
                                id={props.serviceInfo.product_id}
                                service_id={localStorage.getItem("userID")}
                            />

                            <DeleteModal
                                deleteText={true}
                                updateFlag={props.updateFlag}
                                handleAction={() =>
                                    handleDeleteItem(
                                        props.serviceInfo.product_id
                                    )
                                }
                                modalBody={
                                    <>
                                        Do you really want to delete Product:{" "}
                                        <span className={custom_text}>
                                            {productDetails.product_name}
                                        </span>{" "}
                                        from your inventory?
                                        <br />
                                        <span className={dangerTextColor}>
                                            Caution: This action cannot be
                                            undone
                                        </span>
                                    </>
                                }
                            />
                        </div>
                    ) : (
                        <Button
                            variant={show ? success : type}
                            onClick={handleAddItem}
                        >
                            {show ? (
                                <div>
                                    <FontAwesomeIcon
                                        className="fa-icon mr-2"
                                        icon={["fas", "check"]}
                                    />
                                    Added to the cart
                                </div>
                            ) : (
                                <div>
                                    <Icon
                                        style={{
                                            verticalAlign: "middle",
                                            fontSize: "18px",
                                        }}
                                        className="mr-2 mb-1"
                                    >
                                        add_shopping_cart
                                    </Icon>
                                    Add to cart
                                </div>
                            )}
                        </Button>
                    )}
                </Card.Body>
            </Card>
        </div>
    );
};

export default Service;
