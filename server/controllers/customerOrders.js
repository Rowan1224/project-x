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
            "SELECT *  FROM  Orders INNER JOIN Customer_Credential ON Orders.customer_id=Customer_Credential.customer_id INNER JOIN Customer_Address ON Orders.customer_address_id=Customer_Address.customer_add_id INNER JOIN Area_Details ON Customer_Address.area_id= Area_Details.area_id  WHERE Orders.customer_id=? && delivered=1 && (customer_phone LIKE ? OR house_no LIKE ? OR road_no LIKE ? OR area_name LIKE ? OR district LIKE ? OR further_description LIKE ? OR payment LIKE ? ) ORDER BY order_time DESC ",
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
                    message: "Success.Delivered orders history is shown here.",
                });
            }
        })
        .catch((err) => {
            res.status(504).json({ message: "Failed to get the delivered orders history." });
        });
};

exports.getConfirmedOrder = (req, res, nxt) => {
    const order_id = req.body.order_id;

    sequelize
        .query(
            "SELECT *  FROM  Orders INNER JOIN Customer_Credential ON Orders.customer_id=Customer_Credential.customer_id INNER JOIN Customer_Address ON Orders.customer_address_id=Customer_Address.customer_add_id INNER JOIN Area_Details ON Customer_Address.area_id= Area_Details.area_id INNER JOIN Service_Credential ON Orders.service_id=Service_Credential.service_id WHERE order_id=?",
            {
                replacements: [order_id],
                type: sequelize.QueryTypes.SELECT,
            }
        )
        .then((element) => {
            let address =
                element[0].house_no +
                ", " +
                element[0].road_no +
                ", " +
                element[0].area_name +
                ", " +
                element[0].district;
            let ord = {
                total: element[0].payment,
                time: element[0].order_time,
                phone_number: element[0].customer_phone,
                provider_name: element[0].company_name,
                address: address,
            };
            console.log(ord);
            res.status(200).json({
                details: ord,
                message: "Successfully got the order.",
            });
        })
        .catch((err) => {
            res.status(504).json({ message: "Failed to get the order." });
        });
};

exports.cancelCustomerOrder = (req, res, nxt) => {
    const customer_id = req.body.userid;
    const order_id = req.body.order_id;

    orders.findAll({
        where :{
            customer_id : customer_id,
            order_id : order_id,
        }
    }).then(result =>{
        if(result.length===0)
        {
            res.status(200).json({ message: "No Order found for the customer whith the order id." });
        }
        else
        {
            if(result[0].employee_id===null)
            {
                orders.findByPk(order_id).then(serv =>{
                    serv.delivered=3;
                    serv.employee_id=0;

                    return serv.save();
                }).then((sucess) => {
                    res.status(200).json({message: "Successfully cancelled the Order."});
                }).catch((err) => {
                    res.status(504).json({message: "Failed to cancel the Order."});
                });
            }
            else
            {
                res.status(504).json({ message: "Sorry.You can't cancel the order anymore." });
            }
        }

    }).catch((err) => {
        res.status(504).json({message: "Failed to get the Order."});
    });
};

exports.getCustomerCancelledOrderHistory = (req, res, nxt) => {
    const customer_id = req.body.userid;
    const search = req.body.search_data;
    sequelize
        .query(
            "SELECT *  FROM  Orders INNER JOIN Customer_Credential ON Orders.customer_id=Customer_Credential.customer_id INNER JOIN Customer_Address ON Orders.customer_address_id=Customer_Address.customer_add_id INNER JOIN Area_Details ON Customer_Address.area_id= Area_Details.area_id  WHERE Orders.customer_id=? && delivered=3 && (customer_phone LIKE ? OR house_no LIKE ? OR road_no LIKE ? OR area_name LIKE ? OR district LIKE ? OR further_description LIKE ? OR payment LIKE ? ) ORDER BY order_time DESC ",
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
                    let reason;
                    if(element.employee_id===0)
                    {
                        reason ="Cancelled by Customer."
                    }
                    else
                        reason = "Cancelled by Service Provider."
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
                        reason : reason
                    };
                    output.push(productorder);
                });

                res.status(200).json({
                    details: output,
                    message: "Success.Cancelled orders history is shown here.",
                });
            }
        })
        .catch((err) => {
            res.status(504).json({ message: "Failed to get the cancelled orders history." });
        });
};

exports.getCustomerActiveOrderHistory = (req, res, nxt) => {
    const customer_id = req.body.userid;
    const search = req.body.search_data;
    sequelize
        .query(
            "SELECT *  FROM  Orders INNER JOIN Customer_Credential ON Orders.customer_id=Customer_Credential.customer_id INNER JOIN Customer_Address ON Orders.customer_address_id=Customer_Address.customer_add_id INNER JOIN Area_Details ON Customer_Address.area_id= Area_Details.area_id  WHERE Orders.customer_id=? && delivered=0 && (customer_phone LIKE ? OR house_no LIKE ? OR road_no LIKE ? OR area_name LIKE ? OR district LIKE ? OR further_description LIKE ? OR payment LIKE ? ) ORDER BY order_time DESC ",
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
                    message: "Success.Active orders history is shown here.",
                });
            }
        })
        .catch((err) => {
            res.status(504).json({ message: "Failed to get the active orders history." });
        });
};
