const Sequelize = require("sequelize");
const sequelize = require("../util/database");
const Universal_Products = require("../models/Universal_Product_List");
const universal_products = Universal_Products(sequelize, Sequelize);
const Service_Inventory = require("../models//Service_Inventory");
const service_inventory = Service_Inventory(sequelize, Sequelize);

exports.getUniversalProducts = (req, res, next) => {
    universal_products
        .findAll()
        .then((products) => {
            res.status(200).json({
                products: products,
                message: "Success",
            });
        })
        .catch((err) => {
            res.status(504).json({
                message: "Failed",
            });
        });
};

exports.getOwnProducts = (req, res, next) => {
    const service_id = req.body.service_id;
    const search = req.body.search_data;

    sequelize
        .query(
            "SELECT * FROM Service_Inventory INNER JOIN Universal_Product_List ON Service_Inventory.product_id=Universal_Product_List.product_id WHERE service_id=? && (product_name LIKE ? OR company_name LIKE ? OR price LIKE ?)",
            {
                replacements: [
                    [service_id],
                    [`%${search}%`],
                    [`%${search}%`],
                    [`%${search}%`],
                ],
                type: sequelize.QueryTypes.SELECT,
            }
        )
        .then((products) => {
            res.status(200).json({
                products: products,
                message: "Success",
            });
        })
        .catch((err) => {
            res.status(504).json({
                message: "Failed",
            });
        });
};

exports.getProductDetails = (req, res, next) => {
    const product_id = req.body.product_id;

    universal_products
        .findAll({
            where: {
                product_id: product_id,
            },
        })
        .then((products) => {
            res.status(200).json({
                products: products,
                message: "Success",
            });
        })
        .catch((err) => {
            res.status(504).json({
                message: "Failed",
            });
        });
};

// exports.getOwnProductDetails = (req, res, next) => {
//     const service_id = req.body.service_id;
//     const product_id = req.body.product_id;

//     universal_products
//         .findAll({
//             where: {
//                 product_id: product_id,
//             },
//         })
//         .then((result) => {
//             service_inventory
//                 .findAll({
//                     where: {
//                         product_id: product_id,
//                         service_id: service_id,
//                     },
//                 })
//                 .then((ret) => {
//                     res.status(200).json({
//                         product_name: result[0].product_name,
//                         qty: result[0].qty,
//                         unit: result[0].unit,
//                         company_name: result[0].company_name,
//                         vat: result[0].vat,
//                         price: ret[0].price,
//                         message: "Success",
//                     });
//                 })
//                 .catch((err) => {
//                     res.status(504).json({
//                         message: "Failed",
//                     });
//                 });
//         })
//         .catch((err) => {
//             res.status(504).json({
//                 message: "Failed",
//             });
//         });
// };

exports.addProduct = (req, res, next) => {
    const service_id = req.body.service_id;
    //const product_id = req.body.product_id;
    //const delivery_limit = req.body.delivery_limit;
    //const price = req.body.price;
    const category = req.body.category;
    const name = req.body.search_data;
    const page = req.body.page_number;
    const off = (page - 1) * 15;
    const limit = 15;
    sequelize
        .query(
            "SELECT * FROM Universal_Product_List WHERE  Universal_Product_List.product_id NOT IN (SELECT product_id FROM Service_Inventory WHERE service_id=?) && (product_name LIKE ? OR company_name LIKE ?) && categories = ? LIMIT ? , ?  ",
            {
                replacements: [
                    [service_id],
                    [`%${name}%`],
                    [`%${name}%`],
                    [category],
                    [off],
                    [limit],
                ],
                type: sequelize.QueryTypes.SELECT,
            }
        )
        .then((results) => {
            //var left = items.filter((item) => (result[0].product_id != item.product_id));
            //let left = items.filter((item) => (results.filter((result) => (result.product_id != item.product_id))));

            res.status(200).json({
                items: results,
                message: "success.",
            });
        })
        .catch((err) => {
            res.status(504).json({
                message: "Failed",
            });
        });

    // service_inventory
    //     .findAll({
    //         where: {
    //             product_id: product_id,
    //             service_id: service_id,
    //         },
    //     })
    //     .then((element) => {
    //         if (element.length > 0) {
    //             res.status(409).json({
    //                 message: "Already enlisted in products",
    //             });
    //         } else {
    //             service_inventory
    //                 .create({
    //                     service_id: service_id,
    //                     product_id: product_id,
    //                     price: price,
    //                 })
    //                 .then((elem) => {
    //                     res.status(200).json({
    //                         message: "Successfully Enlisted",
    //                     });
    //                 })
    //                 .catch((err) => {
    //                     res.status(504).json({
    //                         message: "Failed",
    //                     });
    //                 });
    //         }
    //     });

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

exports.addToInventory = (req, res, next) => {
    const service_id = req.body.service_id;
    const product_id = req.body.product_id;
    const price = req.body.price;

    service_inventory
        .create({
            service_id: service_id,
            product_id: product_id,
            price: price,
        })
        .then((result) => {
            res.status(200).json({
                message: "Success.",
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(504).json({
                message: "Failed",
            });
        });
};

exports.updateProduct = (req, res, next) => {
    //const inventory_id = req.body.inventory_id;
    // const delivery_limit = req.body.delivery_limit;;
    const service_id = req.body.service_id;
    const product_id = req.body.product_id;
    const new_price = req.body.price;

    service_inventory
        .findAll({
            where: {
                product_id: product_id,
                service_id: service_id,
            },
        })
        .then((element) => {
            if (element.length === 0) {
                res.status(504).json({
                    message: "No Product Found.",
                });
            } else {
                const inventory_id = element[0].inventory_id;
                service_inventory
                    .findByPk(inventory_id)
                    .then((res) => {
                        res.price = new_price;

                        return res.save();
                    })
                    .then((ret) => {
                        res.status(200).json({
                            message: "Successfully Updated",
                        });
                    })
                    .catch((err) => {
                        res.status(504).json({
                            message: "Failed To Update.",
                        });
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
    const product_id = req.body.product_id;

    service_inventory
        .findAll({
            where: {
                product_id: product_id,
                service_id: service_id,
            },
        })
        .then((element) => {
            if (element.length === 0) {
                res.status(504).json({
                    message: "No Product Found.",
                });
            } else {
                const inventory_id = element[0].inventory_id;
                service_inventory
                    .findByPk(inventory_id)
                    .then((res) => {
                        return res.destroy();
                    })
                    .then((ret) => {
                        res.status(200).json({
                            message: "Successfully Deleted",
                        });
                    })
                    .catch((err) => {
                        res.status(504).json({
                            message: "Failed To Delete.",
                        });
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

exports.categoryProduct = (req, res, nxt) => {
    universal_products
        .findAll({})
        .then((products) => {
            let prod_cat = new Set();

            products.forEach((element) => {
                prod_cat.add(element.categories);
            });
            let category = [];
            prod_cat.forEach((element) => {
                category.push(element);
            });
            category.sort();
            res.status(200).json({
                details: category,
                message: "Successfully fetched category.",
            });
        })
        .catch((err) => {
            res.status(504).json({
                message: "Failed To fetch category.",
            });
        });
};

exports.categoryPage = (req, res, nxt) => {
    const service_id = req.body.service_id;
    const category = req.body.category;
    sequelize
        .query(
            "SELECT * FROM Universal_Product_List WHERE  Universal_Product_List.product_id NOT IN (SELECT product_id FROM Service_Inventory WHERE service_id=?) &&  categories = ?   ",
            {
                replacements: [[service_id], [category]],
                type: sequelize.QueryTypes.SELECT,
            }
        )
        .then((result) => {
            res.status(200).json({
                details: Math.ceil(result.length / 15),
                message: "Successfully fetched number of product .",
            });
        })
        .catch((err) => {
            res.status(504).json({
                message: "Failed To fetch number of product.",
            });
        });
};
