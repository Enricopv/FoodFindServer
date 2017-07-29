
var Client = require('node-rest-client').Client;
var client = new Client();
var rp = require('request-promise');
var placesModel = require('../models/placesModel');

exports.hello = function(req, res) {
  
  var hello = new placesModel;



  data = hello.test();

  // places = data.places;
  
  res.send(
    JSON.stringify(data.test)
  );
}