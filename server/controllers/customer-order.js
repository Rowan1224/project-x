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
    var customer_id = req.body.userid;
    var road_no = req.body.road_no;
    var house_no = req.body.house_no;
    var area_id = req.body.area_id;
    var further_description = req.body.further_description;

    customer.findAll({
        where : {customer_id : customer_id,
                road_no : road_no? road_no: null ,
                house_no : house_no? house_no: null,
                area_id : area_id? area_id : null,
                further_description : further_description? further_description:null}
        }).then(result =>{
            if(result.length>0)
            res.status(200).json({ 
                customer_add_id : result[0].customer_add_id
            });
            else
            {
                customer.create(
                    {   
                        customer_id : customer_id,
                        road_no : road_no,
                        house_no : house_no,
                        area_id : area_id,
                        further_description : further_description
                    }).then((result) => {
                        res.status(200).json({customer_add_id : result.customer_add_id}
                        );
                    }).catch((err) => {
                        res.status(504).json({message: "Failedddd"});
                    });
            }
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