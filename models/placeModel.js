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
}

module.exports = Place
