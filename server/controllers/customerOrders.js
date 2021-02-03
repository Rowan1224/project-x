const Sequelize = require('sequelize');
const sequelize = require('../../server/util/database');
const Orders = require('../../server/models/Orders');
const orders = Orders(sequelize, Sequelize);
const Order_Details = require('../../server/models/Order_details');
const orderDetails = Order_Details(sequelize, Sequelize);

const Customer =  require('../../server/models/Customer_Address');
const customer = Customer(sequelize,Sequelize);



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

exports.getServiceOrderDetails = (req, res, next) => {
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




// exports.createCustomerAddress = (req, res, next) => {
//     const address = req.body.address;

//     customer.create(address).then(result => {
//         res.status(200).json({
//             message: "Success"
//         });
//     }).catch(err => {
//         res.status(504).json({
//             message: "Failed"
//         });
//     });
// };

// exports.getCustomerAddress = (req, res, next) => {
//     const customerId = req.body.customerId;

//     customer.findAll({where :{customer_id : customerId}}).then(address => {
//         res.status(200).json({
//             address: address,
//             message: "Success"
//         });
//     }).catch(err => {
//         res.status(504).json({
//             message: "Failed"
//         });
//     });
// };