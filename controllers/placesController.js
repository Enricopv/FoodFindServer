
var Client = require('node-rest-client').Client;
var client = new Client();
var rp = require('request-promise');
var placesModel = require('../models/placesModel');

exports.hello = function(req, res) {

  var data = new placesModel;

  data.getNearbyLocation(req, res);

}