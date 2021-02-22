const Sequelize = require('sequelize');
const sequelize = require('../../server/util/database');
const Orders = require('../../server/models/Orders');
const orders = Orders(sequelize, Sequelize);
const Order_Details = require('../../server/models/Order_details');
const orderDetails = Order_Details(sequelize, Sequelize);
const Employee = require('../../server/models/Employee');
const employee = Employee(sequelize, Sequelize);


exports.getServiceOrder = (req, res, next) => {
    //  const order_id = req.body.orderid;
      const service_id = req.body.userid;
      sequelize.query("SELECT *  FROM  Orders INNER JOIN Customer_Credential ON Orders.customer_id=Customer_Credential.customer_id INNER JOIN Customer_Address ON Orders.customer_address_id=Customer_Address.customer_add_id INNER JOIN Area_Details ON Customer_Address.area_id= Area_Details.area_id WHERE service_id=? && delivered=false ORDER BY order_time DESC",{replacements: [service_id],type: sequelize.QueryTypes.SELECT})
      .then(result =>
          {
              var output = [];
              if(result.length===0)
                  {  
                      res.status(200).json({
                         // details: details,
                          message: "No Orders."
                      });
                  }
              else{
                 
                  result.forEach(element => {
  
                      var address = element.house_no+','+element.road_no+','+element.area_name+','+element.district;
                      var productorder =
                      {
                          "order_id" :element.order_id,
                          "customer_name" : element.customer_name,
                          "customer_phone" : element.customer_phone,
                          "address" : address,
                          // "road_no" : element.road_no,
                          // "house_no" :element.house_no,
                          "further_description" : element.further_description,
                          "payment" : element.payment,
                          "time" : element.order_time
                      };
                      output.push(productorder);
                  });
  
                  res.status(200).json({
                       details: output,
                       message: "Success."
                   });
              }
          });
     
  
};

exports.getAssignedServiceOrder = (req, res, next) => {
    //  const order_id = req.body.orderid;
      const service_id = req.body.userid;
      sequelize.query("SELECT *  FROM  Orders INNER JOIN Customer_Credential ON Orders.customer_id=Customer_Credential.customer_id INNER JOIN Customer_Address ON Orders.customer_address_id=Customer_Address.customer_add_id INNER JOIN Area_Details ON Customer_Address.area_id= Area_Details.area_id  INNER JOIN Employee ON Orders.employee_id=Employee.employee_id  WHERE Orders.service_id=? &&  Orders.employee_id IS NOT NULL",{replacements: [service_id],type: sequelize.QueryTypes.SELECT})
      .then(result =>
          {
              var output = [];
              if(result.length===0)
                  {  
                      res.status(200).json({
                         // details: details,
                          message: "No Orders."
                      });
                  }
              else{
                 
                  result.forEach(element => {
  
                      var address = element.house_no+','+element.road_no+','+element.area_name+','+element.district;
                      var productorder =
                      {
                          "order_id" :element.order_id,
                          "customer_name" : element.customer_name,
                          "customer_phone" : element.customer_phone,
                          "address" : address,
                          // "road_no" : element.road_no,
                          // "house_no" :element.house_no,
                          "further_description" : element.further_description,
                          "payment" : element.payment,
                          "employee" : element.employee_name,
                          "time" : element.order_time
                      };
                      output.push(productorder);
                  });
  
                  res.status(200).json({
                       details: output,
                       message: "Success."
                   });
              }
          });
     
  
};

  exports.getServiceOrderDetails = (req, res, next) => {
               
          const order_id = req.body.order_id;
            
          sequelize.query("SELECT Order_details.qty,Order_details.price,Universal_Product_List.product_name,Universal_Product_List.qty AS size,Universal_Product_List.unit FROM Order_details INNER JOIN Universal_Product_List ON Order_details.product_id= Universal_Product_List.product_id WHERE order_id=?",{replacements: [order_id],type: sequelize.QueryTypes.SELECT})
          .then(result =>
              {
                  var output = [];
                  if(result.length===0)
                      {  
                          res.status(200).json({
                             // details: details,
                              message: "No Orders."
                          });
                      }
                  else{
                     
                      result.forEach(element => {
                          var producdetails = element.size+' '+element.unit;
                          var prod="";
                          for (let i = 0; i < element.qty.length; i++) {
                              if(element.qty[i]===' ')
                                  break;
                              prod +=element.qty[i];
                          }
                         // console.log(prod);
                        //  prod = parseInt(prod)
                          var product_quantity = parseInt(prod)/parseInt(element.size);
                          //console.log(product_quantity);
  
                         // var address = element.house_no+','+element.road_no+','+element.area_name+','+element.district;
                          var productorder =
                          {
                              "product_name" : element.product_name,
                              "quantity" : product_quantity,
                              "product_price_per_unit" : element.price,
                              "product_size" :producdetails
                          };
                          output.push(productorder);
                      });
      
                      res.status(200).json({
                           details: output,
                           message: "Success."
                       });
                  }
              });
  
  };

exports.assignEmployee = (req, res, next) => {
    const order_id = req.body.order_id;
    const service_id = req.body.service_id;
    const employee_name = req.body.employee_name;

    employee.findAll({
        where : {
             employee_name : employee_name,
             service_id : service_id
            } 
    }).then(ret =>
        {
            if(ret.length>0)
            {
                let employee_id = ret[0].employee_id;
                orders.findByPk(order_id).then(result => {
                    result.employee_id = employee_id;
                    return result.save();             
                }).then(reto => {
                    res.status(200).json({
                        message: "Success.Employee Selected."
                    });
                }).catch(err => {
                    res.status(504).json({
                        message: "Failed."
                    });
                });
            }
            else
            {
                res.status(504).json({
                    message: "No Employee matched for the service provider."
                });
            }

        })

    // orders.findByPk(order_id).then(result => {
    //     result.employee_id = employee_id;

    //     return result.save();             
    // }).then(ret => {
    //     res.status(200).json({
    //         message: "Success"
    //     });
    // }).catch(err => {
    //     res.status(504).json({
    //         message: "Failed"
    //     });
    // });
};
  
  exports.completeServiceOrder = (req,res,nxt ) =>{
  
      const order_id = req.body.order_id;
      //const service_id = req.body.userid;
  
      orders.findByPk(order_id).then((serv) => {
              serv.delivered = true;
              return serv.save();
      }).then((sucess) => {
          res.status(200).json({message: "Success"});
      }).catch((err) => {
          res.status(504).json({message: "Failed"});
      });
  
  
};


exports.getServiceStats = (req,res,nxt) =>
{
    const start_date = req.body.start_date;
    const end_date = req.body.end_date;
    const service_id = req.body.service_id;

    sequelize.query("SELECT * FROM Orders WHERE order_time BETWEEN  ? AND  ? && service_id=?",{replacements: [[start_date],[end_date],[service_id]],type: sequelize.QueryTypes.SELECT})
    .then(result => {
            //console.log(result.length);
            const total_orders = result.length;
            let total_income =0,deliveredOrders=0;
            result.forEach(element => {
                if(element.delivered===1)
                {
                    deliveredOrders++;
                    total_income +=parseInt(element.payment);
                }
                
            });

        res.status(200).json({
            //orders : success,
            total_orders : total_orders,
            delivered : deliveredOrders,
            income : total_income,
            message: "Success"});
    }).catch((err) => {
        res.status(504).json({message: "Failed"});
    });

};


exports.getServiceOrderHistory = (req,res,nxt) =>
{

    const service_id = req.body.userid;

    sequelize.query("SELECT *  FROM  Orders INNER JOIN Customer_Credential ON Orders.customer_id=Customer_Credential.customer_id INNER JOIN Customer_Address ON Orders.customer_address_id=Customer_Address.customer_add_id INNER JOIN Area_Details ON Customer_Address.area_id= Area_Details.area_id  WHERE service_id=? && delivered=true ORDER BY order_time DESC",{replacements: [service_id],type: sequelize.QueryTypes.SELECT})
    .then(result =>
        {
            var output = [];
            if(result.length===0)
                {  
                    res.status(200).json({
                       // details: details,
                        message: "No Orders."
                    });
                }
            else{
               
                result.forEach(element => {

                    var address = element.house_no+','+element.road_no+','+element.area_name+','+element.district;
                    var productorder =
                    {
                        "order_id" :element.order_id,
                        "customer_name" : element.customer_name,
                        "customer_phone" : element.customer_phone,
                        "address" : address,
                        "further_description" : element.further_description,
                        "payment" : element.payment,
                        "time" : element.order_time
                    };
                    output.push(productorder);
                });

                res.status(200).json({
                     details: output,
                     message: "Success."
                 });
            }
        }).catch((err) => {
            res.status(504).json({message: "Failed"});
        });
};


