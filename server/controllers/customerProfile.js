const Sequelize = require('sequelize');
const sequelize = require('../../server/util/database');
const Customer= require('../../server/models/Customer_Credential');
const customer=Customer(sequelize,Sequelize);

exports.getCustomerProfile = (req, res, next) => {
    const customer_id = req.body.userid;

    customer.findByPk(customer_id).then((serv) => {
        return serv;
    }).then((serv) => {
        res.status(200).json({
            userid : serv.customer_id,
            username: serv.customer_name,
            userphone : serv.customer_phone
        });
    }).catch((err) => {
        res.status(504).json({message: "Failed"});
    });
};


exports.updateCustomerProfile = (req, res, next) => {
    const customer_id = req.body.userid;
    const new_customer_name = req.body.username;
    const new_customer_phone = req.body.userphone;

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