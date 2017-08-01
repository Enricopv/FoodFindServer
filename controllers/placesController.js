
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
        var place = new Place(spot.place_id,spot.price_level,spot.rating, spot.name, spot.vicinity);       
       places.push(place);
      }) // Foreach    
      resolve(places); 
    }
  );
}

// Finally figured out using .map with Promise.all.
// - I take the data array and map out each element with a promise setDetails into
//   a new array get[]. Look like get[setDetails(data[0]), setDetails(data[1]), etc] 
// - Then Promise.all runs each of these sequentially and stores the results in the places[]
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

// var getPlacesPhotos = (data) => {
//   return new Promise (
//     (resolve, reject) => {
//       var places = [];
//       var get = data.map(placesModel.setPhotos);
//       places = Promise.all(get)
//       resolve(places);
//     }
//   )
// }



// exports.getFoodNearLocation = function (req, res) {
//   res.send(JSON.stringify({hello: 'maam'}))
// }