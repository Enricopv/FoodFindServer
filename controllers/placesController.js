
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
    .then((test) => {
      res.send(JSON.stringify(test))
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
        var place = new Place(spot.place_id,spot.price_level,spot.rating, spot.name, spot.vicinity, spot.photos);       
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
