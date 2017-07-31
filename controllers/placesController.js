
var Client = require('node-rest-client').Client;
var client = new Client();
var rp = require('request-promise');
var placesModel = require('../models/placesModel');

exports.hello = function(req, res) {

  // var data = new placesModel;
  
  // placesModel.getFoodNearLocation(req, res, (result) => {    
  //   res.send(JSON.stringify(result))
  // });
  
  placesModel.getFoodNearLocationPromise
    .then((results) => {
      res.send(JSON.stringify(results))
    })

}

exports.getFoodNearLocation = function (req, res) {
  res.send(JSON.stringify({hello: 'maam'}))
}