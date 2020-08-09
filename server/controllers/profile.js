const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const Service = require('../models/Service_Credential');
const service = Service(sequelize, Sequelize);

exports.getProfileData = (req, res, next) => {
    const service_id = req.body.service_id;

    service.findByPk(service_id).then((serv) => {
        return serv;
    }).then((serv) => {
        res.status(200).json({
            service_id: serv.service_id,
            service_name: serv.service_name,
            company_name: serv.company_name,
            description: serv.description,
            service_type: serv.service_type,
            delivery_charge: serv.delivery_charge,
            phone_1: serv.phone_1,
            phone_2: serv.phone_2,
            nid: serv.nid,
            trade_license: serv.trade_license,
            address: serv.address,
            nid_photo: serv.nid_photo,
            profile_picture: serv.profile_picture
        });
    }).catch((err) => {
        res.status(504).json({message: "Failed"});
    });
};

exports.updateProfile = (req, res, next) => {
    const service_id = req.body.service_id;
    const new_service_name = req.body.service_name;
    const new_company_name = req.body.company_name;
    const new_phone_1 = req.body.phone_1;
    const new_phone_2 = req.body.phone_2;
    const new_nid = req.body.nid;
    const new_trade_license = req.body.trade_license;
    const new_address = req.body.address;
    const new_password = req.body.password;
    const new_nid_photo = req.body.nid_photo;
    const new_profile_picture = req.body.profile_picture;

    const new_description = req.body.description;
    const new_service_type = req.body.service_type;
    const new_delivery_charge =  req.body.delivery_charge;

    service.findByPk(service_id).then((serv) => {
        serv.service_name = new_service_name;
        serv.company_name = new_company_name;
        serv.phone_1 = new_phone_1;
        serv.phone_2 = new_phone_2;
        serv.nid = new_nid;
        serv.trade_license = new_trade_license;
        serv.address = new_address;
        serv.password = new_password;
        serv.nid_photo = new_nid_photo;
        serv.profile_picture = new_profile_picture;
        serv.description = new_description;
        serv.delivery_charge = new_delivery_charge;
        serv.service_type = new_service_type;


        return serv.save();
    }).then((sucess) => {
        res.status(200).json({message: "Success"});
    }).catch((err) => {
        res.status(504).json({message: "Failed"});
    });
};