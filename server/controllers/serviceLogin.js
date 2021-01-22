const Sequelize = require('sequelize');
const sequelize = require('../../server/util/database');
const ServiceProvider= require('../../server/models/Service_Credential');
const service=ServiceProvider(sequelize,Sequelize);
var hash = require('object-hash');
const { Cookie } = require('cookies');
const cookieParser = require('cookie-parser');
var http = require('http');
var Cookies = require('cookies');
var jwt = require('jsonwebtoken');


exports.serviceregister = (req,res) =>
{

    const service_name = req.body.service_name;
    const description = req.body.description;
    const service_type = req.body.service_type;
    const delivery_charge = req.body.delivery_charge;
    const company_name = req.body.company_name;
    const phone_1 = req.body.phone_1;
    const nid = req.body.nid;
    const trade_license = req.body.trade_license;
    const address = req.body.address;

	service.findAll({ where: { phone_1 : phone_1 } 
	}).then(result =>{
		if(result.length===0)
		{
			service.create({
				//already : already,
                service_name : service_name,
                description : description,
                service_type : service_type,
                delivery_charge : delivery_charge,
                company_name : company_name,
                phone_1 : phone_1,
                nid : nid ,
                trade_license : trade_license,
                address : address
			}).then(result => {
				res.status(200).json({
					message: "Success.Service Provider is registered."
				});
			}).catch(err => {
				res.status(504).json({
					message: "Failed"
				});
			});
		}
		else
		{
			res.status(504).json({
				message: "Service Provider is Already Registered with the number."
			});
		}
	}).catch(err => {
        res.status(504).json({
            message: "Failed"
        });
    });
	
};

exports.servicelogin= (req,res) =>
{
    const service_phone=req.body.phone;
	var otp =Math.random()*(999999-99999)+99999;
	otp = parseInt(otp);
	var xd=otp;
	otp=hash(otp);
	const regex= /^(?:\+?88)?01[13-9]\d{8}$/;
	if(regex.test(service_phone))
	{
		service.findAll({ where: { phone_1: service_phone } 
		}).then(result =>{
			if(result.length===0)
			{
				res.status(504).json({
					message: "Create an Account first."
				});
			}
			else
			{
                res.cookie('otp',otp,{maxAge:900000,httpOnly:true})
	            res.cookie('number',service_phone,{maxAge:900000,httpOnly:true})
				res.status(200).json({
					message: "Success.OTP is sent to the number."
				});
				console.log(service_phone);
				console.log(xd);
			}
		}).catch(err => {
			res.status(504).json({
				message: "Failed"
			});
		});
	}
	else
	{
		res.status(504).json({
            message: "Enter a valid Number."
        });
	}
};
exports.serviceverify=(req,res) =>
{
	let auth=req.cookies['otp'];
	let service_phone = req.cookies['number'];
	let gg=req.body.code;
	gg=parseInt(gg);
	console.log(gg);
	console.log(auth);
	//let number=req.cookies['phone'];
    if(hash(gg)===auth){
		let service_id;
		service.findAll({ where: { phone_1 : service_phone } 
		}).then(result =>{
			service_id = result[0].service_id
		});
		const token = jwt.sign({
			service_phone : service_phone
		},'SECRETKEY',{
			expiresIn: '12h'
		  }
        );
        res.clearCookie('otp');
        res.clearCookie('number');
        res.cookie('token',token,{maxAge:43200,httpOnly:true});
		res.status(200).json({
			message: "Success.User is logged in.",
			token
		});
    }
    else{
		res.status(504).json({
            message: "OTP is incorrect."
        });
		//console.log('otp given '+hash(req.body.code));
	}
};

exports.servicelogout=(req,res) =>
{
	res.clearCookie('token');
 	res.status(200).json({ status: 'success' });
}


