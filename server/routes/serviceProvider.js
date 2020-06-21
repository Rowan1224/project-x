const express = require('express');

const addAreaController = require('../controllers/addArea');
const employeeController = require('../controllers/employee');
const profileController = require('../controllers/profile');

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
router.post('/updateProfile', profileController.updateProfile)

//Rowan
const getServiceAreaController = require('../controllers/getServiceArea');
router.get('/getServiceArea', getServiceAreaController.getServiceArea);
router.get('/getServiceName/:areaId', getServiceAreaController.getServiceName);
module.exports = router;