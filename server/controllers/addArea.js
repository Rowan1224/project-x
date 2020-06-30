const ServiceArea = require('../../server/models/Service_Area');
const sequelize = require('../../server/util/database');
const Sequelize = require('sequelize');
const serviceArea = ServiceArea(sequelize, Sequelize);

exports.addArea = (req, res, next) => {
    const area_id = req.body.area_id;
    const service_id = req.body.service_id;

    serviceArea.create({
        service_id: service_id,
        area_id: area_id
    }).then((result) => {
        res.status(200).json({message: "Success"});
    }).catch((err) => {
        res.status(504).json({message: "Failed"});
    });
};