
var Client = require('node-rest-client').Client;
var client = new Client();
var rp = require('request-promise');
var placesModel = require('../models/placesModel');

exports.getFoodWithLocation = function(req, res) {
  var location = req.body.location;
  placesModel.getWithLocationPromise(location)
    .then((results) => {
      res.send(JSON.stringify(results))
    })

}


// exports.getFoodNearLocation = function (req, res) {
//   res.send(JSON.stringify({hello: 'maam'}))
// }