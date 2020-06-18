const express = require('express');
const addAreaController = require('../controllers/addArea');

const router = express.Router();

router.get('/addArea', addAreaController.addArea);

module.exports = router;