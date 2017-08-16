
var Client = require('node-rest-client').Client;
var client = new Client();
var rp = require('request-promise');
var placesModel = require('../models/placesModel');
var Place = require('../models/placeModel');

exports.getFoodWithLocation = function(req, res) {
  var location = req.body.location;
  var places = [];
  placesModel.getWithLocationPromise(location)
    .then(dataToPlaces)
    .then(getPlacesDetails)
    .then(getDistanceDetails)
    .then((data) => {
      res.send(JSON.stringify(data))
    })
    .catch((err) => {
      console.log(err);
    })   
  
}

var dataToPlaces = (data) => {
  return new Promise(
    (resolve, reject) => {      
      var places = [];
      data.results.forEach(spot => {
        var place = new Place(spot.place_id,spot.price_level,spot.rating, spot.name, spot.vicinity, data.location);         
        places.push(place);
      }) // Foreach    
      resolve(places); 
    }
  );
}

var getPlacesDetails = (data) => {
  return new Promise (
    (resolve, reject) => {
      var places = [];
      var get = data.map(placesModel.setDetails);
      places = Promise.all(get);
      resolve(places);
    }
  )
}

var getDistanceDetails = (data) => {
  return new Promise(
    (resolve, reject) => {
      var places = [];
      var get = data.map(placesModel.getDistance);
      places = Promise.all(get);
      resolve(places);
    }
  )
}
