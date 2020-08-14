import React from "react";
import Counter from "../generic/counter";
import { Table, Button } from "react-bootstrap";
import DeleteTwoToneIcon from "@material-ui/icons/DeleteTwoTone";
import Icon from "@material-ui/core/Icon";
import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { CartContext } from "../../contexts/CartContext";
import { ThemeContext } from "../../contexts/ThemeContext";

const Cart = (props) => {
    const { items, discount } = useContext(CartContext);
    let skey = 0;
    let totalPrice = 0;

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
            <section
                className={"jumbotron text-center p-3" + ui + syntax + border}
            >
                <div className="container">
                    <h5 className="jumbotron-heading">Your Cart</h5>
                </div>
            </section>
            <div className={"shadow rounded mb-3" + border}>
                <Table responsive="sm" striped hover variant={variant}>
                    <thead>
                        <tr>
                            {/* <th scope="col"> </th> */}
                            <th scope="col">Product</th>
                            <th scope="col" className="text-center">
                                Quantity
                            </th>
                            <th scope="col" className="text-right">
                                Price
                            </th>
                            <th scope="col" className="text-right">Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => {
                            skey++;
                            totalPrice += item.price;
                            return (
                                <tr key={uuidv4()}>
                                    {/* <td style={{ verticalAlign: "middle" }}>
                                        <img
                                            src={`https://picsum.photos/id/${Math.floor(
                                                Math.random() * 1000
                                            )}/800`}
                                            alt="img"
                                            style={{
                                                maxWidth: "50px",
                                                maxHeight: "50px",
                                            }}
                                        />
                                    </td> */}

                                    <td style={{ verticalAlign: "middle" }}>
                                        {item.productName}
                                    </td>
                                    <td
                                        style={{ verticalAlign: "middle" }}
                                        className="text-center"
                                    >
                                        <Counter skey={skey} id={item.id} />
                                    </td>
                                    <td
                                        style={{ verticalAlign: "middle" }}
                                        className="text-right"
                                    >
                                        Tk {item.price}
                                    </td>
                                    <td
                                        style={{ verticalAlign: "middle" }}
                                        className="text-right"
                                    >
                                        <button className="btn btn-xs btn-danger">
                                            <DeleteTwoToneIcon />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>

            <div
                className={
                    "row text-center rounded mx-auto p-1 shadow" +
                    ui +
                    border +
                    custom_text
                }
            >
                <div className="col-sm-12 col-md-4 py-3 mx-auto">
                    <div className="mb-2">Sub Total</div>
                    <div className="h5 font-weight-light">Tk {totalPrice}</div>
                </div>

                <div className="col-sm-12 col-md-4 py-3 mx-auto">
                    <div className="mb-2">Discount</div>
                    <div className="h5 font-weight-light">{discount}%</div>
                </div>

                <div className="col-sm-12 col-md-4 py-3 mx-auto">
                    <div className="mb-2">Grand Total</div>
                    <div className="h5 font-weight-light">
                        Tk{" "}
                        {Math.ceil(totalPrice - totalPrice * (discount / 100))}
                    </div>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-sm-12 mb-2 col-md-6">
                    <Button variant={"outline-" + type} className="w-100">
                        <Icon
                            style={{
                                verticalAlign: "middle",
                                fontSize: "18px",
                            }}
                            className="mr-2 mb-1"
                        >
                            add_shopping_cart
                        </Icon>
                        Continue Shopping
                    </Button>
                </div>
                <div className="col-sm-12 col-md-6 mb-2 text-right">
                    <Button variant={type} className="w-100">
                        <Icon
                            style={{
                                verticalAlign: "middle",
                                fontSize: "18px",
                            }}
                            className="mr-2 mb-1"
                        >
                            check
                        </Icon>
                        Checkout
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
