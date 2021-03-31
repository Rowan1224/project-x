import React, { useContext, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ThemeContext } from "../../contexts/ThemeContext";

import CustomModal from "../generic/CustomModal";
import CustomModalAlert from "../generic/CustomModalAlert";

const AddProduct = (props) => {
    const form = useRef(null);
    const { availableProduct } = props;

    const [status, setStatus] = useState(undefined);
    const [statusVariant, setStatusVariant] = useState("danger");

    // Themes
    const { isLightTheme, theme } = useContext(ThemeContext);
    // const border = isLightTheme ? theme.light.border : theme.dark.border;
    const syntax = isLightTheme ? theme.light.syntax : theme.dark.syntax;
    const type = isLightTheme ? theme.light.type : theme.dark.type;
    const btnTypeClass = isLightTheme
        ? theme.light.btnTypeClass
        : theme.dark.btnTypeClass;
    const custom_text = isLightTheme
        ? theme.light.custom_text
        : theme.dark.custom_text;

    const handleAddProduct = () => {
        const API_URL = "/addtoinventory/";

        const loadData = async () => {
            const formData = new FormData(form.current);
            let object = {};
            formData.forEach((value, key) => {
                object[key] = value;
            });
            object["service_id"] = localStorage.getItem("userID");

            try {
                const response = await fetch(API_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(object),
                });

                const data = await response.json();

                if (response.ok) {
                    setStatus(data.message);
                    setStatusVariant("success");
                } else setStatus(data.message);
            } catch (error) {
                setStatus(error);
            }
        };

        loadData();
    };

    return (
        <>
            {status && (
                <CustomModalAlert
                    status={status}
                    setStatus={setStatus}
                    variant={statusVariant}
                    updateFlag={props.updateFlag}
                />
            )}

            <form ref={form} onSubmit={(e) => e.preventDefault()}>
                <input
                    type="hidden"
                    name="product_id"
                    value={availableProduct.product_id}
                />

                <div
                    className="mt-2 mb-3 input-group mx-auto"
                    style={{ maxWidth: "10rem" }}
                >
                    <input
                        required
                        name="price"
                        type="number"
                        placeholder="Your Price..."
                        style={{ maxWidth: "7.18rem" }}
                        defaultValue={props.base_price}
                        className={"show-cart-count ml-1" + syntax}
                    />
                    <span className="font-weight-bold show-cart-count">
                        BDT
                    </span>
                </div>

                <CustomModal
                    actionVariant={type}
                    modalTitle="Add Product"
                    handleAction={handleAddProduct}
                    modalBody={
                        <>
                            Do you really want to add Product:{" "}
                            <span className={custom_text}>
                                {props.product_name}
                            </span>{" "}
                            into your inventory?
                        </>
                    }
                    modalButtonClass={"btn btn-sm" + btnTypeClass}
                    actionButtonBody={
                        <>
                            <FontAwesomeIcon
                                className="fa-icon mr-2"
                                icon={["fas", "plus"]}
                            />
                            Add
                        </>
                    }
                >
                    <FontAwesomeIcon
                        className="fa-icon mr-2"
                        icon={["fas", "warehouse"]}
                    />
                    Add to Inventory
                </CustomModal>
            </form>
        </>
    );
};

export default AddProduct;
