var mongoose = require("mongoose");

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
  afbeeldingNaam: String,
  site: String,
  idToevoeger: String,
  listUsersGoing: [String],
  listUsersLiked: [String]
});

mongoose.model("Meeting", MeetSchema);
