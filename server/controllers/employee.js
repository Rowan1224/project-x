const Sequelize = require("sequelize");
const sequelize = require("../util/database");
const Employee = require("../models/Employee");
const employee = Employee(sequelize, Sequelize);

exports.getEmployee = (req, res, next) => {
    const service_id = req.body.service_id;
    const employee = req.body.search_data;

    sequelize
        .query(
            "SELECT * FROM Employee WHERE service_id=? && (employee_name LIKE ? OR phone_number LIKE ?)",
            {
                replacements: [
                    [service_id],
                    [`%${employee}%`],
                    [`%${employee}%`],
                ],
                type: sequelize.QueryTypes.SELECT,
            }
        )
        .then((emp) => {
            res.status(200).json({
                employee: emp,
                message: "Success fetched all Employees.",
            });
        })
        .catch({
            employee: "NaN",
            message: "Failed to fetch the Employees",
        });
};

exports.addEmployee = (req, res, next) => {
    const service_id = req.body.service_id;
    const employee_name = req.body.employee_name;
    const phone_number = req.body.phone_number;
    const regex = /^01[13-9]\d{8}$/;
    if (regex.test(phone_number)) {
        employee
            .findAll({
                where: {
                    phone_number: phone_number,
                },
            })
            .then((ret) => {
                if (ret.length > 0) {
                    res.status(504).json({
                        message: "Already an employee with that number",
                    });
                } else {
                    employee
                        .create({
                            service_id: service_id,
                            employee_name: employee_name,
                            phone_number: phone_number,
                        })
                        .then((result) => {
                            res.status(200).json({
                                message: "Successfully added the Employee.",
                            });
                        })
                        .catch((err) => {
                            res.status(504).json({
                                message: "Failed to add the Employee.",
                            });
                        });
                }
            });
    } else {
        res.status(504).json({
            message: "Enter a valid Number.",
        });
    }
};

exports.updateEmployee = (req, res, next) => {
    const employee_id = req.body.employee_id;
    let updated_employee_name = req.body.employee_name;
    let updated_phone_number = req.body.phone_number;
    const regex = /^01[13-9]\d{8}$/;
    if (regex.test(updated_phone_number)) {
        employee
            .findAll({
                where: {
                    phone_number: updated_phone_number,
                },
            })
            .then((ret) => {
                if (ret.length > 0 && ret[0].employee_id != employee_id) {
                    res.status(504).json({
                        message: "Already an employee with that number",
                    });
                } else {
                    employee
                        .findByPk(employee_id)
                        .then((emp) => {
                            emp.employee_name = updated_employee_name
                                ? updated_employee_name
                                : emp.employee_name;
                            emp.phone_number = updated_phone_number
                                ? updated_phone_number
                                : emp.phone_number;

                            return emp.save();
                        })
                        .then((result) => {
                            res.status(200).json({
                                message:
                                    "Success.Employee Profile Update Completed",
                            });
                        })
                        .catch((err) => {
                            res.status(504).json({
                                message: "Failed to Update Employee profile.",
                            });
                        });
                }
            });
    } else {
        res.status(504).json({
            message: "Enter a valid Number.",
        });
    }
};

exports.deleteEmployee = (req, res, next) => {
    const employee_id = req.body.employee_id;

    employee
        .findByPk(employee_id)
        .then((emp) => {
            return emp.destroy();
        })
        .then((result) => {
            res.status(200).json({
                message: "Successfully deleted the employee.",
            });
        })
        .catch((err) => {
            res.status(504).json({ message: "Failed to delete the employee." });
        });
};
