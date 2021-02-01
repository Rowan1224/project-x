import React from "react";
import Counter from "../generic/counter";
import { Table, Button } from "react-bootstrap";
import DeleteTwoToneIcon from "@material-ui/icons/DeleteTwoTone";
import Icon from "@material-ui/core/Icon";
import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { CartContext } from "../../contexts/CartContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Link } from "react-router-dom";
import emoji from "react-easy-emoji";
import Infobar from "../generic/infobar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Checkout = (props) => {
    const {
        items,
        discount,
        totalPrice,
        handleRemove,
        subTotalPrice,
    } = useContext(CartContext);

    // Themes
    const { isLightTheme, theme } = useContext(ThemeContext);
    const variant = isLightTheme ? "light" : "dark";
    const ui = isLightTheme ? theme.light.ui : theme.dark.ui;
    const type = isLightTheme ? theme.light.type : theme.dark.type;
    const syntax = isLightTheme ? theme.light.syntax : theme.dark.syntax;
    const border = isLightTheme ? theme.light.border : theme.dark.border;
    const custom_text = isLightTheme
        ? theme.light.custom_text
        : theme.dark.custom_text;

    return (
        <div>
            <div
                className={
                    "row text-center rounded mx-auto shadow" +
                    ui +
                    border +
                    custom_text
                }
            >
                <div className="col-4 py-2 my-auto">
                    <div className="amount-label">Sub Total</div>
                    <div className="amount">Tk {subTotalPrice}</div>
                </div>

                <div className="col-4 py-2 my-auto">
                    <div className="amount-label">Discount</div>
                    <div className="amount">{discount}%</div>
                </div>

                <div className="col-4 py-2 my-auto">
                    <div className="amount-label">Grand Total</div>
                    <div className="amount">Tk {totalPrice}</div>
                </div>

                <div className="col-12 d-flex justify-content-around py-2 my-auto">
                    Payment method:
                    <div className="form-check">
                        <input
                            disabled
                            type="radio"
                            name="payment_method"
                            className="form-check-input"
                        />
                        <label className="form-check-label">Bkash</label>
                    </div>
                    <div className="form-check">
                        <input
                            checked
                            type="radio"
                            name="payment_method"
                            className="form-check-input"
                        />
                        <label className="form-check-label">
                            <FontAwesomeIcon
                                className="mr-2"
                                icon={["fas", "hand-holding-usd"]}
                            />
                            Cash on delivery
                        </label>
                    </div>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col-sm-12 mb-2 col-md-6">
                    <Button
                        className="w-100"
                        variant={"outline-" + type}
                        onClick={() => props.history.goBack()}
                    >
                        <FontAwesomeIcon
                            className="mr-2"
                            icon={["fas", "arrow-circle-left"]}
                        />
                        Go Back
                    </Button>
                </div>
                <div className="col-sm-12 col-md-6 mb-2 text-right">
                    <Button disabled variant={type} className="w-100">
                        <FontAwesomeIcon
                            className="mr-2"
                            icon={["fas", "check-circle"]}
                        />
                        Confirm
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
