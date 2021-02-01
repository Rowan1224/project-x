const express = require('express');

const addAreaController = require('../controllers/addArea');
const employeeController = require('../controllers/employee');
const profileController = require('../controllers/profile');
const productController = require('../controllers/products');
const ordersController = require('../controllers/orders');
const customerordersController = require('../controllers/customer-order');

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
router.patch('/updateProfile', profileController.updateProfile);

// Product Related Routes
router.get('/allProducts', productController.getUniversalProducts);
router.post('/ownProducts', productController.getOwnProducts);
router.post('/getProductDetails', productController.getProductDetails);
router.post('/addProduct', productController.addProduct);
router.post('/updateProduct', productController.updateProduct);
router.post('/deleteProduct', productController.deleteProduct);

// Order Related APIs
router.post('/createOrder', ordersController.createOrder);
router.post('/assignEmployee', ordersController.assignEmployee);

//Rowan
const getServiceAreaController = require('../controllers/getServiceArea');
router.get('/getServiceArea', getServiceAreaController.getServiceArea);
router.get('/getServiceName/:areaId', getServiceAreaController.getServiceName);
router.post('/createOrderDetails', customerordersController.createOrderDetails);
router.post('/getOrderDetails', customerordersController.getOrderDetails);
router.post('/createCustomerAddress', customerordersController.createCustomerAddress);
router.post('/getCustomerAddress', customerordersController.getCustomerAddress);

//toha
const loginController = require('../controllers/login');
const auth = require ('../middleware/customerAuth');
router.post('/login',loginController.login);
router.post('/verify',loginController.verify);
router.post('/register',loginController.register);
//router.get('/works',auth,loginController.works); demo
router.get('/logout',auth,loginController.logout);

const serviceLoginController = require ('../controllers/serviceLogin');
const authy = require ('../middleware/serviceAuth');
router.post('/servicelogin',serviceLoginController.servicelogin);
router.post('/serviceverify',serviceLoginController.serviceverify);
router.post('/serviceregister',serviceLoginController.serviceregister);
router.get('/servicelogout',authy,serviceLoginController.servicelogout);

const customerProfileController = require('../controllers/customerProfile');

router.post('/customerprofile',customerProfileController.getCustomerProfile);
router.post('/customerupdateprofile',customerProfileController.updateCustomerProfile);



module.exports = router;