import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";

import CustomAlert from "../generic/CustomAlert";
import { ThemeContext } from "../../contexts/ThemeContext";

const OrderSuccess = () => {
    const params = useParams();
    const [orderDetails, setOrderDetails] = useState({});

    // Themes
    const { isLightTheme, theme } = useContext(ThemeContext);
    const type = isLightTheme ? theme.light.type : theme.dark.type;
    const syntax = isLightTheme ? theme.light.syntax : theme.dark.syntax;

    // componentDidMount
    useEffect(() => {
        const API_URL = "/order/success/";

        const loadData = async () => {
            const orderID = {
                order_id: params.order_id,
            };

            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(orderID),
            });

            const data = await response.json();
            setOrderDetails(data.details);
        };
        loadData();
    }, [params.order_id]);

    return (
        <div className={"text-center" + syntax}>
            <div className="mx-auto" style={{ maxWidth: "35rem" }}>
                <div className="mb-4">
                    <h4 className="mb-3">Thanks for your order</h4>
                    We're processing your order now, here are the details
                </div>

                <CustomAlert
                    variant="success"
                    status={
                        <>
                            <div className="mb-3">
                                <FontAwesomeIcon
                                    style={{ fontSize: "6rem" }}
                                    icon={["fas", "check-circle"]}
                                />
                            </div>
                            We have recieved your order successfully 😄
                            <div className="text-left mt-3">
                                <div className="d-flex justify-content-between">
                                    <b>
                                        <em>Net Total:</em>
                                    </b>
                                    <div>
                                        <span className="font-weight-bold">
                                            ৳{" "}
                                        </span>
                                        {orderDetails.total}
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between">
                                    <b>
                                        <em>Ordered Time:</em>
                                    </b>
                                    <div>
                                        {moment(orderDetails.time).format(
                                            "MMM DD, YY hh:mm a"
                                        )}
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between">
                                    <b>
                                        <em>Ordered Number:</em>
                                    </b>
                                    <div>{orderDetails.phone_number}</div>
                                </div>

                                <div className="d-flex justify-content-between">
                                    <b>
                                        <em>Service Provider:</em>
                                    </b>
                                    <div>{orderDetails.provider_name}</div>
                                </div>

                                <div className="d-flex justify-content-between">
                                    <b>
                                        <em>Delivery Address:</em>
                                    </b>
                                    <div>{orderDetails.address}</div>
                                </div>
                            </div>
                        </>
                    }
                />

                <Button variant={type} className="mt-3 w-100" as={Link} to="/">
                    <FontAwesomeIcon className="mr-2" icon={["fas", "home"]} />
                    Go to Homepage
                </Button>
            </div>
        </div>
    );
};

export default OrderSuccess;
