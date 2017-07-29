// model.js

var PlacesModel = function (data) {
  this.data = { hello: 'hello'}
  this.places = [];
}

PlacesModel.test = function() {
  this.test = { test: 'test'}
}

PlacesModel.getNearbyLocation = function() {
  var nearbyResult;
  

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


  rp(nearOptions)
    .then(function (data) {
      data.results.forEach(spot => {
        var place = new Place(spot.place_id,spot.price_level,spot.rating, spot.name, spot.vicinity);       
        place.setDetails();
        this.places.push(place);
      }) // Foreach   
     // res.send(JSON.stringify(places))     
    })  
}


module.exports = PlacesModel;