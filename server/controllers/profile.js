const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const Service = require('../models/Service_Credential');
const service = Service(sequelize, Sequelize);

exports.getProfileData = (req, res, next) => {
    const service_id = req.body.userid;

    service.findByPk(service_id).then((serv) => {
        return serv;
    }).then((serv) => {
        res.status(200).json({
            userid: serv.service_id,
            username: serv.service_name,
            company_name: serv.company_name,
            description: serv.description,
            service_type: serv.service_type,
            delivery_charge: serv.delivery_charge,
            userphone: serv.phone_1,
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

   // const new_service_name;
    const service_id = req.body.userid;
    var new_service_name = req.body.username;
    var new_company_name = req.body.company_name;
    var new_phone_1 = req.body.userphone;
    var new_phone_2 = req.body.phone_2;
    var new_nid = req.body.nid;
    var new_trade_license = req.body.trade_license;
    var new_address = req.body.address;
    var new_password = req.body.password;
    var new_nid_photo = req.body.nid_photo;
    var new_profile_picture = req.body.profile_picture;
    var new_description = req.body.description;
    var new_service_type = req.body.service_type;
    var new_delivery_charge =  req.body.delivery_charge;

    service.findByPk(service_id).then((serv) => {
        
        
        serv.service_name = new_service_name? new_service_name: serv.service_name ;
        serv.company_name = new_company_name? new_company_name:serv.company_name;
        serv.phone_1 = new_phone_1? new_phone_1 : serv.phone_1;
        serv.phone_2 = new_phone_2? new_phone_2 : serv.phone_2 ;
        serv.nid = new_nid? new_nid : serv.nid;
        serv.trade_license = new_trade_license? new_trade_license:serv.trade_license;
        serv.address = new_address? new_address:serv.address;
        serv.password = new_password?new_password : serv.password ;
        serv.nid_photo = new_nid_photo ? new_nid_photo : serv.nid_photo ;
        serv.profile_picture = new_profile_picture?new_profile_picture: serv.profile_picture;
        serv.description = new_description? new_description:serv.description;
        serv.delivery_charge = new_delivery_charge? new_delivery_charge: serv.delivery_charge;
        serv.service_type = new_service_type?new_service_type: serv.service_type;


        return serv.save();
    }).then((sucess) => {
        res.status(200).json({message: "Success"});
    }).catch((err) => {
        res.status(504).json({message: "Failed"});
    });
};