const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const Orders = require('../models/Orders');
const orders = Orders(sequelize, Sequelize);
const Order_Details = require('../models/Order_details');
const orderDetails = Order_Details(sequelize, Sequelize);

const Customer =  require('../models/Customer_Address');
const customer = Customer(sequelize,Sequelize);



exports.createOrderDetails = (req, res, next) => {
    const details = req.body.details;

    orderDetails.bulkCreate(details,{
        returning: true
    }).then(result => {
        res.status(200).json({
            message: "Success"
        });
    }).catch(err => {
        res.status(504).json({
            message: "Failed"
        });
    });
};

exports.getOrderDetails = (req, res, next) => {
    const orderId = req.body.orderId;

    orderDetails.findAll({where :{order_id : orderId}}).then(details => {
        res.status(200).json({
            details: details,
            message: "Success"
        });
    }).catch(err => {
        res.status(504).json({
            message: "Failed"
        });
    });
};




exports.createCustomerAddress = (req, res, next) => {
    const address = req.body.address;

    customer.create(address).then(result => {
        res.status(200).json({
            message: "Success"
        });
    }).catch(err => {
        res.status(504).json({
            message: "Failed"
        });
    });
};

exports.getCustomerAddress = (req, res, next) => {
    const customerId = req.body.customerId;

    customer.findAll({where :{customer_id : customerId}}).then(address => {
        res.status(200).json({
            address: address,
            message: "Success"
        });
    }).catch(err => {
        res.status(504).json({
            message: "Failed"
        });
    });
};