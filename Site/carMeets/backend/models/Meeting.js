var mongoose = require('mongoose');

var MeetSchema = new mongoose.Schema({
  name: String,
  date: Date,
  gemeente: String,
  postcode: String,
  straatnaam: String,
  straatnr: String,
  shortDescription: String,
  fullDescription: String,
  categories: [String],
  site: String,
  idToevoeger: String,
  afbeeldingnaam: String
});

mongoose.model('Meeting', MeetSchema);
