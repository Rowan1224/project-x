const ServiceArea = require('../../server/models/Service_Area');
const sequelize = require('../../server/util/database');
const Sequelize = require('sequelize');
const serviceArea = ServiceArea(sequelize, Sequelize);

exports.getServiceArea = (req,res,next) =>
{
    console.log("I am here");
serviceArea.findAll().then(areas =>
    {
        res.json({areas:areas});
    }).catch(err =>{
      console.log(err);
  });

  

};