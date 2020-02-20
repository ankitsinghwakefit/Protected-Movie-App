var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var movieSchema = new Schema({
    Name : String,
    Story : String,
    Release : String,
    Director : String,
    Writers : String,
    Stars : String,
    Rating: String
});

var Movie = mongoose.model("movie",movieSchema);

module.exports = Movie;