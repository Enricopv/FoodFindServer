var express = require('express');
var router = express.Router();
var data = require('../data.json');
var products = require('../products.json');
var places = require('../models/placesModel');


router.get('/getdata', function (req, res) {
    res.send(data);
});

router.get('/getproducts', function (req, res) {
    res.send(products);
});

router.get('/test', places.test);

router.get('/getFoodLocation', places.getFoodNearLocation);

module.exports = router;