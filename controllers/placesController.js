
var Client = require('node-rest-client').Client;
var client = new Client();
var rp = require('request-promise');
var placesModel = require('../models/placesModel');

exports.hello = function(req, res) {

  var data = new placesModel;

  // data.getNearbyLocation(req, res);
  data.getNearbyLocation(req, res)

  // data.test();

  // res.send(JSON.stringify(data.places)) 

}

exports.getFoodNearLocation = function (req, res) {
  res.send(JSON.stringify({hello: 'maam'}))
}