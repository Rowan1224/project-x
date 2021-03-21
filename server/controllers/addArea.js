const ServiceArea = require("../../server/models/Service_Area");
const sequelize = require("../../server/util/database");
const Sequelize = require("sequelize");
const Area_Details = require("../models/Area_Details");
const Service_Area = require("../../server/models/Service_Area");
const fs = require("fs");
const config = require("../json/product.json");
const Universal_Products = require("../models/Universal_Product_List");
const universal_products = Universal_Products(sequelize, Sequelize);

const serviceArea = ServiceArea(sequelize, Sequelize);
const area_details = Area_Details(sequelize, Sequelize);

fs.readFile("../json/area.json", "utf8", (err, jsonString) => {
    if (err) {
        console.log("File read failed:", err);
        return;
    }
    console.log("File data:", JSON.parse(jsonString)[0].area);
    let data = JSON.parse(jsonString);
    data.forEach((element) => {
        if (element.district === "DHAKA") {
            area_details.create({
                area_name: element.area,
                district: element.district,
                thana: element.thana,
            });
        }
    });
});

exports.availableArea = (req, res, nxt) => {
    const location = req.body.location;
    const service_id = req.body.service_id;
    const area = req.body.search_data;
    console.log(location.district);
    sequelize
        .query(
            "SELECT * FROM Area_Details WHERE  Area_Details.area_id NOT IN (SELECT area_id FROM Service_Area WHERE service_id=?) && (area_name LIKE ? && district=? && thana=?) ",
            {
                replacements: [
                    [service_id],
                    [`%${area}%`],
                    [location.district],
                    [location.thana],
                    // [`%${area}%`],
                    // [`%${area}%`],
                ],
                type: sequelize.QueryTypes.SELECT,
            }
        )
        .then((result) => {
            res.status(200).json({
                Areas: result,
                message: "Successfully fetched available area",
            });
        })
        .catch((err) => {
            res.status(504).json({
                message: "Failed to fetch available area",
            });
        });
};

exports.addArea = (req, res, next) => {
    const area_id = req.body.area_id;
    const service_id = req.body.service_id;

    serviceArea
        .create({
            service_id: service_id,
            area_id: area_id,
        })
        .then((result) => {
            res.status(200).json({ message: "Successfully added the area" });
        })
        .catch((err) => {
            res.status(504).json({ message: "Failed to add the area" });
        });
};

exports.removeArea = (req, res, next) => {
    const area_id = req.body.area_id;
    const service_id = req.body.service_id;

    serviceArea
        .destroy({
            where: {
                service_id: service_id,
                area_id: area_id,
            },
        })
        .then((result) => {
            res.status(200).json({ message: "Successfully deleted the area" });
        })
        .catch((err) => {
            res.status(504).json({ message: "Failed to delete the area" });
        });
};

exports.showArea = (req, res, nxt) => {
    const service_id = req.body.service_id;
    var area = req.body.search_data;

    sequelize
        .query(
            "SELECT * FROM Service_Area INNER JOIN Area_Details ON Area_Details.area_id=Service_Area.area_id  WHERE service_id=? &&(area_name LIKE ? OR thana LIKE ? OR district LIKE ?) ",
            {
                replacements: [
                    [service_id],
                    [`%${area}%`],
                    [`%${area}%`],
                    [`%${area}%`],
                ],
                type: sequelize.QueryTypes.SELECT,
            }
        )
        .then((result) => {
            let areas = [];
            result.forEach((element) => {
                var data = {
                    area_id: element.area_id,
                    area_name: element.area_name,
                    thana: element.thana,
                    district: element.district,
                    lati: element.lati,
                    longi: element.longi,
                };
                areas.push(data);
            });

            res.status(200).json({
                Areas: areas,
                message: "Successfully showed the area",
            });
        })
        .catch((err) => {
            res.status(504).json({
                message: "Failed to show the area",
            });
        });
};
