
var express = require('express');
var app = express();
var Client = require('node-rest-client').Client;
var client = new Client();
var rp = require('request-promise');
var dotenv = require('dotenv');
var sanitizeHtml = require('sanitize-html');
dotenv.load();


class Place {
    constructor(place_id, price_level, rating, name, vicinity) {
        // always initialize all instance properties
        this.place_id = place_id;
        this.price_level = price_level;
        this.rating = rating;
        this.name = name;
        this.vicinity = vicinity;
        this.photo_references = [];
        this.photoImages = [];
    }

 
    setDetails() {
      var detailsResult;
      var detailOptions = {
        uri: 'https://maps.googleapis.com/maps/api/place/details/json',
        qs: {        
          placeid: this.place_id,
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
          
          if(detailsResult.opening_hours) {
            this.open_now = detailsResult.opening_hours.open_now;

            if(detailsResult.opening_hours.weekday_text) {
              this.weekdays = detailsResult.opening_hours.weekday_text;
            }
          }

          if(detailsResult.photos) {
            detailsResult.photos.forEach(photoInfo => {
              this.photo_references.push(photoInfo.photo_reference);
              this.setPhotos(photoInfo.photo_reference);
            })


          }
        }
      )
    }
    
    setPhotos(photoRef) {
      var photoResult = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" + photoRef + "&key=" + process.env.GOOGLE_PLACES_API_KEY;
      this.photoImages.push(photoResult);      
    }
}
 
exports.getWithLocationPromise = (location) => {
  return new Promise( 
    (resolve, reject) => {   

      var nearOptions = {
        uri: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
        qs: {      
          location: location,  
          // location: "34.27209,-118.87939",
          // location: "34.047893, -118.252632", 
          type: "restaurant",
          rankby: "distance",
          key: process.env.GOOGLE_PLACES_API_KEY
        },
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true // Automatically parses the JSON string in the response
      };


      rp(nearOptions)
        .then(function (data) {
          var places = [];
          data.results.forEach(spot => {
            var place = new Place(spot.place_id,spot.price_level,spot.rating, spot.name, spot.vicinity);       
            place.setDetails();
            // place.setPhotos();
            places.push(place);
          }) // Foreach    
          resolve(places); 
        })  
    }
  )
}




 

