const Sequelize = require("sequelize");
const sequelize = require("../../server/util/database");
const Orders = require("../../server/models/Orders");
const orders = Orders(sequelize, Sequelize);
const Order_Details = require("../../server/models/Order_details");
const orderDetails = Order_Details(sequelize, Sequelize);

const CustomerAddress = require("../../server/models/Customer_Address");
const customeraddress = CustomerAddress(sequelize, Sequelize);
const Customer = require("../../server/models/Customer_Credential");
const customer = Customer(sequelize, Sequelize);

const Universal_Products = require("../models/Universal_Product_List");
const universal_products = Universal_Products(sequelize, Sequelize);
const Service_Inventory = require("../models//Service_Inventory");
const service_inventory = Service_Inventory(sequelize, Sequelize);

exports.createCustomerOrderDetails = (req, res, next) => {
    const customer_id = req.body.userid;
    const service_id = req.body.service_id;
    const order_time = req.body.order_time;
    const customer_address_id = req.body.customer_address_id;
    const payment = req.body.payment;
    const details = req.body.details;
    const delivered = false;

    orders
        .create({
            customer_id: customer_id,
            service_id: service_id,
            order_time: order_time,
            customer_address_id: customer_address_id,
            payment: payment,
            delivered: delivered,
        })
        .then((result) => {
            details.forEach((element) => {
                element.order_id = result.order_id;
            });
            // console.log(result.order_id);
            orderDetails
                .bulkCreate(details, {
                    returning: true,
                })
                .then((reso) => {
                    res.status(200).json({
                        order_id: result.order_id,
                        message: "Success.Order is created.",
                    });
                })
                .catch((err) => {
                    res.status(504).json({
                        message: "Failed to create order details",
                    });
                });
        })
        .catch((err) => {
            res.status(504).json({
                message: "Failed to create orders.",
            });
        });
};

exports.getCustomerOrderHistory = (req, res, nxt) => {
    const customer_id = req.body.userid;
    const search = req.body.search_data;
    sequelize
        .query(
            "SELECT *  FROM  Orders INNER JOIN Customer_Credential ON Orders.customer_id=Customer_Credential.customer_id INNER JOIN Customer_Address ON Orders.customer_address_id=Customer_Address.customer_add_id INNER JOIN Area_Details ON Customer_Address.area_id= Area_Details.area_id  WHERE Orders.customer_id=? && (customer_phone LIKE ? OR house_no LIKE ? OR road_no LIKE ? OR area_name LIKE ? OR district LIKE ? OR further_description LIKE ? OR payment LIKE ? ) ORDER BY order_time DESC ",
            {
                replacements: [
                    [customer_id],
                    [`%${search}%`],
                    [`%${search}%`],
                    [`%${search}%`],
                    [`%${search}%`],
                    [`%${search}%`],
                    [`%${search}%`],
                    [`%${search}%`],
                ],
                type: sequelize.QueryTypes.SELECT,
            }
        )
        .then((result) => {
            var output = [];
            if (result.length === 0) {
                res.status(200).json({
                    // details: details,
                    message: "No Orders.",
                });
            } else {
                result.forEach((element) => {
                    var address =
                        element.house_no +
                        "," +
                        element.road_no +
                        "," +
                        element.area_name +
                        "," +
                        element.district;
                    var productorder = {
                        order_id: element.order_id,
                        customer_phone: element.customer_phone,
                        address: address,
                        further_description: element.further_description,
                        payment: element.payment,
                        time: element.order_time,
                    };
                    output.push(productorder);
                });

                res.status(200).json({
                    details: output,
                    message: "Success.History is shown here.",
                });
            }
        })
        .catch((err) => {
            res.status(504).json({ message: "Failed to get the history." });
        });
};

// exports.getConfirmedOrder = (req, res, nxt) => {
//     const order_id =req.body.
// };
