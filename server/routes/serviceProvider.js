const express = require('express');
const addAreaController = require('../controllers/addArea');
const employee = require('../controllers/employee');

const router = express.Router();

// Area Related Routes
router.post('/addArea', addAreaController.addArea);

// Employee Related Routes
router.post('/addEmployee', employee.addEmployee);
router.post('/getEmployee', employee.getEmployee);
router.post('/updateEmployee', employee.updateEmployee);
router.post('/deleteEmployee', employee.deleteEmployee);

//Rowan
const getServiceAreaController = require('../controllers/getServiceArea');
router.get('/getServiceArea', getServiceAreaController.getServiceArea);

module.exports = router;