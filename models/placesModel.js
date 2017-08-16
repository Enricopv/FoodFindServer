
var express = require('express');
var app = express();
var Client = require('node-rest-client').Client;
var client = new Client();
var rp = require('request-promise');
var dotenv = require('dotenv');
var sanitizeHtml = require('sanitize-html');
dotenv.load();


class Place {
    constructor(place_id, price_level, rating, name, vicinity, place_pic) {
        // always initialize all instance properties
        this.place_id = place_id;
        this.price_level = price_level;
        this.rating = rating;
        this.name = name;
        this.vicinity = vicinity;
        this.photoImages = [];
        this.place_pic = place_pic;
    }    
}
 
exports.getWithLocationPromise = (location) => { 
  return new Promise(  
    (resolve, reject) => {   

      var nearOptions = {
        uri: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
        qs: {        
          // // location: "34.27209,-118.87939",
          location: location,
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
          resolve(data); 
        })  
    }
  )
}

exports.setDetails = (place) => {
  return new Promise( 
    (resolve, reject) => {

      var detailsResult;
      var detailOptions = {
        uri: 'https://maps.googleapis.com/maps/api/place/details/json',
        qs: {        
          placeid: place.place_id,
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
          place.address = detailsResult.formatted_address;
          place.phone = detailsResult.formatted_phone_number;       
          place.reviews = detailsResult.reviews;
          place.website = detailsResult.website;
          
          if(detailsResult.opening_hours) {
            place.open_now = detailsResult.opening_hours.open_now;

            if(detailsResult.opening_hours.weekday_text) {
              place.weekdays = detailsResult.opening_hours.weekday_text;
            }
          }

          if(detailsResult.photos) {
            detailsResult.photos.forEach(photoInfo => {
              place.photoImages.push(
                "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" + photoInfo.photo_reference + "&key=" + process.env.GOOGLE_PLACES_API_KEY 
              );
              
            })
          }          
          resolve(place);
        }) //then
    }
  ) // promise       
}

exports.getDistance = (place) => {
  return new Promise(
    (resolve, reject) => {
      var distanceResult;
      var distanceOptions = {
        uri: 'https://maps.googleapis.com/maps/api/distancematrix/json',
        qs: {        
          units: "imperial",
          destinations: "place_id:"+place.place_id,
          key: process.env.GOOGLE_PLACES_API_KEY,
          origins: "34.047893,-118.252632"
        },
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true // Automatically parses the JSON string in the response
      };

      // console.log(distanceOptions);

      rp(distanceOptions)
        .then(function (data) {          
          distanceResult = data; 
        }) 
        .then(()=>{   
          place.distance = distanceResult.rows[0].elements[0].distance.text;
          resolve(place);
        }) //then
    }
  )
} 




