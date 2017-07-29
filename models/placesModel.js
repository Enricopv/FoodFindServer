// model.js

var Client = require('node-rest-client').Client;
var client = new Client();
var rp = require('request-promise');

var placesModel = function (data) {
  this.data = { hello: 'hello'}
  this.places = [];
}

class Place {
  constructor(place_id, price_level, rating, name, vicinity) {
    // always initialize all instance properties
    this.place_id = place_id;
    this.price_level = price_level;
    this.rating = rating;
    this.name = name;
    this.vicinity = vicinity;
  }
}

placesModel.prototype.test = function () {
  this.places.push({banana : 'yup'})
  return this.places;
}


placesModel.prototype.getNearbyLocation = function (req, res) {
  
  var nearbyResult;
  var spots = [];

  var nearOptions = {
    uri: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
    qs: {        
      location: "34.27209,-118.87939", 
      type: "restaurant",
      rankby: "distance",
      key: process.env.GOOGLE_PLACES_API_KEY
    },
    headers: {
        'User-Agent': 'Request-Promise'
    },
    json: true // Automatically parses the JSON string in the response
  };

  var banana = this.places;
  rp(nearOptions)
    .then(function (data) {
      data.results.forEach(spot => {
        var place = new Place(spot.place_id,spot.price_level,spot.rating, spot.name, spot.vicinity);       
        spots.push(place);
      }) // Foreach      
      res.send(JSON.stringify(spots))
    })     
}


module.exports = placesModel;