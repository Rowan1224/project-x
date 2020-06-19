const express = require('express');
const addAreaController = require('../controllers/addArea');

const router = express.Router();

router.post('/addArea', addAreaController.addArea);




//Rowan
const getServiceAreaController = require('../controllers/getServiceArea');
router.get('/getServiceArea', getServiceAreaController.getServiceArea);

module.exports = router;