// model.js

var Client = require('node-rest-client').Client;
var client = new Client();
var rp = require('request-promise');
var request = require('request');
var sanitizeHtml = require('sanitize-html');

var placesModel = function (data) {
  this.data = { hello: 'hello'}
  this.places = [{hi: 'p'}];
  this.bread = "";

}

class Place {
  constructor(place_id, price_level, rating, name, vicinity) {
    this.place_id = place_id;
    this.price_level = price_level;
    this.rating = rating;
    this.name = name;
    this.vicinity = vicinity;
  }
}

placesModel.prototype.test = function () {
  this.places.push({banana : 'yup'})
  // return this.places;
}


placesModel.prototype.gatherData = function (req, res) {
  
  this.getNearbyLocation(req, res);

 
  // this.places.push({human: 'error'})
}

placesModel.prototype.getNearbyLocation = function(req, res) {
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

  var b = this;

  rp(nearOptions)
    .then(function (data) {
      data.results.forEach(spot => {
        var place = new Place(spot.place_id,spot.price_level,spot.rating, spot.name, spot.vicinity);       
        // spots.push(place);
        setDetails(place)
      }) // Foreach //
      return spots;      
    })    
    // .then((data) => {      
    //   b.places = spots
    //   data
    //   b.setDetails(req, res, data);
    // })   
}

placesModel.prototype.getDetails = function (req, res, place_id) {
  var detailsResult;
  var detailOptions = {
    uri: 'https://maps.googleapis.com/maps/api/place/details/json',
    qs: {        
      placeid: place_id,
      key: process.env.GOOGLE_PLACES_API_KEY
    },
    headers: {
        'User-Agent': 'Request-Promise'
    },
    json: true // Automatically parses the JSON string in the response
  };


  rp(detailOptions)
    .then(function (data) {
      detailsResult = data.result;
    }) 
    .then(()=>{          
      this.address = detailsResult.formatted_address;
      this.phone = detailsResult.formatted_phone_number;       
      this.reviews = detailsResult.reviews;
      this.website = detailsResult.website;
      // this.open_now = detailsResult.opening_hours.open_now;
      // this.weekdays = detailsResult.opening_hours.weekday_text;
    }
  )
}

placesModel.prototype.finish = function (req, res, data) {
  // res.send(this.places) 
}


module.exports = placesModel;