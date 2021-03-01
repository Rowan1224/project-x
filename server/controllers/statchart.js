
const moment = require("moment");
const Sequelize = require("sequelize");
const sequelize = require("../../server/util/database");
const Orders = require("../../server/models/Orders");
const orders = Orders(sequelize, Sequelize);
const Order_Details = require("../../server/models/Order_details");
const orderDetails = Order_Details(sequelize, Sequelize);
const Employee = require("../../server/models/Employee");
const employee = Employee(sequelize, Sequelize);

exports.pieChart = (req, res, nxt) => {
    const service_id = req.body.service_id;
    const start_date = req.body.start_date;
    const end_date = req.body.end_date;
    sequelize
        .query(
            "SELECT *  FROM  Orders INNER JOIN Order_details ON Orders.order_id=Order_details.order_id INNER JOIN Universal_Product_List ON Order_details.product_id=Universal_Product_List.product_id WHERE Orders.order_time BETWEEN  ? AND  ? &&  service_id=? && Orders.delivered=true",
            {
                replacements: [[start_date], [end_date], [service_id]],
                type: sequelize.QueryTypes.SELECT,
            }
        )
        .then((result) => {
            let hotproducts = new Map();
            result.forEach((element) => {
                let ord =
                    hotproducts.get(element.product_name) === undefined
                        ? 1
                        : hotproducts.get(element.product_name) + 1;
                //console.log(ord);
                hotproducts.set(element.product_name, ord);
            });

            let product_name = [],
                product_ordered = [];

            for (let key of hotproducts.keys()) {
                product_name.push(key);
            }
            for (let value of hotproducts.values()) {
                product_ordered.push(value);
            }

            // let products = [];

            // for (let i = 0; i < product_name.length; i++) {
            //     const name = product_name[i];
            //     const ordered = product_ordered[i];

            //     let product =
            //     {
            //         "name" : name,
            //         "ordered" : ordered
            //     }
            //     products.push(product);

            // }

            let details = [];
            details.push(product_name);
            details.push(product_ordered);
            res.status(200).json({
                //orders : success,
                details: details,
                message: "Successful",
            });

            console.log(hotproducts);
        })
        .catch((err) => {
            res.status(504).json({ message: "Failed" });
        });
};

exports.lineChart = (req, res, nxt) => {
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
            let delivered_date = new Map();
            result.forEach((element) => {
                if (element.delivered === 1) {
                    var time = element.order_time;
                    time = moment(time).format('YYYY-MM-DD');
                    console.log(time);
                   // console.log(time.toString());
                    //time = time.toString();
                    //let time = element.order_time.getDate()+'-'+element.order_time.getMonth()+'-'+element.order_time.getFullYear();
                    let ord =
                        delivered_date.get(time) === undefined
                            ? 1
                            : delivered_date.get(time) + 1;
                    //console.log(ord);
                    delivered_date.set(time, ord);
                }
            });
            const mapSort1 = new Map(
                [...delivered_date.entries()].sort((a, b) => b[1] - a[1])
            );
            console.log(mapSort1);
            let date = [],
                orders_date = [],pairs=[],finalpairs= [];
            

            
            // //console.log(demo);
            for (let [key,value] of mapSort1) {
                pairs.push({key,value});
            }
            if(pairs.length>5)
                pairs.slice(0,5);
             const sortedArray  = pairs.sort((a,b) => moment(a.key).format('YYYYMMDD') - moment(b.key).format('YYYYMMDD'));
             //console.log(sortedArray);
             for (let [key,value] of sortedArray.entries()) {
                // console.log(value);
                date.push(moment(value.key).format('MMM DD, YY'));
                orders_date.push(value.value);
            }
        
            // console.log(employeeincome);
            // console.log(employeedelivered);
            //  let linechartdetails = [];
            // for (let i = 0; i < (date.length || 5) ; i++) {
            //     var data = {
            //         "date" : date[i],
            //         "orders": orders_date[i],
            //     };
            //     linechartdetails.push(data);
            // }
            let details = [];
            details.push(date);
            details.push(orders_date);
            res.status(200).json({
                //orders : success,
                details: details,
                message: "Successful",
            });
        })
        .catch((err) => {
            res.status(504).json({ message: "Failed" });
        });
};

exports.horizontalBar = (req, res, nxt) => {
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
            let emplpoyee_income = new Map();
            result.forEach((element) => {
                if (element.delivered === 1) {
                    let inc =
                        emplpoyee_income.get(element.employee_name) ===
                        undefined
                            ? 0 + parseInt(element.payment)
                            : emplpoyee_income.get(element.employee_name) +
                              parseInt(element.payment);
                    emplpoyee_income.set(element.employee_name, inc);
                }
            });
            const mapSort1 = new Map(
                [...emplpoyee_income.entries()].sort((a, b) => b[1] - a[1])
            );
            console.log(mapSort1);

            let employee_name = [],
                employee_income = [];

            for (let key of mapSort1.keys()) {
                employee_name.push(key);
            }
            for (let value of mapSort1.values()) {
                employee_income.push(value);
            }

            //  let horizontalBarDetails = [];
            // for (let i = 0; i < (employee_name.length || 5) ; i++) {
            //     var data = {
            //         "name" : employee_name[i],
            //         "income": employee_income[i],
            //     };
            //     horizontalBarDetails.push(data);
            // }
            let details = [];
            details.push(employee_name);
            details.push(employee_income);
            res.status(200).json({
                //orders : success,
                details: details,
                message: "Successful",
            });
        })
        .catch((err) => {
            res.status(504).json({ message: "Failed" });
        });
};
