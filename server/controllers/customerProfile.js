const Sequelize = require('sequelize');
const sequelize = require('../../server/util/database');
const Customer= require('../../server/models/Customer_Credential');
const customer=Customer(sequelize,Sequelize);

exports.getCustomerProfile = (req, res, next) => {
    const customer_id = req.body.customer_id;

    customer.findByPk(customer_id).then((serv) => {
        return serv;
    }).then((serv) => {
        res.status(200).json({
            customer_id: serv.customer_id,
            customer_name: serv.customer_name,
            customer_phone : serv.customer_phone
        });
    }).catch((err) => {
        res.status(504).json({message: "Failed"});
    });
};


exports.updateCustomerProfile = (req, res, next) => {
    const customer_id = req.body.customer_id;
    const new_customer_name = req.body.customer_name;
    const new_customer_phone = req.body.customer_phone;

    customer.findByPk(customer_id).then((serv) => {
        serv.customer_name = new_customer_name;
        serv.customer_phone = new_customer_phone;
        return serv.save();
    }).then((sucess) => {
        res.status(200).json({message: "Success"});
    }).catch((err) => {
        res.status(504).json({message: "Failed"});
    });
};