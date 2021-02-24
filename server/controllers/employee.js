const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const Employee = require('../models/Employee');
const employee = Employee(sequelize, Sequelize);

exports.getEmployee = (req, res, next) => {
    const service_id = req.body.service_id;
    
    employee.findAll({
        attributes: ['employee_id', 'service_id', 'employee_name', 'phone_number'],
        where: {
            service_id: service_id
        }
    }).then((emp) => {
        res.status(200).json({
            employee: emp,
            message: "Success"
        });
    }).catch({
        employee: "NaN",
        message: "Failed"
    });
};

exports.addEmployee = (req, res, next) => {
    const service_id = req.body.service_id;
    const employee_name = req.body.employee_name;
    const phone_number = req.body.phone_number;

    employee.create({
        service_id: service_id,
        employee_name: employee_name,
        phone_number: phone_number
    }).then((result) => {
        res.status(200).json({message: "Success"});
    }).catch((err) => {
        res.status(504).json({message: "Failed"});
    });
};

exports.updateEmployee = (req, res, next) => {
    const employee_id = req.body.employee_id;
    let updated_employee_name = req.body.employee_name;
    let  updated_phone_number = req.body.phone_number ;

    employee.findByPk(employee_id).then(
        emp => {
            emp.employee_name = updated_employee_name ? updated_employee_name : emp.employee_name ;
            emp.phone_number = updated_phone_number? updated_phone_number : emp.phone_number ;

            return emp.save();
        }
    ).then((result) => {
        res.status(200).json({message: "Success.Update Completed"});
    }).catch((err) => {
        res.status(504).json({message: "Failed to Update."});
    });
};

exports.deleteEmployee = (req, res, next) => {
    const employee_id = req.body.employee_id

    employee.findByPk(employee_id).then(
        (emp) => {
            return emp.destroy();
        }
    ).then((result) => {
        res.status(200).json({message: "Success"});
    }).catch((err) => {
        res.status(504).json({message: "Failed"});
    });
};