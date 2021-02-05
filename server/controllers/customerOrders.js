const Sequelize = require('sequelize');
const sequelize = require('../../server/util/database');
const Orders = require('../../server/models/Orders');
const orders = Orders(sequelize, Sequelize);
const Order_Details = require('../../server/models/Order_details');
const orderDetails = Order_Details(sequelize, Sequelize);

const Customer =  require('../../server/models/Customer_Address');
const customer = Customer(sequelize,Sequelize);

const Universal_Products = require('../models/Universal_Product_List');
const universal_products = Universal_Products(sequelize, Sequelize);
const Service_Inventory = require('../models//Service_Inventory');
const service_inventory = Service_Inventory(sequelize, Sequelize);


exports.createCustomerOrderDetails = (req, res, next) => {
    const customer_id = req.body.userid;
    const service_id = req.body.service_id;
    const order_time = req.body.order_time;
    const customer_address_id = req.body.customer_address_id;
    const payment = req.body.payment;
    const details = req.body.details;
    const delivered = false;

    orders.create({
        customer_id: customer_id,
        service_id: service_id,
        order_time: order_time,
        customer_address_id: customer_address_id,
        payment: payment,
        delivered : delivered
    }).then(result => {
            details.forEach(element => {
                element.order_id = result.order_id;
            });
           // console.log(result.order_id);
            orderDetails.bulkCreate(details,{
                    returning: true
                }).then(result => {
                    res.status(200).json({
                        
                        message: "Success"
                    });
                }).catch(err => {
                    res.status(504).json({
                        message: "Failed to create order details"
                    });
                });           
    }).catch(err => {
        res.status(504).json({
            message: "Failed to create orders"
        });
    });
    

};

exports.getServiceOrder = (req, res, next) => {
  //  const order_id = req.body.orderid;
    const service_id = req.body.userid;

    orders.findAll({
        where : {
            service_id : service_id,
            delivered : false,
        }
    }).then(result =>
        {
            res.status(200).json({
                    //    order_id : result.order_id,
                    //    customer_id : result.customer_id,
                    //    customer_address_id : result.customer_address_id,
                    //    order_time : result.order_time,
                    //    payment : result.payment,
                    //    customer_address_id : result.customer_address_id,
                    result : result,  
                    message: "Success"
                    });
        }).catch(err => {
                res.status(504).json({
                    message: "Failed"
                 });

        });

};



exports.getServiceOrderDetails = (req, res, next) => {
             
        const order_id = req.body.orderid;
          
        orderDetails.findAll({where :{order_id : order_id}}).then(details => {
                res.status(200).json({
                    details: details,
                    message: "Success"
                });
            }).catch(err => {
                res.status(504).json({
                    message: "Failed"
                });
            })

};