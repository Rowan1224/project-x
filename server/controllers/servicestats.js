const Sequelize = require("sequelize");
const sequelize = require("../../server/util/database");
const Orders = require("../../server/models/Orders");
const orders = Orders(sequelize, Sequelize);
const Order_Details = require("../../server/models/Order_details");
const orderDetails = Order_Details(sequelize, Sequelize);
const Employee = require("../../server/models/Employee");
const { addEmployee } = require("./employee");
const employee = Employee(sequelize, Sequelize);

exports.getServiceOrder = (req, res, next) => {
    //  const order_id = req.body.orderid;
    const service_id = req.body.userid;
    const search = req.body.search_data;
    sequelize
        .query(
            "SELECT *  FROM  Orders INNER JOIN Customer_Credential ON Orders.customer_id=Customer_Credential.customer_id INNER JOIN Customer_Address ON Orders.customer_address_id=Customer_Address.customer_add_id INNER JOIN Area_Details ON Customer_Address.area_id= Area_Details.area_id WHERE service_id=? && delivered=false && Orders.employee_id IS NULL && (customer_name LIKE ? OR order_id LIKE ?   OR customer_phone LIKE ? OR house_no LIKE ? OR road_no LIKE ? OR area_name LIKE ? OR district LIKE ? OR further_description LIKE ? OR payment LIKE ? )ORDER BY order_time DESC",
            {
                replacements: [
                    [service_id],
                    [`%${search}%`],
                    [`%${search}%`],
                    [`%${search}%`],
                    [`%${search}%`],
                    [`%${search}%`],
                    [`%${search}%`],
                    [`%${search}%`],
                    [`%${search}%`],
                    [`%${search}%`],
                    [`%${search}%`],
                ],
                type: sequelize.QueryTypes.SELECT,
            }
        )
        .then((result) => {
            var output = [];
            if (result.length === 0) {
                res.status(200).json({
                    // details: details,
                    message: "No Orders.",
                });
            } else {
                result.forEach((element) => {
                    var address =
                        element.house_no +
                        ", " +
                        element.road_no +
                        ", " +
                        element.area_name +
                        ", " +
                        element.district;
                    var productorder = {
                        order_id: element.order_id,
                        customer_name: element.customer_name,
                        customer_phone: element.customer_phone,
                        address: address,
                        further_description: element.further_description,
                        payment: element.payment,
                        time: element.order_time,
                    };
                    output.push(productorder);
                });

                res.status(200).json({
                    details: output,
                    message: "Successfully fetched non-assigned orders.",
                });
            }
        })
        .catch((err) => {
            res.status(504).json({
                message: "Failed to fetch non-assigned orders.",
            });
        });
};

exports.getAssignedServiceOrder = (req, res, next) => {
    //  const order_id = req.body.orderid;
    const service_id = req.body.userid;
    const search = req.body.search_data;
    sequelize
        .query(
            "SELECT *  FROM  Orders INNER JOIN Customer_Credential ON Orders.customer_id=Customer_Credential.customer_id INNER JOIN Customer_Address ON Orders.customer_address_id=Customer_Address.customer_add_id INNER JOIN Area_Details ON Customer_Address.area_id= Area_Details.area_id  INNER JOIN Employee ON Orders.employee_id=Employee.employee_id  WHERE Orders.service_id=? && delivered=false && Orders.employee_id IS NOT NULL && (customer_name LIKE ? OR order_id LIKE ?   OR customer_phone LIKE ? OR house_no LIKE ? OR road_no LIKE ? OR area_name LIKE ? OR district LIKE ? OR further_description LIKE ? OR employee_name LIKE ? OR phone_number LIKE ? OR payment LIKE ? ) ORDER BY order_time DESC",
            {
                replacements: [
                    [service_id],
                    [`%${search}%`],
                    [`%${search}%`],
                    [`%${search}%`],
                    [`%${search}%`],
                    [`%${search}%`],
                    [`%${search}%`],
                    [`%${search}%`],
                    [`%${search}%`],
                    [`%${search}%`],
                    [`%${search}%`],
                    [`%${search}%`],
                    [`%${search}%`],
                ],
                type: sequelize.QueryTypes.SELECT,
            }
        )
        .then((result) => {
            var output = [];
            if (result.length === 0) {
                res.status(200).json({
                    // details: details,
                    message: "No Orders.",
                });
            } else {
                result.forEach((element) => {
                    var address =
                        element.house_no +
                        ", " +
                        element.road_no +
                        ", " +
                        element.area_name +
                        ", " +
                        element.district;
                    var productorder = {
                        order_id: element.order_id,
                        customer_name: element.customer_name,
                        customer_phone: element.customer_phone,
                        address: address,
                        // "road_no" : element.road_no,
                        // "house_no" :element.house_no,
                        further_description: element.further_description,
                        payment: element.payment,
                        employee: element.phone_number,
                        time: element.order_time,
                    };
                    output.push(productorder);
                });

                res.status(200).json({
                    details: output,
                    message: "Successfully fetched assigned orders.",
                });
            }
        })
        .catch((err) => {
            res.status(504).json({
                message: "Failed to fetch assigned orders.",
            });
        });
};

exports.getServiceOrderDetails = (req, res, next) => {
    const order_id = req.body.order_id;
    const service_id = req.body.userid;

    sequelize
        .query(
            "SELECT Order_details.qty,Order_details.price,Universal_Product_List.product_name,Universal_Product_List.qty AS size,Universal_Product_List.unit FROM Order_details INNER JOIN Universal_Product_List ON Order_details.product_id= Universal_Product_List.product_id INNER JOIN Orders ON Orders.order_id = Order_details.order_id WHERE Order_details.order_id=? && service_id =?",
            {
                replacements: [[order_id], [service_id]],
                type: sequelize.QueryTypes.SELECT,
            }
        )
        .then((result) => {
            var output = [];
            if (result.length === 0) {
                res.status(504).json({
                    // details: details,
                    message: "Access denied or order details not found",
                });
            } else {
                result.forEach((element) => {
                    var producdetails = element.size + " " + element.unit;
                    var prod = "";
                    for (let i = 0; i < element.qty.length; i++) {
                        if (element.qty[i] === " ") break;
                        prod += element.qty[i];
                    }
                    // console.log(prod);
                    //  prod = parseInt(prod)
                    var product_quantity =
                        parseInt(prod) / parseInt(element.size);
                    //console.log(product_quantity);

                    // var address = element.house_no+','+element.road_no+','+element.area_name+','+element.district;
                    var productorder = {
                        product_name: element.product_name,
                        quantity: product_quantity,
                        product_price_per_unit: element.price,
                        product_size: producdetails,
                    };
                    output.push(productorder);
                });

                res.status(200).json({
                    details: output,
                    message: "Successfully fetched the order details.",
                });
            }
        })
        .catch((err) => {
            res.status(504).json({
                message: "Failed to fetch the order details.",
            });
        });
};

exports.assignEmployee = (req, res, next) => {
    const order_id = req.body.order_id;
    const employee_id = req.body.employee_id;
    addEmployee;

    orders
        .findByPk(order_id)
        .then((result) => {
            result.employee_id = employee_id;
            return result.save();
        })
        .then((reto) => {
            res.status(200).json({
                message: "Success.Employee Selected.",
            });
        })
        .catch((err) => {
            res.status(504).json({
                message: "Failed to assign employee.",
            });
        });
};

exports.completeServiceOrder = (req, res, nxt) => {
    const order_id = req.body.order_id;
    //const service_id = req.body.userid;

    orders
        .findByPk(order_id)
        .then((serv) => {
            serv.delivered = true;
            return serv.save();
        })
        .then((sucess) => {
            res.status(200).json({
                message: "Successfully completed the order.",
            });
        })
        .catch((err) => {
            res.status(504).json({ message: "Failed to complete the order." });
        });
};

exports.getServiceStats = (req, res, nxt) => {
    const start_date = req.body.start_date;
    const end_date = req.body.end_date;
    const service_id = req.body.service_id;

    sequelize
        .query(
            "SELECT * FROM Orders INNER JOIN Employee ON Orders.employee_id=Employee.employee_id WHERE order_time BETWEEN  ? AND  ? && Orders.service_id=?",
            {
                replacements: [[start_date], [end_date], [service_id]],
                type: sequelize.QueryTypes.SELECT,
            }
        )
        .then((result) => {
            //console.log(result.length);
            const total_orders = result.length;
            let total_income = 0,
                deliveredOrders = 0;
            let employee_delivered = new Map();
            let employee_name = new Map();
            let emplpoyee_income = new Map();
            result.forEach((element) => {
                if (element.delivered === 1) {
                    deliveredOrders++;
                    // console.log(element.or)
                    let ord =
                        employee_delivered.get(element.phone_number) ===
                        undefined
                            ? 1
                            : employee_delivered.get(element.phone_number) + 1;
                    employee_name.set(
                        element.phone_number,
                        element.employee_name
                    );
                    employee_delivered.set(element.phone_number, ord);
                    let inc =
                        emplpoyee_income.get(element.phone_number) === undefined
                            ? 0 + parseInt(element.payment)
                            : emplpoyee_income.get(element.phone_number) +
                              parseInt(element.payment);
                    emplpoyee_income.set(element.phone_number, inc);
                    total_income += parseInt(element.payment);
                }
            });
            let employeename = [],
                employeeincome = [],
                employeedelivered = [],
                employeephone = [];
            for (let key of employee_delivered.keys()) {
                employeephone.push(key);
            }
            for (let value of emplpoyee_income.values()) {
                employeeincome.push(value);
            }
            for (let value of employee_delivered.values()) {
                employeedelivered.push(value);
            }
            for (let value of employee_name.values()) {
                employeename.push(value);
            }
            //console.log(employeephone);
            // console.log(employeeincome);
            // console.log(employeedelivered);
            let employeedetails = [];
            for (let i = 0; i < employeename.length; i++) {
                var employeedata = {
                    name: employeename[i],
                    phone: employeephone[i],
                    income: employeeincome[i],
                    delivered: employeedelivered[i],
                };
                employeedetails.push(employeedata);
            }
            res.status(200).json({
                //orders : success,
                total_orders: total_orders,
                delivered: deliveredOrders,
                income: total_income,
                employee: employeedetails,
                message: "Successfully fetched service-stat",
            });
        })
        .catch((err) => {
            res.status(504).json({ message: "Failed to fetch service-stat." });
        });
};

exports.getServiceOrderHistory = (req, res, nxt) => {
    const service_id = req.body.userid;
    const search = req.body.search_data;

    sequelize
        .query(
            "SELECT *  FROM  Orders INNER JOIN Customer_Credential ON Orders.customer_id=Customer_Credential.customer_id INNER JOIN Customer_Address ON Orders.customer_address_id=Customer_Address.customer_add_id INNER JOIN Area_Details ON Customer_Address.area_id= Area_Details.area_id  INNER JOIN Employee ON Orders.employee_id=Employee.employee_id  WHERE Orders.service_id=? && delivered=1 &&(customer_name LIKE ? OR order_id LIKE ?   OR customer_phone LIKE ? OR house_no LIKE ? OR road_no LIKE ? OR area_name LIKE ? OR district LIKE ? OR further_description LIKE ? OR employee_name LIKE ? OR phone_number LIKE ? OR payment LIKE ? ) ORDER BY order_time DESC",
            {
                replacements: [
                    [service_id],
                    [`%${search}%`],
                    [`%${search}%`],
                    [`%${search}%`],
                    [`%${search}%`],
                    [`%${search}%`],
                    [`%${search}%`],
                    [`%${search}%`],
                    [`%${search}%`],
                    [`%${search}%`],
                    [`%${search}%`],
                    [`%${search}%`],
                    [`%${search}%`],
                ],
                type: sequelize.QueryTypes.SELECT,
            }
        )
        .then((result) => {
            var output = [];
            if (result.length === 0) {
                res.status(200).json({
                    // details: details,
                    message: "No Orders.",
                });
            } else {
                result.forEach((element) => {
                    var address =
                        element.house_no +
                        ", " +
                        element.road_no +
                        ", " +
                        element.area_name +
                        ", " +
                        element.district;
                    var productorder = {
                        order_id: element.order_id,
                        customer_name: element.customer_name,
                        customer_phone: element.customer_phone,
                        address: address,
                        further_description: element.further_description,
                        payment: element.payment,
                        time: element.order_time,
                        employee:
                            element.employee_name +
                            " (" +
                            element.phone_number +
                            ")",
                    };
                    output.push(productorder);
                });

                res.status(200).json({
                    details: output,
                    message:
                        "Successfully fetched service provider's delivered order history.",
                });
            }
        })
        .catch((err) => {
            res.status(504).json({
                message: "Failed to fetch service provider's order history.",
            });
        });
};

exports.cancelServiceProviderOrder = (req, res, nxt) => {
    const service_id = req.body.userid;
    const order_id = req.body.order_id;

    orders
        .findAll({
            where: {
                service_id: service_id,
                order_id: order_id,
            },
        })
        .then((result) => {
            if (result.length === 0) {
                res.status(200).json({
                    message:
                        "No Order found for the service provider with the order id.",
                });
            } else {
                orders
                    .findByPk(order_id)
                    .then((serv) => {
                        serv.delivered = 3;

                        return serv.save();
                    })
                    .then((sucess) => {
                        res.status(200).json({
                            message: "Successfully cancelled the Order.",
                        });
                    })
                    .catch((err) => {
                        res.status(504).json({
                            message: "Failed to cancel the Order.",
                        });
                    });
            }
        })
        .catch((err) => {
            res.status(504).json({ message: "Failed to get the Order." });
        });
};

exports.getServiceCancelledOrderHistory = (req, res, nxt) => {
    const service_id = req.body.userid;
    const search = req.body.search_data;

    sequelize
        .query(
            "SELECT *  FROM  Orders INNER JOIN Customer_Credential ON Orders.customer_id=Customer_Credential.customer_id INNER JOIN Customer_Address ON Orders.customer_address_id=Customer_Address.customer_add_id INNER JOIN Area_Details ON Customer_Address.area_id= Area_Details.area_id  WHERE Orders.service_id=? && delivered=3 &&(customer_name LIKE ? OR order_id LIKE ?  OR customer_phone LIKE ? OR house_no LIKE ? OR road_no LIKE ? OR area_name LIKE ? OR district LIKE ? OR further_description LIKE ? OR  payment LIKE ? ) ORDER BY order_time DESC",
            {
                replacements: [
                    [service_id],
                    [`%${search}%`],
                    [`%${search}%`],
                    [`%${search}%`],
                    [`%${search}%`],
                    [`%${search}%`],
                    [`%${search}%`],
                    [`%${search}%`],
                    [`%${search}%`],
                    [`%${search}%`],
                    [`%${search}%`],
                    [`%${search}%`],
                    [`%${search}%`],
                ],
                type: sequelize.QueryTypes.SELECT,
            }
        )
        .then((result) => {
            var output = [];
            if (result.length === 0) {
                res.status(200).json({
                    // details: details,
                    message: "No Orders.",
                });
            } else {
                result.forEach((element) => {
                    let reason;
                    if (element.employee_id === 0) {
                        reason = "Cancelled by Customer.";
                    } else reason = "Cancelled by Service Provider.";
                    var address =
                        element.house_no +
                        ", " +
                        element.road_no +
                        ", " +
                        element.area_name +
                        ", " +
                        element.district;
                    var productorder = {
                        order_id: element.order_id,
                        customer_name: element.customer_name,
                        customer_phone: element.customer_phone,
                        address: address,
                        further_description: element.further_description,
                        payment: element.payment,
                        time: element.order_time,
                        reason: reason,
                    };
                    output.push(productorder);
                });

                res.status(200).json({
                    details: output,
                    message:
                        "Successfully fetched service provider's order cancelled history.",
                });
            }
        })
        .catch((err) => {
            res.status(504).json({
                message: "Failed to fetch service provider's order history.",
            });
        });
};
