const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const Orders = require('../models/Orders');
const orders = Orders(sequelize, Sequelize);
const Order_Details = require('../models/Order_details');
const orderDetails = Order_Details(sequelize, Sequelize);


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
