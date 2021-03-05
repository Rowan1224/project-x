const ServiceArea = require('../../server/models/Area_Details');
const sequelize = require('../../server/util/database');
const Sequelize = require('sequelize');
const serviceArea = ServiceArea(sequelize, Sequelize);

exports.getServiceArea = (req,res,next) =>
{
    
serviceArea.findAll().then(areas =>
    {
        res.status(200).json({areas:areas, message:"Successfully fetched the service area."});
    }).catch(err =>{
        res.status(504).json({message: "Failed"});
      console.log(err);
  });

  

};


exports.getServiceName = (req,res,next) =>
{
    const areaId= req.params.areaId;
    
    sequelize.query("SELECT service_id FROM `Service_Credential` WHERE service_id IN (SELECT service_id FROM Service_Area WHERE area_id =?)"
    ,{ replacements: [areaId], type: sequelize.QueryTypes.SELECT}).then(services =>
    {
        res.status(200).json({services:services, message:"Success"});
    }).catch(err =>{
        res.status(504).json({message: "Failed"});
      console.log(err);
  });

  

};
