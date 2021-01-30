const Sequelize = require('sequelize');
const sequelize = require('../../server/util/database');
const Customer= require('../../server/models/Customer_Credential');
const customer_auth = require('../middleware/customerAuth');
const customer=Customer(sequelize,Sequelize);
var hash = require('object-hash');
const { Cookie } = require('cookies');
const cookieParser = require('cookie-parser');
var http = require('http');
var Cookies = require('cookies');
var jwt = require('jsonwebtoken');



exports.register = (req,res) =>
{

	const username = req.body.username;
	const phone = req.body.phone;
	console.log(username);
	console.log(phone);
	customer.findAll({ where: { customer_phone : phone } 
	}).then(result =>{
		if(result.length===0)
		{
			customer.create({
				//already : already,
				customer_name : username,
				customer_phone : phone,
			}).then(result => {
				res.status(200).json({
					message: "Success.User is registered."
				});
			}).catch(err => {
				res.status(504).json({
					message: "Failed,,,,,,,,,"
				});
			});
		}
		else
		{
			res.status(504).json({
				message: "User is Already Registered with the number."
			});
		}
	}).catch(err => {
        res.status(504).json({
            message: "Failed.mew mew"
        });
    });
	
};

exports.login= (req,res) =>
{
    const customer_phone=req.body.phone;
	var otp =Math.random()*(999999-99999)+99999;
	otp = parseInt(otp);
	var xd=otp;
	otp=hash(otp);
	console.log(customer_phone);
	const regex= /^(?:\+?88)?01[13-9]\d{8}$/;
	if(regex.test(customer_phone))
	{
		customer.findAll({ where: { customer_phone : customer_phone } 
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
				res.cookie('number',customer_phone,{maxAge:900000,httpOnly:true})
				res.status(200).json({
					message: "Success.OTP is sent to the number."
				});
				console.log(customer_phone);
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
exports.verify=(req,res) =>
{
	let auth=req.cookies['otp'];
	let customer_phone = req.cookies['number'];
	let gg=req.body.code;
	gg=parseInt(gg);
	console.log(gg);
	console.log(auth);
	//let number=req.cookies['phone'];
    if(hash(gg)===auth){
		let customer_id,customer_name;
		const token = jwt.sign({
			customer_phone :customer_phone,
		},'SECRETKEY',{
			expiresIn: '12h'
		  }
		);
		res.clearCookie('otp');
		res.clearCookie('number');
		res.cookie('token',token,{maxAge:43200,httpOnly:true});
		customer.findAll({ where: { customer_phone : customer_phone } 
		}).then(result =>{
		res.status(200).json({
			message: "Success.User is logged in.",
			customer_id : result[0].customer_id,
			customer_name : result[0].customer_name,
			token
			});
		});
    }
    else{
		res.status(504).json({
            message: "OTP is incorrect."
        });
		//console.log('otp given '+hash(req.body.code));
	}
};


// exports.works=(req,res) =>
// {
// 	res.status(200).json({
// 		message: "Success.User is logged in.",
// 	});
// }

exports.logout=(req,res) =>
{
	res.clearCookie('token');
 	res.status(200).json({  message : 'success' });
}



