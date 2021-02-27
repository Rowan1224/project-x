import React, { useContext, useRef, useState } from "react";
import CustomModalAlert from "../../generic/CustomModalAlert";
import CustomAlert from "../../generic/CustomAlert";
import CustomModal from "../../generic/CustomModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ThemeContext } from "../../../contexts/ThemeContext";

const UpdateProductDetails = (props) => {
    const form = useRef(null);
    const [status, setStatus] = useState(undefined);
    const [statusVariant, setStatusVariant] = useState("danger");

    // Themes
    const { isLightTheme, theme } = useContext(ThemeContext);
    const type = isLightTheme ? theme.light.type : theme.dark.type;
    const border = isLightTheme ? theme.light.border : theme.dark.border;

    const handleUpdate = () => {
        const API_URL = "/updateproduct/";
        const loadData = async () => {
            const formData = new FormData(form.current);

            let object = {};
            formData.forEach(function (value, key) {
                object[key] = value;
            });

            object["product_id"] = props.id;
            object["service_id"] = localStorage.getItem("userID");

            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(object),
            });
            const data = await response.json();
            if (response.ok) {
                setStatus(data.message);
                setStatusVariant("success");
            } else {
                setStatus(data.message);
                setStatusVariant("danger");
            }
        };
        loadData();
    };

    return (
        <CustomModal
            actionVariant={type}
            handleAction={handleUpdate}
            modalTitle="Update Product Details"
            actionButtonBody={
                <>
                    <FontAwesomeIcon
                        className="fa-icon mr-2"
                        icon={["fas", "wrench"]}
                    />
                    Update
                </>
            }
            modalButtonClass={"btn btn-sm btn-" + type}
            modalBody={
                <form ref={form}>
                    {status &&
                        (statusVariant === "success" ? (
                            <CustomModalAlert
                                status={status}
                                setStatus={setStatus}
                                variant={statusVariant}
                                updateFlag={props.updateFlag}
                            />
                        ) : (
                            <CustomAlert
                                status={status}
                                variant={statusVariant}
                            />
                        ))}

                    <div className="form-group">
                        <label>Product Name</label>

                        <div
                            className={
                                "form-group input-group rounded" + border
                            }
                        >
                            <div className="input-group-prepend">
                                <span className="input-group-text rounded-0">
                                    <FontAwesomeIcon
                                        className="fa-icon mr-1"
                                        icon={["fab", "product-hunt"]}
                                    />
                                </span>
                            </div>
                            <input
                                disabled
                                type="text"
                                name="product_name"
                                placeholder="Product Name"
                                className="form-control rounded-0"
                                defaultValue={props.product.product_name}
                            />
                        </div>

                        <label className="mt-3">Price (Vat Excluded)</label>

                        <div
                            className={
                                "form-group input-group rounded" + border
                            }
                        >
                            <div className="input-group-prepend">
                                <span className="input-group-text py-0 rounded-0">
                                    <span
                                        className="font-weight-bold mx-1"
                                        style={{
                                            fontSize: "1.2rem",
                                        }}
                                    >
                                        ৳{" "}
                                    </span>
                                </span>
                            </div>
                            <input
                                autoFocus
                                name="price"
                                type="number"
                                placeholder="Product price"
                                defaultValue={props.product.price}
                                className="form-control rounded-0"
                            />
                        </div>
                    </div>
                </form>
            }
        >
            <FontAwesomeIcon
                className="fa-icon mr-1"
                icon={["fas", "wrench"]}
            />
            Update
        </CustomModal>
    );
};

export default UpdateProductDetails;
