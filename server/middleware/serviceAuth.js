const Sequelize = require('sequelize');
const sequelize = require('../../server/util/database');
const Customer= require('../../server/models/Service_Credential');
const customer=Customer(sequelize,Sequelize);
const jwt = require('jsonwebtoken');
const { Cookie } = require('cookies');
const cookieParser = require('cookie-parser');
var http = require('http');
var Cookies = require('cookies');


module.exports = (req,res,next) =>
{
    let token;
    try
    { 
        if(req.cookies['token'])
        {
            token = req.cookies['token'];
        }
        else
            throw 'Invalid user ID';

        const decoded = jwt.verify(token,'SECRETKEY');

        customer.findAll({ where: { phone_1 : decoded.service_phone } 
        }).then(result =>{
            if(result.length===0)
            {
                throw 'Invalid user ID';
            }
            else
            {
                next();
            }
        });
    }
    catch{
        res.status(401).json({
            error: "Not authenticated to do it."});
    }
        
};