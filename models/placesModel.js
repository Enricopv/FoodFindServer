
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
 
exports.getFoodNearLocationPromise = new Promise( 
  (resolve, reject) => {   

    var nearOptions = {
      uri: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
      qs: {        
        location: "34.27209,-118.87939",
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
);



// exports.getFoodNearLocation = function (req, res, next) {

//   var places = [];

//   // Api call to nearby location
//   var args = {
//     parameters: { 
//       location: "34.27209,-118.87939", 
//       type: "restaurant",
//       rankby: "distance",
//       key: process.env.GOOGLE_PLACES_API_KEY
//     }
//   };

//   // Conduct Nearby search based on coordinates
//   client.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json", args,
//     function (data, response) {    
//       data.results.forEach(spot => {
        
//         // Create new Place instance
//         var place = new Place(spot.place_id,spot.price_level,spot.rating, spot.name, spot.vicinity);
        
//         var args = {
//           paramters: {
//             placeid: spot.place_id,
//             key: process.env.GOOGLE_PLACES_API_KEY
//           }
//         }

//         // Get Details based on place_id
//         client.get("https://maps.googleapis.com/maps/api/place/details/json", args,
//           function (data, response) {       
//             place.setDetails(       
//               data.result.formatted_address,        
//               data.result.formatted_phone_number ,      
//               data.result.reviews,
//               data.result.website,
//               data.result.opening_hours.open_now,
//               data.result.opening_hours.weekday_text
//             );

//             var photos = [];

//             data.result.photos.forEach(photoData => {
              
//               var args = {
//                 paramters: {
//                   maxwidth: '400',
//                   photoreference: photoData.photo_reference,
//                   key: process.env.GOOGLE_PLACES_API_KEY
//                 }
//               }
//                client.get("https://maps.googleapis.com/maps/api/place/details/json", args,
//                 function (data, response) { 
//                   photos.push(data);
//                 }
//                )
//             })
            
//             place.setPhotos(photos);

//           }
//         );
        
//         places.push(place);    
//       })
//     res.send(JSON.stringify(places))
//   });
//  }

 


exports.test = function (req,res,next) {
  var place = new Place('123','$','2.3', 'the hoagie house', '4523 N');
  place.setDetails('4523','(123)123-1234', 'so many reviews', 'www.hello.com', ['123','456','681']);
  place.setPhotos(['actual photos','another']);

  res.send(JSON.stringify(place));
}
