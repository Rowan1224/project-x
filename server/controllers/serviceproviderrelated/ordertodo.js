const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const Orders = require('../models/Orders');
const orders = Orders(sequelize, Sequelize);
const Order_Details = require('../models/Order_details');
const orderDetails = Order_Details(sequelize, Sequelize);

exports.createOrder = (req, res, next) => {
    const customer_id = req.body.customer_id;
    const service_id = req.body.service_id;
    const order_time = req.body.order_time;
    const customer_address_id = req.body.customer_address_id;
    const payment = req.body.payment;

    orders.create({
        customer_id: customer_id,
        service_id: service_id,
        order_time: order_time,
        customer_address_id: customer_address_id,
        payment: payment
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

exports.assignEmployee = (req, res, next) => {
    const order_id = req.body.order_id;
    const employee_id = req.body.employee_id;

    orders.findByPk(order_id).then(result => {
        result.employee_id = employee_id;

        return result.save();
    }).then(ret => {
        res.status(200).json({
            message: "Success"
        });
    }).catch(err => {
        res.status(504).json({
            message: "Failed"
        });
    });
};