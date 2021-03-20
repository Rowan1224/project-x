const ServiceArea = require("../../server/models/Area_Details");
const sequelize = require("../../server/util/database");
const Sequelize = require("sequelize");
const serviceArea = ServiceArea(sequelize, Sequelize);

exports.getServiceArea = (req, res, next) => {
    serviceArea
        .findAll()
        .then((areas) => {   
            res.status(200).json({
                areas : areas,
                message: "Success.",
            });
        })
        .catch((err) => {
            res.status(504).json({ message: "Failed" });
            console.log(err);
        });
};


exports.getDistrict = (req, res, next) => {
    serviceArea
        .findAll()
        .then((areas) => {
            let than = new Set();
            
            areas.forEach(element => {
                than.add(element.district);
            });
            let district = [];
            than.forEach(element => {
                district.push(element);
            });
            res.status(200).json({
                details : district,
                message: "Successfully fetched the service area.",
            });
        })
        .catch((err) => {
            res.status(504).json({ message: "Failed" });
            console.log(err);
        });
};

exports.getThana = (req, res, next) => {
    const district = req.body.district;

    serviceArea
        .findAll({
            where: {
                district: district,
            },
        })
        .then((areas) => {
            let than = new Set();
            
            areas.forEach(element => {
                than.add(element.thana);
            });
            let thana = [];
            than.forEach(element => {
                thana.push(element);
            });
            res.status(200).json({
                details : thana,
                message: "Successfully fetched the service area.",
            });
        })
        .catch((err) => {
            res.status(504).json({ message: "Failed" });
            console.log(err);
        });
};

exports.getArea = (req, res, next) => {
    const district = req.body.district;
    const thana = req.body.thana;

    serviceArea
        .findAll({
            where: {
                district: district,
                thana: thana,
            },
        })
        .then((areas) => {
            
            let area = [];
            areas.forEach(element => {
                area.push(element.area_name);
            });
            area.sort();
            res.status(200).json({
                details : area,
                message: "Successfully fetched the service area.",
            });
        })
        .catch((err) => {
            res.status(504).json({ message: "Failed" });
            console.log(err);
        });
};


exports.getAreaId = (req,res,nxt) =>
{
    const district = req.body.district;
    const thana = req.body.thana;
    const area = req.body.area;

    serviceArea.findAll({
        where : {
            distriCt : district,
            thana : thana,
            area_name : area
        }
    }).then(response=>
        {
            res.status(200).json({
                id : response[0].area_id,
                message: "Successfully fetched the service area.",
            });

        }).catch((err) => {
            res.status(504).json({ message: "Failed" });
            console.log(err);
        });
}
exports.getServiceName = (req, res, next) => {
    const areaId = req.params.areaId;

    sequelize
        .query(
            "SELECT service_id FROM `Service_Credential` WHERE service_id IN (SELECT service_id FROM Service_Area WHERE area_id =?)",
            { replacements: [areaId], type: sequelize.QueryTypes.SELECT }
        )
        .then((services) => {
            res.status(200).json({ services: services, message: "Success" });
        })
        .catch((err) => {
            res.status(504).json({ message: "Failed" });
            console.log(err);
        });
};
