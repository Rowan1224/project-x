const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const Universal_Products = require('../models/Universal_Product_List');
const universal_products = Universal_Products(sequelize, Sequelize);
const Service_Inventory = require('../models//Service_Inventory');
const service_inventory = Service_Inventory(sequelize, Sequelize);

exports.getUniversalProducts = (req, res, next) => {
    universal_products.findAll().then(products => {
        res.status(200).json({
            products: products,
            message: "Success"
        });
    }).catch(err => {
        res.status(504).json({
            message: "Failed"
        });
    });
};

exports.getOwnProducts = (req, res, next) => {
    const service_id = req.body.service_id;

    service_inventory.findAll({
        attributes: ['inventory_id', 'service_id', 'product_id', 'delivery_limit', 'price'],
        where: {
            service_id: service_id
        }
    }).then(products => {
        res.status(200).json({
            products: products,
            message: "Success"
        });
    }).catch(err => {
        res.status(504).json({
            message: "Failed"
        });
    });
};

exports.getProductDetails = (req, res, next) => {
    const product_id = req.body.product_id;

    universal_products.findAll({
        where: {
            product_id: product_id
        }
    }).then(products => {
        res.status(200).json({
            products: products,
            message: "Success"
        });
    }).catch(err => {
        res.status(504).json({
            message: "Failed"
        });
    });
};

exports.addProduct = (req, res, next) => {
    const service_id = req.body.service_id;
    const product_name = req.body.product_name;   
    //const delivery_limit = req.body.delivery_limit;
    const price = req.body.price;

    universal_products.findAll({
        where : {product_name : product_name}
    }).then(result =>{
        if(result.length===0)
        {
            res.status(504).json({
                message: "The Product isnt available by Admin"
            });
        }
        else
        {
            const product_id = result[0].product_id;
            service_inventory.findAll({
                where : { 
                    product_id : product_id,
                    service_id : service_id
                }
            }).then(element =>
                {
                    if(element.length>0)
                    {
                        res.status(409).json({
                                message: "Already enlisted in products"
                        });
                    }
                    else
                    {
                        service_inventory.create({
                             service_id: service_id,
                             product_id: product_id,
                                        //delivery_limit: delivery_limit,
                             price: price
                        }).then(elem =>
                            {
                                res.status(200).json({
                                     message: "Successfully Enlisted"
                                         });
                            }).catch(err =>
                                {
                                    res.status(504).json({
                                        message: "Failed"
                                     });
                                });

                    }
                });
        }
    });






    // sequelize.query("SELECT * FROM Universal_Product_List INNER JOIN Service_Inventory ON Universal_Product_List.product_id=Service_Inventory.product_id WHERE service_id=?",{replacements: [service_id],type: sequelize.QueryTypes.SELECT})
    // .then(result =>
    //     {
    //         product_id
    //     })





    // service_inventory.findAll({
    //     where: {
    //         service_id: service_id,
    //         product_id: product_id 
    //     }
    // }).then(result => {
    //     if(JSON.stringify(result) != JSON.stringify([])) {
    //         res.json({
    //             message: "Product already enlisted!"
    //         });
    //     }
    //     else {
    //         return service_inventory.create({
    //             service_id: service_id,
    //             product_id: product_id,
    //             delivery_limit: delivery_limit,
    //             price: price
    //         });
    //     }
    // }).then(result => {
    //     res.status(200).json({
    //         message: "Success"
    //     });
    // }).catch(err => {
    //     res.status(504).json({
    //         message: "Failed"
    //     });
    // });
    // <!-- "service_id": 3,
    //             "product_id": 2,
    //             "delivery_limit": "",
    //             "price": 25 -->
};

exports.updateProduct = (req, res, next) => {
    //const inventory_id = req.body.inventory_id;
   // const delivery_limit = req.body.delivery_limit;;
    const service_id = req.body.service_id;
    const product_name = req.body.product_name;
    const new_price = req.body.price;

    universal_products.findAll({
        where : {product_name : product_name}
    }).then(result =>{
        if(result.length===0)
        {
            res.status(504).json({
                message: "The Product isnt available by Admin."
            });
        }
        else
        {
            const product_id = result[0].product_id;
            service_inventory.findAll({
                where : { 
                    product_id : product_id,
                    service_id : service_id
                }
            }).then(element =>
                {
                    
                    if(element.length===0)
                    {
                        res.status(504).json({
                                message: "No Product Found."
                        });
                    }
                    else
                    {
                       const inventory_id = element[0].inventory_id;
                       service_inventory.findByPk(inventory_id).then(res => {
                                res.price = new_price;
                    
                                return res.save();
                        }).then(ret => {
                            res.status(200).json({
                                message: "Successfully Updated"
                            });
                        }).catch(err => {
                            res.status(504).json({
                                message: "Failed To Update."
                            });
                        });

                    }
                });
        }
    });








    

    // service_inventory.findByPk(inventory_id).then(result => {
    //     result.delivery_limit = delivery_limit;
    //     result.price = price;

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
    // "inventory_id": 14,
    //             "delivery_limit": "This is delivery_limit",
    //             "price": 20
};

exports.deleteProduct = (req, res, next) => {
    //const inventory_id = req.body.inventory_id;

    const service_id = req.body.service_id;
    const product_name = req.body.product_name;
    var  price = req.body.price? req.body.price : 0;

    universal_products.findAll({
        where : {product_name : product_name}
    }).then(result =>{
        if(result.length===0)
        {
            res.status(504).json({
                message: "The Product isnt available by Admin."
            });
        }
        else
        {
            const product_id = result[0].product_id;
            service_inventory.findAll({
                where : { 
                    product_id : product_id,
                    service_id : service_id
                }
            }).then(element =>
                {
                    
                    if(element.length===0)
                    {
                        res.status(504).json({
                                message: "No Product Found."
                        });
                    }
                    else
                    {
                       const inventory_id = element[0].inventory_id;
                       service_inventory.findByPk(inventory_id).then(res => {
                                return res.destroy();
                        }).then(ret => {
                            res.status(200).json({
                                message: "Successfully Deleted"
                            });
                        }).catch(err => {
                            res.status(504).json({
                                message: "Failed To Delete."
                            });
                        });

                    }
                });
        }
    });


    // service_inventory.findByPk(inventory_id).then(result => {
    //     return result.destroy();
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