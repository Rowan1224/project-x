import React, { useContext, useEffect, useState, useRef } from "react";
import { Button, Table } from "react-bootstrap";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CartContext } from "../../contexts/CartContext";
import { ThemeContext } from "../../contexts/ThemeContext";

import emoji from "react-easy-emoji";
import Infobar from "../generic/infobar";
import CustomAlert from "../generic/CustomAlert";

const Checkout = () => {
    const form = useRef(null);
    const { items, discount, totalPrice } = useContext(CartContext);
    const [addressess, setAddressess] = useState([]);
    const [newAddress, setNewAddress] = useState({});
    const [status, setStatus] = useState(undefined);
    const [statusVariant, setStatusVariant] = useState("danger");

    // Themes
    const { isLightTheme, theme } = useContext(ThemeContext);
    const variant = isLightTheme ? "light" : "dark";
    const ui = isLightTheme ? theme.light.ui : theme.dark.ui;
    const type = isLightTheme ? theme.light.type : theme.dark.type;
    const link = isLightTheme ? theme.light.link : theme.dark.link;
    const syntax = isLightTheme ? theme.light.syntax : theme.dark.syntax;
    const success = isLightTheme ? theme.light.success : theme.dark.success;
    const border = isLightTheme ? theme.light.border : theme.dark.border;

    useEffect(() => {
        const loadData = async () => {
            const API_URL = "/getCustomerAddress/";

            const object = {
                customerId: localStorage.getItem("userID"),
            };

            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(object),
            });
            // if (response.status === 401) handleLogOut();

            const data = await response.json();

            if (!response.ok) setStatus(data.detail);
            else setAddressess(data.address);
        };

        loadData();
    }, []);

    const handleSelect = (e) => {
        let tmp = {};
        addressess.map(
            (address) =>
                address.customer_add_id.toString() === e.target.value &&
                (tmp = address)
        );
        setNewAddress(tmp);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let API_URL = "/createCustomerAddress/";

        const loadData = async () => {
            const formData = new FormData(form.current);

            let object = {};
            formData.forEach(function (value, key) {
                object[key] = value;
            });
            object["customer_id"] = localStorage.getItem("userID");

            try {
                // Confirming Address
                let response = await fetch(API_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ address: object }),
                });

                let data = await response.json();

                if (!response.ok) setStatus(data.message);
                else {
                    // Confirming Order
                    API_URL = "/createcustomerorder/";

                    //     {
                    //         "userid": 2,
                    //         "service_id": 2,
                    //         "order_time": "2020-05-03 5:20",
                    //         "customer_address_id": 1,
                    //         "payment": 2500,
                    //          "details":
                    //          [

                    //             {"order_id":1, "product_id":1,"qty":"5 kg","price": 500},
                    //             {"order_id":1, "product_id":2,"qty":"5 kg","price": 600},
                    //             {"order_id":1, "product_id":3,"qty":"5 kg","price": 700},
                    //             {"order_id":1, "product_id":4,"qty":"5 kg","price": 800}
                    //          ]

                    // }

                    response = await fetch(API_URL, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        // body: JSON.stringify({ address: object }),
                    });

                    data = await response.json();

                    if (!response.ok) setStatus(data.message);
                    else {
                        setStatus(data.message);
                        setStatusVariant("success");
                    }
                }
            } catch (error) {
                setStatus(error);
            }
        };

        loadData();
    };

    return (
        <div className={"card" + ui + syntax + border}>
            <div className="card-body row">
                <div className="col-md-4 order-md-2 mb-4">
                    <h4 className="d-flex justify-content-between align-items-center mb-3">
                        <span style={{ opacity: "0.7" }}>Your cart</span>
                        <span className={"badge badge-pill badge-" + type}>
                            {items.length}
                        </span>
                    </h4>

                    {items.length > 0 ? (
                        <div
                            className={"rounded mb-3" + border}
                            style={{ height: "15rem", overflow: "scroll" }}
                        >
                            <Table responsive="sm" striped variant={variant}>
                                <tbody>
                                    {items.map((item) => (
                                        <tr key={item.id}>
                                            <td className="align-middle">
                                                {item.productName}
                                                <br />
                                                <small
                                                    style={{
                                                        opacity: "0.7",
                                                    }}
                                                >
                                                    Item count: {item.count},
                                                    Per Item Price: Tk
                                                    {item.price}
                                                </small>
                                            </td>
                                            <td className="text-right align-middle">
                                                Tk {item.count * item.price}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    ) : (
                        <div className="mb-3">
                            <Infobar>Your cart is empty {emoji("🙁")}</Infobar>
                        </div>
                    )}

                    <div className={"text-center mb-3" + link}>
                        <Link to="/cart">Back to shopping cart</Link>
                    </div>

                    <div className={"rounded mb-3" + border}>
                        <Table responsive="sm" striped variant={variant}>
                            <tbody>
                                <tr>
                                    <td
                                        className={
                                            "align-middle text-" + success
                                        }
                                    >
                                        <div>
                                            <h6 className="my-0">Discount</h6>
                                            <small>
                                                For Early Birds: {discount}%
                                            </small>
                                        </div>
                                    </td>
                                    <td className="text-right align-middle">
                                        Tk -
                                        {Math.floor(
                                            totalPrice * (discount / 100)
                                        )}
                                    </td>
                                </tr>

                                <tr>
                                    <td className="align-middle">
                                        <span>Total (BDT)</span>
                                    </td>
                                    <td className="text-right align-middle">
                                        <strong>TK {totalPrice}</strong>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>

                    <form className={"card p-2" + ui + border}>
                        <div className="input-group">
                            <input
                                type="text"
                                placeholder="Promo code"
                                className="form-control"
                            />
                            <div className="input-group-append">
                                <button
                                    type="submit"
                                    className="btn btn-secondary"
                                >
                                    Redeem
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="col-md-8 order-md-1">
                    <h4 className="mb-3">Shipping address</h4>
                    <form
                        ref={form}
                        noValidate
                        onSubmit={handleSubmit}
                        className="needs-validation"
                    >
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="username">
                                    <FontAwesomeIcon
                                        className="mr-2"
                                        icon={["fas", "user"]}
                                    />
                                    Name
                                </label>
                                <input
                                    readOnly
                                    type="text"
                                    id="username"
                                    defaultValue={localStorage.getItem(
                                        "username"
                                    )}
                                    className={
                                        "text-center form-control" + border
                                    }
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="phone">
                                    <FontAwesomeIcon
                                        className="mr-2"
                                        icon={["fas", "phone"]}
                                    />
                                    Phone
                                </label>
                                <input
                                    readOnly
                                    id="phone"
                                    type="phone"
                                    className={
                                        "text-center form-control" + border
                                    }
                                    defaultValue={localStorage.getItem(
                                        "phone_number"
                                    )}
                                />
                            </div>
                        </div>

                        <div className="mb-3">
                            <small style={{ opacity: "0.7" }}>
                                Want them to call you to another number? Provide
                                it in the further description filed
                            </small>
                        </div>

                        <hr
                            className="mb-4"
                            style={{
                                borderColor: "inherit",
                                opacity: "0.2",
                            }}
                        />

                        <div className="row">
                            <div className="col mb-3">
                                <label htmlFor="address">Addresses</label>
                                <select
                                    required
                                    id="address"
                                    onChange={handleSelect}
                                    className={
                                        "custom-select d-block w-100" + border
                                    }
                                >
                                    <option defaultValue="">
                                        Select from saved addresses...
                                    </option>
                                    {addressess.map((address) => (
                                        <option
                                            key={address.customer_add_id}
                                            value={address.customer_add_id}
                                        >
                                            House No: {address.house_no}, Road
                                            No: {address.road_no}, Further
                                            Description:{" "}
                                            {address.further_description
                                                ? address.further_description
                                                : "Null"}
                                        </option>
                                    ))}
                                </select>
                                <div className="invalid-feedback">
                                    Please select a valid address
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-4 mb-3">
                                <label htmlFor="house_no">House No</label>
                                <input
                                    required
                                    type="text"
                                    id="house_no"
                                    name="house_no"
                                    placeholder="8"
                                    defaultValue={newAddress.house_no}
                                    className={
                                        "form-control text-center" + border
                                    }
                                />
                                <div className="invalid-feedback">
                                    Please select a valid house.
                                </div>
                            </div>
                            <div className="col-md-4 mb-3">
                                <label htmlFor="road_no">Road No</label>
                                <input
                                    required
                                    type="text"
                                    id="road_no"
                                    name="road_no"
                                    placeholder="2/B"
                                    defaultValue={newAddress.road_no}
                                    className={
                                        "form-control text-center" + border
                                    }
                                />
                                <div className="invalid-feedback">
                                    Please provide a valid road number.
                                </div>
                            </div>
                            <div className="col-md-4 mb-3">
                                <label htmlFor="area_id">Area ID</label>
                                <input
                                    readOnly
                                    type="text"
                                    id="area_id"
                                    name="area_id"
                                    placeholder="1209"
                                    defaultValue={newAddress.area_id}
                                    className={
                                        "form-control text-center" + border
                                    }
                                />
                                <div className="invalid-feedback">
                                    Area ID is required
                                </div>
                            </div>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="further_description">
                                Further Description
                            </label>
                            <input
                                required
                                type="text"
                                id="further_description"
                                name="further_description"
                                defaultValue={newAddress.further_description}
                                placeholder="Sector-17, Uttara, Dhaka, Phone: 012xx-xxx-xxx"
                                className={"form-control" + border}
                            />
                            <div className="invalid-feedback">
                                Please enter your shipping further description.
                            </div>
                        </div>

                        <h4 className="mb-3">Payment</h4>

                        <div className="d-block my-3">
                            <div className="custom-control custom-radio">
                                <input
                                    disabled
                                    id="bkash"
                                    type="radio"
                                    name="paymentMethod"
                                    className="custom-control-input"
                                />
                                <label
                                    htmlFor="bkash"
                                    className="custom-control-label"
                                >
                                    Bkash
                                </label>
                            </div>

                            <div className="custom-control custom-radio">
                                <input
                                    required
                                    type="radio"
                                    defaultChecked
                                    id="cashOnDelivery"
                                    className="custom-control-input"
                                />
                                <label
                                    htmlFor="cashOnDelivery"
                                    className="custom-control-label"
                                >
                                    <FontAwesomeIcon
                                        className="mr-2"
                                        icon={["fas", "hand-holding-usd"]}
                                    />
                                    Cash on delivery
                                </label>
                            </div>
                        </div>

                        <hr
                            className="mb-4"
                            style={{
                                borderColor: "inherit",
                                opacity: "0.2",
                            }}
                        />

                        {status && (
                            <CustomAlert
                                variant={statusVariant}
                                status={status}
                            />
                        )}

                        <Button
                            type="submit"
                            variant={type}
                            disabled={!items.length}
                        >
                            Confirm Purchase
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default withRouter(Checkout);
