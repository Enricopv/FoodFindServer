var express = require('express');
var router = express.Router();
var data = require('../data.json');
var products = require('../products.json');

router.get('/getdata', function (req, res) {
    res.send(data);
});

router.get('/getproducts', function (req, res) {
    res.send(products);
});

module.exports = router;