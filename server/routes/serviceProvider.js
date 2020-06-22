const express = require('express');

const addAreaController = require('../controllers/addArea');
const employeeController = require('../controllers/employee');
const profileController = require('../controllers/profile');
const productController = require('../controllers/products');

const router = express.Router();

// Area Related Routes
router.post('/addArea', addAreaController.addArea);

// Employee Related Routes
router.post('/addEmployee', employeeController.addEmployee);
router.post('/getEmployee', employeeController.getEmployee);
router.post('/updateEmployee', employeeController.updateEmployee);
router.post('/deleteEmployee', employeeController.deleteEmployee);

// Profile Related Routes
router.post('/getProfile', profileController.getProfileData);
router.post('/updateProfile', profileController.updateProfile);

// Product Related Routes
router.get('/allProducts', productController.getUniversalProducts);
router.post('/ownProducts', productController.getOwnProducts);
router.post('/getProductDetails', productController.getProductDetails);
router.post('/addProduct', productController.addProduct);
router.post('/updateProduct', productController.updateProduct);
router.post('/deleteProduct', productController.deleteProduct);

//Rowan
const getServiceAreaController = require('../controllers/getServiceArea');
router.get('/getServiceArea', getServiceAreaController.getServiceArea);
router.get('/getServiceName/:areaId', getServiceAreaController.getServiceName);
module.exports = router;